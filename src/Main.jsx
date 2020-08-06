import React from 'react'
import { useTranslate } from 'react-polyglot';
import Collateral from './components/Collateral';
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
  } else if (Number(price) > Number(priceNxt)) {
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
      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.debt}>
                {formatAmount.format(props.debt)} / {formatAmount.format(props.Line)}
              </h3>
              <h4 className="subtitle is-size-3">{t('daistats.total_token', { token: 'Dai' })}</h4>
            </div>
          </div>
        </div>
        <hr />
        <Collateral {...props} idx="0" token="ETH-A" locked={props.ethLocked} supply={props.ethSupply} fee={props.ethFee} jugDrip={props.jugEthDrip} />
        <Collateral {...props} idx="1" token="BAT-A" locked={props.batLocked} supply={props.batSupply} fee={props.batFee} jugDrip={props.jugBatDrip} />
        <Collateral {...props} idx="2" token="USDC-A" locked={props.usdcLocked} supply={props.usdcSupply} fee={props.usdcFee} jugDrip={props.jugUsdcDrip} />
        <Collateral {...props} idx="3" token="WBTC-A" locked={props.wbtcLocked} supply={props.wbtcSupply} fee={props.wbtcFee} jugDrip={props.jugWbtcDrip} />
        <Collateral {...props} idx="4" token="USDC-B" locked={props.usdcBLocked} supply={props.usdcSupply} fee={props.usdcBFee} jugDrip={props.jugUsdcBDrip} />
        <Collateral {...props} idx="5" token="TUSD-A" locked={props.tusdLocked} supply={props.tusdSupply} fee={props.tusdFee} jugDrip={props.jugTusdDrip} />
        <Collateral {...props} idx="6" token="KNC-A" locked={props.kncALocked} supply={props.kncSupply} fee={props.kncAFee} jugDrip={props.jugKncADrip} />
        <Collateral {...props} idx="7" token="ZRX-A" locked={props.zrxALocked} supply={props.zrxSupply} fee={props.zrxAFee} jugDrip={props.jugZrxADrip} />
        <Collateral {...props} idx="8" token="MANA-A" locked={props.manaALocked} supply={props.manaSupply} fee={props.manaAFee} jugDrip={props.jugManaADrip} />
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.daiSupply}>{formatAmount.format(props.daiSupply)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_supply', { token: 'Dai (ERC20)' })} ({formatAmount.format(props.daiSupply / props.debt * 100)}%)</p>
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
              <h3 className="title" title={props.ethPrice}>${formatTwoDp.format(props.ethPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'ETH' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.ethPrice, props.ethPriceNxt)} title={props.ethPriceNxt}>${formatTwoDp.format(props.ethPriceNxt)}</span>
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
              <h3 className="title" title={props.wbtcPrice}>${formatTwoDp.format(props.wbtcPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'WBTC' })}</p>
              <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
                className={nextPrice(props.wbtcPrice, props.wbtcPriceNxt)} title={props.wbtcPriceNxt}>${formatTwoDp.format(props.wbtcPriceNxt)}</span>
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
              <h3 className="title" title={props.usdcPrice}>${formatCurrency.format(props.usdcPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'USDC' })}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.tusdPrice}>${formatCurrency.format(props.tusdPrice)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'TUSD' })}</p>
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
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'ETH' })}</p>
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
              <h3 className="title" title={props.flopKicks}>{formatAmount.format(props.flopKicks)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.debt_flop_auctions')}</p>
              <p className="subtitle is-size-6">
                {t('daistats.initial_lot_size')}: {formatAmount.format(props.debtDump)} MKR {t('daistats.initial_price')}: ${formatAmount.format(props.debtSize / props.debtDump)}
              </p>
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
              <p className="subtitle is-size-4">{t('daistats.token_in_dex', { token: 'Dai', dex: 'Uniswap' })}</p>
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
        </div>
      </div >
    </div >
  )
}

export default Main
