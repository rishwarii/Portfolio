import Image from "next/image";
import { Building2, GraduationCap } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { cn } from "@/lib/cn";
import { siteContent } from "@/lib/siteContent";

type LogoConfig =
  | { kind: "png"; src: string; alt: string }
  | { kind: "svg-mask"; src: string; alt: string }
  | { kind: "icon"; icon: typeof GraduationCap; alt: string };

const companyLogoById: Record<string, LogoConfig> = {
  "animo-sano": {
    kind: "png",
    src: "/logos/animo-sano-psychiatry.png",
    alt: "Animo Sano Psychiatry logo"
  },
  nagarro: {
    kind: "svg-mask",
    src: "/logos/nagarro.svg",
    alt: "Nagarro logo"
  },
  "purdue-gta": {
    kind: "icon",
    icon: GraduationCap,
    alt: "Academic icon"
  }
};

export function Timeline() {
  return (
    <ol className="relative">
      {siteContent.experience.map((item, index) => {
        const logo = companyLogoById[item.id];
        const isFirst = index === 0;
        const isLast = index === siteContent.experience.length - 1;

        return (
          <li
            key={item.id}
            className={cn("relative flex gap-4 sm:gap-5", !isLast && "pb-5 sm:pb-6")}
          >
            {/* Editorial timeline rail: hairline + node aligned to the header. */}
            <div aria-hidden="true" className="relative w-4 flex-none sm:w-5">
              <span
                className={cn(
                  "absolute left-1/2 w-px -translate-x-1/2 bg-border",
                  isFirst
                    ? "bottom-0 top-8 sm:top-9"
                    : isLast
                      ? "top-0 h-8 sm:h-9"
                      : "inset-y-0"
                )}
              />
              {item.isCurrent ? (
                <span className="absolute left-1/2 top-8 z-[1] -translate-x-1/2 -translate-y-1/2 sm:top-9">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="timeline-live-ping absolute inset-0 rounded-full bg-accent/60 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-card" />
                  </span>
                </span>
              ) : (
                <span className="absolute left-1/2 top-8 z-[1] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mutedFg/45 ring-2 ring-card sm:top-9" />
              )}
            </div>

            <Card variant="default" className="min-w-0 flex-1 p-5 sm:p-6">
            <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="flex items-start gap-2.5">
                  <span className="mt-[2px] inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center text-mutedFg/65">
                    {logo?.kind === "png" ? (
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={18}
                        height={18}
                        className="max-h-[18px] w-auto object-contain [filter:grayscale(1)_contrast(.9)] opacity-70"
                      />
                    ) : null}
                    {logo?.kind === "svg-mask" ? (
                      <span
                        role="img"
                        aria-label={logo.alt}
                        className="inline-block h-[18px] w-[18px] bg-current opacity-65"
                        style={{
                          maskImage: `url(${logo.src})`,
                          WebkitMaskImage: `url(${logo.src})`,
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskPosition: "center",
                          maskSize: "contain",
                          WebkitMaskSize: "contain"
                        }}
                      />
                    ) : null}
                    {logo?.kind === "icon" ? (
                      <logo.icon size={18} aria-hidden="true" className="opacity-65" />
                    ) : null}
                    {!logo ? <Building2 size={18} aria-hidden="true" className="opacity-65" /> : null}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="font-display text-[1.06rem] font-semibold tracking-[-0.012em] text-fg sm:text-[1.18rem]">
                        {item.company}
                      </h3>
                      {item.isCurrent ? (
                        <Badge variant="accent" className="text-[0.52rem]">
                          Current
                        </Badge>
                      ) : null}
                    </div>
                    <p className="mt-1 font-body text-sm font-medium text-fg/90 sm:text-[0.97rem]">
                      {item.title}
                    </p>
                    {item.location.trim().length > 0 ? (
                      <p className="mt-1 text-xs text-mutedFg sm:text-sm">{item.location}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <p className="text-xs font-medium tracking-[0.04em] text-mutedFg/88 md:pt-0.5 md:text-right">
                {item.date}
              </p>
            </header>

            <ul className="mt-5 max-w-[72ch] space-y-2 font-body text-sm text-mutedFg sm:text-base">
              {item.highlights.slice(0, 3).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            </Card>
          </li>
        );
      })}
    </ol>
  );
}
