import React, { Component } from 'react';
import eth, { initWeb3, utils } from './web3';
import daiLogo from './dai.svg'
import './App.css';

const jsonFetch = url => fetch(url).then(res => res.json())
const etherscanSupply = async () => {
  const json = await jsonFetch('https://api.etherscan.io/api?action=ethsupply&module=stats&apikey=zomg')
  return utils.fromWei(json.result)
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
const dai = new eth.Contract(tokenAbi, addresses.dai)
const peth = new eth.Contract(tokenAbi, addresses.peth)
const mkr = new eth.Contract(tokenAbi, addresses.mkr)
const weth = new eth.Contract(tokenAbi, addresses.weth)
const ethUsd = new eth.Contract(valueAbi, addresses.pip)
const mkrUsd = new eth.Contract(valueAbi, addresses.pep)
const tub = new eth.Contract(tubAbi, addresses.tub)
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
  }

  eventEth = null
  eventMkr = null

  componentDidMount() {
    console.log('did mount')
    initWeb3(eth)
    // window.web3 = web3
    window.eth = eth
    window.utils = utils
    this.init()
    this.eventEth = weth.events.Transfer({ filter: { dst: addresses.tub } }, (err, event) => {
      if (event) {
        console.log(event)
        console.log(utils.fromWei(event.returnValues.wad) + " WETH locked at " + Date.now());
        this.doLockedWeth()
      } else {
        console.log(err)
      }
    })
    this.eventMkr = mkr.events.Transfer({ filter: { dst: addresses.pit } }, (err, event) => {
      if (event) {
        console.log(utils.fromWei(event.returnValues.wad) + " MKR sent to burn " + Date.now());
        this.doGemPit()
      }
    })
  }

  componentWillUnmount() {
    this.eventEth && this.eventEth.unsubscribe()
    this.eventMkr && this.eventMkr.unsubscribe()
  }

  init = () => {
    this.doDaiSupply()
    this.doEthSupply()
    this.doWethSupply()
    this.doPethSupply()
    this.doEthUsd()
    this.doMkrUsd()
    this.doLockedPeth()
    this.doLockedWeth()
    this.doGemPit()
  }

  doGemPit = async () => {
    let gemPit = await mkr.methods.balanceOf(addresses.pit).call()
    gemPit = utils.fromWei(gemPit)
    this.setState({
      gemPit
    })
  }

  doLockedWeth = async () => {
    let lockedWeth = await tub.methods.pie().call()
    lockedWeth = utils.fromWei(lockedWeth)
    this.setState({
      lockedWeth
    })
  }

  doLockedPeth = async () => {
    let lockedPeth = await tub.methods.air().call()
    lockedPeth = utils.fromWei(lockedPeth)
    this.setState({
      lockedPeth
    })
  }

  doDaiSupply = async () => {
    let daiSupply = await dai.methods.totalSupply().call()
    daiSupply = utils.fromWei(daiSupply)
    this.setState({
      daiSupply
    })
  }

  doWethSupply = async () => {
    let wethSupply = await weth.methods.totalSupply().call()
    wethSupply = utils.fromWei(wethSupply)
    this.setState({
      wethSupply
    })
  }

  doPethSupply = async () => {
    let pethSupply = await peth.methods.totalSupply().call()
    pethSupply = utils.fromWei(pethSupply)
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
    value = utils.fromWei(value)
    this.setState({
      ethUsd: value
    })
  }

  doMkrUsd = async () => {
    let value = await mkrUsd.methods.read().call()
    value = utils.fromWei(value)
    this.setState({
      mkrUsd: value
    })
  }

  render() {
    const { daiSupply, ethSupply, wethSupply, pethSupply, ethUsd, mkrUsd, lockedPeth, lockedWeth, gemPit } = this.state
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column">
              <div className="box has-text-centered">
                <div className="columns is-vcentered">
                  <div className="column is-narrow">
                    <figure className="image is-48x48 is-pulled-left">
                      <img src={daiLogo} alt="Dai Logo" width="48px" />
                    </figure>
                  </div>
                  <div className="column">
                    <h3 className="title">Dai</h3>
                    <p className="subtitle is-size-4">{formatCurr.format(daiSupply)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title">Eth Supply</h3>
                <p className="subtitle is-size-4">{formatAmount.format(ethSupply)}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title">Eth Locked</h3>
                <p className="subtitle is-size-4">{formatAmount.format(lockedWeth)}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box">
                <h2 className="title">Zomg</h2>
              </div>
              <p>ethUsd: {formatCurr.format(ethUsd)}</p>
              <p>mkrUsd: {formatCurr.format(mkrUsd)}</p>
              <p>wethSupply: {formatAmount.format(wethSupply)}</p>
              <p>% {lockedWeth / wethSupply * 100}</p>
              <p>pethSupply: {formatAmount.format(pethSupply)}</p>
              <p>lockedPeth: {formatAmount.format(lockedPeth)}</p>
              <p>% {lockedWeth / ethSupply * 100}</p>
              <p>PETH/ETH Ratio: {lockedWeth / pethSupply}</p>
              <p>MKR to burn: {formatAmount.format(gemPit)}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
