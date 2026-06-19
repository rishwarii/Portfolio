import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { renderText } from "@/lib/renderText";

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
    return {
      title: "Project | Not Found"
    };
  }

  return {
    title: `${project.title} | Project`
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const summary = renderText(project.summary);
  const overview = project.sections.overview.map(renderText).filter(Boolean);
  const problem = project.sections.problem.map(renderText).filter(Boolean);
  const approach = project.sections.approach.map(renderText).filter(Boolean);
  const architecture = project.sections.architecture.map(renderText).filter(Boolean);
  const outcomes = project.sections.outcomes.map(renderText).filter(Boolean);
  const tradeoffs = project.sections.tradeoffs.map(renderText).filter(Boolean);

  return (
    <>
      <Section reveal={false} spacing="compact" containerSize="hero">
        <SectionHeading
          eyebrow="Project Detail"
          title={project.title}
          description={summary.length > 0 ? summary : undefined}
        />
      </Section>

      <Section className="pt-2" containerSize="hero">
        <Card variant="default" className="space-y-8 p-6 sm:p-8">
          <section>
            <h2 className="text-2xl text-fg">Overview</h2>
            <ul className="mt-3 space-y-2 text-sm text-mutedFg sm:text-base">
              {overview.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-fg">Problem</h2>
            <ul className="mt-3 space-y-2 text-sm text-mutedFg sm:text-base">
              {problem.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-fg">Approach</h2>
            <ul className="mt-3 space-y-2 text-sm text-mutedFg sm:text-base">
              {approach.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-fg">Architecture</h2>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-border/75 bg-accent/10 p-4 font-mono text-[0.68rem] leading-relaxed text-mutedFg sm:text-[0.72rem]">
              {architecture.join("\n")}
            </pre>
          </section>

          <section>
            <h2 className="text-2xl text-fg">Outcomes</h2>
            <ul className="mt-3 space-y-2 text-sm text-mutedFg sm:text-base">
              {outcomes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-fg">Tradeoffs</h2>
            <ul className="mt-3 space-y-2 text-sm text-mutedFg sm:text-base">
              {tradeoffs.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        </Card>

        <Link
          href="/projects"
          className="mt-8 inline-flex text-sm font-semibold text-fg underline decoration-accent/90 underline-offset-4 transition hover:text-mutedFg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Back to Projects
        </Link>
      </Section>
    </>
  );
}
