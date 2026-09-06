import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompanyLogo } from "@/components/CompanyLogo";
import { Section } from "@/components/Section";
import { getExperienceById, getExperienceRoles } from "@/lib/experience";

type ExperiencePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getExperienceRoles().map((role) => ({
    slug: role.id
  }));
}

export function generateMetadata({ params }: ExperiencePageProps): Metadata {
  const role = getExperienceById(params.slug);

  if (!role) {
    return { title: "Experience | Not Found" };
  }

  return { title: `${role.company} | Experience` };
}

export default function ExperienceDetailPage({ params }: ExperiencePageProps) {
  const role = getExperienceById(params.slug);

  if (!role) {
    return notFound();
  }

  return (
    <Section reveal={false} spacing="hero" containerSize="reading">
      <p className="caps-heading font-novel text-[0.7rem] font-medium tracking-[0.32em] text-accent sm:text-xs">
        Experience
      </p>
      {role.logo ? (
        role.companyUrl.trim().length > 0 ? (
          <a
            href={role.companyUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${role.company} website`}
            className="mt-6 inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <CompanyLogo src={role.logo} />
          </a>
        ) : (
          <div className="mt-6">
            <CompanyLogo src={role.logo} />
          </div>
        )
      ) : null}
      <h1 className="mt-4 font-novel text-[clamp(2rem,4vw,3.25rem)] font-normal tracking-[-0.03em] text-fg">
        {role.company}
      </h1>
      <p className="mt-3 font-editorial text-lg text-fg">
        {role.title}
        {role.location.trim().length > 0 ? (
          <span className="text-mutedFg"> · {role.location}</span>
        ) : null}
      </p>
      <p className="mt-2 font-editorial text-base italic text-mutedFg">{role.date}</p>
      <p className="mt-8 max-w-xl font-editorial text-lg leading-relaxed text-fg">
        {role.overview}
      </p>

      {role.highlights.length > 0 || role.projects.length > 0 ? (
        <div className="mt-10">
          <p className="font-editorial text-base italic text-fg">The work</p>
          {role.highlights.length > 0 ? (
            <ul className="mt-5 space-y-4 font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
              {role.highlights.map((point) => (
                <li
                  key={point}
                  className="relative pl-5 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2 before:bg-accent"
                >
                  {point}
                </li>
              ))}
            </ul>
          ) : null}

          {role.projects.length > 0 ? (
            <div className="mt-8 space-y-10">
              {role.projects.map((project) => (
                <article key={project.title}>
                  <p className="caps-heading font-novel text-[0.65rem] font-medium tracking-[0.24em] text-accent">
                    {project.context}
                  </p>
                  <h2 className="mt-2 font-novel text-2xl font-normal tracking-[-0.02em] text-fg sm:text-3xl">
                    {project.href.trim().length > 0 ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h2>
                  <ul className="mt-4 space-y-3 font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
                    {project.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="mt-16">
        <Link
          href="/#experience"
          className="font-editorial text-base italic text-mutedFg transition-colors hover:text-fg"
        >
          ← Experience
        </Link>
      </p>
    </Section>
  );
}
