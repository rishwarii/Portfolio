import { ProjectList } from "@/components/ProjectList";
import type { Project } from "@/lib/projects";

type SelectedWorkProps = {
  featured: Project;
  projects: Project[];
};

export function SelectedWork({ featured, projects }: SelectedWorkProps) {
  return <ProjectList projects={[featured, ...projects]} />;
}
