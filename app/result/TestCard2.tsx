"use client";

import { useEffect, useState } from "react";
import RecursiveJson from "@/components/RecursiveJson";

export default function Comp2({
  taskId,
  timeHash,
  hooks,
}: {
  taskId: string;
  timeHash: string;
  hooks: string;
}) {
  const [data, setData] = useState(null);
  const cpnt = 2;
  const mode = 2;
  const cacheEndPoint = `/api/result/${taskId}`;
  const endpoint = `/api/noti/${timeHash}/${hooks}/${mode}/${cpnt}`;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(cacheEndPoint);
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, [cacheEndPoint]);

  return (
    <div>
      <p>comp2</p>
      {data ? <RecursiveJson data={data} depth={0} /> : <p>Loading...</p>}
    </div>
  );
}
