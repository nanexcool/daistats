import React, { useState, useEffect } from 'react';

export { FlapButton as default };

async function flapMakerProtocol(debt, surplus) {
  const title = document.title
  try {
    console.log('debtAmt', debt);
    console.log('surplusAmt', surplus);
    const provider = window.vow.provider;
    document.title = "GSUc Stats"
    await window.ethereum.enable()
    document.title = title
    const signer = provider.getSigner();
    const vowWrite = window.vow.connect(signer);
    const tx = await vowWrite.flap();
    await provider.waitForTransaction(tx.hash);
  } catch (error) {
    console.error(error)
    document.title = title
  }
}

function FlapButton(props) {
  const [ isFlapping, setFlapping ] = useState(false);
  const [ debtAmount, surplusAmount ] = useState('');
  const minSurplus = Number(props.surplusBuffer) + Number(props.surplusBump);

  useEffect(() => {
    if (isFlapping) {
      flapMakerProtocol().then(() => {
        setFlapping(false);
      });
    }
  }, [isFlapping, debtAmount, surplusAmount]);

  const handleClick = () => {
    setFlapping(true);
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
