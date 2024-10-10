"use client"
import React, { useEffect } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, useInView } from "framer-motion"

export const PossibleZyfloProgressVariant = [
  "default",
  "secondary",
  "accent",
  "success",
  "info",
  "warning",
  "danger",
  "light",
  "gradient",
  "outline",
  "stripes",
  "glow"
] as const

export type ZyfloProgressVariant = (typeof PossibleZyfloProgressVariant)[number]

const progressVariants = cva("w-full rounded-full overflow-hidden relative", {
  variants: {
    variant: {
      //update all variants' backgrounds to be gradients
      default: "bg-gradient-to-r from-secondary to-secondary/80",
      secondary: "bg-gradient-to-r from-secondary to-secondary/80",
      accent: "bg-gradient-to-r from-secondary to-secondary/80",
      success:
        "bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-950",
      info: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950",
      warning:
        "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-950",
      danger:
        "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900 dark:to-red-950",
      light: "bg-gradient-to-r from-primary/10 to-accent/10",
      gradient: "bg-gradient-to-r from-primary/20 to-accent/20",
      outline: "bg-transparent border-2 border-muted",
      stripes: "bg-gradient-to-r from-secondary to-secondary/80 ",
      glow: "bg-gradient-to-r from-secondary to-secondary/80 shadow-[0_0_15px_hsl(var(--secondary))] overflow-visible"
    },
    size: {
      sm: "h-2",
      md: "h-4",
      lg: "h-6",
      xl: "h-8"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
})

const barVariants = cva("h-full rounded-full", {
  variants: {
    variant: {
      default: "bg-primary",
      secondary: "dark:bg-foreground bg-foreground/5",
      accent: "bg-gradient-to-r from-accent to-accent/80",
      success: "bg-emerald-500 dark:bg-emerald-600",
      info: "bg-blue-500 dark:bg-blue-600",
      warning: "bg-yellow-300 dark:bg-yellow-500",
      danger: "bg-red-500 dark:bg-red-600",
      light: "dark:bg-primary/60 bg-primary/80",
      gradient: "bg-gradient-to-r from-primary to-accent",
      outline: "bg-secondary",
      stripes: "",
      glow: "bg-primary dark:shadow-[0_0_35px_hsl(var(--primary)/0.5)] shadow-[0_0_35px_hsl(var(--primary)/0.3)] dark:group-hover:shadow-[0_0_35px_hsl(var(--primary)/0.76)] group-hover:shadow-[0_0_35px_hsl(var(--primary)/0.5)]"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

export interface ZyfloProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  progress: number
  showPercentage?: boolean
  disableAnimations?: boolean
  stripesColor?: string
  label?: string
  srOnly?: string
  triggerWhenInView?: boolean
  once?: boolean
  size?: "sm" | "md" | "lg" | "xl"
  progressMessage?: string
  pulse?: boolean // Add this new prop
}

export const ZyfloProgress: React.FC<ZyfloProgressProps> = ({
  className,
  variant = "default",
  progress,
  showPercentage = true,
  disableAnimations = false,
  stripesColor = "rgba(255, 255, 255, 0.2)",
  label,
  srOnly,
  triggerWhenInView = true,
  once = true,
  size = "md",
  progressMessage,
  pulse = false,
  ...props
}) => {
  const progressPercentage = Math.min(Math.max(progress, 0), 100)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once })

  useEffect(() => {
    const style = document.createElement("style")
    const styleContent = `
      @keyframes flowingGradient {
        0% {
            background-position: 0% 50%;
        }
        100% {
            background-position: 100% 50%;
        }
      }
        @keyframes stripes {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: 40px 0;
            }
        }
    `
    style.textContent = styleContent
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const stripesStyle =
    variant === "stripes"
      ? {
          backgroundImage: `linear-gradient(
      45deg,
      ${stripesColor} 25%,
      transparent 25%,
      transparent 50%,
      ${stripesColor} 50%,
      ${stripesColor} 75%,
      transparent 75%,
      transparent 100%
    )`,
          backgroundSize: "40px 40px",
          animation: "stripes 1s linear infinite"
        }
      : {}

  return (
    <div
      ref={ref}
      className={cn(progressVariants({ variant, size }), "group", className)}
      role="progressbar"
      aria-valuenow={progressPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      {...props}
    >
      {showPercentage && (
        <span
          className={cn(
            "absolute inset-0 z-10 flex items-center justify-center text-xs font-semibold",
            variant === "secondary" && "dark:mix-blend-difference",
            // (variant === "default" ||
            //   variant === "gradient" ||
            //   variant === "glow" ||
            //   variant === "accent" ||
            //   variant === "light") &&
            //   "text-white [text-shadow:_0_0_4px_rgba(0,0,0,0.6)] dark:text-inherit dark:[text-shadow:_0_0_0px_rgba(0,0,0,0)]",
            variant === "warning" &&
              "dark:[text-shadow:_0_0_4px_rgba(0,0,0,0.6)]"
          )}
        >
          {progressPercentage}% {progressMessage ? progressMessage : null}
        </span>
      )}
      <motion.div
        className={cn(barVariants({ variant }), pulse && "animate-pulse")}
        style={{
          width: `${progressPercentage}%`,
          ...stripesStyle
        }}
        initial={
          disableAnimations || !triggerWhenInView
            ? { width: `${progressPercentage}%` }
            : { width: 0 }
        }
        animate={
          !triggerWhenInView || (triggerWhenInView && isInView)
            ? { width: `${progressPercentage}%` }
            : { width: 0 }
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
      ></motion.div>
      {srOnly && <span className="sr-only">{srOnly}</span>}
    </div>
  )
}

export default ZyfloProgress
