"use client";

import CodeHighlighter from "@/components/form/CodeHighlighter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  sampleCodeTakeProfitHook,
  staticResponseOnPoolKey,
} from "@/utils/Constants";
import { useState } from "react";

export default function StaticAnalysisResultPage() {
  // const sampleTraceLog = useMemo(() => {
  //   // TODO: try with index 1
  //   return sampleCodeTakeProfitHook;
  // }, []);

  // const [code, setCode] = useState(sampleTraceLog);
  const [fontSize, setFontSize] = useState(1);

  return (
    <div>
      <div className="flex items-end">
        <div className="py-2">
          <Button
            className="rounded-full p-2 m-2 text-xl w-fit-content text-align-center bg-blue-500 text-white hover:bg-blue-600 select-none"
            onClick={() => {
              setFontSize(fontSize + 0.5);
            }}
          >
            🔍➕
          </Button>
          <Button
            className="rounded-full p-2 m-2 text-xl w-fit-content text-align-center bg-blue-500 text-white hover:bg-blue-600 select-none"
            onClick={() => {
              setFontSize(fontSize - 0.5);
            }}
          >
            🔍➖
          </Button>
        </div>
        <h1
          className="text-4xl m-3"
          style={{
            fontFamily: "sans-serif",
          }}
        >
          {staticResponseOnPoolKey.result.result.info.data.contract_scope.name}
        </h1>
        <div className="flex flex-col text-xs font-fira-code m-2 ">
          <h2 className="">
            {staticResponseOnPoolKey.result.result.info.chain_name}
          </h2>
          <h2 className="">
            {staticResponseOnPoolKey.result.result.info.evm_version}
          </h2>

          <a
            className="text-info-500 hover:underline cursor-pointer max-w-[100px] truncate"
            target="_blank"
            href={`https://sepolia.uniscan.xyz/address/${staticResponseOnPoolKey.result.hooks}`}
          >
            {staticResponseOnPoolKey.result.hooks}
          </a>
        </div>
      </div>
      <ScrollArea className="max-h-[60vh] max-w-[100vh] flex flex-col items-center">
        <CodeHighlighter
          codeString={sampleCodeTakeProfitHook}
          fontSize={fontSize}
        />
      </ScrollArea>
    </div>
  );
}
// @remind LeftSide - hook contract code
