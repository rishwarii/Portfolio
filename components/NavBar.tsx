"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
  { href: "/resume", label: "Resume" }
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="site-nav">
      <ol className="flex flex-wrap items-baseline justify-center font-novel font-medium">
        {navLinks.map((item, index) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : item.href.startsWith("/") && !item.href.includes("#")
                ? pathname === item.href
                : false;
          return (
            <li key={item.href} className="flex items-baseline">
              {index > 0 ? (
                <span aria-hidden="true" className="mx-3 font-editorial tracking-normal">
                  ·
                </span>
              ) : null}
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "transition-colors hover:text-fg",
                  active ? "text-fg" : "text-[color:var(--text-muted)]"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
