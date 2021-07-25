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
add["CHIEF"] = "0x0a3f6849f78076aefaDf113F5BED87720274dDC0"
add["GEM_PIT"] = "0x69076e44a9C70a67D5b79d95795Aba299083c275"
add["UNISWAP_DAI"] = "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"
add["UNISWAP_MKR"] = "0x2C4Bd064b998838076fa341A83d007FC2FA50957"
add["MULTICALL"] = "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441"
add["CHAI"] = "0x06AF07097C9Eeb7fD685c692751D5C66dB49c215"
add["BKR"] = "0x0ff5E7B1a54387458F4dD2F04CDdA7D1246C34D9"
add["OPTIMISTIC_DAI"] = "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1"
add["OPTIMISTIC_ETH"] = "0x4200000000000000000000000000000000000006"
add["OPTIMISTIC_L1ESCROW"] = "0x467194771dAe2967Aef3ECbEDD3Bf9a310C76C65"
add["OASIS_DEX"] = "0x794e6e91555438afc3ccf1c5076a74f42133d08d"
add["BALANCER_V2"] = "0xBA12222222228d8Ba445958a75a0704d566BF2C8"
add["MCD_JOIN_USDC_PSM_A"] = "0x0A59649758aa4d66E25f08Dd01271e891fe52199"
add["MCD_FLIP_USDC_PSM_A"] = "0x507420100393b1Dc2e8b4C8d0F8A13B56268AC99"
add["MCD_PSM_USDC_PSM"] = "0x89B78CfA322F6C5dE0aBcEecab66Aee45393cC5A"
add["MCD_CLIP_PSM_USDC_A"] = "0x66609b4799fd7cE12BA799AD01094aBD13d5014D"
add["MCD_CLIP_CALC_PSM_USDC_A"] = "0xbeE028b5Fa9eb0aDAC5eeF7E5B13383172b91A4E"

add["GOV_MULTISIG"] = "0x73f09254a81e1F835Ee442d1b3262c1f1d7A13ff"
add["GOV_MULTISIG_2"] = "0x01D26f8c5cC009868A4BF66E268c17B057fF7A73"
add["RISK_MULTISIG"] = "0xd98ef20520048a35EdA9A202137847A62120d2d9"
add["RWF_MULTISIG"] = "0x9e1585d9CA64243CE43D42f7dD7333190F66Ca09"
add["GRO_MULTISIG"] = "0x7800C137A645c07132886539217ce192b9F0528e"
add["CP_MULTISIG"] = "0x6A0Ce7dBb43Fe537E3Fd0Be12dc1882393895237"
add["CP_MULTISIG_2"] = "0xDCAF2C84e1154c8DdD3203880e5db965bfF09B60"
add["SES_AUDITORS_MULTISIG"] = "0x87AcDD9208f73bFc9207e1f6F0fDE906bcA95cc6"
add["SES_PERMANENT_TEAM_MULTISIG"] = "0xb5eB779cE300024EDB3dF9b6C007E312584f6F4f"
add["SES_INCUBATION_PROGRAM_MULTISIG"] = "0x7c09Ff9b59BAAebfd721cbDA3676826aA6d7BaE8"
add["SES_GRANTS_PROGRAM_MULTISIG"] = "0xf95eB8eC63D6059bA62b0A8A7F843c7D92f41de2"
add["PE_MULTISIG"] = "0xe2c16c308b843eD02B09156388Cb240cEd58C01c"
add["ORA_MULTISIG"] = "0x2d09B7b95f3F312ba6dDfB77bA6971786c5b50Cf"
add["ORA_ER_MULTISIG"] = "0x53CCAA8E3beF14254041500aCC3f1D4edb5B6D24"
// MakerDAO Shop

add["MEDIAN_ETH"] = "0x64de91f5a373cd4c28de3600cb34c7c6ce410c85"
add["MEDIAN_BAT"] = "0x18B4633D6E39870f398597f3c1bA8c4A41294966"
//add["MEDIAN_USDC
add["MEDIAN_WBTC"] = "0xe0F30cb149fAADC7247E953746Be9BbBB6B5751f"
//add["MEDIAN_TUSD
add["MEDIAN_ZRX"] = "0x956ecD6a9A9A0d84e8eB4e6BaaC09329E202E55e"
add["MEDIAN_KNC"] = "0x83076a2F42dc1925537165045c9FDe9A4B71AD97"
add["MEDIAN_MANA"] = "0x681c4F8f69cF68852BAd092086ffEaB31F5B812c"
add["MEDIAN_USDT"] = "0x56D4bBF358D7790579b55eA6Af3f605BcA2c0C3A"
//add["MEDIAN_PAXUSD
add["MEDIAN_COMP"] = "0xA3421Be733125405Ea20aA853839D34b364eB524"
add["MEDIAN_LRC"] = "0xcCe92282d9fe310F4c232b0DA9926d5F24611C7B"
add["MEDIAN_LINK"] = "0xbAd4212d73561B240f10C56F27e6D9608963f17b"
add["MEDIAN_BAL"] = "0x1D36d59e5a22cB51B30Bb6fA73b62D73f4A11745"
add["MEDIAN_YFI"] = "0x89AC26C0aFCB28EC55B6CD2F6b7DAD867Fa24639"
//add["MEDIAN_GUSD
add["MEDIAN_UNI"] = "0x52f761908cC27B4D77AD7A329463cf08baf62153"
add["MEDIAN_RENBTC"] = "0xe0F30cb149fAADC7247E953746Be9BbBB6B5751f"
add["MEDIAN_AAVE"] = "0xe62872DFEbd323b03D27946f8e2491B454a69811"
add["MEDIAN_UNIV2DAIETH"] = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"
add["MEDIAN_UNIV2WBTCETH"] = "0xBb2b8038a1640196FbE3e38816F3e67Cba72D940"
add["MEDIAN_UNIV2USDCETH"] = "0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc"
add["MEDIAN_UNIV2DAIUSDC"] = "0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5"
add["MEDIAN_UNIV2ETHUSDT"] = "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852"
add["MEDIAN_UNIV2LINKETH"] = "0xa2107FA5B38d9bbd2C461D6EDf11B11A50F6b974"
add["MEDIAN_UNIV2UNIETH"] = "0xd3d2E2692501A5c9Ca623199D38826e513033a17"
add["MEDIAN_UNIV2WBTCDAI"] = "0x231B7589426Ffe1b75405526fC32aC09D44364c4"
add["MEDIAN_UNIV2AAVEETH"] = "0xDFC14d2Af169B0D36C4EFF567Ada9b2E0CAE044f"
add["MEDIAN_UNIV2DAIUSDT"] = "0xB20bd5D04BE54f870D5C0d3cA85d82b34B836405"
//add["MEDIAN_RWA001
//add["MEDIAN_RWA002

// "RWA003-A: Centrifuge: ConsolFreight"
add["RWA003"] = "0x07F0A80aD7AeB7BfB7f139EA71B3C8f7E17156B9"
add["RWA003_OPERATOR"] = "0x2A9798c6F165B6D60Cfb923Fe5BFD6f338695D9B"
add["PIP_RWA003"] = "waiting for DSValue init"
add["MCD_JOIN_RWA003_A"] = "0x1Fe789BBac5b141bdD795A3Bc5E12Af29dDB4b86"
add["RWA003_A_URN"] = "0x7bF825718e7C388c3be16CFe9982539A7455540F"
add["RWA003_A_INPUT_CONDUIT"] = "0x2A9798c6F165B6D60Cfb923Fe5BFD6f338695D9B"
add["RWA003_A_OUTPUT_CONDUIT"] = "0x2A9798c6F165B6D60Cfb923Fe5BFD6f338695D9B"

// "RWA004-A: Centrifuge: Harbor Trade Credit"
add["RWA004"] = "0x873F2101047A62F84456E3B2B13df2287925D3F9"
add["RWA004_OPERATOR"] = "0xe1ed3F588A98bF8a3744f4BF74Fd8540e81AdE3f"
add["PIP_RWA004"] = "waiting for DSValue init"
add["MCD_JOIN_RWA004_A"] = "0xD50a8e9369140539D1c2D113c4dC1e659c6242eB"
add["RWA004_A_URN"] = "0xeF1699548717aa4Cf47aD738316280b56814C821"
add["RWA004_A_INPUT_CONDUIT"] = "0xe1ed3F588A98bF8a3744f4BF74Fd8540e81AdE3f"
add["RWA004_A_OUTPUT_CONDUIT"] = "0xe1ed3F588A98bF8a3744f4BF74Fd8540e81AdE3f"

// "RWA005-A: Centrifuge: Fortunafi"
add["RWA005"] = "0x6DB236515E90fC831D146f5829407746EDdc5296"
add["RWA005_OPERATOR"] = "0x5b702e1fEF3F556cbe219eE697D7f170A236cc66"
add["PIP_RWA005"] = "waiting for DSValue init"
add["MCD_JOIN_RWA005_A"] = "0xA4fD373b93aD8e054970A3d6cd4Fd4C31D08192e"
add["RWA005_A_URN"] = "0xc40907545C57dB30F01a1c2acB242C7c7ACB2B90"
add["RWA005_A_INPUT_CONDUIT"] = "0x5b702e1fEF3F556cbe219eE697D7f170A236cc66"
add["RWA005_A_OUTPUT_CONDUIT"] = "0x5b702e1fEF3F556cbe219eE697D7f170A236cc66"

// "RWA006-A: Centrifuge: Alternative Equity Advisers"
add["RWA006"] = "0x4EE03cfBF6E784c462839f5954d60f7C2B60b113"
add["RWA006_OPERATOR"] = "0x8Fe38D1E4293181273E2e323e4c16e0D1d4861e3"
add["PIP_RWA006"] = "waiting for DSValue init"
add["MCD_JOIN_RWA006_A"] = "0x5E11E34b6745FeBa9449Ae53c185413d6EdC66BE"
add["RWA006_A_URN"] = "0x0C185bf5388DdfDB288F4D875265d456D18FD9Cb"
add["RWA006_A_INPUT_CONDUIT"] = "0x8Fe38D1E4293181273E2e323e4c16e0D1d4861e3"
add["RWA006_A_OUTPUT_CONDUIT"] = "0x8Fe38D1E4293181273E2e323e4c16e0D1d4861e3"


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
const dog = build(add.MCD_DOG, "Dog")
const spot = build(add.MCD_SPOT, "Spotter")
const autoline = build(add.MCD_IAM_AUTO_LINE, "DssAutoLine")
const flash = build(add.MCD_FLASH, "DssFlash")
const pause = build(add.MCD_PAUSE, "DSPause")
const chief = build(add.CHIEF, "DSChief")
const esm = build(add.MCD_ESM, "ESM")
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
const rwa003 = build(add.RWA003, "ERC20")
const rwa004 = build(add.RWA004, "ERC20")
const rwa005 = build(add.RWA005, "ERC20")
const rwa006 = build(add.RWA006, "ERC20")
const bkr = build(add.BKR, "ERC20")
const psmUsdc = build(add.MCD_PSM_USDC_PSM, "DssPsm")
const dai = build(add.MCD_DAI, "Dai")
const mkr = build(add.MCD_GOV, "DSToken")
const chai = build(add.CHAI, "Chai")
const manager = build(add.CDP_MANAGER, "DssCdpManager")
const clip = build(add.MCD_CLIP_ETH_A, "Clipper"); // FIXME are these all the same now?
// NOTE one calc instance is shared between all ilks though each ilk has its own calc contract
const calc = build(add.MCD_CLIP_CALC_ETH_A, "StairstepExponentialDecrease");
const flap = build(add.MCD_FLAP, "Flapper");
const flop = build(add.MCD_FLOP, "Flopper");
const usdcPip = build(add.PIP_USDC, "DSValue")
const tusdPip = build(add.PIP_TUSD, "DSValue")
const paxPip = build(add.PIP_PAXUSD, "DSValue")
const usdtPip = build(add.PIP_USDT, "DSValue")
const gusdPip = build(add.PIP_GUSD, "DSValue")
const rwaPip = build(add.PIP_RWA001, "DSValue")
const pip = build(add.PIP_ETH, "OSM")
const univ2Pip = build(add.PIP_UNIV2DAIETH, "UNIV2LPOracle")
const ethAIlkBytes = utils.formatBytes32String("ETH-A");
const ethBIlkBytes = utils.formatBytes32String("ETH-B");
const ethCIlkBytes = utils.formatBytes32String("ETH-C");
const batIlkBytes = utils.formatBytes32String("BAT-A")
const usdcAIlkBytes = utils.formatBytes32String("USDC-A")
const usdcBIlkBytes = utils.formatBytes32String("USDC-B")
const tusdAIlkBytes = utils.formatBytes32String("TUSD-A")
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
const psmusdcAIlkBytes = utils.formatBytes32String("PSM-USDC-A");
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
const rwa003AIlkBytes = utils.formatBytes32String("RWA003-A");
const rwa004AIlkBytes = utils.formatBytes32String("RWA004-A");
const rwa005AIlkBytes = utils.formatBytes32String("RWA005-A");
const rwa006AIlkBytes = utils.formatBytes32String("RWA006-A");
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
      [add.MCD_VAT, vat.interface.encodeFunctionData('Line', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('debt', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('hump', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('sump', [])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('totalSupply', [])],

      [add.MCD_GOV, mkr.interface.encodeFunctionData('balanceOf', [add.GEM_PIT])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.UNISWAP_DAI])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.OASIS_DEX])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.BALANCER_V2])],
      [add.MCD_DAI, dai.interface.encodeFunctionData('balanceOf', [add.OPTIMISTIC_L1ESCROW])],

      [add.MCD_POT, pot.interface.encodeFunctionData('Pie', [])], // 10
      [add.MCD_POT, pot.interface.encodeFunctionData('chi', [])],
      [add.MCD_POT, pot.interface.encodeFunctionData('rho', [])],
      [add.CDP_MANAGER, manager.interface.encodeFunctionData('cdpi', [])], // 13
      [add.MCD_JUG, jug.interface.encodeFunctionData('base', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('dai', [add.MCD_VOW])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('sin', [add.MCD_VOW])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('Sin', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('Ash', [])], // 18

      [add.MCD_POT, pot.interface.encodeFunctionData('dsr', [])],
      [add.CHAI, chai.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_GOV, mkr.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('vice', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('bump', [])], // 23

      [add.MCD_FLAP, flap.interface.encodeFunctionData('beg', [])],
      [add.MCD_FLAP, flap.interface.encodeFunctionData('ttl', [])],
      [add.MCD_FLAP, flap.interface.encodeFunctionData('tau', [])],
      [add.MCD_FLAP, flap.interface.encodeFunctionData('kicks', [])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('beg', [])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('pad', [])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('ttl', [])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('tau', [])],
      [add.MCD_FLOP, flop.interface.encodeFunctionData('kicks', [])],
      [add.MCD_VOW, vow.interface.encodeFunctionData('dump', [])], // 33

      [add.MCD_PSM_USDC_PSM, psmUsdc.interface.encodeFunctionData('tin', [])], // 34
      [add.MCD_PSM_USDC_PSM, psmUsdc.interface.encodeFunctionData('tout', [])],
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [psmusdcAIlkBytes])],
      [add.USDC, usdc.interface.encodeFunctionData('balanceOf', [add.MCD_JOIN_USDC_PSM_A])], // 37
      [add.MCD_CLIP_PSM_USDC_A, clip.interface.encodeFunctionData('kicks', [])],
      [add.MCD_DOG, dog.interface.encodeFunctionData('ilks', [psmusdcAIlkBytes])],
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [psmusdcAIlkBytes])], // 40
      [add.PIP_USDC, usdcPip.interface.encodeFunctionData('read', [])],
      [add.USDC, usdc.interface.encodeFunctionData('totalSupply', [])], // 42

      [add.MCD_GOV, mkr.interface.encodeFunctionData('balanceOf', [add.MCD_PAUSE_PROXY])],
      [add.BKR, bkr.interface.encodeFunctionData('totalSupply', [])],
      [add.MCD_GOV, mkr.interface.encodeFunctionData('balanceOf', [add.BKR])],
      [add.MCD_DOG, dog.interface.encodeFunctionData('Hole', [])],
      [add.MCD_DOG, dog.interface.encodeFunctionData('Dirt', [])], // 57

      [add.MCD_FLASH, flash.interface.encodeFunctionData('max', [])], // 58
      [add.MCD_FLASH, flash.interface.encodeFunctionData('toll', [])],
      [add.MCD_PAUSE, pause.interface.encodeFunctionData('delay', [])],
      [add.CHIEF, chief.interface.encodeFunctionData('hat', [])],
      [add.MCD_ESM, esm.interface.encodeFunctionData('min', [])],
      [add.MCD_ESM, esm.interface.encodeFunctionData('Sum', [])], // 63

      [add.MCD_CLIP_PSM_USDC_A, clip.interface.encodeFunctionData('buf', [])], // 64
      [add.MCD_CLIP_PSM_USDC_A, clip.interface.encodeFunctionData('tail', [])],
      [add.MCD_CLIP_PSM_USDC_A, clip.interface.encodeFunctionData('cusp', [])],
      [add.MCD_CLIP_PSM_USDC_A, clip.interface.encodeFunctionData('chip', [])],
      [add.MCD_CLIP_PSM_USDC_A, clip.interface.encodeFunctionData('tip', [])],
      [add.MCD_CLIP_PSM_USDC_A, clip.interface.encodeFunctionData('count', [])],
      [add.MCD_CLIP_CALC_PSM_USDC_A, calc.interface.encodeFunctionData('cut', [])],
      [add.MCD_CLIP_CALC_PSM_USDC_A, calc.interface.encodeFunctionData('step', [])], // 71

    ].concat(this.getIlkCall(ethAIlkBytes, 'ETH_A', weth, add.ETH, add.PIP_ETH))
     .concat(this.getIlkCall(batIlkBytes, 'BAT_A', bat, add.BAT, add.PIP_BAT))
     .concat(this.getIlkCall(usdcAIlkBytes, 'USDC_A', usdc, add.USDC, add.PIP_USDC))
     .concat(this.getIlkCall(wbtcIlkBytes, 'WBTC_A', wbtc, add.WBTC, add.PIP_WBTC))
     .concat(this.getIlkCall(usdcBIlkBytes, 'USDC_B', usdc, add.USDC, add.PIP_USDC))
     .concat(this.getIlkCall(tusdAIlkBytes, 'TUSD_A', tusd, add.TUSD, add.PIP_TUSD))
     .concat(this.getIlkCall(kncAIlkBytes, 'KNC_A', knc, add.KNC, add.PIP_KNC))
     .concat(this.getIlkCall(zrxAIlkBytes, 'ZRX_A', zrx, add.ZRX, add.PIP_ZRX))
     .concat(this.getIlkCall(manaAIlkBytes, 'MANA_A', mana, add.MANA, add.PIP_MANA))
     .concat(this.getIlkCall(paxAIlkBytes, 'PAXUSD_A', pax, add.PAXUSD, add.PIP_PAXUSD))
     .concat(this.getIlkCall(usdtAIlkBytes, 'USDT_A', usdt, add.USDT, add.PIP_USDT))
     .concat(this.getIlkCall(compAIlkBytes, 'COMP_A', comp, add.COMP, add.PIP_COMP))
     .concat(this.getIlkCall(lrcAIlkBytes, 'LRC_A', lrc, add.LRC, add.PIP_LRC))
     .concat(this.getIlkCall(linkAIlkBytes, 'LINK_A', link, add.LINK, add.PIP_LINK))
     .concat(this.getIlkCall(ethBIlkBytes, 'ETH_B', weth, add.ETH, add.PIP_ETH))
     .concat(this.getIlkCall(balAIlkBytes, 'BAL_A', bal, add.BAL, add.PIP_BAL))
     .concat(this.getIlkCall(yfiAIlkBytes, 'YFI_A', yfi, add.YFI, add.PIP_YFI))
     .concat(this.getIlkCall(gusdAIlkBytes, 'GUSD_A', gusd, add.GUSD, add.PIP_GUSD))
     .concat(this.getIlkCall(uniAIlkBytes, 'UNI_A', uni, add.UNI, add.PIP_UNI))
     .concat(this.getIlkCall(renbtcAIlkBytes, 'RENBTC_A', renbtc, add.RENBTC, add.PIP_WBTC))
     .concat(this.getIlkCall(aaveAIlkBytes, 'AAVE_A', aave, add.AAVE, add.PIP_AAVE))
     .concat(this.getIlkCall(univ2daiethAIlkBytes, 'UNIV2DAIETH_A', univ2daieth, add.UNIV2DAIETH, add.PIP_UNIV2DAIETH))
     .concat(this.getIlkCall(univ2wbtcethAIlkBytes, 'UNIV2WBTCETH_A', univ2wbtceth, add.UNIV2WBTCETH, add.PIP_UNIV2WBTCETH))
     .concat(this.getIlkCall(univ2usdcethAIlkBytes, 'UNIV2USDCETH_A', univ2usdceth, add.UNIV2USDCETH, add.PIP_UNIV2USDCETH))
     .concat(this.getIlkCall(univ2daiusdcAIlkBytes, 'UNIV2DAIUSDC_A', univ2daiusdc, add.UNIV2DAIUSDC, add.PIP_UNIV2DAIUSDC))
     .concat(this.getIlkCall(univ2ethusdtAIlkBytes, 'UNIV2ETHUSDT_A', univ2ethusdt, add.UNIV2ETHUSDT, add.PIP_UNIV2ETHUSDT))
     .concat(this.getIlkCall(univ2linkethAIlkBytes, 'UNIV2LINKETH_A', univ2linketh, add.UNIV2LINKETH, add.PIP_UNIV2LINKETH))
     .concat(this.getIlkCall(univ2uniethAIlkBytes, 'UNIV2UNIETH_A', univ2unieth, add.UNIV2UNIETH, add.PIP_UNIV2UNIETH))
     .concat(this.getIlkCall(univ2wbtcdaiAIlkBytes, 'UNIV2WBTCDAI_A', univ2wbtcdai, add.UNIV2WBTCDAI, add.PIP_UNIV2WBTCDAI))
     .concat(this.getIlkCall(univ2aaveethAIlkBytes, 'UNIV2AAVEETH_A', univ2aaveeth, add.UNIV2AAVEETH, add.PIP_UNIV2AAVEETH))
     .concat(this.getIlkCall(univ2daiusdtAIlkBytes, 'UNIV2DAIUSDT_A', univ2daiusdt, add.UNIV2DAIUSDT, add.PIP_UNIV2DAIUSDT))
     .concat(this.getIlkCall(ethCIlkBytes, 'ETH_C', weth, add.ETH, add.PIP_ETH))
     .concat(this.getRwaIlkCall(rwa001AIlkBytes, 'RWA001_A', rwa001, add.RWA001, add.PIP_RWA001))
     .concat(this.getRwaIlkCall(rwa002AIlkBytes, 'RWA002_A', rwa002, add.RWA002, add.PIP_RWA002))
//     .concat(this.getRwaIlkCall(rwa003AIlkBytes, 'RWA003_A', rwa003, add.RWA003, add.PIP_RWA003))
//     .concat(this.getRwaIlkCall(rwa004AIlkBytes, 'RWA004_A', rwa004, add.RWA004, add.PIP_RWA004))
//     .concat(this.getRwaIlkCall(rwa005AIlkBytes, 'RWA005_A', rwa005, add.RWA005, add.PIP_RWA005))
//     .concat(this.getRwaIlkCall(rwa006AIlkBytes, 'RWA006_A', rwa006, add.RWA006, add.PIP_RWA006))
     ,{blockTag: blockNumber})
    let promises = [
      p1,
      this.etherscanEthSupply(),
      this.getPrice(add.PIP_ETH, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_ETH, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_BAT, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_BAT, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_WBTC, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_WBTC, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_KNC, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_KNC, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_ZRX, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_ZRX, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_MANA, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_MANA, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_USDT, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_USDT, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_COMP, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_COMP, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_LRC, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_LRC, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_LINK, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_LINK, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_BAL, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_BAL, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_YFI, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_YFI, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_UNI, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_UNI, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_AAVE, this.POSITION_NXT),
      this.getPrice(add.MEDIAN_AAVE, this.POSITION_MEDIAN_VAL),
      this.getPrice(add.PIP_UNIV2DAIETH, this.POSITION_UNIV2_NXT),
      //this.getPrice(add.MEDIAN_UNIV2DAIETH, this.POSITION_UNIV2_NXT),
      this.getPrice(add.PIP_UNIV2WBTCETH, this.POSITION_UNIV2_NXT),
      //this.getPrice(add.MEDIAN_UNIV2WBTCETH, this.POSITION_UNIV2_NXT),
      this.getPrice(add.PIP_UNIV2USDCETH, this.POSITION_UNIV2_NXT),
      //this.getPrice(add.MEDIAN_UNIV2USDCETH, this.POSITION_UNIV2_NXT),
      this.getPrice(add.PIP_UNIV2DAIUSDC, this.POSITION_UNIV2_NXT),
      //this.getPrice(add.MEDIAN_UNIV2DAIUSDC, this.POSITION_UNIV2_NXT),
      this.getPrice(add.PIP_UNIV2ETHUSDT, this.POSITION_UNIV2_NXT),
      //this.getPrice(add.MEDIAN_UNIV2ETHUSDT, this.POSITION_UNIV2_NXT),
      this.getPrice(add.PIP_UNIV2LINKETH, this.POSITION_UNIV2_NXT),
      //this.getPrice(add.MEDIAN_UNIV2LINKETH, this.POSITION_UNIV2_NXT),
      this.getPrice(add.PIP_UNIV2UNIETH, this.POSITION_UNIV2_NXT),
      //this.getPrice(add.MEDIAN_UNIV2UNIETH, this.POSITION_UNIV2_NXT),
      this.getPrice(add.PIP_UNIV2WBTCDAI, this.POSITION_UNIV2_NXT),
      //this.getPrice(add.MEDIAN_UNIV2WBTCDAI, this.POSITION_UNIV2_NXT),
      this.getPrice(add.PIP_UNIV2AAVEETH, this.POSITION_UNIV2_NXT),
      //this.getPrice(add.MEDIAN_UNIV2AAVEETH, this.POSITION_UNIV2_NXT),
      this.getPrice(add.PIP_UNIV2DAIUSDT, this.POSITION_UNIV2_NXT),
      //this.getPrice(add.MEDIAN_UNIV2DAIUSDT, this.POSITION_UNIV2_NXT),
      this.getHistoricalDebt({ blockInterval: 5700 /* ≈ 1 day */, periods: 240 /* 8 months */ }),
    ]

    let [[block, res], ethSupply, ethPriceNxt, ethPriceMedian, batPriceNxt, batPriceMedian,
        wbtcPriceNxt, wbtcPriceMedian, kncPriceNxt, kncPriceMedian, zrxPriceNxt, zrxPriceMedian,
        manaPriceNxt, manaPriceMedian, usdtPriceNxt, usdtPriceMedian, compPriceNxt, compPriceMedian,
        lrcPriceNxt, lrcPriceMedian, linkPriceNxt, linkPriceMedian, balPriceNxt, balPriceMedian,
        yfiPriceNxt, yfiPriceMedian, uniPriceNxt, uniPriceMedian, aavePriceNxt, aavePriceMedian,
        univ2daiethPriceNxt, univ2wbtcethPriceNxt, univ2usdcethPriceNxt, univ2daiusdcPriceNxt,
        univ2ethusdtPriceNxt, univ2linkethPriceNxt, univ2uniethPriceNxt, univ2wbtcdaiPriceNxt,
        univ2aaveethPriceNxt, univ2daiusdtPriceNxt,
        historicalDebt] = await Promise.all(promises)

    var offset = 0;

    const line = res[offset++] // vat.interface.decodeFunctionResult('Line', res[0])
    const debt = res[offset++] //vat.interface.decodeFunctionResult('debt', res[1])
    const surplusBuffer = vow.interface.decodeFunctionResult('hump', res[offset++])[0]
    const debtSize = vow.interface.decodeFunctionResult('sump', res[offset++])[0]
    const daiSupply = dai.interface.decodeFunctionResult('totalSupply', res[offset++])[0]

    const gemPit = mkr.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const uniswapDai = dai.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const oasisDexDai = dai.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const balancerV2Dai = dai.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const optimisticDaiSupply = dai.interface.decodeFunctionResult('balanceOf', res[offset++])[0]

    const savingsPie = pot.interface.decodeFunctionResult('Pie', res[offset++])[0]
    const pieChi = pot.interface.decodeFunctionResult('chi', res[offset++])[0]
    const savingsDai = savingsPie.mul(pieChi);
    const potDrip = pot.interface.decodeFunctionResult('rho', res[offset++])[0]
    const cdps = manager.interface.decodeFunctionResult('cdpi', res[offset++])
    // hack cast to bignumber for "jug.base = 0"
    const base = '0x' + jug.interface.decodeFunctionResult('base', res[offset++])
    const vow_dai = vat.interface.decodeFunctionResult('dai', res[offset++])[0]
    const vow_sin = vat.interface.decodeFunctionResult('sin', res[offset++])[0]
    const sin = vow.interface.decodeFunctionResult('Sin', res[offset++])[0]
    const ash = vow.interface.decodeFunctionResult('Ash', res[offset++])[0]

    const potFee = this.calcFee(pot.interface.decodeFunctionResult('dsr', res[offset++])[0])
    const chaiSupply = chai.interface.decodeFunctionResult('totalSupply', res[offset++])[0]
    const daiBrewing = chaiSupply.mul(pieChi)
    const mkrSupply = mkr.interface.decodeFunctionResult('totalSupply', res[offset++])[0]
    const vice = vat.interface.decodeFunctionResult('vice', res[offset++])[0]
    const surplusBump = vow.interface.decodeFunctionResult('bump', res[offset++])[0]

    const flapBeg = flap.interface.decodeFunctionResult('beg', res[offset++])[0]
    const flapTtl = flap.interface.decodeFunctionResult('ttl', res[offset++])
    const flapTau = flap.interface.decodeFunctionResult('tau', res[offset++])
    const flapKicks = flap.interface.decodeFunctionResult('kicks', res[offset++])[0]
    const flopBeg = flop.interface.decodeFunctionResult('beg', res[offset++])[0]
    const flopPad = flop.interface.decodeFunctionResult('pad', res[offset++])[0]
    const flopTtl = flop.interface.decodeFunctionResult('ttl', res[offset++])
    const flopTau = flop.interface.decodeFunctionResult('tau', res[offset++])
    const flopKicks = flop.interface.decodeFunctionResult('kicks', res[offset++])[0]
    const debtDump = vow.interface.decodeFunctionResult('dump', res[offset++])[0]

    const psmUsdcTin = psmUsdc.interface.decodeFunctionResult('tin', res[offset++])[0]
    const psmUsdcTout = psmUsdc.interface.decodeFunctionResult('tout', res[offset++])[0]
    const psmUsdcAIlk = vat.interface.decodeFunctionResult('ilks', res[offset++])
    const psmUsdcALocked = usdc.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const psmusdcAKicks = clip.interface.decodeFunctionResult('kicks', res[offset++])[0]
    const psmusdcADogIlk = dog.interface.decodeFunctionResult('ilks', res[offset++])
    const psmusdcAAutoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[offset++])
    const usdcPrice = usdcPip.interface.decodeFunctionResult('read', res[offset++])[0]
    const usdcSupply = usdc.interface.decodeFunctionResult('totalSupply', res[offset++])[0]

    const protocolTreasury = mkr.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const bkrSupply = bkr.interface.decodeFunctionResult('totalSupply', res[offset++])[0]
    const mkrBroken = mkr.interface.decodeFunctionResult('balanceOf', res[offset++])[0]
    const hole = dog.interface.decodeFunctionResult('Hole', res[offset++])[0]
    const dirt = dog.interface.decodeFunctionResult('Dirt', res[offset++])[0]

    const flashLine = flash.interface.decodeFunctionResult('max', res[offset++])[0]
    const flashToll = flash.interface.decodeFunctionResult('toll', res[offset++])[0]
    const pauseDelay = pause.interface.decodeFunctionResult('delay', res[offset++])[0]
    const hat = chief.interface.decodeFunctionResult('hat', res[offset++])
    const esmMin = esm.interface.decodeFunctionResult('min', res[offset++])[0]
    const esmSum = esm.interface.decodeFunctionResult('Sum', res[offset++])[0]


    const ILK_CALL_COUNT = 17;
    const ILK_RWA_CALL_COUNT = 5;
    var preMapSectionEnd = offset;
    // remaining 8 calls in PSM-USDC-A map
    offset += 8

    const usdcBN = ethers.BigNumber.from(usdcPrice).mul(DP10)
    const ilks = [
          this.getIlkMap(res, offset, "ETH", "ETH-A", weth, 18, base, ethPriceNxt, ethPriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "BAT", "BAT-A", bat, 18, base, batPriceNxt, batPriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "USDC", "USDC-A", usdc, 6, base, null, null, DP10, DP7),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "WBTC", "WBTC-A", wbtc, 8, base, wbtcPriceNxt, wbtcPriceMedian, DP10, DP8),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "USDC", "USDC-B", usdc, 6, base, null, null, DP10, DP7),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "TUSD", "TUSD-A", tusd, 18, base, null, null, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "KNC", "KNC-A", knc, 18, base, kncPriceNxt, kncPriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "ZRX", "ZRX-A", zrx, 18, base, zrxPriceNxt, zrxPriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "MANA", "MANA-A", mana, 18, base, manaPriceNxt, manaPriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "PAX", "PAX-A", pax, 18, base, null, null, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "USDT", "USDT-A", usdt, 6, base, usdtPriceNxt, usdtPriceMedian, DP10, DP6),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "COMP", "COMP-A", comp, 18, base, compPriceNxt, compPriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "LRC", "LRC-A", lrc, 18, base, lrcPriceNxt, lrcPriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "LINK", "LINK-A", link, 18, base, linkPriceNxt, linkPriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "ETH", "ETH-B", weth, 18, base, ethPriceNxt, ethPriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "BAL", "BAL-A", bal, 18, base, balPriceNxt, balPriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "YFI", "YFI-A", yfi, 18, base, yfiPriceNxt, yfiPriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "GUSD", "GUSD-A", gusd, 2, base, null, null, DP10, DP2),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "UNI", "UNI-A", uni, 18, base, uniPriceNxt, uniPriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "RENBTC", "RENBTC-A", renbtc, 8, base, wbtcPriceNxt, wbtcPriceMedian, DP10, DP8),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "AAVE", "AAVE-A", aave, 18, base, aavePriceNxt, aavePriceMedian, DP10),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "UNIV2DAIETH", "UNIV2DAIETH-A", univ2daieth, 18, base, univ2daiethPriceNxt),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "UNIV2WBTCETH", "UNIV2WBTCETH-A", univ2wbtceth, 18, base, univ2wbtcethPriceNxt),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "UNIV2USDCETH", "UNIV2USDCETH-A", univ2usdceth, 18, base, univ2usdcethPriceNxt),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "UNIV2DAIUSDC", "UNIV2DAIUSDC-A", univ2daiusdc, 18, base, univ2daiusdcPriceNxt),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "UNIV2ETHUSDT", "UNIV2ETHUSDT-A", univ2ethusdt, 18, base, univ2ethusdtPriceNxt),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "UNIV2LINKETH", "UNIV2LINKETH-A", univ2linketh, 18, base, univ2linkethPriceNxt),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "UNIV2UNIETH", "UNIV2UNIETH-A", univ2unieth, 18, base, univ2uniethPriceNxt),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "UNIV2WBTCDAI", "UNIV2WBTCDAI-A", univ2wbtcdai, 18, base, univ2wbtcdaiPriceNxt),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "UNIV2AAVEETH", "UNIV2AAVEETH-A", univ2aaveeth, 18, base, univ2aaveethPriceNxt),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "UNIV2DAIUSDT", "UNIV2DAIUSDT-A", univ2daiusdt, 18, base, univ2daiusdtPriceNxt),
          this.getIlkMap(res, offset += ILK_CALL_COUNT, "ETH", "ETH-C", weth, 18, base, ethPriceNxt, ethPriceMedian, DP10),
          this.getRwaIlkMap(res, offset += ILK_CALL_COUNT, "RWA001", "RWA001-A", rwa001, 18, base), // 606
          this.getRwaIlkMap(res, offset += ILK_RWA_CALL_COUNT, "RWA002", "RWA002-A", rwa002, 18, base), // 611
//          this.getRwaIlkMap(res, offset += ILK_RWA_CALL_COUNT, "RWA003", "RWA003-A", rwa003, 18, base),
//          this.getRwaIlkMap(res, offset += ILK_RWA_CALL_COUNT, "RWA004", "RWA004-A", rwa004, 18, base),
//          this.getRwaIlkMap(res, offset += ILK_RWA_CALL_COUNT, "RWA005", "RWA005-A", rwa005, 18, base),
//          this.getRwaIlkMap(res, offset += ILK_RWA_CALL_COUNT, "RWA006", "RWA006-A", rwa006, 18, base),
          {  // include PSM in CollateralChart
            token: "USDC",
            ilk: "PSM-USDC-A",
            Art: utils.formatUnits(psmUsdcALocked, 6),
            rate: 1,
            line: utils.formatUnits(psmUsdcAIlk.line, 45),
            lineMax: utils.formatUnits(psmusdcAAutoLineIlk.line, 45),
            gap: utils.formatUnits(psmusdcAAutoLineIlk.gap, 45),
            ttl: psmusdcAAutoLineIlk.ttl,
            lastInc: this.unixToDateTime(psmusdcAAutoLineIlk.lastInc),
            chop: utils.formatUnits(psmusdcADogIlk.chop, 18),
            hole: utils.formatUnits(psmusdcADogIlk.hole, 45),
            dirt: utils.formatUnits(psmusdcADogIlk.dirt, 45),
            buf: utils.formatUnits(clip.interface.decodeFunctionResult('buf', res[preMapSectionEnd++])[0], 27), // 57
            tail: clip.interface.decodeFunctionResult('tail', res[preMapSectionEnd++])[0],
            cusp: utils.formatUnits(clip.interface.decodeFunctionResult('cusp', res[preMapSectionEnd++])[0], 27),
            chip: utils.formatUnits(clip.interface.decodeFunctionResult('chip', res[preMapSectionEnd++])[0], 18),
            tip: utils.formatUnits(clip.interface.decodeFunctionResult('tip', res[preMapSectionEnd++])[0], 45),
            count: clip.interface.decodeFunctionResult('count', res[preMapSectionEnd++])[0],
            cut: utils.formatUnits(calc.interface.decodeFunctionResult('cut', res[preMapSectionEnd++])[0], 27),
            step: calc.interface.decodeFunctionResult('step', res[preMapSectionEnd++])[0],
            kicks: psmusdcAKicks.toNumber(),
            tin: utils.formatEther(psmUsdcTin),
            tout: utils.formatEther(psmUsdcTout),
            locked: utils.formatUnits(psmUsdcALocked, 6),
            supply: utils.formatUnits(usdcSupply, 6),
            value: utils.formatUnits(psmUsdcALocked.mul(DP7).mul(usdcBN), 45),
            valueBn: psmUsdcALocked.mul(DP7).mul(usdcBN)
          }
        ]

    const sysLocked = ilks.reduce((t, i) => t.add(i.valueBn), ethers.BigNumber.from('0'))

    // if (parseInt(utils.formatUnits(res[1], 45)) >= 300000000) confetti.rain()

    this.setState(state => {
      return {
        networkId: networkId,
        blockNumber: block.toString(),
        Line: utils.formatUnits(line, 45),
        debt: utils.formatUnits(debt, 45),
        ilks: ilks,
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
        potFee: potFee.toFixed(2),
        savingsPie: utils.formatEther(savingsPie),
        savingsDai: utils.formatUnits(savingsDai, 45),
        potDrip: this.unixToDateTime(potDrip.toNumber()),
        hole: utils.formatUnits(hole, 45),
        dirt: utils.formatUnits(dirt, 45),
        flapBeg: utils.formatUnits(flapBeg, 18),
        flapTtl: flapTtl,
        flapTau: flapTau,
        flapKicks: flapKicks.toNumber(),
        flopBeg: utils.formatUnits(flopBeg, 18),
        flopPad: utils.formatUnits(flopPad, 18),
        flopTtl: flopTtl,
        flopTau: flopTau,
        flopKicks: flopKicks.toNumber(),
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
        flashToll: utils.formatEther(flashToll),
        pauseDelay: pauseDelay.toNumber(),
        hat: hat,
        esmMin: utils.formatEther(esmMin),
        esmSum: utils.formatEther(esmSum),
        optimisticDaiSupply: utils.formatEther(optimisticDaiSupply),
        historicalDebt,
      }
    })
  }

  getIlkCall = (ilkBytes, ilkSuffix, gem, gemAdd, pipAdd) => {
    var pipCall;
    const gemJoinAdd = add['MCD_JOIN_' + ilkSuffix]
    const clipAdd = add['MCD_CLIP_' + ilkSuffix]
    const calcAdd = add['MCD_CLIP_CALC_' + ilkSuffix]
    // use pip.zzz or pip.read depending if dsvalue or osm
    if ([usdc, tusd, pax, gusd].includes(gem)) {
        pipCall = [pipAdd, pip.interface.encodeFunctionData('read', [])]
    } else {
        pipCall = [pipAdd, pip.interface.encodeFunctionData('zzz', [])]
    }
    return [
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [ilkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [ilkBytes])],
      [add.MCD_SPOT, spot.interface.encodeFunctionData('ilks', [ilkBytes])],
      // FIXME only include autoline when needed?
      [add.MCD_IAM_AUTO_LINE, autoline.interface.encodeFunctionData('ilks', [ilkBytes])],
      [add.MCD_DOG, dog.interface.encodeFunctionData('ilks', [ilkBytes])], // 5
      [gemAdd, gem.interface.encodeFunctionData('balanceOf', [gemJoinAdd])],
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

  getIlkMap = (res, idx, token, ilkName, gem, units, base, priceNxt=null, priceMedian=null, medianDp=null, tokenDp=null) => {
    var zzz, price, value, valueBn;
      // variations no autoline USDT
    const ilk = vat.interface.decodeFunctionResult('ilks', res[idx++])
    const jugIlk = jug.interface.decodeFunctionResult('ilks', res[idx++])
    const spotIlk = spot.interface.decodeFunctionResult('ilks', res[idx++])
    const autoLineIlk = autoline.interface.decodeFunctionResult('ilks', res[idx++])
    const dogIlk = dog.interface.decodeFunctionResult('ilks', res[idx++])
    const locked = gem.interface.decodeFunctionResult('balanceOf', res[idx++])[0]
    const supply = gem.interface.decodeFunctionResult('totalSupply', res[idx++])[0]

    if (['USDC', 'TUSD', 'PAX', 'GUSD'].includes(token)) {
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
        Art:  utils.formatEther(ilk.Art),
        rate: utils.formatUnits(ilk.rate, 27),
        spot: utils.formatUnits(ilk.spot, 27),
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

  getRwaIlkCall = (ilkBytes, ilkSuffix, gem, gemAdd, pipAdd) => {
    const gemJoinAdd = add['MCD_JOIN_' + ilkSuffix]
    return [
      [add.MCD_VAT, vat.interface.encodeFunctionData('ilks', [ilkBytes])],
      [add.MCD_JUG, jug.interface.encodeFunctionData('ilks', [ilkBytes])],
      [pipAdd, rwaPip.interface.encodeFunctionData('read', [])],
      [gemAdd, gem.interface.encodeFunctionData('totalSupply', [])],
      [gemAdd, gem.interface.encodeFunctionData('balanceOf', [gemJoinAdd])],
    ]
  }

  getRwaIlkMap = (res, idx, token, ilkName, gem, units, base) => {
    const ilk = vat.interface.decodeFunctionResult('ilks', res[idx++])
    const jugIlk = jug.interface.decodeFunctionResult('ilks', res[idx++])
    const price = rwaPip.interface.decodeFunctionResult('read', res[idx++])[0]
    const supply = gem.interface.decodeFunctionResult('totalSupply', res[idx++])[0]
    const locked = gem.interface.decodeFunctionResult('balanceOf', res[idx++])[0]

    return {
      token: token,
      ilk: ilkName,
      Art:  utils.formatEther(ilk.Art),
      rate: utils.formatUnits(ilk.rate, 27),
      spot: utils.formatUnits(ilk.spot, 27),
      line: utils.formatUnits(ilk.line, 45),
      dust: utils.formatUnits(ilk.dust, 45),
      drip: this.unixToDateTime(jugIlk.rho.toNumber()),
      fee: this.getFee(base, jugIlk),
      locked: utils.formatEther(locked),
      supply: utils.formatEther(supply),
      price: utils.formatEther(price),
      value: utils.formatUnits(locked.mul(ethers.BigNumber.from(price).mul(DP10)), 45),
      valueBn: locked.mul(ethers.BigNumber.from(price).mul(DP10)),
    }
  }

  isLoaded = () => {
    return this.state.blockNumber !== null
  }

  unixToDateTime = stamp => new Date(stamp * 1000).toLocaleDateString("en-US") + " " + new Date(stamp * 1000).toLocaleTimeString("en-US")
  unixToTime = stamp => new Date(stamp * 1000).toLocaleTimeString("en-US")

  calcFee = rate => parseFloat(utils.formatUnits(rate, 27)) ** (60*60*24*365) * 1 - 1;

  getFee = (base, ilk) => {
    const {duty} = ilk;
    const combo = duty.add(base);
    return this.calcFee(combo);
  }

  etherscanEthSupply = async () => {
    const json = await jsonFetch('https://api.etherscan.io/api?action=ethsupply&module=stats&apikey=N5TICDBVG4MHDS7CGPJ9MHXRYC1Y84963N');
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
