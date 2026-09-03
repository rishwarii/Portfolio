import Link from "next/link";
import { ChatbotArchitecture } from "@/components/ChatbotArchitecture";
import type { Project } from "@/lib/projects";
import { siteContent } from "@/lib/siteContent";

const linkClassName =
  "font-editorial text-base italic text-mutedFg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-accent";

type FeaturedWorkProps = {
  project: Project;
  figure?: number;
};

export function FeaturedWork({ project, figure = 1 }: FeaturedWorkProps) {
  const lead = siteContent.featuredCaseStudy;

  return (
    <article>
      <h3 className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg sm:text-3xl">
        {project.title}
      </h3>
      <div className="mt-4 max-w-[46rem] space-y-3 font-editorial text-lg leading-relaxed text-mutedFg sm:text-xl">
        {lead.contextNarrative.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <span className="novel-figure novel-figure-featured">
        <span className="novel-figure-frame">
          <span className="novel-figure-media">
            <ChatbotArchitecture />
          </span>
        </span>
        <span className="novel-figure-caption">
          Figure {figure}. {project.title}
        </span>
      </span>

      <ul className="mt-8 space-y-3 font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
        {lead.proofPoints.map((point) => (
          <li
            key={point}
            className="relative pl-5 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2 before:bg-accent"
          >
            {point}
          </li>
        ))}
      </ul>

      <p className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-3">
        <Link href={`/projects/${project.slug}`} className={linkClassName}>
          Read the case study →
        </Link>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
          >
            Live site
          </a>
        ) : null}
      </p>
    </article>
  );
}
