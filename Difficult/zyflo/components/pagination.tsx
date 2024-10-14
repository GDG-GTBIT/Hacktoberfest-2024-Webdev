import { getPreviousNext } from "@/lib/markdown"
import { Button, buttonVariants } from "./ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import Link from "next/link"

export default function Pagination({ pathname }: { pathname: string }) {
  const res = getPreviousNext(pathname)

  return (
    <div className="flex items-center justify-between py-8 sm:pb-16 sm:pt-8">
      <div>
        {res.prev && (
          <Link
            className="flex items-center gap-2 px-1 text-sm no-underline"
            href={`/docs/${res.prev.href}`}
          >
            <Button
              variant="secondary"
              className="hover: rounded-full border-2 border-primary/5 bg-primary/5 px-6 transition-all duration-300 ease-in-out-sine hover:border-primary/15 hover:bg-primary/5 dark:border-primary/15 dark:hover:border-primary/30"
              size="sm"
            >
              <ChevronLeftIcon className="h-[1.1rem] w-[1.1rem]" />
              <p>{res.prev.title}</p>
            </Button>
          </Link>
        )}
      </div>
      <div>
        {res.next && (
          <Link
            className="flex items-center gap-2 px-1 text-sm no-underline"
            href={`/docs/${res.next.href}`}
          >
            <Button
              variant="secondary"
              className="hover: rounded-full border-2 border-primary/5 bg-primary/5 px-6 transition-all duration-300 ease-in-out-sine hover:border-primary/15 hover:bg-primary/5 dark:border-primary/15 dark:hover:border-primary/30"
              size="sm"
            >
              <p>{res.next.title}</p>
              <ChevronRightIcon className="h-[1.1rem] w-[1.1rem]" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
