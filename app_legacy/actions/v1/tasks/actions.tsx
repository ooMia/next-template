import TaskCreationRequest from "@/types/request/api/tasks/TaskCreationRequest";
import { TaskCreationResponseRoot } from "@/types/response/api/tasks/TaskCreationResponse";
import {
  ComponentNameType,
  getResponseMetadataByComponentName,
  ResponseMetadata,
} from "@/utils/ResponseMapper";

export async function post(
  body: TaskCreationRequest,
): Promise<TaskCreationResponseRoot> {
  const response = await fetch(process.env.API_URL + "/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

export async function get(taskId: string): Promise<object> {
  const response = await fetch(process.env.API_URL + `/api/result/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function getAsType<T>(taskId: string): Promise<T> {
  return (await get(taskId)) as T;
}

// `/api/noti/${timeHash}/${hooks}/${mode}/${cpnt}`;
export async function subscribe(
  timeHash: string,
  hooks: string,
  mode: number,
  cpnt: number,
  maxLength: number = 1,
  callback?: (data: MessageEvent) => void,
): Promise<EventSource> {
  const eventListener = new EventSource(
    process.env.API_URL + `/api/noti/${timeHash}/${hooks}/${mode}/${cpnt}`,
    {
      withCredentials: true,
    },
  );

  let counter = 0;
  eventListener.onmessage = (event: MessageEvent) => {
    if (callback) {
      callback(event);
    }
    ++counter;
    if (counter >= maxLength) {
      eventListener.close();
    }
  };
  return eventListener;
}

export async function subscribeByComponentName(
  timeHash: string,
  hooks: string,
  componentName: ComponentNameType,
  maxLength: number = 1,
  callback?: (data: MessageEvent) => void,
): Promise<EventSource> {
  const metadata: ResponseMetadata =
    getResponseMetadataByComponentName(componentName);
  return subscribe(
    timeHash,
    hooks,
    metadata.mode,
    metadata.cpnt,
    maxLength,
    callback,
  );
}

export async function subscribeAndFetchSingleByComponentName(
  timeHash: string,
  hooks: string,
  componentName: ComponentNameType,
): Promise<object> {
  const message: ParsedEventMessageType = await new Promise((resolve) => {
    subscribeByComponentName(timeHash, hooks, componentName, 1, (event) => {
      resolve(parseEventMessage(event));
    });
  });
  return await get(message.taskId);
}

interface ParsedEventMessageType {
  index: number;
  taskId: string;
}

export async function parseEventMessage(
  event: MessageEvent,
): Promise<ParsedEventMessageType> {
  const idx: string = event.data.match(/idx\s+:\s+(\S+),/)![1];
  const taskId: string = event.data.match(/task-id\s+:\s+(\S+)/)![1];
  return { index: parseInt(idx), taskId };
}

// export async function subscribeAndFetch(
//   timeHash: string,
//   hooks: string,
//   mode: number,
//   cpnt: number
// ): Promise<EventSource> {
//   return subscribe(timeHash, hooks, mode, cpnt);
// }

// export async function subscribeAll(
//   timeHash: string,
//   hooks: string,
//   callback: (data: any) => any
// ): Promise<object>

// export async function subscribeByComponentName(
//   timeHash: string,
//   hooks: string,
//   componentName: string
// ): Promise<EventSource> {
//   {}
