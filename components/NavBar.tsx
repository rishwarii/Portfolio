"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" }
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="mb-12 flex justify-center">
      <ol className="flex flex-wrap items-baseline justify-center font-novel text-[0.7rem] font-medium tracking-[0.22em] text-[#6e6270]">
        {navLinks.map((item, index) => {
          const active = item.href === "/" ? pathname === "/" : false;
          return (
            <li key={item.href} className="flex items-baseline">
              {index > 0 ? (
                <span aria-hidden="true" className="mx-2 font-editorial tracking-normal">
                  ·
                </span>
              ) : null}
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "caps-heading transition-colors hover:text-fg",
                  active ? "text-fg" : "text-[#6e6270]"
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
