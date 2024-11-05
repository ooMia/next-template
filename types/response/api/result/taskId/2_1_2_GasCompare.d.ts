import { PoolKeyType } from "@/types/Property";

// @see https://www.notion.so/entropy1110/for-loop-hook-271dcc1c8a994536bd8bcf6213e9c98c?pvs=4#ef3b17c9d392458b97fbba1e044d37fd

export interface GasCompareRoot {
  task_id: string;
  status: string;
  result: GasCompareDataResult;
}

export interface GasCompareDataResult {
  timeHash: string;
  poolKey: PoolKeyType;
  mode: number;
  result: GasCompareTestResult;
  idx: number;
  time: number;
}

export interface GasCompareTestResult {
  name: string;
  PASS: number;
  FAIL: number;
  msg: string[];
  gasPrice: string;
  hook: GasCompareEnableHook;
  noHook: GasCompareDisableHook;
  len: number;
}

type GasCompareEnableHook = GasCompareHook;
type GasCompareDisableHook = GasCompareHook;

export interface GasCompareHook {
  add: GasCompareAddLiquidity;
  remove: GasCompareRemoveLiquidity;
  donate: GasCompareDonate;
  swap: GasCompareSwap;
}

export interface GasCompareMethodBase {
  gas: string;
  totalGas: string;
}

type GasCompareAddLiquidity = GasCompareMethodBase;
type GasCompareRemoveLiquidity = GasCompareMethodBase;
type GasCompareDonate = GasCompareMethodBase;

export interface GasCompareSwap extends GasCompareMethodBase {
  priceData: GasCompareSwapPrice;
}

export interface GasCompareSwapPrice {
  lpFee: string;
  protocolFee: string;
  tokenPrice: string;
}
