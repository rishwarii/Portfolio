import Image from "next/image";
import Link from "next/link";
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
            className={isLast ? "pt-5 first:pt-0" : "border-b border-border py-5 first:pt-0"}
          >
            <Link
              href={`/experience/${item.id}`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2.5">
                    {logo?.kind === "png" ? (
                      <Image
                        src={logo.src}
                        alt=""
                        width={14}
                        height={14}
                        className="relative top-[1px] max-h-[14px] w-auto object-contain opacity-55 [filter:grayscale(1)_contrast(.9)]"
                      />
                    ) : null}
                    {logo?.kind === "svg-mask" ? (
                      <span
                        aria-hidden="true"
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
                    <h3 className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg transition-colors group-hover:text-accent sm:text-3xl">
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

              <p className="mt-5 font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
                {item.overview}
              </p>

              {item.projects.length > 0 ? (
                <ul className="mt-4 space-y-1 font-editorial text-base text-fg sm:text-lg">
                  {item.projects.map((project) => (
                    <li key={project.title}>{project.title}</li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-4 font-editorial text-sm italic text-mutedFg transition-colors group-hover:text-fg">
                The work →
              </p>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
