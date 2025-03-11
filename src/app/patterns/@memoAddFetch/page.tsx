import CodeHighlight from "@/component/CodeHighlight";
import { Component } from "./Example";
export default async function MemoAddFetch() {
  return (
    <>
      <header className="w-full justify-center">
        <b>Side Effect</b>
        <CodeHighlight>
          {`fetch(apiUrl)
  .then((res) => res.json())`}
        </CodeHighlight>
      </header>
      <Component />
    </>
  );
}
