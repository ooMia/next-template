import CodeHighlight from "@/component/CodeHighlight";
import { TabView } from "@/component/TabView";
import { JsxCase } from "./Components";

export default function Chapter2_jsx() {
  const title = (
    <div id="title">
      Chapter 2<br />
      JSX
    </div>
  );
  return (
    <main>
      {title}
      <TabView>
        <>
          {JsxCase.cases[0].render()}
          <CodeHighlight>{JsxCase.cases[0].src}</CodeHighlight>
        </>
        <>
          {JsxCase.cases[1].render()}
          <CodeHighlight>{JsxCase.cases[1].src}</CodeHighlight>
        </>
      </TabView>
    </main>
  );
}
