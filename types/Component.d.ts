export default interface TestLogPreviewCardType {
  title: string;
  description: string;
  content: string;
  footer: string;
}
export interface TokenDeltaSummaryProps {
  Asset: "General" | "ERC20" | "ERC6909";

  Method: "Swap" | "AddLiquidity" | "RemoveLiquidity" | "Donate";

  MintBurn: "Burn" | "Mint" | "N/A" | "Neither";

  ExactInOut: "ExactIn" | "ExactOut" | "N/A";

  PoolHookUser: "PoolManager" | "Hook" | "User" | "Delta";

  Amount0Delta: string;

  Amount1Delta: string;

  [key: string]: any;
}
[];
