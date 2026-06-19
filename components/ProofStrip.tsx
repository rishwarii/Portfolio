import { siteContent } from "@/lib/siteContent";
import { renderText } from "@/lib/renderText";

export function ProofStrip() {
  const metrics = siteContent.proofStrip
    .map((item) => renderText(item.metric))
    .filter((metric) => metric.length > 0);

  return (
    <div className="grid grid-cols-2 border-y border-border/55 bg-card md:grid-cols-4">
      {metrics.map((metric, index) => (
        <article
          key={metric}
          className={[
            "px-4 py-5 sm:px-6 sm:py-6",
            index % 2 === 1 ? "border-l border-border/55 md:border-l-0" : "",
            index > 1 ? "border-t border-border/55 md:border-t-0" : "",
            index > 0 ? "md:border-l md:border-border/55" : ""
          ].join(" ")}
        >
          <p className="text-base leading-snug text-fg sm:text-lg">
            {metric}
          </p>
        </article>
      ))}
    </div>
  );
}
