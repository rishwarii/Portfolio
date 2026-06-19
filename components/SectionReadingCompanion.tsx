"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePlayfulMode } from "@/hooks/usePlayfulMode";

const WATCHED_SECTION_IDS = [
  "projects",
  "how-i-build",
  "experience",
  "education",
  "contact"
] as const;

const ENTER_DURATION_MS = 220;
const HOLD_DURATION_MS = 2500;
const EXIT_DURATION_MS = 220;
const SHOW_READING_COMPANION = false;

type CompanionPhase = "hidden" | "enter" | "hold" | "exit";
type CompanionPosition = {
  top: number;
  left: number;
};
const CAT_SIZE_PX = 80;

function resolveCompanionPosition(sectionId: string): CompanionPosition | null {
  const heading = getHeadingForSection(sectionId);
  if (!heading) {
    return null;
  }

  const rect = heading.getBoundingClientRect();
  const nextTop = clamp(
    rect.top + rect.height * 0.42 - CAT_SIZE_PX * 0.62,
    10,
    window.innerHeight - CAT_SIZE_PX - 10
  );
  const preferredLeft = rect.left - CAT_SIZE_PX - 14;
  const nextLeft = clamp(preferredLeft, 10, window.innerWidth - CAT_SIZE_PX - 10);

  return {
    top: nextTop,
    left: nextLeft
  };
}

function getHeadingForSection(sectionId: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`#${sectionId} h2.section-title`);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function SectionReadingCompanion() {
  const { playfulMode, canUsePlayfulMode } = usePlayfulMode();
  const [phase, setPhase] = useState<CompanionPhase>("hidden");
  const [position, setPosition] = useState<CompanionPosition>({
    top: 0,
    left: 0
  });
  const activeSectionRef = useRef<string | null>(null);
  const phaseTimersRef = useRef<number[]>([]);
  const syncFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      phaseTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      phaseTimersRef.current = [];
      if (syncFrameRef.current !== null) {
        window.cancelAnimationFrame(syncFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!SHOW_READING_COMPANION || !canUsePlayfulMode || !playfulMode) {
      phaseTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      phaseTimersRef.current = [];
      activeSectionRef.current = null;
      setPhase("hidden");
      return;
    }

    const visibilityById = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          visibilityById.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let nextSectionId: string | null = null;
        let highestRatio = 0;
        visibilityById.forEach((ratio, sectionId) => {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            nextSectionId = sectionId;
          }
        });

        if (!nextSectionId || nextSectionId === activeSectionRef.current) {
          return;
        }

        const nextPosition = resolveCompanionPosition(nextSectionId);
        if (!nextPosition) {
          return;
        }

        activeSectionRef.current = nextSectionId;
        setPosition(nextPosition);

        phaseTimersRef.current.forEach((timer) => window.clearTimeout(timer));
        phaseTimersRef.current = [];
        setPhase("enter");

        phaseTimersRef.current.push(
          window.setTimeout(() => {
            setPhase("hold");
          }, ENTER_DURATION_MS)
        );

        phaseTimersRef.current.push(
          window.setTimeout(() => {
            setPhase("exit");
          }, ENTER_DURATION_MS + HOLD_DURATION_MS)
        );

        phaseTimersRef.current.push(
          window.setTimeout(() => {
            setPhase("hidden");
          }, ENTER_DURATION_MS + HOLD_DURATION_MS + EXIT_DURATION_MS)
        );
      },
      {
        root: null,
        threshold: [
          0.18,
          0.32,
          0.48,
          0.66
        ],
        rootMargin: "-28% 0px -48% 0px"
      }
    );

    WATCHED_SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
      phaseTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      phaseTimersRef.current = [];
    };
  }, [canUsePlayfulMode, playfulMode]);

  useEffect(() => {
    if (phase === "hidden" || !activeSectionRef.current) {
      return;
    }

    const syncPosition = () => {
      if (!activeSectionRef.current) {
        return;
      }
      const nextPosition = resolveCompanionPosition(activeSectionRef.current);
      if (nextPosition) {
        setPosition(nextPosition);
      }
    };

    const queueSync = () => {
      if (syncFrameRef.current !== null) {
        return;
      }
      syncFrameRef.current = window.requestAnimationFrame(() => {
        syncFrameRef.current = null;
        syncPosition();
      });
    };

    window.addEventListener("scroll", queueSync, { passive: true });
    window.addEventListener("resize", queueSync);

    return () => {
      window.removeEventListener("scroll", queueSync);
      window.removeEventListener("resize", queueSync);
      if (syncFrameRef.current !== null) {
        window.cancelAnimationFrame(syncFrameRef.current);
        syncFrameRef.current = null;
      }
    };
  }, [phase]);

  if (!SHOW_READING_COMPANION || !canUsePlayfulMode || !playfulMode || phase === "hidden") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="section-reading-companion"
      data-phase={phase}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      <Image
        src="/images/illustrations/cat.svg"
        alt=""
        aria-hidden="true"
        width={CAT_SIZE_PX}
        height={CAT_SIZE_PX}
        className="h-20 w-20 opacity-90"
      />
    </div>
  );
}
