import { PoolKeyType } from "@/types/Property";

// @see https://www.notion.so/entropy1110/TradingDays-12fec224c993804c8fc4c13e4456a2b6?pvs=4#60488f42bebe4105afb9f0275d2c1ee6

export interface TimeBasedMinimumTestRoot {
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
  trace?: string;
  impact?: string;
  description?: string;
}

export interface FailList {
  name: string;
  msg: string;
  status: string;
  statusCode: number;
  trace: string;
  impact: string;
  description: string;
}
