import { Prism } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";

// @todo replace library to https://github.com/FormidableLabs/prism-react-renderer

const CodeHighlighter = ({ codeString, fontSize = 1 }) => {
  return (
    <div style={{ fontSize: `${fontSize}rem` }}>
      <Prism
        language="solidity"
        style={solarizedlight}
        showLineNumbers={true}
        wrapLongLines={true}
        wrapLines={true}
        // @todo try wrap lines: checkout https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
      >
        {codeString}
      </Prism>
    </div>
  );
};
export default CodeHighlighter;
