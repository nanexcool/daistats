import React, { Component } from 'react';
import web3 from './web3';
import Main from './Main'
import daiLogo from './dai.svg'

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

  isLoaded = () => {
    return this.state.daiSupply !== null &&
      this.state.ethSupply !== null &&
      this.state.wethSupply !== null &&
      this.state.ethUsd !== null &&
      this.state.mkrUsd !== null &&
      this.state.lockedPeth !== null &&
      this.state.lockedWeth !== null &&
      this.state.gemPit != null
  }

  componentDidMount() {
    window.web3 = web3
    this.init()
    web3.eth.subscribe("newBlockHeaders").on('data', (block) => {
      this.setState({
        blockNumber: block.number,
        blockHash: block.hash
      })
    })
    this.startEvents()
  }

  startEvents = () => {
    weth.events.Transfer({}, (err, event) => {
      // console.log(web3.utils.fromWei(event.raw.data) + " WETH unlocked at " + event.transactionHash);
      if (event.event === "Transfer" && event.returnValues.dst === addresses.tub) {
        const { src, dst, wad } = event.returnValues
        // console.log(web3.utils.fromWei(event.raw.data))
        // console.log(`BOOM! ${web3.utils.fromWei(wad.toString())} moved into the tub!`)
        setTimeout(this.doLockedWeth, 1000)
      }
    })
    dai.events.allEvents({}, (err, event) => {
      if (event.event === "Transfer") {
        const { src, dst, wad } = event.returnValues
        // console.log(`${web3.utils.fromWei(wad.toString())} moved from ${src} to ${dst}`)
        window.lastEvent = event
      } else if (event.event === "Mint" || event.event === "Burn") {
        console.log(event.event + ' some Dai ' + web3.utils.fromWei(event.returnValues.wad))
        setTimeout(this.doDaiSupply, 1000)
      }
    })
  }

  componentWillUnmount() {

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
    if (this.isLoaded()) {
      return <Main {...this.state} />
    }
    else
    return (

      <section className="section">
        <div className="container has-text-centered">
          <figure className="image is-128x128 container">
            <img src={daiLogo} alt="Dai Logo" />
          </figure>
          <br />
          <progress className="progress is-small is-primary" max="100">15%</progress>
          <p>One sec, fetching data from Ethereum Mainnet</p>
        </div>
      </section>
    );
  }
}

export default App;
