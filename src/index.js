import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { I18n } from 'react-polyglot'
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class Root extends Component {
  state = {
    locale: 'en',
    messages: require('defi18n/en/daistats.json')
  }
  constructor() {
    super()
    const locale = localStorage.getItem('ds-locale')
    if (locale) {
      this.state.locale = locale
      this.state.messages = require(`defi18n/${locale}/daistats.json`)
    }
  }
  toggle = (locale) => {
    this.setState({
      locale,
      messages: require(`defi18n/${locale}/daistats.json`)
    })
    localStorage.setItem('ds-locale', locale)
  }
  render() {
    return (
      <I18n locale={this.state.locale} messages={this.state.messages}>
        <App locale={this.state.locale} toggle={this.toggle} />
      </I18n>
    )
  }
}

ReactDOM.render(
  <Root/>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
