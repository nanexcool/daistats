import React, { useState, useContext } from 'react';
import MetaMaskContext from './MetaMaskContext';

export { FlapButton as default };

function FlapButton(props) {
  const [ isFlapping, setFlapping ] = useState(false);
  const minSurplus = Number(props.surplusBuffer) + Number(props.surplusBump);
  const { web3, accounts, error, awaiting, openMetaMask } = useContext(
    MetaMaskContext,
  );

  async function flapMakerProtocol(debt, surplus) {
    console.log('debtAmt', debt);
    console.log('surplusAmt', surplus);
    const vowContract = new web3.eth.Contract(require(`../abi/Vow.json`), web3.utils.toChecksumAddress(window.vow.address))
    vowContract.methods.flap().send({from: accounts[0]})
      .then(function(receipt) {
        console.log(receipt)
      })
      .finally(function() {
        setFlapping(false)
      })
  }

  const handleClick = () => {
    setFlapping(true);
    flapMakerProtocol(props.sysDebt, props.sysSurplus);
  }

  const canFlap = () => {
    if(!isFlapping && Number(props.sysDebt) === 0 && Number(props.sysSurplus) >= minSurplus) {
      return true
    }
  }

  const getMessage = () => {
    if(isFlapping) {
      return 'Starting Auction…'
    } else if (Number(props.sysDebt) !== 0) {
      return 'Debt must be healed'
    } else if (Number(props.sysSurplus) < minSurplus) {
      return 'Not Enough Surplus'
    } else {
      return 'Kick-off Auction'
    }
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
        Enable MetaMask to Flap
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
        title="Start a System Surplus Auction"
        disabled={!canFlap()}
        onClick={canFlap() ? handleClick : null}
      >
        {getMessage()}
      </button>

    );
  }
}
