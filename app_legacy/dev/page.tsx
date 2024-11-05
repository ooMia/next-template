"use client";

import { post } from "@/app_legacy/actions/v1/tasks/actions";
import TaskCreationRequest from "@/types/request/api/tasks/TaskCreationRequest";
import { TaskCreationResponseRoot } from "@/types/response/api/tasks/TaskCreationResponse";
import { useEffect, useState } from "react";

export default function Page() {
  const [response, setResponse] = useState<TaskCreationResponseRoot | null>();

  useEffect(() => {
    const sampleRequest: TaskCreationRequest = {
      data: {
        Poolkey: {
          currency0: "0x6aD83000194DFCf9a0869091B2Ea7D121033163E",
          currency1: "0xe61398b1Cb0FBED8268808A983Ad71ECFE2e1Ee9",
          fee: 0,
          tickSpacing: 60,
          hooks: "0xEB0E9255aaB63951464f8adF268f676575E92000",
        },
        mode: 2,
      },
    };

    post(sampleRequest).then((response) => {
      setResponse(response);
    });
  }, []);

  return (
    <div className="">
      {response ? (
        <div>
          <div>{response.msg}</div>
          <div>{response.info.hooks}</div>
          <div>{response.info.timeHash}</div>
          <div>
            {response.info.tasks.map((task) => (
              <div key={task.id}>
                <div>{task.id}</div>
                <div>{task.stat}</div>
              </div>
            ))}
          </div>
          <div>
            {response.testCache.map((test) => (
              <div key={test.task_id}>
                <div>{test.task_id}</div>
                <div>{test.date_done}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
