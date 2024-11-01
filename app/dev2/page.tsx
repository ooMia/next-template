"use client";

import RecursiveJson from "@/components/RecursiveJson";
import AnalysisResponseType from "@/types/AnalysisResponse";
// import RecursiveJson from "@/components/RecursiveJson";
// import AnalysisResponseType from "@/types/AnalysisResponse";
// import { useEffect, useState } from "react";

// export default function DashBoard() {
//   // @see https://www.notion.so/entropy1110/56bbf3e1fc6e4e0ab31e222d0cf1e3dd?pvs=4#d33935afa8ab40e78250bf74e83544fa
//   const mode = 2;
//   const cpnt = 0;
//   // const idx = 3;

//   const parsedStorage = JSON.parse(
//     localStorage.getItem("_herbicide_response")!
//   );
//   // const taskId = parsedStorage.info.tasks[idx].id;
//   const timeHash = parsedStorage.info.timeHash;
//   const hooks = parsedStorage.info.hooks;
//   const endpoint = `/api/noti/${timeHash}/${hooks}/${mode}/${cpnt}`;

//   const [data, setData] = useState<AnalysisResponseType | null>(null);

//   useEffect(() => {
//     console.log(process.env.API_URL + endpoint);
//     const eventSource = new EventSource(endpoint, {
//       withCredentials: true,
//     });
//     eventSource.onmessage = async (event: MessageEvent) => {
//       const idx: string = event.data.match(/idx\s+:\s+(\S+),/)![1];
//       const taskId: string = event.data.match(/task-id\s+:\s+(\S+)/)![1];
//       console.log(idx);
//       console.log(taskId);
//       setData(await fetch(`/api/result/${taskId}`).then((res) => res.json()));
//     };
//   }, [endpoint]);

//   return (
//     <div className='grid grid-cols-2 gap-4'>
//       {data && <RecursiveJson data={data} depth={0} />}
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";

export default function DashBoard() {
  const mode = 2;
  const cpnt = 0;
  const len = 1;
  const parsedStorage = JSON.parse(
    localStorage.getItem("_herbicide_response")!,
  );
  const timeHash = parsedStorage.info.timeHash;
  const hooks = parsedStorage.info.hooks;
  const endpoint = `/api/noti/${timeHash}/${hooks}/${mode}/${cpnt}`;

  const [components, setComponents] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (components.length >= len) {
      eventSource.current?.close();
    }
  }, [components, len]);

  const eventSource = useRef<EventSource | null>(null);
  if (eventSource.current === null) {
    eventSource.current = new EventSource(endpoint, {
      withCredentials: true,
    });
    eventSource.current.onmessage = async (event: MessageEvent) => {
      const idx: string = event.data.match(/idx\s+:\s+(\S+),/)![1];
      const taskId: string = event.data.match(/task-id\s+:\s+(\S+)/)![1];
      console.log(idx);
      console.log(taskId);

      const result: AnalysisResponseType = await fetch(
        `/api/result/${taskId}`,
      ).then((res) => res.json());
      const newComponent = (
        <div key={taskId} className="bg-gray-200">
          <p>Task ID: {taskId}</p>
          <RecursiveJson data={result} depth={0} />
        </div>
      );
      setComponents((prevComponents) => [...prevComponents, newComponent]);
    };
  }

  return <div>{components}</div>;
}
