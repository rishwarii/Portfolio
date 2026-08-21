import Link from "next/link";
import { ContactCard } from "@/components/ContactCard";
import { FolioMark } from "@/components/FolioMark";
import { Hero } from "@/components/Hero";
import { ProjectList } from "@/components/ProjectList";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/Timeline";
import { getProjects, type Project } from "@/lib/projects";
import { siteContent } from "@/lib/siteContent";

export default function HomePage() {
  const projects = getProjects();
  const projectBySlug = (slug: string) =>
    projects.find((project) => project.slug === slug);
  const listedProjects = [
    "healthcare-ai-chatbot",
    "campuscrew",
    "ndvi-vegetation-health-automation",
    "ai-job-tracker"
  ]
    .map(projectBySlug)
    .filter((project): project is Project => Boolean(project));
  const [educationItem] = siteContent.educationResearch.items;

  return (
    <>
      <Hero />

      <Section id="projects" className="section-divider" containerSize="reading">
        <SectionHeading eyebrow="Selected Work" title="Projects" />
        <div className="mt-6">
          <ProjectList projects={listedProjects} />
        </div>
        <FolioMark page="02" className="mt-16" />
      </Section>

      <Section id="how-i-build" className="section-divider" containerSize="reading">
        <SectionHeading
          title={siteContent.howIBuild.title}
          description={siteContent.howIBuild.description}
        />
        <div className="mt-10 max-w-2xl">
          {siteContent.howIBuild.items.map((item, index) => (
            <article
              key={item.title}
              className={
                index === siteContent.howIBuild.items.length - 1
                  ? "pt-8 first:pt-0"
                  : "border-b border-border py-8 first:pt-0"
              }
            >
              <h3 className="font-novel text-xl font-normal tracking-[-0.015em] text-fg sm:text-[1.35rem]">
                {item.title}
              </h3>
              <p className="mt-3 font-editorial text-base leading-relaxed text-mutedFg">
                {item.body}
              </p>
            </article>
          ))}
        </div>
        <FolioMark page="03" className="mt-16" />
      </Section>

      <Section id="experience" className="section-divider" containerSize="reading">
        <SectionHeading eyebrow="Experience" title="Experience" />
        <div className="mt-6">
          <Timeline />
        </div>
        <FolioMark page="04" className="mt-16" />
      </Section>

      <Section id="education" className="section-divider" containerSize="reading">
        <SectionHeading eyebrow="Education" title="Education" />
        <div className="mt-10 max-w-2xl">
          <h3 className="font-novel text-xl font-normal tracking-[-0.015em] text-fg sm:text-[1.35rem]">
            {educationItem.title}
          </h3>
          <p className="mt-1 font-editorial text-base text-fg">
            {educationItem.subtitle}
          </p>
          {"gpa" in educationItem && educationItem.gpa ? (
            <p className="mt-3 font-editorial text-sm italic text-mutedFg">
              GPA {educationItem.gpa}
            </p>
          ) : null}
          {"courseTags" in educationItem && educationItem.courseTags ? (
            <p className="mt-3 font-editorial text-sm italic text-mutedFg">
              {educationItem.courseTags.join(" · ")}
            </p>
          ) : null}
          <ul className="mt-5 space-y-2 font-editorial text-sm leading-relaxed text-mutedFg sm:text-base">
            {educationItem.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <FolioMark page="05" className="mt-16" />
      </Section>

      <Section id="contact" className="section-divider" containerSize="reading">
        <SectionHeading
          eyebrow="Contact"
          title={siteContent.contact.title}
          description={siteContent.contact.microcopy}
        />
        {siteContent.contact.availability.trim().length > 0 ? (
          <p className="mt-3 max-w-2xl font-editorial text-sm italic text-mutedFg">
            {siteContent.contact.availability}
          </p>
        ) : null}
        <div className="mt-10">
          <ContactCard />
        </div>
        <FolioMark page="06" className="mt-16" />
      </Section>

      <div className="px-6 pb-16 pt-4 sm:px-16 sm:pb-20">
        <Link
          href="/about"
          className="group inline-flex max-w-2xl items-center gap-1.5 text-left font-editorial text-sm italic text-mutedFg transition hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <span>
            There&apos;s more to me than the résumé — books, paintings, and one
            very opinionated cat.
          </span>
          <span aria-hidden="true" className="text-accent transition group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </>
  );
}
