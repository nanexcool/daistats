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

const CollateralChart = ({ ilks, debt }) => {
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
      })
    ),
    [locale]
  )

  function ilkPercent(ilk) {
    return {"name": ilk['ilk'],
            "value": ilk.Art * ilk.rate / debt * 100}
  }

  function ilkThreshold(v) {
    return v["value"] >= 2.0
  }

  function label(i) {
      return i["name"]
  }

  function tooltip(value, name, props) {
      return formatPercent.format(value / 100)
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

  return (
    <div style={{
      height: 200,
      marginTop: -30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name"
            label={label} labelLine={false}
            animationDuration={1000}
            startAngle={50} endAngle={410}>
             // FIXME use grey instead of fill colour for labels? set stroke colour?
             {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
          </Pie>
          <Tooltip formatter={tooltip}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CollateralChart
