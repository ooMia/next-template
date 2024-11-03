import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableRow,
  TableCell,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { PoolKeyType } from "@/types/AnalysisResponse";
import {
  ERC20DeltaDifferenceProps,
  TokenPriceProps,
  TransactionGasCostProps,
} from "@/types/DynamicAnalysis";

import { useState } from "react";

function DynamicERC20DeltaDifferenceResult({
  props,
}: {
  props: ERC20DeltaDifferenceProps;
}) {
  // can handle ERC20 & ERC6909 mint & ERC6909 burn cases
  const [method, setMethod] = useState("swap");

  const row = (type: string) => {
    const value = props[method][type];
    return (
      <TableRow>
        <TableCell className="text-center">{type}</TableCell>
        <TableCell className="text-center">{value.amount0}</TableCell>
        <TableCell className="text-center">{value.amount1}</TableCell>
      </TableRow>
    );
  };
  const getButtonClass = (currentMethod: string) =>
    `rounded-[0px] ${
      method === currentMethod ? "bg-primary" : "bg-primary-300 bg-opacity-50"
    }`;

  return (
    <Card className="w-min">
      <CardHeader>
        <CardTitle>ERC20DeltaDifference</CardTitle>
        <CardDescription>Component Description</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex w-min">
          <Button
            className={getButtonClass("swap")}
            onClick={() => setMethod("swap")}
          >
            swap
          </Button>
          <Button
            className={getButtonClass("addLiquidity")}
            onClick={() => setMethod("addLiquidity")}
          >
            addLiquidity
          </Button>
          <Button
            className={getButtonClass("removeLiquidity")}
            onClick={() => setMethod("removeLiquidity")}
          >
            removeLiquidity
          </Button>
          <Button
            className={getButtonClass("donate")}
            onClick={() => setMethod("donate")}
          >
            donate
          </Button>
        </div>
        <Table className="w-[350px]">
          <TableCaption>Table Description</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-primary">Type</TableHead>
              <TableHead className="w-[100px] text-center text-primary">
                amount0
              </TableHead>
              <TableHead className="w-[100px] text-center text-primary">
                amount1
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {row("user")}
            {row("hook")}
            {row("manager")}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <p></p>
      </CardFooter>
    </Card>
  );
}

function DynamicTransactionGasResult({
  data,
}: {
  data: TransactionGasCostProps;
}) {
  const component = (method: keyof TransactionGasCostProps) => {
    const value: {
      withHook: number;
      withoutHook: number;
    } = data[method];
    return (
      <TableRow>
        <TableCell className="text-center">{method}</TableCell>
        <TableCell className="text-center">{value.withHook}</TableCell>
        <TableCell className="text-center">{value.withoutHook}</TableCell>
        <TableCell className="text-center">
          {(value.withHook - value.withoutHook).toFixed(0)}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Transaction Price</CardTitle>
        <CardDescription>Component Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Table Description</TableCaption>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="text-center">Mehtod</TableHead>
              <TableHead className="w-[100px] text-center">With Hook</TableHead>
              <TableHead className="w-[100px] text-center">
                Without Hook
              </TableHead>
              <TableHead className="w-[100px] text-center">Delta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {component("swap")}
            {component("removeLiquidity")}
            {component("addLiquidity")}
            {component("donate")}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <p></p>
      </CardFooter>
    </Card>
  );
}

function DynamicPoolKeyResult({
  currency0,
  currency1,
  fee,
  tickSpacing,
  hooks,
}: PoolKeyType) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>PoolKey</CardTitle>
        <CardDescription>Component Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 w-[600px] grid-cols-[150px,auto] border gap-4 p-4">
          <p>Currency0</p> <p>{currency0}</p>
          <p>Currency1</p> <p>{currency1}</p>
          <p>Fee</p> <p>{fee}</p>
          <p>TickSpacing</p> <p>{tickSpacing}</p>
          <p>Hooks</p> <p>{hooks}</p>
        </div>
      </CardContent>
      <CardFooter>
        <p></p>
      </CardFooter>
    </Card>
  );
}

function DynamicTokenPriceResult({
  realPrice,
  expectedPrice,
  oraclePrice,
}: TokenPriceProps) {
  const expectedDiff = ((expectedPrice / realPrice) * 100).toFixed(2);
  const oracleDiff = ((oraclePrice / realPrice) * 100).toFixed(2);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Price</CardTitle>
        <CardDescription>Component Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 grid-flow-row border gap-4 w-[500px] justify-items-center p-4">
          <p>Real Price</p> <p>{realPrice}</p>
          <p>Expected Price</p>
          <p>
            <span>{expectedPrice} </span>
            <span className="text-xs">({expectedDiff}%)</span>
          </p>
          <p>Oracle Price</p>
          <p>
            <span>{oraclePrice} </span>
            <span className="text-xs">({oracleDiff}%)</span>
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <p></p>
      </CardFooter>
    </Card>
  );
}

export {
  DynamicERC20DeltaDifferenceResult,
  DynamicTransactionGasResult,
  DynamicPoolKeyResult,
  DynamicTokenPriceResult,
};
