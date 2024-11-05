"use client";

import { Input } from "@/components/ui/input";
import { staticResponseOnPoolKey } from "@/utils/Constants";
import { useEffect, useState } from "react";

const response = staticResponseOnPoolKey;
type Threat = {
  check?: string;
  name?: string;
  description?: string;
  severity?: string;
  type?: string;
};

const object = response.result.result.threats.map((threat) => {
  return {
    name: threat.detector,
    description: threat.data.description,
    markdown: "",
    severity: threat.data.impact,
    check: "",
    type: "custom",
  };
});

let object2 = response.result.slither.detector.data.map((threat) => {
  return {
    name: response.result.slither.detector.detector,
    description: threat.description,
    markdown: threat.markdown,
    severity: threat.confidence,
    check: threat.check,
    type: "slither",
  };
});

object2 = object2.concat(object);

export default function StaticAnalysisResultPage() {
  const contractName = response.result.result.info.data.contract_scope.name;

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Threat[]>(
    object2.filter((item) => item.markdown.includes(contractName)),
  );

  useEffect(() => {
    setResult(
      result.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(query.toLowerCase());
      }),
    );
  }, [query, result]);

  return (
    <div className="flex flex-col">
      <Input defaultValue={query} onChange={(e) => setQuery(e.target.value)} />
      {
        <div>
          {result.map((item, index) => {
            return (
              <div key={index}>
                {/* <h1>{item.name}</h1> */}
                {/* 
                <p>{item.description}</p>
                <p>{item.severity}</p>
                 */}
                {/* <p>{item.check}</p> */}
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}
// @remind RightSide - potential issues
