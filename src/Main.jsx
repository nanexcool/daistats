import React from 'react'
import { useTranslate } from 'react-polyglot';
import Collateral from './components/Collateral';
import HistoricalDebtChart from './components/HistoricalDebtChart';
import Pip from './components/Pip'
import CollateralChart from './components/CollateralChart';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useLocation, useHistory } from "react-router-dom";


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

const formatEightDp = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 8,
  maximumFractionDigits: 8
})

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

  // hack till Main component is broken into component per section
  const location = useLocation();
  const history = useHistory();
  const indexToTab = ['/overview', '/collateral', '/oracles', '/auctions', '/ecosystem', '/addresses']
  function tabNameToIndex() {
    let i = indexToTab.indexOf(location.pathname)
    return (i >= 0 ? i : 0)
  }

  return (
    <div>
      <div className="container">
        <Tabs defaultIndex={tabNameToIndex()} onSelect={index => history.push(indexToTab[index])}>
          <TabList>
            <Tab><p className="is-size-5">Overview</p></Tab>
            <Tab><p className="is-size-5">Collateral</p></Tab>
            <Tab><p className="is-size-5">Oracles</p></Tab>
            <Tab><p className="is-size-5">Auctions</p></Tab>
            <Tab><p className="is-size-5">Ecosystem</p></Tab>
            <Tab><p className="is-size-5">Addresses</p></Tab>
          </TabList>

          <TabPanel>
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
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.sysLocked}>{formatAmount.format(props.sysLocked)}</h3>
              <h4 className="subtitle is-size-4">{t('daistats.total_locked')}</h4>
            </div>
          </div>
          {/*<div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={sysCollat}>{formatPercent.format(sysCollat)}</h3>
              <h4 className="title subtitle is-size-4">{t('daistats.collat_ratio')}</h4>
            </div>
          </div>*/}
          <div className="column">
            <div className="box has-text-centered">
              <CollateralChart ilks={props.ilks} debt={props.debt} />
              <h4 className="subtitle is-size-4">Collateral Backing Dai</h4>
            </div>
          </div>
        </div>
          </TabPanel>
          <TabPanel>
        <Collateral {...props} idx="0" locked={props.ethLocked} supply={props.ethSupply} fee={props.ethFee} jugDrip={props.jugEthDrip} />
        <Collateral {...props} idx="14" locked={props.ethBLocked} supply={props.ethSupply} fee={props.ethBFee} jugDrip={props.jugEthBDrip} />
        <Collateral {...props} idx="31" locked={props.ethCLocked} supply={props.ethSupply} fee={props.ethCFee} jugDrip={props.jugEthCDrip} />
        <Collateral {...props} idx="1" locked={props.batLocked} supply={props.batSupply} fee={props.batFee} jugDrip={props.jugBatDrip} />
        <Collateral {...props} idx="2" locked={props.usdcLocked} supply={props.usdcSupply} fee={props.usdcFee} jugDrip={props.jugUsdcDrip} />
        <Collateral {...props} idx="4" locked={props.usdcBLocked} supply={props.usdcSupply} fee={props.usdcBFee} jugDrip={props.jugUsdcBDrip} />
        <Collateral {...props} idx="3" locked={props.wbtcLocked} supply={props.wbtcSupply} fee={props.wbtcFee} jugDrip={props.jugWbtcDrip} />
        <Collateral {...props} idx="5" locked={props.tusdLocked} supply={props.tusdSupply} fee={props.tusdFee} jugDrip={props.jugTusdDrip} />
        <Collateral {...props} idx="6" locked={props.kncALocked} supply={props.kncSupply} fee={props.kncAFee} jugDrip={props.jugKncADrip} />
        <Collateral {...props} idx="7" locked={props.zrxALocked} supply={props.zrxSupply} fee={props.zrxAFee} jugDrip={props.jugZrxADrip} />
        <Collateral {...props} idx="8" locked={props.manaALocked} supply={props.manaSupply} fee={props.manaAFee} jugDrip={props.jugManaADrip} />
        <Collateral {...props} idx="9" locked={props.paxALocked} supply={props.paxSupply} fee={props.paxAFee} jugDrip={props.jugPaxADrip} />
        <Collateral {...props} idx="10" locked={props.usdtALocked} supply={props.usdtSupply} fee={props.usdtAFee} jugDrip={props.jugUsdtADrip} />
        <Collateral {...props} idx="11" locked={props.compALocked} supply={props.compSupply} fee={props.compAFee} jugDrip={props.jugCompADrip} />
        <Collateral {...props} idx="12" locked={props.lrcALocked} supply={props.lrcSupply} fee={props.lrcAFee} jugDrip={props.jugLrcADrip} />
        <Collateral {...props} idx="13" locked={props.linkALocked} supply={props.linkSupply} fee={props.linkAFee} jugDrip={props.jugLinkADrip} />
        <Collateral {...props} idx="15" locked={props.balALocked} supply={props.balSupply} fee={props.balAFee} jugDrip={props.jugBalADrip} />
        <Collateral {...props} idx="16" locked={props.yfiALocked} supply={props.yfiSupply} fee={props.yfiAFee} jugDrip={props.jugYfiADrip} />
        <Collateral {...props} idx="17" locked={props.gusdALocked} supply={props.gusdSupply} fee={props.gusdAFee} jugDrip={props.jugGusdADrip} />
        <Collateral {...props} idx="18" locked={props.uniALocked} supply={props.uniSupply} fee={props.uniAFee} jugDrip={props.jugUniADrip} />
        <Collateral {...props} idx="19" locked={props.renbtcALocked} supply={props.renbtcSupply} fee={props.renbtcAFee} jugDrip={props.jugRenbtcADrip} />
        <Collateral {...props} idx="20" locked={props.aaveALocked} supply={props.aaveSupply} fee={props.aaveAFee} jugDrip={props.jugAaveADrip} />
        <Collateral {...props} idx="21" locked={props.univ2daiethALocked} supply={props.univ2daiethSupply} fee={props.univ2daiethAFee} jugDrip={props.jugUniv2daiethADrip} />
        <Collateral {...props} idx="22" locked={props.univ2wbtcethALocked} supply={props.univ2wbtcethSupply} fee={props.univ2wbtcethAFee} jugDrip={props.jugUniv2wbtcethADrip} showLockedDecimals={true} />
        <Collateral {...props} idx="23" locked={props.univ2usdcethALocked} supply={props.univ2usdcethSupply} fee={props.univ2usdcethAFee} jugDrip={props.jugUniv2usdcethADrip} showLockedDecimals={true} />
        <Collateral {...props} idx="24" locked={props.univ2daiusdcALocked} supply={props.univ2daiusdcSupply} fee={props.univ2daiusdcAFee} jugDrip={props.jugUniv2daiusdcADrip} showLockedDecimals={true} />
        <Collateral {...props} idx="25" locked={props.univ2ethusdtALocked} supply={props.univ2ethusdtSupply} fee={props.univ2ethusdtAFee} jugDrip={props.jugUniv2ethusdtADrip} showLockedDecimals={true} />
        <Collateral {...props} idx="26" locked={props.univ2linkethALocked} supply={props.univ2linkethSupply} fee={props.univ2linkethAFee} jugDrip={props.jugUniv2linkethADrip} />
        <Collateral {...props} idx="27" locked={props.univ2uniethALocked} supply={props.univ2uniethSupply} fee={props.univ2uniethAFee} jugDrip={props.jugUniv2uniethADrip} />
        <Collateral {...props} idx="28" locked={props.univ2wbtcdaiALocked} supply={props.univ2wbtcdaiSupply} fee={props.univ2wbtcdaiAFee} jugDrip={props.jugUniv2wbtcdaiADrip} showLockedDecimals={true} />
        <Collateral {...props} idx="29" locked={props.univ2aaveethALocked} supply={props.univ2aaveethSupply} fee={props.univ2aaveethAFee} jugDrip={props.jugUniv2aaveethADrip} />
        <Collateral {...props} idx="30" locked={props.univ2daiusdtALocked} supply={props.univ2daiusdtSupply} fee={props.univ2daiusdtAFee} jugDrip={props.jugUniv2daiusdtADrip} />
        <Collateral {...props} idx="32" locked={props.rwa001ALocked} supply={props.rwa001Supply} fee={props.rwa001AFee} jugDrip={props.rwa001ADrip} />
        <Collateral {...props} idx="33" locked={props.rwa002ALocked} supply={props.rwa002Supply} fee={props.rwa002AFee} jugDrip={props.rwa002ADrip} />
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
              <p className="subtitle is-size-6">
                {t('daistats.utilization')}: {formatAmount.format(props.psmUsdcALocked / props.psmUsdcALine * 100)}%
              </p>
              <p className="subtitle is-size-6">
                <a href="https://ipfs.io/ipfs/QmY9WUjD3YYfyzmegDYxE8yZFcNT3L9TRQSGCJQaWjXxwk/" target="_blank" rel="noopener noreferrer">
                  Trade DAI & USDC with zero slippage using the PSM
                </a>
              </p>
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
          </TabPanel>
          <TabPanel>
        <div className="columns">
          <Pip token="ETH" price={props.ethPrice} priceNxt={props.ethPriceNxt} formater={formatTwoDp} zzz={props.ethZzz}/>
          <Pip token="BTC" price={props.wbtcPrice} priceNxt={props.wbtcPriceNxt} formater={formatTwoDp} zzz={props.wbtcZzz}/>
          <Pip token="YFI" price={props.yfiPrice} priceNxt={props.yfiPriceNxt} formater={formatTwoDp} zzz={props.yfiZzz}/>
          <Pip token="UNI" price={props.uniPrice} priceNxt={props.uniPriceNxt} formater={formatTwoDp} zzz={props.uniZzz}/>
        </div>
        <div className="columns">
          <Pip token="AAVE" price={props.aavePrice} priceNxt={props.aavePriceNxt} formater={formatTwoDp} zzz={props.aaveZzz}/>
          <Pip token="BAL" price={props.balPrice} priceNxt={props.balPriceNxt} formater={formatTwoDp} zzz={props.balZzz}/>
          <Pip token="BAT" price={props.batPrice} priceNxt={props.batPriceNxt} formater={formatCurrency} zzz={props.batZzz}/>
          <Pip token="COMP" price={props.compPrice} priceNxt={props.compPriceNxt} formater={formatTwoDp} zzz={props.compZzz}/>
        </div>
        <div className="columns">
          <Pip token="KNC" price={props.kncPrice} priceNxt={props.kncPriceNxt} formater={formatCurrency} zzz={props.kncZzz}/>
          <Pip token="LINK" price={props.linkPrice} priceNxt={props.linkPriceNxt} formater={formatTwoDp} zzz={props.linkZzz}/>
          <Pip token="LRC" price={props.lrcPrice} priceNxt={props.lrcPriceNxt} formater={formatCurrency} zzz={props.lrcZzz}/>
          <Pip token="MANA" price={props.manaPrice} priceNxt={props.manaPriceNxt} formater={formatCurrency} zzz={props.manaZzz}/>
        </div>
        <div className="columns">
          <Pip token="USDT" price={props.usdtPrice} priceNxt={props.usdtPriceNxt} formater={formatCurrency} zzz={props.usdtZzz}/>
          <Pip token="ZRX" price={props.zrxPrice} priceNxt={props.zrxPriceNxt} formater={formatCurrency} zzz={props.zrxZzz}/>
          <Pip token="USDC, TUSD, PAX, GUSD" price={props.tusdPrice} formater={formatCurrency}/>
          <Pip token="UniV2DaiEth" price={props.univ2daiethPrice} priceNxt={props.univ2daiethPriceNxt} formater={formatTwoDp} zzz={props.univ2daiethZzz}/>
        </div>
        <div className="columns">
          <Pip token="UniV2UniEth" price={props.univ2uniethPrice} priceNxt={props.univ2uniethPriceNxt} formater={formatTwoDp} zzz={props.univ2uniethZzz}/>
          <Pip token="UniV2WbtcEth" price={props.univ2wbtcethPrice} priceNxt={props.univ2wbtcethPriceNxt} formater={formatNoDecimals} zzz={props.univ2wbtcethZzz}/>
          <Pip token="UniV2UsdcEth" price={props.univ2usdcethPrice} priceNxt={props.univ2usdcethPriceNxt} formater={formatNoDecimals} zzz={props.univ2usdcethZzz}/>
        </div>
        <div className="columns">
          <Pip token="UniV2DaiUsdc" price={props.univ2daiusdcPrice} priceNxt={props.univ2daiusdcPriceNxt} formater={formatNoDecimals} zzz={props.univ2daiusdcZzz}/>
          <Pip token="UniV2EthUsdt" price={props.univ2ethusdtPrice} priceNxt={props.univ2ethusdtPriceNxt} formater={formatNoDecimals} zzz={props.univ2ethusdtZzz}/>
          <Pip token="UniV2LinkEth" price={props.univ2linkethPrice} priceNxt={props.univ2linkethPriceNxt} formater={formatTwoDp} zzz={props.univ2linkethZzz}/>
        </div>
        <div className="columns">
          <Pip token="UniV2WbtcDai" price={props.univ2wbtcdaiPrice} priceNxt={props.univ2wbtcdaiPriceNxt} formater={formatNoDecimals} zzz={props.univ2wbtcdaiZzz}/>
          <Pip token="UniV2AaveEth" price={props.univ2aaveethPrice} priceNxt={props.univ2aaveethPriceNxt} formater={formatTwoDp} zzz={props.univ2aaveethZzz}/>
          <Pip token="UniV2DaiUsdt" price={props.univ2daiusdtPrice} priceNxt={props.univ2daiusdtPriceNxt} formater={formatTwoDp} zzz={props.univ2daiusdtZzz}/>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.rwa001Price}>${formatTwoDp.format(props.rwa001Price)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'RWA001' })}</p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.rwa002Price}>${formatTwoDp.format(props.rwa002Price)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.token_price', { token: 'RWA002' })}</p>
            </div>
          </div>
        </div>

          {/* <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={sysCollat}>{formatPercent.format(sysCollat)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.collat_ratio')}</p>
              <p className="subtitle is-size-6">{t('daistats.total_locked')}: ${formatAmount.format(props.sysLocked)}</p>
            </div>
          </div> */}

          {/* <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.mkrPrice}>${formatCurrency.format(props.mkrPrice)}</h3>
                <p className="title subtitle is-size-4">MKR Price</p>
              </div>
            </div> */}

          </TabPanel>
          <TabPanel>
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
              <a href={`https://etherscan.io/address/${props.MCD_PAUSE_PROXY}`} target="_blank" rel="noopener noreferrer">
                <p className="subtitle is-size-6" title={props.protocolTreasury}>
                  Protocol Treasury: {formatAmount.format(props.protocolTreasury)} MKR
                </p>
              </a>
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
              {/* <p className="subtitle is-size-6">vice: {formatAmount.format(props.vice)}</p> */}
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.sysSurplus}>{formatAmount.format(props.sysSurplus)}</h3>
              <p className="title subtitle is-size-4">{t('daistats.system_surplus')}</p>
              <p className="subtitle is-size-6" title={props.surplusBuffer}>{t('daistats.surplus_buffer')}: {formatAmount.format(props.surplusBuffer)} / {t('daistats.lot')}: {formatAmount.format(props.surplusBump)}</p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.ethKicks}>{formatAmount.format(props.ethKicks)}</h3>
              <p className="subtitle is-size-4">{/*t('daistats.token_clip_auctions', { token: 'ETH-A' })*/}ETH-A (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.ethBKicks}>{formatAmount.format(props.ethBKicks)}</h3>
              <p className="subtitle is-size-4">{/*t('daistats.token_clip_auctions', { token: 'ETH-B' })*/}ETH-B (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.ethCKicks}>{formatAmount.format(props.ethCKicks)}</h3>
              <p className="subtitle is-size-4">{/*t('daistats.token_clip_auctions', { token: 'ETH-C' })*/}ETH-C (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.wbtcKicks}>{formatAmount.format(props.wbtcKicks)}</h3>
              <p className="subtitle is-size-4">{/*t('daistats.token_clip_auctions', { token: 'WBTC' })*/}WBTC (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.kncAKicks}>{formatAmount.format(props.kncAKicks)}</h3>
              <p className="subtitle is-size-4">{/*{t('daistats.token_clip_auctions', { token: 'KNC' })}*/}KNC (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.zrxAKicks}>{formatAmount.format(props.zrxAKicks)}</h3>
              <p className="subtitle is-size-4">{/*{t('daistats.token_clip_auctions', { token: 'ZRX' })}*/}ZRX (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.manaAKicks}>{formatAmount.format(props.manaAKicks)}</h3>
              <p className="subtitle is-size-4">{/*{t('daistats.token_clip_auctions', { token: 'MANA' })}*/}MANA1 (Clip) Auctions</p>
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
              <p className="subtitle is-size-4">{/*{t('daistats.token_clip_auctions', { token: 'COMP' })}*/}COMP (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.lrcAKicks}>{formatAmount.format(props.lrcAKicks)}</h3>
              <p className="subtitle is-size-4">{/*{t('daistats.token_clip_auctions', { token: 'LRC' })}*/}LRC (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.linkAKicks}>{formatAmount.format(props.linkAKicks)}</h3>
              <p className="subtitle is-size-4">{/*t('daistats.token_clip_auctions', { token: 'LINK' })*/}LINK (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.balAKicks}>{formatAmount.format(props.balAKicks)}</h3>
              <p className="subtitle is-size-4">{/*{t('daistats.token_clip_auctions', { token: 'BAL' })}*/}BAL (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.yfiKicks}>{formatAmount.format(props.yfiAKicks)}</h3>
              <p className="subtitle is-size-4">{/*t('daistats.token_clip_auctions', { token: 'YFI' })*/}YFI (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.uniKicks}>{formatAmount.format(props.uniAKicks)}</h3>
              <p className="subtitle is-size-4">{/*{t('daistats.token_clip_auctions', { token: 'UNI' })}*/}UNI (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.renbtcKicks}>{formatAmount.format(props.renbtcAKicks)}</h3>
              <p className="subtitle is-size-4">{/*{t('daistats.token_clip_auctions', { token: 'RENBTC' })}*/}RENBTC (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.aaveAKicks}>{formatAmount.format(props.aaveAKicks)}</h3>
              <p className="subtitle is-size-4">{/*{t('daistats.token_clip_auctions', { token: 'AAVE' })}*/}AAVE (Clip) Auctions</p>
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
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2daiusdcAKicks}>{formatAmount.format(props.univ2daiusdcAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UniV2DaiUsdc' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2ethusdtAKicks}>{formatAmount.format(props.univ2ethusdtAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UniV2EthUsdt' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2linkethAKicks}>{formatAmount.format(props.univ2linkethAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UniV2LinkEth' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2uniethAKicks}>{formatAmount.format(props.univ2uniethAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UniV2UniEth' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2wbtcdaiAKicks}>{formatAmount.format(props.univ2wbtcdaiAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UniV2WbtcDai' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2aaveethAKicks}>{formatAmount.format(props.univ2aaveethAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UniV2AaveEth' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.univ2daiusdtAKicks}>{formatAmount.format(props.univ2daiusdtAKicks)}</h3>
              <p className="subtitle is-size-4">{t('daistats.token_flip_auctions', { token: 'UniV2DaiUsdt' })}</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={props.batKicks}>{formatAmount.format(props.batKicks)}</h3>
              <p className="subtitle is-size-4">{/*{t('daistats.token_clip_auctions', { token: 'BAT' })}*/}BAT (Clip) Auctions</p>
              <p className="subtitle is-size-6"></p>
            </div>
          </div>
        </div>
          </TabPanel>
          <TabPanel>
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
              <h3 className="title" title={props.bkrSupply}>{formatAmount.format(props.bkrSupply)}</h3>
              <p className="title subtitle is-size-4">
                <a href={`https://etherscan.io/token/${props.BKR}`} target="_blank" rel="noopener noreferrer">
                  {t('daistats.token_supply', { token: 'Breaker (BKR)' })}
                </a>
              </p>
              <p className="title subtitle is-size-6" title={props.mkrBroken}>MKR Broken: {formatEightDp.format(props.mkrBroken)}</p>
              <p className="title subtitle is-size-6">
                <a href="https://makerbreak.io/" target="_blank" rel="noopener noreferrer">Convert MKR to BKR with Makerbreak.io</a>
              </p>
            </div>
          </div>
        </div>
          </TabPanel>
          <TabPanel>
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
              <a href={`https://etherscan.io/token/${props.MCD_GOV}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> MKR</h3>
                <p className="subtitle is-size-7">{props.MCD_GOV}</p>
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
              <a href={`https://etherscan.io/token/${props.AAVE}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> AAVE</h3>
                <p className="subtitle is-size-7">{props.AAVE}</p>
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
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.UNIV2LINKETH}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> UniV2LinkEth</h3>
                <p className="subtitle is-size-7">{props.UNIV2LINKETH}</p>
              </a>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.UNIV2UNIETH}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> UniV2UniEth</h3>
                <p className="subtitle is-size-7">{props.UNIV2UNIETH}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.UNIV2WBTCDAI}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> UniV2WbtcDai</h3>
                <p className="subtitle is-size-7">{props.UNIV2WBTCDAI}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.UNIV2AAVEETH}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> UniV2AaveEth</h3>
                <p className="subtitle is-size-7">{props.UNIV2AAVEETH}</p>
              </a>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.UNIV2DAIUSDT}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> UniV2DaiUsdt</h3>
                <p className="subtitle is-size-7">{props.UNIV2DAIUSDT}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.RWA001}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> RWA001</h3>
                <p className="subtitle is-size-7">{props.RWA001}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/token/${props.RWA002}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> RWA002</h3>
                <p className="subtitle is-size-7">{props.RWA002}</p>
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/address/${props.GOV_MULTISIG}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> GovAlpha</h3>
                <p className="subtitle is-size-7">{props.GOV_MULTISIG}</p>
              </a>
              <a href={`https://etherscan.io/address/${props.GOV_MULTISIG_2}`} target="_blank" rel="noopener noreferrer">
                <p className="subtitle is-size-7">{props.GOV_MULTISIG_2}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/address/${props.RISK_MULTISIG}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> Risk Core Unit</h3>
                <p className="subtitle is-size-7">{props.RISK_MULTISIG}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/address/${props.GRO_MULTISIG}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> Growth Core Unit</h3>
                <p className="subtitle is-size-7">{props.GRO_MULTISIG}</p>
              </a>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/address/${props.RWF_MULTISIG}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> Real World Core Unit</h3>
                <p className="subtitle is-size-7">{props.RWF_MULTISIG}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/address/${props.CP_MULTISIG}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> Content Production Unit</h3>
                <p className="subtitle is-size-7">{props.CP_MULTISIG}</p>
              </a>
              <a href={`https://etherscan.io/address/${props.CP_MULTISIG_2}`} target="_blank" rel="noopener noreferrer">
                <p className="subtitle is-size-7">{props.CP_MULTISIG_2}</p>
              </a>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/address/${props.SES_AUDITORS_MULTISIG}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> Sustainable Ecosystem Scaling Core Unit (SES)</h3>
                <p className="subtitle is-size-7">{props.SES_AUDITORS_MULTISIG}</p>
              </a>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/address/${props.SES_PERMANENT_TEAM_MULTISIG}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> SES Permanent Team</h3>
                <p className="subtitle is-size-7">{props.SES_PERMANENT_TEAM_MULTISIG}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/address/${props.SES_PERMANENT_TEAM_MULTISIG}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> SES Incubation Program</h3>
                <p className="subtitle is-size-7">{props.SES_INCUBATION_PROGRAM_MULTISIG}</p>
              </a>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <a href={`https://etherscan.io/address/${props.SES_PERMANENT_TEAM_MULTISIG}`} target="_blank" rel="noopener noreferrer">
                <h3 className="title"><i className="fal fa-file-code"></i> SES Grants Program</h3>
                <p className="subtitle is-size-7">{props.SES_GRANTS_PROGRAM_MULTISIG}</p>
              </a>
            </div>
          </div>
        </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default Main
