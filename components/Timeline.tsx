import Image from "next/image";
import { siteContent } from "@/lib/siteContent";

type LogoConfig =
  | { kind: "png"; src: string; alt: string }
  | { kind: "svg-mask"; src: string; alt: string };

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
  }
};

export function Timeline() {
  return (
    <ol className="w-full">
      {siteContent.experience.map((item, index) => {
        const logo = companyLogoById[item.id];
        const isLast = index === siteContent.experience.length - 1;

        return (
          <li
            key={item.id}
            className={isLast ? "pt-8 first:pt-0" : "border-b border-border py-8 first:pt-0"}
          >
            <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <div className="flex items-baseline gap-2.5">
                  {logo?.kind === "png" ? (
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={14}
                      height={14}
                      className="relative top-[1px] max-h-[14px] w-auto object-contain opacity-55 [filter:grayscale(1)_contrast(.9)]"
                    />
                  ) : null}
                  {logo?.kind === "svg-mask" ? (
                    <span
                      role="img"
                      aria-label={logo.alt}
                      className="relative top-[1px] inline-block h-3.5 w-3.5 bg-current text-mutedFg opacity-55"
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
                  <h3 className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg sm:text-3xl">
                    {item.company}
                  </h3>
                </div>
                <p className="mt-2 font-editorial text-lg text-fg">
                  {item.title}
                  {item.location.trim().length > 0 ? (
                    <span className="text-mutedFg"> · {item.location}</span>
                  ) : null}
                </p>
              </div>
              <p className="shrink-0 font-editorial text-base italic text-mutedFg sm:text-right">
                {item.date}
              </p>
            </header>

            <ul className="mt-6 max-w-3xl space-y-3 font-editorial text-lg leading-relaxed text-mutedFg">
              {item.highlights.slice(0, 3).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}
