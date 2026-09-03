import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChatbotArchitecture } from "@/components/ChatbotArchitecture";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import {
  CASE_STUDY_SECTIONS,
  filledSectionParagraphs,
  getProjectBySlug,
  getProjects,
  hasCaseStudy
} from "@/lib/projects";

type ProjectDetailPageProps = {
  params: {
    slug: string;
  };
};

const linkClassName =
  "font-body text-sm font-medium text-fg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-accent";

export function generateStaticParams() {
  return getProjects().map((project) => ({
    slug: project.slug
  }));
}

export function generateMetadata({ params }: ProjectDetailPageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return { title: "Project | Not Found" };
  }

  return { title: `${project.title} | Project` };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  const caseStudySections = CASE_STUDY_SECTIONS.map(({ key, label }) => ({
    key,
    label,
    paragraphs: filledSectionParagraphs(project.sections[key])
  })).filter((section) => section.paragraphs.length > 0);

  return (
    <>
      <Section reveal={false} spacing="compact" containerSize="reading">
        <SectionHeading
          eyebrow={hasCaseStudy(project) ? "Case study" : "Project"}
          title={project.title}
          description={project.summary}
        />
      </Section>

      <Section className="pt-2" containerSize="reading">
        <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-muted/30">
          {project.diagram ? (
            <div className="flex h-full w-full items-center justify-center p-6">
              <ChatbotArchitecture />
            </div>
          ) : (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 42rem"
              className="object-contain p-6"
              priority
            />
          )}
        </div>

        {project.tags.length > 0 ? (
          <p className="mt-8 font-editorial text-sm italic text-mutedFg">
            {project.tags.join(" · ")}
          </p>
        ) : null}

        {caseStudySections.map((section) => (
          <div key={section.key} className="mt-12">
            <h2 className="font-editorial text-lg italic text-fg">{section.label}</h2>
            {section.key === "architecture" ? (
              <p className="mt-5 font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
                {section.paragraphs.join(" → ")}
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-editorial text-base leading-relaxed text-mutedFg sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}

        {project.highlights.length > 0 && caseStudySections.length === 0 ? (
          <div className="mt-12">
            <h2 className="font-editorial text-lg italic text-fg">Highlights</h2>
            <ul className="mt-5 space-y-3">
              {project.highlights.map((highlight) => (
                <li key={highlight.text}>
                  <p className="font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
                    {highlight.href ? (
                      <a
                        href={highlight.href}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClassName}
                      >
                        {highlight.text}
                      </a>
                    ) : (
                      highlight.text
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-14 flex flex-wrap items-center gap-8 border-t border-border pt-8">
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

          <Link href="/#projects" className={linkClassName}>
            Back to Selected Work
          </Link>
        </div>
      </Section>
    </>
  );
}
