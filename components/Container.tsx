import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ContainerSize = "hero" | "content" | "narrow" | "reading" | "page";

type ContainerProps = {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
};

const sizeClassMap: Record<ContainerSize, string> = {
  hero: "mx-auto max-w-hero",
  content: "mx-auto max-w-content",
  narrow: "mx-auto max-w-4xl",
  reading: "max-w-2xl",
  page: ""
};

export function Container({
  size = "content",
  className,
  children
}: ContainerProps) {
  return (
    <div className={cn("w-full px-6 sm:px-16", sizeClassMap[size], className)}>
      {children}
    </div>
  );
}
