"use client";

import CodeHighlighter from "@/components/form/CodeHighlighter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  sampleCodeTakeProfitHook,
  staticResponseOnPoolKey,
} from "@/utils/Constants";

export default function StaticAnalysisResultPage() {
  // const sampleTraceLog = useMemo(() => {
  //   // TODO: try with index 1
  //   return sampleCodeTakeProfitHook;
  // }, []);

  // const [code, setCode] = useState(sampleTraceLog);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex">
            <h1
              className="text-4xl m-3"
              style={{
                fontFamily: "sans-serif",
              }}
            >
              {
                staticResponseOnPoolKey.result.result.info.data.contract_scope
                  .name
              }
            </h1>
            <div className="flex items-end">
              <div className="flex flex-col text-xs font-fira-code m-2 ">
                <h2 className="">
                  {staticResponseOnPoolKey.result.result.info.chain_name}
                </h2>
                <h2 className="">
                  {staticResponseOnPoolKey.result.result.info.evm_version}
                </h2>

                {/* @todo https://ui.shadcn.com/docs/components/hover-card */}
                <a
                  className="text-info-500 hover:underline cursor-pointer max-w-[100px] truncate"
                  target="_blank"
                  href={`https://sepolia.uniscan.xyz/address/${staticResponseOnPoolKey.result.hooks}`}
                >
                  {staticResponseOnPoolKey.result.hooks}
                </a>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[60vh] max-w-[100vh] flex flex-col items-center">
          <CodeHighlighter codeString={sampleCodeTakeProfitHook} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
// @remind LeftSide - hook contract code
