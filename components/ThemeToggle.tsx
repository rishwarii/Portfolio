"use client";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { isDark, isHydrated, toggleTheme } = useTheme();
  const nextTheme = isHydrated && isDark ? "Light Mode" : "Dark Mode";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${nextTheme.toLowerCase()} theme`}
      onClick={toggleTheme}
      className={cn(
        "font-editorial text-base italic text-mutedFg underline decoration-transparent decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
    >
      {nextTheme}
    </button>
  );
}
