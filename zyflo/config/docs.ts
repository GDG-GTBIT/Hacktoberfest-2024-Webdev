import { DocsConfig } from "types"
import { zyfloComponents } from "./site"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Getting Started",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components",
    }
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Installation",
          href: "/docs/getting-started/installation",
        },
        {
          title: "CLI",
          href: "/docs/getting-started/cli",
        }
      ],
    },
    {
      title: "Components",
      items: zyfloComponents.map((component) => {
        return {
          title: component,
          href: `/docs/components/${component.toLowerCase().replaceAll(" ", "-")}`,
        }
      }),
    },
  ],
}
