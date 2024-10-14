import Link from "next/link"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import Search from "@/components/search"
import { DocsSidebarNav } from "@/components/sidebar-nav"
import { SiteFooter } from "@/components/site-footer"
import ModeToggle from "@/components/mode-toggle"
import Image from "next/image"
import { Leftbar } from "@/components/leftbar"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import { Logo } from "@/components/navbar"
import { LogOutIcon } from "lucide-react"
import { marketingConfig } from "@/config/marketing"
import { SiteSidebar } from "@/components/ui/site-sidebar"
import Sticky from "@/components/ui/sticky"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b-2 border-primary/10 bg-background/80 backdrop-blur-md ">
        <div className=" mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <MainNav items={docsConfig.mainNav}>
            <DocsSidebarNav items={docsConfig.sidebarNav} />
          </MainNav>
          <div className="flex flex-1 items-center space-x-4 sm:justify-end">
            <div className="flex-1 sm:grow-0">
              <Search />
            </div>
            <nav className="flex items-center space-x-4">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.gitHub className="h-7 w-7" />
                <span className="sr-only">GitHub</span>
              </Link>
              <ModeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main
        id="docs-content"
        className="relative flex w-full flex-1 flex-col items-start justify-start overflow-hidden xl:items-center xl:justify-center"
      >
        <Image
          src={"/images/light-leak2.webp"}
          alt="Light Leak"
          width={1000}
          height={600}
          className="absolute left-0 top-0 -z-[1] h-screen w-full scale-x-[-1] scale-y-[1] overflow-hidden object-cover antialiased opacity-30 blur-sm zyflo-transition
          [-webkit-mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)] dark:opacity-[0.4]"
        />
        <div className="absolute left-0 top-0 -z-[1] h-full w-full bg-gradient-to-tr from-primary from-40% via-primary to-primary bg-[size:200%_200%] bg-[position:100%_0%] opacity-100 mix-blend-color zyflo-transition dark:opacity-30 dark:mix-blend-color"></div>
        <Image
          src={"/gradient-mesh-light.webp"}
          alt="Light Leak"
          width={20}
          height={20}
          draggable={false}
          className="fixed top-0 -z-[1] block h-screen w-screen select-none object-cover object-right opacity-20 dark:hidden "
        />
        <Image
          src={"/gradient-mesh-dark.webp"}
          alt="Light Leak"
          width={20}
          height={20}
          draggable={false}
          className="fixed top-0 -z-[1] hidden h-screen w-screen select-none object-cover object-right opacity-40 dark:block"
        />
        <div className="mx-auto flex w-full max-w-7xl flex-row justify-start gap-6 pr-6 lg:gap-12 lg:pr-8 xl:mx-auto 2xl:w-fit">
          <SiteSidebar className="" />
          {children}
        </div>
      </main>
      <SiteFooter className="border-t border-primary/10" />
    </div>
  )
}
