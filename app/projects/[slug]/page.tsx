import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { getProjectBySlug, getProjects } from "@/lib/projects";

type ProjectDetailPageProps = {
  params: {
    slug: string;
  };
};

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

  const architecture = project.sections.architecture.filter(Boolean);

  return (
    <>
      <Section reveal={false} spacing="compact" containerSize="hero">
        <SectionHeading
          eyebrow="Project"
          title={project.title}
          description={project.summary}
        />
      </Section>

      <Section className="pt-2" containerSize="hero">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-muted/40 shadow-soft">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-contain p-6"
            priority
          />
        </div>

        {project.tags.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/74 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-mutedFg"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {project.highlights.length > 0 ? (
          <div className="mt-12">
            <h2 className="font-editorial text-lg italic text-fg">Highlights</h2>
            <ul className="mt-5 space-y-4">
              {project.highlights.map((highlight) => (
                <li key={highlight.text} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <p className="text-base leading-relaxed text-mutedFg sm:text-lg">
                    {highlight.href ? (
                      <a
                        href={highlight.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-fg underline decoration-accent/60 underline-offset-4 transition hover:decoration-accent"
                      >
                        {highlight.text}
                        <ArrowUpRight size={14} aria-hidden="true" />
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

        {architecture.length > 0 ? (
          <div className="mt-12">
            <h2 className="font-editorial text-lg italic text-fg">Architecture</h2>
            <pre className="mt-5 overflow-x-auto rounded-xl border border-border/75 bg-accent/10 p-5 font-mono text-[0.72rem] leading-relaxed text-mutedFg">
              {architecture.join("\n")}
            </pre>
          </div>
        ) : null}

        <div className="mt-14 flex flex-wrap items-center gap-6 border-t border-border/60 pt-8">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg underline decoration-accent/90 underline-offset-4 transition hover:text-mutedFg"
            >
              Live site
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}

          <Link
            href="/projects"
            className="inline-flex text-sm font-semibold text-mutedFg underline decoration-border underline-offset-4 transition hover:text-fg"
          >
            Back to Projects
          </Link>
        </div>
      </Section>
    </>
  );
}