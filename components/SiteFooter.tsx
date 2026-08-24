"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteFooter() {
  return (
    <footer className="mt-8 flex flex-col items-center gap-5">
      <p className="flex items-baseline gap-3 font-editorial text-sm italic text-[#6e6270]">
        <Link href="/resume" className="transition-colors hover:text-fg">
          Resume
        </Link>
        <span aria-hidden="true">·</span>
        <ThemeToggle className="font-editorial text-sm italic text-[#6e6270]" />
      </p>
      <p className="folio-mark" aria-hidden="true">
        1
      </p>
    </footer>
  );
}
