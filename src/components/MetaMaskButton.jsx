import React, { useContext } from 'react';
import MetaMaskContext from './MetaMaskContext';

export { MetaMaskButton as default };

function MetaMaskButton(props) {
  const { web3, accounts, error, awaiting, openMetaMask } = useContext(
    MetaMaskContext,
  );

  if ((error && error.message === "MetaMask not installed")) {
    // Don't show anything
    return (
      ""
    );
  } else if ((error && error.message === "User denied account authorization") || (error && error.message === "MetaMask is locked")) {
    return (
      <button className={`button is-fullwidth ${props.isDark ? "is-dark" : "is-light"}`} onClick={openMetaMask}>
        Please allow MetaMask to connect.
      </button>
    );
  } else if (error) {
    return (
      <button className={`button is-fullwidth ${props.isDark ? "is-dark" : "is-light"}`} onClick={openMetaMask}>
        UNHANDLED ERROR: {error.message}
      </button>
    );
  } else if (!web3 && awaiting) {
    return (
      <button className={`button is-fullwidth ${props.isDark ? "is-dark" : "is-light"}`} onClick={openMetaMask}>
        MetaMask is loading...
      </button>
    );
  } else if (!web3) {
    return (
      <button className={`button is-fullwidth ${props.isDark ? "is-dark" : "is-light"}`} onClick={openMetaMask}>
        Click to enable MetaMask
      </button>
    );
  } else if (accounts.length === 0) {
    // No wallet :(
    return ""
  } else {
    // `web3` and `account` loaded 🎉
    return (
      <button
        className={`button is-fullwidth ${props.isDark ? "is-dark" : "is-light"}`}
        title={props.title}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.text}
      </button>

    );
  }

}
