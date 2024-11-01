type MethodStringType = "addLiquidity" | "removeLiquidity" | "donate" | "swap";
type MethodType = Swap | AddLiquidity | RemoveLiquidity | Donate;

export default interface MapperType {
  [methodName: MethodStringType]: MethodType;

  addLiquidity: AddLiquidity;
  removeLiquidity: RemoveLiquidity;
  donate: Donate;
  swap: Swap;
}

type AssetType = "erc20" | "erc6909";
type AssetKeyType = "with_20" | "with_6909";

export interface Swap {
  exactIn: ExactRecurse;
  exactOut: ExactRecurse;
}

export interface ExactRecurse {
  erc20: ErcBase;
  erc6909: ErcBase;
}

export interface ErcBase {
  [key: string]: boolean;

  erc20: boolean;
  erc6909: boolean;
}

export interface AddLiquidity {
  exactIn: ErcBase;
  exactOut?: ErcBase;
}

export interface RemoveLiquidity {
  exactIn?: ErcBase;
  exactOut: ErcBase;
}

export interface Donate {
  exactIn: ErcBase;
  exactOut?: ErcBase;
}
