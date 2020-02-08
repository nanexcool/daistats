import React, { useState, useContext } from 'react';
import MetaMaskContext from './MetaMaskContext';

export { BurnButton as default };

function BurnButton(props) {
  const [ isBurning, setBurning ] = useState(false);
  const { web3, accounts, error, awaiting, openMetaMask } = useContext(
    MetaMaskContext,
  );

  async function burnMakerProtocol(gov) {
    const pitContract = new web3.eth.Contract(require(`../abi/GemPit.json`), web3.utils.toChecksumAddress(window.pit.address))
    pitContract.methods.burn(gov).send({from: accounts[0]})
      .then(function(receipt) {
        console.log(receipt)
      })
      .finally(function() {
        setBurning(false)
      })
  }

  const handleClick = () => {
    setBurning(true);
    burnMakerProtocol(props.gov)
  }

  if ((error && error.message === "MetaMask not installed")) {
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
        Enable MetaMask to Burn
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
        title="Burn MKR from SCD Fees"
        disabled={isBurning}
        onClick={!isBurning ? handleClick : null}
      >
        {isBurning ? 'Burning…' : 'Burn'}
      </button>
    );
  }
}
