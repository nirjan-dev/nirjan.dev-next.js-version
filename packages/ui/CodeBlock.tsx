import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import NightOwl from "react-syntax-highlighter/dist/cjs/styles/hljs/night-owl";

export const CodeBlock = ({
  node,
}: {
  node: {
    language: string;
    code: string;
  };
}) => {
  const { language, code } = node;
  return (
    <SyntaxHighlighter
      wrapLongLines={true}
      language={language}
      style={NightOwl}
    >
      {code}
    </SyntaxHighlighter>
  );
};
