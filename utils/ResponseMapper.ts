import {
  ERC20DeltaDifferenceProps,
  ERC6909DeltaDifferenceProps,
  TokenPriceProps,
  TransactionGasCostProps,
} from "@/types/DynamicAnalysis";
import { Comp2IntegratedAnalysisRoot2 } from "@/types/response/api/result/Comp2IntegratedAnalysisResult";
import { TokenPriceCompareRoot } from "@/types/response/api/result/taskId/2_0_3_TokenPriceCompare";
import { GasCompareRoot } from "@/types/response/api/result/taskId/2_1_2_GasCompare";
import { component2IntegratedResponse } from "./Constants";
import { TokenDeltaSummaryProps } from "@/types/Component";

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
    // TimeBasedStepTest: { cpnt: 2, idx: 5, mode: 2 }, // deleted
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
  "", // "TimeBasedStepTest", // idx: 5 // deleted
  "DoubleInitializeTest", // idx: 6
  "ProxyTest", // idx: 7
] as const;
export type ComponentNameType = (typeof componentNames)[number];

export function getMockedComponent2ResponseByIndex(
  index: number,
): Comp2IntegratedAnalysisRoot2 | undefined {
  const rawData = component2IntegratedResponse;
  for (const data of rawData) {
    if (data.result.idx === index) {
      return data;
    }
  }
}

const maliciousHookDeltaResponse: TokenPriceCompareRoot = {
  task_id: "f7d3848f-47e4-42eb-b35a-9ef4f6c6fe16",
  status: "Success",
  result: {
    name: "Price-compare-using-Pyth",
    mode: 3,
    idx: 3,
    time: 155.035403251648,
    poolKey: {
      hooks: "0x7b41FbaE73D2ACc9F2353Aa716A3FdE657eBc547",
      currency0: "0x0197481B0F5237eF312a78528e79667D8b33Dcff",
      currency1: "0xA56569Bd93dc4b9afCc871e251017dB0543920d4",
      fee: 3000,
      tickSpacing: 60,
    },
    data: {
      with_6909: {
        swap: [
          {
            "for-expected-current-price": "79228162514264337593543950336",
            "for-expected-current-liquidity": "1000000000000000000",
            "for-expected-amount0-specified": "100",
            "for-expected-current-fee": "3000",
            amount0delta: "-100",
            amount1delta: "97",
            managerAmount0delta: "0",
            managerAmount1delta: "-98",
            hookAmount0delta: "0",
            hookAmount1delta: "1",
            userAmount0delta: "0",
            userAmount1delta: "97",
            hook6909Amount0delta: "0",
            hook6909Amount1delta: "0",
            user6909Amount0delta: "-100",
            user6909Amount1delta: "0",
            calc: {
              price_expected: 1,
              sqrtP_expected: 7.922816251426433e28,
              amount_in: 100.000000000007,
              amount_out: 70.000000000005,
            },
            is_burn: true,
            is_exactIn: true,
          },
          {
            "for-expected-current-price": "79228162514264337593543950336",
            "for-expected-current-liquidity": "1000000000000000000",
            "for-expected-amount0-specified": "100",
            "for-expected-current-fee": "3000",
            amount0delta: "-100",
            amount1delta: "97",
            managerAmount0delta: "100",
            managerAmount1delta: "-1",
            hookAmount0delta: "0",
            hookAmount1delta: "1",
            userAmount0delta: "-100",
            userAmount1delta: "0",
            hook6909Amount0delta: "0",
            hook6909Amount1delta: "0",
            user6909Amount0delta: "0",
            user6909Amount1delta: "97",
            calc: {
              price_expected: 1,
              sqrtP_expected: 7.922816251426433e28,
              amount_in: 100.000000000007,
              amount_out: 70.000000000005,
            },
            is_burn: false,
            is_exactIn: true,
          },
          {
            "for-expected-current-price": "79228162514264337593543950336",
            "for-expected-current-liquidity": "1000000000000000000",
            "for-expected-amount0-specified": "99",
            "for-expected-current-fee": "3000",
            amount0delta: "-102",
            amount1delta: "99",
            managerAmount0delta: "-1",
            managerAmount1delta: "-99",
            hookAmount0delta: "1",
            hookAmount1delta: "0",
            userAmount0delta: "0",
            userAmount1delta: "99",
            hook6909Amount0delta: "0",
            hook6909Amount1delta: "0",
            user6909Amount0delta: "-102",
            user6909Amount1delta: "0",
            calc: {
              price_expected: 1,
              sqrtP_expected: 7.922816251426433e28,
              amount_in: 99.0000000000105,
              amount_out: 69.3000000000073,
            },
            is_burn: true,
            is_exactIn: false,
          },
          {
            "for-expected-current-price": "79228162514264337593543950336",
            "for-expected-current-liquidity": "1000000000000000000",
            "for-expected-amount0-specified": "99",
            "for-expected-current-fee": "3000",
            amount0delta: "-102",
            amount1delta: "99",
            managerAmount0delta: "101",
            managerAmount1delta: "0",
            hookAmount0delta: "1",
            hookAmount1delta: "0",
            userAmount0delta: "-102",
            userAmount1delta: "0",
            hook6909Amount0delta: "0",
            hook6909Amount1delta: "0",
            user6909Amount0delta: "0",
            user6909Amount1delta: "99",
            calc: {
              price_expected: 1,
              sqrtP_expected: 7.922816251426433e28,
              amount_in: 99.0000000000105,
              amount_out: 69.3000000000073,
            },
            is_burn: false,
            is_exactIn: false,
          },
        ],
        addLiquidity: {
          amount0delta: "-1054300000000000000",
          amount1delta: "-1054300000000000000",
          managerAmount0delta: "-54300000000000000",
          managerAmount1delta: "-54300000000000000",
          hookAmount0delta: "54300000000000000",
          hookAmount1delta: "54300000000000000",
          userAmount0delta: "0",
          userAmount1delta: "0",
          hook6909Amount0delta: "0",
          hook6909Amount1delta: "0",
          user6909Amount0delta: "-1054300000000000000",
          user6909Amount1delta: "-1054300000000000000",
        },
        removeLiquidity: {
          amount0delta: "945700000000000000",
          amount1delta: "945700000000000000",
          managerAmount0delta: "-54299999999999999",
          managerAmount1delta: "-54299999999999999",
          hookAmount0delta: "54299999999999999",
          hookAmount1delta: "54299999999999999",
          userAmount0delta: "0",
          userAmount1delta: "0",
          hook6909Amount0delta: "0",
          hook6909Amount1delta: "0",
          user6909Amount0delta: "945700000000000000",
          user6909Amount1delta: "945700000000000000",
        },
      },
      with_20: {
        swap: [
          {
            "for-expected-current-price": "79228162514264337593543950336",
            "for-expected-current-liquidity": "1000000000000000000",
            "for-expected-amount0-specified": "100",
            "for-expected-current-fee": "3000",
            amount0delta: "-100",
            amount1delta: "97",
            managerAmount0delta: "100",
            managerAmount1delta: "-98",
            hookAmount0delta: "0",
            hookAmount1delta: "1",
            userAmount0delta: "-100",
            userAmount1delta: "97",
            hook6909Amount0delta: "0",
            hook6909Amount1delta: "0",
            user6909Amount0delta: "0",
            user6909Amount1delta: "0",
            calc: {
              price_expected: 1,
              sqrtP_expected: 7.922816251426433e28,
              amount_in: 100.000000000007,
              amount_out: 70.000000000005,
            },
            is_burn: false,
            is_exactIn: true,
          },
          {
            "for-expected-current-price": "79228162514264337593543950336",
            "for-expected-current-liquidity": "1000000000000000000",
            "for-expected-amount0-specified": "99",
            "for-expected-current-fee": "3000",
            amount0delta: "-102",
            amount1delta: "99",
            managerAmount0delta: "101",
            managerAmount1delta: "-99",
            hookAmount0delta: "1",
            hookAmount1delta: "0",
            userAmount0delta: "-102",
            userAmount1delta: "99",
            hook6909Amount0delta: "0",
            hook6909Amount1delta: "0",
            user6909Amount0delta: "0",
            user6909Amount1delta: "0",
            calc: {
              price_expected: 1,
              sqrtP_expected: 7.922816251426433e28,
              amount_in: 99.0000000000105,
              amount_out: 69.3000000000073,
            },
            is_burn: false,
            is_exactIn: false,
          },
        ],
        addLiquidity: {
          amount0delta: "-1054300000000000000",
          amount1delta: "-1054300000000000000",
          managerAmount0delta: "1000000000000000000",
          managerAmount1delta: "1000000000000000000",
          hookAmount0delta: "54300000000000000",
          hookAmount1delta: "54300000000000000",
          userAmount0delta: "-1054300000000000000",
          userAmount1delta: "-1054300000000000000",
          hook6909Amount0delta: "0",
          hook6909Amount1delta: "0",
          user6909Amount0delta: "0",
          user6909Amount1delta: "0",
        },
        donate: {
          amount0delta: "-100",
          amount1delta: "-100",
          managerAmount0delta: "100",
          managerAmount1delta: "100",
          hookAmount0delta: "0",
          hookAmount1delta: "0",
          userAmount0delta: "-100",
          userAmount1delta: "-100",
          hook6909Amount0delta: "0",
          hook6909Amount1delta: "0",
          user6909Amount0delta: "0",
          user6909Amount1delta: "0",
        },
        removeLiquidity: {
          amount0delta: "945700000000000000",
          amount1delta: "945700000000000000",
          managerAmount0delta: "-999999999999999999",
          managerAmount1delta: "-999999999999999999",
          hookAmount0delta: "54299999999999999",
          hookAmount1delta: "54299999999999999",
          userAmount0delta: "945700000000000000",
          userAmount1delta: "945700000000000000",
          hook6909Amount0delta: "0",
          hook6909Amount1delta: "0",
          user6909Amount0delta: "0",
          user6909Amount1delta: "0",
        },
      },
    },
    price: -1,
  },
};

// export function TokenPriceCompareRootToTokenDeltaSummaryProps(
//   { result }: TokenPriceCompareRoot,
// ): TokenDeltaSummaryProps {
//   let res: TokenDeltaSummaryProps = [];
//   for (const swap of result.data.with_20.swap) {
//     res.push({
//       Asset: "swap",
//       Method: "exactInOut",
//       MintBurn: swap.is_burn ? "burn" : "mint",
//       ExactInOut: swap.is_exactIn ? "exactIn" : "exactOut",
//       PoolHookUser: "user",
//       Amount0Delta: Number(swap.amount0delta),
//       Amount1Delta: Number(swap.amount1delta),
//     });
//   }
// }
