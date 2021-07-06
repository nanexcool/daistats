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
  const t = useTranslate()
  return (
    <div>
      <div className="columns">
      <div className="column is-half">
        <div className="has-text-centered">
          <h3 className="title"
            title={props.ilks[props.idx].Art * props.ilks[props.idx].rate}>
            {formatAmount.format(props.ilks[props.idx].Art * props.ilks[props.idx].rate)} / {formatAmount.format(props.ilks[props.idx].line)}
          </h3>
          <p className="title subtitle is-size-4">
            {t('daistats.dai_from_token', { token: props.ilks[props.idx].ilk })} ({formatAmount.format(props.ilks[props.idx].Art * props.ilks[props.idx].rate / props.debt * 100)}%)
              </p>
          {autoLine(props, t('maker.debt_ceiling'))}
          <p
            className="subtitle is-size-6">{t('daistats.utilization')}: {formatAmount.format(props.ilks[props.idx].Art * props.ilks[props.idx].rate / props.ilks[props.idx].line * 100)}%</p>
        </div>
      </div>
      <div className="column">
        <div className="has-text-centered">
          <h3 className="title" title={props.fee}>{props.fee}%</h3>
          <p className="title subtitle is-size-4">{t('daistats.token_stability_fee', { token: props.ilks[props.idx].ilk })}</p>
          <p className="subtitle is-size-6">{t('daistats.last_drip')}: {props.ilks[props.idx].drip}</p>
          <p className="title subtitle is-size-6">{/*{t('daistats.dust')}*/}Dust: {formatAmount.format(props.ilks[props.idx].dust)}</p>
        </div>
      </div>
      <div className="column">
        <div className="has-text-centered">
          <h3 className="title" title={props.ilks[props.idx].locked}>
            {props.showLockedDecimals ? formatDp.format(props.ilks[props.idx].locked) : formatNoDecimals.format(props.ilks[props.idx].locked)}</h3>
          <p className="title subtitle is-size-4">
            {t('daistats.token_locked', { token: props.ilks[props.idx].ilk })}
          </p>
          <p className="subtitle is-size-6">
            {t('daistats.token_supply_locked', { token: props.ilks[props.idx].ilk })}: {formatPercent.format(props.ilks[props.idx].locked / props.ilks[props.idx].supply)}</p>
        </div>
      </div>
    </div>
    <hr />
    </div>
  )
}

export default Collateral
