"use client";

import { usePlayfulMode } from "@/hooks/usePlayfulMode";
import { cn } from "@/lib/cn";

type PlayfulModeToggleProps = {
  className?: string;
};
const SHOW_PLAYFUL_MODE_TOGGLE = false;

export function PlayfulModeToggle({ className }: PlayfulModeToggleProps) {
  const { playfulMode, togglePlayfulMode, canUsePlayfulMode } = usePlayfulMode();

  if (!SHOW_PLAYFUL_MODE_TOGGLE || !canUsePlayfulMode) {
    return null;
  }

  return (
    <button
      type="button"
      aria-pressed={playfulMode}
      onClick={togglePlayfulMode}
      className={cn(
        "text-xs text-mutedFg/70 underline decoration-transparent underline-offset-4 transition hover:text-mutedFg hover:decoration-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
    >
      Playful mode: {playfulMode ? "On" : "Off"}
    </button>
  );
}
