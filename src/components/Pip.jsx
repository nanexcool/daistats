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
  const ilk = props.ilks[props.idx]
  return (
      <div className="column">
        <div className="box has-text-centered">
          <h3 className="title" title={ilk.price}>${props.formater.format(ilk.price)}</h3>
          <p className="title subtitle is-size-4">{t('daistats.token_price', { token: props.token })}</p>
          {ilk.priceNxt > 0 && <p className="subtitle is-size-6">{t('daistats.next_osm_price')}: <span
            className={nextPrice(ilk.price, ilk.priceNxt)} title={ilk.priceNxt}>${props.formater.format(ilk.priceNxt)}</span>
          </p>}
          {ilk.zzz && (Number(ilk.price).toFixed(4) !== Number(ilk.priceNxt).toFixed(4)) &&
              <p className="title subtitle is-size-6">Next Possible Update: {ilk.zzz}</p>}
          {ilk.priceMedian && <p className="title subtitle is-size-6">Median: ${props.formater.format(ilk.priceMedian)}</p>}
        </div>
      </div>
  )
}

export default Pip
