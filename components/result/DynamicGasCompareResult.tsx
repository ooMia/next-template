"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

export const description = "A bar chart with a custom label";

const chartData: {
  method: string;
  enableHook: number;
  disableHook: number;
}[] = [
  { method: "Swap", enableHook: 186, disableHook: 80 },
  { method: "AddLiquidity", enableHook: 305, disableHook: 200 },
  { method: "RemoveLiquidity", enableHook: 237, disableHook: 120 },
  { method: "Donate", enableHook: 190, disableHook: 73 },
];

const chartConfig = {
  enableHook: {
    label: "enableHook",
    color: "hsl(var(--chart-1))",
  },
  disableHook: {
    label: "disableHook",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "white",
  },
} satisfies ChartConfig;

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Component
        cardTitle="Estimated Gas Usage"
        cardDescription="per method gas consumption enabled/disabled hooks"
      >
        <GasDifferenceSummary />
      </Component>
    </div>
  );
}

function Component({
  cardTitle,
  cardDescription,
  children,
}: {
  cardTitle: string;
  cardDescription: string;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="method"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="enableHook" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="enableHook"
              layout="vertical"
              fill="hsl(var(--chart-5))"
              className="opacity-50 hover:opacity-100"
              radius={4}
            >
              <LabelList
                dataKey="method"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="enableHook"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey="disableHook"
              layout="vertical"
              fill="hsl(var(--chart-1))"
              className="opacity-50 hover:opacity-100"
              radius={4}
            >
              <LabelList
                dataKey="method"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="disableHook"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{children}</div>
      </CardFooter>
    </Card>
  );
}

function GasDifferenceSummary(): React.ReactNode {
  // summary per method difference
  // const methodDifferences = chartData.map(
  //   ({ method, enableHook, disableHook }) =>
  //     `${method}: ${enableHook - disableHook}`
  // );

  // // summary min/max difference

  // const minDifference = Math.min(
  //   ...chartData.map(({ enableHook, disableHook }) => enableHook - disableHook)
  // );
  // const maxDifference = Math.max(
  //   ...chartData.map(({ enableHook, disableHook }) => enableHook - disableHook)
  // );

  // // summary total difference
  // const totalEnableHook = chartData.reduce(
  //   (acc, { enableHook }) => acc + enableHook,
  //   0
  // );
  // const totalDisableHook = chartData.reduce(
  //   (acc, { disableHook }) => acc + disableHook,
  //   0
  // );
  // const totalDifference = totalEnableHook - totalDisableHook;

  const chartData2 = [
    { method: "Swap", gas: 186 },
    { method: "AddLiquidity", gas: 305 },
    { method: "RemoveLiquidity", gas: 237 },
    { method: "Donate", gas: 190 },
  ];

  const chartConfig2 = {
    method: {
      label: "method",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gas Difference Summary</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig2}>
          <BarChart accessibilityLayer data={chartData2}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="method"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="gas" fill="hsl(var(--chart-3))" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
