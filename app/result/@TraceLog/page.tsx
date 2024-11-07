"use client";

import { useEffect, useMemo, useState } from "react";

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
import { component2IntegratedResponse2 } from "@/utils/Constants";
import CodeHighlighter from "@/components/form/CodeHighlighter";

export default function Page() {
  const [testNumber, setTestNumber] = useState(0);
  const [indexNumber, setIndexNumber] = useState(0);

  // const testNames = component2IntegratedResponse.map((test, index) => ({
  //   name: test.result.result.name,
  //   index,
  // }));
  const testNames = component2IntegratedResponse2.map((test, index) => ({
    name: test.result.result.name,
    index,
  }));

  const sampleTraceLog = useMemo(() => {
    return component2IntegratedResponse2[testNumber].result.result.failList[
      indexNumber
    ]?.trace;
  }, [testNumber, indexNumber]);

  const [isCode, setIsCode] = useState<boolean>(false);

  useEffect(() => {
    const source = localStorage.getItem("source");
    setIsCode(source === "code");
  }, []);

  return (
    <>
      {!isCode && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex">
                  <h1 className="text-3xl my-2 mx-4">Trace Log</h1>
                  <div className="py-2 flex items-end">
                    {/* <div className='gap-1 grid grid-rows-2 auto-rows-max grid-flow-col'> */}
                    <div className="gap-3 flex">
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
                              background: "",
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
                            className={`${test.index === testNumber ? "bg-primary-100" : "bg-[#rgba(239, 124, 249, 0.1)]"} opacity-80 hover:bg-primary-100 select-none border dark:border-white`}
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
                              className={`${test.index === testNumber ? "bg-primary-100" : "bg-[#rgba(239, 124, 249, 0.1)]"} opacity-80 hover:bg-primary-100 select-none border dark:border-white`}
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
                                  › Continue
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
                        className={`bg-[#rgba(239, 124, 249, 0.1)] opacity-80 hover:bg-primary-100 select-none border dark:border-white`}
                        onClick={() => {
                          setIndexNumber(
                            (indexNumber + 1) %
                              component2IntegratedResponse2[testNumber].result
                                .result.failList.length,
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
              <CodeHighlighter codeString={sampleTraceLog} />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
