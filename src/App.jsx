import React, { Component } from 'react'
import eth from './web3';
import Main from './Main'
import daiLogo from './dai.png'
const ethers = require('ethers')

const add = require('./addresses.json')
add["GEM_PIT"] = "0x69076e44a9C70a67D5b79d95795Aba299083c275"
add["UNISWAP_EXCHANGE"] = "0x2a1530c4c41db0b0b2bb646cb5eb1a67b7158667"
const build = (address, name) => new ethers.Contract(address, require(`./abi/${name}.json`), eth)

const vat = build(add.MCD_VAT, "Vat")
const pot = build(add.MCD_POT, "Pot")
const vow = build(add.MCD_VOW, "Vow")
const weth = build(add.ETH, "ERC20")
const bat = build(add.BAT, "ERC20")
const sai = build(add.SAI, "ERC20")
const dai = build(add.MCD_DAI, "Dai")
const mkr = build(add.MCD_GOV, "ERC20")
const manager = build(add.CDP_MANAGER, "DssCdpManager")
window.utils = ethers.utils
window.add = add
window.vat = vat

class App extends Component {
  state = {
    savingsDai: null,
    uniswapDai: null,
    daiSupply: null,
    ethLocked: null,
    batLocked: null,
    saiLocked: null,
    gemPit: null,
    Line: null,
    debt: null,
    live: null,
    ilks: null,
    cdps: null
  }

  componentDidMount() {
    this.init()
    setInterval(this.init, 15000)
  }

  isLoaded = () => {
    return this.state.Line !== null &&
      this.state.debt !== null &&
      this.state.ilks !== null
  }

  getSurplus = async () => {
    return await vat.dai(vow.address);
  }

  getDebt = async () => {
      // sub(sub(vat.sin(address(this)), Sin), Ash)
      const sin = await vat.sin(vow.address);
      const bigSin = await vow.Sin();
      const Ash = await vow.Ash();
      console.log(ethers.utils.formatUnits(sin, 45), ethers.utils.formatUnits(bigSin, 45), ethers.utils.formatUnits(Ash, 45));
      return sin.sub(bigSin).sub(Ash);
  }

  init = async () => {
    const Line = await vat.Line()
    const debt = await vat.debt()
    const ethIlk = await vat.ilks(ethers.utils.formatBytes32String("ETH-A"))
    const batIlk = await vat.ilks(ethers.utils.formatBytes32String("BAT-A"))
    const saiIlk = await vat.ilks(ethers.utils.formatBytes32String("SAI"))
    const daiSupply = await dai.totalSupply()
    const ethLocked = await weth.balanceOf(add.MCD_JOIN_ETH_A)
    const batLocked = await bat.balanceOf(add.MCD_JOIN_BAT_A)
    const saiLocked = await sai.balanceOf(add.MCD_JOIN_SAI)
    const gemPit = await mkr.balanceOf(add.GEM_PIT)
    const savingsPie = await pot.Pie()
    const pieChi = await pot.chi();
    const savingsDai = savingsPie.mul(pieChi);
    const uniswapDai = await dai.balanceOf(add.UNISWAP_EXCHANGE)
    const potDrip = await pot.rho();
    const cdps = await manager.cdpi();
    const sysSurplus = await this.getSurplus();
    const sysDebt = await this.getDebt();
    this.setState({
      daiSupply: ethers.utils.formatEther(daiSupply),
      ethLocked: ethers.utils.formatEther(ethLocked),
      batLocked: ethers.utils.formatEther(batLocked),
      saiLocked: ethers.utils.formatEther(saiLocked),
      gemPit: ethers.utils.formatEther(gemPit),
      Line: ethers.utils.formatUnits(Line, 45),
      debt: ethers.utils.formatUnits(debt, 45),
      cdps: cdps.toString(),
      savingsPie: ethers.utils.formatEther(savingsPie),
      savingsDai: ethers.utils.formatUnits(savingsDai, 45),
      uniswapDai: ethers.utils.formatEther(uniswapDai),
      potDrip: new Date(potDrip.toNumber() * 1000).toLocaleDateString("en-US") + " " + new Date(potDrip.toNumber() * 1000).toLocaleTimeString("en-US"),
      sysSurplus: ethers.utils.formatUnits(sysSurplus, 45),
      sysDebt: ethers.utils.formatUnits(sysDebt, 45),
      ilks: [
        {
          Art: ethers.utils.formatEther( ethIlk.Art),
          rate: ethers.utils.formatUnits(ethIlk.rate, 27),
          spot: ethers.utils.formatUnits(ethIlk.spot, 27),
          line: ethers.utils.formatUnits(ethIlk.line, 45),
          dust: ethers.utils.formatUnits(ethIlk.dust, 45)
        },
        {
          Art: ethers.utils.formatEther( batIlk.Art),
          rate: ethers.utils.formatUnits(batIlk.rate, 27),
          spot: ethers.utils.formatUnits(batIlk.spot, 27),
          line: ethers.utils.formatUnits(batIlk.line, 45),
          dust: ethers.utils.formatUnits(batIlk.dust, 45)
        },
        {
          Art: ethers.utils.formatEther( saiIlk.Art),
          rate: ethers.utils.formatUnits(saiIlk.rate, 27),
          spot: ethers.utils.formatUnits(saiIlk.spot, 27),
          line: ethers.utils.formatUnits(saiIlk.line, 45),
          dust: ethers.utils.formatUnits(saiIlk.dust, 45)
        }
      ]
    })
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
