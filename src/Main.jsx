import React, { useState, useEffect } from 'react'
import intl from 'react-intl-universal'
import HealButton from './components/HealButton';
import FlapButton from './components/FlapButton';
import BurnButton from './components/BurnButton';
import MeetingTime from './components/MeetingTime'
import './Main.css';
import darkBtn from './img/darth-vader.svg'
import lightBtn from './img/mandalorian.svg'

const formatAmount = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
})

const formatNoDecimals = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 4
})

const formatPercent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const Main = (props) => {
  document.title = `${formatAmount.format(props.debt)} - Dai Stats`
  const sysCollat = props.sysLocked / props.debt
  const [ darkMode, setDarkMode ] = useState(props.darkMode)

  const toggleDarkTheme = () => {
    localStorage.setItem("ds-darkmode", !darkMode)
    setDarkMode(!darkMode)
  };

  const nextFlap = () =>
    formatAmount.format(
      (Number(props.surplusBuffer)
      + Number(props.surplusBump))
      - Number(props.sysSurplus)
    )

  const applyDarkTheme = (isDark) => {
    document.body.style.backgroundColor = isDark ? 'rgb(21, 32, 43)' : 'white'
    document.getElementsByClassName('notification')[0].style.backgroundColor = isDark ? '#018470' : '#00d1b2'
    document.getElementsByTagName('footer')[0].style.backgroundColor = isDark ? '#15202b' : '#fafafa'
    Array.prototype.forEach.call(document.getElementsByClassName('box'),
      function (element) {
        element.style.backgroundColor = isDark ? '#192734' : '#fff'
      }
    )
    Array.prototype.forEach.call(document.getElementsByClassName('title'), function (element) {
      element.style.color = isDark ? '#fff' : '#000'
    })
    Array.prototype.forEach.call(document.getElementsByClassName('subtitle'), function (element) {
      element.style.color = isDark ? '#a0a2af' : '#4a4a4a'
    })
  }

  useEffect(() => {
    applyDarkTheme(darkMode)
  }, [darkMode]);

  return (
    <div>
      <div className="notification is-primary has-text-centered">
        { /* eslint-disable-next-line */ }
        {intl.get('Block')}: <strong>{props.blockNumber}</strong>. {props.paused ? intl.get('Paused')+'.' : intl.get('Auto-updating')+'.'} <a onClick={props.togglePause}>{props.paused ? intl.get('Restart') : intl.get('Pause') }</a>
        <br/>
        {intl.get('USDC_here')}
        {/* <a href="https://www.youtube.com/watch?v=gRBCD5nzBdQ&t=12242s" target="_blank" rel="noopener noreferrer">watch my ETHDenver 2020 talk </a> ;) */}
      </div>
      <section className="section">
        <div className="container">
          <div className="theme-btn">
            <figure className="image is-32x32" onClick={toggleDarkTheme} title={ darkMode ? "Embrace the light side" : "Embrace the dark side"}>
              <img src={darkMode ? lightBtn : darkBtn} alt="Light/Dark mode toggle" />
            </figure>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h4 className="subtitle is-size-4">{intl.get('MKR_Debt_Auction_start')}</h4>
                <h4>
                  <a href="https://blog.makerdao.com/mkr-debt-auction-announcement-and-details/" target="_blank" rel="noopener noreferrer">
                    {intl.get('Read_Maker_blog')}
                  </a>
                </h4>
              </div>
            </div>
          </div>
          <MeetingTime />
          {/* <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title">
                  {formatAmount.format(props.ilks[0].Art * props.ilks[0].rate)} + {formatAmount.format(props.ilks[1].Art * props.ilks[1].rate)} + {formatAmount.format(props.ilks[2].Art)} + {formatAmount.format(props.vice)} = {formatAmount.format(props.debt)}
                </h3>
                <h4 className="subtitle is-size-4">(Dai from ETH + Dai from BAT + Dai from Sai + System Debt) = Total
                  Dai</h4>
                <h4 className="subtitle is-size-3">The Fundamental Equation of Dai</h4>
              </div>
            </div>
          </div> */}
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.debt}>
                  {formatAmount.format(props.debt)}
                </h3>
                <h4 className="subtitle is-size-3">{intl.get('Total_Dai')}</h4>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title">{formatAmount.format(props.saiSupply)}</h3>
                <h4 className="subtitle is-size-3">{intl.get('Total_Sai')}</h4>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3
                  className="title">{formatAmount.format(Number.parseFloat(props.debt) + Number.parseFloat(props.saiSupply))}</h3>
                <h4 className="subtitle is-size-3">Dai + Sai</h4>
              </div>
            </div>
            {/* <div className="column">
              <div className="box has-text-centered">
                <h3 className="title">{formatAmount.format(props.chaiSupply)}</h3>
                <h4 className="subtitle is-size-3">Total Chai</h4>
              </div>
            </div> */}
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title"
                    title={props.ilks[0].Art * props.ilks[0].rate}>{formatAmount.format(props.ilks[0].Art * props.ilks[0].rate)}</h3>
                <p className="subtitle is-size-4">{intl.get('Dai_from_ETH')}
                  ({formatAmount.format(props.ilks[0].Art * props.ilks[0].rate / props.debt * 100)}%)</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title"
                    title={props.ilks[1].Art * props.ilks[1].rate}>{formatAmount.format(props.ilks[1].Art * props.ilks[1].rate)}</h3>
                <p className="subtitle is-size-4">{intl.get('Dai_from_BAT')}
                  ({formatAmount.format(props.ilks[1].Art * props.ilks[1].rate / props.debt * 100)}%)</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[2].Art}>{formatAmount.format(props.ilks[2].Art)}</h3>
                <p className="subtitle is-size-4">{intl.get('Dai_from_Migration')}
                ({formatAmount.format(props.ilks[2].Art * props.ilks[2].rate / props.debt * 100)}%)</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title"
                    title={props.ilks[3].Art * props.ilks[3].rate}>{formatAmount.format(props.ilks[3].Art * props.ilks[3].rate)}</h3>
                <p className="subtitle is-size-4">{intl.get('Dai_from_USDC')}
                  ({formatAmount.format(props.ilks[3].Art * props.ilks[3].rate / props.debt * 100)}%)</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ethLocked}>{formatNoDecimals.format(props.ethLocked)}</h3>
                <p className="title subtitle is-size-4">{intl.get('ETH_Locked')}</p>
                <p className="subtitle is-size-6">{intl.get('ETH_Supply_Locked')}: {formatPercent.format(props.ethLocked / props.ethSupply)}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[0].line}>{formatAmount.format(props.ilks[0].line)}</h3>
                <p className="title subtitle is-size-4">{intl.get('ETH_Ceiling')}</p>
                <p
                  className="subtitle is-size-6">{intl.get('Utilization')}: {formatAmount.format(props.ilks[0].Art * props.ilks[0].rate / props.ilks[0].line * 100)}%</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ethFee}>{props.ethFee}%</h3>
                <p className="title subtitle is-size-4">{intl.get('ETH_Stability_Fee')}</p>
                <p className="subtitle is-size-6">{intl.get('Last_Drip')}: {props.jugEthDrip}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.batLocked}>{formatNoDecimals.format(props.batLocked)}</h3>
                <p className="title subtitle is-size-4">{intl.get('BAT_Locked')}</p>
                <p className="subtitle is-size-6">{intl.get('BAT_Supply_Locked')}: {formatPercent.format(props.batLocked / props.batSupply)}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[1].line}>{formatAmount.format(props.ilks[1].line)}</h3>
                <p className="title subtitle is-size-4">{intl.get('BAT_Ceiling')}</p>
                <p
                  className="subtitle is-size-6">{intl.get('Utilization')}: {formatAmount.format(props.ilks[1].Art * props.ilks[1].rate / props.ilks[1].line * 100)}%</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.batFee}>{props.batFee}%</h3>
                <p className="title subtitle is-size-4">{intl.get('BAT_Stability_Fee')}</p>
                <p className="subtitle is-size-6">{intl.get('Last_Drip')}: {props.jugBatDrip}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.usdcLocked}>{formatNoDecimals.format(props.usdcLocked)}</h3>
                <p className="title subtitle is-size-4">{intl.get('USDC_Locked')}</p>
                <p className="subtitle is-size-6">{intl.get('USDC_Supply_Locked')}: {formatPercent.format(props.usdcLocked / props.usdcSupply)}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[3].line}>{formatAmount.format(props.ilks[3].line)}</h3>
                <p className="title subtitle is-size-4">{intl.get('USDC_Ceiling')}</p>
                <p
                  className="subtitle is-size-6">{intl.get('Utilization')}: {formatAmount.format(props.ilks[3].Art * props.ilks[3].rate / props.ilks[3].line * 100)}%</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.usdcFee}>{props.usdcFee}%</h3>
                <p className="title subtitle is-size-4">{intl.get('USDC_Stability_Fee')}</p>
                <p className="subtitle is-size-6">{intl.get('Last_Drip')}: {props.jugUsdcDrip}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.daiSupply}>{formatAmount.format(props.daiSupply)}</h3>
                <p className="subtitle is-size-4">{intl.get('Dai_ERC20_Supply')} ({formatAmount.format(props.daiSupply / props.debt * 100)}%)</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title">{formatPercent.format(sysCollat)}</h3>
                <p className="title subtitle is-size-4">{intl.get('Collat_Ratio')} </p>
                <p className="subtitle is-size-6">{intl.get('Total_Locked')}: ${formatAmount.format(props.sysLocked)}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.daiPrice}>${formatCurrency.format(props.daiPrice)}</h3>
                <p className="title subtitle is-size-4">{intl.get('Dai_Price')}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ethPrice}>${formatAmount.format(props.ethPrice)}</h3>
                <p className="title subtitle is-size-4">{intl.get('ETH_Price')}</p>
                <p className="subtitle is-size-6">{intl.get('Next_OSM_Price')}: ${formatAmount.format(props.ethPriceNxt)}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.batPrice}>${formatCurrency.format(props.batPrice)}</h3>
                <p className="title subtitle is-size-4">{intl.get('BAT_Price')}</p>
                <p className="subtitle is-size-6">{intl.get('Next_OSM_Price')}: ${formatCurrency.format(props.batPriceNxt)}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.usdcPrice}>${formatCurrency.format(props.usdcPrice)}</h3>
                <p className="title subtitle is-size-4">{intl.get('USDC_Price')}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.mkrPrice}>${formatCurrency.format(props.mkrPrice)}</h3>
                <p className="title subtitle is-size-4">{intl.get('MKR_Price')}</p>
              </div>
            </div>

          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.savingsDai}>{formatAmount.format(props.savingsDai)}</h3>
                <p className="title subtitle is-size-4">{intl.get('Dai_in_DSR')}
                  ({formatAmount.format(props.savingsDai / props.debt * 100)}%)</p>
                <p className="subtitle is-size-6">({intl.get('Pie_in_DSR')}: {formatAmount.format(props.savingsPie)})</p>
              </div>
            </div>

            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.potFee}>{props.potFee}%</h3>
                <p className="title subtitle is-size-4">{intl.get('Dai_Savings_Rate')}</p>
                <p className="subtitle is-size-6">{intl.get('Last_Drip')}: {props.potDrip}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.sysDebt}>{formatAmount.format(props.sysDebt)}</h3>
                <p className="title subtitle is-size-4">{intl.get('Debt_available_to_heal')} (Dai)</p>
                <p className="subtitle is-size-6">{intl.get('Debt_Buffer')}: {formatAmount.format(props.debtSize)}</p>
                {(props.networkId === 1) && <HealButton isDark={darkMode} sysDebtRaw={props.sysDebtRaw}/>}
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.sysSurplus}>{formatAmount.format(props.sysSurplus)}</h3>
                <p className="title subtitle is-size-4">{intl.get('System_Surplus')} (Dai)</p>
                <p className="subtitle is-size-6">{intl.get('Surplus_Buffer')}: {formatAmount.format(props.surplusBuffer)} / {intl.get('Lot')}: {formatAmount.format(props.surplusBump)}</p>
                {(props.networkId === 1) && <FlapButton isDark={darkMode} sysDebt={props.sysDebt} sysSurplus={props.sysSurplus} surplusBump={props.surplusBump} surplusBuffer={props.surplusBuffer}/>}
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.flapKicks}>{formatAmount.format(props.flapKicks)}</h3>
                <p className="title subtitle is-size-4">{intl.get('Dai_Surplus_Flap_Auctions')}</p>
                <p className="subtitle is-size-6">{intl.get('Till_next_Flap_Possible')}: {nextFlap()}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.cdps}>{props.cdps}</h3>
                <p className="subtitle is-size-4">{intl.get('Vaults_Opened')}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ethKicks}>{formatAmount.format(props.ethKicks)}</h3>
                <p className="subtitle is-size-4">{intl.get('ETH_Vault_Auctions')}</p>
                <p className="subtitle is-size-6"></p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.batKicks}>{formatAmount.format(props.batKicks)}</h3>
                <p className="subtitle is-size-4">{intl.get('BAT_Vault_Auctions')}</p>
                <p className="subtitle is-size-6"></p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.flopKicks}>{formatAmount.format(props.flopKicks)}</h3>
                <p className="title subtitle is-size-4">{intl.get('Debt_Flop_Auctions')}</p>
                <p className="subtitle is-size-6">{intl.get('Initial_Lot_Size')}: {formatAmount.format(props.debtDump)} {intl.get('MKR_Initial_Price')}:&#160;${formatAmount.format(props.debtSize / props.debtDump)}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.mkrSupply}>{formatAmount.format(props.mkrSupply)}</h3>
                <p className="subtitle is-size-4">{intl.get('MKR_Supply')}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.gemPit}>{formatAmount.format(props.gemPit)}</h3>
                <p className="subtitle is-size-4">{intl.get('MKR_in_Burner')}</p>
                {(props.networkId === 1 && props.gemPit > 0.01) && <BurnButton gov={props.MCD_GOV} isDark={darkMode}/>}
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.mkrAnnualBurn}>{formatAmount.format(props.mkrAnnualBurn)}</h3>
                <p className="title subtitle is-size-4">{intl.get('Annual_MKR_Burn_Rate')}</p>
                <p className="subtitle is-size-6">${formatAmount.format(props.mkrAnnualBurn * props.mkrPrice)} USD</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.savingsDai}>{formatAmount.format(props.chaiSupply)}</h3>
                <p className="title subtitle is-size-4">{intl.get('Total_Chai')} <span role="img" aria-label="chai">🍵</span></p>
                <p className="subtitle is-size-6">({intl.get('Dai_brewing')}: {formatAmount.format(props.daiBrewing)})</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.uniswapDai}>{formatAmount.format(props.uniswapDai)}</h3>
                <p className="subtitle is-size-4">{intl.get('Dai_in_Uniswap')}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.uniswapMkr}>{formatAmount.format(props.uniswapMkr)}</h3>
                <p className="subtitle is-size-4">MKR in Uniswap</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <a href={`${intl.get('ethscan')}/token/${props.MCD_DAI}`} target="_blank" rel="noopener noreferrer">
                  <h3 className="title"><i className="fal fa-file-code"></i> Dai</h3>
                  <p className="subtitle is-size-7">{props.MCD_DAI}</p>
                </a>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <a href={`${intl.get('ethscan')}/token/${props.BAT}`} target="_blank" rel="noopener noreferrer">
                  <h3 className="title"><i className="fal fa-file-code"></i> BAT</h3>
                  <p className="subtitle is-size-7">{props.BAT}</p>
                </a>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <a href={`${intl.get('ethscan')}/token/${props.USDC}`} target="_blank" rel="noopener noreferrer">
                  <h3 className="title"><i className="fal fa-file-code"></i> USDC</h3>
                  <p className="subtitle is-size-7">{props.USDC}</p>
                </a>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <a href={`${intl.get('ethscan')}/token/${props.MCD_GOV}`} target="_blank" rel="noopener noreferrer">
                  <h3 className="title"><i className="fal fa-file-code"></i> MKR</h3>
                  <p className="subtitle is-size-7">{props.MCD_GOV}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Main
