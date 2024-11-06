export default interface TestLogPreviewCardType {
  title: string;
  description: string;
  content: string;
  footer: string;
}

export type TokenDeltaSummaryProps = {
  Asset: string;
  Method: string;
  MintBurn: string;
  ExactInOut: string;
  PoolHookUser: string;
  Amount0Delta: number;
  Amount1Delta: number;
}[];
