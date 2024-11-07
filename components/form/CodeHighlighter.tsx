"use client";

// @ts-ignore
import { Prism } from "react-syntax-highlighter";
// @ts-ignore
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Button } from "../ui/button";

// @todo replace library to https://github.com/FormidableLabs/prism-react-renderer

const CodeHighlighter = ({
  codeString,
  fontSize,
}: {
  codeString: string;
  fontSize: number;
}) => {
  return (
    <Prism
      language="solidity"
      style={solarizedlight}
      showLineNumbers={true}
      wrapLines={true}
      codeTagProps={{
        style: {
          fontSize: `${fontSize}rem`,
          borderRadius: "15px",
        },
      }}

      // @todo try wrap lines: checkout https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
    >
      {codeString}
    </Prism>
  );
};

const ScrollableCode = ({
  children,
  className,
  codeString,
}: {
  children?: React.ReactNode;
  className?: string;
  codeString: string;
}) => {
  const [fontSize, setFontSize] = useState(1.0);
  return (
    <ScrollArea.Root
      className={`h-[500px] h-max-[30vh] w-full overflow-hidden rounded bg-white shadow-[0_2px_10px] shadow-blackA4 relative ${className}`}
    >
      <div className="py-2 absolute right-0 top-0">
        <Button
          className="rounded-[15px] p-2 m-2 text-xl w-fit-content text-align-center bg-blue-500 text-white hover:bg-blue-600 select-none"
          onClick={() => {
            setFontSize(fontSize + 0.5);
          }}
        >
          🔍➕
        </Button>
        <Button
          className="rounded-[15px] p-2 m-2 text-xl w-fit-content text-align-center bg-blue-500 text-white hover:bg-blue-600 select-none"
          onClick={() => {
            setFontSize(fontSize > 1 ? fontSize - 0.5 : 1);
          }}
        >
          🔍➖
        </Button>
      </div>
      <ScrollArea.Viewport className="size-full rounded">
        {children}
        <CodeHighlighter codeString={codeString} fontSize={fontSize} />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-mauve10 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-mauve10 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-blackA5" />
    </ScrollArea.Root>
  );
};

export default ScrollableCode;
