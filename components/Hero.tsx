"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/Container";
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
    <section id="home" className="relative pb-10 pt-16 sm:pb-14 sm:pt-20 lg:pt-24">
      <Container size="reading">
        <motion.div
          variants={container}
          initial={animate ? "hidden" : false}
          animate="show"
          className="flex flex-col items-start text-left"
        >
          <motion.p
            variants={item}
            className="caps-heading font-novel text-[0.7rem] font-medium tracking-[0.32em] text-mutedFg sm:text-xs"
          >
            {hero.halfTitle}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 w-fit whitespace-nowrap border-b border-fg/20 pb-5 font-novel text-[clamp(2.15rem,5.8vw,4.25rem)] font-normal leading-[0.94] tracking-[-0.035em] text-fg"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl font-editorial text-xl italic leading-snug text-mutedFg sm:text-2xl"
          >
            {hero.subheadline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl font-editorial text-base leading-relaxed text-fg sm:text-lg"
          >
            {hero.intro}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-10 font-editorial text-sm italic text-mutedFg"
          >
            <Link
              href="/about"
              className="underline decoration-transparent underline-offset-4 transition-colors hover:text-fg hover:decoration-border"
            >
              About
            </Link>
            <span aria-hidden="true" className="mx-2.5 text-border">
              ·
            </span>
            <Link
              href="/resume"
              className="underline decoration-transparent underline-offset-4 transition-colors hover:text-fg hover:decoration-border"
            >
              Resume
            </Link>
            <span aria-hidden="true" className="mx-2.5 text-border">
              ·
            </span>
            <Link
              href="#projects"
              className="underline decoration-transparent underline-offset-4 transition-colors hover:text-fg hover:decoration-border"
            >
              Work
            </Link>
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
