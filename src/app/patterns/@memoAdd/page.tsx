import CodeHighlight from "@/component/CodeHighlight";
import { Component } from "./Example";

export default async function MemoAdd() {
  return (
    <>
      <header className="w-full justify-center">
        <b>Pure Function</b>
        <CodeHighlight>{`const add = (a, b) => a + b;`}</CodeHighlight>
      </header>
      <Component />
    </>
  );
}
