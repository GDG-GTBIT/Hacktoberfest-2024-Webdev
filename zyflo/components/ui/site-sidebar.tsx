"use client"
import { Sidebar, SidebarBody, ZyfloSidebarLink } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ROUTES } from "@/lib/routes-config"
import Anchor from "../anchor"
import { ZyfloBadge } from "../zyflo/badge"

export function SiteSidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        `hidden flex-col border-r-2 border-primary/10 bg-transparent sm:flex lg:w-fit lg:flex-shrink lg:flex-grow-0`,
        className
      )}
      {...props}
    >
      <Sidebar animate={true} open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="mt-6 flex w-fit flex-col items-start justify-start">
            <div className="flex flex-col gap-8">
              {ROUTES.map((route, idx) => (
                <ZyfloSidebarLink
                  key={idx}
                  link={{
                    label: route.title,
                    href: route.href,
                    icon: <route.icon className="size-6 text-foreground" />
                  }}
                  content={
                    <div className="flex min-w-fit flex-col gap-2 " key={idx}>
                      <Anchor
                        href={`/docs/${route.href}`}
                        className="zyflo-transition hover:text-primary"
                      >
                        <h5 className="mb-2 inline-flex items-center gap-2 font-medium text-foreground sm:text-sm">
                          {<route.icon className="size-6" />}
                          {route.title}
                        </h5>
                      </Anchor>
                      <div className="ml-0.5 flex flex-col gap-3 text-foreground/80 sm:text-sm">
                        {route.items.map((subItem) => (
                          <Anchor
                            activeClassName="font-medium text-primary"
                            key={`/docs/${route.href}${subItem.href}`}
                            href={`/docs/${route.href}${subItem.href}`}
                            className="flex w-full flex-row items-center justify-between gap-3 zyflo-transition hover:text-primary"
                          >
                            {subItem.title}
                            {subItem.new && (
                              <ZyfloBadge
                                variant="secondary"
                                size="sm"
                                className="!h-4 border-primary/30 !px-[6px] !py-[0px] text-[9px] hover:border-primary/50"
                              >
                                New
                              </ZyfloBadge>
                            )}
                          </Anchor>
                        ))}
                      </div>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  )
}
