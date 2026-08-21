"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
// Preset switcher temporarily hidden — keep the import so it's easy to restore.
// import { PresetToggle } from "@/components/PresetToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/cn";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "About", href: "/about" },
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
      <nav aria-label="Primary" className="py-4">
        <Container size="content" className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-8">
          <Link
            href="/"
            aria-label="Rishwari Ranjan - Home"
            className="brand-wordmark relative inline-flex h-10 w-[11.75rem] items-center rounded-md font-editorial text-fg transition hover:text-mutedFg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:w-[12.5rem]"
          >
            <span
              aria-hidden="true"
              className="brand-wordmark-initial font-editorial text-[1.15rem] font-normal leading-none tracking-[0.02em]"
            >
              RR
            </span>
            <span
              aria-hidden="true"
              className="brand-wordmark-expanded pointer-events-none absolute left-0 top-1/2 whitespace-nowrap font-editorial text-[1.05rem] font-normal tracking-[0.01em]"
            >
              Rishwari Ranjan
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-5 sm:gap-6">
            <ul className="flex flex-wrap items-center gap-4 font-body text-sm text-mutedFg sm:gap-6">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                const sectionId = item.href.startsWith("/#") ? item.href.slice(2) : "";
                const sectionActive = Boolean(sectionId) && activeSectionId === sectionId;

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative py-2 underline decoration-1 underline-offset-4 transition-colors hover:text-fg",
                        sectionActive || active
                          ? "text-fg decoration-accent"
                          : "decoration-transparent hover:decoration-border"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/resume"
              className="font-body text-sm font-medium text-fg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Resume
            </Link>
            {/* Preset switcher hidden for now (site stays on the default light
                lavender "Ink & Paper" theme). Restore by uncommenting the import
                above and this element. */}
            {/* <PresetToggle /> */}
            <ThemeToggle />
          </div>
        </Container>
      </nav>
    </header>
  );
}