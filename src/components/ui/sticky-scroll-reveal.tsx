"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const tones = ["bg-ink", "bg-accent"];

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, index) => index / cardLength);
    const closest = breakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      return distance < Math.abs(latest - breakpoints[acc]) ? index : acc;
    }, 0);
    setActiveCard(closest);
  });

  return (
    <div
      className={cn(
        "relative flex h-[34rem] justify-center space-x-10 overflow-y-auto rounded-xl p-6 transition-colors duration-500 md:p-10",
        tones[activeCard % tones.length],
      )}
      ref={ref}
    >
      <div className="relative flex items-start px-2 md:px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-12 md:my-20">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="font-display text-2xl font-semibold leading-snug text-white"
              >
                {item.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="mt-6 max-w-md text-base leading-relaxed text-white/80 md:mt-10"
              >
                {item.description}
              </motion.p>
              <div className="mt-6 h-48 overflow-hidden rounded-lg border border-white/20 bg-white/10 lg:hidden">
                {item.content ?? null}
              </div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "sticky top-10 hidden h-60 w-80 shrink-0 overflow-hidden rounded-lg border border-white/20 bg-white/10 lg:block",
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </div>
  );
};
