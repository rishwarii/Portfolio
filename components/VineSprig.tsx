import { InkOrnament } from "@/components/InkOrnament";
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
      <InkOrnament
        src="/images/ornaments/vine-sprig-pattern-alpha.png"
        className="h-5 w-48 sm:h-6 sm:w-64"
      />
    </div>
  );
}
