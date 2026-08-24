"use client";

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { siteContent } from "@/lib/siteContent";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animate = !prefersReducedMotion;
  const { hero } = siteContent;

  return (
    <section id="home" className="chapter-rule pb-2">
      <motion.div
        variants={container}
        initial={animate ? "hidden" : false}
        animate="show"
        className="flex flex-col items-start text-left"
      >
        <motion.h1
          variants={item}
          className="w-full font-display text-[clamp(2.35rem,8vw,3.4rem)] font-normal leading-[0.96] tracking-[-0.035em] text-[#2a1b2e]"
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 font-editorial text-xl italic leading-snug text-[#6e6270]"
        >
          {hero.subheadline}
        </motion.p>

        <motion.p
          variants={item}
          className="drop-cap mt-8 font-editorial text-base leading-relaxed text-fg sm:text-lg"
        >
          {hero.intro}
        </motion.p>
      </motion.div>
    </section>
  );
}
