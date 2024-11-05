import { DynamicPoolKeyResult } from "@/components/result/dynamic";

export default function PoolKeyInformationResultPage() {
  return (
    <div className="text-xs w-fit-content">
      <DynamicPoolKeyResult
        currency0={"0x0000000000000000000000000000000000000000"}
        currency1={"0xdAC17F958D2ee523a2206206994597C13D831ec7"}
        fee={3000}
        tickSpacing={60}
        hooks={"0x6da8f09885Bb7aaD2d45476179DbC75573984080"}
      />
    </div>
  );
}
