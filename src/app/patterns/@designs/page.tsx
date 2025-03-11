import { Component } from "./Example";

export default async function MemoToDo() {
  return (
    <>
      <header className="flex flex-col justify-center m-4">
        <i className="code-highlight code-highlight-special pulse m-1 mr-4">
          Design Patterns
        </i>
      </header>
      <div className="flex gap-4">
        <Component />
      </div>
    </>
  );
}
