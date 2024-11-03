"use client";

import { DynamicAnalysisResponseType } from "@/types/AnalysisResponse";
import React, { useEffect, useRef, useState } from "react";

export default function DashBoard() {
  const mode = 2;
  const cpnt = 2;
  const len = 6;

  const [timeHash, setTimeHash] = useState<string>("");
  const [hooks, setHooks] = useState<string>("");
  const [components, setComponents] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const parsedStorage = JSON.parse(
      localStorage.getItem("_herbicide_response")!,
    );
    setTimeHash(parsedStorage.info.timeHash);
    setHooks(parsedStorage.info.hooks);

    if (eventSource.current === null) {
      const endpoint = `/api/noti/${timeHash}/${hooks}/${mode}/${cpnt}`;
      eventSource.current = new EventSource(endpoint, {
        withCredentials: true,
      });
      eventSource.current.onmessage = async (event: MessageEvent) => {
        const idx: string = event.data.match(/idx\s+:\s+(\S+),/)![1];
        const taskId: string = event.data.match(/task-id\s+:\s+(\S+)/)![1];
        console.log(idx);
        console.log(taskId);

        const result: DynamicAnalysisResponseType = await fetch(
          `/api/result/${taskId}`,
        ).then((res) => res.json());
        const newComponent = (
          <div key={taskId} className="bg-gray-200">
            <p>Task ID: {taskId}</p>
            <p>Mode: {result.result.mode}</p>
          </div>
        );
        setComponents((prevComponents) => [...prevComponents, newComponent]);
      };
    }
  }, [timeHash, hooks, mode, cpnt]);

  useEffect(() => {
    if (components.length >= len) {
      eventSource.current?.close();
    }
  }, [components, len]);

  const eventSource = useRef<EventSource | null>(null);

  return <div>{components}</div>;
}
