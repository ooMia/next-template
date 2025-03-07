import CodeHighlight from "@/component/CodeHighlight";
import { TabView } from "@/component/TabView";
import Image from "next/image";
import case_e from "./case_e.png";
import { RenderClientCaseD, RenderClientCaseE } from "./ClientComponents";
import { JsxCase, stringifiedElements } from "./Components";

export default function Chapter3_virtual_dom() {
  const title = (
    <div id="title">
      Chapter 3<br />
      Virtual DOM
    </div>
  );
  return (
    <main>
      {title}
      <TabView>
        <>
          {JsxCase.cases[0].render()}
          <CodeHighlight>{JsxCase.cases[0].src}</CodeHighlight>
          <CodeHighlight>{stringifiedElements[0]}</CodeHighlight>
        </>
        <>
          {JsxCase.cases[1].render()}
          <CodeHighlight>{JsxCase.cases[1].src}</CodeHighlight>
          <CodeHighlight>{stringifiedElements[1]}</CodeHighlight>
        </>
        <>
          {JsxCase.cases[2].render()}
          <CodeHighlight>{JsxCase.cases[2].src}</CodeHighlight>
          <CodeHighlight>{stringifiedElements[2]}</CodeHighlight>
        </>
        <>
          <RenderClientCaseD />
          <CodeHighlight>{JsxCase.cases[3].src}</CodeHighlight>
        </>
        <>
          <RenderClientCaseE />
          <CodeHighlight>{JsxCase.cases[4].src}</CodeHighlight>
          <Image src={case_e} alt="case e" />
        </>
      </TabView>
    </main>
  );
}
