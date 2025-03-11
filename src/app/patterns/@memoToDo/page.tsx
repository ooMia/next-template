import { BasicToDo, MemoizedToDo } from "./Example";

export default async function MemoToDo() {
  return (
    <>
      <header className="flex flex-col justify-center">
        Practical Example
        <b>To-Do List</b>
      </header>
      <div className="flex gap-4">
        <BasicToDo />
        <MemoizedToDo />
      </div>
    </>
  );
}
