"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container, type ContainerSize } from "@/components/Container";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  reveal?: boolean;
  withContainer?: boolean;
  containerSize?: ContainerSize;
  spacing?: "compact" | "default" | "hero" | "leaf" | "chapter";
  aura?: "none" | "left" | "right";
};

const spacingClassMap: Record<NonNullable<SectionProps["spacing"]>, string> = {
  compact: "py-8 sm:py-10",
  default: "py-12 sm:py-14",
  hero: "pb-12 pt-14 sm:pb-16 sm:pt-16",
  leaf: "py-10 sm:py-12",
  chapter: "py-12 sm:py-16 lg:py-20"
};

export function Section({
  id,
  className = "",
  children,
  reveal = true,
  withContainer = true,
  containerSize = "content",
  spacing = "default",
  aura = "none"
}: SectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const sectionClassName = cn(
    "scroll-mt-8",
    spacingClassMap[spacing],
    aura !== "none" && "section-aura",
    aura === "left" && "section-aura-left",
    aura === "right" && "section-aura-right",
    className
  );
  const content = withContainer ? (
    <Container size={containerSize}>{children}</Container>
  ) : (
    children
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Keep SSR and first client render identical to avoid hydration mismatches
  // from motion-generated inline styles.
  if (!isMounted || !reveal || prefersReducedMotion) {
    return (
      <section id={id} className={sectionClassName}>
        {content}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={sectionClassName}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.section>
  );
}
