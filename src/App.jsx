import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import eth from './web3';
import Main from './Main'
import Calc from './Calc'
import daiLogo from './dai.svg'
const ethers = require('ethers')
const utils = ethers.utils

const jsonFetch = url => fetch(url).then(res => res.json())

const add = require('./addresses.json')
add["GEM_PIT"] = "0x69076e44a9C70a67D5b79d95795Aba299083c275"
add["UNISWAP_EXCHANGE"] = "0x2a1530C4C41db0B0b2bB646CB5Eb1A67b7158667"
add["MULTICALL"] = "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441"
add["CHAI"] = "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215"

const build = (address, name) => new ethers.Contract(address, require(`./abi/${name}.json`), eth)

const multi = build(add.MULTICALL, "Multicall")
const vat = build(add.MCD_VAT, "Vat")
const pot = build(add.MCD_POT, "Pot")
const jug = build(add.MCD_JUG, "Jug")
const vow = build(add.MCD_VOW, "Vow")
const cat = build(add.MCD_CAT, "Cat")
const spot = build(add.MCD_SPOT, "Spotter")
const weth = build(add.ETH, "ERC20")
const bat = build(add.BAT, "ERC20")
const sai = build(add.SAI, "ERC20")
const dai = build(add.MCD_DAI, "Dai")
const mkr = build(add.MCD_GOV, "ERC20")
const chai = build(add.CHAI, "Chai")
const manager = build(add.CDP_MANAGER, "DssCdpManager")
const ethFlip = build(add.MCD_FLIP_ETH_A, "Flipper");
const batFlip = build(add.MCD_FLIP_BAT_A, "Flipper");
const ethIlkBytes = utils.formatBytes32String("ETH-A");
const batIlkBytes = utils.formatBytes32String("BAT-A")
const saiIlkBytes = utils.formatBytes32String("SAI")
window.utils = utils
window.add = add
window.vat = vat
window.vow = vow
window.cat = cat
window.multi = multi

const RAY = utils.bigNumberify("1000000000000000000000000000")

class App extends Component {
  state = {
    blockNumber: null
  }

  POSITION_NXT = 4

  componentDidMount() {
    this.all()
    eth.on('block', this.all)
  }

  componentWillUnmount() {
    eth.removeAllListeners()
  }

  all = async () => {
    let p1 = multi.aggregate([
      [add.MCD_VAT, vat.interface.functions.Line.encode([])],
      [add.MCD_VAT, vat.interface.functions.debt.encode([])],
      [add.MCD_VAT, vat.interface.functions.ilks.encode([ethIlkBytes])],
      [add.MCD_VAT, vat.interface.functions.ilks.encode([batIlkBytes])],
      [add.MCD_VAT, vat.interface.functions.ilks.encode([saiIlkBytes])],
      [add.MCD_VOW, vow.interface.functions.hump.encode([])],
      [add.MCD_VOW, vow.interface.functions.sump.encode([])],
      [add.MCD_DAI, dai.interface.functions.totalSupply.encode([])],
      [add.MCD_DAI, dai.interface.functions.balanceOf.encode([add.UNISWAP_EXCHANGE])],
      [add.SAI, sai.interface.functions.totalSupply.encode([])],
      [add.SAI, sai.interface.functions.balanceOf.encode([add.MCD_JOIN_SAI])],
      [add.MCD_GOV, mkr.interface.functions.balanceOf.encode([add.GEM_PIT])],
      [add.ETH, weth.interface.functions.balanceOf.encode([add.MCD_JOIN_ETH_A])],
      [add.BAT, bat.interface.functions.totalSupply.encode([])],
      [add.BAT, bat.interface.functions.balanceOf.encode([add.MCD_JOIN_BAT_A])],
      [add.MCD_POT, pot.interface.functions.Pie.encode([])],
      [add.MCD_POT, pot.interface.functions.chi.encode([])],
      [add.MCD_POT, pot.interface.functions.rho.encode([])],
      [add.CDP_MANAGER, manager.interface.functions.cdpi.encode([])],
      [add.MCD_JUG, jug.interface.functions.base.encode([])],
      [add.MCD_JUG, jug.interface.functions.ilks.encode([ethIlkBytes])],
      [add.MCD_JUG, jug.interface.functions.ilks.encode([batIlkBytes])],
      [add.MCD_JUG, jug.interface.functions.ilks.encode([saiIlkBytes])],
      [add.MCD_VAT, vat.interface.functions.dai.encode([add.MCD_VOW])],
      [add.MCD_VAT, vat.interface.functions.sin.encode([add.MCD_VOW])],
      [add.MCD_VOW, vow.interface.functions.Ash.encode([])],
      [add.MCD_VOW, vow.interface.functions.Sin.encode([])],
      [add.MCD_POT, pot.interface.functions.dsr.encode([])],
      [add.MCD_FLIP_ETH_A, ethFlip.interface.functions.kicks.encode([])],
      [add.MCD_FLIP_BAT_A, batFlip.interface.functions.kicks.encode([])],
      [add.MCD_SPOT, spot.interface.functions.ilks.encode([ethIlkBytes])],
      [add.MCD_SPOT, spot.interface.functions.ilks.encode([batIlkBytes])],
      [add.CHAI, chai.interface.functions.totalSupply.encode([])],
      [add.MCD_GOV, mkr.interface.functions.totalSupply.encode([])],
      [add.MCD_VAT, vat.interface.functions.vice.encode([])],
    ])
    let p2 = this.etherscanEthSupply()
    let p3 = this.getOSMPrice(add.PIP_ETH, this.POSITION_NXT)
    let p4 = this.getOSMPrice(add.PIP_BAT, this.POSITION_NXT)
    let [res, ethSupply, ethPriceNxt, batPriceNxt] = await Promise.all([p1, p2, p3, p4])

    const blockNumber = res[0].toString()
    res = res[1]
    const ethIlk = vat.interface.functions.ilks.decode(res[2])
    const batIlk = vat.interface.functions.ilks.decode(res[3])
    const saiIlk = vat.interface.functions.ilks.decode(res[4])
    const daiSupply = dai.interface.functions.totalSupply.decode(res[7])
    const saiSupply = sai.interface.functions.totalSupply.decode(res[9])
    const ethLocked = weth.interface.functions.balanceOf.decode(res[12])
    const batSupply = bat.interface.functions.totalSupply.decode(res[13])
    const batLocked = bat.interface.functions.balanceOf.decode(res[14])
    const saiLocked = sai.interface.functions.balanceOf.decode(res[10])
    const gemPit = mkr.interface.functions.balanceOf.decode(res[11])
    const uniswapDai = dai.interface.functions.balanceOf.decode(res[8])
    const base = jug.interface.functions.base.decode(res[19])
    const ethFee = this.getFee(base, jug.interface.functions.ilks.decode(res[20]))
    const batFee = this.getFee(base, jug.interface.functions.ilks.decode(res[21]))
    const saiFee = this.getFee(base, jug.interface.functions.ilks.decode(res[22]))
    const jugEthDrip = jug.interface.functions.ilks.decode(res[20])
    const jugBatDrip = jug.interface.functions.ilks.decode(res[21])
    const vow_dai = vat.interface.functions.dai.decode(res[23])
    const vow_sin = vat.interface.functions.dai.decode(res[24])
    const ash = vow.interface.functions.Ash.decode(res[25])
    const sin = vow.interface.functions.Sin.decode(res[26])
    const surplusBuffer = vow.interface.functions.hump.decode(res[5])
    const debtSize = vow.interface.functions.sump.decode(res[6])
    const potFee = this.calcFee(pot.interface.functions.dsr.decode(res[27])[0])
    const savingsPie = pot.interface.functions.Pie.decode(res[15])[0]
    const pieChi = pot.interface.functions.chi.decode(res[16])[0]
    const savingsDai = savingsPie.mul(pieChi);
    const potDrip = pot.interface.functions.rho.decode(res[17])[0]
    const ethKicks = ethFlip.interface.functions.kicks.decode(res[28])[0]
    const batKicks = batFlip.interface.functions.kicks.decode(res[29])[0]
    const cdps = manager.interface.functions.cdpi.decode(res[18])
    const ethMat = spot.interface.functions.ilks.decode(res[30])
    const batMat = spot.interface.functions.ilks.decode(res[31])
    const ethPrice = ethMat.mat.mul(ethIlk.spot).div(RAY)
    const batPrice = batMat.mat.mul(batIlk.spot).div(RAY)
    const sysLocked = ethPrice.mul(ethLocked[0]).add(batPrice.mul(batLocked[0])).add(saiLocked[0])
    const chaiSupply = chai.interface.functions.totalSupply.decode(res[32])
    const mkrSupply = mkr.interface.functions.totalSupply.decode(res[33])
    const vice = vat.interface.functions.vice.decode(res[34])
    this.setState(state => {
      return {
        blockNumber,
        Line: utils.formatUnits(res[0], 45),
        debt: utils.formatUnits(res[1], 45),
        ilks: [
          {
            Art: utils.formatEther( ethIlk.Art),
            rate: utils.formatUnits(ethIlk.rate, 27),
            spot: utils.formatUnits(ethIlk.spot, 27),
            line: utils.formatUnits(ethIlk.line, 45),
            dust: utils.formatUnits(ethIlk.dust, 45)
          },
          {
            Art: utils.formatEther( batIlk.Art),
            rate: utils.formatUnits(batIlk.rate, 27),
            spot: utils.formatUnits(batIlk.spot, 27),
            line: utils.formatUnits(batIlk.line, 45),
            dust: utils.formatUnits(batIlk.dust, 45)
          },
          {
            Art: utils.formatEther( saiIlk.Art),
            rate: utils.formatUnits(saiIlk.rate, 27),
            spot: utils.formatUnits(saiIlk.spot, 27),
            line: utils.formatUnits(saiIlk.line, 45),
            dust: utils.formatUnits(saiIlk.dust, 45)
          },
        ],
        daiSupply: utils.formatEther(daiSupply[0]),
        saiSupply: utils.formatEther(saiSupply[0]),
        ethSupply: utils.formatEther(ethSupply),
        ethLocked: utils.formatEther(ethLocked[0]),
        batSupply: utils.formatEther(batSupply[0]),
        batLocked: utils.formatEther(batLocked[0]),
        saiLocked: utils.formatEther(saiLocked[0]),
        gemPit: utils.formatEther(gemPit[0]),
        uniswapDai: utils.formatEther(uniswapDai[0]),
        ethFee: ethFee.toFixed(2),
        batFee: batFee.toFixed(2),
        saiFee: saiFee.toFixed(2),
        jugEthDrip: this.unixToDateTime(jugEthDrip.rho.toNumber()),
        jugBatDrip: this.unixToDateTime(jugBatDrip.rho.toNumber()),
        sysSurplus: utils.formatUnits(vow_dai[0].sub(vow_sin[0]), 45),
        sysDebt: utils.formatUnits(vow_sin[0].sub(sin[0]).sub(ash[0]), 45),
        surplusBuffer: utils.formatUnits(surplusBuffer[0], 45),
        debtSize: utils.formatUnits(debtSize[0], 45),
        potFee: potFee.toFixed(2),
        savingsPie: utils.formatEther(savingsPie),
        savingsDai: utils.formatUnits(savingsDai, 45),
        potDrip: this.unixToDateTime(potDrip.toNumber()),
        ethKicks: ethKicks.toNumber(),
        batKicks: batKicks.toNumber(),
        cdps: cdps.toString(),
        ethPrice: utils.formatUnits(ethPrice, 27),
        ethPriceNxt: utils.formatEther(ethPriceNxt),
        batPrice: utils.formatUnits(batPrice, 27),
        batPriceNxt: utils.formatEther(batPriceNxt),
        sysLocked: utils.formatUnits(sysLocked, 45),
        chaiSupply: utils.formatEther(chaiSupply[0]),
        mkrSupply: utils.formatEther(mkrSupply[0]),
        vice: utils.formatUnits(vice[0], 45)
      }
    })
  }

  isLoaded = () => {
    return this.state.blockNumber !== null
  }
  unixToDateTime = stamp => new Date(stamp * 1000).toLocaleDateString("en-US") + " " + new Date(stamp * 1000).toLocaleTimeString("en-US")

  calcFee = rate => parseFloat(utils.formatUnits(rate, 27)) ** (60*60*24*365) * 100 - 100;

  getFee = (base, ilk) => {
    const {duty} = ilk;
    const combo = duty.add(base);
    return this.calcFee(combo);
  }

  etherscanEthSupply = async () => {
    const json = await jsonFetch('https://mkr.tools/api/v1/stats');
    return json.ethSupply * 10000000;
  }

  getOSMPrice = async (osm, position) => {
      const val = await eth.getStorageAt(osm, position);
      return utils.bigNumberify('0x' + val.substring(34));
  }

  render() {
    if (this.isLoaded()) {
      return (
        <Router>
          {/* <NavBar /> */}
          <Switch>
            <Route path="/calc">
              <Calc {...this.state} {...add} />
            </Route>
            <Route path="/">
              <Main {...this.state} {...add} />
            </Route>
          </Switch>
        </Router>
      )
    } else {
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
      )
    }
  }
}

const NavBar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">Home</Link>
        <Link className="navbar-item" to="/calc">Calculator</Link>
      </div>
      </div>
    </nav>
  )
}

export default App;
