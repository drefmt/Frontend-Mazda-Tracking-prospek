
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

export const description = "An interactive bar chart"
//  import  { useFetchProspek }  from  "@/hooks/prospek/useFetchProspek"
//  import  { useFetchRetail }  from  "@/hooks/retail/useFetchRetail"
//  import  { useFetchSpk }  from  "@/hooks/spk/useFetchSpk"
//  import  { useFetchTestDrive }  from  "@/hooks/testDrive/useFetchTestDrive"

// const { data: dataProspek } = useFetchProspek();
// const { data } = useFetchRetail();

const chartData = [
  { date: "2024-04-01", prospek: 222, spk: 150, testDrive: 222, retail: 150 },
  { date: "2024-04-02", prospek: 971, spk: 180, testDrive: 222, retail: 150 },
  { date: "2024-04-03", prospek: 167, spk: 120, testDrive: 222, retail: 150 },
  { date: "2024-04-04", prospek: 242, spk: 260, testDrive: 222, retail: 150 },
  { date: "2024-04-05", prospek: 373, spk: 290, testDrive: 222, retail: 150 },
  { date: "2024-04-06", prospek: 301, spk: 340, testDrive: 222, retail: 150 },
  { date: "2024-04-07", prospek: 245, spk: 180, testDrive: 222, retail: 150 },
  { date: "2024-04-08", prospek: 409, spk: 320, testDrive: 222, retail: 150 },
  { date: "2024-04-09", prospek: 591, spk: 110, testDrive: 222, retail: 150 },
  { date: "2024-04-10", prospek: 261, spk: 190, testDrive: 222, retail: 150 },
  { date: "2024-04-11", prospek: 327, spk: 350, testDrive: 100, retail: 150 },
  { date: "2024-04-12", prospek: 292, spk: 210, testDrive: 222, retail: 150 },
  { date: "2024-04-13", prospek: 342, spk: 380, testDrive: 222, retail: 150 },
  { date: "2024-04-14", prospek: 137, spk: 220, testDrive: 222, retail: 150 },
  { date: "2024-04-15", prospek: 120, spk: 170, testDrive: 222, retail: 150 },
  { date: "2024-04-16", prospek: 138, spk: 190, testDrive: 222, retail: 150 },
  { date: "2024-04-17", prospek: 446, spk: 360, testDrive: 222, retail: 150 },
  { date: "2024-04-18", prospek: 364, spk: 410, testDrive: 222, retail: 150 },
  { date: "2024-04-19", prospek: 243, spk: 180, testDrive: 222, retail: 150 },
  { date: "2024-04-20", prospek: 892, spk: 150, testDrive: 222, retail: 150 },
  { date: "2024-04-21", prospek: 137, spk: 200, testDrive: 222, retail: 150 },
  { date: "2024-04-22", prospek: 224, spk: 170, testDrive: 222, retail: 150 },
  { date: "2024-04-23", prospek: 138, spk: 230, testDrive: 222, retail: 150 },
  { date: "2024-04-24", prospek: 387, spk: 290, testDrive: 222, retail: 150 },
  { date: "2024-04-25", prospek: 215, spk: 250, testDrive: 222, retail: 150 },
  { date: "2024-04-26", prospek: 752, spk: 130, testDrive: 222, retail: 150 },
  { date: "2024-04-27", prospek: 383, spk: 420, testDrive: 222, retail: 150 },
  { date: "2024-04-28", prospek: 122, spk: 180, testDrive: 222, retail: 150 },
  { date: "2024-04-29", prospek: 315, spk: 240, testDrive: 222, retail: 150 },
  { date: "2024-04-30", prospek: 454, spk: 380, testDrive: 222, retail: 150 },
  { date: "2024-05-01", prospek: 165, spk: 220, testDrive: 222, retail: 150 },
  { date: "2024-05-02", prospek: 293, spk: 310, testDrive: 222, retail: 150 },
  { date: "2024-05-03", prospek: 247, spk: 190, testDrive: 222, retail: 150 },
  { date: "2024-05-04", prospek: 385, spk: 420, testDrive: 222, retail: 150 },
  { date: "2024-05-05", prospek: 481, spk: 390, testDrive: 222, retail: 150 },
  { date: "2024-05-06", prospek: 498, spk: 520, testDrive: 222, retail: 150 },
  { date: "2024-05-07", prospek: 388, spk: 300, testDrive: 222, retail: 150 },
  { date: "2024-05-08", prospek: 149, spk: 210, testDrive: 222, retail: 150 },
  { date: "2024-05-09", prospek: 227, spk: 180, testDrive: 222, retail: 150 },
  { date: "2024-05-10", prospek: 293, spk: 330, testDrive: 222, retail: 150 },
  { date: "2024-05-11", prospek: 335, spk: 270, testDrive: 222, retail: 150 },
  { date: "2024-05-12", prospek: 197, spk: 240, testDrive: 222, retail: 150 },
  { date: "2024-05-13", prospek: 197, spk: 160, testDrive: 222, retail: 150 },
  { date: "2024-05-14", prospek: 448, spk: 490, testDrive: 222, retail: 150 },
  { date: "2024-05-15", prospek: 473, spk: 380, testDrive: 222, retail: 150 },
  { date: "2024-05-16", prospek: 338, spk: 400, testDrive: 222, retail: 150 },
  { date: "2024-05-17", prospek: 499, spk: 420, testDrive: 222, retail: 150 },
  { date: "2024-05-18", prospek: 315, spk: 350, testDrive: 222, retail: 150 },
  { date: "2024-05-19", prospek: 235, spk: 180, testDrive: 222, retail: 150 },
  { date: "2024-05-20", prospek: 177, spk: 230, testDrive: 222, retail: 150 },
  { date: "2024-05-21", prospek: 882, spk: 140, testDrive: 222, retail: 150 },
  { date: "2024-05-22", prospek: 812, spk: 120, testDrive: 222, retail: 150 },
  { date: "2024-05-23", prospek: 252, spk: 290, testDrive: 222, retail: 150 },
  { date: "2024-05-24", prospek: 294, spk: 220, testDrive: 222, retail: 150 },
  { date: "2024-05-25", prospek: 201, spk: 250, testDrive: 222, retail: 150 },
  { date: "2024-05-26", prospek: 213, spk: 170, testDrive: 222, retail: 150 },
  { date: "2024-05-27", prospek: 420, spk: 460, testDrive: 222, retail: 150 },
  { date: "2024-05-28", prospek: 233, spk: 190, testDrive: 222, retail: 150 },
  { date: "2024-05-29", prospek: 781, spk: 130, testDrive: 222, retail: 150 },
  { date: "2024-05-30", prospek: 340, spk: 280, testDrive: 222, retail: 150 },
  { date: "2024-05-31", prospek: 178, spk: 230, testDrive: 222, retail: 150 },
  { date: "2024-06-01", prospek: 178, spk: 200, testDrive: 222, retail: 150 },
  { date: "2024-06-02", prospek: 470, spk: 410, testDrive: 222, retail: 150 },
  { date: "2024-06-03", prospek: 103, spk: 160, testDrive: 222, retail: 150 },
  { date: "2024-06-04", prospek: 439, spk: 380, testDrive: 222, retail: 150 },
  { date: "2024-06-05", prospek: 883, spk: 140, testDrive: 222, retail: 150 },
  { date: "2024-06-06", prospek: 294, spk: 250, testDrive: 222, retail: 150 },
  { date: "2024-06-07", prospek: 323, spk: 370, testDrive: 222, retail: 150 },
  { date: "2024-06-08", prospek: 385, spk: 320, testDrive: 222, retail: 150 },
  { date: "2024-06-09", prospek: 438, spk: 480, testDrive: 222, retail: 150 },
  { date: "2024-06-10", prospek: 155, spk: 200, testDrive: 222, retail: 150 },
  { date: "2024-06-11", prospek: 928, spk: 150, testDrive: 222, retail: 150 },
  { date: "2024-06-12", prospek: 492, spk: 420, testDrive: 222, retail: 150 },
  { date: "2024-06-13", prospek: 181, spk: 130, testDrive: 222, retail: 150 },
  { date: "2024-06-14", prospek: 426, spk: 380, testDrive: 222, retail: 150 },
  { date: "2024-06-15", prospek: 307, spk: 350, testDrive: 222, retail: 150 },
  { date: "2024-06-16", prospek: 371, spk: 310, testDrive: 222, retail: 150 },
  { date: "2024-06-17", prospek: 475, spk: 520, testDrive: 222, retail: 150 },
  { date: "2024-06-18", prospek: 107, spk: 170, testDrive: 222, retail: 150 },
  { date: "2024-06-19", prospek: 341, spk: 290, testDrive: 222, retail: 150 },
  { date: "2024-06-20", prospek: 408, spk: 450, testDrive: 222, retail: 150 },
  { date: "2024-06-21", prospek: 169, spk: 210, testDrive: 222, retail: 150 },
  { date: "2024-06-22", prospek: 317, spk: 270, testDrive: 222, retail: 150 },
  { date: "2024-06-23", prospek: 480, spk: 530, testDrive: 222, retail: 150 },
  { date: "2024-06-24", prospek: 132, spk: 180, testDrive: 222, retail: 150 },
  { date: "2024-06-25", prospek: 141, spk: 190, testDrive: 222, retail: 150 },
  { date: "2024-06-26", prospek: 434, spk: 380, testDrive: 222, retail: 150 },
  { date: "2024-06-27", prospek: 448, spk: 490, testDrive: 222, retail: 150 },
  { date: "2024-06-28", prospek: 149, spk: 200, testDrive: 222, retail: 150 },
  { date: "2024-06-29", prospek: 103, spk: 160, testDrive: 222, retail: 150 },
  { date: "2024-06-30", prospek: 446, spk: 400, testDrive: 222, retail: 150 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  prospek: {
    label: "Prospek",
    color: "hsl(var(--chart-1))",
  },
  spk: {
   label: "SPK",
    color: "hsl(var(--chart-2))",
  },
  testDrive: {
    label: "Test-Drive",
    color: "hsl(var(--chart-2))",
  },
  retail: {
    label: "Retail",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Chart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("prospek")

  const total = React.useMemo(
    () => ({
      prospek: chartData.reduce((acc, curr) => acc + curr.prospek, 0),
      spk: chartData.reduce((acc, curr) => acc + curr.spk, 0),
      testDrive: chartData.reduce((acc, curr) => acc + curr.testDrive, 0),
      retail: chartData.reduce((acc, curr) => acc + curr.retail, 0),
    }),
    []
  )

  return (
    <Card className="mb-32">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b border-gray-300 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex overflow-auto">
          {["prospek", "spk","testDrive","retail"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-gray-300 px-6 py-4 text-left border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
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
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
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
