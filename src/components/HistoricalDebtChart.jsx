import React, { useCallback, useMemo } from "react"
import { useTranslate } from "react-polyglot"
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const HistoricalDebtChart = ({ data }) => {
  const t = useTranslate()

  const locale = useMemo(() => (
      t._polyglot.currentLocale
    ),
    [t]
  )

  const amountFormatter = useMemo(() => (
      new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
    ),
    [locale]
  )

  const dateFormatter = useMemo(() => (
      new Intl.DateTimeFormat(locale, {
        dateStyle: "long"
      })
    ),
    [locale]
  )

  const monthFormatter = useMemo(() => (
      new Intl.DateTimeFormat(locale, {
        month: "short",
        year: "2-digit"
      })
    ),
    [locale]
  )

  const ticks = useMemo(
    () => (
      data.reduce((output, point, index, points) => {
        const c = new Date(point?.timestamp * 1000)
        const p =  new Date(points?.[index - 1]?.["timestamp"] * 1000)

        if (c.getFullYear() !== p.getFullYear() || c.getMonth() !== p.getMonth()) {
          output.push(index)
        }

        return output
      }, [])
    ),
    [data]
  )

  const formatTick = useCallback(
    (index) => {
      const timestamp = new Date(data[index]["timestamp"] * 1000)
      const month = new Date(timestamp.getFullYear(), timestamp.getMonth())

      return monthFormatter.format(month)
    },
    [monthFormatter]
  )

  const formatTooltipTitle = useCallback(
    (index) => {
      const timestamp = new Date(data[index]["timestamp"] * 1000)

      return dateFormatter.format(timestamp)
    },
    [data, dateFormatter]
  )

  const formatTooltipValue = useCallback(
    (value, name) => {
      let output = amountFormatter.format(value)

      if (name === "debtCeiling") {
        return [output, t("maker.debt_ceiling")]
      }

      if (name === "totalDebt") {
        return [output, t("daistats.total_token", { token: "Dai" })]
      }

      return output
    },
    [amountFormatter, t]
  )

  if (!data?.length) {
    return null
  }

  return (
    <div style={{
      width: "100%",
      height: 180,
      marginTop: -24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="totalDebtColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1AAB9B" stopOpacity={0.95} />
              <stop offset="95%" stopColor="#087C6D" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <XAxis
            axisLine={false}
            ticks={ticks}
            tickFormatter={formatTick}
            style={{ userSelect: 'none' }}
          />
          <Line
            dataKey="debtCeiling"
            type="step"
            dot={false}
            stackId={1}
            animationDuration={1000}
            stroke="#7E7E87"
          />
          <Area
            dataKey="totalDebt"
            type="monotone"
            stackId={2}
            animationDuration={1000}
            stroke="#008E7B"
            fill="url(#totalDebtColor)"
            fillOpacity={1}
          />
          <Tooltip
            labelStyle={{ fontWeight: "bold" }}
            formatter={formatTooltipValue}
            labelFormatter={formatTooltipTitle}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HistoricalDebtChart
