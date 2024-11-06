"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { component2IntegratedResponse } from "@/utils/Constants";
import { LightbulbIcon } from "lucide-react";
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
  const [testNumber, setTestNumber] = useState(0);
  const [indexNumber, setIndexNumber] = useState(0);

  const testNames = component2IntegratedResponse.map((test, index) => ({
    name: test.result.result.name,
    index,
  }));

  const sampleTraceLog = useMemo(() => {
    return component2IntegratedResponse[testNumber].result.result.failList[
      indexNumber
    ]?.trace;
  }, [testNumber, indexNumber]);

  // const [code, setCode] = useState(sampleTraceLog);
  const [fontSize, setFontSize] = useState(1);

  const Highlight = useCallback(() => {
    return <CodeHighlighter codeString={sampleTraceLog} fontSize={fontSize} />;
  }, [fontSize, sampleTraceLog]);

  return (
    <div>
      <Alert className="bg-yellow-300 bg-opacity-30 w-[550px] my-4">
        <LightbulbIcon className="h-4 w-4 text-xs" />
        <AlertTitle>Notice</AlertTitle>
        <AlertDescription>
          Initial load or modifying text size may cause the page to freeze while
          re-rendering the whole trace log as a single component.
          <br />
          This issue will be addressed in future updates by using a virtualized
          list.
        </AlertDescription>
      </Alert>
      <div className="py-2 flex items-end">
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
            setFontSize(fontSize > 1 ? fontSize - 0.5 : 1);
          }}
        >
          🔍➖
        </Button>
        <h1 className="text-3xl my-2 mx-4">Trace Log</h1>
        <div className="gap-1 flex">
          {testNames.map((test) =>
            test.index != 1 ? (
              <Button
                key={test.index}
                onClick={() => {
                  setTestNumber(test.index);
                  setIndexNumber(0);
                }}
                className="rounded-full my-1 px-2 py-1 text-xs h-fit-content text-align-center bg-blue-500 text-white hover:bg-blue-600 select-none"
              >
                {test.name}
              </Button>
            ) : (
              <AlertDialog key={test.index}>
                <AlertDialogTrigger className="rounded-full my-1 px-2 py-1 text-xs h-fit-content text-align-center bg-warning-700 text-warning-200 hover:bg-primary-600 select-none">
                  {test.name}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action render very long log trace, which cause the
                      page to freeze while mount the whole trace log as a single
                      component.
                      <br />
                      Also modifying text size may cause the page to freeze.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        setTestNumber(test.index);
                        setIndexNumber(0);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ),
          )}
        </div>
        <Button
          onClick={() => {
            setIndexNumber(
              (indexNumber + 1) %
                component2IntegratedResponse[testNumber].result.result.failList
                  .length,
            );
            // @todo toast
            // if (
            //   component2IntegratedResponse[testNumber].result.result.failList
            //     .length ===
            //   indexNumber + 1
            // )
            //   toast("Event has been created", {
            //     description: "Sunday, December 03, 2023 at 9:00 AM",
            //     action: {
            //       label: "Undo",
            //       onClick: () => console.log("Undo"),
            //     },
            //   });
          }}
        >
          Next Index
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
