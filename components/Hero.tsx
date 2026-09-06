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

function HeroIntro({ text }: { text: string }) {
  const separators = [" — ", ", "] as const;
  const match = separators
    .map((separator) => ({ separator, index: text.indexOf(separator) }))
    .find((candidate) => candidate.index !== -1);

  if (!match) {
    return <>{text}</>;
  }

  return (
    <>
      {text.slice(0, match.index + match.separator.length)}
      <br className="lg:hidden" />
      {text.slice(match.index + match.separator.length)}
    </>
  );
}

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animate = !prefersReducedMotion;
  const { hero } = siteContent;

  return (
    <section id="home" className="chapter-rule">
      <motion.div
        variants={container}
        initial={animate ? "hidden" : false}
        animate="show"
        className="flex flex-col"
      >
        <motion.div variants={item} className="flex flex-col items-center text-center">
          <h1 className="w-full font-display text-[clamp(3.25rem,7vw,5.5rem)] font-normal leading-[0.96] tracking-[-0.035em] text-fg">
            {hero.headline}
          </h1>
        </motion.div>

        <motion.p variants={item} className="front-matter">
          <span>{hero.location}</span>
          <span aria-hidden="true"> · </span>
          <span>{hero.roles}</span>
          {hero.status.trim().length > 0 ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>{hero.status}</span>
            </>
          ) : null}
        </motion.p>

        <motion.p variants={item} className="hero-lede lg:whitespace-nowrap">
          <HeroIntro text={hero.intro} />
        </motion.p>
      </motion.div>
    </section>
  );
}
