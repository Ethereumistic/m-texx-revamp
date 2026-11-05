"use client"

// Split from TextileWasteVisualization so recharts (~92 KB gzip) loads after the page
// instead of with it. Charts measure the DOM, so they render nothing on the server anyway.
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function WasteVolumeChart({
  wasteComparisonData,
}: {
  wasteComparisonData: { name: string; value: number; color: string }[]
}) {
  return (
    <ChartContainer
      config={{
        "Текстилни отпадъци": { color: "#ef4444" },
        "Пластмасови отпадъци": { color: "#f59e0b" },
        "Хартиени отпадъци": { color: "#3b82f6" },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={wasteComparisonData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tickFormatter={(value) => `${value / 1000}k тона`} />
          <YAxis dataKey="name" type="category" width={140} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => <span>{value.toLocaleString()} тона</span>}
              />
            }
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {wasteComparisonData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export function RecyclingRatesChart({
  recyclingRatesData,
}: {
  recyclingRatesData: { name: string; rate: number; color: string }[]
}) {
  return (
    <ChartContainer
      config={recyclingRatesData.reduce(
        (acc, item) => {
          acc[item.name] = { color: item.color }
          return acc
        },
        {} as Record<string, { color: string }>,
      )}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={recyclingRatesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
          <ChartTooltip
            content={<ChartTooltipContent formatter={(value) => <span>{value}% рециклиране</span>} />}
          />
          <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
            {recyclingRatesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
