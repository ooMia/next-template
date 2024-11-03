// Description: This file contains utility functions that map the response data to the UI components props.
// TODO: @55hnnn @Entropy1110 Implement these functions
// 배열로 입력받거나 출력되어야 한다면,
// 1. 직접 배열을 기반으로 구현하거나,
// 2. 0번째 인덱스를 가정하고 구현한 후 주석을 통해 명시하면 됩니다.

import {
  ERC20DeltaDifferenceProps,
  ERC6909DeltaDifferenceProps,
  TokenPriceProps,
  TransactionGasCostProps,
} from "@/types/DynamicAnalysis";
import { TokenPriceCompareRoot } from "@/types/response/api/result/taskId/2_0_3_TokenPriceCompare";
import { GasCompareRoot } from "@/types/response/api/result/taskId/2_1_2_GasCompare";

function toGasCompareProps(response: GasCompareRoot): TransactionGasCostProps {
  const data = response.result.result;
  return {
    swap: {
      withHook: Number(data.hook.swap.totalGas),
      withoutHook: Number(data.noHook.swap.totalGas),
    },
    removeLiquidity: {
      withHook: Number(data.hook.remove.totalGas),
      withoutHook: Number(data.noHook.remove.totalGas),
    },
    addLiquidity: {
      withHook: Number(data.hook.add.totalGas),
      withoutHook: Number(data.noHook.add.totalGas),
    },
    donate: {
      withHook: Number(data.hook.donate.totalGas),
      withoutHook: Number(data.noHook.donate.totalGas),
    },
  };
}

function toTokenPriceProps(response: TokenPriceCompareRoot): TokenPriceProps {
  const swap0 = response.result.data.with_20.swap[0];
  return {
    realPrice: Number(swap0.amount1delta) / Number(swap0.amount0delta), // in perspective of token0
    expectedPrice: swap0.calc.price_expected,
    oraclePrice: response.result.price ? response.result.price : -1, // guess `result.price` as oracle price
  };
}

function toERC20DeltaDifferenceProps(
  response: TokenPriceCompareRoot,
): ERC20DeltaDifferenceProps {
  const data = response.result.data.with_20;
  return {
    addLiquidity: {
      user: {
        amount0: Number(data.addLiquidity.userAmount0delta),
        amount1: Number(data.addLiquidity.userAmount1delta),
      },
      hook: {
        amount0: Number(data.addLiquidity.hookAmount0delta),
        amount1: Number(data.addLiquidity.hookAmount1delta),
      },
      manager: {
        amount0: Number(data.addLiquidity.managerAmount0delta),
        amount1: Number(data.addLiquidity.managerAmount1delta),
      },
    },
    removeLiquidity: {
      user: {
        amount0: Number(data.removeLiquidity.userAmount0delta),
        amount1: Number(data.removeLiquidity.userAmount1delta),
      },
      hook: {
        amount0: Number(data.removeLiquidity.hookAmount0delta),
        amount1: Number(data.removeLiquidity.hookAmount1delta),
      },
      manager: {
        amount0: Number(data.removeLiquidity.managerAmount0delta),
        amount1: Number(data.removeLiquidity.managerAmount1delta),
      },
    },
    swap: {
      user: {
        // exactIn/Out과 관련한 정보가 figma에 반영되지 않아 일단 0번째 인덱스를 참조하는 것으로 가정
        amount0: Number(data.swap[0].userAmount0delta),
        amount1: Number(data.swap[0].userAmount1delta),
      },
      hook: {
        amount0: Number(data.swap[0].hookAmount0delta),
        amount1: Number(data.swap[0].hookAmount1delta),
      },
      manager: {
        amount0: Number(data.swap[0].managerAmount0delta),
        amount1: Number(data.swap[0].managerAmount1delta),
      },
    },
    donate: {
      user: {
        amount0: Number(data.donate.userAmount0delta),
        amount1: Number(data.donate.userAmount1delta),
      },
      hook: {
        amount0: Number(data.donate.hookAmount0delta),
        amount1: Number(data.donate.hookAmount1delta),
      },
      manager: {
        amount0: Number(data.donate.managerAmount0delta),
        amount1: Number(data.donate.managerAmount1delta),
      },
    },
  };
}

function toERC6909DeltaDifferenceProps(
  response: TokenPriceCompareRoot,
): ERC6909DeltaDifferenceProps {
  const data = response.result.data.with_6909;
  return {
    addLiquidity: {
      user: {
        amount0: Number(data.addLiquidity.userAmount0delta),
        amount1: Number(data.addLiquidity.userAmount1delta),
      },
      hook: {
        amount0: Number(data.addLiquidity.hookAmount0delta),
        amount1: Number(data.addLiquidity.hookAmount1delta),
      },
      // manager unchanged
    },
    removeLiquidity: {
      user: {
        amount0: Number(data.removeLiquidity.userAmount0delta),
        amount1: Number(data.removeLiquidity.userAmount1delta),
      },
      hook: {
        amount0: Number(data.removeLiquidity.hookAmount0delta),
        amount1: Number(data.removeLiquidity.hookAmount1delta),
      },
      // manager unchanged
    },
    swap: {
      user: {
        // burn/mint 관련해서는 내부 배열을 참조하여 색인하는 과정을 거치면 되는 것으로 전달 받았고,
        // 다만, 컴포넌트를 burn/mint 2개로 분리하면 burn/mint로 구분되지 않는 나머지 메서드에 대한
        // 정보가 중복될 것으로 생각되어 내부 논의 확정 이후에 진행 예정
        amount0: Number(data.swap[0].userAmount0delta),
        amount1: Number(data.swap[0].userAmount1delta),
      },
      hook: {
        amount0: Number(data.swap[0].hookAmount0delta),
        amount1: Number(data.swap[0].hookAmount1delta),
      },
      // manager unchanged
    },
    // donation impossible
  };
}

export {
  toTokenPriceProps,
  toGasCompareProps,
  toERC20DeltaDifferenceProps,
  toERC6909DeltaDifferenceProps,
};

export interface ResponseMetadata {
  cpnt: number;
  idx: number;
  mode: number;
}

/// @see https://www.notion.so/entropy1110/56bbf3e1fc6e4e0ab31e222d0cf1e3dd?pvs=4#365fa6eb3d524963b4eb56c73c10c4a1
// [mode:2 | cpnt:0 | idx:3] TokenPriceCompare
// [mode:2 | cpnt:1 | idx:2] GasCompare
// [mode:2 | cpnt:2 | idx:0] MinimumTest
// [mode:2 | cpnt:2 | idx:1] TimeBasedMinimumTest
// [mode:2 | cpnt:2 | idx:4] PoolManagerTest
// [mode:2 | cpnt:2 | idx:5] TimeBasedStepTest
// [mode:2 | cpnt:2 | idx:6] DoubleInitializeTest
// [mode:2 | cpnt:2 | idx:7] ProxyTest
export function getResponseMetadataByComponentName(
  componentName: string,
): ResponseMetadata {
  const mapper: { [key: string]: ResponseMetadata } = {
    TokenPriceCompare: { cpnt: 0, idx: 3, mode: 2 },
    GasCompare: { cpnt: 1, idx: 2, mode: 2 },
    MinimumTest: { cpnt: 2, idx: 0, mode: 2 },
    TimeBasedMinimumTest: { cpnt: 2, idx: 1, mode: 2 },
    PoolManagerTest: { cpnt: 2, idx: 4, mode: 2 },
    TimeBasedStepTest: { cpnt: 2, idx: 5, mode: 2 },
    DoubleInitializeTest: { cpnt: 2, idx: 6, mode: 2 },
    ProxyTest: { cpnt: 2, idx: 7, mode: 2 },
  };
  return {
    mode: mapper[componentName].mode,
    cpnt: mapper[componentName].cpnt,
    idx: mapper[componentName].idx,
  };
}

export const componentNames = [
  "MinimumTest", // idx: 0
  "TimeBasedMinimumTest", // idx: 1
  "GasCompare", // idx: 2
  "TokenPriceCompare", // idx: 3
  "PoolManagerTest", // idx: 4
  "TimeBasedStepTest", // idx: 5
  "DoubleInitializeTest", // idx: 6
  "ProxyTest", // idx: 7
] as const;
export type ComponentNameType = (typeof componentNames)[number];
