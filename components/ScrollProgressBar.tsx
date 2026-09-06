"use client";

import { useEffect, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const doc = document.documentElement;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const next = clamp(window.scrollY / maxScroll, 0, 1);
      setProgress(next);
    };

    const scheduleUpdate = () => {
      if (frame !== 0) {
        return;
      }
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="reading-ribbon pointer-events-none fixed right-5 top-[18vh] z-40 hidden h-[64vh] w-px bg-border print:hidden lg:block"
    >
      <div
        className="h-full w-full origin-top bg-accent"
        style={{ transform: `scaleY(${progress.toFixed(4)})` }}
      />
    </div>
  );
}
