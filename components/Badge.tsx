import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "subtle" | "accent" | "outline";

type BadgeProps = {
  variant?: BadgeVariant;
} & HTMLAttributes<HTMLSpanElement>;

const variantClassMap: Record<BadgeVariant, string> = {
  subtle: "border-border/74 bg-card text-mutedFg",
  accent: "border-accent/68 bg-accent/18 text-accentFg",
  outline: "border-border/84 bg-transparent text-mutedFg"
};

export function Badge({
  variant = "subtle",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.14em]",
        variantClassMap[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
