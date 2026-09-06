"use client";

import Link from "next/link";
import { PresetToggle } from "@/components/PresetToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteFooter() {
  return (
    <footer className="mt-8 flex flex-col items-center gap-5">
      <p className="flex flex-wrap items-baseline justify-center gap-3 font-editorial text-base italic text-[color:var(--text-muted)]">
        <Link href="/resume" className="transition-colors hover:text-fg">
          Resume
        </Link>
        <span aria-hidden="true">·</span>
        <ThemeToggle className="font-editorial text-base italic text-[color:var(--text-muted)]" />
      </p>
      <PresetToggle />
      <p className="folio-mark" aria-hidden="true">
        1
      </p>
    </footer>
  );
}
