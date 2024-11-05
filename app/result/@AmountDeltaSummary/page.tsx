"use client";

import { tokenPriceCasesWithKeys } from "@/utils/Constants";
import { useState } from "react";
import { EtherLogo, TetherLogo } from "@/components/Avatar";
import { RadioStateHandler } from "@/components/form/RadioStateHandler";
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
  Amount0Delta: number;
  Amount1Delta: number;
}[] = tokenPriceCasesWithKeys;

const filteredPriceDataSet = priceDataSet.filter((item) => {
  if (item.Method !== "Swap" && item.ExactInOut === "ExactOut") {
    return false;
  }
  if (item.Asset === "ERC20" && item.MintBurn === "Burn") {
    return false;
  }
  if (item.Asset === "ERC6909" && item.Method === "Donate") {
    return false;
  }
  return true;
});

export default function ERC6909DeltaBurnResultPage() {
  const [methodType, setMethodType] = useState<
    "Swap" | "AddLiquidity" | "RemoveLiquidity" | "Donate"
  >("Swap");
  const [mintBurn, setMintBurn] = useState<"Mint" | "Burn">("Mint");
  const [swapExactInOut, setSwapExactInOut] = useState<"ExactIn" | "ExactOut">(
    "ExactIn",
  );
  const isMintBurnMatch = (assetType: string, givenState: string) => {
    return assetType == "ERC6909"
      ? givenState == mintBurn
      : givenState == "Mint";
  };
  const isExactInOutMatch = (methodType: string, givenState: string) => {
    return methodType == "Swap"
      ? givenState === swapExactInOut
      : givenState == "ExactIn";
  };

  return (
    <Card>
      <CardHeader className="relative">
        <div>
          <EtherLogo className="absolute justify-center left-[340]" />
          <TetherLogo className="absolute justify-center left-[395]" />
        </div>
        <CardTitle>Amount0/1 Delta Summary</CardTitle>
        <CardDescription>Amount0/1 Delta Summary</CardDescription>
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
              <div className="flex gap-4 flex items-end ">
                {methodType !== "Donate" && (
                  <RadioStateHandler
                    labels={["Mint", "Burn"]}
                    setter={setMintBurn}
                  />
                )}
                {methodType === "Swap" && (
                  <RadioStateHandler
                    labels={["ExactIn", "ExactOut"]}
                    setter={setSwapExactInOut}
                  />
                )}
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
                  {
                    /*general - amount0*/

                    filteredPriceDataSet.find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "General" &&
                        item.PoolHookUser === "User" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.Asset, item.MintBurn) &&
                        isExactInOutMatch(item.Method, item.ExactInOut),
                    )?.Amount0Delta
                  }
                </TableCell>
                <TableCell>
                  {
                    /*general - amount1*/

                    filteredPriceDataSet.find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "General" &&
                        item.PoolHookUser === "User" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.Asset, item.MintBurn) &&
                        isExactInOutMatch(item.Method, item.ExactInOut),
                    )?.Amount1Delta
                  }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ERC20</TableCell>
                <TableCell>User</TableCell>
                <TableCell>
                  {
                    /*ERC20 - User - amount0*/

                    filteredPriceDataSet.find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC20" &&
                        item.PoolHookUser === "User" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.Asset, item.MintBurn) &&
                        isExactInOutMatch(item.Method, item.ExactInOut),
                    )?.Amount0Delta
                  }
                </TableCell>
                <TableCell>
                  {
                    /*ERC20 - User - amount1*/

                    filteredPriceDataSet.find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC20" &&
                        item.PoolHookUser === "User" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.Asset, item.MintBurn) &&
                        isExactInOutMatch(item.Method, item.ExactInOut),
                    )?.Amount1Delta
                  }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ERC20</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>
                  {
                    /*ERC20 - Manager - amount0*/

                    filteredPriceDataSet.find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC20" &&
                        item.PoolHookUser === "PoolManager" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.Asset, item.MintBurn) &&
                        isExactInOutMatch(item.Method, item.ExactInOut),
                    )?.Amount0Delta
                  }
                </TableCell>
                <TableCell>
                  {
                    /*ERC20 - Manager - amount1*/

                    filteredPriceDataSet.find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC20" &&
                        item.PoolHookUser === "PoolManager" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.Asset, item.MintBurn) &&
                        isExactInOutMatch(item.Method, item.ExactInOut),
                    )?.Amount1Delta
                  }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ERC20</TableCell>
                <TableCell>Hook</TableCell>
                <TableCell>
                  {
                    /*ERC20 - Hook - amount0*/

                    filteredPriceDataSet.find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC20" &&
                        item.PoolHookUser === "Hook" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.Asset, item.MintBurn) &&
                        isExactInOutMatch(item.Method, item.ExactInOut),
                    )?.Amount0Delta
                  }
                </TableCell>
                <TableCell>
                  {
                    /*ERC20 - Hook - amount1*/

                    filteredPriceDataSet.find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC20" &&
                        item.PoolHookUser === "Hook" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.Asset, item.MintBurn) &&
                        isExactInOutMatch(item.Method, item.ExactInOut),
                    )?.Amount1Delta
                  }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ERC6909</TableCell>
                <TableCell>User</TableCell>
                <TableCell>
                  {
                    /*ERC6909 - User - amount0*/

                    filteredPriceDataSet.find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC6909" &&
                        item.PoolHookUser === "User" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.Asset, item.MintBurn) &&
                        isExactInOutMatch(item.Method, item.ExactInOut),
                    )?.Amount0Delta
                  }
                </TableCell>
                <TableCell>
                  {
                    /*ERC6909 - User - amount1*/

                    filteredPriceDataSet.find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC6909" &&
                        item.PoolHookUser === "User" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.Asset, item.MintBurn) &&
                        isExactInOutMatch(item.Method, item.ExactInOut),
                    )?.Amount1Delta
                  }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ERC6909</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>
                  {
                    /*ERC6909 - Manager - amount0*/

                    filteredPriceDataSet.find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC6909" &&
                        item.PoolHookUser === "PoolManager" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.Asset, item.MintBurn) &&
                        isExactInOutMatch(item.Method, item.ExactInOut),
                    )?.Amount0Delta
                  }
                </TableCell>
                <TableCell>
                  {
                    /*ERC6909 - Manager - amount1*/

                    filteredPriceDataSet.find(
                      (
                        item, // TODO: general is unique within the test, not bound to the asset and user
                      ) =>
                        item.Asset === "ERC6909" &&
                        item.PoolHookUser === "PoolManager" &&
                        item.Method === methodType &&
                        isMintBurnMatch(item.Asset, item.MintBurn) &&
                        isExactInOutMatch(item.Method, item.ExactInOut),
                    )?.Amount1Delta
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
