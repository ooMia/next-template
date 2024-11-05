"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { tokenPriceCasesWithKeys } from "@/utils/Constants";

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
  const [assetType, setAssetType] = useState<"ERC20" | "ERC6909">("ERC6909");
  const [methodType, setMethodType] = useState<
    "Swap" | "AddLiquidity" | "RemoveLiquidity" | "Donate"
  >("Swap");
  const [mintBurn, setMintBurn] = useState<"Mint" | "Burn">("Mint");
  const [swapExactInOut, setSwapExactInOut] = useState<"ExactIn" | "ExactOut">(
    "ExactIn",
  );

  const matchingData = filteredPriceDataSet.filter((item) => {
    const isMintBurnMatch =
      assetType == "ERC6909" ? item.MintBurn === mintBurn : true;
    const isExactInOutMatch =
      methodType == "Swap" ? item.ExactInOut === swapExactInOut : true;

    return (
      item.Asset === assetType &&
      item.Method === methodType &&
      isMintBurnMatch &&
      isExactInOutMatch
    );
  });

  useEffect(() => {
    if (assetType == "ERC6909" && methodType == "Donate") {
      setMethodType("Swap");
    }
  }, [assetType]);

  return (
    <Card>
      <CardHeader className="relative">
        <div>
          <EtherLogo className="absolute justify-center left-[200]" />
          <TetherLogo className="absolute justify-center left-[255]" />
        </div>
        <CardTitle>Matching Data</CardTitle>
        <CardDescription>Amount0/1 Delta Query</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="flex items-end gap-8 h-full w-min">
            <RadioStateHandler
              labels={["ERC20", "ERC6909"]}
              setter={setAssetType}
            />
            <div className="select-none">
              <RadioGroup
                defaultValue={"Swap"}
                onValueChange={(e: any) => setMethodType(e)}
              >
                <div className="flex items-center space-x-2" key="Swap">
                  <RadioGroupItem value="Swap" id="r1" />
                  <Label htmlFor="r1">Swap</Label>
                </div>
                <div className="flex items-center space-x-2" key="AddLiquidity">
                  <RadioGroupItem value="AddLiquidity" id="r2" />
                  <Label htmlFor="r2">AddLiquidity</Label>
                </div>
                <div
                  className="flex items-center space-x-2"
                  key="RemoveLiquidity"
                >
                  <RadioGroupItem value="RemoveLiquidity" id="r3" />
                  <Label htmlFor="r3">RemoveLiquidity</Label>
                </div>
                {assetType == "ERC20" && (
                  <div className="flex items-center space-x-2" key="Donate">
                    <RadioGroupItem value="Donate" id="r4" />
                    <Label htmlFor="r4">Donate</Label>
                  </div>
                )}
              </RadioGroup>
            </div>
            {assetType == "ERC6909" && (
              <RadioStateHandler
                labels={["Mint", "Burn"]}
                setter={setMintBurn}
              />
            )}
            {methodType == "Swap" && (
              <RadioStateHandler
                labels={["ExactIn", "ExactOut"]}
                setter={setSwapExactInOut}
              />
            )}
          </div>
          <div>
            <Table>
              <TableCaption>Filtered Price Data</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>MintBurn</TableHead>
                  <TableHead>ExactInOut</TableHead>
                  <TableHead>PoolHookUser</TableHead>
                  <TableHead>Amount0Delta</TableHead>
                  <TableHead>Amount1Delta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {matchingData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.Asset}</TableCell>
                    <TableCell>{item.Method}</TableCell>
                    <TableCell>{item.MintBurn}</TableCell>
                    <TableCell>{item.ExactInOut}</TableCell>
                    <TableCell>{item.PoolHookUser}</TableCell>
                    <TableCell>{item.Amount0Delta}</TableCell>
                    <TableCell>{item.Amount1Delta}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      {/* <CardFooter>
        <p></p>
      </CardFooter> */}
    </Card>
  );
}
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
import { EtherLogo, TetherLogo } from "@/components/Avatar";
import { RadioStateHandler } from "@/components/form/RadioStateHandler";
