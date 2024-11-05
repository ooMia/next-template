import {
  FileScope,
  ContractScope,
  Variable,
  Parameter,
  FunctionScope,
} from "./CommonTypes";

export interface CodeOnlyStaticResultRoot {
  task_id: string;
  status: string;
  result: CodeOnlyStaticResultResult1;
}

export interface CodeOnlyStaticResultResult1 {
  timeHash: string;
  codeHash: string;
  result: CodeOnlyStaticResultResult2;
  mode: number;
  idx: number;
}

export interface CodeOnlyStaticResultResult2 {
  info: CodeOnlyStaticResultInfo;
  threats: CodeOnlyStaticResultThreat[];
}

export interface CodeOnlyStaticResultInfo {
  chain_name: string;
  evm_version: string;
  data: FileScope;
}

export interface Threat {
  detector: string;
  data: Data2;
}

export interface Data2 {
  description: string;
  impact: string;
}
