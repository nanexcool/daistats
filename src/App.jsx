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
import { configs } from "./config"
const { ETHERSCAN_ETHSUPPLY_URL } = configs

// import confetti from './confetti'

const ethers = require('ethers')
const utils = ethers.utils

const jsonFetch = url => fetch(url).then(res => res.json())

const add = require('./addresses.json')
add["CHIEF"] = "0x0a3f6849f78076aefaDf113F5BED87720274dDC0" // MCD_ADM
add["GEM_PIT"] = "0x69076e44a9C70a67D5b79d95795Aba299083c275"
add["UNISWAP_DAI"] = "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11" // replace 0x0
add["UNISWAP_MKR"] = "0x2C4Bd064b998838076fa341A83d007FC2FA50957" // replace 0x0
add["MULTICALL"] = "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441" //v1
add["MULTICALL"] = "0xcA11bde05977b3631167028862bE2a173976CA11" //v3
add["CHAI"] = "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215" // confirm what is this
add["BKR"] = "0x0ff5E7B1a54387458F4dD2F04CDdA7D1246C34D9" // confirm what is this
add["OPTIMISTIC_DAI"] = "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1"  // replace 0x0
add["OPTIMISTIC_MKR"] = "0xab7badef82e9fe11f6f33f87bc9bc2aa27f2fcb5" // replace 0x0
add["OPTIMISTIC_L1ESCROW"] = "0x467194771dAe2967Aef3ECbEDD3Bf9a310C76C65" // confirm what is this
add["OASIS_DEX"] = "0x794e6e91555438afc3ccf1c5076a74f42133d08d" // replace 0x0
add["BALANCER_V2"] = "0xBA12222222228d8Ba445958a75a0704d566BF2C8" // confirm what is this

//add["MCD_FLIP_USDC_PSM_A"] = "0x507420100393b1Dc2e8b4C8d0F8A13B56268AC99"

add["GOV_MULTISIG"] = "0x73f09254a81e1F835Ee442d1b3262c1f1d7A13ff"
add["GOV_WALLET_1"] = "0x01D26f8c5cC009868A4BF66E268c17B057fF7A73"
add["GOV_WALLET_2"] = "0xC818Ae5f27B76b4902468C6B02Fd7a089F12c07b"
add["GOV_WALLET_3"] = "0xbfDD0E744723192f7880493b66501253C34e1241"
add["RISK_MULTISIG"] = "0xd98ef20520048a35EdA9A202137847A62120d2d9"
add["RISK_001_WALLET"] = "0xb386Bc4e8bAE87c3F67ae94Da36F385C100a370a"
add["RWF_MULTISIG"] = "0x9e1585d9CA64243CE43D42f7dD7333190F66Ca09"
add["GRO_MULTISIG"] = "0x7800C137A645c07132886539217ce192b9F0528e"
add["CP_MULTISIG"] = "0x6A0Ce7dBb43Fe537E3Fd0Be12dc1882393895237"
add["CP_MULTISIG_2"] = "0xDCAF2C84e1154c8DdD3203880e5db965bfF09B60"
add["SES_AUDIT_MULTISIG"] = "0x87AcDD9208f73bFc9207e1f6F0fDE906bcA95cc6"
add["SES_PERMANENT_TEAM_MULTISIG"] = "0xb5eB779cE300024EDB3dF9b6C007E312584f6F4f"
add["SES_INCUBATION_PROGRAM_MULTISIG"] = "0x7c09Ff9b59BAAebfd721cbDA3676826aA6d7BaE8"
add["SES_GRANTS_PROGRAM_MULTISIG"] = "0xf95eB8eC63D6059bA62b0A8A7F843c7D92f41de2"
add["PE_MULTISIG"] = "0xe2c16c308b843eD02B09156388Cb240cEd58C01c"
add["ORA_MULTISIG"] = "0x2d09B7b95f3F312ba6dDfB77bA6971786c5b50Cf"
add["ORA_ER_MULTISIG"] = "0x53CCAA8E3beF14254041500aCC3f1D4edb5B6D24"
add["COM_MULTISIG"] = "0x1eE3ECa7aEF17D1e74eD7C447CcBA61aC76aDbA9"
add["COM_ER_MULTISIG"] = "0x99E1696A680c0D9f426Be20400E468089E7FDB0f"
add["DAIF_WALLET"] = "0x34D8d61050Ef9D2B48Ab00e6dc8A8CA6581c5d63"
add["DAIF_EF_WALLET"] = "0x5F5c328732c9E52DfCb81067b8bA56459b33921f"
add["SNE_WALLET"] = "0x6D348f18c88D45243705D4fdEeB6538c6a9191F1"
add["SH_WALLET"] = "0x955993Df48b0458A01cfB5fd7DF5F5DCa6443550"
add["SH_MULTISIG"] = "0xc657aC882Fb2D6CcF521801da39e910F8519508d"
add["IN_WALLET"] = "0x7327Aed0Ddf75391098e8753512D8aEc8D740a1F"
add["SAS_WALLET"] = "0xb1f950a51516a697E103aaa69E152d839182f6Fe"
add["IS_WALLET"] = "0xd1F2eEf8576736C1EbA36920B957cd2aF07280F4"
add["DECO_WALLET"] = "0xF482D1031E5b172D42B2DAA1b6e5Cbf6519596f7"
// MakerDAO Shop
add["TECH_001_WALLET"] = "0x2dC0420A736D1F40893B9481D8968E4D7424bC0B"
add["ORA_001_GAS"] = "0x2B6180b413511ce6e3DA967Ec503b2Cc19B78Db6"
add["ORA_001_GAS_EMERGENCY"] = "0x1A5B692029b157df517b7d21a32c8490b8692b0f"
add["DUX_001_WALLET"] = "0x5A994D8428CCEbCC153863CCdA9D2Be6352f89ad"
add["SF_001_WALLET"] = "0xf737C76D2B358619f7ef696cf3F94548fEcec379"
add["RWF_001_WALLET"] = "0x96d7b01Cc25B141520C717fa369844d34FF116ec"
add["SF_001_VEST_01"] = "0xBC7fd5AA2016C3e2C8F0dBf4e919485C6BBb59e2"
add["SF_001_VEST_02"] = "0xCC81578d163A04ea8d2EaE6904d0C8E61A84E1Bb"
add["CES_001_WALLET"] = "0x25307aB59Cd5d8b4E2C01218262Ddf6a89Ff86da"
add["GELATO_WALLET_OLD"] = "0x926c21602FeC84d6d0fA6450b40Edba595B5c6e4"
add["GELATO_WALLET"] = "0x478c7Ce3e1df09130f8D65a23AD80e05b352af62"
add["AMBASSADOR_WALLET"] = "0xF411d823a48D18B32e608274Df16a9957fE33E45"
add["EVENTS_WALLET"] = "0x3D274fbAc29C92D2F624483495C0113B44dBE7d2"
add["KEEP3R_MANAGER"] = "0xc6A048550C9553F8Ac20fbdeB06f114c27ECcabb"

add["MEDIAN_ETH"] = "0x64de91f5a373cd4c28de3600cb34c7c6ce410c85"
add["MEDIAN_WBTC"] = "0xe0F30cb149fAADC7247E953746Be9BbBB6B5751f"
add["MEDIAN_AAVE"] = "0xe62872DFEbd323b03D27946f8e2491B454a69811"
add["MCD_JOIN_DIRECT_AAVEV2_DAI_STABLE"] = "0x778a13d3eeb110a4f7bb6529f99c000119a08e92"
add["MCD_JOIN_DIRECT_AAVEV2_DAI_VARIABLE"] = "0x6c3c78838c761c6ac7be9f59fe808ea2a6e4379d"
add["MCD_JOIN_DIRECT_AAVEV2_DAI_POOL"] = "0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9"
add["MCD_JOIN_DIRECT_AAVEV2_DAI_INCENTIVE"] = "0xd784927Ff2f95ba542BfC824c8a8a98F3495f6b5"

//PIP_STETH: 0x79ED6619640C1c1d9F3E64555172406FE72788B7 add this to wsteth display? add wsteth median?
add["LERP_HUMP"] = "0x0239311b645a8ef91dc899471497732a1085ba8b"

add["STETH_PRICE"] = "0x911D7A8F87282C4111f621e2D100Aa751Bab1260"
//add["MCD_CLIP_CALC_TUSD_A"] = "0x9B207AfAAAD1ae300Ea659e71306a7Bd6D81C160"
add["PIP_CRVV1ETHSTETH"] = "0xEa508F82728927454bd3ce853171b0e2705880D4"

add["MCD_VEST_DAI_LEGACY"] = "0x2Cc583c0AaCDaC9e23CB601fDA8F1A0c56Cdcb71"
add["MCD_VEST_DAI"] = "0xa4c22f0e25C6630B2017979AcF1f865e94695C4b"

add["MCD_JOIN_WSTETH_B"] = "0x248cCBf4864221fC0E840F29BB042ad5bFC89B5c"
add["MCD_CLIP_WSTETH_B"] = "0x3ea60191b7d5990a3544B6Ef79983fD67e85494A"
add["MCD_CLIP_CALC_WSTETH_B"] = "0x95098b29F579dbEb5c198Db6F30E28F7f3955Fbb"

add["MCD_END"] = "0x0e2e8F1D1326A4B9633D96222Ce399c708B19c28"
add["MCD_CURE"] = "0x0085c9feAb2335447E1F4DC9bf3593a8e28bdfc7"
add["MCD_FLASH"] = "0x60744434d6339a6B27d73d9Eda62b6F66a0a04FA"
add["MCD_FLASH_LEGACY"] = "0x1EB4CF3A948E7D72A198fe073cCb8C7a948cD853"

add["STARKNET_DAI_BRIDGE"] = "0x659a00c33263d9254Fed382dE81349426C795BB6"
add["STARKNET_DAI_ESCROW"] = "0x0437465dfb5B79726e35F08559B0cBea55bb585C"
//STARKNET_ESCROW_MOM: 0xc238E3D63DfD677Fa0FA9985576f0945C581A266

const reverseAddresses = Object.entries(add).reduce((add, [key, value]) => (add[value] = key, add), {})

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
const ilkRegistry = build(add.ILK_REGISTRY, "IlkRegistry")
const vat = build(add.MCD_VAT, "Vat")
const pot = build(add.MCD_POT, "Pot")
const jug = build(add.MCD_JUG, "Jug")
const vow = build(add.MCD_VOW, "Vow")
const pit = build(add.GEM_PIT, "GemPit")
const cat = build(add.MCD_CAT, "Cat")
const dog = build(add.MCD_DOG, "Dog")
const spot = build(add.MCD_SPOT, "Spotter")
const autoline = build(add.MCD_IAM_AUTO_LINE, "DssAutoLine")
const flashLegacy = build(add.MCD_FLASH_LEGACY, "DssFlashLegacy")
const flash = build(add.MCD_FLASH, "DssFlash")
const pause = build(add.MCD_PAUSE, "DSPause")
const chief = build(add.CHIEF, "DSChief")
const esm = build(add.MCD_ESM, "ESM")
const end = build(add.MCD_END, "End")
const vestDai = build(add.MCD_VEST_DAI, "DssVestSuckable")
const vestMkr = build(add.MCD_VEST_MKR, "DssVestMintable")
const vestMkrTreasury = build(add.MCD_VEST_MKR_TREASURY, "DssVestTransferrable")
const weth = build(add.ETH, "ERC20")
const usdc = build(add.USDC, "ERC20")
const tusd = build(add.TUSD, "ERC20")
const wbtc = build(add.WBTC, "ERC20")
const pax = build(add.PAXUSD, "ERC20")
const gusd = build(add.GUSD, "ERC20")

const bkr = build(add.BKR, "ERC20")
const adai = build(add.ADAI, "ERC20")
const aaveLendingPool = build(add.MCD_JOIN_DIRECT_AAVEV2_DAI_POOL, "AaveLendingPoolV2")
const crvv1ethsteth = build(add.CRVV1ETHSTETH, "ERC20")
const cropJoin = build(add.MCD_JOIN_CRVV1ETHSTETH_A, "SynthetixJoin")
const dai = build(add.MCD_DAI, "Dai")
const mkr = build(add.MCD_GOV, "DSToken")
const chai = build(add.CHAI, "Chai")
const manager = build(add.CDP_MANAGER, "DssCdpManager")
const clip = build(add.MCD_CLIP_ETH_A, "Clipper") // FIXME are these all the same now?
// NOTE one calc instance is shared between all ilks though each ilk has its own calc contract
const calc = build(add.MCD_CLIP_CALC_ETH_A, "StairstepExponentialDecrease")
const flap = build(add.MCD_FLAP, "Flapper")
const flop = build(add.MCD_FLOP, "Flopper")
const d3mAdai = build(add.MCD_JOIN_DIRECT_AAVEV2_DAI, "DssDirectDepositAaveDai")
const aaveIncentive = build(add.MCD_JOIN_DIRECT_AAVEV2_DAI_INCENTIVE, "StakedTokenIncentivesController")
const usdcPip = build(add.PIP_USDC, "DSValue")
const pip = build(add.PIP_ETH, "OSM")
const lerp = build(add.LERP_HUMP, "Lerp")
const ethAIlkBytes = utils.formatBytes32String("ETH-A")
const ethBIlkBytes = utils.formatBytes32String("ETH-B")
const ethCIlkBytes = utils.formatBytes32String("ETH-C")
const wbtcAIlkBytes = utils.formatBytes32String("WBTC-A")
const wbtcBIlkBytes = utils.formatBytes32String("WBTC-B")
const wbtcCIlkBytes = utils.formatBytes32String("WBTC-C")
const d3madaiIlkBytes = utils.formatBytes32String("DIRECT-AAVEV2-DAI")
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
const WAD = ethers.BigNumber.from("1000000000000000000")
const DP2 = ethers.BigNumber.from("10000000000000000")
const DP6 = ethers.BigNumber.from("1000000000000")
const DP7 = ethers.BigNumber.from("1000000000000")
const DP8 = ethers.BigNumber.from("10000000000")
const DP10 = ethers.BigNumber.from("1000000000")
const DP18 = ethers.BigNumber.from("1")

const HOP = 3600 // assumes all OSM's have same hop

const VEST_DAI_LEGACY_IDS = 37
const VEST_DAI_IDS = 8
const VEST_MKR_TREASURY_IDS = 23
// const VEST_MKR_TREASURY_IDS = 15

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
  POSITION_MEDIAN_VAL = 1

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
      [add.MULTICALL, multi.interface.encodeFunctionData('getCurrentBlockTimestamp', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('Line', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('debt', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('hump', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('sump', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('Sin', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('Ash', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('bump', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('dump', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('wait', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('dai', [add.MCD_VOW])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('sin', [add.MCD_VOW])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('totalSupply', [])],

      [add.MCD_GOV, mkr.interface.encodeFunctionData('balanceOf', [add.GEM_PIT])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.UNISWAP_DAI])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.OASIS_DEX])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.BALANCER_V2])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.OPTIMISTIC_L1ESCROW])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.STARKNET_DAI_ESCROW])],

      [add.MCD_POT, pot.interface.encodeFunctionData('Pie', [])],
      [add.MCD_POT, pot.interface.encodeFunctionData('chi', [])],
      [add.MCD_POT, pot.interface.encodeFunctionData('rho', [])],
      [add.CDP_MANAGER, manager.interface.encodeFunctionData('cdpi', [])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('base', [])],

      [add.MCD_POT, pot.interface.encodeFunctionData('dsr', [])],
      [add.CHAI, chai.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_GOV, mkr.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('vice', [])],

      [add.MCD_FLAP, flap.interface.encodeFunctionData('beg', [])],
      [add.MCD_FLAP, flap.interface.encodeFunctionData('ttl', [])],
      [add.MCD_FLAP, flap.interface.encodeFunctionData('tau', [])],
      [add.MCD_FLAP, flap.interface.encodeFunctionData('kicks', [])],
      [add.MCD_FLAP, flap.interface.encodeFunctionData('lid', [])],
      [add.MCD_FLAP, flap.interface.encodeFunctionData('fill', [])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('beg', [])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('pad', [])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('ttl', [])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('tau', [])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('kicks', [])],

      [add.MCD_GOV, mkr.interface.encodeFunctionData('balanceOf', [add.MCD_PAUSE_PROXY])],
      [add.BKR, bkr.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_GOV, mkr.interface.encodeFunctionData('balanceOf', [add.BKR])],
      [add.MCD_DOG, dog.interface.encodeFunctionData('Hole', [])],
      [add.MCD_DOG, dog.interface.encodeFunctionData('Dirt', [])],

      [add.MCD_FLASH, flash.interface.encodeFunctionData('max', [])], // or use EIP 3156 maxFlashLoan(token)
      // flash toll hardwired to 0
      [add.MCD_FLASH_LEGACY, flashLegacy.interface.encodeFunctionData('max', [])],
      [add.MCD_FLASH_LEGACY, flashLegacy.interface.encodeFunctionData('toll', [])],
      [add.MCD_PAUSE, pause.interface.encodeFunctionData('delay', [])],
      [add.CHIEF, chief.interface.encodeFunctionData('hat', [])],
      [add.MCD_ESM, esm.interface.encodeFunctionData('min', [])],
      [add.MCD_ESM, esm.interface.encodeFunctionData('Sum', [])],
      [add.MCD_END, end.interface.encodeFunctionData('wait', [])],
      // FIXME show  end live, when, debt
      // FIXME lookup targetInterestRate (bar), need onchain helper function so can do with one multicall
      //[add.MCD_JOIN_DIRECT_AAVEV2_DAI, d3mAdai.interface.encodeFunctionData('calculateTargetSupply', [ethers.BigNumber.from('27500000000000000000000000')])],
      [add.MCD_JOIN_DIRECT_AAVEV2_DAI, d3mAdai.interface.encodeFunctionData('bar', [])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.ADAI])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('urns', [d3madaiIlkBytes, add.MCD_JOIN_DIRECT_AAVEV2_DAI])],
      // FIXME shoud be erc20 for token not adai? Is a interface for each gem required?
      [add.MCD_JOIN_DIRECT_AAVEV2_DAI_VARIABLE, adai.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_JOIN_DIRECT_AAVEV2_DAI_STABLE, adai.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_JOIN_DIRECT_AAVEV2_DAI_POOL, aaveLendingPool.interface.encodeFunctionData('getReserveData', [add.MCD_DAI])],
      [add.MCD_JOIN_DIRECT_AAVEV2_DAI_INCENTIVE, aaveIncentive.interface.encodeFunctionData('getRewardsBalance', [[add.ADAI], add.MCD_JOIN_DIRECT_AAVEV2_DAI])],
      [add.LERP_HUMP, lerp.interface.encodeFunctionData('start', [])],
      [add.LERP_HUMP, lerp.interface.encodeFunctionData('end', [])],
      [add.LERP_HUMP, lerp.interface.encodeFunctionData('startTime', [])],
      [add.LERP_HUMP, lerp.interface.encodeFunctionData('duration', [])]

    ].concat(this.getVestingCalls(add.MCD_VEST_DAI_LEGACY, vestDai, VEST_DAI_LEGACY_IDS))
      .concat(this.getVestingCalls(add.MCD_VEST_DAI, vestDai, VEST_DAI_IDS))
      .concat(this.getVestingCalls(add.MCD_VEST_MKR_TREASURY, vestMkrTreasury, VEST_MKR_TREASURY_IDS))
      .concat(this.getIlkCall(ethAIlkBytes, 'ETH_A', weth, add.ETH, add.PIP_ETH))
      .concat(this.getIlkCall(ethBIlkBytes, 'ETH_B', weth, add.ETH, add.PIP_ETH))
      .concat(this.getIlkCall(ethCIlkBytes, 'ETH_C', weth, add.ETH, add.PIP_ETH))
      .concat(this.getIlkCall(wbtcAIlkBytes, 'WBTC_A', wbtc, add.WBTC, add.PIP_WBTC))
      .concat(this.getIlkCall(wbtcBIlkBytes, 'WBTC_B', wbtc, add.WBTC, add.PIP_WBTC))
      .concat(this.getIlkCall(wbtcCIlkBytes, 'WBTC_C', wbtc, add.WBTC, add.PIP_WBTC))
      , { blockTag: blockNumber })
    let promises = [
      p1,
      this.etherscanEthSupply(),
      this.getPrice(add.PIP_ETH, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_ETH, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_WBTC, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_WBTC, this.POSITION_MEDIAN_VAL),
      // this.getHistoricalDebt({ blockInterval: 45500 /* ≈ 7 day */, periods: 52 /* 12 months */ }),
    ]

    let [[block, res], ethSupply, ethPriceNxt, ethPriceMedian,
      wbtcPriceNxt, wbtcPriceMedian, historicalDebt] = await Promise.all(promises)

    var offset = 0;

    const timestamp = multi.interface.decodeFunctionResult('getCurrentBlockTimestamp', res[offset++])
    const line = res[offset++] // vat.interface.decodeFunctionResult('Line', res[0])
    const debt = res[offset++] //vat.interface.decodeFunctionResult('debt', res[1])
    const surplusBuffer = vow.interface.decodeFunctionResult('hump', res[offset++])[0]
    const debtSize = vow.interface.decodeFunctionResult('sump', res[offset++])[0]
    const sin = vow.interface.decodeFunctionResult('Sin', res[offset++])[0]
    const ash = vow.interface.decodeFunctionResult('Ash', res[offset++])[0]
    const surplusBump = vow.interface.decodeFunctionResult('bump', res[offset++])[0]
    const debtDump = vow.interface.decodeFunctionResult('dump', res[offset++])[0]
    const vowWait = vow.interface.decodeFunctionResult('wait', res[offset++])[0]
    const vow_dai = vat.interface.decodeFunctionResult('dai', res[offset++])[0]
    const vow_sin = vat.interface.decodeFunctionResult('sin', res[offset++])[0]
    const daiSupply = dai.interface.decodeFunctionResult('totalSupply', res[offset++])[0]

    const gemPit = mkr.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const uniswapDai = dai.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const oasisDexDai = dai.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const balancerV2Dai = dai.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const optimisticDaiSupply = dai.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const starknetDaiSupply = dai.interface.decodeFunctionResult('balanceOf', res[offset++])[0]

    const savingsPie = pot.interface.decodeFunctionResult('Pie', res[offset++])[0]
    const pieChi = pot.interface.decodeFunctionResult('chi', res[offset++])[0]
    const savingsDai = savingsPie.mul(pieChi);
    const potDrip = pot.interface.decodeFunctionResult('rho', res[offset++])[0]
    const cdps = manager.interface.decodeFunctionResult('cdpi', res[offset++])
    // hack cast to bignumber for "jug.base = 0"
    const base = '0x' + jug.interface.decodeFunctionResult('base', res[offset++])

    const dsr = pot.interface.decodeFunctionResult('dsr', res[offset++])[0]
    const chaiSupply = chai.interface.decodeFunctionResult('totalSupply', res[offset++])[0]
    const daiBrewing = chaiSupply.mul(pieChi)
    const mkrSupply = mkr.interface.decodeFunctionResult('totalSupply', res[offset++])[0]
    const vice = vat.interface.decodeFunctionResult('vice', res[offset++])[0]

    const flapBeg = flap.interface.decodeFunctionResult('beg', res[offset++])[0]
    const flapTtl = flap.interface.decodeFunctionResult('ttl', res[offset++])
    const flapTau = flap.interface.decodeFunctionResult('tau', res[offset++])
    const flapKicks = flap.interface.decodeFunctionResult('kicks', res[offset++])[0]
    const flapLid = flap.interface.decodeFunctionResult('lid', res[offset++])[0]
    const flapFill = flap.interface.decodeFunctionResult('fill', res[offset++])[0]
    const flopBeg = flop.interface.decodeFunctionResult('beg', res[offset++])[0]
    const flopPad = flop.interface.decodeFunctionResult('pad', res[offset++])[0]
    const flopTtl = flop.interface.decodeFunctionResult('ttl', res[offset++])
    const flopTau = flop.interface.decodeFunctionResult('tau', res[offset++])
    const flopKicks = flop.interface.decodeFunctionResult('kicks', res[offset++])[0]

    const protocolTreasury = mkr.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const bkrSupply = bkr.interface.decodeFunctionResult('totalSupply', res[offset++])[0]
    const mkrBroken = mkr.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const hole = dog.interface.decodeFunctionResult('Hole', res[offset++])[0]
    const dirt = dog.interface.decodeFunctionResult('Dirt', res[offset++])[0]

    const flashLine = flash.interface.decodeFunctionResult('max', res[offset++])[0]
    const flashLegacyLine = flashLegacy.interface.decodeFunctionResult('max', res[offset++])[0]
    const flashLegacyToll = flashLegacy.interface.decodeFunctionResult('toll', res[offset++])[0]
    const pauseDelay = pause.interface.decodeFunctionResult('delay', res[offset++])[0]
    const hat = chief.interface.decodeFunctionResult('hat', res[offset++])
    const esmMin = esm.interface.decodeFunctionResult('min', res[offset++])[0]
    const esmSum = esm.interface.decodeFunctionResult('Sum', res[offset++])[0]
    const endWait = end.interface.decodeFunctionResult('wait', res[offset++])[0]
    //const d3mAdaiTargetSupply = d3mAdai.interface.decodeFunctionResult('calculateTargetSupply', res[offset++])[0]
    const d3mAdaiTargetSupply = ethers.BigNumber.from("0")
    const d3mAdaiBar = d3mAdai.interface.decodeFunctionResult('bar', res[offset++])[0]
    const d3mAdaiAvailableLiquidity = dai.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const d3mAdaiDaiDebt = vat.interface.decodeFunctionResult('urns', res[offset++])[1]
    const d3mAdaiTotalSupplyVariable = adai.interface.decodeFunctionResult('totalSupply', res[offset++])[0]
    const d3mAdaiTotalSupplyFixed = adai.interface.decodeFunctionResult('totalSupply', res[offset++])[0]
    //[, liquidityIndex, variableBorrowIndex, currentLiquidityRate, currentVariableBorrowRate,
    //currentStableBorrowRate, , aTokenAddress, stableDebtTokenAddress,
    //variableDebtTokenAddress, , ] = LendingPool.getReserveData(asset.address)
    // asset is the ERC20 deposited or borrowed, eg. DAI, WETH
    const d3mAdaiReserve = aaveLendingPool.interface.decodeFunctionResult('getReserveData', res[offset++])[0]
    const d3mAdaiIncentive = aaveIncentive.interface.decodeFunctionResult('getRewardsBalance', res[offset++])[0]
    const lerpHumpStart = lerp.interface.decodeFunctionResult('start', res[offset++])[0]
    const lerpHumpEnd = lerp.interface.decodeFunctionResult('end', res[offset++])[0]
    const lerpHumpStartTime = lerp.interface.decodeFunctionResult('startTime', res[offset++])[0]
    const lerpHumpDuration = lerp.interface.decodeFunctionResult('duration', res[offset++])[0]

    const ILK_CALL_COUNT = 17;
    const ILK_RWA_CALL_COUNT = 8;
    const ILK_PSM_CALL_COUNT = 17;
    const VEST_CALL_COUNT = 3

    const vestingDaiLegacy = this.getVestingMaps(res, offset, vestDai, VEST_DAI_LEGACY_IDS)
    const vestingDai = this.getVestingMaps(res, offset += (VEST_DAI_LEGACY_IDS * VEST_CALL_COUNT), vestDai, VEST_DAI_IDS)
    const vestingMkrTreasury = this.getVestingMaps(res, offset += (VEST_DAI_IDS * VEST_CALL_COUNT), vestMkrTreasury, VEST_MKR_TREASURY_IDS)

    const ilks = [
      // 267 + 17
      this.getIlkMap(res, offset += (VEST_MKR_TREASURY_IDS * VEST_CALL_COUNT), "ETH", "ETH-A", weth, 18, base, ethPriceNxt, ethPriceMedian, DP10),
      this.getIlkMap(res, offset += ILK_CALL_COUNT, "ETH", "ETH-B", weth, 18, base, ethPriceNxt, ethPriceMedian, DP10),
      this.getIlkMap(res, offset += ILK_CALL_COUNT, "ETH", "ETH-C", weth, 18, base, ethPriceNxt, ethPriceMedian, DP10),
      this.getIlkMap(res, offset += ILK_CALL_COUNT, "WBTC", "WBTC-A", wbtc, 8, base, wbtcPriceNxt, wbtcPriceMedian, DP10, DP8),
      this.getIlkMap(res, offset += ILK_CALL_COUNT, "WBTC", "WBTC-B", wbtc, 8, base, wbtcPriceNxt, wbtcPriceMedian, DP10, DP8),
      this.getIlkMap(res, offset += ILK_CALL_COUNT, "WBTC", "WBTC-C", wbtc, 8, base, wbtcPriceNxt, wbtcPriceMedian, DP10, DP8),
    ]

    const ilksByName = ilks.reduce((a, x) => ({ ...a, [x.ilk]: x }), {})
    const sysLocked = ilks.reduce((t, i) => t.add(i.valueBn), ethers.BigNumber.from('0'))
    // const d3mAdaiFeesPending = ilksByName["DIRECT-AAVEV2-DAI"].lockedBn.sub(d3mAdaiDaiDebt)
    // const d3mAdaiTotalSupply =  d3mAdaiAvailableLiquidity.add(d3mAdaiTotalSupplyVariable.add(d3mAdaiTotalSupplyFixed))
    // const d3mAdaiAdjustment = ethers.BigNumber.from("0") //d3mAdaiTargetSupply.sub(d3mAdaiTotalSupply)
    // const lerpHumpCurrent = this.getLerp(lerpHumpStart, lerpHumpEnd, lerpHumpStartTime, lerpHumpDuration, timestamp[0])
    // ilksByName["RWA009-A"]["conduitIn"] = ethers.BigNumber.from("0") // HV Bank has no input conduit

    const d3mAdaiFeesPending = ethers.BigNumber.from("0")
    const d3mAdaiTotalSupply = ethers.BigNumber.from("0")
    const d3mAdaiAdjustment = ethers.BigNumber.from("0") //d3mAdaiTargetSupply.sub(d3mAdaiTotalSupply)
    const lerpHumpCurrent = ethers.BigNumber.from("0")
    // ilksByName["RWA009-A"]["conduitIn"] = ethers.BigNumber.from("0") // HV Bank has no input conduit

    // if (parseInt(utils.formatUnits(res[1], 45)) >= 300000000) confetti.rain()

    this.setState(state => {
      return {
        networkId: networkId,
        blockNumber: block.toString(),
        timestamp: this.unixToDateTime(timestamp),
        timestampHHMM: this.unixToTime(timestamp),
        Line: utils.formatUnits(line, 45),
        debt: utils.formatUnits(debt, 45),
        ilks: ilks,
        ilksByName: ilksByName,
        vestingDaiLegacy: vestingDaiLegacy,
        vestingDai: vestingDai,
        vestingMkrTreasury: vestingMkrTreasury,
        daiSupply: utils.formatEther(daiSupply),
        ethSupply: utils.formatEther(ethSupply),
        gemPit: utils.formatEther(gemPit),
        uniswapDai: utils.formatEther(uniswapDai),
        balancerV2Dai: utils.formatEther(balancerV2Dai),
        sysSurplus: utils.formatUnits(vow_dai.sub(vow_sin), 45),
        sysDebt: utils.formatUnits(vow_sin.sub(sin).sub(ash), 45),
        sysDebtRaw: vow_sin.sub(sin).sub(ash).toString(),
        vowDaiRaw: vow_dai.toString(),
        surplusBuffer: utils.formatUnits(surplusBuffer, 45),
        surplusBump: utils.formatUnits(surplusBump, 45),
        debtDump: utils.formatEther(debtDump),
        debtSize: utils.formatUnits(debtSize, 45),
        potFee: this.calcFee(dsr),
        savingsPie: utils.formatEther(savingsPie),
        savingsDai: utils.formatUnits(savingsDai, 45),
        potDrip: this.unixToDateTime(potDrip.toNumber()),
        hole: utils.formatUnits(hole, 45),
        dirt: utils.formatUnits(dirt, 45),
        flapBeg: utils.formatUnits(flapBeg, 18),
        flapTtl: flapTtl,
        flapTau: flapTau,
        flapKicks: flapKicks.toNumber(),
        flapLid: utils.formatUnits(flapLid, 45),
        flapFill: utils.formatUnits(flapFill, 45),
        flopBeg: utils.formatUnits(flopBeg, 18),
        flopPad: utils.formatUnits(flopPad, 18),
        flopTtl: flopTtl,
        flopTau: flopTau,
        flopKicks: flopKicks.toNumber(),
        flopDelay: vowWait.toNumber(),
        cdps: cdps.toString(),
        sysLocked: utils.formatUnits(sysLocked, 45),
        chaiSupply: utils.formatEther(chaiSupply),
        mkrSupply: utils.formatEther(mkrSupply),
        vice: utils.formatUnits(vice, 45),
        vow_dai: utils.formatUnits(vow_dai, 45),
        vow_sin: utils.formatUnits(vow_sin, 45),
        bigSin: utils.formatUnits(sin, 45),
        daiBrewing: utils.formatUnits(daiBrewing, 45),
        oasisDexDai: utils.formatEther(oasisDexDai),
        protocolTreasury: utils.formatEther(protocolTreasury),
        bkrSupply: utils.formatEther(bkrSupply),
        mkrBroken: utils.formatEther(mkrBroken),
        flashLine: utils.formatEther(flashLine),
        flashLegacyLine: utils.formatEther(flashLegacyLine),
        flashLegacyToll: utils.formatEther(flashLegacyToll),
        pauseDelay: pauseDelay.toNumber(),
        hat: hat,
        esmMin: utils.formatEther(esmMin),
        esmSum: utils.formatEther(esmSum),
        endWait: endWait.toNumber(),
        optimisticDaiSupply: utils.formatEther(optimisticDaiSupply),
        starknetDaiSupply: utils.formatEther(starknetDaiSupply),
        d3mAdaiTargetSupply: utils.formatEther(d3mAdaiTargetSupply),
        d3mAdaiBar: utils.formatUnits(d3mAdaiBar, 27),
        d3mAdaiAvailableLiquidity: utils.formatUnits(d3mAdaiAvailableLiquidity, 18),
        d3mAdaiDaiDebt: utils.formatUnits(d3mAdaiDaiDebt, 18),
        d3mAdaiFeesPending: utils.formatUnits(d3mAdaiFeesPending, 18),
        d3mAdaiTotalSupplyVariable: utils.formatUnits(d3mAdaiTotalSupplyVariable, 18),
        d3mAdaiTotalSupplyFixed: utils.formatUnits(d3mAdaiTotalSupplyFixed, 18),
        d3mAdaiTotalSupply: utils.formatUnits(d3mAdaiTotalSupply, 18),
        d3mAdaiAdjustment: utils.formatUnits(d3mAdaiAdjustment, 18),
        d3mAdaiDepositAPR: utils.formatUnits(d3mAdaiReserve.currentLiquidityRate, 27),
        d3mAdaiVariableBorrowAPR: utils.formatUnits(d3mAdaiReserve.currentVariableBorrowRate, 27),
        d3mAdaiStableBorrowAPR: utils.formatUnits(d3mAdaiReserve.currentStableBorrowRate, 27),
        d3mAdaiIncentive: utils.formatEther(d3mAdaiIncentive),
        lerpHumpStart: utils.formatUnits(lerpHumpStart, 45),
        lerpHumpEnd: utils.formatUnits(lerpHumpEnd, 45),
        lerpHumpStartTime: this.unixToDate(lerpHumpStartTime),
        lerpHumpDuration: lerpHumpDuration,
        lerpHumpCurrent: utils.formatUnits(lerpHumpCurrent, 45),
        lerpHumpAdjustment: utils.formatUnits(lerpHumpCurrent.sub(surplusBuffer), 45),
        historicalDebt,
      }
    })
  }

  getIlkCall = (ilkBytes, ilkSuffix, gem, gemAdd, pipAdd) => {
    var pipCall, lockedCall;
    const gemJoinAdd = add['MCD_JOIN_' + ilkSuffix]
    const clipAdd = add['MCD_CLIP_' + ilkSuffix]
    const calcAdd = add['MCD_CLIP_CALC_' + ilkSuffix]
    // use pip.zzz or pip.read depending if dsvalue or osm
    if ([usdc, tusd, pax, gusd, adai].includes(gem)) {
      pipCall = [pipAdd, pip.interface.encodeFunctionData('read', [])]
    } else {
      pipCall = [pipAdd, pip.interface.encodeFunctionData('zzz', [])]
    }

    // locked tokens are in the rewards contract - use join.total() instead of gem.balanceOf()
    if (gem === crvv1ethsteth) {
      lockedCall = [gemJoinAdd, cropJoin.interface.encodeFunctionData('total', [])]
    } else {
      lockedCall = [gemAdd, gem.interface.encodeFunctionData('balanceOf', [gemJoinAdd])]
    }

    return [
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [ilkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [ilkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [ilkBytes])],
      // FIXME only include autoline when needed?
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [ilkBytes])],
      [add.MCD_DOG, dog.interface.encodeFunctionData('ilks', [ilkBytes])], // 5
      lockedCall,
      [gemAdd, gem.interface.encodeFunctionData('totalSupply', [])],
      pipCall,
      [clipAdd, clip.interface.encodeFunctionData('buf', [])],
      [clipAdd, clip.interface.encodeFunctionData('tail', [])], // 10
      [clipAdd, clip.interface.encodeFunctionData('cusp', [])],
      [clipAdd, clip.interface.encodeFunctionData('chip', [])],
      [clipAdd, clip.interface.encodeFunctionData('tip', [])],
      [clipAdd, clip.interface.encodeFunctionData('count', [])],
      [clipAdd, clip.interface.encodeFunctionData('kicks', [])],
      [calcAdd, calc.interface.encodeFunctionData('cut', [])], // 15
      [calcAdd, calc.interface.encodeFunctionData('step', [])],
    ]
  }

  getIlkMap = (res, idx, token, ilkName, gem, units, base, priceNxt = null, priceMedian = null, medianDp = null, tokenDp = null) => {
    var locked, zzz, price, value, valueBn;
    // variations no autoline USDT
    const ilk = vat.interface.decodeFunctionResult('ilks', res[idx++])
    const jugIlk = jug.interface.decodeFunctionResult('ilks', res[idx++])
    const spotIlk = spot.interface.decodeFunctionResult('ilks', res[idx++])
    const autoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[idx++])
    const dogIlk = dog.interface.decodeFunctionResult('ilks', res[idx++])
    if (token === 'CRVV1ETHSTETH') {
      locked = cropJoin.interface.decodeFunctionResult('total', res[idx++])[0]
    } else {
      locked = gem.interface.decodeFunctionResult('balanceOf', res[idx++])[0]
    }
    const supply = gem.interface.decodeFunctionResult('totalSupply', res[idx++])[0]

    if (['USDC', 'TUSD', 'USDP', 'GUSD', 'ADAI'].includes(token)) {
      zzz = null;
      //price = pip.interface.decodeFunctionResult('read', res[idx++])[0]
      // FIXME read fails for TUSD
      idx++
      // FIXME hardwired price to 1
      price = ethers.BigNumber.from(1).mul(DP10)
      if (tokenDp) {
        value = locked.mul(tokenDp).mul(price)
      } else {
        value = locked.mul(price)
      }
      price = RAY
      valueBn = value.mul(WAD)
      value = utils.formatUnits(value, 27)
    } else {
      zzz = pip.interface.decodeFunctionResult('zzz', res[idx++])
      price = spotIlk.mat.mul(ilk.spot).div(RAY);

      if (tokenDp) {
        value = locked.mul(tokenDp).mul(priceMedian.mul(medianDp))
      } else if (medianDp) {
        value = locked.mul(priceMedian.mul(medianDp))
      } else {
        value = locked.mul(priceMedian || price)
      }
      valueBn = value
      value = utils.formatUnits(value, 45)
    }

    const r = {
      token: token,
      ilk: ilkName,
      Art: utils.formatEther(ilk.Art),
      rate: utils.formatUnits(ilk.rate, 27),
      spot: utils.formatUnits(ilk.spot, 27),
      mat: utils.formatUnits(spotIlk.mat, 27),
      line: utils.formatUnits(ilk.line, 45),
      dust: utils.formatUnits(ilk.dust, 45),
      lineMax: utils.formatUnits(autoLineIlk.line, 45),
      gap: utils.formatUnits(autoLineIlk.gap, 45),
      ttl: autoLineIlk.ttl,
      lastInc: this.unixToDateTime(autoLineIlk.lastInc),
      chop: utils.formatUnits(dogIlk.chop, 18),
      hole: utils.formatUnits(dogIlk.hole, 45),
      dirt: utils.formatUnits(dogIlk.dirt, 45),
      buf: utils.formatUnits(clip.interface.decodeFunctionResult('buf', res[idx++])[0], 27),
      tail: clip.interface.decodeFunctionResult('tail', res[idx++])[0],
      cusp: utils.formatUnits(clip.interface.decodeFunctionResult('cusp', res[idx++])[0], 27),
      chip: utils.formatUnits(clip.interface.decodeFunctionResult('chip', res[idx++])[0], 18),
      tip: utils.formatUnits(clip.interface.decodeFunctionResult('tip', res[idx++])[0], 45),
      count: clip.interface.decodeFunctionResult('count', res[idx++])[0],
      kicks: clip.interface.decodeFunctionResult('kicks', res[idx++])[0].toNumber(),
      cut: utils.formatUnits(calc.interface.decodeFunctionResult('cut', res[idx++])[0], 27),
      step: calc.interface.decodeFunctionResult('step', res[idx++])[0],
      drip: this.unixToDateTime(jugIlk.rho.toNumber()),
      fee: this.getFee(base, jugIlk),
      locked: utils.formatUnits(locked, units),
      lockedBn: locked,
      supply: utils.formatUnits(supply, units),
      price: utils.formatUnits(price, 27),
      value: value,
      valueBn: valueBn
    };
    if (zzz) {
      r.zzz = this.unixToTime(+zzz + HOP);
    }
    if (priceNxt) {
      r.priceNxt = utils.formatEther(priceNxt);
    }
    if (priceMedian) {
      r.priceMedian = utils.formatEther(priceMedian);
    }
    return r;
  }

  getPsmIlkCall = (ilkBytes, ilkSuffix, gem, gemAdd, pipAdd, psm) => {
    const psmAdd = add['MCD_' + ilkSuffix]
    const gemJoinAdd = add['MCD_JOIN_' + ilkSuffix]
    const clipAdd = add['MCD_CLIP_' + ilkSuffix]
    const calcAdd = add['MCD_CLIP_CALC_' + ilkSuffix]
    return [
      [psmAdd, psm.interface.encodeFunctionData('tin', [])], // 34
      [psmAdd, psm.interface.encodeFunctionData('tout', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [ilkBytes])],
      [gemAdd, gem.interface.encodeFunctionData('balanceOf', [gemJoinAdd])], // 37
      [clipAdd, clip.interface.encodeFunctionData('kicks', [])],
      [add.MCD_DOG, dog.interface.encodeFunctionData('ilks', [ilkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [ilkBytes])], // 40
      [pipAdd, usdcPip.interface.encodeFunctionData('read', [])],
      [gemAdd, gem.interface.encodeFunctionData('totalSupply', [])], // 42

      [clipAdd, clip.interface.encodeFunctionData('buf', [])],
      [clipAdd, clip.interface.encodeFunctionData('tail', [])], // 10
      [clipAdd, clip.interface.encodeFunctionData('cusp', [])],
      [clipAdd, clip.interface.encodeFunctionData('chip', [])],
      [clipAdd, clip.interface.encodeFunctionData('tip', [])],
      [clipAdd, clip.interface.encodeFunctionData('count', [])],
      [calcAdd, calc.interface.encodeFunctionData('cut', [])], // 15
      [calcAdd, calc.interface.encodeFunctionData('step', [])],
    ]
  }

  getPsmIlkMap = (res, idx, token, ilkName, psm, dp, tokenDp, priceDp) => {
    const tin = psm.interface.decodeFunctionResult('tin', res[idx++])[0]
    const tout = psm.interface.decodeFunctionResult('tout', res[idx++])[0]
    const ilk = vat.interface.decodeFunctionResult('ilks', res[idx++])
    const locked = usdc.interface.decodeFunctionResult('balanceOf', res[idx++])[0]
    const kicks = clip.interface.decodeFunctionResult('kicks', res[idx++])[0]
    const dogIlk = dog.interface.decodeFunctionResult('ilks', res[idx++])
    const autoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[idx++])
    const price = usdcPip.interface.decodeFunctionResult('read', res[idx++])[0]
    const supply = usdc.interface.decodeFunctionResult('totalSupply', res[idx++])[0]
    const priceBN = ethers.BigNumber.from(price).mul(priceDp)

    return {
      token: token,
      ilk: ilkName,
      Art: utils.formatUnits(locked, dp),
      rate: 1,
      line: utils.formatUnits(ilk.line, 45),
      lineMax: utils.formatUnits(autoLineIlk.line, 45),
      gap: utils.formatUnits(autoLineIlk.gap, 45),
      ttl: autoLineIlk.ttl,
      lastInc: this.unixToDateTime(autoLineIlk.lastInc),
      chop: utils.formatUnits(dogIlk.chop, 18),
      hole: utils.formatUnits(dogIlk.hole, 45),
      dirt: utils.formatUnits(dogIlk.dirt, 45),
      buf: utils.formatUnits(clip.interface.decodeFunctionResult('buf', res[idx++])[0], 27), // 57
      tail: clip.interface.decodeFunctionResult('tail', res[idx++])[0],
      cusp: utils.formatUnits(clip.interface.decodeFunctionResult('cusp', res[idx++])[0], 27),
      chip: utils.formatUnits(clip.interface.decodeFunctionResult('chip', res[idx++])[0], 18),
      tip: utils.formatUnits(clip.interface.decodeFunctionResult('tip', res[idx++])[0], 45),
      count: clip.interface.decodeFunctionResult('count', res[idx++])[0],
      cut: utils.formatUnits(calc.interface.decodeFunctionResult('cut', res[idx++])[0], 27),
      step: calc.interface.decodeFunctionResult('step', res[idx++])[0],
      kicks: kicks.toNumber(),
      tin: utils.formatEther(tin),
      tout: utils.formatEther(tout),
      locked: utils.formatUnits(locked, dp),
      supply: utils.formatUnits(supply, dp),
      value: utils.formatUnits(locked.mul(tokenDp).mul(priceBN), 45),
      valueBn: locked.mul(tokenDp).mul(priceBN)
    }
  }

  getVestingCalls = (address, vest, ids) => {
    var r = []
    for (let i = 1; i <= ids; i++) {
      r.push([address, vest.interface.encodeFunctionData('awards', [i])])
      r.push([address, vest.interface.encodeFunctionData('accrued', [i])])
      r.push([address, vest.interface.encodeFunctionData('unpaid', [i])])
    }
    return r
  }

  getVestingMaps = (res, idx, vest, ids) => {
    // TODO show:
    //    address mgr;   // A manager address that can yank
    //    uint8   res;   // Restricted
    var r = []
    for (let i = 0; i < ids; i++) {
      var award = vest.interface.decodeFunctionResult('awards', res[idx + (i * 3)])
      r.push({
        id: i + 1,
        usrName: reverseAddresses[award.usr],
        usr: award.usr,
        res: award.res,
        bgn: this.unixToDate(award.bgn),
        clf: this.unixToDate(award.clf),
        fin: this.unixToDate(award.fin),
        tot: utils.formatEther(award.tot),
        rxd: utils.formatEther(award.rxd),
        accrued: utils.formatEther(vest.interface.decodeFunctionResult('accrued', res[idx + (i * 3) + 1])[0]),
        unpaid: utils.formatEther(vest.interface.decodeFunctionResult('unpaid', res[idx + (i * 3) + 2])[0])
      })
    }
    return r
  }

  getLerp = (start, end, startTime, duration, timestamp) => {
    // from LerpFactory.sol:75
    // https://etherscan.io/address/0x0239311b645a8ef91dc899471497732a1085ba8b#code#L75
    if (timestamp.gte(startTime)) {
      if (timestamp.lt(startTime.add(duration))) {
        let t = timestamp.sub(startTime).mul(WAD).div(duration)
        return end.mul(t).div(WAD).add(start).sub(start.mul(t).div(WAD))
      } else {
        return ethers.BigNumber.from("0")
      }
    } else {
      return ethers.BigNumber.from("0")
    }
  }

  isLoaded = () => {
    return this.state.blockNumber !== null
  }

  unixToDateTime = stamp => this.unixToDate(stamp) + " " + this.unixToTime(stamp)
  unixToDate = stamp => {
    const d = new Date(stamp * 1000)
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2)
  }
  unixToTime = stamp => new Date(stamp * 1000).toLocaleTimeString("en-US")

  calcFee = rate => parseFloat(utils.formatUnits(rate, 27)) ** (60 * 60 * 24 * 365) * 1 - 1;

  getFee = (base, ilk) => {
    const { duty } = ilk;
    const combo = duty.add(base);
    return this.calcFee(combo);
  }

  etherscanEthSupply = async () => {
    const json = await jsonFetch(ETHERSCAN_ETHSUPPLY_URL);
    return json.result;
  }

  getPrice = async (osm, position) => {
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
      ((daiFromETH * stabilityETH)
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
    } catch (err) {
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
          <div className="notification has-text-centered">
            { /* eslint-disable-next-line */}
            {t('daistats.block')}: <strong>{this.state.blockNumber}</strong> Time: <strong title={this.state.timestamp}>{this.state.timestampHHMM}</strong>. {this.state.paused ? `${t('daistats.pause')}.` : `${t('daistats.auto_updating')}.`} <a onClick={this.togglePause}>{this.state.paused ? t('daistats.restart') : t('daistats.pause')}</a>
            <br />
            Welcome Societe Generale 🇫🇷 and H.V. BANK 🏦
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
            <Route path="/gsuc">
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
          <Link className="navbar-item" to="/gsuc">What's the total supply of GSUc?</Link>
        </div>
      </div>
    </nav>
  )
}

export default translate()(App)
