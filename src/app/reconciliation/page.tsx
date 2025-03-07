import CodeHighlight from "@/component/CodeHighlight";
import { TabView } from "@/component/TabView";
import Image from "next/image";
import {
  ClientComponentA,
  ClientComponentB,
  ClientComponentC,
  srcCaseA,
  srcCaseB,
  srcCaseC,
  treeCaseA,
} from "./ClientComponents";
import case_b from "./case_b.png";
import case_c from "./case_c.png";

export default function Chapter4_reconciliation() {
  const title = (
    <div id="title">
      Chapter 4<br />
      Reconciliation
    </div>
  );

  return (
    <main>
      {title}
      <TabView>
        <>
          <ClientComponentA />
          <CodeHighlight>{srcCaseA}</CodeHighlight>
          <CodeHighlight>{treeCaseA}</CodeHighlight>
        </>
        <>
          <ClientComponentB />
          <CodeHighlight>{srcCaseB}</CodeHighlight>
          <Image src={case_b} alt="case b" />
        </>
        <>
          <ClientComponentC />
          <CodeHighlight>{srcCaseC}</CodeHighlight>
          <Image src={case_c} alt="case c" />
        </>
      </TabView>
    </main>
  );
}
