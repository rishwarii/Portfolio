"use client";

import { useCallback, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PLAYFUL_MODE_STORAGE_KEY = "portfolio-playful-mode";
const FORCE_PLAYFUL_MODE = true;

export function usePlayfulMode() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [playfulMode, setPlayfulMode] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (FORCE_PLAYFUL_MODE) {
      setPlayfulMode(true);
      window.localStorage.setItem(PLAYFUL_MODE_STORAGE_KEY, "true");
      setIsHydrated(true);
      return;
    }

    const storedValue = window.localStorage.getItem(PLAYFUL_MODE_STORAGE_KEY);
    setPlayfulMode(storedValue === "true");
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") {
      return;
    }

    if (FORCE_PLAYFUL_MODE) {
      window.localStorage.setItem(PLAYFUL_MODE_STORAGE_KEY, "true");
      return;
    }

    if (prefersReducedMotion) {
      setPlayfulMode(false);
      window.localStorage.setItem(PLAYFUL_MODE_STORAGE_KEY, "false");
      return;
    }

    window.localStorage.setItem(
      PLAYFUL_MODE_STORAGE_KEY,
      playfulMode ? "true" : "false"
    );
  }, [playfulMode, prefersReducedMotion, isHydrated]);

  const togglePlayfulMode = useCallback(() => {
    if (FORCE_PLAYFUL_MODE) {
      return;
    }

    if (prefersReducedMotion) {
      return;
    }

    setPlayfulMode((current) => !current);
  }, [prefersReducedMotion]);

  return {
    playfulMode,
    setPlayfulMode,
    togglePlayfulMode,
    isHydrated,
    canUsePlayfulMode: isHydrated && (FORCE_PLAYFUL_MODE || !prefersReducedMotion)
  };
}
