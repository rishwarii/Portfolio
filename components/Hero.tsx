"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { siteContent } from "@/lib/siteContent";

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
  const { hero } = siteContent;

  return (
    <section
      id="home"
      className="relative flex min-h-[88svh] flex-col justify-center px-6 py-20 sm:px-16 sm:py-24"
    >
      <motion.div
        variants={container}
        initial={animate ? "hidden" : false}
        animate="show"
        className="mx-auto flex w-full max-w-6xl flex-col items-start text-left"
      >
        <motion.p
          variants={item}
          className="caps-heading font-body text-sm font-medium uppercase tracking-[0.24em] text-accent sm:text-base"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-5 max-w-[18ch] font-novel text-[clamp(3.25rem,8vw,6.75rem)] font-normal leading-[0.98] tracking-[-0.03em] text-fg"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-3xl font-editorial text-2xl italic leading-snug text-mutedFg sm:text-3xl"
        >
          {hero.subheadline}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-10 max-w-3xl font-editorial text-lg leading-relaxed text-fg sm:text-xl"
        >
          {hero.intro}
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-10">
          <Link
            href={hero.primaryCta.href}
            className="font-body text-base font-medium text-fg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="font-body text-base font-medium text-mutedFg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
          >
            {hero.secondaryCta.label}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
