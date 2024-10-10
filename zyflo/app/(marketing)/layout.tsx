import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import ZyfloNavbar from "@/components/zyflo/navbar"
import ModeToggle from "@/components/mode-toggle"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <ZyfloNavbar
        // logoText={{ text: "Zyflo", as: "h4" }}
        // logo={{
        //   src: "/images/logos/normal-zyflo-logo-transparent.svg",
        //   alt: "Logo",
        //   width: 300,
        //   height: 100
        // }}
        logo={{
          text: "Zyflo",
          as: "h4",
          src: "/images/logos/normal-zyflo-logo-transparent.svg",
          alt: "Logo",
          width: 300,
          height: 100
        }}
        items={marketingConfig.mainNav}
        srOnly={true}
        mobileNavbarCentered={false}
        sticky={true}
        extraContent={<ModeToggle />}
        // disableAnimations
      />
      <main className="flex-1">{children}</main>
      <SiteFooter className="border-t border-primary/10" />
    </div>
  )
}
