import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
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

  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "",
        className
      )}
    >
      {eyebrow ? (
        <p className="micro-label font-medium text-mutedFg/95">{eyebrow}</p>
      ) : null}
      <h2 className={cn("section-title text-fg", hasEyebrow ? "mt-3" : "")}>{title}</h2>
      {description ? (
        <p className="small-copy mt-4 max-w-2xl text-mutedFg">{description}</p>
      ) : null}
    </header>
  );
}
