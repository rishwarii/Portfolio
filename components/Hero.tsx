"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { FolioMark } from "@/components/FolioMark";
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

const ROLES = siteContent.hero.roles;

function TypewriterRoles() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(
    prefersReducedMotion ? ROLES[0] : ""
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(ROLES[0]);
      return;
    }

    let charIndex = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = ROLES[roleIndex];

      if (!deleting) {
        charIndex++;
        setDisplayText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          timeoutId = setTimeout(() => {
            deleting = true;
            tick();
          }, 1400);
          return;
        }
        timeoutId = setTimeout(tick, 55);
      } else {
        charIndex--;
        setDisplayText(current.slice(0, charIndex));
        if (charIndex === 0) {
          setRoleIndex((i) => (i + 1) % ROLES.length);
          return;
        }
        timeoutId = setTimeout(tick, 30);
      }
    };

    timeoutId = setTimeout(tick, 200);
    return () => clearTimeout(timeoutId);
  }, [roleIndex, prefersReducedMotion]);

  return <p className="font-novel text-lg text-accent sm:text-xl">{displayText}</p>;
}

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const animate = !prefersReducedMotion;
  const { hero } = siteContent;
  const dropCap = hero.intro.charAt(0);
  const introRest = hero.intro.slice(1);

  return (
    <section
      id="home"
      className="relative flex min-h-fit flex-col justify-start px-6 pb-14 pt-16 sm:px-16 sm:pb-24 sm:pt-24"
    >
      <motion.div
        variants={container}
        initial={animate ? "hidden" : false}
        animate="show"
        className="relative z-[1] flex w-full max-w-2xl flex-col items-start text-left"
      >
        <motion.p
          variants={item}
          className="caps-heading font-body text-xs font-medium uppercase tracking-[0.24em] text-accent sm:text-sm"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 font-novel text-[clamp(2.25rem,4.5vw,3.75rem)] font-normal uppercase leading-[1.05] tracking-[0.06em] text-fg sm:tracking-[0.09em]"
        >
          {hero.headline}
        </motion.h1>

        <motion.div variants={item} className="mt-4 h-7 sm:h-8">
          <TypewriterRoles />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-5 font-editorial text-lg leading-relaxed text-mutedFg sm:text-xl"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div variants={item} className="mt-10 h-px w-full max-w-md bg-border" />

        <motion.p
          variants={item}
          className="mt-10 max-w-md font-editorial text-base leading-relaxed text-fg sm:text-lg"
        >
          <span className="float-left mr-2 font-display text-5xl leading-[0.8] text-accent sm:text-6xl">
            {dropCap}
          </span>
          {introRest}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-8">
          <Link
            href={hero.primaryCta.href}
            className="font-body text-sm font-medium text-fg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="font-body text-sm font-medium text-mutedFg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
          >
            {hero.secondaryCta.label}
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial={animate ? "hidden" : false}
        animate="show"
        className="relative z-[1] mt-16"
      >
        <FolioMark page={hero.folio} />
      </motion.div>
    </section>
  );
}
