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
  spacing?: "compact" | "default" | "hero";
  aura?: "none" | "left" | "right";
};

const spacingClassMap: Record<NonNullable<SectionProps["spacing"]>, string> = {
  compact: "py-14 sm:py-16 lg:py-20",
  default: "py-16 sm:py-20 lg:py-24",
  hero: "pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
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
    "scroll-mt-24",
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
      initial={{ y: 8 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.section>
  );
}
