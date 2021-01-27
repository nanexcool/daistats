import React, { useCallback, useMemo } from "react"
import { useTranslate } from "react-polyglot"
import { Area, ComposedChart, Line, ResponsiveContainer, Tooltip } from "recharts"

const HistoricalDebtChart = ({ data,  wrapperStyle }) => {
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

  const formatLabel = useCallback(
    (value) => {
      return dateFormatter.format(data[value]["timestamp"] * 1000)
    },
    [data, dateFormatter]
  )

  const formatValue = useCallback(
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
      ...wrapperStyle,
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
            formatter={formatValue}
            labelFormatter={formatLabel}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HistoricalDebtChart
