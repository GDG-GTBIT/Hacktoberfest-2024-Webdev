"use client"

import { zyfloComponents } from "@/config/site"
import * as React from "react"

interface AllComponentsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AllComponents({
  children,
  className,
  ...props
}: AllComponentsProps) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6" {...props}>
      {zyfloComponents.map((component) => (
        <a
          key={component}
          className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-primary/50 bg-primary/5 p-6 text-center text-2xl text-card-foreground !no-underline shadow transition-colors hover:bg-primary/10 sm:p-10"
          href={`/docs/components/${component
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          <p className="">{component}</p>
        </a>
      ))}
    </div>
  )
}
