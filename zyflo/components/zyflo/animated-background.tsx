"use client"

import React, { useEffect, useRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, Variants, HTMLMotionProps } from "framer-motion"
import Image from "next/image"

export const PossibleZyfloAnimatedBackgroundVariant = [
  "purple-haze",
  "blue-skies",
  "pink-dreams",
  "ocean-breeze",
  "lavender-mist",
  "aqua-marine",
  "emerald-glow",
  "mint-chocolate",
  "pastel-paradise",
  "lime-light",
  "shadow-dance",
  "custom"
] as const

export type ZyfloAnimatedBackgroundVariant =
  (typeof PossibleZyfloAnimatedBackgroundVariant)[number]

const backgroundVariants = cva("w-full h-full", {
  variants: {
    variant: {
      "purple-haze": "bg-[#8a2be2]",
      "blue-skies": "bg-[#87ceeb]",
      "pink-dreams": "bg-[#ff99d3]",
      "ocean-breeze": "bg-[#99ccff]",
      "lavender-mist": "bg-[#a899ff]",
      "aqua-marine": "bg-[#7fffd4]",
      "emerald-glow": "bg-[#50c878]",
      "mint-chocolate": "bg-[#3eb489]",
      "pastel-paradise": "bg-[#ffd1dc]",
      "lime-light": "bg-[#bfff00]",
      "shadow-dance": "bg-[#080808]",
      custom: "bg-transparent"
    }
  },
  defaultVariants: { variant: "purple-haze" }
})

const gradientConfigs = {
  "purple-haze": [
    { x: 80, y: 88, color: "hsla(270,60%,50%,1)" },
    { x: 28, y: 26, color: "hsla(280,70%,60%,1)" },
    { x: 88, y: 90, color: "hsla(260,80%,70%,1)" },
    { x: 44, y: 29, color: "hsla(290,75%,55%,1)" },
    { x: 14, y: 92, color: "hsla(250,65%,65%,1)" },
    { x: 19, y: 57, color: "hsla(240,85%,75%,1)" },
    { x: 31, y: 3, color: "hsla(300,90%,80%,1)" }
  ],
  "blue-skies": [
    { x: 16, y: 5, color: "hsla(200,80%,70%,1)" },
    { x: 68, y: 79, color: "hsla(220,90%,60%,1)" },
    { x: 43, y: 7, color: "hsla(180,100%,85%,1)" },
    { x: 37, y: 94, color: "hsla(240,70%,50%,1)" },
    { x: 10, y: 88, color: "hsla(190,60%,90%,1)" },
    { x: 14, y: 86, color: "hsla(210,80%,40%,1)" },
    { x: 65, y: 71, color: "hsla(170,100%,70%,1)" }
  ],
  "pink-dreams": [
    { x: 2, y: 79, color: "hsla(328,60%,78%,1)" },
    { x: 38, y: 22, color: "hsla(313,75%,63%,1)" },
    { x: 78, y: 48, color: "hsla(348,71%,71%,1)" },
    { x: 89, y: 55, color: "hsla(0,75%,62%,1)" },
    { x: 60, y: 89, color: "hsla(31,82%,61%,1)" },
    { x: 30, y: 94, color: "hsla(346,96%,74%,1)" },
    { x: 81, y: 27, color: "hsla(304,97%,71%,1)" }
  ],
  "ocean-breeze": [
    { x: 8, y: 69, color: "hsla(200,80%,60%,1)" },
    { x: 0, y: 94, color: "hsla(180,100%,50%,1)" },
    { x: 1, y: 13, color: "hsla(220,70%,70%,1)" },
    { x: 94, y: 79, color: "hsla(240,90%,55%,1)" },
    { x: 20, y: 78, color: "hsla(190,100%,85%,1)" },
    { x: 24, y: 5, color: "hsla(210,100%,40%,1)" },
    { x: 4, y: 11, color: "hsla(170,80%,60%,1)" }
  ],
  "lavender-mist": [
    { x: 7, y: 89, color: "hsla(270,71%,64%,1)" },
    { x: 28, y: 50, color: "hsla(290,71%,71%,1)" },
    { x: 25, y: 31, color: "hsla(250,78%,77%,1)" },
    { x: 91, y: 30, color: "hsla(230,64%,62%,1)" },
    { x: 59, y: 21, color: "hsla(310,72%,64%,1)" },
    { x: 80, y: 90, color: "hsla(280,93%,77%,1)" },
    { x: 9, y: 79, color: "hsla(260,60%,60%,1)" }
  ],
  "aqua-marine": [
    { x: 80, y: 37, color: "hsla(180,100%,50%,1)" },
    { x: 77, y: 99, color: "hsla(200,72%,56%,1)" },
    { x: 96, y: 21, color: "hsla(220,100%,50%,1)" },
    { x: 10, y: 14, color: "hsla(160,100%,50%,1)" },
    { x: 3, y: 5, color: "hsla(190,100%,75%,1)" },
    { x: 76, y: 72, color: "hsla(170,100%,45%,1)" },
    { x: 46, y: 32, color: "hsla(210,89%,70%,1)" }
  ],
  "emerald-glow": [
    { x: 81, y: 20, color: "hsla(140,80%,50%,1)" },
    { x: 29, y: 57, color: "hsla(160,90%,40%,1)" },
    { x: 16, y: 75, color: "hsla(180,100%,45%,1)" },
    { x: 91, y: 92, color: "hsla(120,85%,55%,1)" },
    { x: 3, y: 34, color: "hsla(200,95%,60%,1)" },
    { x: 3, y: 11, color: "hsla(100,100%,65%,1)" },
    { x: 94, y: 38, color: "hsla(220,90%,70%,1)" }
  ],
  "mint-chocolate": [
    { x: 78, y: 8, color: "hsla(160,50%,70%,1)" },
    { x: 2, y: 75, color: "hsla(30,60%,25%,1)" },
    { x: 35, y: 27, color: "hsla(140,70%,80%,1)" },
    { x: 11, y: 29, color: "hsla(20,80%,20%,1)" },
    { x: 54, y: 75, color: "hsla(150,60%,75%,1)" },
    { x: 16, y: 63, color: "hsla(10,70%,30%,1)" },
    { x: 88, y: 79, color: "hsla(170,80%,85%,1)" }
  ],
  "pastel-paradise": [
    { x: 54, y: 18, color: "hsla(350,100%,85%,1)" },
    { x: 13, y: 71, color: "hsla(180,100%,85%,1)" },
    { x: 58, y: 83, color: "hsla(60,100%,85%,1)" },
    { x: 53, y: 65, color: "hsla(270,100%,85%,1)" },
    { x: 9, y: 94, color: "hsla(120,100%,85%,1)" },
    { x: 20, y: 23, color: "hsla(30,100%,85%,1)" },
    { x: 30, y: 80, color: "hsla(210,100%,85%,1)" }
  ],
  "lime-light": [
    { x: 80, y: 88, color: "hsla(82,100%,60%,1)" },
    { x: 28, y: 26, color: "hsla(100,100%,60%,1)" },
    { x: 88, y: 90, color: "hsla(90,100%,70%,1)" },
    { x: 44, y: 29, color: "hsla(95,100%,65%,1)" },
    { x: 14, y: 92, color: "hsla(98,100%,75%,1)" },
    { x: 19, y: 57, color: "hsla(80,100%,85%,1)" },
    { x: 31, y: 3, color: "hsla(78,100%,90%,1)" }
  ],
  "shadow-dance": [
    { x: 0, y: 0, color: "hsla(0,0%,0%,1)" },
    { x: 100, y: 100, color: "hsla(0,0%,100%,1)" },
    { x: 50, y: 50, color: "hsla(0,0%,50%,1)" },
    { x: 25, y: 25, color: "hsla(0,0%,25%,1)" },
    { x: 75, y: 75, color: "hsla(0,0%,75%,1)" },
    { x: 33, y: 33, color: "hsla(0,0%,33%,1)" },
    { x: 66, y: 66, color: "hsla(0,0%,66%,1)" },
    { x: 10, y: 10, color: "hsla(0,0%,10%,1)" }
  ]
}

export interface ZyfloAnimatedBackgroundProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof backgroundVariants> {
  disableAnimations?: boolean
  triggerWhenInView?: boolean
  srOnly?: string
  label?: string
  customGradients?: Array<{ x: number; y: number; color: string }>
  grain?: boolean
  grainClassName?: string
  children?: React.ReactNode
}

const ZyfloAnimatedBackground: React.FC<ZyfloAnimatedBackgroundProps> = ({
  className,
  variant = "purple-haze",
  disableAnimations = false,
  triggerWhenInView = true,
  srOnly,
  label,
  customGradients,
  grain = false,
  grainClassName,
  children,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const gradients =
      variant === "custom" && customGradients
        ? customGradients
        : gradientConfigs[variant as keyof typeof gradientConfigs]

    if (!gradients) return

    const createGradientLayer = () => {
      return gradients
        .map(
          (g) =>
            `radial-gradient(at ${g.x}% ${g.y}%, ${g.color} 0px, transparent 50%)`
        )
        .join(",")
    }

    const layer1 = createGradientLayer()
    const layer2 = createGradientLayer()

    container.style.backgroundImage = `${layer1}, ${layer2}`
    container.style.backgroundSize = "400% 400%, 400% 400%"

    if (!disableAnimations) {
      container.style.animation = "gradientAnimation 10s ease infinite"
    } else {
      container.style.backgroundPosition = "0% 0%, 100% 100%"
    }

    if (!disableAnimations) {
      const style = document.createElement("style")
      style.textContent = `
        @keyframes gradientAnimation {
          0%, 100% { background-position: 0% 0%, 100% 100%; }
          25% { background-position: 100% 0%, 0% 100%; }
          50% { background-position: 100% 100%, 0% 0%; }
          75% { background-position: 0% 100%, 100% 0%; }
        }
      `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [variant, disableAnimations, customGradients])

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  }

  const content = (
    <>
      {grain && (
        <Image
          src="/grain.png"
          alt="grain"
          draggable={false}
          className={cn(
            "absolute inset-0 left-0 top-0 z-10 size-full scale-150 select-none object-cover opacity-50 mix-blend-soft-light",
            grainClassName
          )}
          width={1200}
          height={1200}
        />
      )}
      {srOnly && <span className="sr-only">{srOnly}</span>}
    </>
  )
  if (disableAnimations) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden",
          variant === "custom"
            ? backgroundVariants({
                variant: variant as ZyfloAnimatedBackgroundVariant,
                className
              })
            : className
        )}
        aria-label={label}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {content}
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        variant === "custom"
          ? backgroundVariants({
              variant: variant as ZyfloAnimatedBackgroundVariant,
              className
            })
          : className
      )}
      variants={containerVariants}
      initial="initial"
      animate={triggerWhenInView ? undefined : "animate"}
      whileInView={triggerWhenInView ? "animate" : undefined}
      viewport={triggerWhenInView ? { once: true } : undefined}
      aria-label={label}
      {...props}
    >
      {content}
      {children}
    </motion.div>
  )
}

export default ZyfloAnimatedBackground
