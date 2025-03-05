"use client";

import { useEffect, useState } from "react";

export function RenderClientCaseD() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export function RenderClientCaseE() {
  const ChildComponent = ({ message }: { message: string }) => {
    console.log("[ChildComponent] Render");

    useEffect(() => {
      console.log("[ChildComponent] Mount");
      return () => console.log("[ChildComponent] Unmount");
    }, []);

    return <div>{message}</div>;
  };
  const ParentComponent = () => {
    const [count, setCount] = useState(0);
    return (
      <div>
        <button
          onClick={() => {
            console.log("[ParentComponent] Increment");
            setCount(count + 1);
          }}
        >
          Increment
        </button>
        <ChildComponent message="static message" />
      </div>
    );
  };
  return <ParentComponent />;
}
