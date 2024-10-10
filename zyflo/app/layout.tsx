import "@/styles/globals.css"
import "@/styles/prism.css"
import { siteConfig } from "@/config/site"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import Head from "next/head"
import { headers } from "next/headers"
import { Metadata, Viewport } from "next"
import { getURL } from "@/lib/utils"
import ZyfloCursor from "@/components/zyflo/cursor-follow"

interface RootLayoutProps {
  children: React.ReactNode
}

const meta = {
  title: "Zyflo",
  description:
    "Zyflo: An animated UI library which offers React components for building beautiful and accessible web applications. Zyflo puts an emphasis on flow and continuity, allowing developers to build eye-catching, responsive experiences with ease. Zyflo lets you create anything from intricate animations to simple effects in no time — all while integrating perfectly with your existing projects and making user engagement better than ever without clunky performance downgrades. Make every element in your UI flow together beautifully with Zyflo.",
  cardImage: "https://files.studyfliss.com/og.png",
  robots: "follow, index",
  favicon: "/favicon.ico",
  url: getURL()
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers()
  const pathname = headersList.get("x-invoke-path") || ""
  return {
    title: {
      default: siteConfig.name,
      template: pathname.includes("docs")
        ? `%s | ${siteConfig.name}`
        : `%s | ${siteConfig.name} Docs`
    },
    description: meta.description,
    referrer: "origin-when-cross-origin",
    keywords: [
      "Zyflo",
      "Zyflo UI Library",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Server Components",
      "Radix UI",
      "UI Library React",
      "Animated UI Library",
      "Zyflo UI",
      "Zyflo UI Library",
      "Zyflo UI React",
      "Zyflo UI Next.js",
      "Zyflo UI Tailwind CSS",
      "Zyflo UI Radix UI",
      "Zyflo UI Server Components",
      "Zyflo UI Client Components",
      "Zyflo UI Animated UI Library",
      "Shadcn UI",
      "ShadcnUI",
      "Aceternity UI",
      "AceternityUI",
      "Aceternity UI Library",
      "Aceternity UI React",
      "Aceternity UI Next.js",
      "Aceternity UI Tailwind CSS",
      "Aceternity UI Radix UI",
      "Aceternity UI Server Components",
      "Aceternity UI Client Components",
      "Aceternity UI Animated UI Library",
      "AceternityUI",
      "AceternityUI Library",
      "AceternityUI React",
      "AceternityUI Next.js",
      "AceternityUI Tailwind CSS",
      "AceternityUI Radix UI",
      "AceternityUI Server Components",
      "AceternityUI Client Components",
      "AceternityUI Animated UI Library",
      "MagicUI",
      "Magic UI",
      "Magic UI Library",
      "Magic UI React",
      "Magic UI Next.js",
      "Magic UI Tailwind CSS",
      "Magic UI Radix UI",
      "Magic UI Server Components",
      "Magic UI Client Components",
      "Magic UI Animated UI Library",
      "MagicUI Library",
      "MagicUI React",
      "MagicUI Next.js",
      "MagicUI Tailwind CSS",
      "MagicUI Radix UI",
      "MagicUI Server Components",
      "MagicUI Client Components",
      "MagicUI Animated UI Library"
    ],
    authors: [{ name: "Harjot Singh Rana", url: "https://harjot.pro/" }],
    creator: "Harjot Singh Rana",
    publisher: "Harjot Singh Rana",
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [
        {
          secureUrl: meta.cardImage,
          url: meta.cardImage,
          alt: "Zyflo OG Image",
          type: "image/png"
        }
      ],
      type: "website",
      siteName: meta.title
    },
    twitter: {
      card: "summary_large_image",
      site: "@HarjjotSinghh",
      creator: "@HarjjotSinghh",
      title: meta.title,
      description: meta.description,
      images: [
        {
          secureUrl: meta.cardImage,
          url: meta.cardImage,
          alt: "Zyflo OG Image",
          type: "image/png"
        }
      ]
    }
  }
}

export const viewport: Viewport = {
  themeColor: "#1733ee"
}

// export async function generateMetadata(): Promise<Metadata> {
//   const headersList = headers()
//   const pathname = headersList.get("x-invoke-path") || ""

//   return {
//     title: {
//       default: siteConfig.name,
//       template: pathname.includes("docs")
//         ? `%s | ${siteConfig.name}`
//         : `%s | ${siteConfig.name} Docs`
//     },
//     description: siteConfig.description,
//     keywords: [
//       "Next.js",
//       "React",
//       "Tailwind CSS",
//       "Server Components",
//       "Radix UI"
//     ],
//     authors: [
//       {
//         name: "Harjot Singh Rana",
//         url: "https://harjot.pro"
//       }
//     ],
//     creator: "Harjot Singh Rana",
//     themeColor: [
//       { media: "(prefers-color-scheme: light)", color: "white" },
//       { media: "(prefers-color-scheme: dark)", color: "black" }
//     ],
//     openGraph: {
//       type: "website",
//       locale: "en_US",
//       url: siteConfig.url,
//       title: siteConfig.name,
//       description: siteConfig.description,
//       siteName: siteConfig.name
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: siteConfig.name,
//       description: siteConfig.description,
//       images: [`${siteConfig.url}/og.png`],
//       creator: "@HarjjotSinghh"
//     },
//     icons: {
//       icon: "/favicon.ico",
//       shortcut: "/favicon-16x16.png",
//       apple: "/apple-touch-icon.png"
//     },
//     manifest: `${siteConfig.url}/site.webmanifest`
//   }
// }

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"min-h-screen bg-background font-zyflo antialiased"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
