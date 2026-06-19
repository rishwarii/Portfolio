import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { getProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <Section reveal={false} spacing="compact">
        <SectionHeading eyebrow="Projects" title="All Projects" />
      </Section>

      <Section className="pt-2">
        <ProjectsGrid projects={projects} />
      </Section>
    </>
  );
}
