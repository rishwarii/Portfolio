"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/cn";
import { siteContent } from "@/lib/siteContent";

type ChapterLink = {
  id: string;
  roman: string;
  href: string;
  label: string;
};

const chapterLinks: ChapterLink[] = [
  {
    id: "projects",
    roman: siteContent.chapters.projects.roman,
    href: "/#projects",
    label: siteContent.chapters.projects.title
  },
  {
    id: "experience",
    roman: siteContent.chapters.experience.roman,
    href: "/#experience",
    label: siteContent.chapters.experience.title
  },
  {
    id: "education",
    roman: siteContent.chapters.education.roman,
    href: "/#education",
    label: siteContent.chapters.education.title
  },
  {
    id: "contact",
    roman: siteContent.chapters.contact.roman,
    href: "/#contact",
    label: siteContent.chapters.contact.title
  }
];

const leafLinks = [
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" }
];

export function NavBar() {
  const pathname = usePathname();
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || pathname !== "/") {
      setActiveSectionId("");
      return;
    }

    const sectionIds = chapterLinks.map((chapter) => chapter.id);
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const activationLine = 120;
      let nextActive = "";

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) {
          continue;
        }
        if (section.getBoundingClientRect().top <= activationLine) {
          nextActive = id;
        }
      }

      setActiveSectionId((current) => (current === nextActive ? current : nextActive));
    };

    const scheduleUpdate = () => {
      if (frame !== 0) {
        return;
      }
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
    if (hash && sectionIds.includes(hash)) {
      setActiveSectionId(hash);
    } else {
      updateActiveSection();
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-bg focus:px-3 focus:py-2 focus:font-editorial focus:text-sm"
      >
        Skip to content
      </a>

      <nav
        aria-label="Chapters"
        className="chapter-nav pointer-events-none fixed top-1/2 z-50 hidden -translate-y-1/2 lg:block"
      >
        <div className="pointer-events-auto flex flex-col items-start">
          <Link
            href="/"
            aria-label="Home"
            className="mb-5 font-novel text-[0.6rem] tracking-[0.2em] text-mutedFg transition-colors hover:text-fg"
          >
            RR
          </Link>

          <ol className="flex flex-col items-start gap-2">
            {chapterLinks.map((chapter) => {
              const active = pathname === "/" && activeSectionId === chapter.id;
              return (
                <li key={chapter.id}>
                  <Link
                    href={chapter.href}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "inline-flex items-baseline gap-2 font-editorial text-[0.7rem] italic leading-none transition-colors",
                      active
                        ? "text-accent underline decoration-accent/50 decoration-1 underline-offset-4"
                        : "text-mutedFg no-underline hover:text-fg hover:underline hover:decoration-border hover:underline-offset-4"
                    )}
                  >
                    <span className="font-novel text-[0.62rem] not-italic tracking-[0.12em]">
                      {chapter.roman}
                    </span>
                    <span>{chapter.label}</span>
                  </Link>
                </li>
              );
            })}
          </ol>

          <span aria-hidden="true" className="my-4 block h-6 w-px bg-border" />

          <ul className="flex flex-col items-start gap-1.5">
            {leafLinks.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "font-editorial text-[0.7rem] italic transition-colors",
                      active
                        ? "text-fg underline decoration-border decoration-1 underline-offset-4"
                        : "text-mutedFg hover:text-fg hover:underline hover:decoration-border hover:underline-offset-4"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ThemeToggle className="mt-4 font-editorial text-[0.7rem] italic" />
        </div>
      </nav>

      <nav
        aria-label="Chapters"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg/95 lg:hidden"
      >
        <div className="flex items-center justify-between gap-3 px-[var(--page-gutter)] py-3">
          <Link href="/" className="font-novel text-[0.65rem] tracking-[0.2em] text-mutedFg">
            RR
          </Link>
          <ol className="flex items-center gap-4">
            {chapterLinks.map((chapter) => {
              const active = pathname === "/" && activeSectionId === chapter.id;
              return (
                <li key={chapter.id}>
                  <Link
                    href={chapter.href}
                    aria-label={`Chapter ${chapter.roman}, ${chapter.label}`}
                    className={cn(
                      "font-novel text-sm",
                      active ? "text-accent" : "text-mutedFg"
                    )}
                  >
                    {chapter.roman}
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="flex items-center gap-3">
            {leafLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-editorial text-xs italic text-mutedFg"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
