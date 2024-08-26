import React, { useState } from "react";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

const CodeBlock = ({
  username,
  theme,
  card,
}: {
  username: string;
  theme: string;
  card: string;
}) => {
  const codeSnippet = `
  <iframe id="testimonial-widget" src="http://localhost:3000/embed/${username}?theme=${theme}&card=${card}" frameborder="0" scrolling="no" width="100%"></iframe>
  <script>window.addEventListener("message", (event) => {if (event.data && event.data.height) { document.getElementById("testimonial-widget").style.height = event.data.height + "px";}});</script>
  `;
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(codeSnippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: "10px",
        border: "1px solid #ddd",
        backgroundColor: "#f9f9f9",
      }}
    >
      <pre
        style={{
          margin: 0,
          overflow: "auto",
          fontFamily: "monospace",
          width: "550px",
          color: "grey",
        }}
      >
        <code>{codeSnippet}</code>
      </pre>
      <button
        onClick={handleCopyClick}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: copied ? "green" : "black",
        }}
        title={copied ? "Copied!" : "Copy to clipboard"}
      >
        {copied ? <FaClipboardCheck size={20} /> : <FaClipboard size={20} />}
      </button>
    </div>
  );
};

export default CodeBlock;
