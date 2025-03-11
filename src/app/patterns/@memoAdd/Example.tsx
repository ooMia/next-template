"use client";

import CodeHighlight from "@/component/CodeHighlight";
import { asLoggableComponent } from "@/module/LoggableComponent";
import React, { useState } from "react";

type PropsAddTwo = {
  n1: number;
  n2: number;
};

export const Component = () => {
  const [count, setCount] = useState(0);
  const [value1] = useState(1);
  const [value2] = useState(2);
  const [src, setSrc] = useState(Case1A_src);

  return (
    <>
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
            <tr onClick={() => setSrc(Case1A_src)} className="cursor-pointer">
              {/* 매번 리렌더링됨 - props가 같아도 부모가 리렌더링되면 다시 렌더링됨 */}
              <RegularAdd n1={value1} n2={value2} />
            </tr>

            <tr onClick={() => setSrc(Case1B_src)} className="cursor-pointer">
              {/* props가 변경되지 않으면 리렌더링되지 않음 */}
              <MemoizedAdd n1={value1} n2={value2} />
            </tr>

            <tr onClick={() => setSrc(Case1C_src)} className="cursor-pointer">
              {/* 인라인 객체는 매번 새로 생성되어 메모이제이션 효과가 없음 */}
              <NonMemoizedAddWithObjProp
                obj={{
                  n1: value1,
                  n2: value2,
                }}
              />
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

// 메모이제이션되지 않은 컴포넌트: 부모가 리렌더링되면 매번 렌더링됨
// causes re-render on parent re-render
const RegularAdd = asLoggableComponent(({ n1, n2 }: PropsAddTwo) => {
  return (
    <>
      <td>⚠️ RegularAdd</td>
      <td className="text-center">{n1 + n2}</td>
    </>
  );
}, "RegularAdd");

const Case1A_src = `"use client";

// 메모이제이션되지 않은 컴포넌트: 부모가 리렌더링되면 매번 렌더링됨
// causes re-render on parent re-render
const RegularAdd = ({ n1, n2 }) => {
  return (
    <>
      <td>⚠️ RegularAdd</td>
      <td>{n1 + n2}</td>
    </>
  );
};`;

// React.memo로 메모이제이션된 컴포넌트
// no re-render after initial render
const MemoizedAdd = React.memo(
  asLoggableComponent(({ n1, n2 }: PropsAddTwo) => {
    return (
      <>
        <td>✅ MemoizedAdd</td>
        <td className="text-center">{n1 + n2}</td>
      </>
    );
  }, "MemoizedAdd"),
);

const Case1B_src = `"use client";

import React from "react";

// React.memo로 메모이제이션된 컴포넌트
// no re-render after initial render
const MemoizedAdd = React.memo(({ n1, n2 }) => {
  return (
    <>
      <td>✅ MemoizedAdd</td>
      <td>{n1 + n2}</td>
    </>
  );
});`;

// 객체를 props로 전달받는 React.memo 컴포넌트
// 인라인 객체는 매번 새로 생성되어 메모이제이션 효과가 없음
const NonMemoizedAddWithObjProp = React.memo(
  asLoggableComponent(({ obj }: { obj: PropsAddTwo }) => {
    return (
      <>
        <td>⚠️ NonMemoizedAddWithObjProp</td>
        <td className="text-center">{obj.n1 + obj.n2}</td>
      </>
    );
  }, "NonMemoizedAddWithObjProp"),
);

const Case1C_src = `"use client";

import React from "react";

// 객체를 props로 전달받는 React.memo 컴포넌트
// 인라인 객체는 매번 새로 생성되어 메모이제이션 효과가 없음
const NonMemoizedAddWithObjProp = React.memo(({ obj }) => {
  return (
    <>
      <td>⚠️ NonMemoizedAddWithObjProp</td>
      <td>{obj.n1 + obj.n2}</td>
    </>
  );
});`;
