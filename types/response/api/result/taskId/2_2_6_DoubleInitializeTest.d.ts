import { PoolKeyType } from "@/types/Property";

// Failed case
// @see https://www.notion.so/entropy1110/ArrakisHook-53f30ea6a0584809a1c4b25a9004deaf?pvs=4#88101b55e3bd4bb59521debc72f5cdad

// Passed case
// @see https://www.notion.so/entropy1110/FeeTakingHook-12fec224c99380edaabef8b685ada29c?pvs=4#dba4b252abf042a9ba2df034966b3690

export interface DoubleInitializeTestRoot {
  task_id: string;
  status: string;
  result: DataResult;
}

export interface DataResult {
  timeHash: string;
  poolKey: PoolKeyType;
  mode: number;
  result: TestResult[];
  idx: number;
  time: number;
}

export interface TestResult {
  name: string;
  PASS: number;
  FAIL: number;
  status: number;
  failList?: FailList[];
  data: StorageDiff[];
}

export interface FailList {
  name: string;
  impact: string;
  status: string;
  statusCode: number;
  description: string;
  trace: string;
}

export interface StorageDiff {
  k1: K1;
  k2: K2;
  slot: string;
  contract: string;
}

export interface K1 {
  prev_value: string;
  new_value: string;
}

export interface K2 {
  prev_value: string;
  new_value: string;
}
