import { post } from "@/app_legacy/actions/v1/tasks/actions";
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
