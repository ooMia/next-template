export type SeverityBadgeProp = "high" | "medium" | "low" | "info";

export interface PoolKeyType {
  currency0: Address;
  currency1: Address;
  fee: number;
  tickSpacing: number;
  hooks: Address;
}

export type Address = string;
