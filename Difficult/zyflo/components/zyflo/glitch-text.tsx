"use client"

import React, { useEffect, useRef, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, Variants } from "framer-motion"
import {
  zyfloFadeInFromBottomVariants,
  zyfloFadeInFromTopVariants
} from "@/zyflo.config"

export const PossibleZyfloGlitchTextVariant = [
  "color",
  "noise",
  "transformation",
  "wave",
  "pixelate",
  "flicker",
  "aggressive-glitch",
  "disappearing-fragments",
  "tv-glitch",
  "vertical-glitch",
  "line-glitch",
  "vhs-retro-glitch",
  "chromatic-aberration",
  "color-box-glitch"
] as const

export type ZyfloGlitchTextVariant =
  (typeof PossibleZyfloGlitchTextVariant)[number]

const glitchTextVariants = cva("relative font-bold z-1", {
  variants: {
    variant: {
      color: "",
      noise: "",
      transformation: "",
      wave: "",
      pixelate: "",
      flicker: "",
      "aggressive-glitch": "",
      "disappearing-fragments": "",
      "tv-glitch": "",
      "vertical-glitch": "",
      "line-glitch": "",
      "vhs-retro-glitch": "",
      "chromatic-aberration": "",
      "color-box-glitch": ""
    },
    size: {
      sm: "xl:text-3xl lg:text-2xl md:text-xl text-lg",
      md: "xl:text-4xl lg:text-3xl md:text-2xl text-xl",
      lg: "xl:text-5xl lg:text-4xl md:text-3xl text-2xl"
    }
  },
  defaultVariants: {
    variant: "color",
    size: "md"
  }
})

export interface ZyfloGlitchTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof glitchTextVariants> {
  text: string
  colors?: {
    text?: string
    after?: string
    before?: string
  }
  intensity?: number
  disableAnimations?: boolean
  srOnly?: string
  label?: string
}

export const ZyfloGlitchText = React.forwardRef<
  HTMLSpanElement,
  ZyfloGlitchTextProps
>(
  (
    {
      className,
      variant,
      size,
      text,
      colors = {
        text: "#FFFFFF",
        after: "#FF0000",
        before: "#0000FF"
      },
      intensity = 1,
      disableAnimations = false,
      srOnly,
      label,
      ...props
    },
    ref
  ) => {
    const glitchRef = useRef<HTMLSpanElement>(null)
    const getFontProperties = (computedStyle: CSSStyleDeclaration) => {
      return `
            font-family: ${computedStyle.fontFamily};
            font-size: ${computedStyle.fontSize};
            font-weight: ${computedStyle.fontWeight};
            font-style: ${computedStyle.fontStyle};
            letter-spacing: ${computedStyle.letterSpacing};
            text-transform: ${computedStyle.textTransform};
            line-height: ${computedStyle.lineHeight};
        `
    }
    const [fontProperties, setFontProperties] = useState<string>("")

    useEffect(() => {
      if (glitchRef.current) {
        const style = document.createElement("style")
        let styleContent = ""
        setFontProperties(
          getFontProperties(window.getComputedStyle(glitchRef.current))
        )

        window.addEventListener("resize", () => {
          if (glitchRef.current) {
            const computedStyle = window.getComputedStyle(glitchRef.current)
            const fontProperties = getFontProperties(computedStyle)
            setFontProperties(fontProperties)
          }
        })

        if (variant === "color") {
          styleContent = `
            .glitch-wrapper-${variant} {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: start;
              justify-content: start;
              text-align: left;
            }
            .glitch-${variant} {
              position: relative;
              color: ${colors.text};
              z-index: 1;
              display: flex;
            }
            .glitch-${variant}:before,
            .glitch-${variant}:after {
              ${fontProperties}
              width: 100%;
              height: 100%;
              display: block;
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              opacity: 0.8;
            }
            .glitch-${variant}:before {
              animation: glitch-it-${variant} ${
            0.6 / intensity
          }s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
              color: ${colors.before};
              z-index: -1;
            }
            .glitch-${variant}:after {
              animation: glitch-it-${variant} ${
            0.6 / intensity
          }s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
              color: ${colors.after};
              z-index: -2;
            }
            @keyframes glitch-it-${variant} {
              0% {
                transform: translate(0);
              }
              20% {
                transform: translate(${
                  size === "sm" ? intensity * 1 : intensity * 2
                }px, ${size === "sm" ? intensity * 1 : intensity * 2}px);
              }
              40% {
                transform: translate(${
                  size === "sm" ? intensity * -1 : intensity * -2
                }px, ${size === "sm" ? intensity * -1 : intensity * -2}px);
              }
              60% {
                transform: translate(${
                  size === "sm" ? intensity * 1 : intensity * 2
                }px, ${size === "sm" ? intensity * 1 : intensity * 2}px);
              }
              80% {
                transform: translate(${
                  size === "sm" ? intensity * -1 : intensity * -2
                }px, ${size === "sm" ? intensity * -1 : intensity * -2}px);
              }
              to {
                transform: translate(0);
              }
            }
          `
        } else if (variant === "noise") {
          styleContent = `
            .glitch-wrapper-${variant} {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: start;
              justify-content: start;
              text-align: left;
            }
            .glitch-${variant} {
              position: relative;
              color: ${colors.text};
              z-index: 1;
            }
            .glitch-${variant}:before,
            .glitch-${variant}:after {
              ${fontProperties}
              content: attr(data-text);
              position: absolute;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: transparent;
              clip: rect(0, 900px, 0, 0);
            }
            .glitch-${variant}:before {
              left: ${size === "sm" ? "-1px" : "-2px"};
              text-shadow: 1px 0 ${colors.text};
              animation: noise-before-${variant} ${
            3 / intensity
          }s infinite linear alternate-reverse;
            }
            .glitch-${variant}:after {
              left: ${size === "sm" ? "1px" : "2px"};
              text-shadow: -1px 0 ${colors.text};
              animation: noise-after-${variant} ${
            2 / intensity
          }s infinite linear alternate-reverse;
            }
            @keyframes noise-before-${variant} {
              ${Array.from(
                { length: 20 },
                (_, i) => `
                ${i * 5}% {
                  clip: rect(${Math.random() * 100}px, 9999px, ${
                  Math.random() * 100
                }px, 0);
                }
              `
              ).join("")}
            }
            @keyframes noise-after-${variant} {
              ${Array.from(
                { length: 20 },
                (_, i) => `
                ${i * 5}% {
                  clip: rect(${Math.random() * 100}px, 9999px, ${
                  Math.random() * 100
                }px, 0);
                }
              `
              ).join("")}
            }
          `
        } else if (variant === "transformation") {
          styleContent = `
            .glitch-wrapper-${variant} {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: start;
              justify-content: start;
              text-align: left;
            }
            .glitch-${variant} {
              position: relative;
              color: ${colors.text};
              display: flex;
              align-items: start;
              justify-content: start;
              text-align: left;
              animation: shift-${variant} ${
            4 / intensity
          }s ease-in-out infinite alternate;
              transform: skewX(0deg);
            }
            @keyframes shift-${variant} {
              0%, 40%, 44%, 58%, 61%, 65%, 69%, 73%, 100% {
                transform: skewX(0deg);
              }
              41% {
                transform: skewX(10deg);
              }
              42% {
                transform: skewX(-10deg);
              }
              59% {
                transform: skewX(35deg) skewY(10deg);
              }
              60% {
                transform: skewX(-35deg) skewY(-10deg);
              }
              63% {
                transform: skewX(10deg) skewY(-5deg);
              }
              70% {
                transform: skewX(-30deg) skewY(-20deg);
              }
              71% {
                transform: skewX(10deg) skewY(-10deg);
              }
            }
          `
        } else if (variant === "wave") {
          styleContent = `
            .glitch-wrapper-${variant} {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: start;
              justify-content: start;
              text-align: left;
            }
            .glitch-${variant} {
              position: relative;
              color: ${colors.text};
              display: inline-block;
            }
            .glitch-${variant} span {
              position: relative;
              display: inline-block;
              animation: wave-${variant} ${
            1.5 / intensity
          }s ease-in-out infinite;
              animation-delay: calc(0.05s * var(--i));
            }
            @keyframes wave-${variant} {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-${size === "sm" ? 10 : 20}px);
              }
            }
          `
        } else if (variant === "pixelate") {
          styleContent = `
            .glitch-wrapper-${variant} {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: start;
              justify-content: start;
              text-align: left;
            }
            .glitch-${variant} {
              position: relative;
              color: ${colors.text};
              display: inline-block;
              animation: pixelate-${variant} ${
            1.5 / intensity
          }s steps(1, end) infinite;
            }
            @keyframes pixelate-${variant} {
              0%, 100% {
                text-shadow: 
                  -1px -1px 0 ${colors.before},
                  1px 1px 0 ${colors.after};
              }
              25% {
                text-shadow: 
                  1px -1px 0 ${colors.before},
                  -1px 1px 0 ${colors.after};
              }
              50% {
                text-shadow: 
                  1px 1px 0 ${colors.before},
                  -1px -1px 0 ${colors.after};
              }
              75% {
                text-shadow: 
                  -1px 1px 0 ${colors.before},
                  1px -1px 0 ${colors.after};
              }
            }
          `
        } else if (variant === "flicker") {
          styleContent = `
            .glitch-wrapper-${variant} {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: start;
              justify-content: start;
              text-align: left;
            }
            .glitch-${variant} {
              position: relative;
              color: ${colors.text};
              display: inline-block;
              animation: flicker-${variant} ${0.5 / intensity}s linear infinite;
            }
            @keyframes flicker-${variant} {
              0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
                opacity: 1;
                text-shadow: none;
              }
              20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
                opacity: 0.5;
                text-shadow: 
                  0 0 4px ${colors.text},
                  0 0 10px ${colors.before},
                  0 0 20px ${colors.after};
              }
            }
          `
        } else if (variant === "vertical-glitch") {
          styleContent = `
    .glitch-wrapper-${variant} {
      position: relative;
      display: flex;
      align-items: start;
      justify-content: start;
    }
    .glitch-${variant} {
      position: relative;
      color: ${colors.text};
      display: flex;
      align-items: start;
      justify-content: start;
      text-align: left;
    }
    .glitch-${variant}::before,
    .glitch-${variant}::after {
      ${fontProperties}
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: left;
      mix-blend-mode: exclusion;
      z-index: 2;
    }
    .glitch-${variant}::before {
      background: repeating-linear-gradient(
        to right,
        transparent,
        transparent 2px,
        ${colors.before} 2px,
        ${colors.before} 4px
      );
      animation: vertical-glitch-lines ${
        0.4 / intensity
      }s infinite steps(${Math.floor(intensity * 10)});
    }
    .glitch-${variant}::after {
      background: repeating-linear-gradient(
        to right,
        transparent,
        transparent 2px,
        ${colors.after} 2px,
        ${colors.after} 4px
      );
      animation: vertical-glitch-lines ${
        0.4 / intensity
      }s 0.15s infinite steps(${Math.floor(intensity * 10)});

    }
    @keyframes vertical-glitch-lines {
      0% { clip-path: inset(0 0 100% 0); }
      25% { clip-path: inset(0 0 55% 0); }
      50% { clip-path: inset(45% 0 0 0); }
      75% { clip-path: inset(25% 0 75% 0); }
      100% { clip-path: inset(85% 0 0 0); }
    }
  `
        } else if (variant === "tv-glitch") {
          styleContent = `
    .glitch-wrapper-${variant} {
      position: relative;
      display: flex;
      align-items: start;
      justify-content: start;
    }
    .glitch-${variant} {
      position: relative;
      color: ${colors.text};
      display: flex;
      align-items: start;
      justify-content: start;
      text-align: left;
    }
    .glitch-${variant}::before,
    .glitch-${variant}::after {
      ${fontProperties}
      content: attr(data-text);
      position: absolute;
      opacity: 0.8;
      mix-blend-mode: exclusion;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: left;
      z-index: 2;
    }
    .glitch-${variant}::before {
      background: 
        repeating-linear-gradient(
          to right,
          transparent,
          transparent ${intensity * 2}px,
          ${colors.before} ${intensity * 2}px,
          ${colors.before} ${intensity * 4}px
        ),
        repeating-linear-gradient(
          to bottom,
          transparent,
          transparent ${intensity * 2}px,
          ${colors.before} ${intensity * 2}px,
          ${colors.before} ${intensity * 4}px
        );
      animation: tv-glitch-lines ${
        0.4 / intensity
      }s infinite steps(${Math.floor(intensity * 10)});
    }
    .glitch-${variant}::after {
      background: 
        repeating-linear-gradient(
          to right,
          transparent,
          transparent ${intensity * 2}px,
          ${colors.after} ${intensity * 2}px,
          ${colors.after} ${intensity * 4}px
        ),
        repeating-linear-gradient(
          to bottom,
          transparent,
          transparent ${intensity * 2}px,
          ${colors.after} ${intensity * 2}px,
          ${colors.after} ${intensity * 4}px
        );
      animation: tv-glitch-lines ${
        0.4 / intensity
      }s 0.15s infinite steps(${Math.floor(intensity * 10)});
    }
    @keyframes tv-glitch-lines {
      0% { 
        clip-path: inset(0 0 100% 0);
        transform: translateX(0);
      }
      25% { 
        clip-path: inset(0 0 55% 0);
        transform: translateX(${
          intensity * 2 * Number(Math.random().toFixed(2))
        }px) translateY(${intensity * 1 * Number(Math.random().toFixed(2))}px);
      }
      50% { 
        clip-path: inset(45% 0 0 0);
        transform: translateX(-${
          intensity * 2 * Number(Math.random().toFixed(2))
        }px) translateY(-${intensity * 1 * Number(Math.random().toFixed(2))}px);
      }
      75% { 
        clip-path: inset(25% 100% 75% 0);
        transform: translateX(${
          intensity * 1 * Number(Math.random().toFixed(2))
        }px) translateY(${intensity * 1 * Number(Math.random().toFixed(2))}px);
      }
      100% { 
        clip-path: inset(85% 0 0 100%);
        transform: translateX(-${
          intensity * 1 * Number(Math.random().toFixed(2))
        }px) translateY(-${intensity * 1 * Number(Math.random().toFixed(2))}px);
      }
    }
  `
        } else if (variant === "aggressive-glitch") {
          styleContent = `
    .glitch-wrapper-${variant} {
      position: relative;
      display: flex;
      align-items: start;
      justify-content: start;
    }
    .glitch-${variant} {
      position: relative;
      color: ${colors.text};
      display: flex;
      align-items: start;
      justify-content: start;
      text-align: left;
    }
    .glitch-${variant}::before,
    .glitch-${variant}::after {
      ${fontProperties}
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: left;
    }
    .glitch-${variant}::before {
      color: ${colors.before};
      animation: aggressive-glitch-before 0.5s infinite;
      z-index: -1;
    }
    .glitch-${variant}::after {
      color: ${colors.after};
      animation: aggressive-glitch-after 0.5s infinite;
      z-index: -1;
    }
    @keyframes aggressive-glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-${intensity * 5}px, ${intensity * 5}px); }
      40% { transform: translate(${intensity * 5}px, -${intensity * 5}px); }
      60% { transform: translate(-${intensity * 5}px, -${intensity * 5}px); }
      80% { transform: translate(${intensity * 5}px, ${intensity * 5}px); }

      100% { transform: translate(0); }
    }
    @keyframes aggressive-glitch-before {
      0% { transform: translate(0); }
      20% { transform: translate(${intensity * 4}px, -${intensity * 4}px); }
      40% { transform: translate(-${intensity * 4}px, ${intensity * 4}px); }
      60% { transform: translate(${intensity * 4}px, ${intensity * 4}px); }
      80% { transform: translate(-${intensity * 4}px, -${intensity * 4}px); }
      100% { transform: translate(0); }
    }
    @keyframes aggressive-glitch-after {
      0% { transform: translate(0); }
      20% { transform: translate(-${intensity * 2}px, ${intensity * 2}px); }
      40% { transform: translate(${intensity * 2}px, -${intensity * 2}px); }
      60% { transform: translate(-${intensity * 2}px, -${intensity * 2}px); }
      80% { transform: translate(${intensity * 2}px, ${intensity * 2}px); }
      100% { transform: translate(0); }
    }
  `
        } else if (variant === "disappearing-fragments") {
          styleContent = `
    .glitch-wrapper-${variant} {
      position: relative;
      display: flex;
      align-items: start;
      justify-content: start;
    }
    .glitch-${variant} {
      position: relative;
      color: ${colors.text};
      display: flex;
      align-items: start;
      justify-content: start;
      text-align: left;
    }
    .glitch-${variant}::before,
    .glitch-${variant}::after {
      ${fontProperties}
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      text-align: left;
    }
    .glitch-${variant}::before {
      left: ${size === "sm" ? "1px" : "2px"};
      text-shadow: -2px 0 ${colors.before};
      clip: rect(24px, 550px, 90px, 0);
      animation: disappearing-glitch-anim-2 3s infinite linear alternate-reverse;
    }
    .glitch-${variant}::after {
      left: -${size === "sm" ? "1px" : "2px"};
      text-shadow: -2px 0 ${colors.after};
      clip: rect(85px, 550px, 140px, 0);
      animation: disappearing-glitch-anim 2.5s infinite linear alternate-reverse;
    }
    @keyframes disappearing-glitch-anim {
      0% { clip: rect(51px, 9999px, 28px, 0); }
      10% { clip: rect(33px, 9999px, 144px, 0); }
      20% { clip: rect(141px, 9999px, 61px, 0); }
      30% { clip: rect(97px, 9999px, 4px, 0); }
      40% { clip: rect(24px, 9999px, 24px, 0); }
      50% { clip: rect(36px, 9999px, 141px, 0); }
      60% { clip: rect(19px, 9999px, 26px, 0); }
      70% { clip: rect(65px, 9999px, 52px, 0); }
      80% { clip: rect(132px, 9999px, 61px, 0); }
      90% { clip: rect(28px, 9999px, 75px, 0); }
      100% { clip: rect(58px, 9999px, 86px, 0); }
    }
    @keyframes disappearing-glitch-anim-2 {
      0% { clip: rect(132px, 9999px, 61px, 0); }
      10% { clip: rect(28px, 9999px, 75px, 0); }
      20% { clip: rect(58px, 9999px, 86px, 0); }
      30% { clip: rect(51px, 9999px, 28px, 0); }
      40% { clip: rect(33px, 9999px, 144px, 0); }
      50% { clip: rect(141px, 9999px, 61px, 0); }
      60% { clip: rect(97px, 9999px, 4px, 0); }
      70% { clip: rect(24px, 9999px, 24px, 0); }
      80% { clip: rect(36px, 9999px, 141px, 0); }
      90% { clip: rect(19px, 9999px, 26px, 0); }
      100% { clip: rect(65px, 9999px, 52px, 0); }
    }
  `
        } else if (variant === "line-glitch") {
          styleContent = `
    .glitch-wrapper-${variant} {
      position: relative;
      display: flex;
      align-items: start;
      justify-content: start;
    }
    .glitch-${variant} {
      position: relative;
      color: ${colors.text};
      display: flex;
      align-items: start;
      justify-content: start;
      text-align: left;
    }
    .glitch-${variant}::before,
    .glitch-${variant}::after {
      ${fontProperties}
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: left;
    }
    .glitch-${variant}::before {
      left: 2px;
      text-shadow: -2px 0 ${colors.before};
      clip: rect(44px, 450px, 56px, 0);
      animation: line-glitch-anim 5s infinite linear alternate-reverse;
    }
    .glitch-${variant}::after {
      left: -2px;
      text-shadow: -2px 0 ${colors.after};
      clip: rect(44px, 450px, 56px, 0);
      animation: line-glitch-anim 7s infinite linear alternate-reverse;
    }
    @keyframes line-glitch-anim {
      0% { clip: rect(44px, 450px, 56px, 0); }
      20% { clip: rect(24px, 450px, 36px, 0); }
      40% { clip: rect(64px, 450px, 76px, 0); }
      60% { clip: rect(84px, 450px, 96px, 0); }
      80% { clip: rect(104px, 450px, 116px, 0); }
      100% { clip: rect(44px, 450px, 56px, 0); }
    }
  `
        } else if (variant === "vhs-retro-glitch") {
          styleContent = `
            .glitch-wrapper-${variant} {
              position: relative;
              width: fit-content;
              height: fit-content;
              display: flex;
              align-items: start;
              justify-content: start;
            }
            .glitch-${variant} {
              position: relative;
              color: ${colors.text};
              width: fit-content;
              height: fit-content;
              display: flex;
              align-items: start;
              justify-content: start;
              text-shadow: ${intensity * 0.1}em 0 0 rgba(255, 0, 0, 0.75),
                          -${intensity * 0.1}em -${
            intensity * 0.1
          }em 0 rgba(0, 255, 0, 0.75),
                          ${intensity * 0.1}em ${
            intensity * 0.1
          }em 0 rgba(0, 0, 255, 0.75);
              animation: vhs-retro-glitch 500ms infinite;

            }
            @keyframes vhs-retro-glitch {
            // base it on intensity
              0% { text-shadow: ${intensity * 0.1}em 0 0 rgba(255, 0, 0, 0.75),
                                -${intensity * 0.1}em -${
            intensity * 0.1
          }em 0 rgba(0, 255, 0, 0.75),
                                ${intensity * 0.08}em ${
            intensity * 0.1
          }em 0 rgba(0, 0, 255, 0.75); }
              14% { text-shadow: ${
                intensity * 0.1
              }em 0 0 rgba(255, 0, 0, 0.75),                
                                -${intensity * 0.1}em -${
            intensity * 0.08
          }em 0 rgba(0, 255, 0, 0.75),
                                -${intensity * 0.08}em ${
            intensity * 0.1
          }em 0 rgba(0, 0, 255, 0.75); }
              15% { text-shadow: -${intensity * 0.1}em -${
            intensity * 0.08
          }em 0 rgba(255, 0, 0, 0.75),
                                ${intensity * 0.08}em ${
            intensity * 0.08
          }em 0 rgba(0, 255, 0, 0.75),
                                -${intensity * 0.1}em -${
            intensity * 0.1
          }em 0 rgba(0, 0, 255, 0.75); }
              49% { text-shadow: -${intensity * 0.1}em -${
            intensity * 0.08
          }em 0 rgba(255, 0, 0, 0.75),
                                ${intensity * 0.08}em ${
            intensity * 0.08
          }em 0 rgba(0, 255, 0, 0.75),
                                -${intensity * 0.1}em -${
            intensity * 0.1
          }em 0 rgba(0, 0, 255, 0.75); }
              50% { text-shadow: ${intensity * 0.08}em ${
            intensity * 0.1
          }em 0 rgba(255, 0, 0, 0.75),
                                ${intensity * 0.08}em 0 0 rgba(0, 255, 0, 0.75),
                                ${intensity * 0.08}em -${
            intensity * 0.1
          }em 0 rgba(0, 0, 255, 0.75); }
              99% { text-shadow: ${intensity * 0.08}em ${
            intensity * 0.1
          }em 0 rgba(255, 0, 0, 0.75),
                                ${intensity * 0.1}em 0 0 rgba(0, 255, 0, 0.75),
                                0 -${
                                  intensity * 0.1
                                }em 0 rgba(0, 0, 255, 0.75); }
              100% { text-shadow: -${
                intensity * 0.08
              }em 0 0 rgba(255, 0, 0, 0.75),
                                -${intensity * 0.08}em -${
            intensity * 0.08
          }em 0 rgba(0, 255, 0, 0.75),
                                -${intensity * 0.08}em -${
            intensity * 0.1
          }em 0 rgba(0, 0, 255, 0.75); }
            }
          `
        } else if (variant === "chromatic-aberration") {
          styleContent = `
            .glitch-wrapper-${variant} {
              position: relative;
              width: fit-content;
              height: fit-content;
              display: flex;
              align-items: start;
              justify-content: start;
            }
            .glitch-${variant} {
              position: relative;
              color: ${colors.text};
              width: fit-content;
              height: fit-content;
              display: flex;
              align-items: start;
              justify-content: start;
            }
            .glitch-${variant}::before,
            .glitch-${variant}::after {
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              width: fit-content;
              height: fit-content;
              opacity: 0.8;
              text-align: left;
              ${fontProperties}
            }
            .glitch-${variant}::before {
              color: #f0f;
              z-index: -1;
              animation: chromatic-aberration 2s infinite linear alternate-reverse;
            }
            .glitch-${variant}::after {
              color: #0ff;
              z-index: -1;
              animation: chromatic-aberration 2s infinite linear alternate-reverse reverse;
            }
            @keyframes chromatic-aberration {
              0% { transform: translate(0); }
              20% { transform: translate(-2px, 2px) skew(${intensity * 2}deg, ${
            intensity * 1
          }deg); }
              40% { transform: translate(2px, -2px) skew(-${
                intensity * 2
              }deg, -${intensity * 1}deg); }
              60% { transform: translate(-1px, -1px) skew(${
                intensity * 2
              }deg, -${intensity * 1}deg); }

              80% { transform: translate(1px, 1px) skew(-${
                intensity * 2
              }deg, -${intensity * 1}deg); }
              100% { transform: translate(0); }
            }
          `
        } else if (variant === "color-box-glitch") {
          styleContent = `
            .glitch-wrapper-${variant} {
              position: relative;
              width: fit-content;
              height: fit-content;
              display: flex;
              align-items: start;
              justify-content: start;
            }
            .glitch-${variant} {
              position: relative;
              display: flex;
              align-items: start;
              justify-content: start;
              color: ${colors.text};
              width: fit-content;
              height: fit-content;
            }
            .glitch-${variant}::before,
            .glitch-${variant}::after {
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              width: fit-content;
              height: fit-content;
              opacity: 0.8;
              text-align: left;
              ${fontProperties}
            }
            .glitch-${variant}::before {
              color: #f0f;
              background: rgba(255, 0, 255, 0.2);
              animation: color-box-glitch ${1.5 / intensity}s infinite;
            }
            .glitch-${variant}::after {
              color: #0ff;
              background: rgba(0, 255, 255, 0.2);
              animation: color-box-glitch ${1.5 / intensity}s 0.5s infinite;
            }
            @keyframes color-box-glitch {
            // use the intensity to determine the size of the glitch
              0% { clip-path: inset(${
                intensity * 140 * Math.random()
              }% 0 0 0); }
              10% { clip-path: inset(${intensity * 140 * Math.random()}% 0 ${
            intensity * 140 * Math.random()
          }% 0); }
              20% { clip-path: inset(0 ${intensity * 140 * Math.random()}% ${
            intensity * 140 * Math.random()
          }% 0); }
              30% { clip-path: inset(${intensity * 140 * Math.random()}% 0 0 ${
            intensity * 140 * Math.random()
          }%); }
              40% { clip-path: inset(0 0 ${intensity * 140 * Math.random()}% ${
            intensity * 140 * Math.random()
          }%); }
              50% { clip-path: inset(${intensity * 140 * Math.random()}% 0 0 ${
            intensity * 140 * Math.random()
          }%); }
              60% { clip-path: inset(0 ${intensity * 140 * Math.random()}% ${
            intensity * 140 * Math.random()
          }% 0); }
              70% { clip-path: inset(${intensity * 140 * Math.random()}% 0 0 ${
            intensity * 140 * Math.random()
          }%); }
              80% { clip-path: inset(0 ${intensity * 140 * Math.random()}% ${
            intensity * 140 * Math.random()
          }% 0); }
              90% { clip-path: inset(0 0 ${intensity * 140 * Math.random()}% ${
            intensity * 140 * Math.random()
          }%); }
              100% { clip-path: inset(0 0 0 ${
                intensity * 140 * Math.random()
              }%); }
            }
          `
        }

        style.textContent = styleContent
        document.head.appendChild(style)

        return () => {
          document.head.removeChild(style)
        }
      }
    }, [variant, colors, intensity, size, fontProperties])

    const content = (
      <span
        ref={glitchRef}
        className={cn(
          glitchTextVariants({ variant, size, className }),
          className
        )}
        data-text={text}
        {...(label && { "aria-label": label })}
        {...props}
      >
        {variant === "wave"
          ? text.split("").map((char, index) => (
              <span
                className={size === "sm" ? "mt-4" : "mt-8"}
                key={index}
                style={{ "--i": index } as React.CSSProperties}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))
          : text}
        {srOnly && <span className="sr-only">{srOnly}</span>}
      </span>
    )

    if (disableAnimations) {
      return (
        <div
          data-text={text}
          className={cn(`glitch-wrapper-${variant}`, className)}
        >
          <span className={`glitch-${variant}`}>{content}</span>
        </div>
      )
    }

    return (
      <motion.div
        className={`glitch-wrapper-${variant}`}
        variants={zyfloFadeInFromBottomVariants as unknown as Variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0 }}
        data-text={text}
      >
        <motion.span
          className={`glitch-${variant}`}
          variants={zyfloFadeInFromTopVariants as unknown as Variants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={1}
          data-text={text}
        >
          {content}
        </motion.span>
      </motion.div>
    )
  }
)

ZyfloGlitchText.displayName = "ZyfloGlitchText"

export default ZyfloGlitchText
