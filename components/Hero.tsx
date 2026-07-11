"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const TITLES = ["Software Engineer", "Full-Stack", "AI Systems"];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animate = !prefersReducedMotion;
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setTitleIndex((i) => (i + 1) % TITLES.length);
    }, 2800);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <section
      id="home"
      className="flex min-h-[68svh] items-center justify-center px-6 py-14 sm:min-h-[82svh] sm:py-32"
    >
      <motion.div
        variants={container}
        initial={animate ? "hidden" : false}
        animate="show"
        className="flex w-full max-w-2xl flex-col items-center text-center"
      >
        <motion.div
          variants={item}
          className="flex h-5 items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={TITLES[titleIndex]}
              initial={animate ? { opacity: 0, y: 4 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={animate ? { opacity: 0, y: -4 } : undefined}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-xs font-medium uppercase tracking-[0.22em] text-mutedFg"
            >
              {TITLES[titleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 font-display text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-fg"
        >
          Rishwari Ranjan
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 font-editorial text-xl leading-relaxed text-fg sm:text-2xl"
        >
          I build AI software people actually use.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 font-editorial text-sm text-mutedFg sm:text-base"
        >
          The rest of the time, I&apos;m reading books older than lightbulbs.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="#projects"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            View Work
          </Link>
          <Link
            href="/resume"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-transparent px-5 py-2.5 font-body text-sm font-medium text-fg transition-colors hover:bg-accent/10"
          >
            Resume
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}