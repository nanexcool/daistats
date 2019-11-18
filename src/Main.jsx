import React from 'react'

const formatCurr = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const formatAmount = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2
})

const Main = (props) => {
  document.title = `Dai Stats - ${formatAmount.format(props.daiSupply)}`
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns">
          <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.debt}>{formatAmount.format(props.debt)}</h3>
                <p className="subtitle is-size-4">Total Dai in Vat</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.Line}>{formatAmount.format(props.Line)}</h3>
                <p className="subtitle is-size-4">Global Debt Ceiling</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ethLocked}>{formatAmount.format(props.ethLocked)}</h3>
                <p className="subtitle is-size-4">ETH Locked</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
              <h3 className="title" title={props.batLocked}>{formatAmount.format(props.batLocked)}</h3>
                <p className="subtitle is-size-4">BAT Locked</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
              <h3 className="title" title={props.saiLocked}>{formatAmount.format(props.saiLocked)}</h3>
                <p className="subtitle is-size-4">SAI Locked</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[0].line}>{formatAmount.format(props.ilks[0].line)}</h3>
                <p className="subtitle is-size-4">ETH Ceiling</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[1].line}>{formatAmount.format(props.ilks[1].line)}</h3>
                <p className="subtitle is-size-4">BAT Ceiling</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.ilks[2].line}>{formatAmount.format(props.ilks[2].line)}</h3>
                <p className="subtitle is-size-4">SAI Ceiling</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={4.0}>4%</h3>
                <p className="subtitle is-size-4">ETH Stability Fee</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={4.0}>4%</h3>
                <p className="subtitle is-size-4">BAT Stability Fee</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={0}>0%</h3>
                <p className="subtitle is-size-4">SAI Stability Fee</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={2}>2%</h3>
                <p className="subtitle is-size-4">Dai Savings Rate</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.daiSupply}>{formatAmount.format(props.daiSupply)}</h3>
                <p className="subtitle is-size-4">Dai (ERC20) Supply</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.savingsDai}>{formatAmount.format(props.savingsDai)}</h3>
                <p className="title subtitle is-size-4">Dai in DSR</p>
                <p className="subtitle is-size-6">(Pie in DSR: {formatAmount.format(props.savingsPie)})</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={2}>2%</h3>
                <p className="title subtitle is-size-4">Dai Savings Rate</p>
                <p className="subtitle is-size-6">Last Drip: {props.potDrip}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.cdps}>{props.cdps}</h3>
                <p className="subtitle is-size-4">Vaults Opened</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.gemPit}>{formatAmount.format(props.gemPit)}</h3>
                <p className="subtitle is-size-4">MKR in Burner</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.uniswapDai}>{formatAmount.format(props.uniswapDai)}</h3>
                <p className="subtitle is-size-4">Dai in Uniswap</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Main
