"use client";

import { tokenPriceCasesWithKeys2 } from "@/utils/Constants";
import { useState } from "react";
import {
  CheckBoxBooleanStateHandler,
  RadioStateHandler,
} from "@/components/form/RadioStateHandler";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const priceDataSet: {
  Asset: string;
  Method: string;
  MintBurn: string;
  ExactInOut: string;
  PoolHookUser: string;
  Amount0Delta: BigInt | number;
  Amount1Delta: BigInt | number;
}[] = tokenPriceCasesWithKeys2;

// @todo modify data as given

// const filteredPriceDataSet = priceDataSet.filter((item) => {
//   if (item.Method !== "Swap" && item.ExactInOut === "ExactOut") {
//     return false;
//   }
//   if (item.Asset === "ERC6909" && item.Method === "Donate") {
//     return false;
//   }
//   return true;
// });

export default function ERC6909DeltaBurnResultPage() {
  const [methodType, setMethodType] = useState<
    "Swap" | "AddLiquidity" | "RemoveLiquidity" | "Donate"
  >("Swap");
  const [isMint, setIsMint] = useState<boolean>(false);
  const [isBurn, setIsBurn] = useState<boolean>(false);
  const [swapExactInOut, setSwapExactInOut] = useState<
    "ExactIn" | "ExactOut" | "N/A"
  >("ExactIn");

  const isMintBurnMatch = (givenState: string) => {
    if (givenState === "N/A") {
      return true;
    }
    return (
      (givenState === "Mint" && isMint) ||
      (givenState === "Burn" && isBurn) ||
      (givenState === "Neither" && !isMint && !isBurn)
    );
  };

  const isExactInOutMatch = (givenState: string) => {
    if (givenState === "N/A") {
      return true;
    }
    return givenState === swapExactInOut;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex">
          <div className="flex flex-col px-4">
            <CardTitle>Amount0/1 Delta Summary</CardTitle>
            <CardDescription>Amount0/1 Delta Summary</CardDescription>
          </div>
          {/* <EtherLogo className="justify-center mx-2" />
          <TetherLogo className="justify-center mx-2" /> */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-4">
          <div className="flex gap-4">
            <Tabs defaultValue="account">
              <TabsList>
                {["Swap", "AddLiquidity", "RemoveLiquidity", "Donate"].map(
                  (value) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      onClick={() => {
                        setMethodType(value as any);
                      }}
                    >
                      {value}
                    </TabsTrigger>
                  ),
                )}
              </TabsList>
            </Tabs>
            <div className="flex flex-col">
              <div className="flex gap-4 items-end ">
                <div className="flex flex-col gap-2">
                  {CheckBoxBooleanStateHandler({
                    label: "Mint",
                    setter: setIsMint,
                    isDisabled: isBurn,
                  })}
                  {CheckBoxBooleanStateHandler({
                    label: "Burn",
                    setter: setIsBurn,
                    isDisabled: isMint,
                  })}
                </div>

                {methodType === "Swap" && (
                  <RadioStateHandler
                    labels={["ExactIn", "ExactOut"]}
                    setter={setSwapExactInOut}
                  />
                )}
                {}
              </div>
            </div>
          </div>

          <Table className="font-fira-code">
            <TableCaption>Amount0/1 Delta Summary</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>PoolHookUser</TableHead>
                <TableHead>Amount0Delta</TableHead>
                <TableHead>Amount1Delta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>General</TableCell>
                <TableCell>Delta</TableCell>
                <TableCell>
                  {/*general - amount0*/

                  priceDataSet
                    .find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "General" &&
                        item.PoolHookUser === "User" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.MintBurn) &&
                        isExactInOutMatch(item.ExactInOut),
                    )
                    ?.Amount0Delta.toString()}
                </TableCell>
                <TableCell>
                  {/*general - amount1*/

                  priceDataSet
                    .find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "General" &&
                        item.PoolHookUser === "User" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.MintBurn) &&
                        isExactInOutMatch(item.ExactInOut),
                    )
                    ?.Amount1Delta.toString()}
                </TableCell>
              </TableRow>
              <TableRow
                style={{
                  borderTop: "3px solid grey",
                }}
              >
                <TableCell>ERC20</TableCell>
                <TableCell>User</TableCell>
                <TableCell>
                  {/*ERC20 - User - amount0*/

                  priceDataSet
                    .find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC20" &&
                        item.PoolHookUser === "User" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.MintBurn) &&
                        isExactInOutMatch(item.ExactInOut),
                    )
                    ?.Amount0Delta.toString()}
                </TableCell>
                <TableCell>
                  {/*ERC20 - User - amount1*/

                  priceDataSet
                    .find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC20" &&
                        item.PoolHookUser === "User" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.MintBurn) &&
                        isExactInOutMatch(item.ExactInOut),
                    )
                    ?.Amount1Delta.toString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ERC20</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>
                  {/*ERC20 - Manager - amount0*/

                  priceDataSet
                    .find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC20" &&
                        item.PoolHookUser === "PoolManager" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.MintBurn) &&
                        isExactInOutMatch(item.ExactInOut),
                    )
                    ?.Amount0Delta.toString()}
                </TableCell>
                <TableCell>
                  {/*ERC20 - Manager - amount1*/

                  priceDataSet
                    .find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC20" &&
                        item.PoolHookUser === "PoolManager" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.MintBurn) &&
                        isExactInOutMatch(item.ExactInOut),
                    )
                    ?.Amount1Delta.toString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ERC20</TableCell>
                <TableCell>Hook</TableCell>
                <TableCell>
                  {/*ERC20 - Hook - amount0*/

                  priceDataSet
                    .find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC20" &&
                        item.PoolHookUser === "Hook" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.MintBurn) &&
                        isExactInOutMatch(item.ExactInOut),
                    )
                    ?.Amount0Delta.toString()}
                </TableCell>
                <TableCell>
                  {/*ERC20 - Hook - amount1*/

                  priceDataSet
                    .find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC20" &&
                        item.PoolHookUser === "Hook" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.MintBurn) &&
                        isExactInOutMatch(item.ExactInOut),
                    )
                    ?.Amount1Delta.toString()}
                </TableCell>
              </TableRow>

              <TableRow
                style={{
                  borderTop: "3px solid grey",
                }}
              >
                <TableCell>ERC6909</TableCell>
                <TableCell>User</TableCell>
                <TableCell>
                  {/*ERC6909 - User - amount0*/

                  priceDataSet
                    .find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC6909" &&
                        item.PoolHookUser === "User" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.MintBurn) &&
                        isExactInOutMatch(item.ExactInOut),
                    )
                    ?.Amount0Delta.toString()}
                </TableCell>
                <TableCell>
                  {/*ERC6909 - User - amount1*/

                  priceDataSet
                    .find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC6909" &&
                        item.PoolHookUser === "User" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.MintBurn) &&
                        isExactInOutMatch(item.ExactInOut),
                    )
                    ?.Amount1Delta.toString()}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>ERC6909</TableCell>
                <TableCell>Hook</TableCell>
                <TableCell>
                  {/*ERC6909 - Hook - amount0*/

                  priceDataSet
                    .find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC6909" &&
                        item.PoolHookUser === "Hook" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.MintBurn) &&
                        isExactInOutMatch(item.ExactInOut),
                    )
                    ?.Amount0Delta.toString()}
                </TableCell>
                <TableCell>
                  {/*ERC6909 - Hook - amount1*/

                  priceDataSet
                    .find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC6909" &&
                        item.PoolHookUser === "Hook" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.MintBurn) &&
                        isExactInOutMatch(item.ExactInOut),
                    )
                    ?.Amount1Delta.toString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
