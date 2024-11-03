export type SeverityBadgeProp = "high" | "medium" | "low" | "info";

export interface PoolKeyType {
  currency0: string;
  currency1: string;
  fee: number;
  tickSpacing: number;
  hooks: string;
}
