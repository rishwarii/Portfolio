import { Bot, Layers, ShieldCheck, Target } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { ContactCard } from "@/components/ContactCard";
import { ExternalLink } from "@/components/ExternalLink";
import { FeaturedCaseStudy } from "@/components/FeaturedCaseStudy";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionReadingCompanion } from "@/components/SectionReadingCompanion";
import { SelectedWork } from "@/components/SelectedWork";
import { Timeline } from "@/components/Timeline";
import { getProjects, type Project } from "@/lib/projects";
import { siteContent } from "@/lib/siteContent";

export default function HomePage() {
  const projects = getProjects();
  const projectBySlug = (slug: string) =>
    projects.find((project) => project.slug === slug);
  const featuredProject = projectBySlug("healthcare-ai-chatbot") ?? projects[0];
  // Grid order: CampusCrew · NDVI Automation · AI Job Tracker.
  const gridProjects = [
    "campuscrew",
    "ndvi-vegetation-health-automation",
    "ai-job-tracker"
  ]
    .map(projectBySlug)
    .filter((project): project is Project => Boolean(project));
  const [educationItem] = siteContent.educationResearch.items;
  const buildIcons = [
    Target,
    ShieldCheck,
    Bot,
    Layers
  ];

  return (
    <>
      <Hero />
      <SectionReadingCompanion />

      {/* <Section
        id="featured-case-study"
        className="section-divider pt-16 sm:pt-20"
        aura="left"
      >
        <SectionHeading
          eyebrow="Featured Case Study"
          title={siteContent.featuredCaseStudy.project}
          description={siteContent.featuredCaseStudy.context}
        />
        <div className="mt-14">
          <FeaturedCaseStudy />
        </div>
      </Section> */}

      <Section id="projects" className="section-divider" aura="right">
        <SectionHeading eyebrow="Selected Work" title="Selected Projects" />
        <div className="mt-16">
          <SelectedWork featured={featuredProject} projects={gridProjects} />
        </div>
      </Section>

      <Section id="how-i-build" className="section-divider" aura="left">
        <SectionHeading
          title={siteContent.howIBuild.title}
          description={siteContent.howIBuild.description}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {siteContent.howIBuild.items.map((item, index) => {
            const Icon = buildIcons[index] ?? Target;

            return (
              <Card key={item.title} variant="subtle" className="p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/72 bg-card/78 text-mutedFg">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg text-fg">{item.title}</h3>
                    <p className="mt-2 text-sm text-mutedFg sm:text-base">{item.body}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section id="experience" className="section-divider" aura="right">
        <SectionHeading eyebrow="Experience" title="Experience" />
        <div className="mt-14">
          <Timeline />
        </div>
      </Section>

      <Section id="education" className="section-divider" aura="left">
     <SectionHeading
  eyebrow="Education"
  title="Education"
/>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card variant="default">
            <h3 className="text-[1.65rem] font-semibold tracking-[-0.02em] text-fg">
              {educationItem.title}
            </h3>
            <p className="mt-1 text-base font-medium text-fg">{educationItem.subtitle}</p>
            <p className="mt-2 text-[0.68rem] uppercase tracking-[0.14em] text-mutedFg">
              {educationItem.date}
            </p>
            {"gpa" in educationItem && educationItem.gpa ? (
              <p className="mt-3 text-sm font-medium text-fg">GPA: {educationItem.gpa}</p>
            ) : null}
            {"courseTags" in educationItem && educationItem.courseTags ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {educationItem.courseTags.map((course) => (
                  <span
                    key={course}
                    className="rounded-md border border-border/74 bg-card/20 px-2 py-1 text-[0.64rem] font-medium text-mutedFg"
                  >
                    {course}
                  </span>
                ))}
              </div>
            ) : null}
            <ul className="mt-4 space-y-2 text-sm text-mutedFg sm:text-base">
              {educationItem.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Card>

          {/* <Card variant="default">
            <h3 className="text-2xl text-fg">{researchItem.title}</h3>
            <p className="mt-1 text-base text-mutedFg">{researchItem.subtitle}</p>
            <p className="mt-2 text-[0.68rem] uppercase tracking-[0.14em] text-mutedFg">
              {researchItem.date}
            </p>
            {"courseTags" in researchItem && researchItem.courseTags ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {researchItem.courseTags.map((course) => (
                  <span
                    key={course}
                    className="rounded-md border border-border/74 bg-card/20 px-2 py-1 text-[0.64rem] font-medium text-mutedFg"
                  >
                    {course}
                  </span>
                ))}
              </div>
            ) : null}
            <ul className="mt-4 space-y-2 text-sm text-mutedFg sm:text-base">
              {researchItem.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            {"link" in researchItem && researchItem.link ? (
              <ExternalLink href={researchItem.link} className="mt-5 font-semibold">
                View publication
              </ExternalLink>
            ) : null}
          </Card> */}
        </div>
      </Section>

      <Section id="contact" className="section-divider" aura="right">
        <SectionHeading
          title="Let's Build Something Real"
          description="If you're hiring or collaborating, I'm happy to connect."
        />
        <div className="mt-14">
          <ContactCard />
        </div>
      </Section>

      <div className="pb-16 pt-4 text-center sm:pb-20">
        <Link
          href="/about"
          className="group inline-flex items-center gap-1.5 font-editorial text-sm italic text-mutedFg transition hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
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
