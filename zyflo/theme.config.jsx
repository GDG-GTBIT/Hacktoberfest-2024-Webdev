import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentSource } from "@/components/component-source"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ZyfloAlert from "@/components/zyflo/alert"
import Pre from "@/components/pre"
import Note from "@/components/note"
import { Stepper, StepperItem } from "@/components/ui/stepper"
import { useRouter } from 'next/router'
import ModeToggle from "./components/mode-toggle"
import Link from "next/link"
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  logo: <span>My Nextra Documentation</span>,
  project: {
    link: "https://github.com/shuding/nextra"
  },
  components: {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Pre,
    Note,
    Stepper,
    StepperItem,
    ComponentSource,
    Button,
    Image,
    ZyfloAlert
  },
  docsRepositoryBase: 'https://github.com/HarjjotSinghh/Zyflo/tree/main'
  ,
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s | Zyflo',
      }
    }
  },
  footer: {
    text: (
      <div className="flex w-full flex-col gap-2 items-center justify-between">
        <p>
          Developed with 💙 by <Link href="https://harjot.pro" target="_blank" rel="noreferrer" className="!text-foreground underline"><strong>Harjot Singh Rana</strong></Link>.
        </p>
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} Zyflo. All rights reserved.
        </p>
      </div>
    )
  }
}
