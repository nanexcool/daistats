import React, { Component } from 'react'
import eth from './web3';
import Main from './Main'
import daiLogo from './dai.png'
const ethers = require('ethers')
const utils = ethers.utils

const jsonFetch = url => fetch(url).then(res => res.json())

const add = require('./addresses.json')
add["GEM_PIT"] = "0x69076e44a9C70a67D5b79d95795Aba299083c275"
add["UNISWAP_EXCHANGE"] = "0x2a1530c4c41db0b0b2bb646cb5eb1a67b7158667"
add["MULTICALL"] = "0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441"

const build = (address, name) => new ethers.Contract(address, require(`./abi/${name}.json`), eth)

const multi = build(add.MULTICALL, "Multicall")
const vat = build(add.MCD_VAT, "Vat")
const pot = build(add.MCD_POT, "Pot")
const jug = build(add.MCD_JUG, "Jug")
const vow = build(add.MCD_VOW, "Vow")
const cat = build(add.MCD_CAT, "Cat")
const weth = build(add.ETH, "ERC20")
const bat = build(add.BAT, "ERC20")
const sai = build(add.SAI, "ERC20")
const dai = build(add.MCD_DAI, "Dai")
const mkr = build(add.MCD_GOV, "ERC20")
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

class App extends Component {
  state = {
    blockNumber: null
  }

  INTERVAL = 15 * 1000
  POSITION_CUR = 3
  POSITION_NXT = 4

  componentDidMount() {
    this.all()
    setInterval(this.all, this.INTERVAL)
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
    ])
    let p2 = this.etherscanEthSupply()
    let [res, ethSupply] = await Promise.all([p1, p2])
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
    this.setState({
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
    })
  }

  isLoaded = () => {
    return this.state.blockNumber !== null
  }
  calcFee = rate => parseFloat(utils.formatUnits(rate, 27)) ** (60*60*24*365) * 100 - 100;

  getFee = (base, ilk) => {
    const {duty} = ilk;
    const combo = duty.add(base);
    return this.calcFee(combo);
  }

  etherscanEthSupply = async () => {
    const json = await jsonFetch('https://api.etherscan.io/api?action=ethsupply&module=stats&apikey=zomg');
    return json.result;
  }

  getOSMPrice = async (osm, position) => {
      const val = await eth.getStorageAt(osm, position);
      return utils.bigNumberify('0x' + val.substring(34));
  }

  unixToDateTime = stamp => new Date(stamp * 1000).toLocaleDateString("en-US") + " " + new Date(stamp * 1000).toLocaleTimeString("en-US")

  // init = async () => {
  //   const ethPrice = await this.getOSMPrice(add.PIP_ETH, this.POSITION_CUR)
  //   const ethPriceNxt = await this.getOSMPrice(add.PIP_ETH, this.POSITION_NXT)
  //   const batPrice = await this.getOSMPrice(add.PIP_BAT, this.POSITION_CUR)
  //   const batPriceNxt = await this.getOSMPrice(add.PIP_BAT, this.POSITION_NXT)
  //   const saiLocked = await sai.balanceOf(add.MCD_JOIN_SAI)
  //   const gemPit = await mkr.balanceOf(add.GEM_PIT)
  //   const uniswapDai = await dai.balanceOf(add.UNISWAP_EXCHANGE)
  //   const savingsPie = await pot.Pie()
  //   const pieChi = await pot.chi();
  //   const savingsDai = savingsPie.mul(pieChi);
  //   const potDrip = await pot.rho();
  //   const jugEthDrip = await jug.ilks(ethIlkBytes);
  //   const jugBatDrip = await jug.ilks(batIlkBytes);
  //   const cdps = await manager.cdpi();

  //   const sysSurplus = await this.getSurplus();
  //   const sysDebt = await this.getDebt();
  //   const surplusBuffer = await vow.hump();
  //   const debtSize = await vow.sump();
  //   const sysLocked = await ethPrice.mul(ethLocked).add(batPrice.mul(batLocked)).add(saiLocked);

  //   const ethKicks = await ethFlip.kicks();
  //   const batKicks = await batFlip.kicks();
  //   const potFee = await this.getPotFee();
  //   const ethFee = await this.getFee(ethIlkBytes);
  //   const batFee = await this.getFee(batIlkBytes);
  //   const saiFee = await this.getFee(saiIlkBytes);
  //   this.setState({
  //     daiSupply: utils.formatEther(daiSupply),
  //     saiSupply: utils.formatEther(saiSupply),
  //     ethSupply: utils.formatEther(ethSupply),
  //     ethLocked: utils.formatEther(ethLocked),
  //     ethPrice: utils.formatEther(ethPrice),
  //     ethPriceNxt: utils.formatEther(ethPriceNxt),
  //     batSupply: utils.formatEther(batSupply),
  //     batLocked: utils.formatEther(batLocked),
  //     batPrice: utils.formatEther(batPrice),
  //     batPriceNxt: utils.formatEther(batPriceNxt),
  //     saiLocked: utils.formatEther(saiLocked),
  //     sysLocked: utils.formatUnits(sysLocked, 36),
  //     gemPit: utils.formatEther(gemPit),
  //     Line: utils.formatUnits(Line, 45),
  //     debt: utils.formatUnits(debt, 45),
  //     cdps: cdps.toString(),
  //     savingsPie: utils.formatEther(savingsPie),
  //     savingsDai: utils.formatUnits(savingsDai, 45),
  //     uniswapDai: utils.formatEther(uniswapDai),
  //     potDrip: this.unixToDateTime(potDrip.toNumber()),
  //     jugEthDrip: this.unixToDateTime(jugEthDrip.rho.toNumber()),
  //     jugBatDrip: this.unixToDateTime(jugBatDrip.rho.toNumber()),
  //     sysSurplus: utils.formatUnits(sysSurplus, 45),
  //     sysDebt: utils.formatUnits(sysDebt, 45),
  //     surplusBuffer: utils.formatUnits(surplusBuffer, 45),
  //     debtSize: utils.formatUnits(debtSize, 45),
  //     batKicks: batKicks.toNumber(),
  //     ethKicks: ethKicks.toNumber(),
  //     ethFee: ethFee.toFixed(2),
  //     batFee: batFee.toFixed(2),
  //     saiFee: saiFee.toFixed(2),
  //     potFee: potFee.toFixed(2),
  //   })
  // }

  render() {
    if (this.isLoaded()) {
      return (
        <div>
          <Main {...this.state} {...add} interval={this.INTERVAL} />
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
