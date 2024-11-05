"use client";

import { TaskCreationSourceOnlyRequest } from "@/types/request/api/tasks/TaskCreationRequest";
import { sampleCodeTakeProfitHook } from "@/utils/Constants";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import CodeHighlighter from "./CodeHighlighter";
import { doRequest } from "@/utils/SimpleRequest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";

export default function HookCodeForm({
  router,
}: Readonly<{ router: AppRouterInstance }>) {
  // TODO: send request to server based on the input
  const [code, setCode] = useState<string>("");
  const [fontSize, setFontSize] = useState(1.3);

  const onClickSamplePoolKeyHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setCode(sampleCodeTakeProfitHook);
  };

  function makeHookCodeRequestBody(): TaskCreationSourceOnlyRequest {
    return {
      data: {
        source: code,
        mode: 4,
      },
    };
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>HookCodeForm</CardTitle>
        <CardDescription>desc</CardDescription>
      </CardHeader>

      <CardContent className="text-xs">
        <Tabs defaultValue="Input">
          <TabsList>
            <TabsTrigger value="Input">Input</TabsTrigger>
            <TabsTrigger value="Preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="Input">
            <Textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-72"
            />
            <button
              onClick={onClickSamplePoolKeyHandler}
              className="text-xs cursor-pointer hover:underline"
            >
              need a sample?
            </button>
          </TabsContent>
          <TabsContent value="Preview">
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
            {/* TODO: encapsulate scroll area */}
            <ScrollArea className="max-h-[60vh] flex flex-col  items-center">
              <CodeHighlighter codeString={code} fontSize={fontSize} />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          className="bg-primary text-white"
          onClick={(e) => {
            e.preventDefault();
            doRequest(makeHookCodeRequestBody()).then(() => {
              router.push("/result/code");
            });
          }}
        >
          Scan
        </Button>
      </CardFooter>
    </Card>
  );
}
