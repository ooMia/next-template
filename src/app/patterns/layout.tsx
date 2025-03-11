import { TabView } from "@/component/TabView";

export default async function Layout({
  children,
  memoAdd,
  memoAddFetch,
  memoToDo,
}: {
  children: React.ReactNode;
  memoAdd: React.ReactNode;
  memoAddFetch: React.ReactNode;
  memoToDo: React.ReactNode;
}) {
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
        <></>
      </TabView>
    </main>
  );
}
