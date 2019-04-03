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
  const { daiSupply, ethSupply, wethSupply, fee, pethSupply, ethUsd, mkrUsd, lockedPeth, lockedWeth, gemPit } = props
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={daiSupply}>{formatAmount.format(daiSupply)}</h3>
                <p className="subtitle is-size-4">Dai Supply</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={lockedWeth}>{formatAmount.format(lockedWeth)}</h3>
                <p className="subtitle is-size-4">ETH Locked</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={ethUsd * lockedWeth}>{formatCurr.format(ethUsd * lockedWeth)}</h3>
                <p className="subtitle is-size-4">Value Locked in USD</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={ethSupply}>{formatAmount.format(ethSupply)}</h3>
                <p className="subtitle is-size-4">Total ETH Supply</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={lockedWeth / ethSupply * 100}>{formatAmount.format(lockedWeth / ethSupply * 100)} %</h3>
                <p className="subtitle is-size-4">% ETH Locked</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={ethUsd * lockedWeth / daiSupply * 100}>{formatAmount.format(ethUsd * lockedWeth / daiSupply * 100)} %</h3>
                <p className="subtitle is-size-4">Collat. Ratio</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={wethSupply}>{formatAmount.format(wethSupply)}</h3>
                <p className="subtitle is-size-4">Total WETH Supply</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={lockedWeth / wethSupply * 100}>{formatAmount.format(lockedWeth / wethSupply * 100)} %</h3>
                <p className="subtitle is-size-4">% WETH Locked</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={ethUsd}>{formatCurr.format(ethUsd)}</h3>
                <p className="subtitle is-size-4">ETH Price</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={mkrUsd}>{formatCurr.format(mkrUsd)}</h3>
                <p className="subtitle is-size-4">MKR Price</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={fee}>{formatAmount.format(fee)} %</h3>
                <p className="subtitle is-size-4">Stability Fee</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={gemPit}>{formatAmount.format(gemPit)}</h3>
                <p className="subtitle is-size-4">MKR in Burner</p>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={gemPit * mkrUsd}>{formatCurr.format(gemPit * mkrUsd)}</h3>
                <p className="subtitle is-size-4">Burner in USD</p>
              </div>
            </div>
          </div>
          {/* <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <p className="">
                  Current block: {props.blockNumber}
                </p>
              </div>
            </div>
          </div> */}
          {/* <p>{formatAmount.format(ethUsd * lockedWeth / daiSupply * 100)}</p> */}
          {/* <div className="columns">
              <div className="column">
                <p>ethUsd: {formatCurr.format(ethUsd)}</p>
                <p>value: {formatCurr.format(lockedWeth * ethUsd)}</p>
                <p>wethSupply: {formatAmount.format(wethSupply)}</p>
                <p>% {lockedWeth / wethSupply * 100}</p>
                <p>pethSupply: {formatAmount.format(pethSupply)}</p>
                <p>lockedPeth: {formatAmount.format(lockedPeth)}</p>
                <p>% {lockedWeth / ethSupply * 100}</p>
                <p>PETH/ETH Ratio: {lockedWeth / pethSupply}</p>
                <p>Current block: {this.state.blockNumber}</p>
                <p><button onClick={this.doLockedWeth}>Zomg</button></p>
              </div>
            </div> */}
        </div>
      </section>
    </div>
  )
}

export default Main
