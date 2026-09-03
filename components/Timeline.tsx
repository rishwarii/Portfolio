import Link from "next/link";
import { siteContent } from "@/lib/siteContent";

export function Timeline() {
  return (
    <ol className="mt-8 w-full list-none p-0">
      {siteContent.experience.map((item, index) => {
        const isLast = index === siteContent.experience.length - 1;

        return (
          <li
            key={item.id}
            className={isLast ? "pt-6 first:pt-0" : "border-b border-border py-6 first:pt-0"}
          >
            <Link
              href={`/experience/${item.id}`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <div className="flex items-baseline gap-2">
                <h3 className="min-w-0 font-novel text-2xl font-normal tracking-[-0.02em] text-fg transition-colors group-hover:text-accent sm:text-3xl">
                  {item.title} — {item.company}
                </h3>
                <span
                  aria-hidden="true"
                  className="leader-dots"
                />
                <span className="shrink-0 font-editorial text-base italic tabular-nums text-[color:var(--text-muted)] sm:text-lg">
                  {item.date}
                </span>
              </div>
              <p className="mt-4 max-w-[46rem] font-editorial text-lg leading-relaxed text-mutedFg sm:text-xl">
                {item.overview}
              </p>
              <p className="mt-3 font-editorial text-sm italic text-mutedFg transition-colors group-hover:text-accent">
                Read →
              </p>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
