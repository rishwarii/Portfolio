"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { PresetToggle } from "@/components/PresetToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/cn";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" }
];

function isActive(pathname: string, href: string): boolean {
  if (href.startsWith("/#")) {
    return false;
  }
  if (href.startsWith("http")) {
    return false;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavBar() {
  const pathname = usePathname();
  const [activeSectionId, setActiveSectionId] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const sectionIds = navItems
      .map((item) => (item.href.startsWith("/#") ? item.href.slice(2) : ""))
      .filter(Boolean);

    if (sectionIds.length === 0) {
      return;
    }

    let frame = 0;
    const inPageOrder = [
      "projects",
      "experience",
      "contact"
    ].filter((id) => sectionIds.includes(id));

    const updateActiveSection = () => {
      frame = 0;
      const activationLine = 132;
      let nextActive = "";
      const candidates = inPageOrder.length > 0 ? inPageOrder : sectionIds;

      for (const id of candidates) {
        const section = document.getElementById(id);
        if (!section) {
          continue;
        }

        const top = section.getBoundingClientRect().top;
        if (top <= activationLine) {
          nextActive = id;
        }
      }

      if (!nextActive && candidates.length > 0) {
        const firstSection = document.getElementById(candidates[0]);
        if (firstSection) {
          const firstTop = firstSection.getBoundingClientRect().top;
          if (firstTop < window.innerHeight * 0.72) {
            nextActive = candidates[0];
          }
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
  }, []);

  return (
    <header className="nav-frosted sticky top-0 z-50">
      <nav aria-label="Primary" className="py-3">
        <Container size="content" className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-8">
          <Link
            href="/"
            aria-label="Rishwari Ranjan - Home"
            className="brand-wordmark relative inline-flex h-10 w-[11.75rem] items-center rounded-md text-fg transition hover:text-mutedFg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:w-[12.5rem]"
          >
            <span
              aria-hidden="true"
              className="brand-wordmark-initial font-display text-[1.35rem] font-semibold leading-none tracking-[-0.03em]"
            >
              RR
            </span>
            <span
              aria-hidden="true"
              className="brand-wordmark-expanded pointer-events-none absolute left-0 top-1/2 whitespace-nowrap font-display text-[1.22rem] font-semibold tracking-[-0.026em]"
            >
              Rishwari Ranjan
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <ul className="flex flex-wrap items-center gap-1 text-sm font-medium text-mutedFg sm:gap-1.5">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                const sectionId = item.href.startsWith("/#") ? item.href.slice(2) : "";
                const sectionActive = Boolean(sectionId) && activeSectionId === sectionId;

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative rounded-md px-3 py-2 transition hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                        "after:absolute after:bottom-1.5 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-accent/85 after:transition-all after:duration-200",
                        sectionActive ? "text-fg after:w-4" : "after:w-0",
                        active ? "text-fg underline decoration-accent/95 underline-offset-4" : ""
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ButtonLink href="/resume" variant="secondary" size="sm" className="font-semibold">
              Resume
            </ButtonLink>
            <PresetToggle />
            <ThemeToggle />
          </div>
        </Container>
      </nav>
    </header>
  );
}
