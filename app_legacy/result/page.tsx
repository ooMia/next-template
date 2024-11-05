"use client";

import { useEffect, useRef, useState } from "react";
import { TaskCreationResponseRoot } from "@/types/response/api/tasks/TaskCreationResponse";
import { Address } from "@/types/Property";

import { FailedTestTraceProps } from "@/types/DynamicAnalysis";

import {
  FailList,
  MinimumTestRoot,
} from "@/types/response/api/result/taskId/2_2_0_MinimumTest";

export default function Page() {
  const cpnt = 2;
  const mode = 2;
  const nRecord = 5;

  const [timeHash, setTimeHash] = useState<string>("");
  const [hooks, setHooks] = useState<Address>("");
  const [components, setComponents] = useState<FailedTestTraceProps[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const eventSource = useRef<EventSource | null>(null);

  useEffect(() => {
    // 1. get the timeHash and hooks from the localStorage
    const parsedStorage: TaskCreationResponseRoot = JSON.parse(
      localStorage.getItem("_herbicide_response")!,
    );
    setTimeHash(parsedStorage.info.timeHash);
    setHooks(parsedStorage.info.hooks);

    if (eventSource.current === null && timeHash && hooks) {
      const endpoint = `/api/noti/${timeHash}/${hooks}/${mode}/${cpnt}`;
      eventSource.current = new EventSource(endpoint, {
        withCredentials: true,
      });
    }
  }, [timeHash, hooks]);

  useEffect(() => {
    // 2. create an EventSource
    if (eventSource.current !== null) {
      // 3. listen to the message event
      eventSource.current.onmessage = async (event: MessageEvent) => {
        const idx: string = event.data.match(/idx\s+:\s+(\S+),/)![1];
        const taskId: string = event.data.match(/task-id\s+:\s+(\S+)/)![1];

        console.log(idx);
        console.log(taskId);

        await fetch(`/api/result/${taskId}`)
          .then((res) => res.json())
          .then((data) => {
            if (idx === "0") {
              const result: MinimumTestRoot = data;
              if (result.result.result.FAIL == 0) {
                console.log("No failed test");
                return;
              } else {
                const failList: FailList[] = result.result.result.failList;
                if (failList && failList.length > 0) {
                  failList.map((test) => {
                    setComponents((prevComponents) => [
                      ...prevComponents,
                      {
                        testName: test.name,
                        msg: test.msg,
                        description: test.description,
                        trace: test.trace,
                        impact: test.impact,
                        statusCode: test.statusCode,
                        status: test.status,
                      },
                    ]);
                  });
                }
              }
              return result.result.result.testList;
            }
          })
          .then((testList) => {})
          .finally(() => {
            setCounter((prevCounter) => prevCounter + 1);
            console.log(counter);
            if (counter >= nRecord) {
              eventSource.current?.close();
            }
          });
      };
    }
  }, [timeHash, hooks, mode, cpnt, counter]);

  // useEffect(() => {
  //   if (eventSource.current === null) {
  //     const endpoint = `/api/noti/${timeHash}/${hooks}/${mode}/${cpnt}`;

  //     eventSource.current = new EventSource(endpoint, {
  //       withCredentials: true,
  //     });
  //     eventSource.current.onmessage = (event: MessageEvent) => {
  //       const idx: string = event.data.match(/idx\s+:\s+(\S+),/)![1];
  //       const taskId: string = event.data.match(/task-id\s+:\s+(\S+)/)![1];
  //       console.log(idx);
  //       console.log(taskId);

  //       // use mapper to get the response data type

  //       // if (idx == "0") {
  //       //   const result: TokenPriceCompareRoot =
  //       //     await getAsType<TokenPriceCompareRoot>(taskId);
  //       // }
  //       // if (idx == "1") {
  //       //   const result: DataResult = (
  //       //     await getAsType<TimeBasedMinimumTestRoot>(taskId)
  //       //   ).result;
  //       //   console.log(result);
  //       //   result.result.failList.map((test) => {
  //       //     setComponents((prevComponents) => [
  //       //       ...prevComponents,
  //       //       {
  //       //         testName: test.name,
  //       //         msg: test.msg,
  //       //         description: test.description,
  //       //         trace: test.trace,
  //       //         impact: test.impact,
  //       //         statusCode: test.statusCode,
  //       //         status: test.status,
  //       //       },
  //       //     ]);
  //       //   });
  //       // }
  //       // if (idx == "2") {
  //       //   // comp != 2
  //       // }
  //       // if (idx == "3") {
  //       //   // comp != 2
  //       // }
  //       // if (idx == "4") {
  //       //   const result: PoolManagerTestRoot =
  //       //     await getAsType<PoolManagerTestRoot>(taskId);
  //       // }
  //       // if (idx == "5") {
  //       //   // deleted
  //       // }
  //       // if (idx == "6") {
  //       //   // const result: DoubleInitializeTestRoot =
  //       //   //   await getAsType<DoubleInitializeTestRoot>(taskId);
  //       //   // const TestList: TestResult[] = result.result.result;
  //       //   // setComponents((prevComponents) => [
  //       //   //   ...prevComponents,
  //       //   //   TestList.map((test) => (
  //       //   //     <div key={taskId} className='bg-gray-200'>
  //       //   //       <p>Task ID: {taskId}</p>
  //       //   //       <p>Mode: {result.result.mode}</p>
  //       //   //       <p>Name: {test.name}</p>
  //       //   //       <p>PASS: {test.PASS}</p>
  //       //   //       <p>FAIL: {test.FAIL}</p>
  //       //   //       <p>Status: {test.status}</p>
  //       //   //       <p>FailList: {test.failList}</p>
  //       //   //       <p>Data: {test.data}</p>
  //       //   //     </div>)))
  //       // }
  //       // if (idx == "7") {
  //       //   const result: ProxyTestRoot = await getAsType<ProxyTestRoot>(taskId);
  //       // }
  //     };
  //   }
  // }, [timeHash, hooks, mode, cpnt]);

  return (
    <div>
      <p>{timeHash}</p>
      <p>{hooks}</p>
      {components.map((component, idx) => (
        <div key={idx} className="bg-gray-200">
          <p>Test Name: {component.testName}</p>
          <p>Message: {component.msg}</p>
          <p>Description: {component.description}</p>
          <p>Trace: {component.trace}</p>
          <p>Impact: {component.impact}</p>
          <p>Status Code: {component.statusCode}</p>
          <p>Status: {component.status}</p>
        </div>
      ))}
    </div>
  );
}

// import React, { useEffect, useRef, useState } from "react";
// import { componentNames, ResponseMetadata } from "@/utils/ResponseMapper";
// import TaskCreationRequest from "@/types/request/api/tasks/TaskCreationRequest";
// import { get } from "../actions/v1/tasks/actions";
// import { DynamicTokenPriceResult } from "@/components/result/dynamic";

// export default function DashBoard() {
//   const mode = 2;
//   const cpnt = 2;
//   const len = 6;

//   const [timeHash, setTimeHash] = useState<string>("");
//   const [hooks, setHooks] = useState<string>("");
//   const [components, setComponents] = useState<JSX.Element[]>([]);

//   useEffect(() => {
//     const parsedStorage = JSON.parse(
//       localStorage.getItem("_herbicide_response")!
//     );
//     setTimeHash(parsedStorage.info.timeHash);
//     setHooks(parsedStorage.info.hooks);

//     if (eventSource.current === null) {
//       const endpoint = `/api/noti/${timeHash}/${hooks}/${mode}/${cpnt}`;
//       eventSource.current = new EventSource(endpoint, {
//         withCredentials: true,
//       });
//       eventSource.current.onmessage = async (event: MessageEvent) => {
//         const idx: string = event.data.match(/idx\s+:\s+(\S+),/)![1];
//         const taskId: string = event.data.match(/task-id\s+:\s+(\S+)/)![1];
//         console.log(idx);
//         console.log(taskId);

//         const result: DynamicAnalysisResponseType = await fetch(
//           `/api/result/${taskId}`
//         ).then((res) => res.json());
//         const newComponent = (
//           <div key={taskId} className='bg-gray-200'>
//             <p>Task ID: {taskId}</p>
//             <p>Mode: {result.result.mode}</p>
//           </div>
//         );
//         setComponents((prevComponents) => [...prevComponents, newComponent]);
//       };
//     }
//   }, [timeHash, hooks, mode, cpnt]);

//   useEffect(() => {
//     if (components.length >= len) {
//       eventSource.current?.close();
//     }
//   }, [components, len]);

//   const eventSource = useRef<EventSource | null>(null);

//   return <div>{components}</div>;
// }
