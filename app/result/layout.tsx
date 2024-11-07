"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Layout({
  children,
  StaticAnalysis,
  TraceLog,
  poolKey,
  TokenPrice,
  EstimatedGasUsage,
  AmountDeltaSummary,
}: {
  children: React.ReactNode;
  StaticAnalysis: React.ReactNode;
  TraceLog: React.ReactNode;
  poolKey: React.ReactNode;
  TokenPrice: React.ReactNode;
  EstimatedGasUsage: React.ReactNode;
  AmountDeltaSummary: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-[15px]">
      {StaticAnalysis}
      {TraceLog}
      <div className="z-49 rounded-[15px]">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] rounded-[15px] border md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={75} className="rounded-[15px]">
            <div className="flex flex-col gap-4 rounded-[15px]">
              <div className="flex justify-between rounded-[15px]">
                {poolKey}
                {TokenPrice}
              </div>
              {AmountDeltaSummary}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle className="rounded-[15px]" />
          <ResizablePanel defaultSize={32} className="rounded-[15px]">
            {EstimatedGasUsage}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      {children}
    </div>
  );
}
