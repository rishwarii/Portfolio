"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Subtle, slow, non-bouncy. Elements fade in and rise ~12px, staggered top to
// bottom on load. Nothing else in the hero animates.
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

  return (
    <section
      id="home"
      className="bg-hero-paper flex min-h-[68svh] items-center justify-center px-6 py-14 sm:min-h-[82svh] sm:py-32"
    >
      <motion.div
        variants={container}
        initial={animate ? "hidden" : false}
        animate="show"
        className="flex w-full max-w-2xl flex-col items-center text-center"
      >
        <motion.p
          variants={item}
          className="font-body text-xs font-medium uppercase tracking-[0.22em] text-hero-muted"
        >
          Software Engineer
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-6 font-display text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-hero-ink"
        >
          Rishwari Ranjan
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 font-editorial text-xl leading-relaxed text-hero-ink sm:text-2xl"
        >
          I build AI software people actually use.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 font-editorial text-sm text-hero-muted sm:text-base"
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
