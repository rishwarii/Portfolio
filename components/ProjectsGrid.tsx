import { ProjectIndex } from "@/components/ProjectList";
import type { Project } from "@/lib/projects";

type ProjectsGridProps = {
  projects: Project[];
  promoteFeatured?: boolean;
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return <ProjectIndex projects={projects} />;
}
