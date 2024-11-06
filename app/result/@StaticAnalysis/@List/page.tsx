"use client";

import { Input } from "@/components/ui/input";
import { staticResponseOnPoolKey } from "@/utils/Constants";
import { useEffect, useState } from "react";

const response = staticResponseOnPoolKey;
type Threat = {
  check?: string;
  name: string;
  description: string;
  markdown?: string;
  severity: string;
  type: string;
};

const object = response.result.result.threats.map((threat) => {
  return {
    name: threat.detector,
    description: threat.data.description,
    markdown: "",
    severity: threat.data.impact,
    check: "",
    type: "custom",
  };
});

let object2 = response.result.slither.detector.data.map((threat) => {
  return {
    name: response.result.slither.detector.detector,
    description: threat.description,
    markdown: threat.markdown,
    severity: threat.confidence,
    check: threat.check,
    type: "slither",
  };
});
const contractName = response.result.result.info.data.contract_scope.name;

object2 = object2.concat(object).filter((item) => {
  return JSON.stringify(item)
    .toLowerCase()
    .includes(contractName.toLowerCase());
});

export default function StaticAnalysisResultPage() {
  const data = object2;
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Threat[]>();

  useEffect(() => {
    setResult(
      data.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(query.toLowerCase());
      }),
    );
  }, [data, query, setResult]);

  return (
    <div className="flex flex-col my-4 max-h-[800px] ml-2">
      <div className="relative w-[96%] ">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
          🔍
        </span>
        <Input
          defaultValue={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-white text-black pl-10"
        />
      </div>
      {
        <ScrollArea className="flex flex-col my-4">
          {result &&
            result.map((item, index) => {
              return (
                <AnalysisResultLog
                  key={index}
                  title={item.name}
                  description={item.description}
                  markdown={item.markdown}
                  severity={item.severity}
                  check={item.check}
                  type={item.type}
                />
              );
            })}
        </ScrollArea>
      }
      <Alert className="w-[96%]">
        <LightbulbIcon className="h-4 w-4" />
        <AlertTitle>Notice</AlertTitle>
        <AlertDescription>
          1. Due to the internal preprocessing that removes comments, the
          visible line numbers may differ from the actual source code line
          numbers.
          <br />
          2. While rendering the source code, different char sets may be used,
          making search on browser not accurate.
        </AlertDescription>
      </Alert>
    </div>
  );
}
// @remind RightSide - potential issues

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CodeHighlighterNoLine } from "@/components/form/CodeHighlighter";

import { Badge } from "@/components/ui/badge";
import { LightbulbIcon } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function AnalysisResultLog({
  title,
  description,
  markdown,
  severity,
}: {
  title: string;
  description: string;
  markdown?: string;
  severity: string;
  check?: string;
  type: string;
  query?: string;
}) {
  const regex = new RegExp(
    `\\-? \\[([\\s\\S]+?)\\]\\(\\S+${contractName}\\.sol#L(\\d+)\\)`,
    "g",
  );

  const matches = markdown ? [...markdown.matchAll(regex)] : [];
  const results = matches.map((match) => ({
    text: match[1],
    lineNumber: match[2],
  }));
  // const badgeStyles = severity && getBadgeStyles(severity);
  const titleMatch = markdown
    ? markdown.match(/\s([\s\w]+?)\W+\[/)
    : description.match(/\s([\s\w]+?)\w+\[/);
  const extractedTitle = titleMatch ? titleMatch[1].trim() : title;

  return (
    <Alert className={`max-w-[40vw] ${getBadgeStyles(severity, 100)}`}>
      <AlertTitle className="flex">
        <ExclamationTriangleIcon className="h-8 w-8 mx-2" />
        <Badge
          className={`hover:bg-yellow-300 mr-2 text-xs select-none cursor-default font-fira-code py-0  ${getBadgeStyles(severity, 50)}`}
        >
          {severity}
        </Badge>
        <span className="text-lg font-bold">
          {extractedTitle.charAt(0).toUpperCase() + extractedTitle.slice(1)}
        </span>
      </AlertTitle>
      <AlertDescription>
        {results.map((result, index) => (
          <div key={index}>
            <CodeHighlighterNoLine
              codeString={`L#${result.lineNumber}: ${result.text}`}
            />
          </div>
        ))}
        <ResultDetailModal />
      </AlertDescription>
    </Alert>
  );
}
const getBadgeStyles = (severity: string, opacity: number = 100) => {
  switch (severity) {
    case "High":
      return `border bg-red-500 text-red-900 bg-opacity-${opacity}`;
    case "Medium":
      return `font-bold border border-color-yellow-900 bg-yellow-500  text-yellow-900 bg-opacity-${opacity}`;
    case "Low":
      return `border bg-green-500 text-green-900 bg-opacity-${opacity}`;
    case "Info":
      return `border bg-blue-500 text-blue-900 bg-opacity-${opacity}`;
    default:
      return `border bg-gray-500 text-gray-900 bg-opacity-${opacity}`;
  }
};

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ResultDetailModal() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="select-none">
            Detail
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg w-full overflow-auto">
          <DialogHeader>
            <DialogTitle>
              ERC-20 Representation of Native Currency Can Be Used to Drain
              Native Currency Pools
            </DialogTitle>
            <DialogDescription>
              <Alert className="bg-yellow-300 bg-opacity-30 my-4">
                <LightbulbIcon className="h-4 w-4 text-xs" />
                <AlertTitle>Notice</AlertTitle>
                <AlertDescription>
                  Our features are still under development. This kind of
                  information will be available for all threats in the future.
                </AlertDescription>
              </Alert>
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-[auto,1fr] border gap-4 p-4 text-xs">
            <p className="font-bold flex justify-center items-center">
              Description
            </p>
            <p>
              The settle function, responsible for settling a user&apos;s debt,
              increases the account delta of the specified currency. There are
              two settlement flows: one for the native currency and another for
              all other currencies. If the currency is native, the amount used
              for increasing the delta is msg.value. Otherwise, if the currency
              is a regular ERC-20 token, the amount is the balance difference
              between the last time sync or settle were called and the current
              settle invocation.
            </p>
            <p className="font-bold flex flex-col justify-center items-center">
              Impact
              <Badge
                className={`hover:bg-yellow-300 text-xs select-none cursor-default font-fira-code py-0  ${getBadgeStyles("Medium", 100)} my-2`}
              >
                Medium
              </Badge>
            </p>
            <p>
              The attacker has 2000 CELO and zero balance deltas, allowing them
              to finish the transaction with a profit of 1000 CELO. By repeating
              the steps above, it is possible to completely drain the native
              currency pool.
            </p>
            <p className="font-bold flex justify-center items-center">
              Recommendation
            </p>
            <p>
              Consider changing the way native currency pools work on chains
              where the native currency has a corresponding ERC-20 token. For
              example, make the NATIVE variable immutable and set it to the
              ERC-20 token address for chains where native currency has a
              corresponding ERC-20 token.
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <Badge
        className={`hover:bg-yellow-300 mr-2 text-xs select-none cursor-default font-fira-code py-0 w-min ${getBadgeStyles("Info", 100)} mx-2`}
      >
        Semgrep
      </Badge>
    </div>
  );
}
