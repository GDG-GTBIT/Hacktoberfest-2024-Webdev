"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { RiSunFill, RiMoonClearFill, RiSettings3Fill } from "react-icons/ri"

export default function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button
          variant="ghost"
          size="lg"
          className="size-10 p-1 text-foreground hover:bg-primary"
        >
          <RiSunFill className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <RiMoonClearFill className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[200] min-w-[140px]">
        <DropdownMenuItem className="capitalize">
          <span>
            <span className="text-[10px] leading-[2px] opacity-80">
              Current Theme
            </span>
            <br />
            <span className="inline-flex items-center text-xs">
              {theme === "light" ? (
                <RiSunFill className="-mt-0.5 mr-1.5 size-3" />
              ) : (
                <RiMoonClearFill className="mr-1.5 size-3" />
              )}
              {theme}
            </span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <RiSunFill className="mr-2 size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <RiMoonClearFill className="mr-2 size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setTheme("system")}
        >
          <RiSettings3Fill className="mr-2 size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
