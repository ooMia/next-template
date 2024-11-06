"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { component2IntegratedResponse } from "@/utils/Constants";
import dynamic from "next/dynamic";
import React, { Suspense, useMemo, useState } from "react";
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

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex">
              <h1 className="text-3xl my-2 mx-4">Trace Log</h1>
              <div className="py-2 flex items-end">
                {/* <div className='gap-1 grid grid-rows-2 auto-rows-max grid-flow-col'> */}
                <div className="gap-1 flex">
                  {testNames.map((test) =>
                    test.index != 1 ? (
                      <Button
                        key={test.index}
                        onClick={() => {
                          setTestNumber(test.index);
                          setIndexNumber(0);
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "0px",
                          width: "158px",
                          height: "20px",
                          background: "rgba(239, 124, 249, 0.1)",
                          backdropFilter: "blur(2px)",
                          borderRadius: "23px",
                          flex: "none",
                          order: 0,
                          flexGrow: 0,
                          fontFamily: "'SF Pro Display'",
                          fontStyle: "italic",
                          fontWeight: 600,
                          fontSize: "13px",
                          lineHeight: "16px",
                          letterSpacing: "0.03em",
                          color: "#EF7BF9",
                          margin: "0px",
                        }}
                      >
                        {test.name === "Minimum_Test"
                          ? "Minimum"
                          : test.name === "Time-Based-Minimum_Test"
                            ? "TimeLock"
                            : test.name === "OnlyByPoolManager-Chk"
                              ? "OnlyByPoolManager"
                              : test.name === "double-Initialize-Test"
                                ? "Reinitialize"
                                : test.name === "Proxy-Test"
                                  ? "HookFuncCall"
                                  : "ERROR"}
                      </Button>
                    ) : (
                      <AlertDialog key={test.index}>
                        <AlertDialogTrigger
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "0px",
                            width: "158px",
                            height: "20px",
                            background: "rgba(239, 124, 249, 0.1)",
                            backdropFilter: "blur(2px)",
                            borderRadius: "23px",
                            flex: "none",
                            order: 0,
                            flexGrow: 0,
                            fontFamily: "'SF Pro Display'",
                            fontStyle: "italic",
                            fontWeight: 600,
                            fontSize: "13px",
                            lineHeight: "16px",
                            letterSpacing: "0.03em",
                            color: "#EF7BF9",
                            margin: "0px",
                            userSelect: "none",
                          }}
                        >
                          {test.name === "Minimum_Test"
                            ? "Minimum"
                            : test.name === "Time-Based-Minimum_Test"
                              ? "TimeLock"
                              : test.name === "OnlyByPoolManager-Chk"
                                ? "Reinitialize"
                                : test.name === "double-Initialize-Test"
                                  ? "Reinitialize"
                                  : test.name === "Proxy-Test"
                                    ? "HookFuncCall"
                                    : "ERROR"}
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action render very long log trace, which
                              cause the page to freeze while mount the whole
                              trace log as a single component.
                              <br />
                              Also modifying text size may cause the page to
                              freeze.
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
                  <Button
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0px",
                      width: "158px",
                      height: "20px",
                      background: "rgba(239, 124, 249, 0.1)",
                      backdropFilter: "blur(2px)",
                      borderRadius: "23px",
                      flex: "none",
                      order: 0,
                      flexGrow: 0,
                      fontFamily: "'SF Pro Display'",
                      fontStyle: "italic",
                      fontWeight: 600,
                      fontSize: "13px",
                      lineHeight: "16px",
                      letterSpacing: "0.03em",
                      color: "#EF7BF9",
                      margin: "0px",
                    }}
                    onClick={() => {
                      setIndexNumber(
                        (indexNumber + 1) %
                          component2IntegratedResponse[testNumber].result.result
                            .failList.length,
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
                {/* <Alert className='rounded-[15px] bg-yellow-300 bg-opacity-30 w-min'>
                  <LightbulbIcon className='h-4 w-4 text-xs' />
                  <AlertTitle>Notice</AlertTitle>
                  <AlertDescription>
                    Initial load or modifying text size may cause the page to
                    freeze while re-rendering the whole trace log as a single
                    component. This issue will be addressed in future updates by
                    using a virtualized list.
                  </AlertDescription>
                </Alert> */}
              </div>
            </div>
          </CardTitle>
          {/* <CardDescription> {description} </CardDescription> */}
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[60vh] flex flex-col items-center">
            <Suspense fallback={<Skeleton />}>
              <CodeHighlighter codeString={sampleTraceLog} />
            </Suspense>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
