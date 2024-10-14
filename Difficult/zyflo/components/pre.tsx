import { ComponentProps } from "react"
import Copy from "./copy"

export default function Pre({
  children,
  raw,
  ...rest
}: ComponentProps<"pre"> & { raw?: string }) {
  return (
    <div className="relative my-5 max-w-[90dvw]">
      <div className="absolute right-2.5 top-3 z-10 hidden sm:block">
        <Copy content={raw!} />
      </div>
      <div className="relative max-w-[90dvw]">
        <pre {...rest}>{children}</pre>
      </div>
    </div>
  )
}
