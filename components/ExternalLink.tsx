import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export function ExternalLink({
  href,
  children,
  className,
  target,
  rel,
  ariaLabel
}: ExternalLinkProps) {
  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      target={target ?? (isExternal ? "_blank" : undefined)}
      rel={rel ?? (isExternal ? "noreferrer" : undefined)}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-fg underline decoration-accent/90 underline-offset-4 transition hover:text-mutedFg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        className
      )}
    >
      {children}
    </Link>
  );
}
