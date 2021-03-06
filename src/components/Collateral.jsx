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

function autoLine(props, label) {
  if (props.ilks[props.idx].lineMax > 0) {
    return (
      <>
          <p className="title subtitle is-size-6">{label}: {formatAmount.format(props.ilks[props.idx].lineMax)}</p>
          <p className="title subtitle is-size-6">Gap: {formatAmount.format(props.ilks[props.idx].gap)} Ttl: {props.ilks[props.idx].ttl / 60 / 60}h</p>
          <p className="title subtitle is-size-6">Last Change: {props.ilks[props.idx].lastInc}</p>
      </>
    )
  } else {
    return null;
  }
}

function Collateral(props) {
  var supply
  const t = useTranslate()
  const ilk = props.ilks[props.idx]
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
          <p className="title subtitle is-size-6">{/*{t('daistats.dust')}*/}Dust: {formatAmount.format(ilk.dust)}</p>
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
        </div>
      </div>
    </div>
    <hr />
    </div>
  )
}

export default Collateral
