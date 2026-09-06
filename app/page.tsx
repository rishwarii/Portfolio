import Image from "next/image";
import Link from "next/link";
import { ChapterOpening } from "@/components/ChapterOpening";
import { ContactCard } from "@/components/ContactCard";
import { Container } from "@/components/Container";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Hero } from "@/components/Hero";
import { ProjectList } from "@/components/ProjectList";
import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import { getProjects, type Project } from "@/lib/projects";
import { siteContent } from "@/lib/siteContent";

export default function HomePage() {
  const projects = getProjects();
  const projectBySlug = (slug: string) =>
    projects.find((project) => project.slug === slug);
  const featuredProject = projectBySlug("healthcare-ai-chatbot");
  const listedProjects = [
    "campuscrew",
    "ndvi-vegetation-health-automation"
  ]
    .map(projectBySlug)
    .filter((project): project is Project => Boolean(project));
  const educationItems = siteContent.educationResearch.items;
  const { chapters } = siteContent;

  return (
    <>
      <Hero />

      <Section id="projects" className="chapter-rule projects-chapter" containerSize="reading" spacing="compact">
        <ChapterOpening
          roman={chapters.projects.roman}
          title={chapters.projects.title}
          opener={
            chapters.projects.opener.trim().length > 0
              ? chapters.projects.opener
              : undefined
          }
        />
        {featuredProject ? (
          <div className="mt-6">
            <FeaturedWork project={featuredProject} />
          </div>
        ) : null}
        <div className="mt-5 border-t border-border pt-5">
          <ProjectList projects={listedProjects} figureStart={2} quiet />
        </div>
      </Section>

      <Section id="experience" className="chapter-rule" containerSize="reading" spacing="chapter">
        <ChapterOpening
          roman={chapters.experience.roman}
          title={chapters.experience.title}
        />
        <Timeline />
      </Section>

      <Section id="education" className="chapter-rule" containerSize="reading" spacing="chapter">
        <ChapterOpening
          roman={chapters.education.roman}
          title={chapters.education.title}
        />
        <div className="mt-8 space-y-10">
          {educationItems.map((item) => (
            <div key={item.title}>
              {item.href.trim().length > 0 ? (
                <h3 className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg sm:text-3xl">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    {item.title}
                  </a>
                </h3>
              ) : (
                <h3 className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg sm:text-3xl">
                  {item.title}
                </h3>
              )}
              {item.subtitle.trim().length > 0 ? (
                <p className="mt-2 font-editorial text-xl text-fg">
                  {item.subtitle}
                </p>
              ) : null}
              {item.gpa.trim().length > 0 ? (
                <p className="mt-4 font-editorial text-lg italic text-mutedFg">
                  GPA {item.gpa}
                </p>
              ) : null}
              {item.courseTags.length > 0 ? (
                <p className="mt-3 font-editorial text-lg italic text-mutedFg">
                  {item.courseTags.join(" · ")}
                </p>
              ) : null}
              {item.credential.trim().length > 0 ? (
                <p className="mt-3 font-editorial text-lg italic text-mutedFg">
                  {item.credential}
                </p>
              ) : null}
              {item.points.length > 0 ? (
                <ul className="mt-6 space-y-2 font-editorial text-lg leading-relaxed text-mutedFg sm:text-xl">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
        {siteContent.educationResearch.credentials.trim().length > 0 ? (
          <p className="mt-10 font-editorial text-lg italic text-mutedFg">
            {siteContent.educationResearch.credentials}
          </p>
        ) : null}
      </Section>

      <Section id="contact" className="chapter-rule" containerSize="reading" spacing="chapter">
        <ChapterOpening
          roman={chapters.contact.roman}
          title={chapters.contact.title}
        />
        {siteContent.contact.availability.trim().length > 0 ? (
          <p className="mt-3 font-editorial text-xl italic text-mutedFg">
            {siteContent.contact.availability}
          </p>
        ) : null}
        <div className="mt-10">
          <ContactCard />
        </div>
      </Section>

      <div className="w-full pb-14 pt-4 sm:pb-16">
        <Container size="reading">
          <Image
            src="/images/about/book-stack.png"
            alt=""
            width={220}
            height={420}
            className="mb-8 h-auto w-28 origin-bottom-left bg-transparent sm:w-36"
          />
          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 text-left font-editorial text-lg italic text-mutedFg transition hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span>
              There&apos;s more to me than the résumé — books, paintings, and one
              very opinionated cat.
            </span>
            <span
              aria-hidden="true"
              className="text-mutedFg transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Container>
      </div>
    </>
  );
}
