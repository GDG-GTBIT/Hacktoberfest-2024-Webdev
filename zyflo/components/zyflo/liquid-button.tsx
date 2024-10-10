"use client"

import React, { useRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  cn,
  getAutoContrastClassName,
  getCSSVariable,
  areColorsCompatible
} from "@/lib/utils"
import { motion, Variants } from "framer-motion"

export type ZyfloLiquidButtonVariant =
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "default"
  | "secondary"
  | "gradient"
export type ZyfloLiquidButtonSize = "default" | "sm" | "lg"

export const PossibleZyfloLiquidButtonVariant = [
  "success",
  "info",
  "warning",
  "danger",
  "default",
  "secondary",
  "gradient"
] as const
export const PossibleZyfloLiquidButtonSize = ["default", "sm", "lg"] as const

const liquidButtonVariants = cva(
  "relative overflow-hidden rounded-lg font-bold no-underline zyflo-transition",
  {
    variants: {
      variant: {
        success:
          "bg-emerald-500 text-white hover:[box-shadow:0_0_25px_theme('colors.emerald.500/50%'),inset_0_0_25px_theme('colors.emerald.500/50%')]",
        info: "bg-blue-500 text-white hover:[box-shadow:0_0_25px_theme('colors.blue.500/50%'),inset_0_0_25px_theme('colors.blue.500/50%')]",
        warning:
          "bg-yellow-500 text-white hover:[box-shadow:0_0_25px_theme('colors.yellow.500/50%'),inset_0_0_25px_theme('colors.yellow.500/50%')]",
        danger:
          "bg-red-500 text-white hover:[box-shadow:0_0_25px_theme('colors.red.500/50%'),inset_0_0_25px_theme('colors.red.500/50%')]",
        default:
          "border-primary/30 text-white bg-primary hover:border-primary/80 dark:border-primary/40 dark:bg-primary dark:hover:border-primary/70 hover:[box-shadow:0_0_25px_theme('colors.primary.DEFAULT/50%'),inset_0_0_25px_theme('colors.primary.DEFAULT/50%')]",
        secondary:
          "bg-secondary text-gray-950 dark:text-gray-50 hover:[box-shadow:0_0_25px_hsl(var(--foreground)/0.08)]",
        gradient:
          "bg-gradient-to-r bg-[size:300%_300%] hover:bg-[position:0%_0%] bg-[position:100%_100%] from-primary to-primary via-accent border-primary/10 border-2 hover:border-primary/30 dark:[box-shadow:0_3px_30px_1px_hsl(var(--primary)/0.4)] dark:hover:[box-shadow:0_4px_40px_1px_hsl(var(--primary)/0.5)] hover:[box-shadow:0_4px_40px_1px_hsl(var(--primary)/0.4)] [box-shadow:0_3px_30px_1px_hsl(var(--primary)/0.3)]"
      },
      size: {
        default: "px-6 py-3 text-base",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-4 text-lg"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
)

const liquidVariants = cva(
  "absolute left-0 top-[-60px] h-[200px] w-full zyflo-transition group-hover:-top-[220px]",
  {
    variants: {
      variant: {
        success: [
          "bg-emerald-500",
          "before:bg-emerald-100",
          "after:bg-emerald-500"
        ],
        info: ["bg-blue-500", "before:bg-blue-100", "after:bg-blue-500"],
        warning: [
          "bg-yellow-500",
          "before:bg-yellow-100",
          "after:bg-yellow-500"
        ],
        danger: ["bg-red-500", "before:bg-red-100", "after:bg-red-500"],
        default: ["bg-primary", "before:bg-primary-100", "after:bg-primary"],
        secondary: [
          "bg-secondary",
          "before:bg-foreground/10",
          "after:bg-foreground/10"
        ],
        gradient: [
          "bg-gradient-to-r from-primary to-primary via-accent",
          "dark:before:bg-background before:bg-background",
          "dark:after:bg-background after:bg-background"
        ]
      }
    },
    defaultVariants: { variant: "default" }
  }
)

export interface ZyfloLiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  href?: string
  label?: string
  srOnly?: string
  disableAnimations?: boolean
  triggerWhenInView?: boolean
}

const ZyfloLiquidButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ZyfloLiquidButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(
  (
    {
      className,
      variant,
      size,
      href,
      children,
      label,
      srOnly,
      disableAnimations = false,
      triggerWhenInView = true,
      ...props
    },
    ref
  ) => {
    const Comp = href ? "a" : "button"
    const MotionComp = disableAnimations
      ? Comp
      : (motion[Comp as keyof typeof motion] as any)
    const textRef = useRef<HTMLSpanElement>(null)
    const primaryHSL = getCSSVariable("--primary")
      .replace("%", "")
      .slice(0, -1)
      .split(" ")
      .map(Number)

    const primaryAndBlackAreCompatible = areColorsCompatible(
      primaryHSL[0],
      primaryHSL[1],
      primaryHSL[2],
      0,
      0,
      0
    )
    const primaryAndWhiteAreCompatible = areColorsCompatible(
      primaryHSL[0],
      primaryHSL[1],
      primaryHSL[2],
      100,
      100,
      100
    )

    const gradientStyle =
      variant === "gradient"
        ? {
            color: getAutoContrastClassName(
              primaryAndBlackAreCompatible,
              primaryAndWhiteAreCompatible
            )
          }
        : {}

    const containerVariants: Variants = {
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
    }

    const textVariants: Variants = {
      hidden: { scale: 0 },
      visible: { scale: 1, transition: { delay: 0.3, duration: 0.3 } }
    }

    const animationProps = disableAnimations
      ? {}
      : {
          variants: containerVariants,
          initial: "hidden",
          ...(triggerWhenInView
            ? { whileInView: "visible", viewport: { once: true } }
            : { animate: "visible" })
        }

    return (
      <MotionComp
        className={cn(
          "group",
          liquidButtonVariants({ variant, size, className })
        )}
        ref={ref}
        href={href}
        aria-label={label}
        {...animationProps}
        {...props}
      >
        <motion.span
          className={cn(`relative z-10`)}
          style={{
            backgroundColor:
              variant === "gradient" ? "rgba(0,0,0,0)" : "transparent",
            ...gradientStyle
          }}
          ref={textRef}
          variants={textVariants}
        >
          {children}
        </motion.span>
        {srOnly && <span className="sr-only">{srOnly}</span>}
        {!disableAnimations && (
          <div
            className={cn(
              liquidVariants({ variant }),
              size === "sm" && "-top-[20px]",
              size === "default" && "-top-[42px]",
              size === "lg" && "-top-[48px]",
              "before:absolute before:left-0 before:top-2 before:h-[200%] before:w-[200%] before:-translate-x-1/4 before:-translate-y-3/4 before:animate-liquid-slow before:rounded-[40%] before:opacity-40",
              "after:absolute after:left-0 after:top-0 after:h-[200%] after:w-[200%] after:-translate-x-1/3 after:-translate-y-2/4 after:animate-liquid-fast after:rounded-[50%] after:opacity-60"
            )}
          />
        )}
      </MotionComp>
    )
  }
)

ZyfloLiquidButton.displayName = "ZyfloLiquidButton"

export default ZyfloLiquidButton
