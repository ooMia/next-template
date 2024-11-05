import { PoolKeyType } from "@/types/Property";

export interface Comp2IntegratedAnalysisRoot2 {
  task_id: string;
  status: string;
  result: Comp2IntegratedAnalysisResult;
}

export interface Comp2IntegratedAnalysisResult {
  timeHash: string;
  poolKey: PoolKeyType;
  mode: number;
  result: Comp2IntegratedAnalysisResult2;
  idx: number;
  time: number;
}

export interface Comp2IntegratedAnalysisResult2 {
  testList?: Comp2IntegratedAnalysisTestList[];
  failList: Comp2IntegratedAnalysisFailList[];
  PASS: number;
  FAIL: number;
  name: string;
  status?: number;
  data?: Comp2IntegratedAnalysisDaum[];
}

export interface Comp2IntegratedAnalysisTestList {
  name: string;
  msg: string;
  status: string;
  statusCode: number;
  description?: string;
  impact?: string;
  trace?: string;
  OOG?: number;
}

export interface Comp2IntegratedAnalysisFailList {
  name: string;
  msg?: string;
  status: string;
  statusCode: number;
  description: string;
  trace?: string;
  impact: string;
  OOG?: number;
}

export interface Comp2IntegratedAnalysisDaum {
  k1: Comp2IntegratedAnalysisK1;
  k2: Comp2IntegratedAnalysisK2;
  slot: string;
  contract: string;
}

export interface Comp2IntegratedAnalysisK1 {
  prev_value: string;
  new_value: string;
}

export interface Comp2IntegratedAnalysisK2 {
  prev_value: string;
  new_value: string;
}
