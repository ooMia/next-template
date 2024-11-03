import { PoolKeyType } from "@/types/Property";

export default interface TaskCreationRequest {
  data: {
    Poolkey: PoolKeyType;
    mode: number;
  };
}
