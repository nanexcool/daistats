import React from 'react'
import { useTranslate } from 'react-polyglot';

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
  return (
    <div>
      <div className="container">
        <div className="columns">
          <div className="column box">

            <h1 className="title" title={props.debt}>
              {t('daistats.total_token', { token: 'Dai' })}
            </h1>
            <h2 className="subtitle">
              {formatAmount.format(props.debt)} / {formatAmount.format(props.Line)}
            </h2>

            <h2 className="subtitle">
              {t('daistats.dai_from_token', {token:'ETH'})}
            </h2>
            <p>
              {formatAmount.format(props.ilks[0].Art * props.ilks[0].rate)} / {formatAmount.format(props.ilks[0].line)} ({formatAmount.format(props.ilks[0].Art * props.ilks[0].rate / props.ilks[0].line * 100)}%)
            </p>
            <h2 className="subtitle">
              {t('daistats.dai_from_token', {token:'BAT'})}
            </h2>
            <p>
              {formatAmount.format(props.ilks[1].Art * props.ilks[1].rate)} / {formatAmount.format(props.ilks[1].line)} ({formatAmount.format(props.ilks[1].Art * props.ilks[1].rate / props.ilks[1].line * 100)}%)
            </p>
            <h2 className="subtitle">
              {t('daistats.dai_from_token', {token:'WBTC'})}
            </h2>
            <p>
              {formatAmount.format(props.ilks[3].Art * props.ilks[3].rate)} / {formatAmount.format(props.ilks[3].line)} ({formatAmount.format(props.ilks[3].Art * props.ilks[3].rate / props.ilks[3].line * 100)}%)
            </p>
            <h2 className="subtitle">
              {t('daistats.dai_from_token', {token:'USDC-A'})}
            </h2>
            <p>
              {formatAmount.format(props.ilks[2].Art * props.ilks[2].rate)} / {formatAmount.format(props.ilks[2].line)} ({formatAmount.format(props.ilks[2].Art * props.ilks[2].rate / props.ilks[2].line * 100)}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
