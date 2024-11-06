"use client";

import { Prism } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import React, { useState } from "react";
import { Button } from "../ui/button";

// @todo replace library to https://github.com/FormidableLabs/prism-react-renderer

const CodeHighlighter = ({ codeString }) => {
  const [fontSize, setFontSize] = useState(1.3);

  return (
    <div className="rounded-[15px] relative">
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
      <div>
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
      </div>
    </div>
  );
};
export default CodeHighlighter;

const CodeHighlighterNoLine = ({ codeString, fontSize = 1 }) => {
  return (
    <div style={{ fontSize: `${fontSize}rem` }}>
      <Prism
        language="solidity"
        style={solarizedlight}
        // @todo try wrap lines: checkout https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
      >
        {codeString}
      </Prism>
    </div>
  );
};
export { CodeHighlighterNoLine };
