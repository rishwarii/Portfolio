import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type RevealTextProps = {
  text: string;
  className?: string;
  delayMs?: number;
};

export function RevealText({ text, className, delayMs = 0 }: RevealTextProps) {
  return (
    <span className={cn("reveal-text", className)}>
      <span
        className="reveal-text-inner"
        style={
          {
            "--reveal-delay": `${delayMs}ms`
          } as CSSProperties
        }
      >
        {text}
      </span>
    </span>
  );
}
