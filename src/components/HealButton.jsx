import React, { useState, useContext } from 'react';
import MetaMaskContext from './MetaMaskContext';

export { HealButton as default };

function HealButton(props) {
  const [ isHealing, setHealing ] = useState(false);
  const { web3, accounts, error, awaiting, openMetaMask } = useContext(
    MetaMaskContext,
  );

  async function healMakerProtocol(debt) {
    const vowContract = new web3.eth.Contract(require(`../abi/Vow.json`), web3.utils.toChecksumAddress(window.vow.address))
    vowContract.methods.heal(debt).send({from: accounts[0]})
      .then(function(receipt) {
        console.log(receipt)
      })
      .finally(function() {
        setHealing(false)
      })
  }

  const handleClick = () => {
    setHealing(true);
    healMakerProtocol(props.sysDebtRaw);
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
        Enable MetaMask to Heal
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
        title="Reduce System Debt by taking from System Surplus"
        disabled={isHealing}
        onClick={!isHealing ? handleClick : null}
      >
        {isHealing ? 'Healing…' : 'Heal'}
      </button>

    );
  }

}
