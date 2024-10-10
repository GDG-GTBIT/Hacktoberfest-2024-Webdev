"use client"
import { useRef } from "react"
import { Button } from "./ui/button"
import ZyfloWindowMockup from "./ui/window-mockup"
import ZyfloCursor from "./zyflo/cursor-follow"

export function SpotBlurCursor() {
  const spotBlurRef = useRef<HTMLDivElement>(null)
  return (
    <ZyfloWindowMockup className="relative" ref={spotBlurRef}>
      <ZyfloCursor
        variant="spot-blur"
        containerRef={spotBlurRef}
        label="Spot Blur Cursor"
        srOnly="Spot Blur Cursor"
      />
      <div className="flex items-center justify-center">
        <Button className="zyflo-hover" variant={"secondary"}>
          Hover me
        </Button>
      </div>
    </ZyfloWindowMockup>
  )
}

export function DefaultCursor() {
  const defaultRef = useRef<HTMLDivElement>(null)
  return (
    <ZyfloWindowMockup className="relative" ref={defaultRef}>
      <ZyfloCursor
        variant="default"
        containerRef={defaultRef}
        label="Default Cursor"
        srOnly="Default Cursor"
      />
      <div className="flex items-center justify-center">
        <Button className="zyflo-hover" variant={"secondary"}>
          Hover me
        </Button>
      </div>
    </ZyfloWindowMockup>
  )
}

export function RingCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  return (
    <ZyfloWindowMockup className="relative" ref={ringRef}>
      <ZyfloCursor
        variant="ring"
        containerRef={ringRef}
        label="Ring Cursor"
        srOnly="Ring Cursor"
      />
      <div className="flex items-center justify-center">
        <Button className="zyflo-hover" variant={"secondary"}>
          Hover me
        </Button>
      </div>
    </ZyfloWindowMockup>
  )
}

export function DotCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  return (
    <ZyfloWindowMockup className="relative" ref={dotRef}>
      <ZyfloCursor
        variant="dot"
        containerRef={dotRef}
        label="Dot Cursor"
        srOnly="Dot Cursor"
      />
      <div className="flex items-center justify-center">
        <Button className="zyflo-hover" variant={"secondary"}>
          Hover me
        </Button>
      </div>
    </ZyfloWindowMockup>
  )
}

export function InvertedCursor() {
  const invertedRef = useRef<HTMLDivElement>(null)
  return (
    <ZyfloWindowMockup className="relative" ref={invertedRef}>
      <ZyfloCursor
        variant="inverted"
        containerRef={invertedRef}
        label="Inverted Cursor"
        srOnly="Inverted Cursor"
      />
      <div className="flex items-center justify-center">
        <Button className="zyflo-hover" variant={"secondary"}>
          Hover me
        </Button>
      </div>
    </ZyfloWindowMockup>
  )
}
