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

  const all = ilks.map(ilkPercent)
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
          </Pie>
             // FIXME use grey instead of fill colour for labels
             //{data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]}/>)}
          <Tooltip formatter={tooltip}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CollateralChart
