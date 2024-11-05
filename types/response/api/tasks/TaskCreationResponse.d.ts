export interface TaskCreationResponseRoot {
  msg: string;
  info: TaskCreationResponseInfo;
  testCache: TaskCreationResponseTestCache[];
}

export interface TaskCreationResponseInfo {
  hooks: string;
  timeHash: string;
  tasks: TaskCreationResponseTask[];
}

export interface TaskCreationResponseTask {
  id: string;
  stat: string;
}

export interface TaskCreationResponseTestCache {
  task_id: string;
  date_done: string;
}
