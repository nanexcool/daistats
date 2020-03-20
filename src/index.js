import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import intl from 'react-intl-universal';
import App from './App';
import * as serviceWorker from './serviceWorker';
import zh from './i18n/zh.json'
import en from './i18n/en.json'

let lang = (navigator.languages && navigator.languages[0]) || navigator.language
intl.init({
  currentLocale: lang.split('-')[0],
  locales: {
    zh,
    en
  }
})



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
