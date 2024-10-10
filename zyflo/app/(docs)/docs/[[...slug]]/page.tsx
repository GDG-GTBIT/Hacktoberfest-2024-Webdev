import DocsBreadcrumb from "@/components/docs-breadcrumb"
import Pagination from "@/components/pagination"
import { page_routes } from "@/lib/routes-config"
import { notFound, usePathname } from "next/navigation"
import { getMarkdownForSlug, getTocs } from "@/lib/markdown"
import { PropsWithChildren } from "react"
import { cache } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import TocObserver from "@/components/toc-observer"
import { Leftbar } from "@/components/leftbar"
import { getKeywords } from "@/lib/utils"
import { Metadata } from "next"

type PageProps = {
  params: { slug: string[] }
}

const cachedGetMarkdownForSlug = cache(getMarkdownForSlug)

export default async function DocsPage({ params: { slug = [] } }: PageProps) {
  const pathName = slug.join("/")
  const res: any = await cachedGetMarkdownForSlug(pathName)
  const tocs = await getTocs(pathName)

  if (!res) {
    return notFound()
  }
  return (
    <div className="relative flex w-full items-start justify-between gap-8 lg:gap-16">
      <div className="px-6 pt-9 lg:max-w-[46dvw] lg:px-8 xl:max-w-[45dvw] 2xl:max-w-[45dvw] 3xl:max-w-[30dvw]">
        <DocsBreadcrumb paths={slug} />
        <Markdown>
          <h1 className="mb-0">{res.frontmatter.title}</h1>
          <p className="text-[16.5px] text-muted-foreground">
            {res.frontmatter.description}
          </p>
          <div>{res.content}</div>
          <Pagination pathname={pathName} />
        </Markdown>
      </div>
      <div className="toc sticky top-[36px] hidden h-[95.95vh] max-w-[200px] flex-1 break-words pr-4 lg:flex lg:pr-4">
        <div className="flex w-full flex-col gap-2.5">
          <h5 className="text-sm font-medium">On this page</h5>
          <TocObserver data={tocs} />
        </div>
      </div>
    </div>
  )
}

function Markdown({ children }: PropsWithChildren) {
  return (
    <div className="code-not-in-pre prose prose-zinc w-fit shrink grow-0 break-words pt-2 dark:prose-invert prose-headings:scroll-m-20 prose-headings:text-balance prose-h2:mb-[0.8rem] prose-h2:mt-[1.5rem] prose-h3:!mt-8 prose-h4:!mt-6 prose-h5:text-foreground prose-h6:text-foreground prose-p:text-pretty prose-pre:border-[2px] prose-pre:border-primary/[0.03] prose-pre:bg-neutral-100 prose-img:my-1 sm:mx-auto sm:max-w-[52dvw] md:max-w-[58dvw] lg:max-w-[46dvw] xl:max-w-[45dvw] 2xl:max-w-[45dvw] 3xl:max-w-[30dvw]">
      {children}
    </div>
  )
}

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  )
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const slug = params.slug || []
  const pathName = slug.join("/")
  const res: any = await cachedGetMarkdownForSlug(pathName)

  if (!res) {
    return {}
  }

  const ogImage = `https://zyflo.co/og/${slug[0]}/${slug[slug.length - 1]}.png`
  console.log(ogImage)

  return {
    title:
      typeof slug[0] === "string" && slug[0].toLowerCase() === "components"
        ? toTitleCase(slug[slug.length - 1].replaceAll("-", " "))
        : "" + res.frontmatter.title,
    description: res.frontmatter.description,
    openGraph: {
      title: res.frontmatter.title,
      description: res.frontmatter.description,
      type: "article",
      url: `https://zyflo.com/docs/${pathName}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: res.frontmatter.title + " Zyflo OG Image"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: res.frontmatter.title,
      description: res.frontmatter.description,
      images: [ogImage]
    },
    keywords: getKeywords(slug[0], slug[slug.length - 1])
  }
}

export function generateStaticParams() {
  return page_routes.map((item) => ({
    slug: item.href.split("/")
  }))
}
