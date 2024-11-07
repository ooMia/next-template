import TaskCreationRequest from "@/types/request/api/tasks/TaskCreationRequest";
import { sampleTaskCreationRequest } from "./Constants";

export async function doRequest(data: TaskCreationRequest): Promise<void> {
  try {
    // TODO: revalidate cache based on user TTL settings
    if (localStorage.getItem("_herbicide_request") !== JSON.stringify(data)) {
      localStorage.setItem("_herbicide_request", JSON.stringify(data));
      const response = await post(data);
      localStorage.setItem("_herbicide_response", JSON.stringify(response));
    }
  } catch (error) {
    // console.error("Server error: ", error);
    // alert("A server error occurred. Please try again later.");
    localStorage.setItem("_herbicide_response", sampleTaskCreationRequest);
    // TODO: do actual request
  }
}

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

// https://hermes.pyth.network/api/latest_price_feeds?ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace

// async function getPythEthUsdPrice(): Promise<string> {
//   const response: {
//     price: {
//       price: string;
//       conf: string;
//       expo: number;
//       publish_time: number;
//     };
//   }[] = await fetch(
//     "https://hermes.pyth.network/api/latest_price_feeds?ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
//   ).then((res) => res.json());
//   console.log(response);
//   return response[0].price.price;
// }

// [
//   {
//     id: "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
//     price: {
//       price: "184136023127",
//       conf: "177166324",
//       expo: -8,
//       publish_time: 1692110601,
//     },
//     ema_price: {
//       price: "184100641000",
//       conf: "178704085",
//       expo: -8,
//       publish_time: 1692110601,
//     },
//   },
// ];
