import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import ModeToggle from "@/components/mode-toggle"
import WordRotate from "@/components/magicui/word-rotate"
import Link from "next/link"
export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, "z-50 bg-background")}>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 md:flex-row lg:px-8">
        <div className="flex w-full flex-col items-start gap-4 md:flex-col">
          <Icons.logo />
          <div className="pb-2 text-center text-sm leading-loose md:text-left">
            <p className="max-w-sm text-left text-foreground/80">
              Zyflo is an open-source UI library with the goal to help
              developers build eye-catching and responsive web apps. We are on a
              misison to make web interfaces livelier and more attractive.
            </p>
          </div>
          <div className="w-full border-t border-muted pb-3 pt-8 text-sm text-foreground/90">
            <div className="inline-flex items-center gap-1.5 pr-1.5">
              Developed with{" "}
              <WordRotate
                className="text-lg"
                duration={1800}
                words={["💙", "🧠", "☕", "🍔", "🍕"]}
              />{" "}
              by
            </div>
            <Link
              href={siteConfig.links.author}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Harjot Singh Rana
            </Link>
            . Hosted on{" "}
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </Link>
            . The source code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </div>
        </div>
      </div>
    </footer>
  )
}
