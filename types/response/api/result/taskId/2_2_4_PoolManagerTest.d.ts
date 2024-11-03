import { PoolKeyType } from "@/types/Property";

// @see https://www.notion.so/entropy1110/ArrakisHook-53f30ea6a0584809a1c4b25a9004deaf?pvs=4#c0b8515c545940aa9459e27d2a9b9f46

export interface PoolManagerTestRoot {
  task_id: string;
  status: string;
  result: DataResult;
}

export interface DataResult {
  timeHash: string;
  poolKey: PoolKeyType;
  mode: number;
  result: TestResult;
  idx: number;
  time: number;
}

export interface TestResult {
  testList: TestList[];
  failList: FailList[];
  PASS: number;
  FAIL: number;
  name: string;
}

export interface TestList {
  name: string;
  msg: string;
  status: string;
  statusCode: number;
  description?: string;
  impact?: string;
}

export interface FailList {
  name: string;
  msg: string;
  status: string;
  statusCode: number;
  description: string;
  impact: string;
}
