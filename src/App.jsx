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
// import confetti from './confetti'

const ethers = require('ethers')
const utils = ethers.utils

const jsonFetch = url => fetch(url).then(res => res.json())

const add = require('./addresses.json')
add["GEM_PIT"] = "0x69076e44a9C70a67D5b79d95795Aba299083c275"
add["UNISWAP_DAI"] = "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"
add["UNISWAP_MKR"] = "0x2C4Bd064b998838076fa341A83d007FC2FA50957"
add["MULTICALL"] = "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441"
add["CHAI"] = "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215"
add["OASIS_DEX"] = "0x794e6e91555438afc3ccf1c5076a74f42133d08d"
add["MCD_JOIN_USDC_PSM"] = "0x0A59649758aa4d66E25f08Dd01271e891fe52199"
add["MCD_FLIP_USDC_PSM"] = "0x507420100393b1Dc2e8b4C8d0F8A13B56268AC99"
add["MCD_PSM_USDC_PSM"] = "0x89B78CfA322F6C5dE0aBcEecab66Aee45393cC5A"

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
const knc = build(add.KNC, "ERC20")
const zrx = build(add.ZRX, "ERC20")
const mana = build(add.MANA, "ERC20")
const pax = build(add.PAXUSD, "ERC20")
const usdt = build(add.USDT, "ERC20")
const comp = build(add.COMP, "ERC20")
const lrc = build(add.LRC, "ERC20")
const link = build(add.LINK, "ERC20")
const bal = build(add.BAL, "ERC20")
const yfi = build(add.YFI, "ERC20")
const gusd = build(add.GUSD, "ERC20")
const uni = build(add.UNI, "ERC20")
const renbtc = build(add.RENBTC, "ERC20")
const aave = build(add.AAVE, "ERC20")
const univ2daieth = build(add.UNIV2DAIETH, "ERC20")
const univ2wbtceth = build(add.UNIV2WBTCETH, "ERC20")
const univ2usdceth = build(add.UNIV2USDCETH, "ERC20")
const psmUsdc = build(add.MCD_PSM_USDC_PSM, "DssPsm")
const dai = build(add.MCD_DAI, "Dai")
const mkr = build(add.MCD_GOV, "DSToken")
const chai = build(add.CHAI, "Chai")
const manager = build(add.CDP_MANAGER, "DssCdpManager")
const ethFlip = build(add.MCD_FLIP_ETH_A, "Flipper");
const ethBFlip = build(add.MCD_FLIP_ETH_B, "Flipper");
const batFlip = build(add.MCD_FLIP_BAT_A, "Flipper");
const wbtcFlip = build(add.MCD_FLIP_WBTC_A, "Flipper");
const kncAFlip = build(add.MCD_FLIP_KNC_A, "Flipper");
const zrxAFlip = build(add.MCD_FLIP_ZRX_A, "Flipper");
const manaAFlip = build(add.MCD_FLIP_MANA_A, "Flipper");
const paxAFlip = build(add.MCD_FLIP_PAXUSD_A, "Flipper");
const usdtAFlip = build(add.MCD_FLIP_USDT_A, "Flipper");
const compAFlip = build(add.MCD_FLIP_COMP_A, "Flipper");
const lrcAFlip = build(add.MCD_FLIP_LRC_A, "Flipper");
const linkAFlip = build(add.MCD_FLIP_LINK_A, "Flipper");
const balAFlip = build(add.MCD_FLIP_BAL_A, "Flipper");
const yfiAFlip = build(add.MCD_FLIP_YFI_A, "Flipper");
const uniAFlip = build(add.MCD_FLIP_UNI_A, "Flipper");
const renbtcAFlip = build(add.MCD_FLIP_RENBTC_A, "Flipper");
const aaveAFlip = build(add.MCD_FLIP_AAVE_A, "Flipper");
const univ2daiethAFlip = build(add.MCD_FLIP_UNIV2DAIETH_A, "Flipper");
const univ2wbtcethAFlip = build(add.MCD_FLIP_UNIV2WBTCETH_A, "Flipper");
const univ2usdcethAFlip = build(add.MCD_FLIP_UNIV2USDCETH_A, "Flipper");
const flap = build(add.MCD_FLAP, "Flapper");
const flop = build(add.MCD_FLOP, "Flopper");
const usdcPip = build(add.PIP_USDC, "DSValue")
const tusdPip = build(add.PIP_TUSD, "DSValue")
const paxPip = build(add.PIP_PAXUSD, "DSValue")
const usdtPip = build(add.PIP_USDT, "DSValue")
const gusdPip = build(add.PIP_GUSD, "DSValue")
const ethIlkBytes = utils.formatBytes32String("ETH-A");
const ethBIlkBytes = utils.formatBytes32String("ETH-B");
const batIlkBytes = utils.formatBytes32String("BAT-A")
const usdcIlkBytes = utils.formatBytes32String("USDC-A")
const usdcBIlkBytes = utils.formatBytes32String("USDC-B")
const tusdIlkBytes = utils.formatBytes32String("TUSD-A")
const wbtcIlkBytes = utils.formatBytes32String("WBTC-A");
const kncAIlkBytes = utils.formatBytes32String("KNC-A");
const zrxAIlkBytes = utils.formatBytes32String("ZRX-A");
const manaAIlkBytes = utils.formatBytes32String("MANA-A");
const paxAIlkBytes = utils.formatBytes32String("PAXUSD-A");
const usdtAIlkBytes = utils.formatBytes32String("USDT-A");
const compAIlkBytes = utils.formatBytes32String("COMP-A");
const lrcAIlkBytes = utils.formatBytes32String("LRC-A");
const linkAIlkBytes = utils.formatBytes32String("LINK-A");
const balAIlkBytes = utils.formatBytes32String("BAL-A");
const yfiAIlkBytes = utils.formatBytes32String("YFI-A");
const gusdAIlkBytes = utils.formatBytes32String("GUSD-A");
const uniAIlkBytes = utils.formatBytes32String("UNI-A");
const renbtcAIlkBytes = utils.formatBytes32String("RENBTC-A");
const aaveAIlkBytes = utils.formatBytes32String("AAVE-A");
const univ2daiethAIlkBytes = utils.formatBytes32String("UNIV2DAIETH-A");
const psmUsdcAIlkBytes = utils.formatBytes32String("PSM-USDC-A");
const univ2wbtcethAIlkBytes = utils.formatBytes32String("UNIV2WBTCETH-A");
const univ2usdcethAIlkBytes = utils.formatBytes32String("UNIV2USDCETH-A");
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
window.dai = dai

const RAY = ethers.BigNumber.from("1000000000000000000000000000")

class App extends Component {
  state = {
    blockNumber: null,
    paused: false,
  }

  POSITION_NXT = 4
  POSITION_UNIV2_NXT = 7

  componentDidMount() {
    this.all('latest')
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
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [usdcIlkBytes])], //unused
      [add.USDC, usdc.interface.encodeFunctionData('totalSupply', [])],
      [add.USDC, usdc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_USDC_A])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('kicks', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('dump', [])],
      [add.PIP_USDC, usdcPip.interface.encodeFunctionData('read', [])],
      [add.MCD_GOV, mkr.interface.encodeFunctionData('balanceOf', [add.UNISWAP_MKR])], //unused
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.OASIS_DEX])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [wbtcIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [wbtcIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [wbtcIlkBytes])], // 45
      [add.WBTC, wbtc.interface.encodeFunctionData('totalSupply', [])],
      [add.WBTC, wbtc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_WBTC_A])],
      [add.MCD_FLIP_WBTC_A, wbtcFlip.interface.encodeFunctionData('kicks', [])], // 48
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [usdcBIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [usdcBIlkBytes])], // unused
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [usdcBIlkBytes])],
      [add.USDC, usdc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_USDC_B])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [tusdIlkBytes])], // 53
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [tusdIlkBytes])], // unused
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [tusdIlkBytes])],
      [add.PIP_TUSD, tusdPip.interface.encodeFunctionData('read', [])],
      [add.TUSD, usdc.interface.encodeFunctionData('totalSupply', [])],
      [add.TUSD, tusd.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_TUSD_A])], // 58
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [kncAIlkBytes])], // 59
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [kncAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [kncAIlkBytes])], // 61
      [add.KNC, knc.interface.encodeFunctionData('totalSupply', [])],
      [add.KNC, knc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_KNC_A])], // 63
      [add.MCD_FLIP_KNC_A, kncAFlip.interface.encodeFunctionData('kicks', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [zrxAIlkBytes])], // 65
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [zrxAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [zrxAIlkBytes])], // 67
      [add.ZRX, zrx.interface.encodeFunctionData('totalSupply', [])],
      [add.ZRX, zrx.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_ZRX_A])], // 69
      [add.MCD_FLIP_ZRX_A, zrxAFlip.interface.encodeFunctionData('kicks', [])], // 70

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [manaAIlkBytes])], // 71
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [manaAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [manaAIlkBytes])], // 73
      [add.MANA, mana.interface.encodeFunctionData('totalSupply', [])],
      [add.MANA, mana.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_MANA_A])], // 75
      [add.MCD_FLIP_MANA_A, manaAFlip.interface.encodeFunctionData('kicks', [])], // 76

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [paxAIlkBytes])], // 77
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [paxAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [paxAIlkBytes])], // 79 unused
      [add.PAXUSD, pax.interface.encodeFunctionData('totalSupply', [])],
      [add.PAXUSD, pax.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_PAXUSD_A])], // 81

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [usdtAIlkBytes])], // 82
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [usdtAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [usdtAIlkBytes])], // 84
      [add.USDT, usdt.interface.encodeFunctionData('totalSupply', [])],
      [add.USDT, usdt.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_USDT_A])], // 86
      [add.MCD_FLIP_USDT_A, usdtAFlip.interface.encodeFunctionData('kicks', [])], // 87

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [compAIlkBytes])], // 88
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [compAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [compAIlkBytes])], // 90
      [add.COMP, comp.interface.encodeFunctionData('totalSupply', [])],
      [add.COMP, comp.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_COMP_A])], // 92
      [add.MCD_FLIP_COMP_A, compAFlip.interface.encodeFunctionData('kicks', [])], // 93

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [lrcAIlkBytes])], // 94
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [lrcAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [lrcAIlkBytes])], // 96
      [add.LRC, lrc.interface.encodeFunctionData('totalSupply', [])],
      [add.LRC, lrc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_LRC_A])], // 98
      [add.MCD_FLIP_LRC_A, lrcAFlip.interface.encodeFunctionData('kicks', [])], // 99

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [linkAIlkBytes])], // 100
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [linkAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [linkAIlkBytes])], // 102
      [add.LINK, link.interface.encodeFunctionData('totalSupply', [])],
      [add.LINK, link.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_LINK_A])], // 104
      [add.MCD_FLIP_LINK_A, linkAFlip.interface.encodeFunctionData('kicks', [])], // 105

      [add.MCD_FLIP_ETH_B, ethBFlip.interface.encodeFunctionData('kicks', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [ethBIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [ethBIlkBytes])], // 108
      [add.ETH, weth.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_ETH_B])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [ethBIlkBytes])],

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [balAIlkBytes])], // 111
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [balAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [balAIlkBytes])], // 113
      [add.BAL, bal.interface.encodeFunctionData('totalSupply', [])],
      [add.BAL, bal.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_BAL_A])], // 115
      [add.MCD_FLIP_BAL_A, balAFlip.interface.encodeFunctionData('kicks', [])],

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [yfiAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [yfiAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [yfiAIlkBytes])], // 119
      [add.YFI, yfi.interface.encodeFunctionData('totalSupply', [])], // 120
      [add.YFI, yfi.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_YFI_A])],
      [add.MCD_FLIP_YFI_A, yfiAFlip.interface.encodeFunctionData('kicks', [])],

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [gusdAIlkBytes])], // 123
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [gusdAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [gusdAIlkBytes])], // 125 unused
      [add.GUSD, gusd.interface.encodeFunctionData('totalSupply', [])],
      [add.GUSD, gusd.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_GUSD_A])], // 127

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [uniAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [uniAIlkBytes])], // 129
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [uniAIlkBytes])],
      [add.UNI, uni.interface.encodeFunctionData('totalSupply', [])], // 131
      [add.UNI, uni.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_UNI_A])],
      [add.MCD_FLIP_UNI_A, uniAFlip.interface.encodeFunctionData('kicks', [])], // 133

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [renbtcAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [renbtcAIlkBytes])], // 135
      [add.RENBTC, renbtc.interface.encodeFunctionData('totalSupply', [])], // 136
      [add.RENBTC, renbtc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_RENBTC_A])],
      [add.MCD_FLIP_RENBTC_A, renbtcAFlip.interface.encodeFunctionData('kicks', [])], // 138

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [aaveAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [aaveAIlkBytes])], // 140
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [aaveAIlkBytes])],
      [add.AAVE, aave.interface.encodeFunctionData('totalSupply', [])], // 142
      [add.AAVE, aave.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_AAVE_A])],
      [add.MCD_FLIP_AAVE_A, aaveAFlip.interface.encodeFunctionData('kicks', [])], // 144

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [univ2daiethAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [univ2daiethAIlkBytes])], // 146
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [univ2daiethAIlkBytes])],
      [add.UNIV2DAIETH, univ2daieth.interface.encodeFunctionData('totalSupply', [])], // 148
      [add.UNIV2DAIETH, univ2daieth.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_UNIV2DAIETH_A])],
      [add.MCD_FLIP_UNIV2DAIETH_A, univ2daiethAFlip.interface.encodeFunctionData('kicks', [])], // 150

      [add.MCD_PSM_USDC_PSM, psmUsdc.interface.encodeFunctionData('tin', [])], // 151
      [add.MCD_PSM_USDC_PSM, psmUsdc.interface.encodeFunctionData('tout', [])], // 152
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [psmUsdcAIlkBytes])],
      [add.USDC, usdc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_USDC_PSM])], // 154

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [univ2wbtcethAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [univ2wbtcethAIlkBytes])], // 156
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [univ2wbtcethAIlkBytes])],
      [add.UNIV2WBTCETH, univ2wbtceth.interface.encodeFunctionData('totalSupply', [])], // 158
      [add.UNIV2WBTCETH, univ2wbtceth.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_UNIV2WBTCETH_A])],
      [add.MCD_FLIP_UNIV2WBTCETH_A, univ2wbtcethAFlip.interface.encodeFunctionData('kicks', [])], // 160

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [univ2usdcethAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [univ2usdcethAIlkBytes])], // 162
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [univ2usdcethAIlkBytes])],
      [add.UNIV2USDCETH, univ2daieth.interface.encodeFunctionData('totalSupply', [])], // 164
      [add.UNIV2USDCETH, univ2daieth.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_UNIV2USDCETH_A])],
      [add.MCD_FLIP_UNIV2USDCETH_A, univ2usdcethAFlip.interface.encodeFunctionData('kicks', [])], // 166

    ], {blockTag: blockNumber})
    let promises = [
      p1,
      this.etherscanEthSupply(),
      this.getOSMPrice(add.PIP_ETH, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_BAT, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_WBTC, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_KNC, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_ZRX, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_MANA, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_USDT, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_COMP, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_LRC, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_LINK, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_BAL, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_YFI, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_UNI, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_AAVE, this.POSITION_NXT),
      this.getOSMPrice(add.PIP_UNIV2DAIETH, this.POSITION_UNIV2_NXT),
      this.getOSMPrice(add.PIP_UNIV2WBTCETH, this.POSITION_UNIV2_NXT),
      this.getOSMPrice(add.PIP_UNIV2USDCETH, this.POSITION_UNIV2_NXT),
    ]

    let [[block, res], ethSupply, ethPriceNxt, batPriceNxt, wbtcPriceNxt,
        kncPriceNxt, zrxPriceNxt, manaPriceNxt, usdtPriceNxt, compPriceNxt,
        lrcPriceNxt, linkPriceNxt, balPriceNxt, yfiPriceNxt, uniPriceNxt,
        aavePriceNxt, univ2daiethPriceNxt, univ2wbtcethPriceNxt, univ2usdcethPriceNxt] = await Promise.all(promises)

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
    const jugTusdDrip = jug.interface.decodeFunctionResult('ilks', res[55])
    const tusdPrice = tusdPip.interface.decodeFunctionResult('read', res[56])[0]
    const tusdSupply = tusd.interface.decodeFunctionResult('totalSupply', res[57])
    const tusdLocked = tusd.interface.decodeFunctionResult('balanceOf', res[58])
    const kncAIlk = vat.interface.decodeFunctionResult('ilks', res[59])
    const kncAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[60]))
    const jugKncADrip = jug.interface.decodeFunctionResult('ilks', res[60])
    const kncAMat = spot.interface.decodeFunctionResult('ilks', res[61])
    const kncPrice = kncAMat.mat.mul(kncAIlk.spot).div(RAY)
    const kncSupply = knc.interface.decodeFunctionResult('totalSupply', res[62])
    const kncALocked = knc.interface.decodeFunctionResult('balanceOf', res[63])
    const kncAKicks = kncAFlip.interface.decodeFunctionResult('kicks', res[64])[0]
    const zrxAIlk = vat.interface.decodeFunctionResult('ilks', res[65])
    const zrxAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[66]))
    const jugZrxADrip = jug.interface.decodeFunctionResult('ilks', res[66])
    const zrxAMat = spot.interface.decodeFunctionResult('ilks', res[67])
    const zrxPrice = zrxAMat.mat.mul(zrxAIlk.spot).div(RAY)
    const zrxSupply = zrx.interface.decodeFunctionResult('totalSupply', res[68])
    const zrxALocked = zrx.interface.decodeFunctionResult('balanceOf', res[69])
    const zrxAKicks = zrxAFlip.interface.decodeFunctionResult('kicks', res[70])[0]

    const manaAIlk = vat.interface.decodeFunctionResult('ilks', res[71])
    const manaAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[72]))
    const jugManaADrip = jug.interface.decodeFunctionResult('ilks', res[72])
    const manaAMat = spot.interface.decodeFunctionResult('ilks', res[73])
    const manaPrice = manaAMat.mat.mul(manaAIlk.spot).div(RAY)
    const manaSupply = mana.interface.decodeFunctionResult('totalSupply', res[74])
    const manaALocked = mana.interface.decodeFunctionResult('balanceOf', res[75])
    const manaAKicks = manaAFlip.interface.decodeFunctionResult('kicks', res[76])[0]

    const paxAIlk = vat.interface.decodeFunctionResult('ilks', res[77])
    const paxAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[78]))
    const jugPaxADrip = jug.interface.decodeFunctionResult('ilks', res[78])
    const paxAMat = spot.interface.decodeFunctionResult('ilks', res[79])
    const paxPrice = paxAMat.mat.mul(paxAIlk.spot).div(RAY)
    const paxSupply = pax.interface.decodeFunctionResult('totalSupply', res[80])
    const paxALocked = pax.interface.decodeFunctionResult('balanceOf', res[81])

    const usdtAIlk = vat.interface.decodeFunctionResult('ilks', res[82])
    const usdtAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[83]))
    const jugUsdtADrip = jug.interface.decodeFunctionResult('ilks', res[83])
    const usdtAMat = spot.interface.decodeFunctionResult('ilks', res[84])
    const usdtPrice = usdtAMat.mat.mul(usdtAIlk.spot).div(RAY)
    const usdtSupply = usdt.interface.decodeFunctionResult('totalSupply', res[85])
    const usdtALocked = usdt.interface.decodeFunctionResult('balanceOf', res[86])
    const usdtAKicks = usdtAFlip.interface.decodeFunctionResult('kicks', res[87])[0]

    const compAIlk = vat.interface.decodeFunctionResult('ilks', res[88])
    const compAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[89]))
    const jugCompADrip = jug.interface.decodeFunctionResult('ilks', res[89])
    const compAMat = spot.interface.decodeFunctionResult('ilks', res[90])
    const compPrice = compAMat.mat.mul(compAIlk.spot).div(RAY)
    const compSupply = comp.interface.decodeFunctionResult('totalSupply', res[91])
    const compALocked = comp.interface.decodeFunctionResult('balanceOf', res[92])
    const compAKicks = compAFlip.interface.decodeFunctionResult('kicks', res[93])[0]

    const lrcAIlk = vat.interface.decodeFunctionResult('ilks', res[94])
    const lrcAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[95]))
    const jugLrcADrip = jug.interface.decodeFunctionResult('ilks', res[95])
    const lrcAMat = spot.interface.decodeFunctionResult('ilks', res[96])
    const lrcPrice = lrcAMat.mat.mul(lrcAIlk.spot).div(RAY)
    const lrcSupply = lrc.interface.decodeFunctionResult('totalSupply', res[97])
    const lrcALocked = lrc.interface.decodeFunctionResult('balanceOf', res[98])
    const lrcAKicks = lrcAFlip.interface.decodeFunctionResult('kicks', res[99])[0]

    const linkAIlk = vat.interface.decodeFunctionResult('ilks', res[100])
    const linkAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[101]))
    const jugLinkADrip = jug.interface.decodeFunctionResult('ilks', res[101])
    const linkAMat = spot.interface.decodeFunctionResult('ilks', res[102])
    const linkPrice = linkAMat.mat.mul(linkAIlk.spot).div(RAY)
    const linkSupply = link.interface.decodeFunctionResult('totalSupply', res[103])
    const linkALocked = link.interface.decodeFunctionResult('balanceOf', res[104])
    const linkAKicks = linkAFlip.interface.decodeFunctionResult('kicks', res[105])[0]

    const ethBKicks = ethBFlip.interface.decodeFunctionResult('kicks', res[106])[0]
    const ethBIlk = vat.interface.decodeFunctionResult('ilks', res[107])
    const ethBFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[108]))
    const ethBLocked = weth.interface.decodeFunctionResult('balanceOf', res[109])
    const jugEthBDrip = jug.interface.decodeFunctionResult('ilks', res[110])

    const balAIlk = vat.interface.decodeFunctionResult('ilks', res[111])
    const balAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[112]))
    const jugBalADrip = jug.interface.decodeFunctionResult('ilks', res[112])
    const balAMat = spot.interface.decodeFunctionResult('ilks', res[113])
    const balPrice = balAMat.mat.mul(balAIlk.spot).div(RAY)
    const balSupply = bal.interface.decodeFunctionResult('totalSupply', res[114])
    const balALocked = bal.interface.decodeFunctionResult('balanceOf', res[115])
    const balAKicks = balAFlip.interface.decodeFunctionResult('kicks', res[116])[0]

    const yfiAIlk = vat.interface.decodeFunctionResult('ilks', res[117])
    const yfiAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[118]))
    const jugYfiADrip = jug.interface.decodeFunctionResult('ilks', res[118])
    const yfiAMat = spot.interface.decodeFunctionResult('ilks', res[119])
    const yfiPrice = yfiAMat.mat.mul(yfiAIlk.spot).div(RAY)
    const yfiSupply = yfi.interface.decodeFunctionResult('totalSupply', res[120])
    const yfiALocked = yfi.interface.decodeFunctionResult('balanceOf', res[121])
    const yfiAKicks = yfiAFlip.interface.decodeFunctionResult('kicks', res[122])[0]

    const gusdAIlk = vat.interface.decodeFunctionResult('ilks', res[123])
    const gusdAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[124]))
    const jugGusdADrip = jug.interface.decodeFunctionResult('ilks', res[124])
    const gusdAMat = spot.interface.decodeFunctionResult('ilks', res[125])
    const gusdPrice = gusdAMat.mat.mul(gusdAIlk.spot).div(RAY)
    const gusdSupply = gusd.interface.decodeFunctionResult('totalSupply', res[126])
    const gusdALocked = gusd.interface.decodeFunctionResult('balanceOf', res[127])

    const uniAIlk = vat.interface.decodeFunctionResult('ilks', res[128])
    const uniAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[129]))
    const jugUniADrip = jug.interface.decodeFunctionResult('ilks', res[129])
    const uniAMat = spot.interface.decodeFunctionResult('ilks', res[130])
    const uniPrice = uniAMat.mat.mul(uniAIlk.spot).div(RAY)
    const uniSupply = uni.interface.decodeFunctionResult('totalSupply', res[131])
    const uniALocked = uni.interface.decodeFunctionResult('balanceOf', res[132])
    const uniAKicks = uniAFlip.interface.decodeFunctionResult('kicks', res[133])[0]

    const renbtcAIlk = vat.interface.decodeFunctionResult('ilks', res[134])
    const renbtcAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[135]))
    const jugRenbtcADrip = jug.interface.decodeFunctionResult('ilks', res[135])
    const renbtcSupply = renbtc.interface.decodeFunctionResult('totalSupply', res[136])
    const renbtcALocked = renbtc.interface.decodeFunctionResult('balanceOf', res[137])
    const renbtcAKicks = renbtcAFlip.interface.decodeFunctionResult('kicks', res[138])[0]

    const aaveAIlk = vat.interface.decodeFunctionResult('ilks', res[139])
    const aaveAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[140]))
    const jugAaveADrip = jug.interface.decodeFunctionResult('ilks', res[140])
    const aaveAMat = spot.interface.decodeFunctionResult('ilks', res[141])
    const aavePrice = aaveAMat.mat.mul(aaveAIlk.spot).div(RAY)
    const aaveSupply = aave.interface.decodeFunctionResult('totalSupply', res[142])
    const aaveALocked = aave.interface.decodeFunctionResult('balanceOf', res[143])
    const aaveAKicks = aaveAFlip.interface.decodeFunctionResult('kicks', res[144])[0]

    const univ2daiethAIlk = vat.interface.decodeFunctionResult('ilks', res[145])
    const univ2daiethAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[146]))
    const jugUniv2daiethADrip = jug.interface.decodeFunctionResult('ilks', res[146])
    const univ2daiethAMat = spot.interface.decodeFunctionResult('ilks', res[147])
    const univ2daiethPrice = univ2daiethAMat.mat.mul(univ2daiethAIlk.spot).div(RAY)
    const univ2daiethSupply = univ2daieth.interface.decodeFunctionResult('totalSupply', res[148])
    const univ2daiethALocked = univ2daieth.interface.decodeFunctionResult('balanceOf', res[149])
    const univ2daiethAKicks = univ2daiethAFlip.interface.decodeFunctionResult('kicks', res[150])[0]

    const psmUsdcTin = psmUsdc.interface.decodeFunctionResult('tin', res[151])[0]
    const psmUsdcTout = psmUsdc.interface.decodeFunctionResult('tout', res[152])[0]
    const psmUsdcAIlk = vat.interface.decodeFunctionResult('ilks', res[153])
    const psmUsdcALocked = usdc.interface.decodeFunctionResult('balanceOf', res[154])

    const univ2wbtcethAIlk = vat.interface.decodeFunctionResult('ilks', res[155])
    const univ2wbtcethAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[156]))
    const jugUniv2wbtcethADrip = jug.interface.decodeFunctionResult('ilks', res[156])
    const univ2wbtcethAMat = spot.interface.decodeFunctionResult('ilks', res[157])
    const univ2wbtcethPrice = univ2wbtcethAMat.mat.mul(univ2wbtcethAIlk.spot).div(RAY)
    const univ2wbtcethSupply = univ2wbtceth.interface.decodeFunctionResult('totalSupply', res[158])
    const univ2wbtcethALocked = univ2wbtceth.interface.decodeFunctionResult('balanceOf', res[159])
    const univ2wbtcethAKicks = univ2wbtcethAFlip.interface.decodeFunctionResult('kicks', res[160])[0]

    const univ2usdcethAIlk = vat.interface.decodeFunctionResult('ilks', res[161])
    const univ2usdcethAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[162]))
    const jugUniv2usdcethADrip = jug.interface.decodeFunctionResult('ilks', res[162])
    const univ2usdcethAMat = spot.interface.decodeFunctionResult('ilks', res[163])
    const univ2usdcethPrice = univ2usdcethAMat.mat.mul(univ2usdcethAIlk.spot).div(RAY)
    const univ2usdcethSupply = univ2usdceth.interface.decodeFunctionResult('totalSupply', res[164])
    const univ2usdcethALocked = univ2usdceth.interface.decodeFunctionResult('balanceOf', res[165])
    const univ2usdcethAKicks = univ2usdcethAFlip.interface.decodeFunctionResult('kicks', res[166])[0]

    const sysLocked = ethPrice.mul(ethLocked[0]).add(batPrice.mul(batLocked[0])).add(wbtcPrice.mul(wbtcLocked[0])).add(ethers.BigNumber.from(usdcPrice).mul(usdcLocked[0])).add(ethers.BigNumber.from(usdcPrice).mul(usdcBLocked[0])).add(ethers.BigNumber.from(tusdPrice).mul(tusdLocked[0])).add(ethers.BigNumber.from(kncPrice).mul(kncALocked[0])).add(ethers.BigNumber.from(zrxPrice).mul(zrxALocked[0])).add(ethers.BigNumber.from(paxPrice).mul(paxALocked[0])).add(ethers.BigNumber.from(usdtPrice).mul(usdtALocked[0])).add(ethers.BigNumber.from(compPrice).mul(compALocked[0])).add(ethers.BigNumber.from(lrcPrice).mul(lrcALocked[0])).add(ethers.BigNumber.from(linkPrice).mul(linkALocked[0]))
    // if (parseInt(utils.formatUnits(res[1], 45)) >= 300000000) confetti.rain()
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
          {
            Art:  utils.formatEther(kncAIlk.Art),
            rate: utils.formatUnits(kncAIlk.rate, 27),
            spot: utils.formatUnits(kncAIlk.spot, 27),
            line: utils.formatUnits(kncAIlk.line, 45),
            dust: utils.formatUnits(kncAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(zrxAIlk.Art),
            rate: utils.formatUnits(zrxAIlk.rate, 27),
            spot: utils.formatUnits(zrxAIlk.spot, 27),
            line: utils.formatUnits(zrxAIlk.line, 45),
            dust: utils.formatUnits(zrxAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(manaAIlk.Art),
            rate: utils.formatUnits(manaAIlk.rate, 27),
            spot: utils.formatUnits(manaAIlk.spot, 27),
            line: utils.formatUnits(manaAIlk.line, 45),
            dust: utils.formatUnits(manaAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(paxAIlk.Art),
            rate: utils.formatUnits(paxAIlk.rate, 27),
            spot: utils.formatUnits(paxAIlk.spot, 27),
            line: utils.formatUnits(paxAIlk.line, 45),
            dust: utils.formatUnits(paxAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(usdtAIlk.Art),
            rate: utils.formatUnits(usdtAIlk.rate, 27),
            spot: utils.formatUnits(usdtAIlk.spot, 27),
            line: utils.formatUnits(usdtAIlk.line, 45),
            dust: utils.formatUnits(usdtAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(compAIlk.Art),
            rate: utils.formatUnits(compAIlk.rate, 27),
            spot: utils.formatUnits(compAIlk.spot, 27),
            line: utils.formatUnits(compAIlk.line, 45),
            dust: utils.formatUnits(compAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(lrcAIlk.Art),
            rate: utils.formatUnits(lrcAIlk.rate, 27),
            spot: utils.formatUnits(lrcAIlk.spot, 27),
            line: utils.formatUnits(lrcAIlk.line, 45),
            dust: utils.formatUnits(lrcAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(linkAIlk.Art),
            rate: utils.formatUnits(linkAIlk.rate, 27),
            spot: utils.formatUnits(linkAIlk.spot, 27),
            line: utils.formatUnits(linkAIlk.line, 45),
            dust: utils.formatUnits(linkAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(ethBIlk.Art),
            rate: utils.formatUnits(ethBIlk.rate, 27),
            spot: utils.formatUnits(ethBIlk.spot, 27),
            line: utils.formatUnits(ethBIlk.line, 45),
            dust: utils.formatUnits(ethBIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(balAIlk.Art),
            rate: utils.formatUnits(balAIlk.rate, 27),
            spot: utils.formatUnits(balAIlk.spot, 27),
            line: utils.formatUnits(balAIlk.line, 45),
            dust: utils.formatUnits(balAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(yfiAIlk.Art),
            rate: utils.formatUnits(yfiAIlk.rate, 27),
            spot: utils.formatUnits(yfiAIlk.spot, 27),
            line: utils.formatUnits(yfiAIlk.line, 45),
            dust: utils.formatUnits(yfiAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(gusdAIlk.Art),
            rate: utils.formatUnits(gusdAIlk.rate, 27),
            spot: utils.formatUnits(gusdAIlk.spot, 27),
            line: utils.formatUnits(gusdAIlk.line, 45),
            dust: utils.formatUnits(gusdAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(uniAIlk.Art),
            rate: utils.formatUnits(uniAIlk.rate, 27),
            spot: utils.formatUnits(uniAIlk.spot, 27),
            line: utils.formatUnits(uniAIlk.line, 45),
            dust: utils.formatUnits(uniAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(renbtcAIlk.Art),
            rate: utils.formatUnits(renbtcAIlk.rate, 27),
            spot: utils.formatUnits(renbtcAIlk.spot, 27),
            line: utils.formatUnits(renbtcAIlk.line, 45),
            dust: utils.formatUnits(renbtcAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(aaveAIlk.Art),
            rate: utils.formatUnits(aaveAIlk.rate, 27),
            spot: utils.formatUnits(aaveAIlk.spot, 27),
            line: utils.formatUnits(aaveAIlk.line, 45),
            dust: utils.formatUnits(aaveAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(univ2daiethAIlk.Art),
            rate: utils.formatUnits(univ2daiethAIlk.rate, 27),
            spot: utils.formatUnits(univ2daiethAIlk.spot, 27),
            line: utils.formatUnits(univ2daiethAIlk.line, 45),
            dust: utils.formatUnits(univ2daiethAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(univ2wbtcethAIlk.Art),
            rate: utils.formatUnits(univ2wbtcethAIlk.rate, 27),
            spot: utils.formatUnits(univ2wbtcethAIlk.spot, 27),
            line: utils.formatUnits(univ2wbtcethAIlk.line, 45),
            dust: utils.formatUnits(univ2wbtcethAIlk.dust, 45)
          },
          {
            Art:  utils.formatEther(univ2usdcethAIlk.Art),
            rate: utils.formatUnits(univ2usdcethAIlk.rate, 27),
            spot: utils.formatUnits(univ2usdcethAIlk.spot, 27),
            line: utils.formatUnits(univ2usdcethAIlk.line, 45),
            dust: utils.formatUnits(univ2usdcethAIlk.dust, 45)
          }
        ],
        daiSupply: utils.formatEther(daiSupply[0]),
        ethSupply: utils.formatEther(ethSupply),
        ethLocked: utils.formatEther(ethLocked[0]),
        ethBLocked: utils.formatEther(ethBLocked[0]),
        batSupply: utils.formatEther(batSupply[0]),
        batLocked: utils.formatEther(batLocked[0]),
        usdcSupply: utils.formatUnits(usdcSupply[0], 6),
        usdcLocked: utils.formatUnits(usdcLocked[0], 6),
        usdcBLocked: utils.formatUnits(usdcBLocked[0], 6),
        paxSupply: utils.formatEther(paxSupply[0]),
        paxALocked: utils.formatEther(paxALocked[0]),
        usdtSupply: utils.formatUnits(usdtSupply[0], 6),
        usdtALocked: utils.formatUnits(usdtALocked[0], 6),
        compSupply: utils.formatEther(compSupply[0]),
        compALocked: utils.formatEther(compALocked[0]),
        lrcSupply: utils.formatEther(lrcSupply[0]),
        lrcALocked: utils.formatEther(lrcALocked[0]),
        linkSupply: utils.formatEther(linkSupply[0]),
        linkALocked: utils.formatEther(linkALocked[0]),
        balSupply: utils.formatEther(balSupply[0]),
        balALocked: utils.formatEther(balALocked[0]),
        yfiSupply: utils.formatEther(yfiSupply[0]),
        yfiALocked: utils.formatEther(yfiALocked[0]),
        gusdSupply: utils.formatUnits(gusdSupply[0], 2),
        gusdALocked: utils.formatUnits(gusdALocked[0], 2),
        uniSupply: utils.formatEther(uniSupply[0]),
        uniALocked: utils.formatEther(uniALocked[0]),
        renbtcSupply: utils.formatUnits(renbtcSupply[0], 8),
        renbtcALocked: utils.formatUnits(renbtcALocked[0], 8),
        aaveSupply: utils.formatEther(aaveSupply[0]),
        aaveALocked: utils.formatEther(aaveALocked[0]),
        univ2daiethSupply: utils.formatEther(univ2daiethSupply[0]),
        univ2daiethALocked: utils.formatEther(univ2daiethALocked[0]),
        univ2wbtcethSupply: utils.formatEther(univ2wbtcethSupply[0]),
        univ2wbtcethALocked: utils.formatEther(univ2wbtcethALocked[0]),
        univ2usdcethSupply: utils.formatEther(univ2usdcethSupply[0]),
        univ2usdcethALocked: utils.formatEther(univ2usdcethALocked[0]),
        psmUsdcALocked: utils.formatUnits(psmUsdcALocked[0], 6),
        gemPit: utils.formatEther(gemPit[0]),
        uniswapDai: utils.formatEther(uniswapDai[0]),
        uniswapMkr: utils.formatEther(uniswapMkr[0]),
        ethFee: ethFee.toFixed(2),
        ethBFee: ethBFee.toFixed(2),
        batFee: batFee.toFixed(2),
        usdcFee: usdcFee.toFixed(2),
        usdcBFee: usdcBFee.toFixed(2),
        wbtcFee: wbtcFee.toFixed(2),
        tusdFee: tusdFee.toFixed(2),
        kncAFee: kncAFee.toFixed(2),
        zrxAFee: zrxAFee.toFixed(2),
        manaAFee: manaAFee.toFixed(2),
        paxAFee: paxAFee.toFixed(2),
        usdtAFee: usdtAFee.toFixed(2),
        compAFee: compAFee.toFixed(2),
        lrcAFee: lrcAFee.toFixed(2),
        linkAFee: linkAFee.toFixed(2),
        balAFee: balAFee.toFixed(2),
        yfiAFee: yfiAFee.toFixed(2),
        gusdAFee: gusdAFee.toFixed(2),
        uniAFee: uniAFee.toFixed(2),
        renbtcAFee: renbtcAFee.toFixed(2),
        aaveAFee: aaveAFee.toFixed(2),
        univ2daiethAFee: univ2daiethAFee.toFixed(2),
        univ2wbtcethAFee: univ2wbtcethAFee.toFixed(2),
        univ2usdcethAFee: univ2usdcethAFee.toFixed(2),
        psmUsdcTin: utils.formatEther(psmUsdcTin),
        psmUsdcTout: utils.formatEther(psmUsdcTout),
        psmUsdcALine: utils.formatUnits(psmUsdcAIlk.line, 45),
        jugEthDrip: this.unixToDateTime(jugEthDrip.rho.toNumber()),
        jugEthBDrip: this.unixToDateTime(jugEthBDrip.rho.toNumber()),
        jugBatDrip: this.unixToDateTime(jugBatDrip.rho.toNumber()),
        jugUsdcDrip: this.unixToDateTime(jugUsdcDrip.rho.toNumber()),
        jugUsdcBDrip: this.unixToDateTime(jugUsdcBDrip.rho.toNumber()),
        jugWbtcDrip: this.unixToDateTime(jugWbtcDrip.rho.toNumber()),
        jugTusdDrip: this.unixToDateTime(jugTusdDrip.rho.toNumber()),
        jugKncADrip: this.unixToDateTime(jugKncADrip.rho.toNumber()),
        jugZrxADrip: this.unixToDateTime(jugZrxADrip.rho.toNumber()),
        jugManaADrip: this.unixToDateTime(jugManaADrip.rho.toNumber()),
        jugPaxADrip: this.unixToDateTime(jugPaxADrip.rho.toNumber()),
        jugUsdtADrip: this.unixToDateTime(jugUsdtADrip.rho.toNumber()),
        jugCompADrip: this.unixToDateTime(jugCompADrip.rho.toNumber()),
        jugLrcADrip: this.unixToDateTime(jugLrcADrip.rho.toNumber()),
        jugLinkADrip: this.unixToDateTime(jugLinkADrip.rho.toNumber()),
        jugBalADrip: this.unixToDateTime(jugBalADrip.rho.toNumber()),
        jugYfiADrip: this.unixToDateTime(jugYfiADrip.rho),
        jugGusdADrip: this.unixToDateTime(jugGusdADrip.rho),
        jugUniADrip: this.unixToDateTime(jugUniADrip.rho),
        jugRenbtcADrip: this.unixToDateTime(jugRenbtcADrip.rho),
        jugAaveADrip: this.unixToDateTime(jugAaveADrip.rho),
        jugUniv2daiethADrip: this.unixToDateTime(jugUniv2daiethADrip.rho),
        jugUniv2wbtcethADrip: this.unixToDateTime(jugUniv2wbtcethADrip.rho),
        jugUniv2usdcethADrip: this.unixToDateTime(jugUniv2usdcethADrip.rho),
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
        ethBKicks: ethBKicks.toNumber(),
        batKicks: batKicks.toNumber(),
        wbtcKicks: wbtcKicks.toNumber(),
        kncAKicks: kncAKicks.toNumber(),
        zrxAKicks: zrxAKicks.toNumber(),
        manaAKicks: manaAKicks.toNumber(),
        usdtAKicks: usdtAKicks.toNumber(),
        compAKicks: compAKicks.toNumber(),
        lrcAKicks: lrcAKicks.toNumber(),
        linkAKicks: linkAKicks.toNumber(),
        balAKicks: balAKicks.toNumber(),
        yfiAKicks: yfiAKicks.toNumber(),
        uniAKicks: uniAKicks.toNumber(),
        renbtcAKicks: renbtcAKicks.toNumber(),
        aaveAKicks: aaveAKicks.toNumber(),
        univ2daiethAKicks: univ2daiethAKicks.toNumber(),
        univ2wbtcethAKicks: univ2wbtcethAKicks.toNumber(),
        univ2usdcethAKicks: univ2usdcethAKicks.toNumber(),
        flapKicks: flapKicks.toNumber(),
        flopKicks: flopKicks.toNumber(),
        cdps: cdps.toString(),
        ethPrice: utils.formatUnits(ethPrice, 27),
        ethPriceNxt: utils.formatEther(ethPriceNxt),
        batPrice: utils.formatUnits(batPrice, 27),
        batPriceNxt: utils.formatEther(batPriceNxt),
        wbtcPrice: utils.formatUnits(wbtcPrice, 27),
        wbtcPriceNxt: utils.formatEther(wbtcPriceNxt),
        kncPrice: utils.formatUnits(kncPrice, 27),
        kncPriceNxt: utils.formatEther(kncPriceNxt),
        zrxPrice: utils.formatUnits(zrxPrice, 27),
        zrxPriceNxt: utils.formatEther(zrxPriceNxt),
        manaPrice: utils.formatUnits(manaPrice, 27),
        manaPriceNxt: utils.formatEther(manaPriceNxt),
        usdtPrice: utils.formatUnits(usdtPrice, 27),
        usdtPriceNxt: utils.formatEther(usdtPriceNxt),
        usdcPrice: utils.formatEther(usdcPrice),
        tusdPrice: utils.formatEther(tusdPrice),
        paxPrice: utils.formatEther(paxPrice),
        compPrice: utils.formatUnits(compPrice, 27),
        compPriceNxt: utils.formatEther(compPriceNxt),
        lrcPrice: utils.formatUnits(lrcPrice, 27),
        lrcPriceNxt: utils.formatEther(lrcPriceNxt),
        linkPrice: utils.formatUnits(linkPrice, 27),
        linkPriceNxt: utils.formatEther(linkPriceNxt),
        balPrice: utils.formatUnits(balPrice, 27),
        balPriceNxt: utils.formatEther(balPriceNxt),
        yfiPrice: utils.formatUnits(yfiPrice, 27),
        yfiPriceNxt: utils.formatEther(yfiPriceNxt),
        gusdPrice: utils.formatUnits(gusdPrice, 27),
        uniPrice: utils.formatUnits(uniPrice, 27),
        uniPriceNxt: utils.formatEther(uniPriceNxt),
        aavePrice: utils.formatUnits(aavePrice, 27),
        aavePriceNxt: utils.formatEther(aavePriceNxt),
        univ2daiethPrice: utils.formatUnits(univ2daiethPrice, 27),
        univ2daiethPriceNxt: utils.formatEther(univ2daiethPriceNxt),
        univ2wbtcethPrice: utils.formatUnits(univ2wbtcethPrice, 27),
        univ2wbtcethPriceNxt: utils.formatEther(univ2wbtcethPriceNxt),
        univ2usdcethPrice: utils.formatUnits(univ2usdcethPrice, 27),
        univ2usdcethPriceNxt: utils.formatEther(univ2usdcethPriceNxt),
        sysLocked: utils.formatUnits(sysLocked, 45),
        chaiSupply: utils.formatEther(chaiSupply),
        mkrSupply: utils.formatEther(mkrSupply[0]),
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
        kncSupply: utils.formatEther(kncSupply[0]),
        kncALocked: utils.formatEther(kncALocked[0]),
        zrxSupply: utils.formatEther(zrxSupply[0]),
        zrxALocked: utils.formatEther(zrxALocked[0]),
        manaSupply: utils.formatEther(manaSupply[0]),
        manaALocked: utils.formatEther(manaALocked[0]),
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
    // const json = await jsonFetch('https://api.coingecko.com/api/v3/simple/price?ids=maker%2Cdai&vs_currencies=usd');
    const json = {}
    return json;
  }

  getMKRAnnualBurn = (
    ethIlk, ethFee, ethBIlk, ethBFee, batIlk, batFee, wbtcIlk, wbtcFee, usdcIlk, usdcFee, usdcBIlk, usdcBFee, tusdIlk, tusdFee,
    kncAIlk, kncAFee, zrxAIlk, zrxAFee, manaAFee, manaAIlk, paxAFee, paxAIlk, usdtAFee, usdtAIlk,
    compAFee, compAIlk, lrcAFee, lrcAIlk, linkAFee, linkAIlk, savingsDai, potFee, mkrPrice) => {

    const daiFromETH = utils.formatEther(ethIlk.Art) * utils.formatUnits(ethIlk.rate, 27)
    const stabilityETH = ethFee / 100
    const daiFromETHB = utils.formatEther(ethBIlk.Art) * utils.formatUnits(ethBIlk.rate, 27)
    const stabilityETHB = ethBFee / 100
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
    const daiFromKNCA = utils.formatEther(kncAIlk.Art) * utils.formatUnits(kncAIlk.rate, 27)
    const stabilityKNCA = kncAFee / 100
    const daiFromZRXA = utils.formatEther(zrxAIlk.Art) * utils.formatUnits(zrxAIlk.rate, 27)
    const stabilityZRXA = zrxAFee / 100
    const daiFromMANAA = utils.formatEther(manaAIlk.Art) * utils.formatUnits(manaAIlk.rate, 27)
    const stabilityMANAA = manaAFee / 100
    const daiFromPAXA = utils.formatEther(paxAIlk.Art) * utils.formatUnits(paxAIlk.rate, 27)
    const stabilityPAXA = paxAFee / 100
    const daiFromUSDTA = utils.formatEther(usdtAIlk.Art) * utils.formatUnits(usdtAIlk.rate, 27)
    const stabilityUSDTA = usdtAFee / 100
    const daiFromCOMPA = utils.formatEther(compAIlk.Art) * utils.formatUnits(compAIlk.rate, 27)
    const stabilityCOMPA = compAFee / 100
    const daiFromLRCA = utils.formatEther(lrcAIlk.Art) * utils.formatUnits(lrcAIlk.rate, 27)
    const stabilityLRCA = lrcAFee / 100
    const daiFromLINKA = utils.formatEther(linkAIlk.Art) * utils.formatUnits(linkAIlk.rate, 27)
    const stabilityLINKA = linkAFee / 100
    const dsrDai = utils.formatUnits(savingsDai, 45)
    const dsrRate = potFee / 100

    const mkrAnnualBurn = (
    (  (daiFromETH * stabilityETH)
     + (daiFromETHB * stabilityETHB)
     + (daiFromBAT * stabilityBAT)
     + (daiFromWBTC * stabilityWBTC)
     + (daiFromUSDC * stabilityUSDC)
     + (daiFromUSDCB * stabilityUSDCB)
     + (daiFromTUSD * stabilityTUSD)
     + (daiFromKNCA * stabilityKNCA)
     + (daiFromZRXA * stabilityZRXA)
     + (daiFromMANAA * stabilityMANAA)
     + (daiFromPAXA * stabilityPAXA)
     + (daiFromUSDTA * stabilityUSDTA)
     + (daiFromCOMPA * stabilityCOMPA)
     + (daiFromLRCA * stabilityLRCA)
     + (daiFromLINKA * stabilityLINKA)
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
            Welcome Uniswap LP tokens, thanks Hayden! <a href="https://twitter.com/nanexcool" target="_blank" rel="noopener noreferrer">{t('daistats.say_hi')}</a>
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
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('uk')}>Українська</button>
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
