import { cn } from "@/lib/cn";

type ChapterOpeningProps = {
  roman: string;
  title: string;
  opener?: string;
  className?: string;
};

export function ChapterOpening({
  roman,
  title,
  opener,
  className
}: ChapterOpeningProps) {
  return (
    <header className={cn("text-left", className)}>
      <h2 className="caps-heading font-novel text-xs font-medium tracking-[0.28em] text-[#bd476e] sm:text-sm">
        Chapter {roman} — {title}
      </h2>
      {opener ? (
        <p className="mt-4 font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
          {opener}
        </p>
      ) : null}
    </header>
  );
}
