import React, { Component } from 'react'
import daiLogo from './dai.png'

class App extends Component {

  render() {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <figure className="image is-128x128 container">
            <img src={daiLogo} alt="Dai Logo" />
          </figure>
          <br />
          <h2 className="title is-2">Dai Stats will be back soon!</h2>
          <h3 className="title is-3">
            In the meantime, enjoy <a class="" href="https://saistats.com" target="_blank" rel="noopener noreferrer">saistats.com</a>
          </h3>
        </div>
      </section>
    )
  }
}

export default App;
