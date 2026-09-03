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
    <header className={cn("text-center", className)}>
      <h2 className="chapter-label">
        Chapter {roman} — {title}
      </h2>
      {opener ? (
        <p className="text-left font-editorial text-lg leading-relaxed text-mutedFg sm:text-xl">
          {opener}
        </p>
      ) : null}
    </header>
  );
}
