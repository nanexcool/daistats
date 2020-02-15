import React, { useState, useContext } from 'react';
import MetaMaskContext from './MetaMaskContext';
import MetaMaskButton from './MetaMaskButton';

export { BurnButton as default };

function BurnButton(props) {
  const [ isBurning, setBurning ] = useState(false);
  const { web3, accounts } = useContext(
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

  return (
    <MetaMaskButton
      isDark={props.isDark}
      title="Burn MKR from SCD Fees"
      disabled={isBurning}
      text={isBurning ? 'Burning…' : 'Burn'}
      onClick={!isBurning ? handleClick : null}
    />
  )
}
