import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { ExternalLink } from "@/components/ExternalLink";
import { siteContent } from "@/lib/siteContent";

export function FeaturedCaseStudy() {
  const content = siteContent.featuredCaseStudy;

  return (
    <Card
      variant="project"
      className="featured-surface border-accent/38 p-6 shadow-feature sm:p-8 lg:p-10"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="micro-label font-medium text-mutedFg/92">{content.title}</p>
          <h2 className="mt-3 text-3xl text-fg sm:text-4xl">{content.project}</h2>
          <p className="mt-2 text-base text-mutedFg">{content.context}</p>
        </div>
        <ExternalLink href={content.liveUrl} className="font-medium">
          Live website
        </ExternalLink>
      </div>

      <div className="space-y-12">
        <section>
          <h3 className="text-xl text-fg">Context</h3>
          <div className="mt-4 space-y-2.5 text-sm text-mutedFg sm:text-base">
            {content.contextNarrative.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="mt-5">
            <p className="micro-label font-medium text-mutedFg/88">Constraints</p>
            <ul className="mt-3 space-y-2 text-sm text-mutedFg sm:text-base">
              {content.constraints.map((constraint) => (
                <li key={constraint}>{constraint}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl text-fg">Impact</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {content.impact.map((metric) => (
              <div
                key={metric}
                className="rounded-xl border border-accent/66 bg-gradient-to-br from-accent/34 via-accent/18 to-accent/12 px-4 py-4 text-center shadow-card"
              >
                <p className="text-base font-bold tracking-[-0.012em] text-fg sm:text-lg">
                  {metric}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.15fr,1fr]">
          <div>
            <h3 className="text-xl text-fg">Engineering Decisions</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-mutedFg sm:text-base">
              {content.engineeringDecisions.slice(0, 4).map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="micro-label font-medium text-mutedFg/88">Architecture Snapshot</p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {content.architectureFlow.map((node, index) => (
                <div key={node} className="inline-flex items-center gap-1.5">
                  <Badge
                    variant="subtle"
                    className="rounded-md border-border/80 bg-card/80 px-2.5 py-1.5 text-[0.58rem] tracking-[0.12em]"
                  >
                    {node}
                  </Badge>
                  {index < content.architectureFlow.length - 1 ? (
                    <span aria-hidden="true" className="text-xs text-mutedFg/70">
                      {"->"}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="micro-label font-medium text-mutedFg/88">Tech Stack</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {content.techStack.map((item) => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="normal-case tracking-[0.04em]"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl text-fg">Tradeoffs &amp; Future Improvements</h3>
          <div className="mt-4 grid gap-7 md:grid-cols-2">
            <div>
              <p className="micro-label font-medium text-mutedFg/88">Tradeoffs</p>
              <ul className="mt-3 space-y-2 text-sm text-mutedFg sm:text-base">
                {content.tradeoffs.slice(0, 2).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="micro-label font-medium text-mutedFg/88">Future Improvements</p>
              <ul className="mt-3 space-y-2 text-sm text-mutedFg sm:text-base">
                {content.futureImprovements.slice(0, 2).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Card>
  );
}
