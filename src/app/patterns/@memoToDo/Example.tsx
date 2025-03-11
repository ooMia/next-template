"use client";

import { asLoggableComponent } from "@/module/LoggableComponent";
import React, { useState } from "react";

type ToDo = {
  title: string;
};

export const List = ({ todos }: { todos: ToDo[] }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo.title}</li>
      ))}
    </ul>
  );
};

export function Component({
  title,
  ListComponent,
}: {
  title: string;
  ListComponent: React.ElementType<{ todos: ToDo[] }>;
}) {
  const [todos, setTodos] = useState<Array<ToDo>>([]);
  const [inputValue, setInputValue] = useState(""); // 입력값을 상태로 관리

  const adder: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (inputValue.trim()) {
      setTodos((todos) => todos.concat({ title: inputValue }));
      setInputValue("");
      console.log(`Add clicked Log(${title})`);
    }
  };

  return (
    <section className="select-none flex flex-col gap-4">
      <h1>{title}</h1>
      <div className="flex gap-2">
        <input
          name="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={adder}>Add</button>
      </div>
      <ListComponent todos={todos} />
    </section>
  );
}

export const BasicToDo = () => {
  const BasicList = asLoggableComponent(List, "BasicList");
  return <Component title="Basic To-Do List" ListComponent={BasicList} />;
};

export const MemoizedToDo = () => {
  const MemoizedList = React.memo(asLoggableComponent(List, "MemoizedList"));
  return <Component title="Memoized To-Do List" ListComponent={MemoizedList} />;
};
