import { ROUTES } from "@/lib/routes-config"
import Anchor from "./anchor"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from "@/components/ui/sheet"
import { Logo, NavMenu } from "./navbar"
import { Button } from "./ui/button"
import { AlignLeftIcon } from "lucide-react"
import { FooterButtons } from "./footer"
import { cn } from "@/lib/utils"

export function Leftbar({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea>) {
  return (
    <ScrollArea
      className={cn(
        "sticky top-[94px] hidden h-[92.75vh] min-w-fit flex-col md:flex",
        className
      )}
      {...props}
    >
      <Menu />
    </ScrollArea>
  )
}

export function SheetLeftbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="flex lg:hidden">
          <AlignLeftIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 px-0" side="left">
        <SheetHeader>
          <SheetClose className="px-5" asChild>
            <Logo />
          </SheetClose>
        </SheetHeader>
        <ScrollArea className="flex flex-col gap-4">
          <div className="mx-2 mt-3 flex flex-col gap-2 px-5">
            <NavMenu isSheet />
          </div>
          <div className="mx-2 px-5">
            <Menu isSheet />
          </div>
          <div className="flex gap-2 p-6 pb-4">
            <FooterButtons />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export function Menu({ isSheet = false }) {
  return (
    <div className="flex min-w-fit flex-col gap-6 ">
      {ROUTES.map(({ href, items, title }) => {
        return (
          <div className="flex min-w-fit flex-col gap-1.5 " key={href}>
            <Anchor href={`/docs/${href}`} className="hover:text-current">
              <h5 className="mb-2 font-medium sm:text-sm">{title}</h5>
            </Anchor>
            <div className="ml-0.5 flex flex-col gap-3 text-neutral-800 dark:text-neutral-300/85 sm:text-sm">
              {items.map((subItem) => {
                const key = `/docs/${href}${subItem.href}`
                const Comp = (
                  <Anchor
                    activeClassName="font-medium text-primary"
                    key={key}
                    href={key}
                  >
                    {subItem.title}
                  </Anchor>
                )
                return isSheet ? (
                  <SheetClose key={key} asChild>
                    {Comp}
                  </SheetClose>
                ) : (
                  Comp
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
