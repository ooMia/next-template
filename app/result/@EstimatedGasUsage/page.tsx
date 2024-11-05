"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  TransactionGasCostToChartProps,
  TransactionGasCostToChartData,
} from "@/types/DynamicAnalysis";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  YAxis,
  XAxis,
  Bar,
  LabelList,
  BarChart,
} from "recharts";

function givenData(): TransactionGasCostToChartProps {
  const chartData: TransactionGasCostToChartData[] = [
    { method: "swap", enableHook: 8186, disableHook: 5480 },
    { method: "addLiquidity", enableHook: 7556, disableHook: 5289 },
    { method: "removeLiquidity", enableHook: 6237, disableHook: 5120 },
    { method: "donate", enableHook: 5190, disableHook: 5190 },
  ];
  return { data: chartData };
}

export const description = "A bar chart with a custom label";

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

function Component({
  cardTitle,
  cardDescription,
  children,
  chartData,
}: {
  cardTitle: string;
  cardDescription: string;
  children?: React.ReactNode;
  chartData: TransactionGasCostToChartData[];
}) {
  return (
    <Card className="p-4">
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
          Maximum gas: Swap 8186 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          min:donate:5190 | average:6792.25 | median:6417.5
        </div>
        <div className="leading-none text-muted-foreground">{children}</div>
      </CardFooter>
    </Card>
  );
}
export default function GasDifferenceChart() {
  const data: TransactionGasCostToChartProps = givenData();
  return (
    <div className="flex flex-col items-center justify-center">
      <Component
        cardTitle="Estimated Gas Usage"
        cardDescription="per method gas consumption enabled/disabled hooks"
        chartData={data.data}
      >
        <GasDifferenceSummary />
      </Component>
    </div>
  );
}

function GasDifferenceSummary(): React.ReactNode {
  // const chartData = givenData().data;
  // const methodDifferences = chartData.map(
  //   ({ method, enableHook, disableHook }) =>
  //     `${method}: ${enableHook - disableHook}`,
  // );

  // // summary min/max difference

  // const minDifference = Math.min(
  //   ...chartData.map(({ enableHook, disableHook }) => enableHook - disableHook),
  // );
  // const maxDifference = Math.max(
  //   ...chartData.map(({ enableHook, disableHook }) => enableHook - disableHook),
  // );

  // // summary total difference
  // const totalEnableHook = chartData.reduce(
  //   (acc, { enableHook }) => acc + enableHook,
  //   0,
  // );
  // const totalDisableHook = chartData.reduce(
  //   (acc, { disableHook }) => acc + disableHook,
  //   0,
  // );
  // const totalDifference = totalEnableHook - totalDisableHook;

  const chartData2 = [
    { method: "Swap", gas: 2706 },
    { method: "AddLiquidity", gas: 2267 },
    { method: "RemoveLiquidity", gas: 1117 },
    { method: "Donate", gas: 0 },
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
          Maximum gas gap: Swap 2706 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          min:donate:0 | average:1272.5 | median:1192
        </div>
      </CardFooter>
    </Card>
  );
}
