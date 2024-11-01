import AnalysisResponseType from "@/types/AnalysisResponse";
import { useState, useEffect } from "react";
import RecursiveJson, { RecursiveSkeleton } from "./RecursiveJson";

export default function ServerResponseJson(mode: number, cpnt: number) {
  const parsedStorage = JSON.parse(
    localStorage.getItem("_herbicide_response")!,
  );
  // const taskId = parsedStorage.info.tasks[idx].id;
  const timeHash = parsedStorage.info.timeHash;
  const hooks = parsedStorage.info.hooks;
  const endpoint = `/api/noti/${timeHash}/${hooks}/${mode}/${cpnt}`;

  const [data, setData] = useState<AnalysisResponseType | null>(null);

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
      {data ? <RecursiveJson data={data} depth={0} /> : <RecursiveSkeleton />}
    </div>
  );
}
