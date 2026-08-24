import Link from "next/link";
import { siteContent } from "@/lib/siteContent";

export function Timeline() {
  return (
    <ol className="w-full">
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
              <h3 className="font-novel text-xl font-normal tracking-[-0.02em] text-fg transition-colors group-hover:text-accent sm:text-2xl">
                {item.title} — {item.company}
              </h3>
              <p className="mt-1 font-editorial text-base italic text-mutedFg">
                {item.location.trim().length > 0
                  ? `${item.location} · ${item.date}`
                  : item.date}
              </p>
              <p className="mt-4 font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
                {item.overview}
              </p>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
