import { cn } from "@/lib/cn";

type ChapterOpeningProps = {
  roman: string;
  title: string;
  opener?: string;
  pause?: boolean;
  className?: string;
};

export function ChapterOpening({
  roman,
  title,
  opener,
  pause = false,
  className
}: ChapterOpeningProps) {
  return (
    <header className={cn("text-left", className)}>
      {pause ? (
        <p
          aria-hidden="true"
          className="mb-8 font-novel text-sm tracking-[0.55em] text-accent sm:mb-10"
        >
          * * *
        </p>
      ) : null}
      <p className="caps-heading font-novel text-xs font-medium tracking-[0.32em] text-accent sm:text-sm">
        Chapter {roman}
      </p>
      <h2 className="mt-4 font-novel text-[clamp(2rem,3.4vw,2.85rem)] font-normal tracking-[-0.03em] text-fg">
        {title}
      </h2>
      {opener ? (
        <p className="mt-5 max-w-xl font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
          {opener}
        </p>
      ) : null}
    </header>
  );
}
