"use client"

import React, { ReactNode } from "react"
import { motion, Variants, HTMLMotionProps } from "framer-motion"

export const PossibleZyfloAOSVariants = [
  "fade",
  "slide-left",
  "slide-right",
  "slide-top",
  "slide-bottom",
  "slide-top-left",
  "slide-top-right",
  "slide-bottom-left",
  "slide-bottom-right",
  "scale-center",
  "scale-left",
  "scale-right",
  "scale-bottom",
  "scale-top",
  "scale-top-right",
  "scale-top-left",
  "scale-bottom-right",
  "scale-bottom-left",
  "rotate-right",
  "rotate-left",
  "rotate-bottom",
  "rotate-top",
  "rotate-bottom-right",
  "rotate-bottom-left",
  "rotate-top-left",
  "rotate-top-right",
  "flip-right",
  "flip-left",
  "flip-bottom",
  "flip-top",
  "flip-top-right",
  "flip-top-left",
  "flip-bottom-right",
  "flip-bottom-left"
] as const

export type ZyfloAOSVariant = (typeof PossibleZyfloAOSVariants)[number]

export const PossibleZyfloAOSEasings = [
  "ease-in",
  "ease-out",
  "ease-in-out",
  "circ-out",
  "spring"
] as const

export type ZyfloAOSEasing = (typeof PossibleZyfloAOSEasings)[number]

const createVariants = (
  variant: ZyfloAOSVariant,
  duration: number,
  easing: ZyfloAOSEasing
): Variants => {
  const baseVariants: Variants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition:
        easing === "spring"
          ? { type: "spring", bounce: 0.5, duration }
          : { duration, ease: getEasing(easing) }
    }
  }

  const transitionProps =
    easing === "spring"
      ? {
          type: "spring",
          bounce: 0.5,
          duration
        }
      : {
          duration,
          ease: getEasing(easing),
          opacity: { duration: duration * 0.75 }
        }

  switch (variant) {
    case "slide-left":
      return {
        ...baseVariants,
        hidden: { x: "-50%", opacity: 0 },
        visible: { x: 0, opacity: 1, transition: transitionProps }
      }
    case "slide-right":
      return {
        ...baseVariants,
        hidden: { x: "50%", opacity: 0 },
        visible: { x: 0, opacity: 1, transition: transitionProps }
      }
    case "slide-top":
      return {
        ...baseVariants,
        hidden: { y: "-50%", opacity: 0 },
        visible: { y: 0, opacity: 1, transition: transitionProps }
      }
    case "slide-bottom":
      return {
        ...baseVariants,
        hidden: { y: "50%", opacity: 0 },
        visible: { y: 0, opacity: 1, transition: transitionProps }
      }
    case "slide-top-right":
      return {
        ...baseVariants,
        hidden: { x: "50%", y: "-50%", opacity: 0 },
        visible: { x: 0, y: 0, opacity: 1, transition: transitionProps }
      }
    case "slide-top-left":
      return {
        ...baseVariants,
        hidden: { x: "-50%", y: "-50%", opacity: 0 },
        visible: { x: 0, y: 0, opacity: 1, transition: transitionProps }
      }
    case "slide-bottom-right":
      return {
        ...baseVariants,
        hidden: { x: "50%", y: "50%", opacity: 0 },
        visible: { x: 0, y: 0, opacity: 1, transition: transitionProps }
      }
    case "slide-bottom-left":
      return {
        ...baseVariants,
        hidden: { x: "-50%", y: "50%", opacity: 0 },
        visible: { x: 0, y: 0, opacity: 1, transition: transitionProps }
      }
    case "scale-center":
      return {
        ...baseVariants,
        hidden: { scale: 0, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: transitionProps }
      }
    case "scale-left":
      return {
        ...baseVariants,
        hidden: { scale: 0, x: "-50%", opacity: 0 },
        visible: { scale: 1, x: 0, opacity: 1, transition: transitionProps }
      }
    case "scale-right":
      return {
        ...baseVariants,
        hidden: { scale: 0, x: "50%", opacity: 0 },
        visible: { scale: 1, x: 0, opacity: 1, transition: transitionProps }
      }
    case "scale-bottom":
      return {
        ...baseVariants,
        hidden: { scale: 0, y: "50%", opacity: 0 },
        visible: { scale: 1, y: 0, opacity: 1, transition: transitionProps }
      }
    case "scale-top":
      return {
        ...baseVariants,
        hidden: { scale: 0, y: "-100%", opacity: 0 },
        visible: { scale: 1, y: 0, opacity: 1, transition: transitionProps }
      }
    case "scale-top-right":
      return {
        ...baseVariants,
        hidden: {
          x: "50%",
          y: "-50%",
          scale: 0,
          opacity: 0
        },
        visible: {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          transition: transitionProps
        }
      }
    case "scale-top-left":
      return {
        ...baseVariants,
        hidden: {
          x: "-50%",
          y: "-50%",
          scale: 0,
          opacity: 0
        },

        visible: {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          transition: transitionProps
        }
      }
    case "scale-bottom-right":
      return {
        ...baseVariants,
        hidden: { scale: 0, x: "50%", y: "50%", opacity: 0 },
        visible: {
          scale: 1,
          x: 0,
          y: 0,
          opacity: 1,
          transition: transitionProps
        }
      }
    case "scale-bottom-left":
      return {
        ...baseVariants,
        hidden: { scale: 0, x: "-50%", y: "50%", opacity: 0 },
        visible: {
          scale: 1,
          x: 0,
          y: 0,
          opacity: 1,
          transition: transitionProps
        }
      }
    case "fade":
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition:
            easing === "spring"
              ? { type: "spring", bounce: 0.5, duration }
              : { duration, ease: getEasing(easing) }
        }
      }
    case "rotate-left":
      return {
        ...baseVariants,
        hidden: { rotate: -45, x: "-25%", opacity: 0 },
        visible: { rotate: 0, x: 0, opacity: 1, transition: transitionProps }
      }
    case "rotate-right":
      return {
        ...baseVariants,
        hidden: { rotate: 45, x: "25%", opacity: 0 },
        visible: { rotate: 0, x: 0, opacity: 1, transition: transitionProps }
      }
    case "rotate-bottom":
      return {
        ...baseVariants,
        hidden: { rotate: 45, y: "25%", opacity: 0 },
        visible: { rotate: 0, y: 0, opacity: 1, transition: transitionProps }
      }
    case "rotate-top":
      return {
        ...baseVariants,
        hidden: { rotate: -45, y: "-25%", opacity: 0 },
        visible: { rotate: 0, y: 0, opacity: 1, transition: transitionProps }
      }
    case "rotate-top-right":
      return {
        ...baseVariants,
        hidden: { rotate: 45, x: "25%", y: "-25%", opacity: 0 },
        visible: {
          rotate: 0,
          x: 0,
          y: 0,
          opacity: 1,
          transition: transitionProps
        }
      }
    case "rotate-top-left":
      return {
        ...baseVariants,
        hidden: { rotate: -45, x: "-25%", y: "-25%", opacity: 0 },
        visible: {
          rotate: 0,
          x: 0,
          y: 0,
          opacity: 1,
          transition: transitionProps
        }
      }
    case "rotate-bottom-right":
      return {
        ...baseVariants,
        hidden: { rotate: 45, x: "25%", y: "25%", opacity: 0 },
        visible: {
          rotate: 0,
          x: 0,
          y: 0,
          opacity: 1,
          transition: transitionProps
        }
      }
    case "rotate-bottom-left":
      return {
        ...baseVariants,
        hidden: { rotate: -45, x: "-25%", y: "25%", opacity: 0 },
        visible: {
          rotate: 0,
          x: 0,
          y: 0,
          opacity: 1,
          transition: transitionProps
        }
      }
    case "flip-left":
      return {
        ...baseVariants,
        hidden: { rotateY: 180, x: "-25%", opacity: 0 },
        visible: { rotateY: 0, x: 0, opacity: 1, transition: transitionProps }
      }
    case "flip-right":
      return {
        ...baseVariants,
        hidden: { rotateY: -180, x: "25%", opacity: 0 },
        visible: { rotateY: 0, x: 0, opacity: 1, transition: transitionProps }
      }
    case "flip-bottom":
      return {
        ...baseVariants,
        hidden: { rotateX: -180, y: "25%", opacity: 0 },
        visible: { rotateX: 0, y: 0, opacity: 1, transition: transitionProps }
      }
    case "flip-top":
      return {
        ...baseVariants,
        hidden: { rotateX: 180, y: "-25%", opacity: 0 },
        visible: { rotateX: 0, y: 0, opacity: 1, transition: transitionProps }
      }
    case "flip-top-right":
      return {
        ...baseVariants,
        hidden: {
          rotateX: 90,
          rotateY: -90,
          x: "25%",
          y: "-25%",
          opacity: 0
        },
        visible: {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          opacity: 1,
          transition: transitionProps
        }
      }
    case "flip-top-left":
      return {
        ...baseVariants,
        hidden: {
          rotateX: 90,
          rotateY: 90,
          x: "-25%",
          y: "-25%",
          opacity: 0
        },
        visible: {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          opacity: 1,
          transition: transitionProps
        }
      }
    case "flip-bottom-right":
      return {
        ...baseVariants,
        hidden: {
          rotateX: -90,
          rotateY: -90,
          x: "25%",
          y: "25%",
          opacity: 0
        },
        visible: {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          opacity: 1,
          transition: transitionProps
        }
      }
    case "flip-bottom-left":
      return {
        ...baseVariants,
        hidden: {
          rotateX: -90,
          rotateY: 90,
          x: "-25%",
          y: "25%",
          opacity: 0
        },
        visible: {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          opacity: 1,
          transition: transitionProps
        }
      }
    default:
      return baseVariants
  }
}

export interface ZyfloAOSProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  amount?: number
  once?: boolean
  variant?: ZyfloAOSVariant
  duration?: number
  easing?: ZyfloAOSEasing
}

const getEasing = (easing: ZyfloAOSEasing) => {
  switch (easing) {
    case "ease-in":
      return "easeIn"
    case "ease-out":
      return "easeOut"
    case "ease-in-out":
      return "easeInOut"
    case "spring":
      return "spring"
    case "circ-out":
      return "circOut"
    default:
      return easing
  }
}

const ZyfloAOS: React.FC<ZyfloAOSProps> = ({
  children,
  amount = 0,
  once = false,
  className,
  variant = "fade",
  duration = 0.5,
  easing = "ease-in-out",
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once }}
      variants={createVariants(variant, duration, easing)}
      transition={
        easing === "spring"
          ? { type: "spring", bounce: 0.5, duration }
          : { duration, ease: getEasing(easing) }
      }
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default ZyfloAOS
