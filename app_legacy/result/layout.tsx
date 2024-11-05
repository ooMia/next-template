import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Layout({
  children,
  gas,
  token,
}: {
  children: React.ReactNode;
  gas: React.ReactNode;
  token: React.ReactNode;
}) {
  return (
    <div>
      <ResizablePanelGroup
        direction="horizontal"
        className="w-screen rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex items-center justify-center p-6 h-[200px]">
            {children}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25} className="overflow-y-auto">
              <div className="flex h-full items-center justify-center p-6">
                {gas}
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full items-center justify-center p-6">
                {token}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
