import React, { useState, useEffect } from 'react';

export { HealButton as default };

async function healMakerProtocol(debt) {
  const title = document.title
  try {
    console.log(debt);
    const provider = window.vow.provider;
    document.title = "GSUc Stats"
    await window.ethereum.enable()
    document.title = title
    const signer = provider.getSigner();
    const vowWrite = window.vow.connect(signer);
    const tx = await vowWrite.heal(debt);
    await provider.waitForTransaction(tx.hash);
  } catch (error) {
    console.error(error)
    document.title = title
  }
}

function HealButton(props) {
  const [ isHealing, setHealing ] = useState(false);
  const [ healAmount, setHealAmount ] = useState('');

  useEffect(() => {
    if (isHealing) {
      healMakerProtocol(healAmount).then(() => {
        setHealing(false);
      });
    }
  }, [isHealing, healAmount]);

  const handleClick = () => {
    setHealAmount(props.sysDebtRaw);
    setHealing(true);
  }

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
