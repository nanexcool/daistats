import React from 'react'
import { useTranslate } from 'react-polyglot';

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

const formatDp = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 8,
  maximumFractionDigits: 8
})

const formatPercent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const formatPercentNoDecimals = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

function autoLine(props, label) {
  const ilk = props.ilksByName[props.ilk]
  if (ilk.lineMax > 0) {
    return (
      <>
          <p className="title subtitle is-size-6">{label}: {formatAmount.format(ilk.lineMax)}</p>
          <p className="title subtitle is-size-6">Gap: {formatAmount.format(ilk.gap)} Ttl: {ilk.ttl / 60 / 60}h</p>
          <p className="title subtitle is-size-6">Last Change: {ilk.lastInc}</p>
      </>
    )
  } else {
    return null;
  }
}

function Collateral(props) {
  var supply
  const t = useTranslate()
  const ilk = props.ilksByName[props.ilk]
  if (props.supply) {
      supply = props.supply
  } else {
      supply = ilk.supply
  }
  return (
    <div>
      <div className="columns">
      <div className="column is-half">
        <div className="has-text-centered">
          <h3 className="title"
            title={ilk.Art * ilk.rate}>
            {formatAmount.format(ilk.Art * ilk.rate)} / {formatAmount.format(ilk.line)}
          </h3>
          {ilk.name && <p className="title subtitle is-size-4">{ ilk.name }</p>}
          <p className="title subtitle is-size-4">
            {t('daistats.dai_from_token', { token: ilk.ilk })} ({formatAmount.format(ilk.Art * ilk.rate / props.debt * 100)}%)
              </p>
          {autoLine(props, t('maker.debt_ceiling'))}
          <p
            className="subtitle is-size-6">{t('daistats.utilization')}: {formatAmount.format(ilk.Art * ilk.rate / ilk.line * 100)}%</p>
        </div>
      </div>
      <div className="column">
        <div className="has-text-centered">
          <h3 className="title" title={ilk.fee}>{formatPercent.format(ilk.fee)}</h3>
          <p className="title subtitle is-size-4">{t('daistats.token_stability_fee', { token: ilk.ilk })}</p>
          <p className="subtitle is-size-6">{t('daistats.last_drip')}: {ilk.drip}</p>
          {ilk.mat && <p className="title subtitle is-size-6" title={ilk.mat}>Collateral Ratio: {formatPercentNoDecimals.format(ilk.mat)}</p>}
          {ilk.dust > 0 && <p className="title subtitle is-size-6" title={ilk.dust}>{/*{t('daistats.dust')}*/}Dust: {formatAmount.format(ilk.dust)}</p>}
        </div>
      </div>
      <div className="column">
        <div className="has-text-centered">
          <h3 className="title" title={ilk.locked}>
            {props.showLockedDecimals ? formatDp.format(ilk.locked) : formatNoDecimals.format(ilk.locked)}</h3>
          <p className="title subtitle is-size-4">
            {t('daistats.token_locked', { token: ilk.ilk })}
          </p>
          <p className="subtitle is-size-6">
            {t('daistats.token_supply_locked', { token: ilk.ilk })}: {formatPercent.format(ilk.locked / supply)}</p>
          <p className="title subtitle is-size-6" title={ilk.value}>
            Value Locked: ${ formatAmount.format(ilk.value) }
          </p>
          {ilk.conduitIn && <p className="title subtitle is-size-6">Conduit In: {formatAmount.format(ilk.conduitIn)}</p>}
          {ilk.conduitOut && <p className="title subtitle is-size-6">Conduit Out: {formatAmount.format(ilk.conduitOut)}</p>}
        </div>
      </div>
    </div>
    <hr />
    </div>
  )
}

export default Collateral
