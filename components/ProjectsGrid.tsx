import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/projects";

type ProjectsGridProps = {
  projects: Project[];
  promoteFeatured?: boolean;
};

export function ProjectsGrid({
  projects,
  promoteFeatured = false
}: ProjectsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          featured={promoteFeatured && index === 0}
          className={promoteFeatured && index === 0 ? "md:col-span-2" : ""}
        />
      ))}
    </div>
  );
}
