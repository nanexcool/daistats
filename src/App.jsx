import React, { Component } from 'react';
import web3 from './web3';
import daiLogo from './dai.svg'
import './App.css';

const jsonFetch = url => fetch(url).then(res => res.json())
const etherscanSupply = async () => {
  const json = await jsonFetch('https://api.etherscan.io/api?action=ethsupply&module=stats&apikey=zomg')
  return web3.utils.fromWei(json.result)
}

const addresses = {
  mkr: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
  pit: '0x69076e44a9C70a67D5b79d95795Aba299083c275',
  dai: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359',
  pip: '0x729D19f657BD0614b4985Cf1D82531c67569197B',
  pep: '0x99041F808D598B782D5a3e498681C2452A31da08',
  tub: '0x448a5065aeBB8E423F0896E6c5D525C040f59af3',
  peth: '0xf53AD2c6851052A81B42133467480961B2321C09',
  weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
}
window.addresses = addresses

const tokenAbi = require('./abi/token.json')
const valueAbi = require('./abi/value.json')
const tubAbi = require('./abi/tub.json')
const dai = new web3.eth.Contract(tokenAbi, addresses.dai)
const peth = new web3.eth.Contract(tokenAbi, addresses.peth)
const mkr = new web3.eth.Contract(tokenAbi, addresses.mkr)
const weth = new web3.eth.Contract(tokenAbi, addresses.weth)
const ethUsd = new web3.eth.Contract(valueAbi, addresses.pip)
const mkrUsd = new web3.eth.Contract(valueAbi, addresses.pep)
const tub = new web3.eth.Contract(tubAbi, addresses.tub)
window.dai = dai
window.weth = weth
window.tub = tub
window.mkr = mkr

const formatCurr = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const formatAmount = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2
})

class App extends Component {
  state = {
    daiSupply: null,
    ethSupply: null,
    wethSupply: null,
    ethUsd: null,
    mkrUsd: null,
    lockedPeth: null,
    lockedWeth: null,
    gemPit: null,
    blockNumber: null,
    blockHash: null,
  }

  eventEth = null
  eventMkr = null

  componentDidMount() {
    console.log('did mount')
    // initWeb3(eth)
    window.web3 = web3
    // window.eth = eth
    // window.utils = utils
    this.init()
    // web3.eth.subscribe("newBlockHeaders", (e, r) => {
    //   this.setState({
    //     blockNumber: r.number,
    //     blockHash: r.hash
    //   })
    // })
    weth.events.Transfer({}, (err, event) => {
      // console.log(web3.utils.fromWei(event.raw.data) + " WETH unlocked at " + event.transactionHash);
      if (event.event === "Transfer" && event.returnValues.dst === addresses.tub) {
        const { src, dst, wad } = event.returnValues
        // console.log(web3.utils.fromWei(event.raw.data))
        console.log(`BOOM! ${web3.utils.fromWei(wad.toString())} moved into the tub!`)
        setTimeout(this.doLockedWeth, 1000)
      }
    })
    dai.events.allEvents({}, (err, event) => {
      if (event.event === "Transfer") {
        const { src, dst, wad } = event.returnValues
        console.log(`${web3.utils.fromWei(wad.toString())} moved from ${src} to ${dst}`)
        window.lastEvent = event
      } else {
        setTimeout(this.doDaiSupply, 1000)
      }
    })
    // weth.events.Transfer({filter: { dst: addresses.tub }}, (err, event) => {
    //   console.log(web3.utils.fromWei(event.raw.data) + " WETH locked at " + event.transactionHash);
    // })
    // this.eventEth = weth.events.Transfer({}, (err, event) => {
    //   if (event) {
    //     if (event.returnValues.dst === addresses.tub) {
    //       console.log(web3.utils.fromWei(event.raw.data) + " WETH locked at " + event.transactionHash);
    //       this.doLockedWeth()
    //     } else if (event.returnValues.src === addresses.tub) {
    //       console.log(web3.utils.fromWei(event.raw.data) + " WETH unlocked at " + event.transactionHash);
    //       this.doLockedWeth()
    //     }
    //     // console.log(event.returnValues.src, event.returnValues.dst, web3.utils.fromWei(event.raw.data))
    //   }
    // })
    // this.eventMkr = mkr.events.Transfer({}, (err, event) => {
    //   if (event) {
    //     if (event.returnValues.dst === addresses.tub || event.returnValues.src === addresses.tub) {
    //       console.log(web3.utils.fromWei(event.raw.data) + " MKR sent to burn " + Date.now());
    //       this.doGemPit()
    //     }
    //   }
    // })
  }

  componentWillUnmount() {
    this.eventEth && this.eventEth.unsubscribe()
    this.eventMkr && this.eventMkr.unsubscribe()
  }

  init = () => {
    this.doDaiSupply()
    this.doEthSupply()
    this.doLockedWeth()
    this.doWethSupply()
    this.doPethSupply()
    this.doEthUsd()
    this.doMkrUsd()
    this.doLockedPeth()
    this.doGemPit()
    setInterval(this.doEthSupply, 60000)
  }

  doGemPit = async () => {
    let gemPit = await mkr.methods.balanceOf(addresses.pit).call()
    gemPit = web3.utils.fromWei(gemPit)
    this.setState({
      gemPit
    })
  }

  doLockedWeth = async () => {
    let lockedWeth = await tub.methods.pie().call()
    lockedWeth = web3.utils.fromWei(lockedWeth)
    this.setState({
      lockedWeth
    })
  }

  doLockedPeth = async () => {
    let lockedPeth = await tub.methods.air().call()
    lockedPeth = web3.utils.fromWei(lockedPeth)
    this.setState({
      lockedPeth
    })
  }

  doDaiSupply = async () => {
    let daiSupply = await dai.methods.totalSupply().call()
    daiSupply = web3.utils.fromWei(daiSupply)
    this.setState({
      daiSupply
    })
    console.log('daisupply!!')
  }

  doWethSupply = async () => {
    let wethSupply = await weth.methods.totalSupply().call()
    wethSupply = web3.utils.fromWei(wethSupply)
    this.setState({
      wethSupply
    })
  }

  doPethSupply = async () => {
    let pethSupply = await peth.methods.totalSupply().call()
    pethSupply = web3.utils.fromWei(pethSupply)
    this.setState({
      pethSupply
    })
  }

  doEthSupply = async () => {
    const ethSupply = await etherscanSupply()
    this.setState({
      ethSupply
    })
    console.log('ethsupply!!')
  }

  doEthUsd = async () => {
    let value = await ethUsd.methods.read().call()
    value = web3.utils.fromWei(value)
    this.setState({
      ethUsd: value
    })
  }

  doMkrUsd = async () => {
    let value = await mkrUsd.methods.read().call()
    value = web3.utils.fromWei(value)
    this.setState({
      mkrUsd: value
    })
  }

  render() {
    const { daiSupply, ethSupply, wethSupply, pethSupply, ethUsd, mkrUsd, lockedPeth, lockedWeth, gemPit } = this.state
    return (
      <div>
        <section className="section">
          <div className="container">
          <progress className="progress is-small is-primary" max="100">15%</progress>
          <p>Juuuust a sec my friend</p>
            <div className="columns">
              <div className="column">
                <div className="box has-text-centered">
                  <h3 className="title">{formatAmount.format(daiSupply)}</h3>
                  <p className="subtitle is-size-4">Dai Supply</p>
                </div>
              </div>
              <div className="column">
                <div className="box has-text-centered">
                  <h3 className="title">{formatAmount.format(ethSupply)}</h3>
                  <p className="subtitle is-size-4">Total Eth Supply</p>
                </div>
              </div>
              <div className="column">
                <div className="box has-text-centered">
                  <h3 className="title">{formatAmount.format(lockedWeth)}</h3>
                  <p className="subtitle is-size-4">Eth Locked</p>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="box has-text-centered">
                  <h3 className="title">{formatAmount.format(lockedWeth / ethSupply * 100)} %</h3>
                  <p className="subtitle is-size-4">% Eth Locked</p>
                </div>
              </div>
              <div className="column">
                <div className="box has-text-centered">
                  <h3 className="title">{formatAmount.format(wethSupply)}</h3>
                  <p className="subtitle is-size-4">WETH Supply</p>
                </div>
              </div>
              <div className="column">
                <div className="box has-text-centered">
                  <h3 className="title">{formatAmount.format(lockedWeth / wethSupply * 100)} %</h3>
                  <p className="subtitle is-size-4">% WETH in Dai System</p>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <div className="box has-text-centered">
                  <h3 className="title">{formatAmount.format(gemPit)}</h3>
                  <p className="subtitle is-size-4">MKR in Burner</p>
                </div>
              </div>
              <div className="column">
                <div className="box has-text-centered">
                  <h3 className="title">{formatCurr.format(mkrUsd)}</h3>
                  <p className="subtitle is-size-4">MKR Price</p>
                </div>
              </div>
              <div className="column">
                <div className="box has-text-centered">
                  <h3 className="title">{formatCurr.format(gemPit * mkrUsd)}</h3>
                  <p className="subtitle is-size-4">Burner in USD</p>
                </div>
              </div>
            </div>
            {/* <div className="columns">
              <div className="column">
                <div className="box has-text-centered">
                  <h3 className="title">Current block/hash</h3>
                  <p className="subtitle is-size-4">
                    {this.state.blockNumber}
                  </p>
                  <p className="subtitle is-size-4">
                    {this.state.blockHash}
                  </p>
                </div>
              </div>
            </div> */}
            {/* <p>{formatAmount.format(ethUsd * lockedWeth / daiSupply * 100)}</p> */}
            {/* <div className="columns">
              <div className="column">
                <p>ethUsd: {formatCurr.format(ethUsd)}</p>
                <p>value: {formatCurr.format(lockedWeth * ethUsd)}</p>
                <p>wethSupply: {formatAmount.format(wethSupply)}</p>
                <p>% {lockedWeth / wethSupply * 100}</p>
                <p>pethSupply: {formatAmount.format(pethSupply)}</p>
                <p>lockedPeth: {formatAmount.format(lockedPeth)}</p>
                <p>% {lockedWeth / ethSupply * 100}</p>
                <p>PETH/ETH Ratio: {lockedWeth / pethSupply}</p>
                <p>Current block: {this.state.blockNumber}</p>
                <p><button onClick={this.doLockedWeth}>Zomg</button></p>
              </div>
            </div> */}
          </div>
        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
            Made by <a className="" href="https://twitter.com/nanexcool" target="_blank" rel="noopener noreferrer">
                  @nanexcool
                </a> who loves numbers and loves you
            </p>
            <p><a className="" href="https://github.com/nanexcool/daistats" target="_blank" rel="noopener noreferrer">Source code</a></p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
