import { ModeToggle } from "@/components/theme-toggle"
import { GithubIcon, TwitterIcon, HexagonIcon } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import Search from "./search"
import Anchor from "./anchor"
import { SheetLeftbar } from "./leftbar"
import { page_routes } from "@/lib/routes-config"
import { SheetClose } from "@/components/ui/sheet"

export const NAVLINKS = [
  {
    title: "Documentation",
    href: `/docs/${page_routes[0].href}`
  },
  {
    title: "Examples",
    href: "#"
  },
  {
    title: "Guides",
    href: "#"
  },
  {
    title: "Community",
    href: "#"
  },
  {
    title: "Blog",
    href: "#"
  }
]

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-16 w-full border-b bg-transparent px-2 backdrop-blur-sm lg:px-4">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2 p-2 sm:p-3">
        <div className="flex items-center gap-5">
          <SheetLeftbar />
          <div className="flex items-center gap-8">
            <div className="hidden sm:flex">
              <Logo />
            </div>
            <div className="hidden items-center gap-5 text-sm font-medium text-muted-foreground lg:flex">
              <NavMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Search />
            <div className="flex">
              <Link
                href="https://github.com/harjjotsinghh/Zyflo"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <Link
                href="#"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon"
                })}
              >
                <TwitterIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <HexagonIcon className="h-7 w-7 fill-current text-muted-foreground" />
      <h2 className="text-md font-bold">template/docs</h2>
    </Link>
  )
}

export function NavMenu({ isSheet = false }) {
  return (
    <>
      {NAVLINKS.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="text-black dark:text-white font-semibold"
            absolute
            href={item.href}
          >
            {item.title}
          </Anchor>
        )
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        )
      })}
    </>
  )
}
