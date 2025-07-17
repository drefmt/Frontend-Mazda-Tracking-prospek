"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useFetchYearlyActivity } from "@/hooks/dashboard/useFetchYearlyActivity" // pastikan path-nya benar

const chartConfig = {
  prospek: {
    label: "Prospek",
    color: "hsl(var(--chart-1))",
  },
  testDrive: {
    label: "Test Drive",
    color: "hsl(var(--chart-2))",
  },
  spk: {
    label: "SPK",
    color: "hsl(var(--chart-3))",
  },
  retail: {
    label: "Retail",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function YearlyActivityChart() {
  const { data, isLoading, isError } = useFetchYearlyActivity()
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("prospek")

  const chartData = data?.chartData ?? []

  const total = React.useMemo(() => {
    return {
      prospek: chartData.reduce((acc, cur) => acc + cur.prospek, 0),
      testDrive: chartData.reduce((acc, cur) => acc + cur.testDrive, 0),
      spk: chartData.reduce((acc, cur) => acc + cur.spk, 0),
      retail: chartData.reduce((acc, cur) => acc + cur.retail, 0),
    }
  }, [chartData])

  if (isLoading) {
    return <p className="p-4">Loading chart...</p>
  }

  if (isError) {
    return <p className="p-4 text-red-500">Failed to load chart data</p>
  }

  return (
    <Card className="mb-32">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b border-slate-900 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Aktivitas Tahunan</CardTitle>
          <CardDescription>
            Menampilkan total aktivitas berdasarkan jenis dalam 1 tahun
          </CardDescription>
        </div>
        <div className="flex">
          {(Object.keys(chartConfig) as Array<keyof typeof chartConfig>).map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-slate-900 px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("id-ID", {
                  month: "short",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("id-ID", {
                      month: "short",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
