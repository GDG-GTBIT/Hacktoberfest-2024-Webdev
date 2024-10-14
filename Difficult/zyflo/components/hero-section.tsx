"use client"

import React, { useRef } from "react"
import clsx from "clsx"
import { MarqueeDemoVertical } from "@/components/scrolls"
import GradualSpacing from "components/magicui/gradual-spacing"
import { useInView, Variants } from "framer-motion"
import {
  TopLeftShiningLight,
  TopRightShiningLight
} from "@/components/Svgs/shiny-lights"
import { motion } from "framer-motion"
import {
  zyfloBlurInFromLeftVariants,
  zyfloFadeBlurInFromBottomVariants,
  zyfloFadeInFromTopVariants
} from "@/zyflo.config"
import { zyfloComponents } from "@/config/site"

export default function HeroSection({ stars }: { stars: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref)

  return (
    <div className="mx-auto max-w-7xl">
      <TopRightShiningLight />
      <TopLeftShiningLight />
      <div className="-z-1 absolute inset-0  h-[600px] w-full bg-transparent bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-5 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="flex">
        <Container className="relative ml-auto py-20 sm:pb-24 sm:pt-36">
          <div ref={ref} className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
            {/* Make every element flow together beautifully with Zyflo. */}
            <GradualSpacing
              textClassName="justify-start"
              visiblity={isInView}
              className="font-geist max-w-2xl !text-3xl font-normal tracking-tighter text-foreground sm:!text-6xl"
              text={"Make your UI flow"}
            />
            <div className="h-2 opacity-0">.</div>
            <GradualSpacing
              textClassName="justify-start"
              visiblity={isInView}
              className="font-geist max-w-2xl !text-3xl font-normal tracking-tighter text-foreground sm:!text-6xl"
              text={"beautifully with Zyflo"}
            />

            <div className="font-geist text-md mt-6 space-y-4 tracking-tight text-foreground/80 sm:text-xl">
              <motion.p
                variants={zyfloBlurInFromLeftVariants as unknown as Variants}
                initial="initial"
                animate={"animate"}
                viewport={{ once: true }}
                custom={3}
              >
                Zyflo is a library that helps you create beautiful and
                responsive UIs. It is built with React and Next.js, and styled
                using Tailwind CSS.
              </motion.p>
              <motion.p
                variants={zyfloBlurInFromLeftVariants as unknown as Variants}
                initial="initial"
                animate={"animate"}
                viewport={{ once: true }}
                custom={6}
              >
                The vision and motive of Zyflo is to make your UI designs look
                beautiful and responsive, in order to enhance the user
                experience.
              </motion.p>
            </div>
            <motion.a
              variants={zyfloBlurInFromLeftVariants as unknown as Variants}
              initial="initial"
              animate={"animate"}
              viewport={{ once: true }}
              custom={9}
              href="/docs"
              className="group/button text-md mt-12 flex w-fit items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary-400 to-primary-500 bg-[size:200%_200%] bg-[position:0%_0%] object-center px-10 py-2 text-center text-lg font-medium tracking-tighter text-white shadow-[0_0_20px_hsl(var(--primary)/0.2)] zyflo-transition hover:scale-[1.02] hover:bg-[position:100%_100%] hover:text-white/90 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:ring-transparent active:scale-[0.98] dark:shadow-[0_0_20px_hsl(var(--primary)/0.4)] dark:hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)]"
            >
              Get Started
              <div
                aria-hidden
                className="group-hover/button:animate-shineButton pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(110deg,transparent,35%,rgba(255,255,255,.7),75%,transparent)] bg-[length:200%_100%] opacity-0 group-hover/button:[animation-delay:.2s]"
              />
            </motion.a>

            <motion.dl
              variants={zyfloFadeInFromTopVariants as unknown as Variants}
              initial="initial"
              whileInView={"animate"}
              viewport={{ once: true }}
              custom={12}
              className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left"
            >
              {[
                ["Components", `${zyfloComponents.length} (So Far)`],
                ["Stars on GitHub", `${stars} (Sad ngl)`],
                ["Contributors", "1 (Indie devs be like)"]
              ].map(([name, value], i) => (
                <motion.div
                  variants={
                    zyfloFadeBlurInFromBottomVariants as unknown as Variants
                  }
                  initial="initial"
                  whileInView={"animate"}
                  viewport={{ once: true }}
                  custom={i}
                  key={name}
                >
                  <dt className="font-mono text-sm text-foreground/70">
                    {name}
                  </dt>
                  <dd className="mt-0.5 text-2xl font-bold tracking-tight text-foreground">
                    {value}
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </Container>
      </div>
      <div className="absolute bottom-0 left-0 right-0 mx-auto opacity-20"></div>
    </div>
  )
}

export function Container({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  )
}
