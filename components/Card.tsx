import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardVariant = "default" | "project" | "subtle";

type CardProps<T extends ElementType> = {
  as?: T;
  variant?: CardVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

const variantClassMap: Record<CardVariant, string> = {
  default:
    "border-[color:var(--border-subtle)] bg-card text-cardFg shadow-soft transition-[box-shadow,border-color] duration-200 hover:border-accent/36 hover:shadow-card",
  project:
    "border-[color:var(--border-subtle)] bg-card text-cardFg shadow-medium transition-[box-shadow,border-color] duration-200 hover:border-accent/44 hover:shadow-glow",
  subtle:
    "border-[color:var(--border-subtle)] bg-card/90 text-cardFg shadow-soft transition-[box-shadow,border-color] duration-200 hover:border-accent/28 hover:shadow-card"
};

export function Card<T extends ElementType = "article">({
  as,
  variant = "default",
  className,
  children,
  ...props
}: CardProps<T>) {
  const Component = as ?? "article";

  return (
    <Component
      className={cn(
        "rounded-2xl border p-5 sm:p-6",
        variantClassMap[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
