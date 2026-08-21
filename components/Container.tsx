import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ContainerSize = "hero" | "content" | "narrow" | "reading" | "folio" | "page";

type ContainerProps = {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
};

const innerClassMap: Record<ContainerSize, string> = {
  hero: "w-full max-w-page",
  content: "w-full max-w-page",
  narrow: "w-full max-w-xl",
  reading: "w-full max-w-page",
  folio: "w-full max-w-content",
  page: "w-full"
};

export function Container({
  size = "content",
  className,
  children
}: ContainerProps) {
  return (
    <div className="w-full pl-[var(--page-gutter)] pr-[var(--page-gutter)]">
      <div className={cn(innerClassMap[size], className)}>{children}</div>
    </div>
  );
}
