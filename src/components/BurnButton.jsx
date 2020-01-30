import React, { useState, useEffect } from 'react';

const add = require('../addresses.json')

export { BurnButton as default };

async function burnMakerProtocol() {
  const title = document.title
  try {
    const provider = window.pit.provider;
    document.title = "Dai Stats"
    await window.ethereum.enable()
    document.title = title
    const signer = provider.getSigner();
    const pitWrite = window.pit.connect(signer);
    const tx = await pitWrite.burn(add.MCD_GOV); 
    await provider.waitForTransaction(tx.hash);
  } catch (error) {
    console.error(error)
    document.title = title
  }
}

function BurnButton(props) {
  const [ isBurning, setBurning ] = useState(false);

  useEffect(() => {
    if (isBurning) {
      burnMakerProtocol().then(() => {
        setBurning(false);
      });
    }
  }, [isBurning]);

  const handleClick = () => {
    setBurning(true);
  }

  return (
    <button
      className={`button is-fullwidth ${props.isDark ? "is-dark" : "is-light"}`}
      title="Burn MKR in GemPit"
      disabled={isBurning}
      onClick={!isBurning ? handleClick : null}
    >
      {isBurning ? 'Burning…' : 'Burn'}
    </button>
  );
}
