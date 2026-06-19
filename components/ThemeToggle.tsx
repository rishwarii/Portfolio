"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { isDark, isHydrated, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Toggle ${isDark ? "light" : "dark"} theme`}
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/90 bg-card text-mutedFg transition hover:border-accent/70 hover:bg-accent/20 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
    >
      {isHydrated && isDark ? (
        <MoonStar size={16} aria-hidden="true" />
      ) : (
        <SunMedium size={16} aria-hidden="true" />
      )}
    </button>
  );
}
