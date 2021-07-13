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
  if (props.heading) {
    return (<thead>
              <tr>
                <th>Collateral (Ilk)</th>
                <th>(Clip) Auctions</th>
                <th>Active Auctions</th>
                <th>Bad Debt (dirt)</th>
                <th>Limit (hole)</th>
                <th>Liquidation Penalty (chop)</th>
                <th>Price Change Multiplier (cut)</th>
                <th>Price Change Interval (step) seconds</th>
                <th>Auction Price Multiplier (buf)</th>
                <th>Maximum Auction Drawdown (cusp)</th>
                <th>Maximum Auction Duration (tail) seconds</th>
                <th>Proportional Kick Incentive (chip)</th>
                <th>Flat Kick Incentive (tip)</th>
              </tr>
            </thead>)
  } else{
    const ilk = props.ilks[props.idx]
    return (
          <tr>
            <td>{props.token}</td>
            <td>{formatAmount.format(ilk.kicks)}</td>
            <td>{formatAmount.format(ilk.count)}</td>
            <td>{formatAmount.format(ilk.dirt)}</td>
            <td>{formatAmount.format(ilk.hole)}</td>
            <td>{formatPercent.format(Math.abs(1 - ilk.chop))}</td>
            <td>{formatAmount.format(ilk.cut)}</td>
            <td>{formatAmount.format(ilk.step)}</td>
            <td>{formatAmount.format(ilk.buf)}</td>
            <td>{formatAmount.format(ilk.cusp)}</td>
            <td>{formatAmount.format(ilk.tail)}</td>
            <td>{formatPercent.format(ilk.chip)}</td>
            <td>{formatAmount.format(ilk.tip)}</td>
          </tr>
         )
  }

{/*
FIXME show current starting price
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

from clip:
    uint256 public buf;    // Multiplicative factor to increase starting price                  [ray]
    uint256 public tail;   // Time elapsed before auction reset                                 [seconds]
    uint256 public cusp;   // Percentage drop before auction reset                              [ray]
    uint64  public chip;   // Percentage of tab to suck from vow to incentivize keepers         [wad]
    uint192 public tip;    // Flat fee to suck from vow to incentivize keepers                  [rad]

    uint256   public kicks;   // Total auctions
    uint256[] public active;  // Array of active auction ids clip.count()

    Active Auction count abacus.count   or active.length?

    // Levels for circuit breaker
    // 0: no breaker
    // 1: no new kick()
    // 2: no new kick() or redo()
    // 3: no new kick(), redo(), or take()
    uint256 public stopped = 0;

clip_calc:
    uint256 public step; // Length of time between price drops [seconds]
    uint256 public cut;  // Per-step multiplicative factor     [ray]

*/}
}

export default Clip
