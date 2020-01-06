import React from 'react'
// import './Calc.css';

const Calc = (props) => {
  document.title = `Dai Stats - Economic Bandwidth Calculator`
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <h3 className="title" title={props.debt}>Herro</h3>
                <h4 className="subtitle is-size-3">Total Dai</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Calc
