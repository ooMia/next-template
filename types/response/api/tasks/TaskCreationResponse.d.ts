export interface TaskCreationResponseRoot {
  msg: string;
  info: Info;
  testCache: TestCache[];
}

export interface Info {
  hooks: string;
  timeHash: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  stat: string;
}

export interface TestCache {
  task_id: string;
  date_done: string;
}
