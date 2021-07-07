import React, { useCallback, useMemo } from "react"
import { useTranslate } from "react-polyglot"
import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell} from "recharts"

// from bluma
const COLORS = ["hsl(171, 100%, 41%)",
    "hsl(217, 71%, 53%)",
    "hsl(204, 86%, 53%)",
    "hsl(141, 71%, 48%)",
    "hsl(48, 100%, 67%)",
    "hsl(348, 100%, 61%)"]

const ILK_TO_COLOUR = {
    "PSM-USDC-A": "hsl(171, 100%, 41%)",
    "ETH-A": "hsl(217, 71%, 53%)",
    "USDC-A": "hsl(204, 86%, 53%)",
    "WBTC-A": "hsl(141, 71%, 48%)",
    "ETH-C": "hsl(48, 100%, 67%)",
    "Others": "hsl(348, 100%, 61%)"}

// bluma light
const COLORS_LIGHT = [ "hsl(171, 100%, 96%)",
    "hsl(219, 70%, 96%)",
    "hsl(206, 70%, 96%)",
    "hsl(142, 52%, 96%)",
    "hsl(48, 100%, 96%)",
    "hsl(347, 90%, 96%)"]

// bluma dark
const COLORS_DARK = [
    "hsl(171, 100%, 29%)",
    "hsl(217, 71%, 45%)",
    "hsl(204, 71%, 39%)",
    "hsl(141, 53%, 31%)",
    "hsl(48, 100%, 29%)",
    "hsl(348, 86%, 43%)"]

const CollateralChart = ({ ilks, debt, useValue }) => {
  const t = useTranslate()

  const locale = useMemo(() => (
      t._polyglot.currentLocale
    ),
    [t]
  )

  const formatPercent = useMemo(() => (
      new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
      })), [locale]
  )

  const formatTwoDp = useMemo(() => (
    new Intl.NumberFormat(locale, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })), [locale]
  )

  function ilkPercent(ilk) {
    if (useValue) {
      return {"name": ilk['ilk'],
              "valueLocked": ilk.value,
              "value": ilk.value / debt * 100}
    } else {
      return {"name": ilk['ilk'],
              "valueLocked": ilk.value,
              "value": ilk.Art * ilk.rate / debt * 100}
    }
  }

  function ilkThreshold(v) {
    return v["value"] >= 2.0
  }

  function label(i) {
    return i["name"]
  }

  function tooltip(value, name, props) {
    return formatPercent.format(value / 100) //+ " " + formatTwoDp.format(props.value) + "B"
  }

  function sortByTokenPercent(a, b) {
    return b.value - a.value;
  }

  const all = ilks.map(ilkPercent)
  all.sort(sortByTokenPercent)
  const others = all.filter(i => !ilkThreshold(i))
  const data = all.filter(ilkThreshold)
  data.push({"name": "Others",
             "value": others.reduce((t, v) => t + v["value"], 0)})

  // FIXME use grey instead of fill colour for labels? set stroke colour?
  //{data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
  // FIXME hardwired colour map to match key between charts
  return (
    <div style={{
      height: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name"
            label={label} labelLine={false}
            animationDuration={750}
            startAngle={50} endAngle={410}>
             {data.map((entry, index) => <Cell fill={ILK_TO_COLOUR[entry.name]}/>)}
          </Pie>
          <Tooltip formatter={tooltip}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CollateralChart
