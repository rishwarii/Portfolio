import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = BaseButtonProps & {
  href: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    "btn-primary border shadow-soft active:shadow-soft",
  secondary:
    "border border-[color:var(--border-subtle)] bg-card text-fg hover:border-accent/72 hover:bg-accent/16 active:border-accent/72 active:bg-accent/18",
  ghost:
    "border border-transparent bg-transparent text-mutedFg hover:bg-accent/20 hover:text-fg active:bg-accent/24"
};

const sizeClassMap: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm"
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className
}: Pick<BaseButtonProps, "variant" | "size" | "className">) {
  return cn(
    "btn-polish inline-flex items-center justify-center gap-2 rounded-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    variantClassMap[variant],
    sizeClassMap[size],
    className
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({
        variant,
        size,
        className
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  target,
  rel,
  ariaLabel,
  variant = "primary",
  size = "md",
  className,
  children
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={buttonClasses({
        variant,
        size,
        className
      })}
    >
      {children}
    </Link>
  );
}
