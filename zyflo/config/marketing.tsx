import { MarketingConfig } from "types"
import { HomeIcon } from "lucide-react"
import { BookIcon } from "lucide-react"
import { GithubIcon } from "lucide-react"
import { TwitterIcon } from "lucide-react"

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
      icon: <HomeIcon className="size-[18px]" />
    },
    {
      title: "Documentation",
      href: "/docs",
      icon: <BookIcon className="size-[18px]" />
    },
    {
      title: "Github",
      href: "https://github.com/harjjotsinghh/Zyflo",
      icon: <GithubIcon className="size-[18px]" />
    },
    {
      title: "Twitter",
      href: "https://twitter.com/harjjotsinghh",
      icon: <TwitterIcon className="size-[18px]" />
    }
  ]
}
