import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type EditionFrameProps = {
  children: ReactNode;
  className?: string;
};

const CORNER_SRC = "/images/ornaments/vine-corner-floral-frame.webp";

function Corner({ className }: { className: string }) {
  return (
    <Image
      src={CORNER_SRC}
      alt=""
      width={280}
      height={280}
      aria-hidden="true"
      className={cn("edition-corner engraving", className)}
    />
  );
}

export function EditionFrame({ children, className }: EditionFrameProps) {
  return (
    <div className={cn("edition-frame relative", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 sm:inset-3 lg:inset-4"
      >
        <div className="absolute inset-0 border border-fg/12" />
        <div className="absolute inset-[4px] border border-fg/8 sm:inset-[5px]" />
        <Corner className="bottom-0 left-0 origin-bottom-left" />
        <Corner className="bottom-0 right-0 origin-bottom-right -scale-x-100" />
        <Corner className="left-0 top-0 origin-top-left -scale-y-100" />
        <Corner className="right-0 top-0 origin-top-right -scale-x-100 -scale-y-100" />
      </div>
      <div className="relative px-6 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
        {children}
      </div>
    </div>
  );
}
