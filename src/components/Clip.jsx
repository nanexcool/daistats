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

function Clip(props) {
  const t = useTranslate()
  const ilk = props.ilks[props.idx]
  return (
          <div className="column">
            <div className="box has-text-centered">
              <h3 className="title" title={ilk.kicks}>{formatAmount.format(ilk.kicks)}</h3>
              <p className="subtitle is-size-4">{/*t('daistats.token_clip_auctions', { token: props.token })*/}{props.token} (Clip) Auctions</p>
              <p className="subtitle is-size-6">Liquidation Limit (hole) {formatAmount.format(ilk.hole)}</p>
              {/*
              <p className="subtitle is-size-6">{formatPercent.format(ilk.chop)}</p>
              <p className="subtitle is-size-6">{formatAmount.format(ilk.dirt)}</p>
              <p className="subtitle is-size-6">Price Change Interval (step) {formatAmount.format(ilk.step)}</p>
              <p className="subtitle is-size-6">Auction Price Multiplier (buf) {formatAmount.format(ilk.buf)}</p> 
               FIXME show current starting price*/}
            {/* 
Auction Price

    Auction Price Function (calc): Stairstep Exponential   - any way to find this?
        Price Change Multiplier (cut): 0.99    - from calc contract
        Price Change Interval (step): 90 seconds   - from calc contract
    Auction Price Multiplier (buf): 1.3   - from Dog ilk map?

Limits

    Maximum Auction Drawdown (cusp): 0.4
    Maximum Auction Duration (tail): 8,400 seconds
    Breaker Price Tolerance (tolerance): 0.5

Incentives

    Proportional Kick Incentive (chip): 0.1%
    Flat Kick Incentive (tip): 0 DAI

                */}
            </div>
          </div>

  )
}

export default Clip
