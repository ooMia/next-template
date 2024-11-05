"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { component2IntegratedResponse } from "@/utils/Constants";
import dynamic from "next/dynamic";
import React, { Suspense, useCallback, useMemo, useState } from "react";

const CodeHighlighter = dynamic(
  () => import("@/components/form/CodeHighlighter"),
  {
    loading: () => <Skeleton />,
    ssr: true,
  },
);

const Page = () => {
  const sampleTraceLog = useMemo(() => {
    // TODO: try with index 1
    return component2IntegratedResponse[0].result.result.failList[0].trace;
  }, []);

  // const [code, setCode] = useState(sampleTraceLog);
  const [fontSize, setFontSize] = useState(1);

  const Highlight = useCallback(() => {
    return <CodeHighlighter codeString={sampleTraceLog} fontSize={fontSize} />;
  }, [fontSize, sampleTraceLog]);

  return (
    <div>
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
      <ScrollArea className="max-h-[60vh] flex flex-col items-center">
        <Suspense fallback={<Skeleton />}>
          <Highlight />
        </Suspense>
      </ScrollArea>
    </div>
  );
};

export default Page;
