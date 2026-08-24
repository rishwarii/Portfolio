import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ContainerSize = "hero" | "content" | "narrow" | "reading" | "folio" | "page";

type ContainerProps = {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
};

const innerClassMap: Record<ContainerSize, string> = {
  hero: "w-full",
  content: "w-full",
  narrow: "w-full max-w-xl",
  reading: "w-full",
  folio: "w-full",
  page: "w-full"
};

export function Container({
  size = "content",
  className,
  children
}: ContainerProps) {
  return (
    <div className="w-full">
      <div className={cn(innerClassMap[size], className)}>{children}</div>
    </div>
  );
}
