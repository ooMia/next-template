import { MethodStringType } from "./Mapper";

interface TokenPriceProps {
  realPrice: number;
  expectedPrice: number;
  oraclePrice: number;
}

interface TransactionGasCostProps {
  swap: { withHook: number; withoutHook: number };
  removeLiquidity: { withHook: number; withoutHook: number };
  addLiquidity: { withHook: number; withoutHook: number };
  donate: { withHook: number; withoutHook: number };

  [key: string]: { withHook: number; withoutHook: number };
}

interface TransactionGasCostToChartProps {
  data: TransactionGasCostToChartData[];
}
interface TransactionGasCostToChartData {
  method: MethodStringType;
  enableHook: number; // gas cost
  disableHook: number; // gas cost
}

interface DeltaDifferenceType {
  user: { amount0: number; amount1: number };
  hook: { amount0: number; amount1: number };
  manager?: { amount0: number; amount1: number };

  [key: string]: { amount0: number; amount1: number };
}

interface ERCDeltaDifferenceProps {
  addLiquidity: DeltaDifferenceType;
  removeLiquidity: DeltaDifferenceType;
  swap: DeltaDifferenceType;
  donate?: DeltaDifferenceType | undefined;

  [key: string]: DeltaDifferenceType;
}

type ERC6909DeltaDifferenceProps = ERCDeltaDifferenceProps;

interface ERC20DeltaDifferenceProps extends ERCDeltaDifferenceProps {
  donate: DeltaDifferenceType;
}

interface FailedTestTraceProps {
  testName: string;
  msg?: string;
  description?: string;
  statusCode?: number;
  status?: string;
  trace?: string;
  impact?: string;
}

export {
  TokenPriceProps,
  TransactionGasCostProps,
  DeltaDifferenceType,
  ERC6909DeltaDifferenceProps,
  ERC20DeltaDifferenceProps,
  TransactionGasCostToChartProps,
  TransactionGasCostToChartData,
  FailedTestTraceProps,
};
