"use client"
import Link from "next/link"
import React from "react"
import { buttonVariants } from "../ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerDescription
} from "@/components/ui/drawer"
import { RxHamburgerMenu } from "react-icons/rx"
import { cn } from "@/lib/utils"
import { zyfloBlurInFromBottomVariants } from "@/zyflo.config"
import { motion, Variants } from "framer-motion"

interface ZyfloNavbarItem {
  title: string
  href: string
  label?: string
  icon?: React.ReactNode
}

type ZyfloNavbarLogoComponent =
  | { src: string; alt: string; width: number; height: number }
  | { text: string; as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }

interface ZyfloNavbarProps extends React.ComponentPropsWithRef<"header"> {
  items: ZyfloNavbarItem[]
  srOnly?: boolean
  mobileNavFooter?: React.ReactNode
  logo?: ZyfloNavbarLogoComponent
  disableAnimations?: boolean
  mobileNavbarCentered?: boolean
  sticky?: boolean
  backdropBlur?: boolean
  extraContent?: React.ReactNode
}

export default function ZyfloNavbar({
  logo,
  items,
  srOnly = false,
  mobileNavFooter = null,
  disableAnimations = false,
  mobileNavbarCentered = false,
  sticky = true,
  className,
  backdropBlur = true,
  extraContent,
  ...props
}: ZyfloNavbarProps) {
  const justify = !logo ? "center" : "between"
  const headingAs = logo && "text" in logo ? logo.as ?? "h1" : undefined
  const imageClassName = "h-12 w-auto select-none"

  const renderLogo = (isMobile = false) => {
    if (!logo) return null
    const content =
      "src" in logo ? (
        <div
          className={`flex w-full justify-${
            isMobile && mobileNavbarCentered ? "center" : "start"
          }`}
        >
          <img
            draggable={false}
            src={logo.src}
            alt={logo.alt}
            width={300}
            height={100}
            className={cn(imageClassName, "select-none zyflo-transition")}
          />
        </div>
      ) : (
        React.createElement(
          headingAs ?? "h3",
          {
            className:
              isMobile && mobileNavbarCentered
                ? "text-center w-full"
                : undefined
          },
          logo.text
        )
      )

    return disableAnimations ? (
      content
    ) : (
      <motion.div
        variants={zyfloBlurInFromBottomVariants as unknown as Variants}
        initial="initial"
        custom={0}
        whileInView="animate"
        viewport={{ once: true }}
        className={`w-fit ${isMobile && mobileNavbarCentered ? "w-full" : ""}`}
      >
        {content}
      </motion.div>
    )
  }

  const renderNavItems = (isMobile = false) => {
    const itemClass = isMobile
      ? `w-fit text-foreground/80 zyflo-transition hover:text-primary text-${
          mobileNavbarCentered ? "center" : "left"
        }`
      : "w-full text-base tracking-tight"
    const listClass = isMobile
      ? `flex list-none flex-col gap-2 justify-${
          mobileNavbarCentered ? "center" : "start"
        } items-${mobileNavbarCentered ? "center" : "start"}`
      : "flex list-none flex-row gap-6 !my-0"

    return (
      <ul className={listClass}>
        {items.map((item, index) => {
          const linkContent = (
            <Link
              key={index}
              href={item.href}
              className={
                isMobile
                  ? "inline-flex w-fit items-center gap-2"
                  : "inline-flex items-center gap-2 text-base"
              }
              aria-label={item.label ?? item.title}
            >
              {item.icon}
              {item.title}
              {srOnly && <span className="sr-only">{item.label}</span>}
            </Link>
          )

          return disableAnimations ? (
            <li key={item.title + index} className={itemClass}>
              {linkContent}
            </li>
          ) : (
            <motion.li
              key={item.title + index}
              variants={zyfloBlurInFromBottomVariants as unknown as Variants}
              initial="initial"
              custom={index}
              whileInView="animate"
              viewport={{ once: true }}
              className={itemClass}
            >
              {linkContent}
            </motion.li>
          )
        })}
      </ul>
    )
  }

  return (
    <header
      className={cn(
        `${
          sticky ? "sticky top-0" : "relative"
        } z-50 flex items-center justify-${justify} border-b border-b-primary/10  px-4 py-5 ${
          backdropBlur ? "bg-background/85 backdrop-blur-sm" : "bg-background"
        } lg:px-8`,
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex w-full items-center justify-between space-x-16">
          {renderLogo()}
          <nav className="hidden lg:flex">{renderNavItems()}</nav>
          {extraContent && !disableAnimations && (
            <motion.div
              variants={zyfloBlurInFromBottomVariants as unknown as Variants}
              initial="initial"
              custom={0}
              whileInView="animate"
              viewport={{ once: true }}
            >
              {extraContent}
            </motion.div>
          )}
          {extraContent && disableAnimations && extraContent}
        </div>
      </div>

      <Drawer direction="top">
        <DrawerTrigger className="block lg:hidden" asChild={true}>
          {!disableAnimations ? (
            <motion.div
              variants={zyfloBlurInFromBottomVariants as unknown as Variants}
              initial="initial"
              custom={0}
              whileInView="animate"
              viewport={{ once: true }}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "flex cursor-pointer"
              )}
            >
              <RxHamburgerMenu className="size-5" />
            </motion.div>
          ) : (
            <RxHamburgerMenu className="size-5" />
          )}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader
            className={`mt-4 !text-${mobileNavbarCentered ? "center" : "left"}`}
          >
            {renderLogo(true)}
          </DrawerHeader>
          <DrawerDescription className="p-4">
            <nav>{renderNavItems(true)}</nav>
            {mobileNavFooter && (
              <footer
                className={`mt-8 justify-${
                  mobileNavbarCentered ? "center" : "start"
                } flex w-full`}
              >
                {!disableAnimations ? (
                  <motion.div
                    variants={{
                      initial: { opacity: 0, x: -45 },
                      animate: { opacity: 1, x: 0 }
                    }}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ delay: items.length * 0.3, duration: 0.4 }}
                    className="w-fit"
                  >
                    {mobileNavFooter}
                  </motion.div>
                ) : (
                  mobileNavFooter
                )}
              </footer>
            )}
          </DrawerDescription>
        </DrawerContent>
      </Drawer>
    </header>
  )
}
