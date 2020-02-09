import React, { useState, useContext } from 'react';
import MetaMaskContext from './MetaMaskContext';
import MetaMaskButton from './MetaMaskButton';

export { HealButton as default };

function HealButton(props) {
  const [ isHealing, setHealing ] = useState(false);
  const { web3, accounts } = useContext(
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

  return (
    <MetaMaskButton
      isDark={props.isDark}
      title="Reduce System Debt by taking from System Surplus"
      disabled={isHealing}
      text={isHealing ? 'Healing…' : 'Heal'}
      onClick={!isHealing ? handleClick : null}
      />
  )
}
