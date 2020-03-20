import React, { Component } from 'react'
import intl from 'react-intl-universal'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import eth from './web3';
import Main from './Main'
import Calc from './Calc'
import daiLogo from './dai-pixel.png'
// import confetti from './confetti'

const ethers = require('ethers')
const utils = ethers.utils

const jsonFetch = url => fetch(url).then(res => res.json())

const add = require('./addresses.json')
add["GEM_PIT"] = "0x69076e44a9C70a67D5b79d95795Aba299083c275"
add["UNISWAP_DAI"] = "0x2a1530C4C41db0B0b2bB646CB5Eb1A67b7158667"
add["UNISWAP_MKR"] = "0x2C4Bd064b998838076fa341A83d007FC2FA50957"
add["MULTICALL"] = "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441"
add["CHAI"] = "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215"

let provider;
let networkId;
if (typeof window.ethereum !== 'undefined') {
  networkId = parseInt(window.ethereum.chainId);
  window.ethereum.autoRefreshOnNetworkChange = false;
  if (networkId === 1) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
}

const build = (address, name) => {
  return new ethers.Contract(
    address,
    require(`./abi/${name}.json`),
    provider ? provider : eth
  );
}

const multi = build(add.MULTICALL, "Multicall")
const vat = build(add.MCD_VAT, "Vat")
const pot = build(add.MCD_POT, "Pot")
const jug = build(add.MCD_JUG, "Jug")
const vow = build(add.MCD_VOW, "Vow")
const pit = build(add.GEM_PIT, "GemPit")
const cat = build(add.MCD_CAT, "Cat")
const spot = build(add.MCD_SPOT, "Spotter")
const weth = build(add.ETH, "ERC20")
const bat = build(add.BAT, "ERC20")
const sai = build(add.SAI, "ERC20")
const usdc = build(add.USDC, "ERC20")
const sai_tub = build(add.SAI_TUB, "SaiTub")
const dai = build(add.MCD_DAI, "Dai")
const mkr = build(add.MCD_GOV, "DSToken")
const chai = build(add.CHAI, "Chai")
const manager = build(add.CDP_MANAGER, "DssCdpManager")
const ethFlip = build(add.MCD_FLIP_ETH_A, "Flipper");
const batFlip = build(add.MCD_FLIP_BAT_A, "Flipper");
const flap = build(add.MCD_FLAP, "Flapper");
const flop = build(add.MCD_FLOP, "Flopper");
const usdcPip = build(add.PIP_USDC, "DSValue")
const ethIlkBytes = utils.formatBytes32String("ETH-A");
const batIlkBytes = utils.formatBytes32String("BAT-A")
const usdcIlkBytes = utils.formatBytes32String("USDC-A")
const saiIlkBytes = utils.formatBytes32String("SAI")
window.utils = utils
window.add = add
window.vat = vat
window.vow = vow
window.pit = pit
window.cat = cat
window.chai = chai
window.mkr = mkr
window.pot = pot
window.jug = jug
window.multi = multi

const RAY = ethers.BigNumber.from("1000000000000000000000000000")

class App extends Component {
  state = {
    blockNumber: null,
    paused: false,
  }

  POSITION_NXT = 4

  componentDidMount() {
    this.all()
    eth.on('block', this.all)
  }

  componentWillUnmount() {
    eth.removeAllListeners()
  }

  togglePause = () => {
    if (this.state.paused) {
      this.all()
      eth.on('block', this.all)
    } else {
      eth.removeAllListeners()
    }
    this.setState({
      paused: !this.state.paused
    })
  }

  all = async () => {
    let p1 = multi.callStatic.aggregate([
      [add.MCD_VAT, vat.interface.encodeFunctionData('Line', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('debt', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [ethIlkBytes])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [batIlkBytes])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [saiIlkBytes])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('hump', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('sump', [])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.UNISWAP_DAI])],
      [add.SAI, sai.interface.encodeFunctionData('totalSupply', [])],
      [add.SAI, sai.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_SAI])],
      [add.MCD_GOV, mkr.interface.encodeFunctionData('balanceOf', [add.GEM_PIT])],
      [add.ETH, weth.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_ETH_A])],
      [add.BAT, bat.interface.encodeFunctionData('totalSupply', [])],
      [add.BAT, bat.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_BAT_A])],
      [add.MCD_POT, pot.interface.encodeFunctionData('Pie', [])],
      [add.MCD_POT, pot.interface.encodeFunctionData('chi', [])],
      [add.MCD_POT, pot.interface.encodeFunctionData('rho', [])],
      [add.CDP_MANAGER, manager.interface.encodeFunctionData('cdpi', [])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('base', [])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [ethIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [batIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [saiIlkBytes])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('dai', [add.MCD_VOW])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('sin', [add.MCD_VOW])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('Ash', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('Sin', [])],
      [add.MCD_POT, pot.interface.encodeFunctionData('dsr', [])],
      [add.MCD_FLIP_ETH_A, ethFlip.interface.encodeFunctionData('kicks', [])],
      [add.MCD_FLIP_BAT_A, batFlip.interface.encodeFunctionData('kicks', [])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [ethIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [batIlkBytes])],
      [add.CHAI, chai.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_GOV, mkr.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('vice', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('bump', [])],
      [add.MCD_FLAP, flap.interface.encodeFunctionData('kicks', [])],
      [add.SAI_TUB, sai_tub.interface.encodeFunctionData('tax'), []],
      [add.SAI_TUB, sai_tub.interface.encodeFunctionData('fee'), []],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [usdcIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [usdcIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [usdcIlkBytes])],
      [add.USDC, usdc.interface.encodeFunctionData('totalSupply', [])],
      [add.USDC, usdc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_USDC_A])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('kicks', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('dump', [])],
      [add.PIP_USDC, usdcPip.interface.encodeFunctionData('read', [])],
      [add.MCD_GOV, mkr.interface.encodeFunctionData('balanceOf', [add.UNISWAP_MKR])],
    ])
    let p2 = this.etherscanEthSupply()
    let p3 = this.getOSMPrice(add.PIP_ETH, this.POSITION_NXT)
    let p4 = this.getOSMPrice(add.PIP_BAT, this.POSITION_NXT)
    let p5 = this.getMarketPrices()

    let [[blockNumber, res], ethSupply, ethPriceNxt, batPriceNxt, marketPrices] = await Promise.all([p1, p2, p3, p4, p5])

    const ethIlk = vat.interface.decodeFunctionResult('ilks', res[2])
    const batIlk = vat.interface.decodeFunctionResult('ilks', res[3])
    const saiIlk = vat.interface.decodeFunctionResult('ilks', res[4])
    const daiSupply = dai.interface.decodeFunctionResult('totalSupply', res[7])
    const saiSupply = sai.interface.decodeFunctionResult('totalSupply', res[9])
    const ethLocked = weth.interface.decodeFunctionResult('balanceOf', res[12])
    const batSupply = bat.interface.decodeFunctionResult('totalSupply', res[13])
    const batLocked = bat.interface.decodeFunctionResult('balanceOf', res[14])
    const saiLocked = sai.interface.decodeFunctionResult('balanceOf', res[10])
    const gemPit = mkr.interface.decodeFunctionResult('balanceOf', res[11])
    const uniswapDai = dai.interface.decodeFunctionResult('balanceOf', res[8])
    const uniswapMkr = mkr.interface.decodeFunctionResult('balanceOf', res[47])
    const base = jug.interface.decodeFunctionResult('base', res[19])
    const ethFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[20]))
    const batFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[21]))
    const saiFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[22]))
    const jugEthDrip = jug.interface.decodeFunctionResult('ilks', res[20])
    const jugBatDrip = jug.interface.decodeFunctionResult('ilks', res[21])
    const jugUsdcDrip = jug.interface.decodeFunctionResult('ilks', res[40])
    const vow_dai = vat.interface.decodeFunctionResult('dai', res[23])
    const vow_sin = vat.interface.decodeFunctionResult('dai', res[24])
    const ash = vow.interface.decodeFunctionResult('Ash', res[25])
    const sin = vow.interface.decodeFunctionResult('Sin', res[26])
    const surplusBuffer = vow.interface.decodeFunctionResult('hump', res[5])
    const surplusBump = vow.interface.decodeFunctionResult('bump', res[35])
    const debtSize = vow.interface.decodeFunctionResult('sump', res[6])
    const debtDump = vow.interface.decodeFunctionResult('dump', res[45])
    const potFee = this.calcFee(pot.interface.decodeFunctionResult('dsr', res[27])[0])
    const savingsPie = pot.interface.decodeFunctionResult('Pie', res[15])[0]
    const pieChi = pot.interface.decodeFunctionResult('chi', res[16])[0]
    const savingsDai = savingsPie.mul(pieChi);
    const potDrip = pot.interface.decodeFunctionResult('rho', res[17])[0]
    const ethKicks = ethFlip.interface.decodeFunctionResult('kicks', res[28])[0]
    const batKicks = batFlip.interface.decodeFunctionResult('kicks', res[29])[0]
    const cdps = manager.interface.decodeFunctionResult('cdpi', res[18])
    const ethMat = spot.interface.decodeFunctionResult('ilks', res[30])
    const batMat = spot.interface.decodeFunctionResult('ilks', res[31])
    const ethPrice = ethMat.mat.mul(ethIlk.spot).div(RAY)
    const batPrice = batMat.mat.mul(batIlk.spot).div(RAY)
    const sysLocked = ethPrice.mul(ethLocked[0]).add(batPrice.mul(batLocked[0])).add(saiLocked[0])
    const chaiSupply = chai.interface.decodeFunctionResult('totalSupply', res[32])[0]
    const daiBrewing = chaiSupply.mul(pieChi)
    const mkrSupply = mkr.interface.decodeFunctionResult('totalSupply', res[33])
    const mkrPrice = marketPrices.maker.usd
    const daiPrice = marketPrices.dai.usd
    const vice = vat.interface.decodeFunctionResult('vice', res[34])
    const flapKicks = flap.interface.decodeFunctionResult('kicks', res[36])[0]
    const flopKicks = flop.interface.decodeFunctionResult('kicks', res[44])[0]
    const saiTubTax = this.calcFee(sai_tub.interface.decodeFunctionResult('tax', res[37])[0])
    const saiTubFee = this.calcFee(sai_tub.interface.decodeFunctionResult('fee', res[38])[0])
    const usdcIlk = vat.interface.decodeFunctionResult('ilks', res[39])
    const usdcFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[40]))
    const usdcSupply = usdc.interface.decodeFunctionResult('totalSupply', res[42])
    const usdcLocked = usdc.interface.decodeFunctionResult('balanceOf', res[43])
    const usdcPrice = usdcPip.interface.decodeFunctionResult('read', res[46])[0]
    const scdFee = saiTubTax + saiTubFee
    this.setState(state => {
      return {
        networkId: networkId,
        blockNumber: blockNumber.toString(),
        Line: utils.formatUnits(res[0], 45),
        debt: utils.formatUnits(res[1], 45),
        ilks: [
          {
            Art:  utils.formatEther(ethIlk.Art),
            rate: utils.formatUnits(ethIlk.rate, 27),
            spot: utils.formatUnits(ethIlk.spot, 27),
            line: utils.formatUnits(ethIlk.line, 45),
            dust: utils.formatUnits(ethIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(batIlk.Art),
            rate: utils.formatUnits(batIlk.rate, 27),
            spot: utils.formatUnits(batIlk.spot, 27),
            line: utils.formatUnits(batIlk.line, 45),
            dust: utils.formatUnits(batIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(saiIlk.Art),
            rate: utils.formatUnits(saiIlk.rate, 27),
            spot: utils.formatUnits(saiIlk.spot, 27),
            line: utils.formatUnits(saiIlk.line, 45),
            dust: utils.formatUnits(saiIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(usdcIlk.Art),
            rate: utils.formatUnits(usdcIlk.rate, 27),
            spot: utils.formatUnits(usdcIlk.spot, 27),
            line: utils.formatUnits(usdcIlk.line, 45),
            dust: utils.formatUnits(usdcIlk.dust, 45)
          },
        ],
        daiSupply: utils.formatEther(daiSupply[0]),
        saiSupply: utils.formatEther(saiSupply[0]),
        ethSupply: utils.formatEther(ethSupply),
        ethLocked: utils.formatEther(ethLocked[0]),
        batSupply: utils.formatEther(batSupply[0]),
        batLocked: utils.formatEther(batLocked[0]),
        usdcSupply: utils.formatUnits(usdcSupply[0], 6),
        usdcLocked: utils.formatUnits(usdcLocked[0], 6),
        saiLocked: utils.formatEther(saiLocked[0]),
        gemPit: utils.formatEther(gemPit[0]),
        uniswapDai: utils.formatEther(uniswapDai[0]),
        uniswapMkr: utils.formatEther(uniswapMkr[0]),
        ethFee: ethFee.toFixed(2),
        batFee: batFee.toFixed(2),
        saiFee: saiFee.toFixed(2),
        usdcFee: usdcFee.toFixed(2),
        scdFee: scdFee,
        jugEthDrip: this.unixToDateTime(jugEthDrip.rho.toNumber()),
        jugBatDrip: this.unixToDateTime(jugBatDrip.rho.toNumber()),
        jugUsdcDrip: this.unixToDateTime(jugUsdcDrip.rho.toNumber()),
        sysSurplus: utils.formatUnits(vow_dai[0].sub(vow_sin[0]), 45),
        sysDebt: utils.formatUnits(vow_sin[0].sub(sin[0]).sub(ash[0]), 45),
        sysDebtRaw: vow_sin[0].sub(sin[0]).sub(ash[0]).toString(),
        surplusBuffer: utils.formatUnits(surplusBuffer[0], 45),
        surplusBump: utils.formatUnits(surplusBump[0], 45),
        debtDump: utils.formatEther(debtDump[0]),
        debtSize: utils.formatUnits(debtSize[0], 45),
        potFee: potFee.toFixed(2),
        savingsPie: utils.formatEther(savingsPie),
        savingsDai: utils.formatUnits(savingsDai, 45),
        potDrip: this.unixToDateTime(potDrip.toNumber()),
        ethKicks: ethKicks.toNumber(),
        batKicks: batKicks.toNumber(),
        flapKicks: flapKicks.toNumber(),
        flopKicks: flopKicks.toNumber(),
        cdps: cdps.toString(),
        ethPrice: utils.formatUnits(ethPrice, 27),
        ethPriceNxt: utils.formatEther(ethPriceNxt),
        batPrice: utils.formatUnits(batPrice, 27),
        batPriceNxt: utils.formatEther(batPriceNxt),
        mkrPrice: mkrPrice,
        daiPrice: daiPrice,
        usdcPrice: utils.formatEther(usdcPrice),
        sysLocked: utils.formatUnits(sysLocked, 45),
        chaiSupply: utils.formatEther(chaiSupply),
        mkrSupply: utils.formatEther(mkrSupply[0]),
        mkrAnnualBurn: this.getMKRAnnualBurn(ethIlk, ethFee, batIlk, batFee, saiSupply[0], scdFee, savingsDai, potFee, mkrPrice),
        vice: utils.formatUnits(vice[0], 45),
        daiBrewing: utils.formatUnits(daiBrewing, 45),
        darkMode: JSON.parse(localStorage.getItem("ds-darkmode"))
      }
    })
      // confetti.rain()
    // if (parseInt(utils.formatEther(ethLocked[0])) >= 2000000) {
    // }
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
    const ethapi = intl.get('ethapi')
    const json = await jsonFetch(ethapi+'/api?action=ethsupply&module=stats&apikey=N5TICDBVG4MHDS7CGPJ9MHXRYC1Y84963N');
    return json.result;
  }

  getOSMPrice = async (osm, position) => {
    const val = await eth.getStorageAt(osm, position);
    return ethers.BigNumber.from('0x' + val.substring(34));
  }

  getMarketPrices = async () => {
    const json = await jsonFetch('https://api.coingecko.com/api/v3/simple/price?ids=maker%2Cdai&vs_currencies=usd');
    return json;
  }

  getMKRAnnualBurn = (ethIlk, ethFee, batIlk, batFee, saiSupply, scdFee, savingsDai, potFee, mkrPrice) => {

    const daiFromETH = utils.formatEther(ethIlk.Art) * utils.formatUnits(ethIlk.rate, 27)
    const stabilityETH = ethFee / 100
    const daiFromBAT = utils.formatEther(batIlk.Art) * utils.formatUnits(batIlk.rate, 27)
    const stabilityBAT = batFee / 100
    const daiFromSai = utils.formatEther(saiSupply)
    const stabilitySai = scdFee / 100
    const dsrDai = utils.formatUnits(savingsDai, 45)
    const dsrRate = potFee / 100

    const mkrAnnualBurn = (
    (  (daiFromETH * stabilityETH)
     + (daiFromBAT * stabilityBAT)
     + (daiFromSai * stabilitySai)
     - (dsrDai * dsrRate)
    )
    / mkrPrice
    )

    return mkrAnnualBurn
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
              <Main {...this.state} {...add} togglePause={this.togglePause} />
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
           <p>{intl.get('One_sec')}</p>
         </div>
       </section>
      )
    }
  }
}

/*
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
*/

export default App;
