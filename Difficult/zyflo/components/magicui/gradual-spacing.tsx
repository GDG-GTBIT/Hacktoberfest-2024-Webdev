"use client"
import React from "react"
import { cn } from "@/lib/utils"
import { AnimatePresence, Variants, motion } from "framer-motion"

interface GradualSpacingProps {
  text: string
  duration?: number
  delayMultiple?: number
  framerProps?: Variants
  className?: string
  textClassName?: string
  visiblity?: boolean
}

export default function GradualSpacing({
  text,
  textClassName = "justify-start items-center",
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  className,
  visiblity
}: GradualSpacingProps) {
  const specialWords = ["flow", "zyflo"]
  return (
    <div className={cn("flex", textClassName)}>
      <AnimatePresence>
        {text.split(" ").map((word, i) => {
          return (
            <>
              {!specialWords.includes(word.toLowerCase()) ? (
                <>
                  {word.split("").map((char, j) => (
                    <motion.h1
                      key={i}
                      initial="hidden"
                      animate={visiblity ? "visible" : "hidden"}
                      exit="hidden"
                      variants={framerProps}
                      transition={{ duration, delay: i * delayMultiple }}
                      className={cn("drop-shadow-sm", className)}
                    >
                      {char}
                    </motion.h1>
                  ))}
                  <span>&nbsp;&nbsp;&nbsp;</span>
                </>
              ) : (
                <>
                  <div
                    className={cn(
                      `relative ml-2.5 inline-flex flex-row md:ml-5`
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, width: "0%" }}
                      animate={{ opacity: 1, width: "100%" }}
                      transition={{
                        duration,
                        ease: "easeInOut",
                        delay:
                          i * delayMultiple +
                          (word.toLowerCase() === "flow" ? 0.6 : 1.2)
                      }}
                      className={cn(
                        `absolute -inset-1 block -skew-x-12 scale-x-125 scale-y-110 from-primary-400 to-primary bg-[size:200%_200%] bg-[position:100%_100%] object-center drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)] hover:bg-[position:200%_200%]`,
                        i % 2 === 0 ? "bg-gradient-to-tr" : "bg-gradient-to-bl"
                      )}
                    />
                    <span className="-ml-2 inline-flex flex-row !text-white">
                      {word.split("").map((char, j) => (
                        <motion.h1
                          key={i}
                          initial="hidden"
                          animate={visiblity ? "visible" : "hidden"}
                          exit="hidden"
                          variants={framerProps}
                          transition={{
                            duration,
                            delay: i * j * delayMultiple
                          }}
                          className={cn(
                            "!text-white drop-shadow-sm",
                            className
                          )}
                        >
                          {char}
                        </motion.h1>
                      ))}
                    </span>
                    {text.split(" ")[text.split(" ").length - 1] !== word && (
                      <span>&nbsp;&nbsp;&nbsp;</span>
                    )}
                  </div>
                </>
              )}
            </>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
