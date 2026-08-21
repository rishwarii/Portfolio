import { cn } from "@/lib/cn";

type ChapterOpeningProps = {
  roman: string;
  title: string;
  opener?: string;
  dropCap?: boolean;
  className?: string;
};

export function ChapterOpening({
  roman,
  title,
  opener,
  dropCap = false,
  className
}: ChapterOpeningProps) {
  const dropLetter = opener?.charAt(0) ?? "";
  const openerRest = opener?.slice(1) ?? "";

  return (
    <header className={cn(className)}>
      <div className="py-16 text-center sm:py-20">
        <p className="caps-heading font-body text-sm font-medium tracking-[0.28em] text-accent sm:text-base">
          Chapter {roman}
        </p>
        <h2 className="mt-4 font-novel text-4xl font-normal tracking-[-0.03em] text-fg sm:text-5xl">
          {title}
        </h2>
      </div>

      {opener ? (
        dropCap ? (
          <p className="max-w-3xl text-left font-editorial text-lg leading-relaxed text-fg sm:text-xl">
            <span className="float-left mr-3 font-display text-6xl leading-[0.8] text-accent sm:text-7xl">
              {dropLetter}
            </span>
            {openerRest}
          </p>
        ) : (
          <p className="max-w-3xl text-left font-editorial text-lg leading-relaxed text-mutedFg sm:text-xl">
            {opener}
          </p>
        )
      ) : null}
    </header>
  );
}
