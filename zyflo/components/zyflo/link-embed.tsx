"use client"

import React, {
  ReactNode,
  Suspense,
  SyntheticEvent,
  useEffect,
  useRef
} from "react"
import { IWebsiteInfos } from "node-webscrap"
import {
  cn,
  getAutoContrastClassName,
  getCSSVariable,
  areColorsCompatible
} from "@/lib/utils"
import Image from "next/image"
import { cache, use } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, Variants } from "framer-motion"
import {
  zyfloBlurInFromBottomVariants,
  zyfloBlurInFromRightVariants,
  zyfloFadeBlurInFromBottomVariants
} from "@/zyflo.config"

const translations: Record<string, (o: any, v: any) => void> = {
  "og:image": (o: any, v: any) => (o.openGraph.image = v),
  "og:image:alt": (o: any, v: any) => (o.openGraph.imageAlt = v),
  "og:image:width": (o: any, v: any) => (o.openGraph.imageWidth = Number(v)),
  "og:image:height": (o: any, v: any) => (o.openGraph.imageHeight = Number(v)),
  "og:site_name": (o: any, v: any) => (o.openGraph.name = v),
  "og:type": (o: any, v: any) => (o.openGraph.type = v),
  "og:title": (o: any, v: any) => (o.openGraph.title = v),
  "og:url": (o: any, v: any) => (o.openGraph.url = v),
  "og:description": (o: any, v: any) => (o.openGraph.description = v),
  "twitter:card": (o: any, v: any) => (o.socials.twitter.card = v),
  "twitter:title": (o: any, v: any) => (o.socials.twitter.title = v),
  "twitter:description": (o: any, v: any) =>
    (o.socials.twitter.description = v),
  "twitter:site": (o: any, v: any) => (o.socials.twitter.site = v),
  "twitter:image": (o: any, v: any) => (o.socials.twitter.image = v),
  "twitter:creator": (o: any, v: any) => (o.socials.twitter.creator = v),
  author: (o: any, v: any) => (o.metadata.author = v),
  description: (o: any, v: any) => (o.metadata.description = v),
  themeColor: (o: any, v: any) => (o.metadata.themeColor = v),
  robots: (o: any, v: any) => (o.metadata.robots = v),
  title: (o: any, v: any) => (o.metadata.title = v)
}

const request = async (
  url: string
): Promise<{ statusCode: number; statusMessage: string; data: string }> => {
  const proxyUrl = "https://cloudflare-cors-anywhere.harjjotsinghh.workers.dev/"
  const response = await fetch(proxyUrl + "?" + url, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  return {
    statusCode: response.status,
    statusMessage: response.statusText,
    data: await response.text()
  }
}

const websiteInfoCache: Record<string, IWebsiteInfos> = {}

export const webscrap = cache(async (url: string) => {
  if (websiteInfoCache[url]) {
    return websiteInfoCache[url]
  }

  const infos: IWebsiteInfos = {
    metadata: {},
    openGraph: {},
    socials: {
      twitter: {}
    }
  }
  const response = await request(url)
  if (response.statusCode >= 400) {
    throw new Error(
      `Failed to fetch resource at ${url} (status ${response.statusCode} : ${response.statusMessage})`
    )
  }
  const data = response.data
  const headTagIndexStart = data.indexOf("<head")
  const headTagIndexEnd = data.indexOf("</head>")
  const headContent = data.slice(headTagIndexStart, headTagIndexEnd)
  const metaTags = Array.from(
    headContent.matchAll(
      /<meta\s+property=["'](og|twitter):(.+?)["']\s*content=["'](.*?)["']\s*\/?>/g
    )
  )
    .map((match) => [match[1] + ":" + match[2], match[3]])
    .reduce((prev, curr) => {
      prev[curr[0] as any] = curr[1]
      return prev
    }, {} as Record<string, string>)
  metaTags.author =
    headContent.match(
      /<meta\s+name=["']author["']\s*content=["'](.*?)["']\s*\/?>/
    )?.[1] || ""
  metaTags.description =
    headContent.match(
      /<meta\s+name=["']description["']\s*content=["'](.*?)["']\s*\/?>/
    )?.[1] || ""
  metaTags.themeColor =
    headContent.match(
      /<meta\s+name=["']theme-color["']\s*content=["'](.*?)["']\s*\/?>/
    )?.[1] || ""
  metaTags.robots =
    headContent.match(
      /<meta\s+name=["']robots["']\s*content=["'](.*?)["']\s*\/?>/
    )?.[1] || ""
  metaTags.title = headContent.match(/<title>\s*(.*?)\s*<\/title>/)?.[1] || ""
  const favicons = headContent
    .match(/<link(.*?)href=["'](.*?(png|svg|ico|jpg|jpeg|gif))["'](.*?)\/?>/g)
    ?.map((m: any) => m.match(/href=["'](.*?)["']/)?.[1] || "")
  if (favicons) {
    infos.metadata.favicons = favicons
  }
  for (const key in translations) {
    if (metaTags[key]) {
      translations[key](infos, metaTags[key])
    }
  }
  websiteInfoCache[url] = infos
  return infos
})

export const ZyfloLinkEmbedVariants = [
  "card",
  "light",
  "info",
  "warning",
  "danger",
  "success",
  "default",
  "outline",
  "secondary",
  "transparent",
  "gradient"
] as const

export type ZyfloLinkEmbedVariant = (typeof ZyfloLinkEmbedVariants)[number]

const linkEmbedVariants = cva(
  "relative flex w-full flex-col items-start justify-start gap-2 rounded-xl border-y-2 border-r-2 zyflo-transition xl:p-7 lg:p-6 md:p-5 p-5 overflow-hidden",
  {
    variants: {
      variant: {
        light:
          "border-primary/20 bg-primary/10 hover:border-primary/40 dark:border-primary/30 dark:bg-primary/20 dark:hover:border-primary/50",
        info: "border-blue-300 bg-blue-200 hover:border-blue-400 dark:border-blue-800 dark:bg-blue-950 dark:hover:border-blue-700",
        warning:
          "border-yellow-400 bg-yellow-200 hover:border-yellow-500 dark:border-yellow-800 dark:bg-yellow-950 dark:hover:border-yellow-700",
        danger:
          "border-red-300 bg-red-200 hover:border-red-400 dark:border-red-800 dark:bg-red-950 dark:hover:border-red-700",
        success:
          "border-emerald-300 bg-emerald-200 hover:border-emerald-400 dark:border-emerald-800 dark:bg-emerald-950 dark:hover:border-emerald-700",
        default:
          "border-primary/30 bg-primary/30 hover:border-primary/80 dark:border-primary/40 dark:bg-primary/30 dark:hover:border-primary/70",
        outline:
          "border-gray-300 bg-transparent hover:bg-background/10 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700",
        secondary:
          "bg-secondary hover:bg-secondary/90 dark:bg-secondary dark:hover:bg-secondary/90 border-muted-foreground/20 hover:border-muted-foreground/40",
        transparent: "border-transparent bg-transparent",
        gradient:
          "bg-gradient-to-r bg-[size:300%_300%] hover:bg-[position:0%_0%] bg-[position:100%_100%] from-primary to-primary via-accent border-primary/10 border-2 hover:border-primary/30 dark:[box-shadow:0_3px_30px_1px_hsl(var(--primary)/0.4)] dark:hover:[box-shadow:0_4px_40px_1px_hsl(var(--primary)/0.5)] hover:[box-shadow:0_4px_40px_1px_hsl(var(--primary)/0.4)] [box-shadow:0_3px_30px_1px_hsl(var(--primary)/0.3)]",
        card: "bg-card border-muted hover:border-muted/80"
      }
    },
    defaultVariants: { variant: "card" }
  }
)

const linkEmbedTitleVariants = cva(
  "text-pretty zyflo-transition whitespace-pre-wrap text-left text-base font-bold md:text-lg",
  {
    variants: {
      variant: {
        light:
          "text-primary-700 dark:text-primary-400 decoration-primary-700 dark:decoration-primary-400",
        info: "text-blue-950 dark:text-blue-50",
        warning: "text-yellow-950 dark:text-yellow-50",
        danger: "text-red-950 dark:text-red-50",
        success: "text-emerald-950 dark:text-emerald-50",
        default: "text-gray-950 dark:text-gray-50",
        outline: "text-gray-950 dark:text-gray-50",
        secondary: "text-gray-950 dark:text-gray-50",
        transparent: "text-gray-950 dark:text-gray-50",
        gradient: "",
        card: "text-gray-950 dark:text-gray-50"
      }
    },
    defaultVariants: { variant: "card" }
  }
)

const linkEmbedDescriptionVariants = cva(
  "whitespace-pre-wrap text-pretty text-left text-xs sm:text-sm zyflo-transition",
  {
    variants: {
      variant: {
        light: "text-primary-950/80 dark:text-primary-50/80",
        info: "text-blue-950/80 dark:text-blue-50/80",
        warning: "text-yellow-950/80 dark:text-yellow-50/80",
        danger: "text-red-950/80 dark:text-red-50/80",
        success: "text-emerald-950/80 dark:text-emerald-50/80",
        default: "text-gray-950/80 dark:text-gray-50/80",
        outline: "text-gray-950/80 dark:text-gray-50/80",
        secondary: "text-gray-950/80 dark:text-gray-50/80",
        transparent: "text-gray-950/80 dark:text-gray-50/80",
        gradient: "",
        card: "text-gray-950/80 dark:text-gray-50/80"
      }
    },
    defaultVariants: { variant: "card" }
  }
)

interface ZyfloLinkEmbedProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof linkEmbedVariants> {
  url: string
  disableAnimations?: boolean
  backdropBlur?: boolean
  triggerWhenInView?: boolean
  srOnly?: string
  label?: string
}

const ZyfloLinkEmbedClient: React.FC<
  ZyfloLinkEmbedProps & {
    title: string
    description?: string
    image?: string
    imageAlt?: string
    imageWidth?: number
    imageHeight?: number
    themeColor?: string
  }
> = ({
  url,
  description,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  title,
  themeColor,
  variant = "card",
  className,
  disableAnimations = false,
  backdropBlur = true,
  triggerWhenInView = true,
  srOnly,
  label,
  ...props
}) => {
  const titleRef = useRef<HTMLAnchorElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

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

  useEffect(() => {
    if (variant === "gradient") {
      ;[titleRef, descriptionRef].forEach((ref) => {
        if (ref.current) {
          ref.current.style.color = gradientVariantClassName
        }
      })
    }
  }, [gradientVariantClassName, variant])

  const divAs = disableAnimations ? "div" : motion.div
  const commonProps = {
    className: cn(
      linkEmbedVariants({ variant, className }),
      backdropBlur ? "backdrop-blur-md" : ""
    )
  }

  const animationProps = disableAnimations
    ? {}
    : {
        variants: zyfloBlurInFromBottomVariants as unknown as Variants,
        initial: "initial",
        ...(triggerWhenInView
          ? { whileInView: "animate", viewport: { once: true } }
          : { animate: "animate" }),
        custom: 0
      }

  const combinedProps = { ...commonProps, ...animationProps, ...props }

  const titleAnimation = disableAnimations
    ? {}
    : {
        variants: zyfloBlurInFromRightVariants as unknown as Variants,
        initial: "initial",
        ...(triggerWhenInView
          ? { whileInView: "animate", viewport: { once: true } }
          : { animate: "animate" }),
        custom: 1,
        transition: { delay: 0.4, duration: 0.3 }
      }

  const descriptionAnimation = disableAnimations
    ? {}
    : {
        variants: zyfloFadeBlurInFromBottomVariants as unknown as Variants,
        initial: "initial",
        ...(triggerWhenInView
          ? { whileInView: "animate", viewport: { once: true } }
          : { animate: "animate" }),
        custom: 2,
        transition: { delay: 0.8, duration: 0.3 }
      }

  const imageAnimation = disableAnimations
    ? { className: "w-full h-auto" }
    : {
        variants: {
          initial: { y: 40, opacity: 0, filter: "blur(4px)" },
          animate: { y: 0, opacity: 1, filter: "blur(0px)" }
        },
        initial: "initial",
        ...(triggerWhenInView
          ? { whileInView: "animate", viewport: { once: true } }
          : { animate: "animate" }),
        transition: { delay: 1.2, duration: 0.3 },
        className: "w-full h-auto"
      }

  return React.createElement(
    divAs,
    combinedProps as any,
    <>
      <div
        className={`absolute left-0 top-0 h-full w-1`}
        style={{ backgroundColor: `${themeColor}` }}
      ></div>
      {React.createElement(
        disableAnimations ? "div" : motion.div,
        titleAnimation,
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          ref={titleRef}
          className={cn(
            "inline-flex items-center gap-2 hover:underline",
            linkEmbedTitleVariants({ variant })
          )}
        >
          {title}
        </a>
      )}
      {description &&
        React.createElement(
          disableAnimations ? "p" : motion.p,
          {
            className: cn(linkEmbedDescriptionVariants({ variant })),
            ref: descriptionRef,
            ...descriptionAnimation
          },
          description
        )}
      {image &&
        React.createElement(
          disableAnimations ? "div" : motion.div,
          imageAnimation,
          <Image
            src={image}
            alt={imageAlt || title}
            width={imageWidth}
            height={imageHeight}
            layout="fill"
            draggable={false}
            className={`!relative mt-2 !w-[${imageWidth}px] !h-[${imageHeight}px] select-none rounded-lg object-cover`}
            onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.style.display = "none"
            }}
          />
        )}
      {srOnly && <span className="sr-only">{srOnly}</span>}
    </>
  )
}

const ZyfloLinkEmbedAsync: React.FC<ZyfloLinkEmbedProps> = (props) => {
  const infos = use(webscrap(props.url))
  return (
    <ZyfloLinkEmbedClient
      {...props}
      title={infos.metadata.title ?? "Untitled"}
      description={infos.metadata.description ?? undefined}
      image={infos.openGraph.image ?? undefined}
      imageAlt={infos.openGraph.imageAlt ?? undefined}
      themeColor={infos.metadata.themeColor ?? undefined}
    />
  )
}

const ZyfloLinkEmbed: React.FC<ZyfloLinkEmbedProps> = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ZyfloLinkEmbedAsync {...props} />
  </Suspense>
)

export default ZyfloLinkEmbed
