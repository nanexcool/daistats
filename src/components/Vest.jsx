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
    //    address usr;   // Vesting recipient
    //    uint48  bgn;   // Start of vesting period  [timestamp]
    //    uint48  clf;   // The cliff date           [timestamp]
    //    uint48  fin;   // End of vesting period    [timestamp]
    //    address mgr;   // A manager address that can yank
    //    uint8   res;   // Restricted
    //    uint128 tot;   // Total reward amount
    //    uint128 rxd;   // Amount of vest claimed
        // id: i,
        // usr: award.usr,
        // bgn: this.unixToDateTime(award.bgn),
        // clf: this.unixToDateTime(award.clf),
        // fin: this.unixToDateTime(award.fin),
        // tot: award.tot,
        // rxd: award.rxd,
        // accrued: vest.interface.decodeFunctionResult('accrued', res[idx + i]),
        // unpaid: vest.interface.decodeFunctionResult('unpaid', res[idx + i])

function Vest(props) {
  const t = useTranslate()
  const award = props.award
  if (props.heading) {
    return (<thead>
              <tr>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Recipient</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Total Reward</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Accrued</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Unpaid</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Claimed</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Start Date</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Cliff Date</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>End Date</th>
              </tr>
            </thead>)
  } else {
    return (
          <tr>
            <td className="has-text-left">{award.usr}</td>
            <td className="has-text-left">{award.tot}</td>
            <td className="has-text-left">{award.accrued}</td>
            <td className="has-text-left">{award.unpaid}</td>
            <td className="has-text-left">{award.rxd}</td>
            <td className="has-text-left">{award.bgn}</td>
            <td className="has-text-left">{award.clf}</td>
            <td className="has-text-left">{award.fin}</td>
          </tr>
         )
  }
}

export default Vest
