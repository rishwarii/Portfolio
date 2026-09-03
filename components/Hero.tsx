"use client";

import { motion, type Variants } from "framer-motion";
import { BrandEmblem } from "@/components/BrandEmblem";
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
    <section id="home" className="chapter-rule pb-20 sm:pb-28 lg:pb-36">
      <motion.div
        variants={container}
        initial={animate ? "hidden" : false}
        animate="show"
        className="flex flex-col"
      >
        <motion.div variants={item} className="flex flex-col items-center text-center">
          <BrandEmblem />
          <h1 className="w-full font-display text-[clamp(3.25rem,7vw,5.5rem)] font-normal leading-[0.96] tracking-[-0.035em] text-fg">
            {hero.headline}
          </h1>
        </motion.div>

        <motion.p variants={item} className="front-matter">
          <span>{hero.location}</span>
          <span aria-hidden="true"> · </span>
          <span>{hero.roles}</span>
          <span aria-hidden="true"> · </span>
          <span>{hero.status}</span>
        </motion.p>

        <motion.p
          variants={item}
          className="drop-cap max-w-[46rem] font-editorial text-xl leading-[1.65] text-fg sm:text-2xl sm:leading-[1.6]"
        >
          {hero.intro}
        </motion.p>
      </motion.div>
    </section>
  );
}
