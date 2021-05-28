import React, { Component } from 'react'
import { translate } from 'react-polyglot';
import {
  HashRouter as Router,
  Switch,
  Link,
  Route
} from "react-router-dom";
import { gql, GraphQLClient } from "graphql-request"
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
add["BKR"] = "0x0ff5E7B1a54387458F4dD2F04CDdA7D1246C34D9"
add["OASIS_DEX"] = "0x794e6e91555438afc3ccf1c5076a74f42133d08d"
add["MCD_JOIN_USDC_PSM"] = "0x0A59649758aa4d66E25f08Dd01271e891fe52199"
add["MCD_FLIP_USDC_PSM"] = "0x507420100393b1Dc2e8b4C8d0F8A13B56268AC99"
add["MCD_PSM_USDC_PSM"] = "0x89B78CfA322F6C5dE0aBcEecab66Aee45393cC5A"

add["GOV_MULTISIG"] = "0x73f09254a81e1F835Ee442d1b3262c1f1d7A13ff"
add["GOV_MULTISIG_2"] = "0x01D26f8c5cC009868A4BF66E268c17B057fF7A73"
add["RISK_MULTISIG"] = "0xd98ef20520048a35EdA9A202137847A62120d2d9"
add["RWF_MULTISIG"] = "0x9e1585d9CA64243CE43D42f7dD7333190F66Ca09"
add["GRO_MULTISIG"] = "0x7800C137A645c07132886539217ce192b9F0528e"
add["CP_MULTISIG"] = "0x6A0Ce7dBb43Fe537E3Fd0Be12dc1882393895237"
add["SES_AUDITORS_MULTISIG"] = "0x87AcDD9208f73bFc9207e1f6F0fDE906bcA95cc6"
add["SES_PERMANENT_TEAM_MULTISIG"] = "0xb5eB779cE300024EDB3dF9b6C007E312584f6F4f"
add["SES_INCUBATION_PROGRAM_MULTISIG"] = "0x7c09Ff9b59BAAebfd721cbDA3676826aA6d7BaE8"
add["SES_GRANTS_PROGRAM_MULTISIG"] = "0xf95eB8eC63D6059bA62b0A8A7F843c7D92f41de2"

// Protocol Engineering
// MakerDAO Shop

add["PIP_UNIV2DAIETH"] = "0xFc8137E1a45BAF0030563EC4F0F851bd36a85b7D"
add["PIP_UNIV2WBTCETH"] = "0x8400D2EDb8B97f780356Ef602b1BdBc082c2aD07"
add["PIP_UNIV2USDCETH"] = "0xf751f24DD9cfAd885984D1bA68860F558D21E52A"
add["PIP_UNIV2DAIUSDC"] = "0x25D03C2C928ADE19ff9f4FFECc07d991d0df054B"
add["PIP_UNIV2ETHUSDT"] = "0x5f6dD5B421B8d92c59dC6D907C9271b1DBFE3016"
add["PIP_UNIV2LINKETH"] = "0xd7d31e62AE5bfC3bfaa24Eda33e8c32D31a1746F"
add["PIP_UNIV2UNIETH"] = "0x8462A88f50122782Cc96108F476deDB12248f931"
add["PIP_UNIV2WBTCDAI"] = "0x5bB72127a196392cf4aC00Cf57aB278394d24e55"
add["PIP_UNIV2AAVEETH"] = "0x32d8416e8538Ac36272c44b0cd962cD7E0198489"
add["PIP_UNIV2DAIUSDT"] = "0x9A1CD705dc7ac64B50777BcEcA3529E58B1292F1"


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
const autoline = build(add.MCD_IAM_AUTO_LINE, "DssAutoLine")
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
const univ2daiusdc = build(add.UNIV2DAIUSDC, "ERC20")
const univ2ethusdt = build(add.UNIV2ETHUSDT, "ERC20")
const univ2linketh = build(add.UNIV2LINKETH, "ERC20")
const univ2unieth = build(add.UNIV2UNIETH, "ERC20")
const univ2wbtcdai = build(add.UNIV2WBTCDAI, "ERC20")
const univ2aaveeth = build(add.UNIV2AAVEETH, "ERC20")
const univ2daiusdt = build(add.UNIV2DAIUSDT, "ERC20")
const rwa001 = build(add.RWA001, "ERC20")
const rwa002 = build(add.RWA002, "ERC20")
const bkr = build(add.BKR, "ERC20")
const psmUsdc = build(add.MCD_PSM_USDC_PSM, "DssPsm")
const dai = build(add.MCD_DAI, "Dai")
const mkr = build(add.MCD_GOV, "DSToken")
const chai = build(add.CHAI, "Chai")
const manager = build(add.CDP_MANAGER, "DssCdpManager")
const ethClip = build(add.MCD_CLIP_ETH_A, "Clipper");
const ethBClip = build(add.MCD_CLIP_ETH_B, "Clipper");
const ethCClip = build(add.MCD_CLIP_ETH_C, "Clipper");
const batClip = build(add.MCD_CLIP_BAT_A, "Clipper");
const wbtcClip = build(add.MCD_CLIP_WBTC_A, "Clipper");
const kncAClip = build(add.MCD_CLIP_KNC_A, "Clipper");
const zrxAClip = build(add.MCD_CLIP_ZRX_A, "Clipper");
const manaAClip = build(add.MCD_CLIP_MANA_A, "Clipper");
const paxAFlip = build(add.MCD_FLIP_PAXUSD_A, "Flipper");
const usdtAFlip = build(add.MCD_FLIP_USDT_A, "Flipper");
const compAClip = build(add.MCD_CLIP_COMP_A, "Clipper");
const lrcAClip = build(add.MCD_CLIP_LRC_A, "Clipper");
const linkAClip = build(add.MCD_CLIP_LINK_A, "Clipper");
const balAClip = build(add.MCD_CLIP_BAL_A, "Clipper");
const yfiAClip = build(add.MCD_CLIP_YFI_A, "Clipper");
const uniAClip = build(add.MCD_CLIP_UNI_A, "Clipper");
const renbtcAClip = build(add.MCD_CLIP_RENBTC_A, "Clipper");
const aaveAClip = build(add.MCD_CLIP_AAVE_A, "Clipper");
const univ2daiethAFlip = build(add.MCD_FLIP_UNIV2DAIETH_A, "Flipper");
const univ2wbtcethAFlip = build(add.MCD_FLIP_UNIV2WBTCETH_A, "Flipper");
const univ2usdcethAFlip = build(add.MCD_FLIP_UNIV2USDCETH_A, "Flipper");
const univ2daiusdcAFlip = build(add.MCD_FLIP_UNIV2DAIUSDC_A, "Flipper");
const univ2ethusdtAFlip = build(add.MCD_FLIP_UNIV2ETHUSDT_A, "Flipper");
const univ2linkethAFlip = build(add.MCD_FLIP_UNIV2LINKETH_A, "Flipper");
const univ2uniethAFlip = build(add.MCD_FLIP_UNIV2UNIETH_A, "Flipper");
const univ2wbtcdaiAFlip = build(add.MCD_FLIP_UNIV2WBTCDAI_A, "Flipper");
const univ2aaveethAFlip = build(add.MCD_FLIP_UNIV2AAVEETH_A, "Flipper");
const univ2daiusdtAFlip = build(add.MCD_FLIP_UNIV2DAIUSDT_A, "Flipper");
const flap = build(add.MCD_FLAP, "Flapper");
const flop = build(add.MCD_FLOP, "Flopper");
const usdcPip = build(add.PIP_USDC, "DSValue")
const tusdPip = build(add.PIP_TUSD, "DSValue")
const paxPip = build(add.PIP_PAXUSD, "DSValue")
const usdtPip = build(add.PIP_USDT, "DSValue")
const gusdPip = build(add.PIP_GUSD, "DSValue")
const rwa001APip = build(add.PIP_RWA001, "DSValue")
const rwa002APip = build(add.PIP_RWA002, "DSValue")
const pip = build(add.PIP_ETH, "OSM")
const univ2Pip = build(add.PIP_UNIV2DAIETH, "UNIV2LPOracle")
const ethAIlkBytes = utils.formatBytes32String("ETH-A");
const ethBIlkBytes = utils.formatBytes32String("ETH-B");
const ethCIlkBytes = utils.formatBytes32String("ETH-C");
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
const univ2daiusdcAIlkBytes = utils.formatBytes32String("UNIV2DAIUSDC-A");
const univ2ethusdtAIlkBytes = utils.formatBytes32String("UNIV2ETHUSDT-A");
const univ2linkethAIlkBytes = utils.formatBytes32String("UNIV2LINKETH-A");
const univ2uniethAIlkBytes = utils.formatBytes32String("UNIV2UNIETH-A");
const univ2wbtcdaiAIlkBytes = utils.formatBytes32String("UNIV2WBTCDAI-A");
const univ2aaveethAIlkBytes = utils.formatBytes32String("UNIV2AAVEETH-A");
const univ2daiusdtAIlkBytes = utils.formatBytes32String("UNIV2DAIUSDT-A");
const rwa001AIlkBytes = utils.formatBytes32String("RWA001-A");
const rwa002AIlkBytes = utils.formatBytes32String("RWA002-A");
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
const DP2 = ethers.BigNumber.from("10000000000000000")
const DP6 = ethers.BigNumber.from("1000000000000")
const DP8 = ethers.BigNumber.from("10000000000")

const HOP = 3600 // assumes all OSM's have same hop

const subgraphClient = new GraphQLClient(
  "https://api.thegraph.com/subgraphs/name/protofire/maker-protocol",
  { mode: "cors" }
)

class App extends Component {
  state = {
    blockNumber: null,
    paused: false,
  }

  POSITION_NXT = 4
  POSITION_UNIV2_NXT = 4

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
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [ethAIlkBytes])],
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
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [ethAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [batIlkBytes])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('dai', [add.MCD_VOW])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('sin', [add.MCD_VOW])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('Ash', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('Sin', [])],
      [add.MCD_POT, pot.interface.encodeFunctionData('dsr', [])],
      [add.MCD_CLIP_ETH_A, ethClip.interface.encodeFunctionData('kicks', [])],
      [add.MCD_CLIP_BAT_A, batClip.interface.encodeFunctionData('kicks', [])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [ethAIlkBytes])],
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
      [add.MCD_CLIP_WBTC_A, wbtcClip.interface.encodeFunctionData('kicks', [])], // 48
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
      [add.MCD_CLIP_KNC_A, kncAClip.interface.encodeFunctionData('kicks', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [zrxAIlkBytes])], // 65
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [zrxAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [zrxAIlkBytes])], // 67
      [add.ZRX, zrx.interface.encodeFunctionData('totalSupply', [])],
      [add.ZRX, zrx.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_ZRX_A])], // 69
      [add.MCD_CLIP_ZRX_A, zrxAClip.interface.encodeFunctionData('kicks', [])], // 70

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [manaAIlkBytes])], // 71
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [manaAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [manaAIlkBytes])], // 73
      [add.MANA, mana.interface.encodeFunctionData('totalSupply', [])],
      [add.MANA, mana.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_MANA_A])], // 75
      [add.MCD_CLIP_MANA_A, manaAClip.interface.encodeFunctionData('kicks', [])], // 76

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
      [add.MCD_CLIP_COMP_A, compAClip.interface.encodeFunctionData('kicks', [])], // 93

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [lrcAIlkBytes])], // 94
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [lrcAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [lrcAIlkBytes])], // 96
      [add.LRC, lrc.interface.encodeFunctionData('totalSupply', [])],
      [add.LRC, lrc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_LRC_A])], // 98
      [add.MCD_CLIP_LRC_A, lrcAClip.interface.encodeFunctionData('kicks', [])], // 99

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [linkAIlkBytes])], // 100
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [linkAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [linkAIlkBytes])], // 102
      [add.LINK, link.interface.encodeFunctionData('totalSupply', [])],
      [add.LINK, link.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_LINK_A])], // 104
      [add.MCD_CLIP_LINK_A, linkAClip.interface.encodeFunctionData('kicks', [])], // 105

      [add.MCD_CLIP_ETH_B, ethBClip.interface.encodeFunctionData('kicks', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [ethBIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [ethBIlkBytes])], // 108
      [add.ETH, weth.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_ETH_B])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [ethBIlkBytes])],

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [balAIlkBytes])], // 111
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [balAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [balAIlkBytes])], // 113
      [add.BAL, bal.interface.encodeFunctionData('totalSupply', [])],
      [add.BAL, bal.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_BAL_A])], // 115
      [add.MCD_CLIP_BAL_A, balAClip.interface.encodeFunctionData('kicks', [])],

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [yfiAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [yfiAIlkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [yfiAIlkBytes])], // 119
      [add.YFI, yfi.interface.encodeFunctionData('totalSupply', [])], // 120
      [add.YFI, yfi.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_YFI_A])],
      [add.MCD_CLIP_YFI_A, yfiAClip.interface.encodeFunctionData('kicks', [])],

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
      [add.MCD_CLIP_UNI_A, uniAClip.interface.encodeFunctionData('kicks', [])], // 133

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [renbtcAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [renbtcAIlkBytes])], // 135
      [add.RENBTC, renbtc.interface.encodeFunctionData('totalSupply', [])], // 136
      [add.RENBTC, renbtc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_RENBTC_A])],
      [add.MCD_CLIP_RENBTC_A, renbtcAClip.interface.encodeFunctionData('kicks', [])], // 138

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [aaveAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [aaveAIlkBytes])], // 140
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [aaveAIlkBytes])],
      [add.AAVE, aave.interface.encodeFunctionData('totalSupply', [])], // 142
      [add.AAVE, aave.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_AAVE_A])],
      [add.MCD_CLIP_AAVE_A, aaveAClip.interface.encodeFunctionData('kicks', [])], // 144

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

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [univ2daiusdcAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [univ2daiusdcAIlkBytes])], // 168
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [univ2daiusdcAIlkBytes])],
      [add.UNIV2DAIUSDC, univ2daiusdc.interface.encodeFunctionData('totalSupply', [])], // 170
      [add.UNIV2DAIUSDC, univ2daiusdc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_UNIV2DAIUSDC_A])],
      [add.MCD_FLIP_UNIV2DAIUSDC_A, univ2daiusdcAFlip.interface.encodeFunctionData('kicks', [])], // 172

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [univ2ethusdtAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [univ2ethusdtAIlkBytes])], // 174
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [univ2ethusdtAIlkBytes])],
      [add.UNIV2ETHUSDT, univ2ethusdt.interface.encodeFunctionData('totalSupply', [])], // 176
      [add.UNIV2ETHUSDT, univ2ethusdt.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_UNIV2ETHUSDT_A])],
      [add.MCD_FLIP_UNIV2ETHUSDT_A, univ2ethusdtAFlip.interface.encodeFunctionData('kicks', [])], // 178

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [univ2linkethAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [univ2linkethAIlkBytes])], // 180
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [univ2linkethAIlkBytes])],
      [add.UNIV2LINKETH, univ2linketh.interface.encodeFunctionData('totalSupply', [])], // 182
      [add.UNIV2LINKETH, univ2linketh.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_UNIV2LINKETH_A])],
      [add.MCD_FLIP_UNIV2LINKETH_A, univ2linkethAFlip.interface.encodeFunctionData('kicks', [])], // 184

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [univ2uniethAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [univ2uniethAIlkBytes])], // 186
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [univ2uniethAIlkBytes])],
      [add.UNIV2UNIETH, univ2unieth.interface.encodeFunctionData('totalSupply', [])], // 188
      [add.UNIV2UNIETH, univ2unieth.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_UNIV2UNIETH_A])],
      [add.MCD_FLIP_UNIV2UNIETH_A, univ2uniethAFlip.interface.encodeFunctionData('kicks', [])], // 190

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [univ2wbtcdaiAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [univ2wbtcdaiAIlkBytes])], // 192
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [univ2wbtcdaiAIlkBytes])],
      [add.UNIV2WBTCDAI, univ2wbtcdai.interface.encodeFunctionData('totalSupply', [])], // 194
      [add.UNIV2WBTCDAI, univ2wbtcdai.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_UNIV2WBTCDAI_A])],
      [add.MCD_FLIP_UNIV2WBTCDAI_A, univ2wbtcdaiAFlip.interface.encodeFunctionData('kicks', [])], // 196

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [univ2aaveethAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [univ2aaveethAIlkBytes])], // 198
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [univ2aaveethAIlkBytes])],
      [add.UNIV2AAVEETH, univ2aaveeth.interface.encodeFunctionData('totalSupply', [])], // 200
      [add.UNIV2AAVEETH, univ2aaveeth.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_UNIV2AAVEETH_A])],
      [add.MCD_FLIP_UNIV2AAVEETH_A, univ2aaveethAFlip.interface.encodeFunctionData('kicks', [])], // 202

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [univ2daiusdtAIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [univ2daiusdtAIlkBytes])], // 204
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [univ2daiusdtAIlkBytes])],
      [add.UNIV2DAIUSDT, univ2daiusdt.interface.encodeFunctionData('totalSupply', [])], // 206
      [add.UNIV2DAIUSDT, univ2daiusdt.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_UNIV2DAIUSDT_A])],
      [add.MCD_FLIP_UNIV2DAIUSDT_A, univ2daiusdtAFlip.interface.encodeFunctionData('kicks', [])], // 208

      [add.MCD_CLIP_ETH_C, ethCClip.interface.encodeFunctionData('kicks', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [ethCIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [ethCIlkBytes])], // 211
      [add.ETH, weth.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_ETH_C])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [ethCIlkBytes])],

      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [ethAIlkBytes])], // 214
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [batIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [wbtcIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [kncAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [manaAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [lrcAIlkBytes])], // 219
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [linkAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [balAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [yfiAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [uniAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [renbtcAIlkBytes])], // 224
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [aaveAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [univ2daiethAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [univ2usdcethAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [univ2daiusdcAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [compAIlkBytes])], // 229
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [zrxAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [univ2wbtcethAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [univ2uniethAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [univ2linkethAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [univ2aaveethAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [univ2ethusdtAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [univ2daiusdtAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [univ2wbtcdaiAIlkBytes])],

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [rwa001AIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [rwa001AIlkBytes])], // 239
      [add.PIP_RWA001, rwa001APip.interface.encodeFunctionData('read', [])],
      [add.RWA001, univ2daiusdt.interface.encodeFunctionData('totalSupply', [])], // 241
      [add.RWA001, univ2daiusdt.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_RWA001_A])],

      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [rwa002AIlkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [rwa002AIlkBytes])], // 244
      [add.PIP_RWA002, rwa002APip.interface.encodeFunctionData('read', [])],
      [add.RWA002, univ2daiusdt.interface.encodeFunctionData('totalSupply', [])], // 246
      [add.RWA002, univ2daiusdt.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_RWA002_A])],

      [add.MCD_GOV, mkr.interface.encodeFunctionData('balanceOf', [add.MCD_PAUSE_PROXY])],
      [add.BKR, bkr.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_GOV, mkr.interface.encodeFunctionData('balanceOf', [add.BKR])], // 250

      [add.PIP_ETH, pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_BAT, pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_WBTC, pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_ZRX, pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_KNC, pip.interface.encodeFunctionData('zzz', [])], // 255
      [add.PIP_MANA, pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_USDT, pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_COMP, pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_LRC, pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_LINK, pip.interface.encodeFunctionData('zzz', [])], // 260
      [add.PIP_BAL, pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_YFI, pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_UNI, pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_RENBTC, pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_AAVE, pip.interface.encodeFunctionData('zzz', [])], // 265
      [add.PIP_UNIV2DAIETH, univ2Pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_UNIV2WBTCETH, univ2Pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_UNIV2USDCETH, univ2Pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_UNIV2DAIUSDC, univ2Pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_UNIV2ETHUSDT, univ2Pip.interface.encodeFunctionData('zzz', [])], // 270
      [add.PIP_UNIV2LINKETH, univ2Pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_UNIV2UNIETH, univ2Pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_UNIV2WBTCDAI, univ2Pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_UNIV2AAVEETH, univ2Pip.interface.encodeFunctionData('zzz', [])],
      [add.PIP_UNIV2DAIUSDT, univ2Pip.interface.encodeFunctionData('zzz', [])], // 275

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
      this.getOSMPrice(add.PIP_UNIV2DAIUSDC, this.POSITION_UNIV2_NXT),
      this.getOSMPrice(add.PIP_UNIV2ETHUSDT, this.POSITION_UNIV2_NXT),
      this.getOSMPrice(add.PIP_UNIV2LINKETH, this.POSITION_UNIV2_NXT),
      this.getOSMPrice(add.PIP_UNIV2UNIETH, this.POSITION_UNIV2_NXT),
      this.getOSMPrice(add.PIP_UNIV2WBTCDAI, this.POSITION_UNIV2_NXT),
      this.getOSMPrice(add.PIP_UNIV2AAVEETH, this.POSITION_UNIV2_NXT),
      this.getOSMPrice(add.PIP_UNIV2DAIUSDT, this.POSITION_UNIV2_NXT),
      this.getHistoricalDebt({ blockInterval: 5700 /* ≈ 1 day */, periods: 240 /* 8 months */ }),
    ]

    let [[block, res], ethSupply, ethPriceNxt, batPriceNxt, wbtcPriceNxt,
        kncPriceNxt, zrxPriceNxt, manaPriceNxt, usdtPriceNxt, compPriceNxt,
        lrcPriceNxt, linkPriceNxt, balPriceNxt, yfiPriceNxt, uniPriceNxt,
        aavePriceNxt, univ2daiethPriceNxt, univ2wbtcethPriceNxt, univ2usdcethPriceNxt,
        univ2daiusdcPriceNxt, univ2ethusdtPriceNxt, univ2linkethPriceNxt, univ2uniethPriceNxt,
        univ2wbtcdaiPriceNxt, univ2aaveethPriceNxt, univ2daiusdtPriceNxt,
        historicalDebt] = await Promise.all(promises)

    const ethIlk = vat.interface.decodeFunctionResult('ilks', res[2])
    const batIlk = vat.interface.decodeFunctionResult('ilks', res[3])
    const daiSupply = dai.interface.decodeFunctionResult('totalSupply', res[6])
    const ethLocked = weth.interface.decodeFunctionResult('balanceOf', res[9])
    const batSupply = bat.interface.decodeFunctionResult('totalSupply', res[10])
    const batLocked = bat.interface.decodeFunctionResult('balanceOf', res[11])
    const gemPit = mkr.interface.decodeFunctionResult('balanceOf', res[8])
    const uniswapDai = dai.interface.decodeFunctionResult('balanceOf', res[7])
    const uniswapMkr = mkr.interface.decodeFunctionResult('balanceOf', res[44])
    // hack cast to bignumber for "jug.base = 0"
    const base = '0x' + jug.interface.decodeFunctionResult('base', res[16])
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
    const ethKicks = ethClip.interface.decodeFunctionResult('kicks', res[24])[0]
    const batKicks = batClip.interface.decodeFunctionResult('kicks', res[25])[0]
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
    const wbtcKicks = wbtcClip.interface.decodeFunctionResult('kicks', res[48])[0]
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
    const kncAKicks = kncAClip.interface.decodeFunctionResult('kicks', res[64])[0]
    const zrxAIlk = vat.interface.decodeFunctionResult('ilks', res[65])
    const zrxAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[66]))
    const jugZrxADrip = jug.interface.decodeFunctionResult('ilks', res[66])
    const zrxAMat = spot.interface.decodeFunctionResult('ilks', res[67])
    const zrxPrice = zrxAMat.mat.mul(zrxAIlk.spot).div(RAY)
    const zrxSupply = zrx.interface.decodeFunctionResult('totalSupply', res[68])
    const zrxALocked = zrx.interface.decodeFunctionResult('balanceOf', res[69])
    const zrxAKicks = zrxAClip.interface.decodeFunctionResult('kicks', res[70])[0]

    const manaAIlk = vat.interface.decodeFunctionResult('ilks', res[71])
    const manaAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[72]))
    const jugManaADrip = jug.interface.decodeFunctionResult('ilks', res[72])
    const manaAMat = spot.interface.decodeFunctionResult('ilks', res[73])
    const manaPrice = manaAMat.mat.mul(manaAIlk.spot).div(RAY)
    const manaSupply = mana.interface.decodeFunctionResult('totalSupply', res[74])
    const manaALocked = mana.interface.decodeFunctionResult('balanceOf', res[75])
    const manaAKicks = manaAClip.interface.decodeFunctionResult('kicks', res[76])[0]

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
    const compAKicks = compAClip.interface.decodeFunctionResult('kicks', res[93])[0]

    const lrcAIlk = vat.interface.decodeFunctionResult('ilks', res[94])
    const lrcAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[95]))
    const jugLrcADrip = jug.interface.decodeFunctionResult('ilks', res[95])
    const lrcAMat = spot.interface.decodeFunctionResult('ilks', res[96])
    const lrcPrice = lrcAMat.mat.mul(lrcAIlk.spot).div(RAY)
    const lrcSupply = lrc.interface.decodeFunctionResult('totalSupply', res[97])
    const lrcALocked = lrc.interface.decodeFunctionResult('balanceOf', res[98])
    const lrcAKicks = lrcAClip.interface.decodeFunctionResult('kicks', res[99])[0]

    const linkAIlk = vat.interface.decodeFunctionResult('ilks', res[100])
    const linkAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[101]))
    const jugLinkADrip = jug.interface.decodeFunctionResult('ilks', res[101])
    const linkAMat = spot.interface.decodeFunctionResult('ilks', res[102])
    const linkPrice = linkAMat.mat.mul(linkAIlk.spot).div(RAY)
    const linkSupply = link.interface.decodeFunctionResult('totalSupply', res[103])
    const linkALocked = link.interface.decodeFunctionResult('balanceOf', res[104])
    const linkAKicks = linkAClip.interface.decodeFunctionResult('kicks', res[105])[0]

    const ethBKicks = ethBClip.interface.decodeFunctionResult('kicks', res[106])[0]
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
    const balAKicks = balAClip.interface.decodeFunctionResult('kicks', res[116])[0]

    const yfiAIlk = vat.interface.decodeFunctionResult('ilks', res[117])
    const yfiAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[118]))
    const jugYfiADrip = jug.interface.decodeFunctionResult('ilks', res[118])
    const yfiAMat = spot.interface.decodeFunctionResult('ilks', res[119])
    const yfiPrice = yfiAMat.mat.mul(yfiAIlk.spot).div(RAY)
    const yfiSupply = yfi.interface.decodeFunctionResult('totalSupply', res[120])
    const yfiALocked = yfi.interface.decodeFunctionResult('balanceOf', res[121])
    const yfiAKicks = yfiAClip.interface.decodeFunctionResult('kicks', res[122])[0]

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
    const uniAKicks = uniAClip.interface.decodeFunctionResult('kicks', res[133])[0]

    const renbtcAIlk = vat.interface.decodeFunctionResult('ilks', res[134])
    const renbtcAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[135]))
    const jugRenbtcADrip = jug.interface.decodeFunctionResult('ilks', res[135])
    const renbtcSupply = renbtc.interface.decodeFunctionResult('totalSupply', res[136])
    const renbtcALocked = renbtc.interface.decodeFunctionResult('balanceOf', res[137])
    const renbtcAKicks = renbtcAClip.interface.decodeFunctionResult('kicks', res[138])[0]

    const aaveAIlk = vat.interface.decodeFunctionResult('ilks', res[139])
    const aaveAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[140]))
    const jugAaveADrip = jug.interface.decodeFunctionResult('ilks', res[140])
    const aaveAMat = spot.interface.decodeFunctionResult('ilks', res[141])
    const aavePrice = aaveAMat.mat.mul(aaveAIlk.spot).div(RAY)
    const aaveSupply = aave.interface.decodeFunctionResult('totalSupply', res[142])
    const aaveALocked = aave.interface.decodeFunctionResult('balanceOf', res[143])
    const aaveAKicks = aaveAClip.interface.decodeFunctionResult('kicks', res[144])[0]

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

    const univ2daiusdcAIlk = vat.interface.decodeFunctionResult('ilks', res[167])
    const univ2daiusdcAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[168]))
    const jugUniv2daiusdcADrip = jug.interface.decodeFunctionResult('ilks', res[168])
    const univ2daiusdcAMat = spot.interface.decodeFunctionResult('ilks', res[169])
    const univ2daiusdcPrice = univ2daiusdcAMat.mat.mul(univ2daiusdcAIlk.spot).div(RAY)
    const univ2daiusdcSupply = univ2daiusdc.interface.decodeFunctionResult('totalSupply', res[170])
    const univ2daiusdcALocked = univ2daiusdc.interface.decodeFunctionResult('balanceOf', res[171])
    const univ2daiusdcAKicks = univ2daiusdcAFlip.interface.decodeFunctionResult('kicks', res[172])[0]

    const univ2ethusdtAIlk = vat.interface.decodeFunctionResult('ilks', res[173])
    const univ2ethusdtAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[174]))
    const jugUniv2ethusdtADrip = jug.interface.decodeFunctionResult('ilks', res[174])
    const univ2ethusdtAMat = spot.interface.decodeFunctionResult('ilks', res[175])
    const univ2ethusdtPrice = univ2ethusdtAMat.mat.mul(univ2ethusdtAIlk.spot).div(RAY)
    const univ2ethusdtSupply = univ2ethusdt.interface.decodeFunctionResult('totalSupply', res[176])
    const univ2ethusdtALocked = univ2ethusdt.interface.decodeFunctionResult('balanceOf', res[177])
    const univ2ethusdtAKicks = univ2ethusdtAFlip.interface.decodeFunctionResult('kicks', res[178])[0]

    const univ2linkethAIlk = vat.interface.decodeFunctionResult('ilks', res[179])
    const univ2linkethAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[180]))
    const jugUniv2linkethADrip = jug.interface.decodeFunctionResult('ilks', res[180])
    const univ2linkethAMat = spot.interface.decodeFunctionResult('ilks', res[181])
    const univ2linkethPrice = univ2linkethAMat.mat.mul(univ2linkethAIlk.spot).div(RAY)
    const univ2linkethSupply = univ2linketh.interface.decodeFunctionResult('totalSupply', res[182])
    const univ2linkethALocked = univ2linketh.interface.decodeFunctionResult('balanceOf', res[183])
    const univ2linkethAKicks = univ2linkethAFlip.interface.decodeFunctionResult('kicks', res[184])[0]

    const univ2uniethAIlk = vat.interface.decodeFunctionResult('ilks', res[185])
    const univ2uniethAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[186]))
    const jugUniv2uniethADrip = jug.interface.decodeFunctionResult('ilks', res[186])
    const univ2uniethAMat = spot.interface.decodeFunctionResult('ilks', res[187])
    const univ2uniethPrice = univ2uniethAMat.mat.mul(univ2uniethAIlk.spot).div(RAY)
    const univ2uniethSupply = univ2unieth.interface.decodeFunctionResult('totalSupply', res[188])
    const univ2uniethALocked = univ2unieth.interface.decodeFunctionResult('balanceOf', res[189])
    const univ2uniethAKicks = univ2uniethAFlip.interface.decodeFunctionResult('kicks', res[190])[0]

    const univ2wbtcdaiAIlk = vat.interface.decodeFunctionResult('ilks', res[191])
    const univ2wbtcdaiAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[192]))
    const jugUniv2wbtcdaiADrip = jug.interface.decodeFunctionResult('ilks', res[192])
    const univ2wbtcdaiAMat = spot.interface.decodeFunctionResult('ilks', res[193])
    const univ2wbtcdaiPrice = univ2wbtcdaiAMat.mat.mul(univ2wbtcdaiAIlk.spot).div(RAY)
    const univ2wbtcdaiSupply = univ2wbtcdai.interface.decodeFunctionResult('totalSupply', res[194])
    const univ2wbtcdaiALocked = univ2wbtcdai.interface.decodeFunctionResult('balanceOf', res[195])
    const univ2wbtcdaiAKicks = univ2wbtcdaiAFlip.interface.decodeFunctionResult('kicks', res[196])[0]

    const univ2aaveethAIlk = vat.interface.decodeFunctionResult('ilks', res[197])
    const univ2aaveethAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[198]))
    const jugUniv2aaveethADrip = jug.interface.decodeFunctionResult('ilks', res[198])
    const univ2aaveethAMat = spot.interface.decodeFunctionResult('ilks', res[199])
    const univ2aaveethPrice = univ2aaveethAMat.mat.mul(univ2aaveethAIlk.spot).div(RAY)
    const univ2aaveethSupply = univ2aaveeth.interface.decodeFunctionResult('totalSupply', res[200])
    const univ2aaveethALocked = univ2aaveeth.interface.decodeFunctionResult('balanceOf', res[201])
    const univ2aaveethAKicks = univ2aaveethAFlip.interface.decodeFunctionResult('kicks', res[202])[0]

    const univ2daiusdtAIlk = vat.interface.decodeFunctionResult('ilks', res[203])
    const univ2daiusdtAFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[204]))
    const jugUniv2daiusdtADrip = jug.interface.decodeFunctionResult('ilks', res[204])
    const univ2daiusdtAMat = spot.interface.decodeFunctionResult('ilks', res[205])
    const univ2daiusdtPrice = univ2daiusdtAMat.mat.mul(univ2daiusdtAIlk.spot).div(RAY)
    const univ2daiusdtSupply = univ2daiusdt.interface.decodeFunctionResult('totalSupply', res[206])
    const univ2daiusdtALocked = univ2daiusdt.interface.decodeFunctionResult('balanceOf', res[207])
    const univ2daiusdtAKicks = univ2daiusdtAFlip.interface.decodeFunctionResult('kicks', res[208])[0]

    const ethCKicks = ethCClip.interface.decodeFunctionResult('kicks', res[209])[0]
    const ethCIlk = vat.interface.decodeFunctionResult('ilks', res[210])
    const ethCFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[211]))
    const ethCLocked = weth.interface.decodeFunctionResult('balanceOf', res[212])
    const jugEthCDrip = jug.interface.decodeFunctionResult('ilks', res[213])

    const ethAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[214])
    const batAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[215])
    const wbtcAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[216])
    const kncAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[217])
    const manaAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[218])
    const lrcAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[219])
    const linkAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[220])
    const balAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[221])
    const yfiAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[222])
    const uniAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[223])
    const renbtcAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[224])
    const aaveAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[225])
    const univ2daiethAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[226])
    const univ2usdcethAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[227])
    const univ2daiusdcAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[228])
    const compAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[229])
    const zrxAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[230])
    const univ2wbtcethAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[231])
    const univ2uniethAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[232])
    const univ2linkethAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[233])
    const univ2aaveethAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[234])
    const univ2ethusdtAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[235])
    const univ2daiusdtAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[236])
    const univ2wbtcdaiAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[237])

    const rwa001AIlk = vat.interface.decodeFunctionResult('ilks', res[238])
    const rwa001AFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[239]))
    const rwa001ADrip = jug.interface.decodeFunctionResult('ilks', res[239])
    const rwa001Price = rwa001APip.interface.decodeFunctionResult('read', res[240])[0]
    const rwa001Supply = rwa001.interface.decodeFunctionResult('totalSupply', res[241])
    const rwa001ALocked = rwa001.interface.decodeFunctionResult('balanceOf', res[242])

    const rwa002AIlk = vat.interface.decodeFunctionResult('ilks', res[243])
    const rwa002AFee = this.getFee(base, jug.interface.decodeFunctionResult('ilks', res[244]))
    const rwa002ADrip = jug.interface.decodeFunctionResult('ilks', res[244])
    const rwa002Price = rwa002APip.interface.decodeFunctionResult('read', res[245])[0]
    const rwa002Supply = rwa002.interface.decodeFunctionResult('totalSupply', res[246])
    const rwa002ALocked = rwa002.interface.decodeFunctionResult('balanceOf', res[247])

    const protocolTreasury = mkr.interface.decodeFunctionResult('balanceOf', res[248])
    const bkrSupply = bkr.interface.decodeFunctionResult('totalSupply', res[249])
    const mkrBroken = mkr.interface.decodeFunctionResult('balanceOf', res[250])

    const ethZzz = pip.interface.decodeFunctionResult('zzz', res[251])
    const batZzz = pip.interface.decodeFunctionResult('zzz', res[252])
    const wbtcZzz = pip.interface.decodeFunctionResult('zzz', res[253])
    const zrxZzz = pip.interface.decodeFunctionResult('zzz', res[254])
    const kncZzz = pip.interface.decodeFunctionResult('zzz', res[255])
    const manaZzz = pip.interface.decodeFunctionResult('zzz', res[256])
    const usdtZzz = pip.interface.decodeFunctionResult('zzz', res[257])
    const compZzz = pip.interface.decodeFunctionResult('zzz', res[258])
    const lrcZzz = pip.interface.decodeFunctionResult('zzz', res[259])
    const linkZzz = pip.interface.decodeFunctionResult('zzz', res[260])
    const balZzz = pip.interface.decodeFunctionResult('zzz', res[261])
    const yfiZzz = pip.interface.decodeFunctionResult('zzz', res[262])
    const uniZzz = pip.interface.decodeFunctionResult('zzz', res[263])
    const renbtcZzz = pip.interface.decodeFunctionResult('zzz', res[264])
    const aaveZzz = pip.interface.decodeFunctionResult('zzz', res[265])
    const univ2daiethZzz = univ2Pip.interface.decodeFunctionResult('zzz', res[266])
    const univ2wbtcethZzz = univ2Pip.interface.decodeFunctionResult('zzz', res[267])
    const univ2usdcethZzz = univ2Pip.interface.decodeFunctionResult('zzz', res[268])
    const univ2daiusdcZzz = univ2Pip.interface.decodeFunctionResult('zzz', res[269])
    const univ2ethusdtZzz = univ2Pip.interface.decodeFunctionResult('zzz', res[270])
    const univ2linkethZzz = univ2Pip.interface.decodeFunctionResult('zzz', res[271])
    const univ2uniethZzz = univ2Pip.interface.decodeFunctionResult('zzz', res[272])
    const univ2wbtcdaiZzz = univ2Pip.interface.decodeFunctionResult('zzz', res[273])
    const univ2aaveethZzz = univ2Pip.interface.decodeFunctionResult('zzz', res[274])
    const univ2daiusdtZzz = univ2Pip.interface.decodeFunctionResult('zzz', res[275])

    const sysLocked = [
            ethLocked[0].mul(ethPrice),
            ethBLocked[0].mul(ethPrice),
            ethCLocked[0].mul(ethPrice),
            usdcLocked[0].mul(DP6).mul(usdcPrice),
            usdcBLocked[0].mul(DP6).mul(usdcPrice),
            psmUsdcALocked[0].mul(DP6).mul(usdcPrice),
            wbtcLocked[0].mul(DP8).mul(wbtcPrice),
            renbtcALocked[0].mul(DP8).mul(wbtcPrice),
            tusdLocked[0].mul(tusdPrice),
            paxALocked[0].mul(paxPrice),
            gusdALocked[0].mul(DP2).mul(gusdPrice),
            usdtALocked[0].mul(DP6).mul(usdtPrice),
            batLocked[0].mul(batPrice),
            kncALocked[0].mul(kncPrice),
            zrxALocked[0].mul(zrxPrice),
            manaALocked[0].mul(manaPrice),
            compALocked[0].mul(compPrice),
            lrcALocked[0].mul(lrcPrice),
            linkALocked[0].mul(linkPrice),
            balALocked[0].mul(balPrice),
            yfiALocked[0].mul(yfiPrice),
            uniALocked[0].mul(uniPrice),
            aaveALocked[0].mul(aavePrice),
            univ2daiethALocked[0].mul(univ2daiethPrice),
            univ2wbtcethALocked[0].mul(univ2wbtcethPrice),
            univ2usdcethALocked[0].mul(univ2usdcethPrice),
            univ2daiusdcALocked[0].mul(univ2daiusdcPrice),
            univ2ethusdtALocked[0].mul(univ2ethusdtPrice),
            univ2linkethALocked[0].mul(univ2linkethPrice),
            univ2uniethALocked[0].mul(univ2uniethPrice),
            univ2wbtcdaiALocked[0].mul(univ2wbtcdaiPrice),
            univ2aaveethALocked[0].mul(univ2aaveethPrice),
            univ2daiusdtALocked[0].mul(univ2daiusdtPrice),
            rwa001ALocked[0].mul(rwa001Price),
            rwa002ALocked[0].mul(rwa002Price)
                ].reduce((t, i) => t.add(i), ethers.BigNumber.from('0'))

    // if (parseInt(utils.formatUnits(res[1], 45)) >= 300000000) confetti.rain()
    this.setState(state => {
      return {
        networkId: networkId,
        blockNumber: block.toString(),
        Line: utils.formatUnits(res[0], 45),
        debt: utils.formatUnits(res[1], 45),
        ilks: [
          {
            token: "ETH",
            ilk: "ETH-A",
            Art:  utils.formatEther(ethIlk.Art),
            rate: utils.formatUnits(ethIlk.rate, 27),
            spot: utils.formatUnits(ethIlk.spot, 27),
            line: utils.formatUnits(ethIlk.line, 45),
            dust: utils.formatUnits(ethIlk.dust, 45),
            lineMax: utils.formatUnits(ethAutoLineIlk.line, 45),
            gap: utils.formatUnits(ethAutoLineIlk.gap, 45),
            ttl: ethAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(ethAutoLineIlk.lastInc)
          },
          {
            token: "BAT",
            ilk: "BAT-A",
            Art:  utils.formatEther(batIlk.Art),
            rate: utils.formatUnits(batIlk.rate, 27),
            spot: utils.formatUnits(batIlk.spot, 27),
            line: utils.formatUnits(batIlk.line, 45),
            dust: utils.formatUnits(batIlk.dust, 45),
            lineMax: utils.formatUnits(batAutoLineIlk.line, 45),
            gap: utils.formatUnits(batAutoLineIlk.gap, 45),
            ttl: batAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(batAutoLineIlk.lastInc)
          },
          {
            token: "USDC",
            ilk: "USDC-A",
            Art:  utils.formatEther(usdcIlk.Art),
            rate: utils.formatUnits(usdcIlk.rate, 27),
            spot: utils.formatUnits(usdcIlk.spot, 27),
            line: utils.formatUnits(usdcIlk.line, 45),
            dust: utils.formatUnits(usdcIlk.dust, 45)
          },
          {
            token: "WBTC",
            ilk: "WBTC-A",
            Art:  utils.formatEther(wbtcIlk.Art),
            rate: utils.formatUnits(wbtcIlk.rate, 27),
            spot: utils.formatUnits(wbtcIlk.spot, 27),
            line: utils.formatUnits(wbtcIlk.line, 45),
            dust: utils.formatUnits(wbtcIlk.dust, 45),
            lineMax: utils.formatUnits(wbtcAutoLineIlk.line, 45),
            gap: utils.formatUnits(wbtcAutoLineIlk.gap, 45),
            ttl: wbtcAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(wbtcAutoLineIlk.lastInc)
          },
          {
            token: "USDC",
            ilk: "USDC-B",
            Art:  utils.formatEther(usdcBIlk.Art),
            rate: utils.formatUnits(usdcBIlk.rate, 27),
            spot: utils.formatUnits(usdcBIlk.spot, 27),
            line: utils.formatUnits(usdcBIlk.line, 45),
            dust: utils.formatUnits(usdcBIlk.dust, 45)
          },
          {
            token: "TUSD",
            ilk: "TUSD-A",
            Art:  utils.formatEther(tusdIlk.Art),
            rate: utils.formatUnits(tusdIlk.rate, 27),
            spot: utils.formatUnits(tusdIlk.spot, 27),
            line: utils.formatUnits(tusdIlk.line, 45),
            dust: utils.formatUnits(tusdIlk.dust, 45)
          },
          {
            token: "KNC",
            ilk: "KNC-A",
            Art:  utils.formatEther(kncAIlk.Art),
            rate: utils.formatUnits(kncAIlk.rate, 27),
            spot: utils.formatUnits(kncAIlk.spot, 27),
            line: utils.formatUnits(kncAIlk.line, 45),
            dust: utils.formatUnits(kncAIlk.dust, 45),
            lineMax: utils.formatUnits(kncAAutoLineIlk.line, 45),
            gap: utils.formatUnits(kncAAutoLineIlk.gap, 45),
            ttl: kncAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(kncAAutoLineIlk.lastInc)
          },
          {
            token: "ZRX",
            ilk: "ZRX-A",
            Art:  utils.formatEther(zrxAIlk.Art),
            rate: utils.formatUnits(zrxAIlk.rate, 27),
            spot: utils.formatUnits(zrxAIlk.spot, 27),
            line: utils.formatUnits(zrxAIlk.line, 45),
            dust: utils.formatUnits(zrxAIlk.dust, 45),
            lineMax: utils.formatUnits(zrxAAutoLineIlk.line, 45),
            gap: utils.formatUnits(zrxAAutoLineIlk.gap, 45),
            ttl: zrxAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(zrxAAutoLineIlk.lastInc)
          },
          {
            token: "MANA",
            ilk: "MANA-A",
            Art:  utils.formatEther(manaAIlk.Art),
            rate: utils.formatUnits(manaAIlk.rate, 27),
            spot: utils.formatUnits(manaAIlk.spot, 27),
            line: utils.formatUnits(manaAIlk.line, 45),
            dust: utils.formatUnits(manaAIlk.dust, 45),
            lineMax: utils.formatUnits(manaAAutoLineIlk.line, 45),
            gap: utils.formatUnits(manaAAutoLineIlk.gap, 45),
            ttl: manaAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(manaAAutoLineIlk.lastInc)
          },
          {
            token: "PAX",
            ilk: "PAX-A",
            Art:  utils.formatEther(paxAIlk.Art),
            rate: utils.formatUnits(paxAIlk.rate, 27),
            spot: utils.formatUnits(paxAIlk.spot, 27),
            line: utils.formatUnits(paxAIlk.line, 45),
            dust: utils.formatUnits(paxAIlk.dust, 45)
          },
          {
            token: "USDT",
            ilk: "USDT-A",
            Art:  utils.formatEther(usdtAIlk.Art),
            rate: utils.formatUnits(usdtAIlk.rate, 27),
            spot: utils.formatUnits(usdtAIlk.spot, 27),
            line: utils.formatUnits(usdtAIlk.line, 45),
            dust: utils.formatUnits(usdtAIlk.dust, 45)
          },
          {
            token: "COMP",
            ilk: "COMP-A",
            Art:  utils.formatEther(compAIlk.Art),
            rate: utils.formatUnits(compAIlk.rate, 27),
            spot: utils.formatUnits(compAIlk.spot, 27),
            line: utils.formatUnits(compAIlk.line, 45),
            dust: utils.formatUnits(compAIlk.dust, 45),
            lineMax: utils.formatUnits(compAAutoLineIlk.line, 45),
            gap: utils.formatUnits(compAAutoLineIlk.gap, 45),
            ttl: compAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(compAAutoLineIlk.lastInc)
          },
          {
            token: "LRC",
            ilk: "LRC-A",
            Art:  utils.formatEther(lrcAIlk.Art),
            rate: utils.formatUnits(lrcAIlk.rate, 27),
            spot: utils.formatUnits(lrcAIlk.spot, 27),
            line: utils.formatUnits(lrcAIlk.line, 45),
            dust: utils.formatUnits(lrcAIlk.dust, 45),
            lineMax: utils.formatUnits(lrcAAutoLineIlk.line, 45),
            gap: utils.formatUnits(lrcAAutoLineIlk.gap, 45),
            ttl: lrcAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(lrcAAutoLineIlk.lastInc)
          },
          {
            token: "LINK",
            ilk: "LINK-A",
            Art:  utils.formatEther(linkAIlk.Art),
            rate: utils.formatUnits(linkAIlk.rate, 27),
            spot: utils.formatUnits(linkAIlk.spot, 27),
            line: utils.formatUnits(linkAIlk.line, 45),
            dust: utils.formatUnits(linkAIlk.dust, 45),
            lineMax: utils.formatUnits(linkAAutoLineIlk.line, 45),
            gap: utils.formatUnits(linkAAutoLineIlk.gap, 45),
            ttl: linkAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(linkAAutoLineIlk.lastInc)
          },
          {
            token: "ETH",
            ilk: "ETH-B",
            Art:  utils.formatEther(ethBIlk.Art),
            rate: utils.formatUnits(ethBIlk.rate, 27),
            spot: utils.formatUnits(ethBIlk.spot, 27),
            line: utils.formatUnits(ethBIlk.line, 45),
            dust: utils.formatUnits(ethBIlk.dust, 45)
          },
          {
            token: "BAL",
            ilk: "BAL-A",
            Art:  utils.formatEther(balAIlk.Art),
            rate: utils.formatUnits(balAIlk.rate, 27),
            spot: utils.formatUnits(balAIlk.spot, 27),
            line: utils.formatUnits(balAIlk.line, 45),
            dust: utils.formatUnits(balAIlk.dust, 45),
            lineMax: utils.formatUnits(balAAutoLineIlk.line, 45),
            gap: utils.formatUnits(balAAutoLineIlk.gap, 45),
            ttl: balAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(balAAutoLineIlk.lastInc)
          },
          {
            token: "YFI",
            ilk: "YFI-A",
            Art:  utils.formatEther(yfiAIlk.Art),
            rate: utils.formatUnits(yfiAIlk.rate, 27),
            spot: utils.formatUnits(yfiAIlk.spot, 27),
            line: utils.formatUnits(yfiAIlk.line, 45),
            dust: utils.formatUnits(yfiAIlk.dust, 45),
            lineMax: utils.formatUnits(yfiAAutoLineIlk.line, 45),
            gap: utils.formatUnits(yfiAAutoLineIlk.gap, 45),
            ttl: yfiAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(yfiAAutoLineIlk.lastInc)
          },
          {
            token: "GUSD",
            ilk: "GUSD-A",
            Art:  utils.formatEther(gusdAIlk.Art),
            rate: utils.formatUnits(gusdAIlk.rate, 27),
            spot: utils.formatUnits(gusdAIlk.spot, 27),
            line: utils.formatUnits(gusdAIlk.line, 45),
            dust: utils.formatUnits(gusdAIlk.dust, 45)
          },
          {
            token: "UNI",
            ilk: "UNI-A",
            Art:  utils.formatEther(uniAIlk.Art),
            rate: utils.formatUnits(uniAIlk.rate, 27),
            spot: utils.formatUnits(uniAIlk.spot, 27),
            line: utils.formatUnits(uniAIlk.line, 45),
            dust: utils.formatUnits(uniAIlk.dust, 45),
            lineMax: utils.formatUnits(uniAAutoLineIlk.line, 45),
            gap: utils.formatUnits(uniAAutoLineIlk.gap, 45),
            ttl: uniAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(uniAAutoLineIlk.lastInc)
          },
          {
            token: "RENBTC",
            ilk: "RENBTC-A",
            Art:  utils.formatEther(renbtcAIlk.Art),
            rate: utils.formatUnits(renbtcAIlk.rate, 27),
            spot: utils.formatUnits(renbtcAIlk.spot, 27),
            line: utils.formatUnits(renbtcAIlk.line, 45),
            dust: utils.formatUnits(renbtcAIlk.dust, 45),
            lineMax: utils.formatUnits(renbtcAAutoLineIlk.line, 45),
            gap: utils.formatUnits(renbtcAAutoLineIlk.gap, 45),
            ttl: renbtcAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(renbtcAAutoLineIlk.lastInc)
          },
          {
            token: "AAVE",
            ilk: "AAVE-A",
            Art:  utils.formatEther(aaveAIlk.Art),
            rate: utils.formatUnits(aaveAIlk.rate, 27),
            spot: utils.formatUnits(aaveAIlk.spot, 27),
            line: utils.formatUnits(aaveAIlk.line, 45),
            dust: utils.formatUnits(aaveAIlk.dust, 45),
            lineMax: utils.formatUnits(aaveAAutoLineIlk.line, 45),
            gap: utils.formatUnits(aaveAAutoLineIlk.gap, 45),
            ttl: aaveAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(aaveAAutoLineIlk.lastInc)
          },
          {
            token: "UNIV2DAIETH",
            ilk: "UNIV2DAIETH-A",
            Art:  utils.formatEther(univ2daiethAIlk.Art),
            rate: utils.formatUnits(univ2daiethAIlk.rate, 27),
            spot: utils.formatUnits(univ2daiethAIlk.spot, 27),
            line: utils.formatUnits(univ2daiethAIlk.line, 45),
            dust: utils.formatUnits(univ2daiethAIlk.dust, 45),
            lineMax: utils.formatUnits(univ2daiethAAutoLineIlk.line, 45),
            gap: utils.formatUnits(univ2daiethAAutoLineIlk.gap, 45),
            ttl: univ2daiethAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(univ2daiethAAutoLineIlk.lastInc)
          },
          {
            token: "UNIV2WBTCETH",
            ilk: "UNIV2WBTCETH-A",
            Art:  utils.formatEther(univ2wbtcethAIlk.Art),
            rate: utils.formatUnits(univ2wbtcethAIlk.rate, 27),
            spot: utils.formatUnits(univ2wbtcethAIlk.spot, 27),
            line: utils.formatUnits(univ2wbtcethAIlk.line, 45),
            dust: utils.formatUnits(univ2wbtcethAIlk.dust, 45),
            lineMax: utils.formatUnits(univ2wbtcethAAutoLineIlk.line, 45),
            gap: utils.formatUnits(univ2wbtcethAAutoLineIlk.gap, 45),
            ttl: univ2wbtcethAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(univ2wbtcethAAutoLineIlk.lastInc)
          },
          {
            token: "UNIV2USDCETH",
            ilk: "UNIV2USDCETH-A",
            Art:  utils.formatEther(univ2usdcethAIlk.Art),
            rate: utils.formatUnits(univ2usdcethAIlk.rate, 27),
            spot: utils.formatUnits(univ2usdcethAIlk.spot, 27),
            line: utils.formatUnits(univ2usdcethAIlk.line, 45),
            dust: utils.formatUnits(univ2usdcethAIlk.dust, 45),
            lineMax: utils.formatUnits(univ2usdcethAAutoLineIlk.line, 45),
            gap: utils.formatUnits(univ2usdcethAAutoLineIlk.gap, 45),
            ttl: univ2usdcethAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(univ2usdcethAAutoLineIlk.lastInc)
          },
          {
            token: "UNIV2DAIUSDC",
            ilk: "UNIV2DAIUSDC-A",
            Art:  utils.formatEther(univ2daiusdcAIlk.Art),
            rate: utils.formatUnits(univ2daiusdcAIlk.rate, 27),
            spot: utils.formatUnits(univ2daiusdcAIlk.spot, 27),
            line: utils.formatUnits(univ2daiusdcAIlk.line, 45),
            dust: utils.formatUnits(univ2daiusdcAIlk.dust, 45),
            lineMax: utils.formatUnits(univ2daiusdcAAutoLineIlk.line, 45),
            gap: utils.formatUnits(univ2daiusdcAAutoLineIlk.gap, 45),
            ttl: univ2daiusdcAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(univ2daiusdcAAutoLineIlk.lastInc)
          },
          {
            token: "UNIV2ETHUSDT",
            ilk: "UNIV2ETHUSDT-A",
            Art:  utils.formatEther(univ2ethusdtAIlk.Art),
            rate: utils.formatUnits(univ2ethusdtAIlk.rate, 27),
            spot: utils.formatUnits(univ2ethusdtAIlk.spot, 27),
            line: utils.formatUnits(univ2ethusdtAIlk.line, 45),
            dust: utils.formatUnits(univ2ethusdtAIlk.dust, 45),
            lineMax: utils.formatUnits(univ2ethusdtAAutoLineIlk.line, 45),
            gap: utils.formatUnits(univ2ethusdtAAutoLineIlk.gap, 45),
            ttl: univ2ethusdtAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(univ2ethusdtAAutoLineIlk.lastInc)
          },
          {
            token: "UNIV2LINKETH",
            ilk: "UNIV2LINKETH-A",
            Art:  utils.formatEther(univ2linkethAIlk.Art),
            rate: utils.formatUnits(univ2linkethAIlk.rate, 27),
            spot: utils.formatUnits(univ2linkethAIlk.spot, 27),
            line: utils.formatUnits(univ2linkethAIlk.line, 45),
            dust: utils.formatUnits(univ2linkethAIlk.dust, 45),
            lineMax: utils.formatUnits(univ2linkethAAutoLineIlk.line, 45),
            gap: utils.formatUnits(univ2linkethAAutoLineIlk.gap, 45),
            ttl: univ2linkethAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(univ2linkethAAutoLineIlk.lastInc)
          },
          {
            token: "UNIV2UNIETH",
            ilk: "UNIV2UNIETH-A",
            Art:  utils.formatEther(univ2uniethAIlk.Art),
            rate: utils.formatUnits(univ2uniethAIlk.rate, 27),
            spot: utils.formatUnits(univ2uniethAIlk.spot, 27),
            line: utils.formatUnits(univ2uniethAIlk.line, 45),
            dust: utils.formatUnits(univ2uniethAIlk.dust, 45),
            lineMax: utils.formatUnits(univ2uniethAAutoLineIlk.line, 45),
            gap: utils.formatUnits(univ2uniethAAutoLineIlk.gap, 45),
            ttl: univ2uniethAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(univ2uniethAAutoLineIlk.lastInc)
          },
          {
            token: "UNIV2WBTCDAI",
            ilk: "UNIV2WBTCDAI-A",
            Art:  utils.formatEther(univ2wbtcdaiAIlk.Art),
            rate: utils.formatUnits(univ2wbtcdaiAIlk.rate, 27),
            spot: utils.formatUnits(univ2wbtcdaiAIlk.spot, 27),
            line: utils.formatUnits(univ2wbtcdaiAIlk.line, 45),
            dust: utils.formatUnits(univ2wbtcdaiAIlk.dust, 45),
            lineMax: utils.formatUnits(univ2wbtcdaiAAutoLineIlk.line, 45),
            gap: utils.formatUnits(univ2wbtcdaiAAutoLineIlk.gap, 45),
            ttl: univ2wbtcdaiAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(univ2wbtcdaiAAutoLineIlk.lastInc)
          },
          {
            token: "UNIV2AAVEETH",
            ilk: "UNIV2AAVEETH-A",
            Art:  utils.formatEther(univ2aaveethAIlk.Art),
            rate: utils.formatUnits(univ2aaveethAIlk.rate, 27),
            spot: utils.formatUnits(univ2aaveethAIlk.spot, 27),
            line: utils.formatUnits(univ2aaveethAIlk.line, 45),
            dust: utils.formatUnits(univ2aaveethAIlk.dust, 45),
            lineMax: utils.formatUnits(univ2aaveethAAutoLineIlk.line, 45),
            gap: utils.formatUnits(univ2aaveethAAutoLineIlk.gap, 45),
            ttl: univ2aaveethAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(univ2aaveethAAutoLineIlk.lastInc)
          },
          {
            token: "UNIV2DAIUSDT",
            ilk: "UNIV2DAIUSDT-A",
            Art:  utils.formatEther(univ2daiusdtAIlk.Art),
            rate: utils.formatUnits(univ2daiusdtAIlk.rate, 27),
            spot: utils.formatUnits(univ2daiusdtAIlk.spot, 27),
            line: utils.formatUnits(univ2daiusdtAIlk.line, 45),
            dust: utils.formatUnits(univ2daiusdtAIlk.dust, 45),
            lineMax: utils.formatUnits(univ2daiusdtAAutoLineIlk.line, 45),
            gap: utils.formatUnits(univ2daiusdtAAutoLineIlk.gap, 45),
            ttl: univ2daiusdtAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(univ2daiusdtAAutoLineIlk.lastInc)
          },
          {
            token: "ETH",
            ilk: "ETH-C",
            Art:  utils.formatEther(ethCIlk.Art),
            rate: utils.formatUnits(ethCIlk.rate, 27),
            spot: utils.formatUnits(ethCIlk.spot, 27),
            line: utils.formatUnits(ethCIlk.line, 45),
            dust: utils.formatUnits(ethCIlk.dust, 45)
          },
          {
            token: "RWA001",
            ilk: "RWA001-A",
            Art:  utils.formatEther(rwa001AIlk.Art),
            rate: utils.formatUnits(rwa001AIlk.rate, 27),
            spot: utils.formatUnits(rwa001AIlk.spot, 27),
            line: utils.formatUnits(rwa001AIlk.line, 45),
            dust: utils.formatUnits(rwa001AIlk.dust, 45)
          },
          {
            token: "RWA002",
            ilk: "RWA002-A",
            Art:  utils.formatEther(rwa002AIlk.Art),
            rate: utils.formatUnits(rwa002AIlk.rate, 27),
            spot: utils.formatUnits(rwa002AIlk.spot, 27),
            line: utils.formatUnits(rwa002AIlk.line, 45),
            dust: utils.formatUnits(rwa002AIlk.dust, 45)
          },
          {  // include PSM in CollateralChart
            token: "USDC",
            ilk: "PSM-USDC-A",
            Art: utils.formatUnits(psmUsdcALocked[0], 6),
            rate: 1
          }
        ],
        daiSupply: utils.formatEther(daiSupply[0]),
        ethSupply: utils.formatEther(ethSupply),
        ethLocked: utils.formatEther(ethLocked[0]),
        ethBLocked: utils.formatEther(ethBLocked[0]),
        ethCLocked: utils.formatEther(ethCLocked[0]),
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
        univ2daiusdcSupply: utils.formatEther(univ2daiusdcSupply[0]),
        univ2daiusdcALocked: utils.formatEther(univ2daiusdcALocked[0]),
        univ2ethusdtSupply: utils.formatEther(univ2ethusdtSupply[0]),
        univ2ethusdtALocked: utils.formatEther(univ2ethusdtALocked[0]),
        univ2linkethSupply: utils.formatEther(univ2linkethSupply[0]),
        univ2linkethALocked: utils.formatEther(univ2linkethALocked[0]),
        univ2uniethSupply: utils.formatEther(univ2uniethSupply[0]),
        univ2uniethALocked: utils.formatEther(univ2uniethALocked[0]),
        univ2wbtcdaiSupply: utils.formatEther(univ2wbtcdaiSupply[0]),
        univ2wbtcdaiALocked: utils.formatEther(univ2wbtcdaiALocked[0]),
        univ2aaveethSupply: utils.formatEther(univ2aaveethSupply[0]),
        univ2aaveethALocked: utils.formatEther(univ2aaveethALocked[0]),
        univ2daiusdtSupply: utils.formatEther(univ2daiusdtSupply[0]),
        univ2daiusdtALocked: utils.formatEther(univ2daiusdtALocked[0]),
        rwa001Supply: utils.formatEther(rwa001Supply[0]),
        rwa001ALocked: utils.formatEther(rwa001ALocked[0]),
        rwa002Supply: utils.formatEther(rwa002Supply[0]),
        rwa002ALocked: utils.formatEther(rwa002ALocked[0]),
        psmUsdcALocked: utils.formatUnits(psmUsdcALocked[0], 6),
        gemPit: utils.formatEther(gemPit[0]),
        uniswapDai: utils.formatEther(uniswapDai[0]),
        uniswapMkr: utils.formatEther(uniswapMkr[0]),
        ethFee: ethFee.toFixed(2),
        ethBFee: ethBFee.toFixed(2),
        ethCFee: ethCFee.toFixed(2),
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
        univ2daiusdcAFee: univ2daiusdcAFee.toFixed(2),
        univ2ethusdtAFee: univ2ethusdtAFee.toFixed(2),
        univ2linkethAFee: univ2linkethAFee.toFixed(2),
        univ2uniethAFee: univ2uniethAFee.toFixed(2),
        univ2wbtcdaiAFee: univ2wbtcdaiAFee.toFixed(2),
        univ2aaveethAFee: univ2aaveethAFee.toFixed(2),
        univ2daiusdtAFee: univ2daiusdtAFee.toFixed(2),
        rwa001AFee: rwa001AFee.toFixed(2),
        rwa002AFee: rwa002AFee.toFixed(2),
        psmUsdcTin: utils.formatEther(psmUsdcTin),
        psmUsdcTout: utils.formatEther(psmUsdcTout),
        psmUsdcALine: utils.formatUnits(psmUsdcAIlk.line, 45),
        jugEthDrip: this.unixToDateTime(jugEthDrip.rho.toNumber()),
        jugEthBDrip: this.unixToDateTime(jugEthBDrip.rho.toNumber()),
        jugEthCDrip: this.unixToDateTime(jugEthCDrip.rho.toNumber()),
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
        jugUniv2daiusdcADrip: this.unixToDateTime(jugUniv2daiusdcADrip.rho),
        jugUniv2ethusdtADrip: this.unixToDateTime(jugUniv2ethusdtADrip.rho),
        jugUniv2linkethADrip: this.unixToDateTime(jugUniv2linkethADrip.rho),
        jugUniv2uniethADrip: this.unixToDateTime(jugUniv2uniethADrip.rho),
        jugUniv2wbtcdaiADrip: this.unixToDateTime(jugUniv2wbtcdaiADrip.rho),
        jugUniv2aaveethADrip: this.unixToDateTime(jugUniv2aaveethADrip.rho),
        jugUniv2daiusdtADrip: this.unixToDateTime(jugUniv2daiusdtADrip.rho),
        rwa001ADrip: this.unixToDateTime(rwa001ADrip.rho),
        rwa002ADrip: this.unixToDateTime(rwa002ADrip.rho),
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
        ethCKicks: ethCKicks.toNumber(),
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
        univ2daiusdcAKicks: univ2daiusdcAKicks.toNumber(),
        univ2ethusdtAKicks: univ2ethusdtAKicks.toNumber(),
        univ2linkethAKicks: univ2linkethAKicks.toNumber(),
        univ2uniethAKicks: univ2uniethAKicks.toNumber(),
        univ2wbtcdaiAKicks: univ2wbtcdaiAKicks.toNumber(),
        univ2aaveethAKicks: univ2aaveethAKicks.toNumber(),
        univ2daiusdtAKicks: univ2daiusdtAKicks.toNumber(),
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
        univ2daiusdcPrice: utils.formatUnits(univ2daiusdcPrice, 27),
        univ2daiusdcPriceNxt: utils.formatEther(univ2daiusdcPriceNxt),
        univ2ethusdtPrice: utils.formatUnits(univ2ethusdtPrice, 27),
        univ2ethusdtPriceNxt: utils.formatEther(univ2ethusdtPriceNxt),
        univ2linkethPrice: utils.formatUnits(univ2linkethPrice, 27),
        univ2linkethPriceNxt: utils.formatEther(univ2linkethPriceNxt),
        univ2uniethPrice: utils.formatUnits(univ2uniethPrice, 27),
        univ2uniethPriceNxt: utils.formatEther(univ2uniethPriceNxt),
        univ2wbtcdaiPrice: utils.formatUnits(univ2wbtcdaiPrice, 27),
        univ2wbtcdaiPriceNxt: utils.formatEther(univ2wbtcdaiPriceNxt),
        univ2aaveethPrice: utils.formatUnits(univ2aaveethPrice, 27),
        univ2aaveethPriceNxt: utils.formatEther(univ2aaveethPriceNxt),
        univ2daiusdtPrice: utils.formatUnits(univ2daiusdtPrice, 27),
        univ2daiusdtPriceNxt: utils.formatEther(univ2daiusdtPriceNxt),
        rwa001Price: utils.formatEther(rwa001Price),
        rwa002Price: utils.formatEther(rwa002Price),
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
        protocolTreasury: utils.formatEther(protocolTreasury[0]),
        bkrSupply: utils.formatEther(bkrSupply[0]),
        mkrBroken: utils.formatEther(mkrBroken[0]),
        ethZzz: this.unixToTime(+ethZzz + HOP),
        batZzz: this.unixToTime(+batZzz + HOP),
        wbtcZzz: this.unixToTime(+wbtcZzz + HOP),
        zrxZzz: this.unixToTime(+zrxZzz + HOP),
        kncZzz: this.unixToTime(+kncZzz + HOP),
        manaZzz: this.unixToTime(+manaZzz + HOP),
        usdtZzz: this.unixToTime(+usdtZzz + HOP),
        compZzz: this.unixToTime(+compZzz + HOP),
        lrcZzz: this.unixToTime(+lrcZzz + HOP),
        linkZzz: this.unixToTime(+linkZzz + HOP),
        balZzz: this.unixToTime(+balZzz + HOP),
        yfiZzz: this.unixToTime(+yfiZzz + HOP),
        uniZzz: this.unixToTime(+uniZzz + HOP),
        renbtcZzz: this.unixToTime(+renbtcZzz + HOP),
        aaveZzz: this.unixToTime(+aaveZzz + HOP),
        univ2daiethZzz: this.unixToTime(+univ2daiethZzz + HOP),
        univ2wbtcethZzz: this.unixToTime(+univ2wbtcethZzz + HOP),
        univ2usdcethZzz: this.unixToTime(+univ2usdcethZzz + HOP),
        univ2daiusdcZzz: this.unixToTime(+univ2daiusdcZzz + HOP),
        univ2ethusdtZzz: this.unixToTime(+univ2ethusdtZzz + HOP),
        univ2linkethZzz: this.unixToTime(+univ2linkethZzz + HOP),
        univ2uniethZzz: this.unixToTime(+univ2uniethZzz + HOP),
        univ2wbtcdaiZzz: this.unixToTime(+univ2wbtcdaiZzz + HOP),
        univ2aaveethZzz: this.unixToTime(+univ2aaveethZzz + HOP),
        univ2daiusdtZzz: this.unixToTime(+univ2daiusdtZzz + HOP),
        historicalDebt,
      }
    })
  }

  isLoaded = () => {
    return this.state.blockNumber !== null
  }

  unixToDateTime = stamp => new Date(stamp * 1000).toLocaleDateString("en-US") + " " + new Date(stamp * 1000).toLocaleTimeString("en-US")
  unixToTime = stamp => new Date(stamp * 1000).toLocaleTimeString("en-US")

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

  // NOTE getMKRAnnualBurn is unused and incomplete atm
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

  getHistoricalDebt = async ({ blockInterval, periods }) => {
    try {
      const latestBlock = await (provider ?? eth).getBlockNumber()

      if (latestBlock) {
        const numberOfPoints = periods ?? latestBlock / blockInterval

        if (numberOfPoints > 0) {
          const result = new Array(numberOfPoints)

          const fragments = Array.from({ length: numberOfPoints }, (v, i) => {
            const block = latestBlock - (i + 1) * blockInterval

            return `
            _${numberOfPoints - i}_${block}: systemState(block: { number: ${block}}, id: "current") {
              block
              timestamp
              totalDebt
              debtCeiling: totalDebtCeiling
            }
          `
          })

          const data = await subgraphClient.request(gql`{${fragments.concat()}}`)

          Object.entries(data).forEach(([key, value]) => {
            const [, index, block] = key.split("_")

            result[+index - 1] = { block: +block, ...value }
          })

          return result
        }
      }
    } catch(err) {
      console.error("Historical debt could not be obtained due to an error.", err)
    }

    return null
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
            <a href="https://twitter.com/nanexcool" target="_blank" rel="noopener noreferrer">{t('daistats.say_hi')}</a>
            <br />
            <div className="buttons is-centered">
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('en')}>English</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('es')}>Español</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('fr')}>Français</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('it')}>Italiano</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('de')}>Deutsch</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('id')}>Bahasa Indonesia</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('zh-TW')}>繁體中文</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('jp')}>日本語</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('ru')}>Русский</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('ga')}>Gaeilge</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('tr')}>Türkçe</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('pl')}>Polski</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('ro')}>Română</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('fa')}>فارسی</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('uk')}>Українська</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('kr')}>한국어</button>
              <button className="button is-small is-rounded" onClick={() => this.props.toggle('af')}>Afrikaans</button>
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
