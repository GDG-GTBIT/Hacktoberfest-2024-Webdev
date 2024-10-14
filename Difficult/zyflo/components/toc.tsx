import { getTocs } from "@/lib/markdown"
import TocObserver from "./toc-observer"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function Toc({ path }: { path: string }) {
  const tocs = await getTocs(path)
  return (
    <div className="toc sticky top-16 hidden h-[95.95vh] w-full flex-[1] py-8 lg:flex">
      <div className="flex w-full flex-col gap-2.5">
        <h3 className="text-sm font-medium">On this page</h3>
        <ScrollArea className="pb-4 pt-0.5">
          <TocObserver data={tocs} />
        </ScrollArea>
      </div>
    </div>
  )
}
