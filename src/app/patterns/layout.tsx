import { TabView } from "@/component/TabView";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  memoAdd: ReactNode;
  memoAddFetch: ReactNode;
  memoToDo: ReactNode;
  useMemo: ReactNode;
  useCallback: ReactNode;
  lazyload: ReactNode;
  useReducer: ReactNode;
  designs: ReactNode;
}

export default async function Layout({
  children,
  memoAdd,
  memoAddFetch,
  memoToDo,
  useMemo,
  useCallback,
  lazyload,
  useReducer,
  designs,
}: LayoutProps) {
  return (
    <main>
      {children}
      <TabView>
        <>
          <header>
            <i className="code-highlight code-highlight-special pulse m-1 mr-4">
              React.memo
            </i>
          </header>
          <TabView>
            {memoAdd}
            {memoAddFetch}
            {memoToDo}
          </TabView>
        </>
        <>{useMemo}</>
        <>{useCallback}</>
        <>{lazyload}</>
        <>{useReducer}</>
        <>{designs}</>
      </TabView>
    </main>
  );
}
