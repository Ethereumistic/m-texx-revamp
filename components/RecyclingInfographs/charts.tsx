"use client"

// Split from the recycling sections so recharts (~92 KB gzip) loads after the page
// instead of with it. Charts measure the DOM, so they render nothing on the server anyway.
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function DonutChart({ data, color }: { data: { name: string; value: number }[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={70}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          <Cell key={`cell-0`} fill={color} />
          <Cell key={`cell-1`} fill="var(--chart-empty)" className="dark:opacity-20" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export function IndustryBarChart({ data, color }: { data: { name: string; value: number }[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
      >
        <XAxis type="number" hide />
        <YAxis
          dataKey="name"
          type="category"
          width={150}
          tick={{
            fill: "var(--muted-foreground)",
            fontSize: 12,
          }}
        />
        <Bar dataKey="value" fill={color} radius={[4, 4, 4, 4]}>
          <LabelList
            dataKey="value"
            position="right"
            formatter={(value: number) => `${value}%`}
            style={{
              fill: "var(--muted-foreground)",
              fontSize: 12,
              fontWeight: 500,
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

type ProgressPoint = { year: number; percentage: number | null; projected: number | null }

export function ProgressChart({
  activeView,
  allData,
  currentData,
  animate,
}: {
  activeView: "all" | "current"
  allData: ProgressPoint[]
  currentData: ProgressPoint[]
  animate: boolean
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {activeView === "all" ? (
        <ComposedChart data={allData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--emerald)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--emerald)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--blue)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="year"
            tick={{ fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            domain={[0, 8]}
            tick={{ fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, "Рециклиран текстил"]}
            labelFormatter={(label) => `Година: ${label}`}
            contentStyle={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              borderRadius: "0.5rem",
              color: "var(--foreground)",
            }}
          />

          {/* Projected data area */}
          <Area
            type="monotone"
            dataKey="projected"
            stroke="var(--emerald)"
            strokeWidth={2}
            strokeDasharray="5 5"
            fillOpacity={1}
            fill="url(#colorProjected)"
            isAnimationActive={animate}
            connectNulls={true}
          />

          {/* Current data line */}
          <Line
            type="monotone"
            dataKey="percentage"
            stroke="var(--blue)"
            strokeWidth={3}
            dot={{ r: 6, fill: "var(--blue)", strokeWidth: 2, stroke: "var(--background)" }}
            activeDot={{ r: 8 }}
            isAnimationActive={animate}
          />
        </ComposedChart>
      ) : (
        <ComposedChart data={currentData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--blue)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="year"
            tick={{ fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            domain={[0, 8]}
            tick={{ fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, "Рециклиран текстил"]}
            labelFormatter={(label) => `Година: ${label}`}
            contentStyle={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              borderRadius: "0.5rem",
              color: "var(--foreground)",
            }}
          />

          {/* Current data with area */}
          <Area
            type="monotone"
            dataKey="percentage"
            stroke="var(--blue)"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorCurrent)"
            isAnimationActive={animate}
          />

          {/* Current data line */}
          <Line
            type="monotone"
            dataKey="percentage"
            stroke="var(--blue)"
            strokeWidth={3}
            dot={{ r: 6, fill: "var(--blue)", strokeWidth: 2, stroke: "var(--background)" }}
            activeDot={{ r: 8 }}
            isAnimationActive={animate}
          />
        </ComposedChart>
      )}
    </ResponsiveContainer>
  )
}

// Chart component based on benefit type
export const BenefitChart = ({ benefit }: { benefit: { id: string; color: string; chartData: any[] } }) => {
  // Define a consistent color palette for each chart type
  const COLORS = [
    benefit.color,
    `${benefit.color}CC`,
    `${benefit.color}99`,
    `${benefit.color}66`,
  ]

  const POLLUTION_COLORS = [
    "var(--yellow)",
    "var(--red)",
    "var(--emerald)",
    "var(--blue)",
  ]
  const POLLUTION_EMOJIS = [
    "🗑️",
    "🔥",
    "♻️",
    "🔁",
  ]
  const WATER_EMOJIS = [
    "👖",
    "👕",
    "👔",
    "🧥",
  ]

  if (benefit.id === "resources") {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={benefit.chartData} margin={{ top: 20, right: 20, left: 40, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              label={{ value: "Литри вода", angle: -90, position: "insideLeft", fill: "var(--muted-foreground)" }}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
            />
            <Tooltip
              formatter={(value) => [`${value} литра`, "Консумация на вода"]}
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "0.5rem",
                color: "var(--foreground)",
              }}
            />
            <Bar dataKey="value" fill={benefit.color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (benefit.id === "pollution") {
    return (
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={benefit.chartData}
              cx="40%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {benefit.chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={POLLUTION_COLORS[index % POLLUTION_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, entry) => {
                const index = benefit.chartData.findIndex(item => item.name === entry.payload.name);
                const color = POLLUTION_COLORS[index % POLLUTION_COLORS.length];
                const emoji = POLLUTION_EMOJIS[index % POLLUTION_EMOJIS.length];
                return [
                  <span key={`tooltip-${entry.payload.name}`} style={{ color: color, fontWeight: 500 }}>{`${emoji} ${entry.payload.name}: ${value}%`}</span>,
                ];
              }}
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "0.5rem",
                padding: "8px 12px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  if (benefit.id === "pricing") {
    const partnershipData = [
      { name: "2020", value: 10 },
      { name: "2021", value: 25 },
      { name: "2022", value: 45 },
      { name: "2023", value: 65 },
      { name: "2024", value: 80 },
      { name: "2025", value: 85 },
    ]

    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={partnershipData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              label={{
                value: "Брой общини партньори",
                angle: -90,
                position: "insideLeft",
                fill: "var(--muted-foreground)",
              }}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
            />
            <Tooltip
              formatter={(value) => [`${value} общини`, "Партньорства"]}
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "0.5rem",
                color: "var(--foreground)",
              }}
            />
            <Bar dataKey="value" fill="var(--yellow)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return null
}
