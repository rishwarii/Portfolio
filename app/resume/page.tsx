import type { Metadata } from "next";
import Link from "next/link";
import { CompanyLogo } from "@/components/CompanyLogo";
import { Section } from "@/components/Section";
import { getFeaturedProjects } from "@/lib/projects";
import { siteContent } from "@/lib/siteContent";

export const metadata: Metadata = {
  title: "Resume | Rishwari Ranjan",
  description: siteContent.brand.role
};

const contactLinkClassName =
  "underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-accent";

export default function ResumePage() {
  const { hero, contact, experience, educationResearch } = siteContent;
  const selectedWork = getFeaturedProjects();

  return (
    <Section reveal={false} spacing="hero" containerSize="reading">
      <p className="caps-heading font-novel text-[0.7rem] font-medium tracking-[0.32em] text-accent sm:text-xs">
        Resume
      </p>
      <h1 className="mt-4 font-novel text-[clamp(2rem,4vw,3.25rem)] font-normal tracking-[-0.03em] text-fg">
        {hero.headline}
      </h1>
      <p className="mt-3 font-editorial text-lg italic text-mutedFg">
        {[hero.roles, hero.location].filter((part) => part.trim().length > 0).join(" · ")}
      </p>
      <p className="mt-8 max-w-[46rem] font-editorial text-lg leading-relaxed text-fg">
        {hero.intro}
      </p>
      <p className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-editorial text-base text-mutedFg">
        <a href={`mailto:${contact.email}`} className={contactLinkClassName}>
          {contact.email}
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className={contactLinkClassName}
        >
          LinkedIn
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          className={contactLinkClassName}
        >
          GitHub
        </a>
      </p>

      <section className="mt-14">
        <h2 className="chapter-label text-left">Experience</h2>
        <ol className="mt-2 list-none space-y-10 p-0">
          {experience.map((role) => (
            <li key={role.id}>
              {role.logo ? <CompanyLogo src={role.logo} className="mb-3" /> : null}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg">
                  {role.title} — {role.company}
                </h3>
                <span className="font-editorial text-base italic text-mutedFg">
                  {role.date}
                </span>
              </div>
              {role.location.trim().length > 0 ? (
                <p className="mt-1 font-editorial text-base italic text-mutedFg">
                  {role.location}
                </p>
              ) : null}
              <p className="mt-4 font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
                {role.overview}
              </p>
              {role.highlights.length > 0 ? (
                <ul className="mt-4 space-y-3 font-editorial text-base leading-relaxed text-mutedFg">
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
              {role.projects.map((project) => (
                <div key={project.title} className="mt-6">
                  <p className="font-editorial text-base italic text-fg">
                    {project.href.trim().length > 0 ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className={contactLinkClassName}
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                    {project.context.trim().length > 0 ? (
                      <span className="text-mutedFg"> · {project.context}</span>
                    ) : null}
                  </p>
                  <ul className="mt-3 space-y-2 font-editorial text-base leading-relaxed text-mutedFg">
                    {project.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="chapter-label text-left">{educationResearch.title}</h2>
        <div className="mt-2 space-y-8">
          {educationResearch.items.map((item) => (
            <div key={item.title}>
              <h3 className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg">
                {item.title}
              </h3>
              {item.subtitle.trim().length > 0 ? (
                <p className="mt-2 font-editorial text-lg text-fg">{item.subtitle}</p>
              ) : null}
              {item.gpa.trim().length > 0 ? (
                <p className="mt-2 font-editorial text-base italic text-mutedFg">
                  GPA {item.gpa}
                </p>
              ) : null}
              {item.courseTags.length > 0 ? (
                <p className="mt-1 font-editorial text-base italic text-mutedFg">
                  {item.courseTags.join(" · ")}
                </p>
              ) : null}
              {item.credential.trim().length > 0 ? (
                <p className="mt-1 font-editorial text-base italic text-mutedFg">
                  {item.credential}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="chapter-label text-left">Selected Work</h2>
        <ol className="mt-2 list-none space-y-6 p-0">
          {selectedWork.map((project) => (
            <li key={project.slug}>
              <h3 className="font-novel text-xl font-normal tracking-[-0.02em] text-fg">
                {project.title}
              </h3>
              <p className="mt-2 font-editorial text-base leading-relaxed text-mutedFg">
                {project.summary}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-16">
        <Link
          href="/"
          className="font-editorial text-base italic text-mutedFg transition-colors hover:text-fg"
        >
          ← Home
        </Link>
      </p>
    </Section>
  );
}
