import { CaseHandler } from "@/module/CaseHandler";
import React from "react";

const JsxCase = new CaseHandler();

// ------------------------------ Case A ------------------------------

const renderCaseA = () => {
  return React.createElement("div", { className: "my-class" }, "Hello, world!");
};
const srcCaseA = `return React.createElement(
  "div",
  { className: "my-class" },
  "Hello, world!"
);`;
JsxCase.addCase(srcCaseA, renderCaseA);

// ------------------------------ Case B ------------------------------

const renderCaseB = () => {
  const MyComponent = (props: { text: string }) => {
    return <div>{props.text}</div>;
  };
  return <MyComponent text="Hello, world!" />;
};
const srcCaseB = `const MyComponent = (props: { text: string }) => {
  return <div>{props.text}</div>;
};
return <MyComponent text="Hello, world!" />;`;
JsxCase.addCase(srcCaseB, renderCaseB);

// ------------------------------ Case C ------------------------------

const renderCaseC = () => <Parent />;
function Parent() {
  return <Child />;
}
function Child() {
  const element = <div>Hello, world!</div>;
  return element;
}

const srcCaseC = `const renderCaseC = () => {
  return <Parent />;
};
function Parent() {
  return <Child />;
}
function Child() {
  const element = <div>Hello, world!</div>;
  console.log(element);
  return element;
}`;
JsxCase.addCase(srcCaseC, renderCaseC);

// ------------------------------ Case D ------------------------------

const srcCaseD = `"use client";

import { useState } from "react";

export function RenderClientCaseD() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`;
JsxCase.addCase(srcCaseD, () => <></>);

// ------------------------------ Case E ------------------------------

const srcCaseE = `"use client";

import { useState } from "react";

export function RenderClientCaseE() {
  const ChildComponent = ({ message }: { message: string }) => {
    return <div>{message}</div>;
  };
  const ParentComponent = () => {
    const [count, setCount] = useState(0);
    return (
      <div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <ChildComponent message="static message" />
      </div>
    );
  };
  return <ParentComponent />;
}`;
JsxCase.addCase(srcCaseE, () => <></>);

// ------------------------------ Export ------------------------------

const stringifiedElements = [
  `{
  '$$typeof': Symbol(react.transitional.element),
  type: 'div',
  key: null,
  props: { className: 'my-class', children: 'Hello, world!' },
  _owner: null,
  _store: {}
}`,
  `{
  '$$typeof': Symbol(react.transitional.element),
  type: [Function: MyComponent],
  key: null,
  props: { text: 'Hello, world!' },
  _owner: null,
  _store: {}
}`,
  `{
  '$$typeof': Symbol(react.transitional.element),
  type: 'div',
  key: null,
  props: { children: 'Hello, world!' },
  _owner: {
    name: 'Child',
    env: 'Server',
    key: null,
    owner: {
      name: 'Parent',
      env: 'Server',
      key: null,
      owner: [Object],
      props: {}
    },
    props: {}
  },
  _store: {}
}`,
  ``,
  ``,
];

export { JsxCase, stringifiedElements };
