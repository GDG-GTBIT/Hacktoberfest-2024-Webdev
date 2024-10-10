"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, Variants } from "framer-motion"
import {
  zyfloFadeInFromBottomVariants,
  zyfloFadeInFromTopVariants
} from "@/zyflo.config"
import { z } from "zod"
import {
  getAutoContrastClassName,
  getCSSVariable,
  areColorsCompatible
} from "@/lib/utils"

export const PossibleZyfloBadgeVariant = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "success",
  "warning",
  "info",
  "light",
  "gradient"
] as const

export type ZyfloBadgeVariant = (typeof PossibleZyfloBadgeVariant)[number]

export const PossibleZyfloBadgeSize = ["sm", "md", "lg"] as const
export type ZyfloBadgeSize = (typeof PossibleZyfloBadgeSize)[number]

export const badgeVariants = cva(
  "inline-flex items-center rounded-full zyflo-transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-2",
  {
    variants: {
      variant: {
        default:
          "border-primary/30 bg-primary/30 hover:border-primary/80 dark:border-primary/40 dark:bg-primary/30 dark:hover:border-primary/70 text-gray-950 dark:text-gray-50",
        secondary:
          "bg-secondary hover:bg-secondary/90 dark:bg-secondary dark:hover:bg-secondary/90 border-muted-foreground/20 hover:border-muted-foreground/40 text-gray-950 dark:text-gray-50",
        destructive:
          "border-red-300 bg-red-200 hover:border-red-400 dark:border-red-800 dark:bg-red-950 dark:hover:border-red-700 text-red-950 dark:text-red-50",
        outline:
          "border-gray-300 bg-transparent hover:bg-background/10 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 text-gray-950 dark:text-gray-50",
        success:
          "border-emerald-300 bg-emerald-200 hover:border-emerald-400 dark:border-emerald-800 dark:bg-emerald-950 dark:hover:border-emerald-700 text-emerald-950 dark:text-emerald-50",
        warning:
          "border-yellow-400 bg-yellow-200 hover:border-yellow-500 dark:border-yellow-800 dark:bg-yellow-950 dark:hover:border-yellow-700 text-yellow-950 dark:text-yellow-50",
        info: "border-blue-300 bg-blue-200 hover:border-blue-400 dark:border-blue-800 dark:bg-blue-950 dark:hover:border-blue-700 text-blue-950 dark:text-blue-50",
        light:
          "border-primary/20 bg-primary/10 hover:border-primary/40 dark:border-primary/30 dark:bg-primary/20 dark:hover:border-primary/50 text-primary-700 dark:text-primary-400",
        gradient:
          "bg-gradient-to-r bg-[size:300%_300%] hover:bg-[position:0%_0%] bg-[position:100%_100%] from-primary to-primary via-accent border-primary/10 hover:border-primary/30"
      },
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-1.5 text-sm",
        lg: "px-6 py-2 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export interface ZyfloBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  iconPlacement?: "left" | "right"
  disableAnimations?: boolean
  variant?: ZyfloBadgeVariant
  size?: ZyfloBadgeSize
  srOnly?: string
  label?: string
}

export const ZyfloBadge = React.forwardRef<HTMLSpanElement, ZyfloBadgeProps>(
  ({
    className,
    variant,
    size,
    icon,
    iconPlacement = "left",
    disableAnimations = false,
    children,
    srOnly,
    label,
    ...props
  }) => {
    const IconWrapper = disableAnimations ? React.Fragment : motion.span
    const iconAnimationProps = disableAnimations
      ? {}
      : {
          initial: { opacity: 0, scale: 0 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.3, delay: 0.3 },
          viewport: { once: true }
        }

    const primaryHSL: number[] = getCSSVariable("--primary")
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

    const gradientVariantClassName = getAutoContrastClassName(
      primaryAndBlackAreCompatible,
      primaryAndWhiteAreCompatible
    )

    const contentRef = React.useRef<HTMLSpanElement>(null)

    React.useEffect(() => {
      if (variant === "gradient" && contentRef.current) {
        console.log(gradientVariantClassName)
        contentRef.current.style.color = gradientVariantClassName
      }
      return () => {
        if (contentRef.current) {
          contentRef.current.style.color = ""
        }
      }
    }, [variant, gradientVariantClassName])

    const content = (
      <span
        ref={contentRef}
        className={cn(badgeVariants({ variant, size }), className)}
        {...(label && { "aria-label": label })}
        {...props}
      >
        {icon && iconPlacement === "left" && (
          <IconWrapper {...iconAnimationProps} className="mr-2">
            {icon}
          </IconWrapper>
        )}
        <motion.span
          variants={zyfloFadeInFromTopVariants as unknown as Variants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={1}
        >
          {children}
        </motion.span>
        {icon && iconPlacement === "right" && (
          <IconWrapper {...iconAnimationProps} className="ml-2">
            {icon}
          </IconWrapper>
        )}
        {srOnly && <span className="sr-only">{srOnly}</span>}
      </span>
    )

    if (disableAnimations) {
      return content
    }

    return (
      <motion.div
        variants={zyfloFadeInFromBottomVariants as unknown as Variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0 }}
        className="overflow-hidden"
      >
        {content}
      </motion.div>
    )
  }
)

ZyfloBadge.displayName = "ZyfloBadge"
