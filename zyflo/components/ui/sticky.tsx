"use client"
import React, { useEffect, useRef, useState } from "react"

interface StickyProps {
  children: React.ReactNode
  offsetTop?: number
  className?: string
  style?: React.CSSProperties
}

const Sticky: React.FC<StickyProps> = ({
  children,
  offsetTop = 0,
  className,
  style
}) => {
  const [isSticky, setIsSticky] = useState(false)
  const [stickyTop, setStickyTop] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [xy, setXy] = useState<number[]>([])
  const [docsDiv, setDocsDiv] = useState<HTMLDivElement | null>(null)
  const [initialDocsDivHeight, setInitialDocsDivHeight] = useState<number>(0)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDocsDiv(document.getElementById("docs-content") as HTMLDivElement)
      setInitialDocsDivHeight(
        document.getElementById("docs-content")?.clientHeight ?? 0
      )
    }
  }, [])
  useEffect(() => {
    const handleScroll = () => {
      setXy([window.scrollX, window.scrollY])
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const stickyPoint = stickyTop !== null ? stickyTop : rect.top

        if (window.scrollY > stickyPoint - offsetTop) {
          setIsSticky(true)
          setStickyTop(stickyPoint)
        } else {
          setIsSticky(false)
          setStickyTop(null)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [stickyTop, offsetTop])
  console.log(offsetTop + window.scrollY, "offsetTop + window.scrollY")
  console.log(window.scrollY, "window.scrollY")
  console.log(offsetTop + window.scrollY < initialDocsDivHeight - 150)
  console.log(offsetTop + window.scrollY, initialDocsDivHeight - 150)
  const stickyStyle: React.CSSProperties = isSticky
    ? {
        position: "inherit",
        paddingTop:
          offsetTop + window.scrollY < initialDocsDivHeight - 150
            ? offsetTop + window.scrollY
            : window.scrollY + 50
      }
    : {}

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, ...(isSticky ? stickyStyle : {}) }}
    >
      {children}
    </div>
  )
}

export default Sticky
