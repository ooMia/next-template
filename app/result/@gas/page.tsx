"use client";

import { DynamicAnalysisResponseType } from "@/types/AnalysisResponse";
import { useState, useEffect } from "react";
import { DynamicTransactionPriceResult } from "@/components/result/dynamic";

export default function Comp0() {
  // @see https://www.notion.so/entropy1110/56bbf3e1fc6e4e0ab31e222d0cf1e3dd?pvs=4#d33935afa8ab40e78250bf74e83544fa
  const mode = 2;
  const cpnt = 0;
  // const idx = 3;

  const parsedStorage = JSON.parse(
    localStorage.getItem("_herbicide_response")!,
  );
  // const taskId = parsedStorage.info.tasks[idx].id;
  const timeHash = parsedStorage.info.timeHash;
  const hooks = parsedStorage.info.hooks;
  const endpoint = `/api/noti/${timeHash}/${hooks}/${mode}/${cpnt}`;

  const [data, setData] = useState<DynamicAnalysisResponseType | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/event-stream",
        },
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = "";

      if (reader) {
        const stream = new ReadableStream({
          start(controller) {
            function push() {
              reader?.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                result += decoder.decode(value, { stream: true });
                push();
              });
            }
            push();
          },
        });

        await new Response(stream).text();
      }
      console.log(result);
      const taskId = result.match(/task-id\s+:\s+(\S+)/)![1];
      setData(await fetch(`/api/result/${taskId}`).then((res) => res.json()));
    }

    fetchData();
  }, [endpoint]);

  return (
    <div>
      {data ? (
        <DynamicTransactionPriceResult data={data} />
      ) : (
        <p> Loading... </p>
      )}
    </div>
  );
}
