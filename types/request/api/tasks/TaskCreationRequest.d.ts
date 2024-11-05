// @see https://github.com/Gamzanet/fastAPI/blob/5badeda4aa0226c809ef0cd3a0142f9f96164384/src/run.py#L119

import { Address, PoolKeyType } from "@/types/Property";

export default interface TaskCreationRequest {
  data: {
    Poolkey?: PoolKeyType;
    source?: string;
    mode: number; // 1: all | 2: dynamic | 3: static | 4: source-only
    deployer?: Address;
  };
}

export interface TaskCreationSourceOnlyRequest {
  data: {
    source: string;
    mode: 4;
    deployer?: Address;
  };
}

export interface TaskCreationPoolKeyRequest {
  data: {
    Poolkey: PoolKeyType;
    mode: 1 | 2 | 3;
    deployer?: Address;
  };
}

export interface TaskCreationStaticRequest {
  data: {
    Poolkey: PoolKeyType;
    mode: 3;
    deployer?: Address;
  };
}

export interface TaskCreationDynamicRequest {
  data: {
    Poolkey: PoolKeyType;
    mode: 2;
    deployer?: Address;
  };
}

export interface TaskCreationAllRequest {
  data: {
    Poolkey: PoolKeyType;
    mode: 1;
    deployer?: Address;
  };
}

// {"data":{"Poolkey":{"currency0":"0x0197481B0F5237eF312a78528e79667D8b33Dcff","currency1":"0xA56569Bd93dc4b9afCc871e251017dB0543920d4","fee":3000,"tickSpacing":60,"hooks":"0x6caC2dcc5eCf5caac0382F1B4A77EABac0F6C0Cc"},"mode":2}}
