"use client"

import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { motion, useSpring, useMotionValue } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"

export const PossibleZyfloCursorVariant = [
  "default",
  "spot-blur",
  "dot",
  "ring",
  "inverted"
] as const

export type ZyfloCursorVariant = (typeof PossibleZyfloCursorVariant)[number]

const cursorVariants = cva("absolute", {
  variants: {
    variant: {
      default: "size-8 rounded-full border-2 border-primary",
      "spot-blur": "size-16 rounded-full bg-primary/30 blur-xl",
      dot: "size-3 rounded-full bg-primary",
      ring: "size-8 rounded-full border-2 border-primary",
      inverted: "size-8 rounded-full bg-foreground mix-blend-difference"
    }
  },
  defaultVariants: { variant: "default" }
})

interface ZyfloCursorProps extends VariantProps<typeof cursorVariants> {
  containerRef: React.RefObject<HTMLElement>
  delay?: number
  easing?: string
  srOnly?: string
  label?: string
  color?: string
}

const useHoverState = () => {
  const [isHovering, setIsHovering] = useState(false)

  const onMouseEnter = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target.tagName === "A" ||
      target.classList.contains("zyflo-hover") ||
      target.closest("a, .zyflo-hover")
    ) {
      setIsHovering(true)
    }
  }

  const onMouseLeave = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target.tagName === "A" ||
      target.classList.contains("zyflo-hover") ||
      target.closest("a, .zyflo-hover")
    ) {
      setIsHovering(false)
    }
  }

  return { isHovering, onMouseEnter, onMouseLeave }
}

const ZyfloCursor: React.FC<ZyfloCursorProps> = ({
  containerRef,
  variant = "default",
  delay = 0.1,
  easing = "spring(100, 10, 0, 0)",
  srOnly,
  label,
  color
}) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { isHovering, onMouseEnter, onMouseLeave } = useHoverState()

  const springConfig = {
    bounce: 0.5,
    stiffness: 4000,
    damping: 500,
    mass: 10,
    duration: 0.1
  }

  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const container = containerRef ? containerRef.current : null
    if (!container) return

    const updateCursorPosition = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX.set(
        e.clientX -
          rect.left -
          (variant === "spot-blur" ? 54 : variant === "dot" ? 37 : 46)
      )
      mouseY.set(
        e.clientY -
          rect.top -
          (variant === "spot-blur" ? 138 : variant === "dot" ? 118 : 126)
      )
    }

    container.addEventListener("mousemove", updateCursorPosition)
    container.addEventListener("mouseenter", onMouseEnter, true)
    container.addEventListener("mouseleave", onMouseLeave, true)

    return () => {
      container.removeEventListener("mousemove", updateCursorPosition)
      container.removeEventListener("mouseenter", onMouseEnter, true)
      container.removeEventListener("mouseleave", onMouseLeave, true)
    }
  }, [containerRef, mouseX, mouseY, onMouseEnter, onMouseLeave, variant])

  const renderCursor = () => {
    const styles = {
      left: cursorX,
      top: cursorY,
      borderColor: color,
      backgroundColor: variant === "spot-blur" ? `${color}4D` : color // 4D is 30% opacity in hex
    }

    const hoverStyles = {
      scale: isHovering ? 1.5 : 1,
      opacity: isHovering ? 0.4 : 1
    }

    const commonProps = {
      className: cursorVariants({ variant }),
      style: styles,
      animate: hoverStyles,
      transition: { delay, ease: easing, ...hoverStyles }
    }

    switch (variant) {
      case "spot-blur":
      case "dot":
      case "ring":
      case "inverted":
        return (
          <div className="relative">
            <motion.div {...commonProps} />
          </div>
        )
      default:
        return (
          <div className="relative">
            <motion.div {...commonProps} />
            <motion.div
              className={`absolute ml-[12px] mt-[12px] size-2 rounded-full !bg-${
                color ? `[${color}]` : "primary"
              }`}
              style={{
                ...styles,
                backgroundColor: color ? color : "hsl(var(--primary))"
              }}
              animate={hoverStyles}
              transition={{ delay, ease: easing, ...hoverStyles }}
            />
          </div>
        )
    }
  }

  return (
    <div
      ref={cursorRef}
      aria-label={label}
      onMouseEnter={
        onMouseEnter as unknown as React.MouseEventHandler<HTMLDivElement>
      }
      onMouseLeave={
        onMouseLeave as unknown as React.MouseEventHandler<HTMLDivElement>
      }
    >
      {renderCursor()}
      {srOnly && <span className="sr-only">{srOnly}</span>}
    </div>
  )
}

export default ZyfloCursor
