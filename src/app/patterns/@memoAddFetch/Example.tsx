"use client";

import CodeHighlight from "@/component/CodeHighlight";
import { asLoggableComponent } from "@/module/LoggableComponent";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const apiUrl =
  "https://67zi3mmnbnn2gyxdv43mwvrdem0rkrrj.lambda-url.ap-northeast-2.on.aws/?min=10&max=50&count=1";

export const Component = () => {
  const [count, setCount] = useState(0);
  const [value] = useState(1);
  const [src, setSrc] = useState(Case2A_src);

  return (
    <>
      <link rel="preload" href={apiUrl} as="fetch" crossOrigin="anonymous" />
      <button onClick={() => setCount(count + 1)}>
        Trigger Parent Re-render <b>{count}</b>
      </button>
      <div className="table-container select-none">
        <table>
          <thead className="text-center">
            <tr>
              <th>Component</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr onClick={() => setSrc(Case2A_src)} className="cursor-pointer">
              {/* props가 변경되지 않으면 리렌더링되지 않음 */}
              <FetchOnceNoUpdate n={value} />
            </tr>
            <tr onClick={() => setSrc(Case2B_src)} className="cursor-pointer">
              {/* props가 변경되지 않으면 리렌더링되지 않음 */}
              <FetchOnEveryRender obj={{ n: value }} />
            </tr>
            <tr onClick={() => setSrc(Case2C_src)} className="cursor-pointer">
              {/* props가 변경되지 않으면 리렌더링되지 않음 */}
              <SWRRefreshUntilPrime n={value} />
            </tr>
            <tr onClick={() => setSrc(Case2D_src)} className="cursor-pointer">
              {/* props가 변경되지 않으면 리렌더링되지 않음 */}
              <SWROnceNoUpdate n={value} />
            </tr>
          </tbody>
        </table>
        <p className="flex flex-col">
          <small>
            * Click each row to see the source code for the component
          </small>
          <small>** Check the logs printed in the console</small>
        </p>
      </div>

      <CodeHighlight language="tsx">{src}</CodeHighlight>
    </>
  );
};

// ------------------ fetch examples ------------------

const FetchOnEveryRender = asLoggableComponent(function FetchOnEveryRender({
  obj,
}: {
  obj: { n: number };
}) {
  const [data, setData] = useState<number>();
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setData(data[0]));
  }, [obj]);

  return (
    <>
      <td>⚠️ FetchOnEveryRender</td>
      <td className="text-center">{data ? obj.n + data : ""}</td>
    </>
  );
}, "FetchOnEveryRender");

const Case2A_src = `"use client";

import { useEffect, useState } from "react";

const apiUrl = "https://www.randomnumberapi.com/api/v1.0/random?min=10&max=20&count=1";

// 부모 리렌더링에 매번 렌더링되고, 이 떄마다 매번 새로운 데이터를 가져옴
// causes re-render on parent re-render and fetches data on every render
function FetchOnEveryRender({ obj }) {
  const [data, setData] = useState<number>();
  useEffect(() => {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => setData(data[0]));
  }, [obj]);

  return (
    <>
      <td>FetchOnEveryRender</td>
      <td>{data ? obj.n + data : ""}</td>
    </>
  );
};`;

// React.memo로 리렌더링 방지하여 데이터를 한 번만 가져오는 컴포넌트
// fetches data only once by using React.memo
const FetchOnceNoUpdate = React.memo(
  asLoggableComponent(function FetchOnceNoUpdate({ n }: { n: number }) {
    const [data, setData] = useState<number>();
    useEffect(() => {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data[0]);
        });
    }, [n]);

    return (
      <>
        <td>✅ FetchOnceNoUpdate</td>
        <td className="text-center">{data ? n + data : ""}</td>
      </>
    );
  }, "FetchOnceNoUpdate"),
);

const Case2B_src = `"use client";

import { useEffect, useState } from "react";

const apiUrl = "https://www.randomnumberapi.com/api/v1.0/random?min=10&max=20&count=1";

// React.memo로 리렌더링 방지하여 데이터를 한 번만 가져오는 컴포넌트
// fetches data only once by using React.memo
function FetchOnceNoUpdate({ n }) {
  const [data, setData] = useState<number>();
  useEffect(() => {
    let isFetched = false;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => !isFetched && setData(data[0]));
    return () => {
      isFetched = true;
    };
  }, [n]);

  return (
    <>
      <td>FetchOnceNoUpdate</td>
      <td>{data ? n + data : ""}</td>
    </>
  );
}`;

// ------------------ SWR examples ------------------

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data[0]);

// see https://swr.vercel.app/docs/api#options
const SWRRefreshUntilPrime = React.memo(
  asLoggableComponent(function SWRRefreshUntilPrime({ n }: { n: number }) {
    function isPrime(n: number) {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); ++i) {
        if (n % i === 0) return false;
      }
      return true;
    }

    const { data } = useSWR(apiUrl, fetcher, {
      refreshInterval(latestData) {
        if (isPrime(n + latestData)) return 0;
        return 500;
      },
    });

    return (
      <>
        <td>✅ SWRRefreshUntilPrime</td>
        <td className="text-center">{data ? n + data : ""}</td>
      </>
    );
  }, "SWRRefreshUntilPrime"),
);

const Case2C_src = `"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

const apiUrl = "https://www.randomnumberapi.com/api/v1.0/random?min=10&max=20&count=1";
const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data[0]);

// see https://swr.vercel.app/docs/api#options
function SWRRefreshUntilPrime({ n }) {
  function isPrime(n: number) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); ++i) {
      if (n % i === 0) return false;
    }
    return true;
  }

  const { data } = useSWR(apiUrl, fetcher, {
    refreshInterval(latestData) {
      if (isPrime(n + latestData)) return 0;
      return 500;
    },
  });

  return (
    <>
      <td>SWRRefreshUntilPrime</td>
      <td>{data ? n + data : ""}</td>
    </>
  );
}`;

// see https://swr.vercel.app/docs/api#options
const SWROnceNoUpdate = React.memo(
  asLoggableComponent(function SWROnceNoUpdate({ n }: { n: number }) {
    const { data, isLoading } = useSWR(`${apiUrl}&&`, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });
    return (
      <>
        <td>✅ SWROnceNoUpdate</td>
        <td className="text-center">{!isLoading && data ? n + data : ""}</td>
      </>
    );
  }, "SWROnceNoUpdate"),
);

const Case2D_src = `"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

const apiUrl = "https://www.randomnumberapi.com/api/v1.0/random?min=10&max=20&count=1";
const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data[0]);

// see https://swr.vercel.app/docs/api#options
function SWROnceNoUpdate({ n }) {
  const { data, isLoading } = useSWR(\`\${apiUrl}&&\`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return (
    <>
      <td>SWROnceNoUpdate</td>
      <td>{!isLoading && data ? n + data : ""}</td>
    </>
  );
}`;
