import React, { Component } from 'react'
import { translate } from 'react-polyglot';
import {
  HashRouter as Router,
  Switch,
  Link,
  Route
} from "react-router-dom";
import './App.css';
import eth from './web3';
import Main from './Main'
import Dai from './Dai'
import daiLogo from './dai-pixel.png'

const ethers = require('ethers')
const utils = ethers.utils

const jsonFetch = url => fetch(url).then(res => res.json())

const add = require('./addresses.json')
add["GEM_PIT"] = "0x69076e44a9C70a67D5b79d95795Aba299083c275"
add["UNISWAP_DAI"] = "0x2a1530C4C41db0B0b2bB646CB5Eb1A67b7158667"
add["UNISWAP_MKR"] = "0x2C4Bd064b998838076fa341A83d007FC2FA50957"
add["MULTICALL"] = "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441"
add["CHAI"] = "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215"
add["OASIS_DEX"] = "0x794e6e91555438afc3ccf1c5076a74f42133d08d"

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
const usdc = build(add.USDC, "ERC20")
const tusd = build(add.TUSD, "ERC20")
const wbtc = build(add.WBTC, "ERC20")
const dai = build(add.MCD_DAI, "Dai")
const mkr = build(add.MCD_GOV, "DSToken")
const chai = build(add.CHAI, "Chai")
const manager = build(add.CDP_MANAGER, "DssCdpManager")
const ethFlip = build(add.MCD_FLIP_ETH_A, "Flipper");
const batFlip = build(add.MCD_FLIP_BAT_A, "Flipper");
const wbtcFlip = build(add.MCD_FLIP_WBTC_A, "Flipper");
const flap = build(add.MCD_FLAP, "Flapper");
const flop = build(add.MCD_FLOP, "Flopper");
const usdcPip = build(add.PIP_USDC, "DSValue")
const tusdPip = build(add.PIP_TUSD, "DSValue")
const ethIlkBytes = utils.formatBytes32String("ETH-A");
const batIlkBytes = utils.formatBytes32String("BAT-A")
const usdcIlkBytes = utils.formatBytes32String("USDC-A")
const usdcBIlkBytes = utils.formatBytes32String("USDC-B")
const tusdIlkBytes = utils.formatBytes32String("TUSD-A")
const wbtcIlkBytes = utils.formatBytes32String("WBTC-A");
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
    eth.on('block', (blockNumber) => {
      this.all(blockNumber)
    })
  }

  componentWillUnmount() {
    eth.removeAllListeners()
  }

  togglePause = () => {
    if (this.state.paused) {
      eth.on('block', (blockNumber) => {
        this.all(blockNumber)
      })
    } else {
      eth.removeAllListeners()
    }
    this.setState({
      paused: !this.state.paused
    })
  }

  all = async (blockNumber) => {
    let p1 = multi.callStatic.aggregate([
      [add.MCD_VAT, vat.interface.encodeFunctionData('Line', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('debt', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [ethIlkBytes])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [batIlkBytes])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('hump', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('sump', [])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.UNISWAP_DAI])],
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
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [usdcIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [usdcIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [usdcIlkBytes])],
      [add.USDC, usdc.interface.encodeFunctionData('totalSupply', [])],
      [add.USDC, usdc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_USDC_A])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('kicks', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('dump', [])],
      [add.PIP_USDC, usdcPip.interface.encodeFunctionData('read', [])],
      [add.MCD_GOV, mkr.interface.encodeFunctionData('balanceOf', [add.UNISWAP_MKR])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.OASIS_DEX])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [wbtcIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [wbtcIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [wbtcIlkBytes])],
      [add.WBTC, wbtc.interface.encodeFunctionData('totalSupply', [])],
      [add.WBTC, wbtc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_WBTC_A])],
      [add.MCD_FLIP_WBTC_A, wbtcFlip.interface.encodeFunctionData('kicks', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [usdcBIlkBytes])], // 55
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [usdcBIlkBytes])], // 56
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [usdcBIlkBytes])], // 57
      [add.USDC, usdc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_USDC_B])], // 58
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [tusdIlkBytes])], // 59
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [tusdIlkBytes])], // 60
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [tusdIlkBytes])], // 61
      [add.PIP_TUSD, tusdPip.interface.encodeFunctionData('read', [])],
      [add.TUSD, usdc.interface.encodeFunctionData('totalSupply', [])],
      [add.TUSD, tusd.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_TUSD_A])],
    ], {blockTag: blockNumber})
    let promises = [
      p1,
      this.etherscanEthSupply(),
      this.getOSMPrice(add.PIP_ETH, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_BAT, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_WBTC, this.POSITION_NXT),
      this.getMarketPrices()
    ]

    let [[block, res], ethSupply, ethPriceNxt, batPriceNxt, wbtcPriceNxt, marketPrices] = await Promise.all(promises)

    const ethIlk = vat.interface.decodeFunctionResult('ilks', res[2])
    const batIlk = vat.interface.decodeFunctionResult('ilks', res[3])
    const daiSupply = dai.interface.decodeFunctionResult('totalSupply', res[6])
    const ethLocked = weth.interface.decodeFunctionResult('balanceOf', res[9])
    const batSupply = bat.interface.decodeFunctionResult('totalSupply', res[10])
    const batLocked = bat.interface.decodeFunctionResult('balanceOf', res[11])
    const gemPit = mkr.interface.decodeFunctionResult('balanceOf', res[8])
    const uniswapDai = dai.interface.decodeFunctionResult('balanceOf', res[7])
    const uniswapMkr = mkr.interface.decodeFunctionResult('balanceOf', res[44])
    const base = jug.interface.decodeFunctionResult('base', res[16])
    const ethFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[17]))
    const batFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[18]))
    const jugEthDrip = jug.interface.decodeFunctionResult('ilks', res[17])
    const jugBatDrip = jug.interface.decodeFunctionResult('ilks', res[18])
    const jugUsdcDrip = jug.interface.decodeFunctionResult('ilks', res[34])
    const vow_dai = vat.interface.decodeFunctionResult('dai', res[19])
    const vow_sin = vat.interface.decodeFunctionResult('dai', res[20])
    const ash = vow.interface.decodeFunctionResult('Ash', res[21])
    const sin = vow.interface.decodeFunctionResult('Sin', res[22])
    const surplusBuffer = vow.interface.decodeFunctionResult('hump', res[4])
    const surplusBump = vow.interface.decodeFunctionResult('bump', res[31])
    const debtSize = vow.interface.decodeFunctionResult('sump', res[5])
    const debtDump = vow.interface.decodeFunctionResult('dump', res[39])
    const potFee = this.calcFee(pot.interface.decodeFunctionResult('dsr', res[23])[0])
    const savingsPie = pot.interface.decodeFunctionResult('Pie', res[12])[0]
    const pieChi = pot.interface.decodeFunctionResult('chi', res[13])[0]
    const savingsDai = savingsPie.mul(pieChi);
    const potDrip = pot.interface.decodeFunctionResult('rho', res[14])[0]
    const ethKicks = ethFlip.interface.decodeFunctionResult('kicks', res[24])[0]
    const batKicks = batFlip.interface.decodeFunctionResult('kicks', res[25])[0]
    const cdps = manager.interface.decodeFunctionResult('cdpi', res[15])
    const ethMat = spot.interface.decodeFunctionResult('ilks', res[26])
    const batMat = spot.interface.decodeFunctionResult('ilks', res[27])
    const ethPrice = ethMat.mat.mul(ethIlk.spot).div(RAY)
    const batPrice = batMat.mat.mul(batIlk.spot).div(RAY)
    const chaiSupply = chai.interface.decodeFunctionResult('totalSupply', res[28])[0]
    const daiBrewing = chaiSupply.mul(pieChi)
    const mkrSupply = mkr.interface.decodeFunctionResult('totalSupply', res[29])
    const mkrPrice = marketPrices.maker.usd
    const daiPrice = marketPrices.dai.usd
    const vice = vat.interface.decodeFunctionResult('vice', res[30])
    const flapKicks = flap.interface.decodeFunctionResult('kicks', res[32])[0]
    const flopKicks = flop.interface.decodeFunctionResult('kicks', res[38])[0]
    const usdcIlk = vat.interface.decodeFunctionResult('ilks', res[33])
    const usdcFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[34]))
    const usdcSupply = usdc.interface.decodeFunctionResult('totalSupply', res[36])
    const usdcLocked = usdc.interface.decodeFunctionResult('balanceOf', res[37])
    const usdcPrice = usdcPip.interface.decodeFunctionResult('read', res[40])[0]
    const oasisDexDai = dai.interface.decodeFunctionResult('balanceOf', res[42])
    const wbtcIlk = vat.interface.decodeFunctionResult('ilks', res[43])
    const wbtcFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[44]))
    const jugWbtcDrip = jug.interface.decodeFunctionResult('ilks', res[44])
    const wbtcMat = spot.interface.decodeFunctionResult('ilks', res[45])
    const wbtcPrice = wbtcMat.mat.mul(wbtcIlk.spot).div(RAY)
    const wbtcSupply = wbtc.interface.decodeFunctionResult('totalSupply', res[46])
    const wbtcLocked = wbtc.interface.decodeFunctionResult('balanceOf', res[47])
    const wbtcKicks = wbtcFlip.interface.decodeFunctionResult('kicks', res[48])[0]
    const usdcBIlk = vat.interface.decodeFunctionResult('ilks', res[49])
    const usdcBFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[51]))
    const jugUsdcBDrip = jug.interface.decodeFunctionResult('ilks', res[51])
    const usdcBLocked = usdc.interface.decodeFunctionResult('balanceOf', res[52])
    const tusdIlk = vat.interface.decodeFunctionResult('ilks', res[53])
    const tusdFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[55]))
    const jugtusdDrip = jug.interface.decodeFunctionResult('ilks', res[55])
    const tusdPrice = tusdPip.interface.decodeFunctionResult('read', res[56])[0]
    const tusdSupply = tusd.interface.decodeFunctionResult('totalSupply', res[57])
    const tusdLocked = tusd.interface.decodeFunctionResult('balanceOf', res[58])
    const sysLocked = ethPrice.mul(ethLocked[0]).add(batPrice.mul(batLocked[0])).add(wbtcPrice.mul(wbtcLocked[0])).add(ethers.BigNumber.from(usdcPrice).mul(usdcLocked[0])).add(ethers.BigNumber.from(usdcPrice).mul(usdcBLocked[0])).add(ethers.BigNumber.from(tusdPrice).mul(tusdLocked[0]))
    this.setState(state => {
      return {
        networkId: networkId,
        blockNumber: block.toString(),
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
            Art:  utils.formatEther(usdcIlk.Art),
            rate: utils.formatUnits(usdcIlk.rate, 27),
            spot: utils.formatUnits(usdcIlk.spot, 27),
            line: utils.formatUnits(usdcIlk.line, 45),
            dust: utils.formatUnits(usdcIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(wbtcIlk.Art),
            rate: utils.formatUnits(wbtcIlk.rate, 27),
            spot: utils.formatUnits(wbtcIlk.spot, 27),
            line: utils.formatUnits(wbtcIlk.line, 45),
            dust: utils.formatUnits(wbtcIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(usdcBIlk.Art),
            rate: utils.formatUnits(usdcBIlk.rate, 27),
            spot: utils.formatUnits(usdcBIlk.spot, 27),
            line: utils.formatUnits(usdcBIlk.line, 45),
            dust: utils.formatUnits(usdcBIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(tusdIlk.Art),
            rate: utils.formatUnits(tusdIlk.rate, 27),
            spot: utils.formatUnits(tusdIlk.spot, 27),
            line: utils.formatUnits(tusdIlk.line, 45),
            dust: utils.formatUnits(tusdIlk.dust, 45)
          },
        ],
        daiSupply: utils.formatEther(daiSupply[0]),
        ethSupply: utils.formatEther(ethSupply),
        ethLocked: utils.formatEther(ethLocked[0]),
        batSupply: utils.formatEther(batSupply[0]),
        batLocked: utils.formatEther(batLocked[0]),
        usdcSupply: utils.formatUnits(usdcSupply[0], 6),
        usdcLocked: utils.formatUnits(usdcLocked[0], 6),
        usdcBLocked: utils.formatUnits(usdcBLocked[0], 6),
        gemPit: utils.formatEther(gemPit[0]),
        uniswapDai: utils.formatEther(uniswapDai[0]),
        uniswapMkr: utils.formatEther(uniswapMkr[0]),
        ethFee: ethFee.toFixed(2),
        batFee: batFee.toFixed(2),
        usdcFee: usdcFee.toFixed(2),
        usdcBFee: usdcBFee.toFixed(2),
        wbtcFee: wbtcFee.toFixed(2),
        tusdFee: tusdFee.toFixed(2),
        jugEthDrip: this.unixToDateTime(jugEthDrip.rho.toNumber()),
        jugBatDrip: this.unixToDateTime(jugBatDrip.rho.toNumber()),
        jugUsdcDrip: this.unixToDateTime(jugUsdcDrip.rho.toNumber()),
        jugUsdcBDrip: this.unixToDateTime(jugUsdcBDrip.rho.toNumber()),
        jugWbtcDrip: this.unixToDateTime(jugWbtcDrip.rho.toNumber()),
        jugtusdDrip: this.unixToDateTime(jugtusdDrip.rho.toNumber()),
        sysSurplus: utils.formatUnits(vow_dai[0].sub(vow_sin[0]), 45),
        sysDebt: utils.formatUnits(vow_sin[0].sub(sin[0]).sub(ash[0]), 45),
        sysDebtRaw: vow_sin[0].sub(sin[0]).sub(ash[0]).toString(),
        vowDaiRaw: vow_dai[0].toString(),
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
        wbtcKicks: wbtcKicks.toNumber(),
        flapKicks: flapKicks.toNumber(),
        flopKicks: flopKicks.toNumber(),
        cdps: cdps.toString(),
        ethPrice: utils.formatUnits(ethPrice, 27),
        ethPriceNxt: utils.formatEther(ethPriceNxt),
        batPrice: utils.formatUnits(batPrice, 27),
        batPriceNxt: utils.formatEther(batPriceNxt),
        wbtcPrice: utils.formatUnits(wbtcPrice, 27),
        wbtcPriceNxt: utils.formatEther(wbtcPriceNxt),
        mkrPrice: mkrPrice,
        daiPrice: daiPrice,
        usdcPrice: utils.formatEther(usdcPrice),
        tusdPrice: utils.formatEther(tusdPrice),
        sysLocked: utils.formatUnits(sysLocked, 45),
        chaiSupply: utils.formatEther(chaiSupply),
        mkrSupply: utils.formatEther(mkrSupply[0]),
        mkrAnnualBurn: this.getMKRAnnualBurn(ethIlk, ethFee, batIlk, batFee, wbtcIlk, wbtcFee, usdcIlk, usdcFee, usdcBIlk, usdcBFee, tusdIlk, tusdFee, savingsDai, potFee, mkrPrice),
        vice: utils.formatUnits(vice[0], 45),
        vow_dai: utils.formatUnits(vow_dai[0], 45),
        vow_sin: utils.formatUnits(vow_sin[0], 45),
        bigSin: utils.formatUnits(sin[0], 45),
        daiBrewing: utils.formatUnits(daiBrewing, 45),
        oasisDexDai: utils.formatEther(oasisDexDai[0]),
        wbtcSupply: utils.formatUnits(wbtcSupply[0], 8),
        wbtcLocked: utils.formatUnits(wbtcLocked[0], 8),
        tusdSupply: utils.formatEther(tusdSupply[0]),
        tusdLocked: utils.formatEther(tusdLocked[0]),
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
    const json = await jsonFetch('https://api.etherscan.io/api?action=ethsupply&module=stats&apikey=N5TICDBVG4MHDS7CGPJ9MHXRYC1Y84963N');
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

  getMKRAnnualBurn = (
    ethIlk, ethFee, batIlk, batFee, wbtcIlk, wbtcFee, usdcIlk, usdcFee, usdcBIlk, usdcBFee, tusdIlk, tusdFee, savingsDai, potFee, mkrPrice) => {

    const daiFromETH = utils.formatEther(ethIlk.Art) * utils.formatUnits(ethIlk.rate, 27)
    const stabilityETH = ethFee / 100
    const daiFromBAT = utils.formatEther(batIlk.Art) * utils.formatUnits(batIlk.rate, 27)
    const stabilityBAT = batFee / 100
    const daiFromWBTC = utils.formatEther(wbtcIlk.Art) * utils.formatUnits(wbtcIlk.rate, 27)
    const stabilityWBTC = wbtcFee / 100
    const daiFromUSDC = utils.formatEther(usdcIlk.Art) * utils.formatUnits(usdcIlk.rate, 27)
    const stabilityUSDC = usdcFee / 100
    const daiFromUSDCB = utils.formatEther(usdcBIlk.Art) * utils.formatUnits(usdcBIlk.rate, 27)
    const stabilityUSDCB = usdcBFee / 100
    const daiFromTUSD = utils.formatEther(tusdIlk.Art) * utils.formatUnits(tusdIlk.rate, 27)
    const stabilityTUSD = tusdFee / 100
    const dsrDai = utils.formatUnits(savingsDai, 45)
    const dsrRate = potFee / 100

    const mkrAnnualBurn = (
    (  (daiFromETH * stabilityETH)
     + (daiFromBAT * stabilityBAT)
     + (daiFromWBTC * stabilityWBTC)
     + (daiFromUSDC * stabilityUSDC)
     + (daiFromUSDCB * stabilityUSDCB)
     + (daiFromTUSD * stabilityTUSD)
     - (dsrDai * dsrRate)
    )
    / mkrPrice
    )

    return mkrAnnualBurn
  }

  render() {
    const t = this.props.t
    if (this.isLoaded()) {
      return (
        <Router basename="/">
          {/* <NavBar /> */}
          <div className="notification is-primary has-text-centered">
            { /* eslint-disable-next-line */ }
            {t('daistats.block')}: <strong>{this.state.blockNumber}</strong>. {this.state.paused ? `${t('daistats.pause')}.` : `${t('daistats.auto_updating')}.`} <a onClick={this.togglePause}>{this.state.paused ? t('daistats.restart') : t('daistats.pause')}</a>
            <br />
            TUSD and USBC-B are here! <a href="https://twitter.com/nanexcool" target="_blank" rel="noopener noreferrer">{t('daistats.say_hi')}</a>
            <br />
            <div className="buttons is-centered">
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('en')}>English</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('es')}>Español</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('fr')}>Français</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('it')}>Italiano</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('de')}>Deutsch</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('id')}>Bahasa Indonesia</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('zh-TW')}>繁體中文</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('ru')}>Русский</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('ga')}>Gaeilge</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('tr')}>Türkçe</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('pl')}>Polski</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('ro')}>Română</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('fa')}>فارسی</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('uk')}>українська мова</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('kr')}>한국어</button>
              {/* <button className="button is-small is-rounded" onClick={() => this.props.toggle('dw')}>Daiwanese 🤪</button> */}
            </div>
          </div>
          <Switch>
            <Route path="/dai">
              <Dai {...this.state} {...add} />
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
            <p>{t('daistats.one_sec')}</p>
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
        <Link className="navbar-item" to="/dai">What's the total supply of Dai?</Link>
      </div>
      </div>
    </nav>
  )
}

export default translate()(App)
