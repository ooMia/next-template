"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";

import { TaskCreationSourceOnlyRequest } from "@/types/request/api/tasks/TaskCreationRequest";
import { sampleCodeTakeProfitHook } from "@/utils/Constants";
import { doRequest } from "@/utils/SimpleRequest";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import ScrollableCode from "./CodeHighlighter";

export default function HookCodeForm({
  router,
}: Readonly<{ router: AppRouterInstance }>) {
  // TODO: send request to server based on the input
  const [code, setCode] = useState<string>("");

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
    <Card className="w-[500px] border-4">
      <CardHeader>
        <CardTitle>HookCodeForm</CardTitle>
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
            <ScrollableCode codeString={code} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          className="bg-primary text-white"
          onClick={(e) => {
            e.preventDefault();
            doRequest(makeHookCodeRequestBody()).then(() => {
              router.push("/result2");
            });
          }}
        >
          Scan
        </Button>
      </CardFooter>
    </Card>
  );
}
