"use client";

import ScrollableCode from "@/components/form/CodeHighlighter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  sampleCodeTakeProfitHook,
  staticResponseOnPoolKey2,
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
                staticResponseOnPoolKey2.result.result.info.data.contract_scope
                  .name
              }
            </h1>
            <div className="flex items-end">
              <div className="flex flex-col text-xs font-fira-code m-2 ">
                <h2 className="">
                  {staticResponseOnPoolKey2.result.result.info.chain_name}
                </h2>
                <h2 className="">
                  {staticResponseOnPoolKey2.result.result.info.evm_version}
                </h2>

                {/* @todo https://ui.shadcn.com/docs/components/hover-card */}
                <a
                  className="text-info-500 hover:underline cursor-pointer max-w-[100px] truncate"
                  target="_blank"
                  href={`https://sepolia.uniscan.xyz/address/${staticResponseOnPoolKey2.result.hooks}`}
                >
                  {staticResponseOnPoolKey2.result.hooks}
                </a>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollableCode codeString={sampleCodeTakeProfitHook} />
      </CardContent>
    </Card>
  );
}
