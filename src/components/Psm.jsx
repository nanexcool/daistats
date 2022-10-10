
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

const formatPercentFee = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 4
})

function Psm(props) {
  const t = useTranslate()
  const ilk = props.ilksByName[props.ilk]
  return (
        <div>
          <div className="columns">
          <div className="column is-half">
            <div className="has-text-centered">
              <h3 className="title"
                title={ilk.locked}>
                {formatAmount.format(ilk.locked)} / {formatAmount.format(ilk.line)}
              </h3>
              <p className="title subtitle is-size-4">
                {t('daistats.dai_from_token', { token: ilk.ilk })} ({formatAmount.format(ilk.locked / props.debt * 100)}%)
              </p>
              {ilk.lineMax > 0 && <p className="title subtitle is-size-6">{t('maker.debt_ceiling')}: {formatAmount.format(ilk.lineMax)}</p>}
              {ilk.lineMax > 0 && <p className="title subtitle is-size-6">Gap: {formatAmount.format(ilk.gap)} Ttl: {ilk.ttl / 60 / 60}h</p>}
              {ilk.lineMax > 0 && <p className="title subtitle is-size-6">Last Change: {ilk.lastInc}</p>}
              <p className="subtitle is-size-6">
                {t('daistats.utilization')}: {formatAmount.format(ilk.locked / ilk.line * 100)}%
              </p>
              <p className="subtitle is-size-6">
                <a href="https://ipfs.io/ipfs/QmdFEcowhVbEabe68LMH8UuXweU8jnmQ7J28uUhFeeaY9X/" target="_blank" rel="noopener noreferrer">
                  Trade GSUc & {ilk.token} with no price impact using the PSM
                </a>
              </p>
            </div>
          </div>
          <div className="column">
            <div className="has-text-centered">
              <h3 className="title" title={ilk.tin}>{formatPercentFee.format(ilk.tin)}</h3>
              <p className="title subtitle is-size-4">Fee in</p>
              <h3 className="title" title={ilk.tout}>{formatPercentFee.format(ilk.tout)}</h3>
              <p className="title subtitle is-size-4">Fee out</p>
            </div>
          </div>
          <div className="column">
            <div className="has-text-centered">
              <h3 className="title" title={ilk.locked}>{formatNoDecimals.format(ilk.locked)}</h3>
              <p className="title subtitle is-size-4">
                {t('daistats.token_locked', { token: ilk.token })}
              </p>
              <p className="subtitle is-size-6">
                {t('daistats.token_supply_locked', { token: ilk.token })}: {formatPercent.format(ilk.locked / ilk.supply)}</p>
            </div>
          </div>
        </div>
        <hr />
      </div>
  )
}

export default Psm
