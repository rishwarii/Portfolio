import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left"
}: SectionHeadingProps) {
  const hasEyebrow = Boolean(eyebrow && eyebrow.trim().length > 0);
  const showTitle = Boolean(title && title.trim().length > 0 && title !== eyebrow);

  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {hasEyebrow ? (
        <p className="caps-heading font-body text-xs font-medium uppercase tracking-[0.24em] text-accent sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      {showTitle ? (
        <h2
          className={cn(
            "section-title font-novel font-normal tracking-[-0.02em] text-fg",
            hasEyebrow ? "mt-3" : ""
          )}
        >
          {title}
        </h2>
      ) : hasEyebrow ? (
        <h2 className="sr-only">{eyebrow}</h2>
      ) : null}
      {description ? (
        <p className="mt-4 max-w-2xl font-editorial text-base leading-relaxed text-mutedFg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
