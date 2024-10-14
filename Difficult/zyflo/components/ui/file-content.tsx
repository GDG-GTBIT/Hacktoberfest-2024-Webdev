"use client"
import { useEffect, useState } from "react"

const ZyfloFileContent = ({ fileName }) => {
  const [fileContent, setFileContent] = useState<string | null>(null)

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(
          `/api/read-file?fileName=${encodeURIComponent(fileName)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        const data = await response.json()
        console.log(data)
        if (response.ok) {
          setFileContent(data.content)
        } else {
          setFileContent("Error reading file or file is empty.")
        }
      } catch (error) {
        console.error("Error fetching file content:", error)
        setFileContent("Error reading file or file is empty.")
      }
    }

    fetchFileContent()
  }, [fileName])

  return fileContent
}

export default ZyfloFileContent
