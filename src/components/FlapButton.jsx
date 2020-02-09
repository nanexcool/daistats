import React, { useState, useContext } from 'react';
import MetaMaskContext from './MetaMaskContext';
import MetaMaskButton from './MetaMaskButton';

export { FlapButton as default };

function FlapButton(props) {
  const [ isFlapping, setFlapping ] = useState(false);
  const minSurplus = Number(props.surplusBuffer) + Number(props.surplusBump);
  const { web3, accounts } = useContext(
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

  return (
    <MetaMaskButton
      isDark={props.isDark}
      title="Start a System Surplus Auction"
      disabled={!canFlap()}
      text={getMessage()}
      onClick={canFlap() ? handleClick : null}
    />
  )
}
