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

const formatPercent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

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
            {t('daistats.dai_from_token', { token: props.token })} ({formatAmount.format(props.ilks[props.idx].Art * props.ilks[props.idx].rate / props.debt * 100)}%)
              </p>
          <p
            className="subtitle is-size-6">{t('daistats.utilization')}: {formatAmount.format(props.ilks[props.idx].Art * props.ilks[props.idx].rate / props.ilks[props.idx].line * 100)}%</p>
        </div>
      </div>
      <div className="column">
        <div className="has-text-centered">
          <h3 className="title" title={props.fee}>{props.fee}%</h3>
          <p className="title subtitle is-size-4">{t('daistats.token_stability_fee', { token: props.token })}</p>
          <p className="subtitle is-size-6">{t('daistats.last_drip')}: {props.jugDrip}</p>
        </div>
      </div>
      <div className="column">
        <div className="has-text-centered">
          <h3 className="title" title={props.locked}>{formatNoDecimals.format(props.locked)}</h3>
          <p className="title subtitle is-size-4">
            {t('daistats.token_locked', { token: props.token })}
          </p>
          <p className="subtitle is-size-6">
            {t('daistats.token_supply_locked', { token: props.token })}: {formatPercent.format(props.locked / props.supply)}</p>
        </div>
      </div>
    </div>
    <hr />
    </div>
  )
}

export default Collateral
