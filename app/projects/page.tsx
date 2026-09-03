import { ProjectIndex } from "@/components/ProjectList";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { getFeaturedProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getFeaturedProjects();

  return (
    <>
      <Section reveal={false} spacing="compact" containerSize="reading">
        <SectionHeading eyebrow="Projects" title="All Projects" />
      </Section>

      <Section className="pt-2" containerSize="reading">
        <ProjectIndex projects={projects} />
      </Section>
    </>
  );
}
