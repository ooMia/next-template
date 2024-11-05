import { PoolKeyType } from "@/types/Property";
import {
  FileScope,
  ContractScope,
  Variable,
  Parameter,
  FunctionScope,
} from "./CommonTypes";

export interface PoolKeyStaticResultRoot {
  task_id: string;
  status: string;
  result: PoolKeyStaticResultResult;
}

export interface PoolKeyStaticResultResult {
  timeHash: string;
  hooks: string;
  result: PoolKeyStaticResultResult2;
  slither: PoolKeyStaticResultSlither;
  mode: number;
  idx: number;
  poolKey: PoolKeyType;
}

export interface PoolKeyStaticResultResult2 {
  info: PoolKeyStaticResultInfo;
  threats: PoolKeyStaticResultThreat[];
}

export interface PoolKeyStaticResultInfo {
  chain_name: string;
  evm_version: string;
  data: FileScope;
}

export interface PoolKeyStaticResultThreat {
  detector: string;
  data: PoolKeyStaticResultData2;
}

export interface PoolKeyStaticResultData2 {
  description: string;
  impact: string;
}

export interface PoolKeyStaticResultSlither {
  detector: PoolKeyStaticResultDetector;
  printer: PoolKeyStaticResultPrinter;
}

export interface PoolKeyStaticResultDetector {
  success: boolean;
  error: any;
  detector: string;
  data: PoolKeyStaticResultDaum[];
}

export interface PoolKeyStaticResultDaum {
  description: string;
  markdown: string;
  check: string;
  impact: string;
  confidence: string;
}

export interface PoolKeyStaticResultPrinter {
  contract: string;
  success: boolean;
  error: any;
  data: PoolKeyStaticResultDaum2[];
}

export interface PoolKeyStaticResultDaum2 {
  printer: string;
  fields_names: string[];
  result: PoolKeyStaticResultResult3[];
}

export interface PoolKeyStaticResultResult3 {
  Function: string;
  "require or assert"?: string;
  Modifiers?: string[];
  "State variables written"?: string;
  "Conditions on msg.sender"?: string;
}
