"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ShaderBackground } from "@/components/ui/mesh-portfolio"
import { AnimatedLetterText } from "@/components/ui/potfolio-text"
import { site } from "@/data/site"

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const enter = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay: 0.15 + i * 0.12 },
  })

  return (
    <section className="relative isolate flex min-h-[calc(110svh-4rem)] items-center justify-center overflow-hidden border-b border-line">
      {reduce ? (
        <div className="absolute inset-0 -z-10 bg-[#f9e6c6]" />
      ) : (
        <ShaderBackground className="absolute inset-0 -z-10" />
      )}
      <div className="wrap flex flex-col items-center py-20 text-center">
        <motion.h1 {...enter(0)} aria-label={site.fullName} className="flex justify-center font-display">
          <span aria-hidden="true">
            <AnimatedLetterText
              text={site.fullName}
              letterToReplace="o"
              className="text-[clamp(1.6rem,8.2vw,7rem)] leading-none"
            />
          </span>
        </motion.h1>
        <motion.p {...enter(1)} className="mx-auto mt-6 max-w-xl text-lg text-ink/75">
          {site.bio}
        </motion.p>
      </div>
    </section>
  )
}
