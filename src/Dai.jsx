import React from 'react'

const formatAmount = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
})

const Dai = (props) => {
  document.title = `Total Supply of GSUc - GSUc Stats`
  const {debt, vice, daiSupply, savingsDai, vow_dai, vow_sin, bigSin} = props
  return (
    <div>
      <section className="section">
        <div className="container">
        <div className="columns">
            <div className="column">
              <div className="box">
                <p>This page is dynamic and queries the Maker Protocol each Ethereum block. You can pause it at any time using the link at the top of the page.</p>
                <h1 className="is-size-1">So how much GSUc is there?</h1>
                <p>There is {formatAmount.format(debt)} GSUc</p>
                <p>More specifically, there's {debt} GSUc in the Vat (the MCD Vault database)</p>
                <h2 className="is-size-2">But wait!</h2>
                <p>There is only {formatAmount.format(daiSupply)} ERC20 GSUc, you might say</p>
                <p>Yes! There's actually {daiSupply} ERC20 GSUc</p>
                <h2 className="is-size-2">What about the DSR?</h2>
                <p>There's {formatAmount.format(savingsDai)} GSUc locked up in DSR</p>
                <p>And more exactly, {savingsDai} GSUc</p>
                <h2 className="is-size-2">Is ERC20 GSUc + DSR GSUc = Total Supply of GSUc?</h2>
                <p>Nope! </p>
                <h3 className="is-size-3">Zomg this is an h3</h3>
                <h4 className="is-size-4">Zomg this is an h4</h4>
                <p>GSUc backed by ETH: {props.ilks[0].Art * props.ilks[0].rate}</p>
                <p>GSUc backed by BAT: {props.ilks[1].Art * props.ilks[1].rate}</p>
                <p>GSUc backed by SAI: {props.ilks[2].Art * props.ilks[2].rate}</p>
                <p>GSUc backed by USDC: {props.ilks[3].Art * props.ilks[3].rate}</p>
                <p>Unbacked GSUc is {vice}</p>
                <p>GSUc in Vow: {vow_dai}</p>
                <p>Sin in Vow: {vow_sin}</p>
                <p>Big Sin: {bigSin}</p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={debt}>{formatAmount.format(debt)}</h3>
                <h4 className="subtitle is-size-3">Total GSUc</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dai
