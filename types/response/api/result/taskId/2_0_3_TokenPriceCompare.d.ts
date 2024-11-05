import { PoolKeyType } from "@/types/Property";

// @see https://www.notion.so/entropy1110/FeeTakingHook-12fec224c99380edaabef8b685ada29c?pvs=4#810087bdb74b44449cc485fb8fbcf0dc

export interface TokenPriceCompareRoot {
  task_id: string;
  status: string;
  result: TokenPriceCompareResult;
}

export interface TokenPriceCompareResult {
  name: string;
  mode: number;
  idx: number;
  time: number;
  poolKey: PoolKeyType;
  data: TokenPriceCompareData;
  price?: number; // -1 or null were found
}

export interface TokenPriceCompareData {
  with_6909: TokenPriceCompareWith6909;
  with_20: TokenPriceCompareWith20;
}

export interface TokenPriceCompareWith6909 {
  swap: TokenPriceCompareSwap[];
  addLiquidity: TokenPriceCompareAddLiquidity;
  removeLiquidity: TokenPriceCompareRemoveLiquidity;
}

export interface TokenPriceCompareWith20 {
  swap: TokenPriceCompareSwap[];
  addLiquidity: TokenPriceCompareAddLiquidity;
  donate: TokenPriceCompareDonate;
  removeLiquidity: TokenPriceCompareRemoveLiquidity;
}

interface TokenPriceCompareUnionAmountDelta {
  amount0delta: string;
  amount1delta: string;
  managerAmount0delta: string;
  managerAmount1delta: string;
  hookAmount0delta: string;
  hookAmount1delta: string;
  userAmount0delta: string;
  userAmount1delta: string;
  hook6909Amount0delta: string;
  hook6909Amount1delta: string;
  user6909Amount0delta: string;
  user6909Amount1delta: string;
}

export type TokenPriceCompareAddLiquidity = TokenPriceCompareUnionAmountDelta;

export type TokenPriceCompareRemoveLiquidity =
  TokenPriceCompareUnionAmountDelta;

export type TokenPriceCompareDonate = TokenPriceCompareUnionAmountDelta;

export interface TokenPriceCompareSwap
  extends TokenPriceCompareUnionAmountDelta {
  "for-expected-current-price"?: string; // server internal log
  "for-expected-current-liquidity"?: string; // server internal log
  "for-expected-amount0-specified"?: string; // server internal log
  "for-expected-current-fee"?: string; // server internal log

  calc: TokenPriceCompareCalc;
  is_burn: boolean;
  is_exactIn: boolean;
}

export interface TokenPriceCompareCalc {
  price_expected: number;
  sqrtP_expected: number;
  amount_in: number;
  amount_out: number;
}
