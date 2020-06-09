import React from 'react'
import { useTranslate } from 'react-polyglot';
import HealButton from './components/HealButton';
import FlapButton from './components/FlapButton';
import MeetingTime from './components/MeetingTime'

const formatAmount = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
})

const formatForWBTC = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 4
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

const formatTwoDp = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const formatPercent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

function nextPrice(price, priceNxt) {
  // hack to ignore small difference when comparing ray with wad
  if (Number(price).toFixed(4) === Number(priceNxt).toFixed(4)) {
    return '';
  } else if (price > priceNxt) {
    return 'has-text-danger';
  }
  return 'has-text-success';
}

const Main = (props) => {
  const t = useTranslate()
  document.title = `${formatNoDecimals.format(props.debt)} - Dai Stats`
  const sysCollat = props.sysLocked / props.debt

  const nextFlap = () =>
    formatAmount.format(
      (Number(props.surplusBuffer)
      + Number(props.surplusBump))
      - Number(props.sysSurplus)
    )

  return (
    <div>
      <section className="section">
        <div className="container">
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
                <h4 className="subtitle is-size-3">{t('daistats.total_token', {token:'Dai'})}</h4>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title"
                    title={props.ilks[0].Art * props.ilks[0].rate}>{formatAmount.format(props.ilks[0].Art * props.ilks[0].rate)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.dai_from_token', {token:'ETH'})}
                </p>
                <p className="subtitle is-size-6">({formatAmount.format(props.ilks[0].Art * props.ilks[0].rate / props.debt * 100)}%)</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title"
                    title={props.ilks[1].Art * props.ilks[1].rate}>{formatAmount.format(props.ilks[1].Art * props.ilks[1].rate)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.dai_from_token', {token:'BAT'})}
                </p>
                <p className="subtitle is-size-6">({formatAmount.format(props.ilks[1].Art * props.ilks[1].rate / props.debt * 100)}%)</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[3].Art}>{formatAmount.format(props.ilks[3].Art)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.dai_from_token', {token:'WBTC'})}
                </p>
                <p className="subtitle is-size-6">({formatAmount.format(props.ilks[3].Art * props.ilks[3].rate / props.debt * 100)}%)</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title"
                    title={props.ilks[2].Art * props.ilks[2].rate}>{formatAmount.format(props.ilks[2].Art * props.ilks[2].rate)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.dai_from_token', {token:'USDC-A'})}
                </p>
                <p className="subtitle is-size-6">({formatAmount.format(props.ilks[2].Art * props.ilks[2].rate / props.debt * 100)}%)</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title"
                    title={props.ilks[4].Art * props.ilks[4].rate}>{formatAmount.format(props.ilks[4].Art * props.ilks[4].rate)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.dai_from_token', {token:'USDC-B'})}
                </p>
                <p className="subtitle is-size-6">({formatAmount.format(props.ilks[4].Art * props.ilks[4].rate / props.debt * 100)}%)</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title"
                    title={props.ilks[5].Art * props.ilks[5].rate}>{formatAmount.format(props.ilks[5].Art * props.ilks[5].rate)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.dai_from_token', {token:'TUSD'})}
                </p>
                <p className="subtitle is-size-6">({formatAmount.format(props.ilks[5].Art * props.ilks[5].rate / props.debt * 100)}%)</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ethLocked}>{formatNoDecimals.format(props.ethLocked)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.token_locked', {token:'ETH'})}
                </p>
                <p className="subtitle is-size-6">
                  {t('daistats.token_supply_locked', {token:'ETH'})}: {formatPercent.format(props.ethLocked / props.ethSupply)}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[0].line}>{formatAmount.format(props.ilks[0].line)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.token_ceiling', {token:'ETH'})}
                </p>
                <p
                  className="subtitle is-size-6">{t('daistats.utilization')}: {formatAmount.format(props.ilks[0].Art * props.ilks[0].rate / props.ilks[0].line * 100)}%</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ethFee}>{props.ethFee}%</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_stability_fee', {token:'ETH'})}</p>
                <p className="subtitle is-size-6">{t('daistats.last_drip')}: {props.jugEthDrip}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.batLocked}>{formatNoDecimals.format(props.batLocked)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.token_locked', {token:'BAT'})}
                </p>
                <p className="subtitle is-size-6">
                  {t('daistats.token_supply_locked', {token:'BAT'})}: {formatPercent.format(props.batLocked / props.batSupply)}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[1].line}>{formatAmount.format(props.ilks[1].line)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.token_ceiling', {token:'BAT'})}
                </p>
                <p
                  className="subtitle is-size-6">{t('daistats.utilization')}: {formatAmount.format(props.ilks[1].Art * props.ilks[1].rate / props.ilks[1].line * 100)}%</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.batFee}>{props.batFee}%</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_stability_fee', {token:'BAT'})}</p>
                <p className="subtitle is-size-6">{t('daistats.last_drip')}: {props.jugBatDrip}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.usdcLocked}>{formatNoDecimals.format(props.usdcLocked)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.token_locked', {token:'USDC-A'})}
                </p>
                <p className="subtitle is-size-6">
                  {t('daistats.token_supply_locked', {token:'USDC'})}: {formatPercent.format(props.usdcLocked / props.usdcSupply)}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[2].line}>{formatAmount.format(props.ilks[2].line)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.token_ceiling', {token:'USDC-A'})}
                </p>
                <p
                  className="subtitle is-size-6">{t('daistats.utilization')}: {formatAmount.format(props.ilks[2].Art * props.ilks[2].rate / props.ilks[2].line * 100)}%</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.usdcFee}>{props.usdcFee}%</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_stability_fee', {token:'USDC-A'})}</p>
                <p className="subtitle is-size-6">{t('daistats.last_drip')}: {props.jugUsdcDrip}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.usdcBLocked}>{formatNoDecimals.format(props.usdcBLocked)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.token_locked', {token:'USDC-B'})}
                </p>
                <p className="subtitle is-size-6">
                  {t('daistats.token_supply_locked', {token:'USDC'})}: {formatPercent.format(props.usdcBLocked / props.usdcSupply)}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[4].line}>{formatAmount.format(props.ilks[4].line)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.token_ceiling', {token:'USDC-B'})}
                </p>
                <p
                  className="subtitle is-size-6">{t('daistats.utilization')}: {formatAmount.format(props.ilks[4].Art * props.ilks[4].rate / props.ilks[4].line * 100)}%</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.usdcBFee}>{props.usdcBFee}%</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_stability_fee', {token:'USDC-B'})}</p>
                <p className="subtitle is-size-6">{t('daistats.last_drip')}: {props.jugUsdcBDrip}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.wbtcLocked}>{formatForWBTC.format(props.wbtcLocked)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.token_locked', {token:'WBTC'})}
                </p>
                <p className="subtitle is-size-6">
                  {t('daistats.token_supply_locked', {token:'WBTC'})}: {formatPercent.format(props.wbtcLocked / props.wbtcSupply)}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[3].line}>{formatAmount.format(props.ilks[3].line)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.token_ceiling', {token:'WBTC'})}
                </p>
                <p
                  className="subtitle is-size-6">{t('daistats.utilization')}: {formatAmount.format(props.ilks[3].Art * props.ilks[3].rate / props.ilks[3].line * 100)}%</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.wbtcFee}>{props.wbtcFee}%</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_stability_fee', {token:'WBTC'})}</p>
                <p className="subtitle is-size-6">{t('daistats.last_drip')}: {props.jugWbtcDrip}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.tusdLocked}>{formatAmount.format(props.tusdLocked)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.token_locked', {token:'TUSD'})}
                </p>
                <p className="subtitle is-size-6">
                  {t('daistats.token_supply_locked', {token:'TUSD'})}: {formatPercent.format(props.tusdLocked / props.tusdSupply)}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[5].line}>{formatAmount.format(props.ilks[5].line)}</h3>
                <p className="title subtitle is-size-4">
                  {t('daistats.token_ceiling', {token:'TUSD'})}
                </p>
                <p
                  className="subtitle is-size-6">{t('daistats.utilization')}: {formatAmount.format(props.ilks[5].Art * props.ilks[5].rate / props.ilks[5].line * 100)}%</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.tusdFee}>{props.tusdFee}%</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_stability_fee', {token:'TUSD'})}</p>
                <p className="subtitle is-size-6">{t('daistats.last_drip')}: {props.jugtusdDrip}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.daiSupply}>{formatAmount.format(props.daiSupply)}</h3>
                <p className="subtitle is-size-4">{t('daistats.token_supply', {token:'Dai (ERC20)'})} ({formatAmount.format(props.daiSupply / props.debt * 100)}%)</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title">{formatPercent.format(sysCollat)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.collat_ratio')}</p>
                <p className="subtitle is-size-6">{t('daistats.total_locked')}: ${formatAmount.format(props.sysLocked)}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.daiPrice}>${formatCurrency.format(props.daiPrice)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_price', {token:'Dai'})}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ethPrice}>${formatTwoDp.format(props.ethPrice)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_price', {token:'ETH'})}</p>
                <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                    className={nextPrice(props.ethPrice, props.ethPriceNxt)} title={props.ethPriceNxt}>${formatTwoDp.format(props.ethPriceNxt)}</span>
                </p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.batPrice}>${formatCurrency.format(props.batPrice)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_price', {token:'BAT'})}</p>
                <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                    className={nextPrice(props.batPrice, props.batPriceNxt)} title={props.batPriceNxt}>${formatCurrency.format(props.batPriceNxt)}</span>
                </p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.usdcPrice}>${formatCurrency.format(props.usdcPrice)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_price', {token:'USDC'})}</p>
                <h3 className="title" title={props.tusdPrice}>${formatCurrency.format(props.tusdPrice)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_price', {token:'TUSD'})}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.wbtcPrice}>${formatTwoDp.format(props.wbtcPrice)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_price', {token:'WBTC'})}</p>
                <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                    className={nextPrice(props.wbtcPrice, props.wbtcPriceNxt)} title={props.wbtcPriceNxt}>${formatTwoDp.format(props.wbtcPriceNxt)}</span>
                </p>
              </div>
            </div>
            {/* <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.mkrPrice}>${formatCurrency.format(props.mkrPrice)}</h3>
                <p className="title subtitle is-size-4">MKR Price</p>
              </div>
            </div> */}

          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.savingsDai}>{formatAmount.format(props.savingsDai)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.dai_in_dsr')}
                  ({formatAmount.format(props.savingsDai / props.debt * 100)}%)</p>
                <p className="subtitle is-size-6">({t('daistats.pie_in_dsr')}: {formatAmount.format(props.savingsPie)})</p>
              </div>
            </div>

            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.potFee}>{props.potFee}%</h3>
                <p className="title subtitle is-size-4">{t('daistats.dai_savings_rate')}</p>
                <p className="subtitle is-size-6">{t('daistats.last_drip')}: {props.potDrip}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" >{formatAmount.format(Math.min(props.vow_dai, props.sysDebt))}</h3>
                <p className="title subtitle is-size-4">{t('daistats.debt_available_heal')}</p>
                <p className="subtitle is-size-6">{t('daistats.debt_buffer')}: {formatAmount.format(props.debtSize)}</p>
                {(props.networkId === 1) && false && <HealButton sysDebtRaw={props.vow_dai < props.sysDebt ? props.vowDaiRaw : props.sysDebtRaw}/>}
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.sysSurplus}>{formatAmount.format(props.sysSurplus)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.system_surplus')}</p>
                <p className="subtitle is-size-6">{t('daistats.surplus_buffer')}: {formatAmount.format(props.surplusBuffer)} / {t('daistats.lot')}: {formatAmount.format(props.surplusBump)}</p>
                {(props.networkId === 1) && false && <FlapButton sysDebt={props.sysDebt} sysSurplus={props.sysSurplus} surplusBump={props.surplusBump} surplusBuffer={props.surplusBuffer}/>}
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.cdps}>{props.cdps}</h3>
                <p className="subtitle is-size-4">{t('daistats.vaults_opened')}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ethKicks}>{formatAmount.format(props.ethKicks)}</h3>
                <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', {token:'ETH'})}</p>
                <p className="subtitle is-size-6"></p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.batKicks}>{formatAmount.format(props.batKicks)}</h3>
                <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', {token:'BAT'})}</p>
                <p className="subtitle is-size-6"></p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.wbtcKicks}>{formatAmount.format(props.wbtcKicks)}</h3>
                <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', {token:'WBTC'})}</p>
                <p className="subtitle is-size-6"></p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.flapKicks}>{formatAmount.format(props.flapKicks)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.dai_surplus_auctions')}</p>
                <p className="subtitle is-size-6">{t('daistats.till_next_flap')}: {nextFlap()}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.flopKicks}>{formatAmount.format(props.flopKicks)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.debt_flop_auctions')}</p>
                <p className="subtitle is-size-6">
                  {t('daistats.initial_lot_size')}: {formatAmount.format(props.debtDump)} MKR {t('daistats.initial_price')}: ${formatAmount.format(props.debtSize / props.debtDump)}
                </p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.mkrSupply}>{formatAmount.format(props.mkrSupply)}</h3>
                <p className="subtitle is-size-4">{t('daistats.token_supply', {token:'MKR'})}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.mkrAnnualBurn}>{formatAmount.format(props.mkrAnnualBurn)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.annual_mkr_burn_rate')}</p>
                <p className="subtitle is-size-6">${formatAmount.format(props.mkrAnnualBurn * props.mkrPrice)} USD</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.savingsDai}>{formatAmount.format(props.chaiSupply)}</h3>
                <p className="title subtitle is-size-4">{t('daistats.token_supply', {token:'Chai'})} <span role="img" aria-label="chai">🍵</span></p>
                <p className="subtitle is-size-6">({t('daistats.dai_brewing')}: {formatAmount.format(props.daiBrewing)})</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.oasisDEXDai}>{formatAmount.format(props.oasisDexDai)}</h3>
                <p className="subtitle is-size-4">{t('daistats.token_in_dex', {token:'Dai',dex:'Oasis Dex'})}</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.uniswapDai}>{formatAmount.format(props.uniswapDai)}</h3>
                <p className="subtitle is-size-4">{t('daistats.token_in_dex', {token:'Dai',dex:'Uniswap'})}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <a href={`https://etherscan.io/token/${props.MCD_DAI}`} target="_blank" rel="noopener noreferrer">
                  <h3 className="title"><i className="fal fa-file-code"></i> Dai</h3>
                  <p className="subtitle is-size-7">{props.MCD_DAI}</p>
                </a>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <a href={`https://etherscan.io/token/${props.BAT}`} target="_blank" rel="noopener noreferrer">
                  <h3 className="title"><i className="fal fa-file-code"></i> BAT</h3>
                  <p className="subtitle is-size-7">{props.BAT}</p>
                </a>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <a href={`https://etherscan.io/token/${props.USDC}`} target="_blank" rel="noopener noreferrer">
                  <h3 className="title"><i className="fal fa-file-code"></i> USDC</h3>
                  <p className="subtitle is-size-7">{props.USDC}</p>
                </a>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <a href={`https://etherscan.io/token/${props.WBTC}`} target="_blank" rel="noopener noreferrer">
                  <h3 className="title"><i className="fal fa-file-code"></i> WBTC</h3>
                  <p className="subtitle is-size-7">{props.WBTC}</p>
                </a>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <a href={`https://etherscan.io/token/${props.TUSD}`} target="_blank" rel="noopener noreferrer">
                  <h3 className="title"><i className="fal fa-file-code"></i> TUSD</h3>
                  <p className="subtitle is-size-7">{props.TUSD}</p>
                </a>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <a href={`https://etherscan.io/token/${props.MCD_GOV}`} target="_blank" rel="noopener noreferrer">
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
