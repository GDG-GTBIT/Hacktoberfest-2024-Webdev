import React, { useState, useEffect } from "react"
import { CodeBlockWrapper } from "../code-block-wrapper"
import path from "path"

const CodeBlock = ({ filePath }) => {
  const [code, setCode] = useState("")
  console.log(path.resolve(process.cwd(), filePath))
  useEffect(() => {
    fetch(path.resolve(process.cwd(), filePath))
      .then((response) => response.text())
      .then((text) => setCode(text))
      .catch((error) => console.error("Error fetching file:", error))
  }, [filePath])

  return (
    <CodeBlockWrapper
      className="whitespace-pre-wrap"
      expandButtonTitle="Expand Code"
    >
      {code}
    </CodeBlockWrapper>
  )
}

export default CodeBlock
