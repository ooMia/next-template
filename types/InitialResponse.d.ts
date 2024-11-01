export interface InitialResponse {
  msg: string;
  info: Info;
  testCache?: string[];
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
