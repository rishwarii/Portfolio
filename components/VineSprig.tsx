import Image from "next/image";
import { cn } from "@/lib/cn";

type VineSprigProps = {
  className?: string;
};

export function VineSprig({ className }: VineSprigProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex justify-center py-12 sm:py-14", className)}
    >
      <Image
        src="/images/ornaments/vine-sprig-pattern.jpg"
        alt=""
        width={640}
        height={120}
        className="engraving h-auto w-44 opacity-80 sm:w-60"
      />
    </div>
  );
}
