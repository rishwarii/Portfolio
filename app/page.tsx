import Image from "next/image";
import Link from "next/link";
import { ChapterOpening } from "@/components/ChapterOpening";
import { ContactCard } from "@/components/ContactCard";
import { Container } from "@/components/Container";
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
  const listedProjects = [
    "healthcare-ai-chatbot",
    "campuscrew",
    "ndvi-vegetation-health-automation",
    "ai-job-tracker"
  ]
    .map(projectBySlug)
    .filter((project): project is Project => Boolean(project));
  const [educationItem] = siteContent.educationResearch.items;
  const { chapters } = siteContent;

  return (
    <>
      <Hero />

      <Section id="projects" containerSize="reading" spacing="compact">
        <ChapterOpening
          roman={chapters.projects.roman}
          title={chapters.projects.title}
        />
        <div className="mt-6">
          <ProjectList projects={listedProjects} />
        </div>
      </Section>

      <Section id="experience" containerSize="reading" spacing="leaf">
        <ChapterOpening
          roman={chapters.experience.roman}
          title={chapters.experience.title}
          pause
        />
        <Timeline />
      </Section>

      <Section id="education" containerSize="reading" spacing="leaf">
        <ChapterOpening
          roman={chapters.education.roman}
          title={chapters.education.title}
          pause
        />
        <div>
          <h3 className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg sm:text-3xl">
            {educationItem.title}
          </h3>
          <p className="mt-2 font-editorial text-lg text-fg">
            {educationItem.subtitle}
          </p>
          {"gpa" in educationItem && educationItem.gpa ? (
            <p className="mt-4 font-editorial text-base italic text-mutedFg">
              GPA {educationItem.gpa}
            </p>
          ) : null}
          {"courseTags" in educationItem && educationItem.courseTags ? (
            <p className="mt-3 font-editorial text-base italic text-mutedFg">
              {educationItem.courseTags.join(" · ")}
            </p>
          ) : null}
          {educationItem.points.length > 0 ? (
            <ul className="mt-6 space-y-2 font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
              {educationItem.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </Section>

      <Section id="contact" containerSize="reading" spacing="leaf">
        <ChapterOpening
          roman={chapters.contact.roman}
          title={chapters.contact.title}
          opener={siteContent.contact.microcopy}
          pause
        />
        {siteContent.contact.availability.trim().length > 0 ? (
          <p className="mt-3 font-editorial text-lg italic text-mutedFg">
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
            className="mb-8 h-auto w-28 origin-bottom-left sm:w-36"
          />
          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 text-left font-editorial text-base italic text-mutedFg transition hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span>
              There&apos;s more to me than the résumé — books, paintings, and one
              very opinionated cat.
            </span>
            <span aria-hidden="true" className="text-mutedFg">
              →
            </span>
          </Link>
        </Container>
      </div>
    </>
  );
}
