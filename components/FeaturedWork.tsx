import Link from "next/link";
import { ChatbotArchitecture } from "@/components/ChatbotArchitecture";
import { projectLiveLabel, type Project } from "@/lib/projects";
import { siteContent } from "@/lib/siteContent";

const linkClassName =
  "font-editorial text-base italic text-mutedFg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-accent";

type FeaturedWorkProps = {
  project: Project;
};

export function FeaturedWork({ project }: FeaturedWorkProps) {
  const lead = siteContent.featuredCaseStudy;

  return (
    <div className="featured-hope">
      <article className="featured-hope-copy">
        <h3 className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg sm:text-[1.85rem]">
          {project.title}
        </h3>
        <p className="mt-4 max-w-[46rem] font-editorial text-lg leading-relaxed text-fg sm:text-xl">
          {lead.homepageLead}
        </p>
        <p className="mt-3 max-w-[46rem] font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
          {lead.homepageProof}
        </p>

        {project.tags.length > 0 ? (
          <p className="mt-4 font-editorial text-sm italic text-mutedFg">
            {project.tags.join(" · ")}
          </p>
        ) : null}

        <p className="mt-5 flex flex-wrap items-baseline gap-x-8 gap-y-3">
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
              {projectLiveLabel(project)}
            </a>
          ) : null}
        </p>
      </article>

      <figure className="novel-figure featured-hope-figure">
        <span className="novel-figure-frame">
          <span className="novel-figure-media">
            <ChatbotArchitecture compact className="hope-plate" />
          </span>
        </span>
        <figcaption className="novel-figure-caption">Figure 1. Hope</figcaption>
      </figure>
    </div>
  );
}
