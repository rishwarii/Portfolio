import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ContainerSize = "hero" | "content" | "narrow";

type ContainerProps = {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
};

const sizeClassMap: Record<ContainerSize, string> = {
  hero: "max-w-hero",
  content: "max-w-content",
  narrow: "max-w-4xl"
};

export function Container({
  size = "content",
  className,
  children
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", sizeClassMap[size], className)}>
      {children}
    </div>
  );
}
