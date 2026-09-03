"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Preset = "gilt" | "lavender" | "blush";

const PRESET_STORAGE_KEY = "portfolio-color-preset";
const PRESETS: Preset[] = ["gilt", "lavender", "blush"];

function isPreset(value: string | null | undefined): value is Preset {
  return value === "gilt" || value === "lavender" || value === "blush";
}

export function PresetToggle() {
  const [mounted, setMounted] = useState(false);
  const [preset, setPreset] = useState<Preset>("gilt");

  useEffect(() => {
    setMounted(true);

    const root = document.documentElement;
    const storedPreset = window.localStorage.getItem(PRESET_STORAGE_KEY);
    const domPreset = root.dataset.preset;
    const resolvedPreset: Preset = isPreset(storedPreset)
      ? storedPreset
      : isPreset(domPreset)
        ? domPreset
        : "gilt";

    root.dataset.preset = resolvedPreset;
    setPreset(resolvedPreset);
  }, []);

  const setPresetAndPersist = (nextPreset: Preset) => {
    setPreset(nextPreset);
    document.documentElement.dataset.preset = nextPreset;
    window.localStorage.setItem(PRESET_STORAGE_KEY, nextPreset);
  };

  if (process.env.NODE_ENV !== "development" || !mounted) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border-subtle)] bg-card/78 p-1">
      <span className="px-2 text-[0.62rem] uppercase tracking-[0.12em] text-mutedFg">
        Preset
      </span>
      {PRESETS.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setPresetAndPersist(item)}
          aria-pressed={preset === item}
          className={cn(
            "rounded-full px-2.5 py-1 text-[0.66rem] font-medium capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            preset === item
              ? "bg-accent/24 text-fg"
              : "text-mutedFg hover:bg-accent/16 hover:text-fg"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
