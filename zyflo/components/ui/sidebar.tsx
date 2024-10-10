"use client"
import { cn } from "@/lib/utils"
import Link, { LinkProps } from "next/link"
import React, { useState, createContext, useContext } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { IconMenu2, IconX } from "@tabler/icons-react"
import Delayed from "./delayed"

interface Links {
  label: string
  href: string
  icon: React.JSX.Element | React.ReactNode
}

interface SidebarContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  animate: boolean
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) => {
  const [openState, setOpenState] = useState(false)

  const open = openProp !== undefined ? openProp : openState
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  )
}

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      {/* <MobileSidebar {...(props as React.ComponentProps<"div">)} /> */}
    </>
  )
}

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar()
  return (
    <>
      <motion.div
        className={cn(
          "hidden h-full w-[250px] px-4 py-4 sm:flex sm:flex-col",
          className
        )}
        animate={{
          width: animate ? (open ? "250px" : "56px") : "250px"
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  )
}

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar()
  return (
    <>
      <div
        className={cn(
          "flex h-10 w-full flex-row items-center justify-between  px-4 py-4 md:hidden"
        )}
        {...props}
      >
        <div className="z-20 flex w-full justify-end">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
              className={cn(
                "fixed inset-0 z-[100] flex h-full w-full flex-col justify-between bg-white p-10 dark:bg-neutral-900",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links
  className?: string
  props?: LinkProps
}) => {
  const { open, animate } = useSidebar()
  return (
    <Link
      href={link.href}
      className={cn(
        "group/sidebar flex items-center justify-start  gap-2 py-2",
        className
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1
        }}
        className="!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-700 transition duration-150 group-hover/sidebar:translate-x-1 dark:text-neutral-200"
      >
        {link.label}
      </motion.span>
    </Link>
  )
}

export const ZyfloSidebarLink = ({
  link,
  className,
  content,
  ...props
}: {
  link: Links
  className?: string
  props?: LinkProps
  content?: React.ReactNode
}) => {
  const { open, animate } = useSidebar()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={cn(
          "group/sidebar flex flex-col items-start justify-start gap-4 text-foreground",
          className
        )}
        {...props}
        variants={{
          initial: { opacity: 0, x: -48 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 48 }
        }}
        animate={"animate"}
        initial={"initial"}
        exit={"exit"}
        viewport={{ once: false }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {!open &&
          ((
            <Delayed waitBeforeShow={230}>
              <motion.span
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 }
                }}
                animate={"animate"}
                initial={"initial"}
                exit={"exit"}
                viewport={{ once: false }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {link.icon}
              </motion.span>
            </Delayed>
          ) as React.ReactNode)}
        <motion.div
          animate={{
            display: animate
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1
          }}
          exit={{
            display: animate ? (open ? "none" : "inline-block") : "none",
            opacity: animate ? (open ? 0 : 1) : 0
          }}
          viewport={{ once: false }}
          className="!m-0 inline-block whitespace-pre !p-0 text-sm text-foreground/80 zyflo-transition "
        >
          <motion.div
            animate={{
              opacity: animate ? (open ? 1 : 0) : 1,
              height: animate ? (open ? "auto" : 0) : 0
            }}
            exit={{
              opacity: animate ? (open ? 0 : 1) : 0,
              height: animate ? (open ? 0 : "auto") : "auto"
            }}
          >
            {content}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
