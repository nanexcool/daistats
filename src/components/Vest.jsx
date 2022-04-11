import React from 'react'
import { useTranslate } from 'react-polyglot';

const formatTwoDp = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

function Vest(props) {
  const t = useTranslate()
  const award = props.award
  if (props.heading) {
    return (<thead>
              <tr>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>ID</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Recipient</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Public</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Claimed</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Unpaid</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Accrued</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Total Reward</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Start Date</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>Cliff Date</th>
                <th style={{color: "#e6e8f1", fontWeight: 400}}>End Date</th>
              </tr>
            </thead>)
  } else {
    return (
          <tr>
            <td className="has-text-right" title={award.id}>{award.id}</td>
            <td className="has-text-left">
              <a href={`https://etherscan.io/address/${award.usr}`} target="_blank" rel="noopener noreferrer">
                <p className="subtitle is-size-6" style={{'lineHeight': '24px'}}>
                  {award.usrName}
                  {!award.usrName && award.usr.substring(0, 6) + '...' + award.usr.substring(37, 42)}
                </p>
              </a>
            </td>
            <td className="has-text-left" title={award.res}>{award.res == 0 ? 'Yes' : 'No'}</td>
            <td className="has-text-right" title={award.rxd}>{formatTwoDp.format(award.rxd)}</td>
            <td className="has-text-right" title={award.unpaid}>{formatTwoDp.format(award.unpaid)}</td>
            <td className="has-text-right" title={award.accrued}>{formatTwoDp.format(award.accrued)}</td>
            <td className="has-text-right" title={award.tot}>{formatTwoDp.format(award.tot)}</td>
            <td className="has-text-right" style={{paddingLeft: "0.2em", paddingRight: "0.2em"}}>{award.bgn}</td>
            <td className="has-text-right" style={{paddingLeft: "0.2em", paddingRight: "0.2em"}}>{award.clf}</td>
            <td className="has-text-right" style={{paddingLeft: "0.2em", paddingRight: "0.2em"}}>{award.fin}</td>
          </tr>
         )
  }
}

export default Vest
