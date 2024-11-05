import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Layout({
  children,
  StaticAnalysis,
  TraceLog,
  PoolKey,
  TokenPrice,
  EstimatedGasUsage,
  AmountDeltaSummary,
}: {
  children: React.ReactNode;
  StaticAnalysis: React.ReactNode;
  TraceLog: React.ReactNode;
  PoolKey: React.ReactNode;
  TokenPrice: React.ReactNode;
  EstimatedGasUsage: React.ReactNode;
  AmountDeltaSummary: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {StaticAnalysis}
      {TraceLog}
      <div className="z-49">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] rounded-lg border md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={75}>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                {PoolKey}
                {TokenPrice}
              </div>
              {AmountDeltaSummary}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={32}>{EstimatedGasUsage}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
      {children}
    </div>
  );
}
