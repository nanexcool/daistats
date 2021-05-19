import React from 'react'
import { useTranslate } from 'react-polyglot';

function nextPrice(price, priceNxt) {
  // hack to ignore small difference when comparing ray with wad
  if (Number(price).toFixed(4) === Number(priceNxt).toFixed(4)) {
    return '';
  } else if (Number(price) > Number(priceNxt)) {
    return 'has-text-danger';
  }
  return 'has-text-success';
}

function Pip(props) {
  const t = useTranslate()
  return (
      <div className="column">
        <div className="box has-text-centered">
          <h3 className="title" title={props.price}>${props.formater.format(props.price)}</h3>
          <p className="title subtitle is-size-4">{t('daistats.token_price', { token: props.token })}</p>
          {props.priceNxt > 0 && <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
            className={nextPrice(props.price, props.priceNxt)} title={props.priceNxt}>${props.formater.format(props.priceNxt)}</span>
          </p>}
        </div>
      </div>
  )
}

export default Pip
