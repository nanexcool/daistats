import React from 'react'
import { useTranslate } from 'react-polyglot';
import Collateral from './components/Collateral';
import HealButton from './components/HealButton';
import HistoricalDebtChart from './components/HistoricalDebtChart';
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

const formatPercentFee = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 4
})

function nextPrice(price, priceNxt) {
  // hack to ignore small difference when comparing ray with wad
  if (Number(price).toFixed(4) === Number(priceNxt).toFixed(4)) {
    return '';
  } else if (Number(price) > Number(priceNxt)) {
    return 'has-text-danger';
  }
  return 'has-text-success';
}

const Main = (props) => {
  const t = useTranslate()
  document.title = `${formatNoDecimals.format(props.debt)} - Dai Stats`
  //const sysCollat = props.sysLocked / props.debt

  const nextFlap = () =>
    formatAmount.format(
      (Number(props.surplusBuffer)
        + Number(props.surplusBump))
      - Number(props.sysSurplus)
    )

  return (
    <div>
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.debt}>
                {props.debt >= 420000000 && props.debt < 421000000 && <span>🌲</span>} {formatAmount.format(props.debt)} / {formatAmount.format(props.Line)}
              </h3>
              <h4 className="subtitle is-size-3">{t('daistats.total_token', { token: 'Dai' })}</h4>
              <HistoricalDebtChart data={props.historicalDebt} />
            </div>
          </div>
        </div>
        <hr />
        <Collateral {...props} idx="0" token="ETH-A" locked={props.ethLocked} supply={props.ethSupply} fee={props.ethFee} jugDrip={props.jugEthDrip} />
        <Collateral {...props} idx="14" token="ETH-B" locked={props.ethBLocked} supply={props.ethSupply} fee={props.ethBFee} jugDrip={props.jugEthBDrip} />
        <Collateral {...props} idx="1" token="BAT-A" locked={props.batLocked} supply={props.batSupply} fee={props.batFee} jugDrip={props.jugBatDrip} />
        <Collateral {...props} idx="2" token="USDC-A" locked={props.usdcLocked} supply={props.usdcSupply} fee={props.usdcFee} jugDrip={props.jugUsdcDrip} />
        <Collateral {...props} idx="4" token="USDC-B" locked={props.usdcBLocked} supply={props.usdcSupply} fee={props.usdcBFee} jugDrip={props.jugUsdcBDrip} />
        <Collateral {...props} idx="3" token="WBTC-A" locked={props.wbtcLocked} supply={props.wbtcSupply} fee={props.wbtcFee} jugDrip={props.jugWbtcDrip} />
        <Collateral {...props} idx="5" token="TUSD-A" locked={props.tusdLocked} supply={props.tusdSupply} fee={props.tusdFee} jugDrip={props.jugTusdDrip} />
        <Collateral {...props} idx="6" token="KNC-A" locked={props.kncALocked} supply={props.kncSupply} fee={props.kncAFee} jugDrip={props.jugKncADrip} />
        <Collateral {...props} idx="7" token="ZRX-A" locked={props.zrxALocked} supply={props.zrxSupply} fee={props.zrxAFee} jugDrip={props.jugZrxADrip} />
        <Collateral {...props} idx="8" token="MANA-A" locked={props.manaALocked} supply={props.manaSupply} fee={props.manaAFee} jugDrip={props.jugManaADrip} />
        <Collateral {...props} idx="9" token="PAX-A" locked={props.paxALocked} supply={props.paxSupply} fee={props.paxAFee} jugDrip={props.jugPaxADrip} />
        <Collateral {...props} idx="10" token="USDT-A" locked={props.usdtALocked} supply={props.usdtSupply} fee={props.usdtAFee} jugDrip={props.jugUsdtADrip} />
        <Collateral {...props} idx="11" token="COMP-A" locked={props.compALocked} supply={props.compSupply} fee={props.compAFee} jugDrip={props.jugCompADrip} />
        <Collateral {...props} idx="12" token="LRC-A" locked={props.lrcALocked} supply={props.lrcSupply} fee={props.lrcAFee} jugDrip={props.jugLrcADrip} />
        <Collateral {...props} idx="13" token="LINK-A" locked={props.linkALocked} supply={props.linkSupply} fee={props.linkAFee} jugDrip={props.jugLinkADrip} />
        <Collateral {...props} idx="15" token="BAL-A" locked={props.balALocked} supply={props.balSupply} fee={props.balAFee} jugDrip={props.jugBalADrip} />
        <Collateral {...props} idx="16" token="YFI-A" locked={props.yfiALocked} supply={props.yfiSupply} fee={props.yfiAFee} jugDrip={props.jugYfiADrip} />
        <Collateral {...props} idx="17" token="GUSD-A" locked={props.gusdALocked} supply={props.gusdSupply} fee={props.gusdAFee} jugDrip={props.jugGusdADrip} />
        <Collateral {...props} idx="18" token="UNI-A" locked={props.uniALocked} supply={props.uniSupply} fee={props.uniAFee} jugDrip={props.jugUniADrip} />
        <Collateral {...props} idx="19" token="RENBTC-A" locked={props.renbtcALocked} supply={props.renbtcSupply} fee={props.renbtcAFee} jugDrip={props.jugRenbtcADrip} />
        <Collateral {...props} idx="20" token="AAVE-A" locked={props.aaveALocked} supply={props.aaveSupply} fee={props.aaveAFee} jugDrip={props.jugAaveADrip} />
        <Collateral {...props} idx="21" token="UNIV2DAIETH-A" locked={props.univ2daiethALocked} supply={props.univ2daiethSupply} fee={props.univ2daiethAFee} jugDrip={props.jugUniv2daiethADrip} />
        <Collateral {...props} idx="22" token="UNIV2WBTCETH-A" locked={props.univ2wbtcethALocked} supply={props.univ2wbtcethSupply} fee={props.univ2wbtcethAFee} jugDrip={props.jugUniv2wbtcethADrip} showLockedDecimals={true} />
        <Collateral {...props} idx="23" token="UNIV2USDCETH-A" locked={props.univ2usdcethALocked} supply={props.univ2usdcethSupply} fee={props.univ2usdcethAFee} jugDrip={props.jugUniv2usdcethADrip} showLockedDecimals={true} />
        <Collateral {...props} idx="24" token="UNIV2DAIUSDC-A" locked={props.univ2daiusdcALocked} supply={props.univ2daiusdcSupply} fee={props.univ2daiusdcAFee} jugDrip={props.jugUniv2daiusdcADrip} showLockedDecimals={true} />
        <Collateral {...props} idx="25" token="UNIV2ETHUSDT-A" locked={props.univ2ethusdtALocked} supply={props.univ2ethusdtSupply} fee={props.univ2ethusdtAFee} jugDrip={props.jugUniv2ethusdtADrip} showLockedDecimals={true} />

        <div>
          <div className="columns">
          <div className="column is-half">
            <div className="has-text-centered">
              <h3 className="title"
                title={props.psmUsdcALocked}>
                {formatAmount.format(props.psmUsdcALocked)} / {formatAmount.format(props.psmUsdcALine)}
              </h3>
              <p className="title subtitle is-size-4">
                {t('daistats.dai_from_token', { token: 'PSM-USDC-A' })} ({formatAmount.format(props.psmUsdcALocked / props.debt * 100)}%)
                  </p>
              <p
                className="subtitle is-size-6">{t('daistats.utilization')}: {formatAmount.format(props.psmUsdcALocked / props.psmUsdcALine * 100)}%</p>
            </div>
          </div>
          <div className="column">
            <div className="has-text-centered">
              <h3 className="title" title={props.psmUsdcTin}>{formatPercentFee.format(props.psmUsdcTin)}</h3>
              <p className="title subtitle is-size-4">Fee in</p>
              <h3 className="title" title={props.psmUsdcTout}>{formatPercentFee.format(props.psmUsdcTout)}</h3>
              <p className="title subtitle is-size-4">Fee out</p>
            </div>
          </div>
          <div className="column">
            <div className="has-text-centered">
              <h3 className="title" title={props.psmUsdcALocked}>{formatNoDecimals.format(props.psmUsdcALocked)}</h3>
              <p className="title subtitle is-size-4">
                {t('daistats.token_locked', { token: 'USDC' })}
              </p>
              <p className="subtitle is-size-6">
                {t('daistats.token_supply_locked', { token: 'USDC' })}: {formatPercent.format(props.psmUsdcALocked / props.usdcSupply)}</p>
            </div>
          </div>
        </div>
        <hr />

        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.ethPrice}>${formatTwoDp.format(props.ethPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'ETH' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.ethPrice, props.ethPriceNxt)} title={props.ethPriceNxt}>${formatTwoDp.format(props.ethPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.wbtcPrice}>${formatTwoDp.format(props.wbtcPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'BTC' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.wbtcPrice, props.wbtcPriceNxt)} title={props.wbtcPriceNxt}>${formatTwoDp.format(props.wbtcPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.yfiPrice}>${formatTwoDp.format(props.yfiPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'YFI' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.yfiPrice, props.yfiPriceNxt)} title={props.yfiPriceNxt}>${formatTwoDp.format(props.yfiPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.uniPrice}>${formatTwoDp.format(props.uniPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'UNI' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.uniPrice, props.uniPriceNxt)} title={props.uniPriceNxt}>${formatTwoDp.format(props.uniPriceNxt)}</span>
              </p>
            </div>
          </div>
          {/* <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={sysCollat}>{formatPercent.format(sysCollat)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.collat_ratio')}</p>
              <p className="subtitle is-size-6">{t('daistats.total_locked')}: ${formatAmount.format(props.sysLocked)}</p>
            </div>
          </div> */}
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.aavePrice}>${formatTwoDp.format(props.aavePrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'AAVE' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.aavePrice, props.aavePriceNxt)} title={props.aavePriceNxt}>${formatTwoDp.format(props.aavePriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.batPrice}>${formatCurrency.format(props.batPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'BAT' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.batPrice, props.batPriceNxt)} title={props.batPriceNxt}>${formatCurrency.format(props.batPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.balPrice}>${formatTwoDp.format(props.balPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'BAL' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.balPrice, props.balPriceNxt)} title={props.balPriceNxt}>${formatTwoDp.format(props.balPriceNxt)}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.kncPrice}>${formatCurrency.format(props.kncPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'KNC' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.kncPrice, props.kncPriceNxt)} title={props.kncPriceNxt}>${formatCurrency.format(props.kncPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.zrxPrice}>${formatCurrency.format(props.zrxPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'ZRX' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.zrxPrice, props.zrxPriceNxt)} title={props.zrxPriceNxt}>${formatCurrency.format(props.zrxPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.manaPrice}>${formatCurrency.format(props.manaPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'MANA' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.manaPrice, props.manaPriceNxt)} title={props.manaPriceNxt}>${formatCurrency.format(props.manaPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.usdtPrice}>${formatCurrency.format(props.usdtPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'USDT' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.usdtPrice, props.usdtPriceNxt)} title={props.usdtPriceNxt}>${formatCurrency.format(props.usdtPriceNxt)}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2daiethPrice}>${formatTwoDp.format(props.univ2daiethPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'UniV2DaiEth' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.univ2daiethPrice, props.univ2daiethPriceNxt)} title={props.univ2daiethPriceNxt}>${formatTwoDp.format(props.univ2daiethPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2wbtcethPrice}>${formatNoDecimals.format(props.univ2wbtcethPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'UniV2WbtcEth' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.univ2wbtcethPrice, props.univ2wbtcethPriceNxt)} title={props.univ2wbtcethPriceNxt}>${formatNoDecimals.format(props.univ2wbtcethPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2usdcethPrice}>${formatNoDecimals.format(props.univ2usdcethPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'UniV2UsdcEth' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.univ2usdcethPrice, props.univ2usdcethPriceNxt)} title={props.univ2usdcethPriceNxt}>${formatNoDecimals.format(props.univ2usdcethPriceNxt)}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2daiusdcPrice}>${formatNoDecimals.format(props.univ2daiusdcPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'UniV2DaiUsdc' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.univ2daiusdcPrice, props.univ2daiusdcPriceNxt)} title={props.univ2daiusdcPriceNxt}>${formatNoDecimals.format(props.univ2daiusdcPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2ethusdtPrice}>${formatNoDecimals.format(props.univ2ethusdtPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'UniV2EthUsdt' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.univ2ethusdtPrice, props.univ2ethusdtPriceNxt)} title={props.univ2ethusdtPriceNxt}>${formatNoDecimals.format(props.univ2ethusdtPriceNxt)}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.compPrice}>${formatTwoDp.format(props.compPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'COMP' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.compPrice, props.compPriceNxt)} title={props.compPriceNxt}>${formatTwoDp.format(props.compPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.lrcPrice}>${formatCurrency.format(props.lrcPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'LRC' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.lrcPrice, props.lrcPriceNxt)} title={props.lrcPriceNxt}>${formatCurrency.format(props.lrcPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.linkPrice}>${formatTwoDp.format(props.linkPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'LINK' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.linkPrice, props.linkPriceNxt)} title={props.linkPriceNxt}>${formatTwoDp.format(props.linkPriceNxt)}</span>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.tusdPrice}>${formatCurrency.format(props.tusdPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'USDC, TUSD, PAX, GUSD' })}</p>
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
              <h3 className="title" title={props.flapKicks}>{formatAmount.format(props.flapKicks)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.dai_surplus_auctions')}</p>
              <p className="subtitle is-size-6">{t('daistats.till_next_flap')}: {nextFlap()}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.cdps}>{props.cdps}</h3>
              <p className="subtitle is-size-4">{t('daistats.vaults_opened')}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.mkrSupply}>{formatAmount.format(props.mkrSupply)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_supply', { token: 'MKR' })}</p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.flopKicks}>{formatAmount.format(props.flopKicks)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.debt_flop_auctions')}</p>
              <p className="subtitle is-size-6">
                {t('daistats.initial_lot_size')}: {formatAmount.format(props.debtDump)} MKR {t('daistats.initial_price')}: ${formatAmount.format(props.debtSize / props.debtDump)}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={Math.min(props.vow_dai, props.sysDebt)}>{formatAmount.format(Math.min(props.vow_dai, props.sysDebt))}</h3>
              <p className="title subtitle is-size-4">{t('daistats.debt_available_heal')}</p>
              <p className="subtitle is-size-6">{t('daistats.debt_buffer')}: {formatAmount.format(props.debtSize)}</p>
              {(props.networkId === 1) && false && <HealButton sysDebtRaw={props.vow_dai < props.sysDebt ? props.vowDaiRaw : props.sysDebtRaw} />}
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.sysSurplus}>{formatAmount.format(props.sysSurplus)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.system_surplus')}</p>
              <p className="subtitle is-size-6">{t('daistats.surplus_buffer')}: {formatAmount.format(props.surplusBuffer)} / {t('daistats.lot')}: {formatAmount.format(props.surplusBump)}</p>
              {(props.networkId === 1) && false && <FlapButton sysDebt={props.sysDebt} sysSurplus={props.sysSurplus} surplusBump={props.surplusBump} surplusBuffer={props.surplusBuffer} />}
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.ethKicks}>{formatAmount.format(props.ethKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'ETH' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.ethBKicks}>{formatAmount.format(props.ethBKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'ETH-B' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.batKicks}>{formatAmount.format(props.batKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'BAT' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.wbtcKicks}>{formatAmount.format(props.wbtcKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'WBTC' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.kncAKicks}>{formatAmount.format(props.kncAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'KNC' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.zrxAKicks}>{formatAmount.format(props.zrxAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'ZRX' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.manaAKicks}>{formatAmount.format(props.manaAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'MANA' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.usdtAKicks}>{formatAmount.format(props.usdtAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'USDT' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.compAKicks}>{formatAmount.format(props.compAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'COMP' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.lrcAKicks}>{formatAmount.format(props.lrcAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'LRC' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.linkAKicks}>{formatAmount.format(props.linkAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'LINK' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.balAKicks}>{formatAmount.format(props.balAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'BAL' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.yfiKicks}>{formatAmount.format(props.yfiAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'YFI' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.uniKicks}>{formatAmount.format(props.uniAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UNI' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.renbtcKicks}>{formatAmount.format(props.renbtcAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'RENBTC' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.aaveAKicks}>{formatAmount.format(props.aaveAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'AAVE' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2daiethAKicks}>{formatAmount.format(props.univ2daiethAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UniV2DaiEth' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2wbtcethAKicks}>{formatAmount.format(props.univ2wbtcethAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UniV2WbtcEth' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2usdcethAKicks}>{formatAmount.format(props.univ2usdcethAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UniV2UsdcEth' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2daiusdcAKicks}>{formatAmount.format(props.univ2daiusdcAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UniV2DaiUsdc' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2ethusdtAKicks}>{formatAmount.format(props.univ2ethusdtAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UniV2EthUsdt' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.daiSupply}>
                {formatAmount.format(props.daiSupply)}
              </h3>
              <p className="subtitle is-size-4">{
                t('daistats.token_supply', { token: 'Dai (ERC20)' })} ({formatAmount.format(props.daiSupply / props.debt * 100)}%)
              </p>
            </div>
          </div>
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
              <h3 className="title" title={props.chaiSupply}>{formatAmount.format(props.chaiSupply)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_supply', { token: 'Chai' })} <span role="img" aria-label="chai">🍵</span></p>
              <p className="subtitle is-size-6">({t('daistats.dai_brewing')}: {formatAmount.format(props.daiBrewing)})</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.oasisDexDai}>{formatAmount.format(props.oasisDexDai)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_in_dex', { token: 'Dai', dex: 'Oasis Dex' })}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.uniswapDai}>{formatAmount.format(props.uniswapDai)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_in_dex', { token: 'Dai', dex: 'Uniswap V2 (Dai/ETH)' })}</p>
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
        </div>
        <div className="columns">
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
              <a href={`https://etherscan.io/token/${props.KNC}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> KNC</h3>
                <p className="subtitle is-size-7">{props.KNC}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.ZRX}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> ZRX</h3>
                <p className="subtitle is-size-7">{props.ZRX}</p>
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
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.RENBTC}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> renBTC</h3>
                <p className="subtitle is-size-7">{props.RENBTC}</p>
              </a>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.MANA}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> MANA</h3>
                <p className="subtitle is-size-7">{props.MANA}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.PAXUSD}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> PAX</h3>
                <p className="subtitle is-size-7">{props.PAXUSD}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.USDT}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> USDT</h3>
                <p className="subtitle is-size-7">{props.USDT}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.COMP}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> COMP</h3>
                <p className="subtitle is-size-7">{props.COMP}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.LRC}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> LRC</h3>
                <p className="subtitle is-size-7">{props.LRC}</p>
              </a>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.LINK}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> LINK</h3>
                <p className="subtitle is-size-7">{props.LINK}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.BAL}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> BAL</h3>
                <p className="subtitle is-size-7">{props.BAL}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.YFI}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> YFI</h3>
                <p className="subtitle is-size-7">{props.YFI}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.GUSD}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> GUSD</h3>
                <p className="subtitle is-size-7">{props.GUSD}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.UNI}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> UNI</h3>
                <p className="subtitle is-size-7">{props.UNI}</p>
              </a>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.AAVE}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> AAVE</h3>
                <p className="subtitle is-size-7">{props.AAVE}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.UNIV2DAIETH}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> UniV2DaiEth</h3>
                <p className="subtitle is-size-7">{props.UNIV2DAIETH}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.UNIV2WBTCETH}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> UniV2WbtcEth</h3>
                <p className="subtitle is-size-7">{props.UNIV2WBTCETH}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.UNIV2USDCETH}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> UniV2UsdcEth</h3>
                <p className="subtitle is-size-7">{props.UNIV2USDCETH}</p>
              </a>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.UNIV2DAIUSDC}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> UniV2DaiUsdc</h3>
                <p className="subtitle is-size-7">{props.UNIV2DAIUSDC}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.UNIV2ETHUSDT}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> UniV2EthUsdt</h3>
                <p className="subtitle is-size-7">{props.UNIV2ETHUSDT}</p>
              </a>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Main
