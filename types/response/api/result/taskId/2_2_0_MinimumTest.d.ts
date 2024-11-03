import { PoolKeyType } from "@/types/Property";

// 14 failed case
// @see https://www.notion.so/entropy1110/GasGriefHook-12fec224c99380fab692cbb457a9d34f?pvs=4#c30c2b42b51e45559e3945c9229a00a3

// 14 passed case
// @see https://www.notion.so/entropy1110/StopLoss-12fec224c99380499032cf6c11985bf8?pvs=4#997c2530e3174cef9499d979d2a72779

export interface MinimumTestRoot {
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
  failList: FailList[]; // empty list in all passed case
  PASS: number;
  FAIL: number;
  name: string;
}

export interface TestList {
  name: string;
  msg: string;
  status: string;
  statusCode: number;
  description?: string; // not exist in passed case
  trace?: string; // not exist in passed case
  impact?: string; // not exist in passed case
  OOG?: number; // not exist in passed case
}

export interface FailList {
  name: string;
  msg: string;
  status: string;
  statusCode: number;
  description: string;
  trace: string;
  impact: string;
  OOG: number;
}
