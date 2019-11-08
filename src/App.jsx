import React, { Component } from 'react'
import eth from './web3';
import Main from './Main'
import daiLogo from './dai.svg'
const ethers = require('ethers')

const jsonFetch = url => fetch(url).then(res => res.json())
const etherscanSupply = async () => {
  const json = await jsonFetch('https://api.etherscan.io/api?action=ethsupply&module=stats&apikey=zomg')
  return ethers.utils.formatEther(json.result)
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
const dai = new ethers.Contract(addresses.dai, tokenAbi, eth)
const peth = new ethers.Contract(addresses.peth, tokenAbi, eth)
const mkr = new ethers.Contract(addresses.mkr, tokenAbi, eth)
const weth = new ethers.Contract(addresses.weth, tokenAbi, eth)
const ethUsd = new ethers.Contract(addresses.pip, valueAbi, eth)
const mkrUsd = new ethers.Contract(addresses.pep, valueAbi, eth)
const tub = new ethers.Contract(addresses.tub, tubAbi, eth)
window.dai = dai
window.weth = weth
window.tub = tub
window.mkr = mkr

class App extends Component {
  state = {
    daiSupply: null,
    cap: null,
    ethSupply: null,
    wethSupply: null,
    ethUsd: null,
    mkrUsd: null,
    lockedPeth: null,
    lockedWeth: null,
    gemPit: null,
    fee: null,
    mkrRoi: null,
    blockNumber: null,
    blockHash: null,
  }

  isLoaded = () => {
    return this.state.daiSupply !== null &&
      this.state.ethSupply !== null &&
      this.state.cap !== null &&
      this.state.lockedWeth !== null &&
      this.state.ethUsd !== null &&
      this.state.gemPit !== null &&
      this.state.mkrUsd !== null
  }

  componentDidMount() {
    this.init()
    setInterval(this.init, 60000)
    // this.startEvents()
  }

  startEvents = async () => {
    // weth.events.Transfer({}, (err, event) => {
    //   console.log(event)
    //   // console.log(web3.utils.fromWei(event.raw.data) + " WETH unlocked at " + event.transactionHash);
    //   if (event.event === "Transfer" && event.returnValues.dst === addresses.tub) {
    //     const { src, dst, wad } = event.returnValues
    //     // console.log(web3.utils.fromWei(event.raw.data))
    //     // console.log(`BOOM! ${web3.utils.fromWei(wad.toString())} moved into the tub!`)
    //     setTimeout(this.doLockedWeth, 1000)
    //   }
    // })
    // dai.events.allEvents({}, (err, event) => {
    //   if (event.event === "Transfer") {
    //     const { src, dst, wad } = event.returnValues
    //     // console.log(`${web3.utils.fromWei(wad.toString())} moved from ${src} to ${dst}`)
    //     window.lastEvent = event
    //   } else if (event.event === "Mint" || event.event === "Burn") {
    //     console.log(event.event + ' some Dai ' + web3.utils.fromWei(event.returnValues.wad))
    //     setTimeout(this.doDaiSupply, 1000)
    //   }
    // })
  }

  componentWillUnmount() {

  }

  init = async () => {
    const all = await Promise.all([
      this.doDaiSupply(),
      this.doCap(),
      this.doEthSupply(),
      this.doLockedWeth(),
      this.doWethSupply(),
      // this.doPethSupply(),
      // this.doLockedPeth(),
      this.doEthUsd(),
      this.doMkrUsd(),
      this.doGemPit(),
      this.doTubData(),
    ])
    this.setState({
      daiSupply: all[0],
      cap: all[1],
      ethSupply: all[2],
      lockedWeth: all[3],
      wethSupply: all[4],
      ethUsd: all[5],
      mkrUsd: all[6],
      gemPit: all[7],
      fee: all[8],
    })
    const mkrRoi = await this.doMkrRoi()
    this.setState({ mkrRoi })
  }

  doGemPit = async () => {
    let gemPit = await mkr.balanceOf(addresses.pit)
    return ethers.utils.formatEther(gemPit)
  }

  doLockedWeth = async () => {
    let lockedWeth = await tub.pie()
    return ethers.utils.formatEther(lockedWeth)
  }

  doLockedPeth = async () => {
    let lockedPeth = await tub.air()
    return ethers.utils.formatEther(lockedPeth)
  }

  doCap = async () => {
    let cap = await tub.cap()
    return ethers.utils.formatEther(cap)
  }

  doDaiSupply = async () => {
    let daiSupply = await dai.totalSupply()
    return ethers.utils.formatEther(daiSupply)
  }

  doWethSupply = async () => {
    let wethSupply = await weth.totalSupply()
    return ethers.utils.formatEther(wethSupply)
  }

  doPethSupply = async () => {
    let pethSupply = await peth.totalSupply()
    return ethers.utils.formatEther(pethSupply)
  }

  doEthSupply = async () => {
    const ethSupply = await etherscanSupply()
    return ethSupply
  }

  doEthUsd = async () => {
    let value = await ethUsd.read()
    return ethers.utils.formatEther(value)
  }

  doMkrUsd = async () => {
    let value = await mkrUsd.read()
    return ethers.utils.formatEther(value)
  }

  doTubData = async () => {
    let fee = await tub.fee()
    return parseFloat(ethers.utils.formatUnits(fee, 27)) ** (60*60*24*365) * 100 - 100
  }

  doMkrRoi() {
    const mkrSupply = 1000000 - this.state.gemPit
    const feesPerYear = this.state.fee / 100.0 * this.state.daiSupply
    return feesPerYear / (this.state.mkrUsd * mkrSupply) * 100.0
  }

  render() {
    if (this.isLoaded()) {
      return (
        <div>
          <Main {...this.state} />
        </div>
      )
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
