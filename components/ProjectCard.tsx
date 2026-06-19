import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/cn";
import { renderText } from "@/lib/renderText";

type ProjectCardProps = {
  project: Project;
  className?: string;
  featured?: boolean;
};

export function ProjectCard({
  project,
  className = "",
  featured = false
}: ProjectCardProps) {
  const summary = renderText(project.summary);
  const displaySummary =
    summary.length > 0 ? summary : "Project summary coming soon.";
  const imageSizes = featured
    ? "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 66vw"
    : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw";

  return (
    <Card
      as={Link}
      href={`/projects/${project.slug}`}
      variant="project"
      className={cn(
        "project-hover-card group block p-4 transition-[transform,box-shadow,border-color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:p-5",
        className
      )}
    >
      <div
        className={[
          "relative aspect-[16/10] overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-accent/18 via-accent/8 to-card"
        ].join(" ")}
      >
        {featured ? (
          <Badge
            variant="accent"
            className="absolute left-3 top-3 z-10 text-[0.55rem]"
          >
            Featured
          </Badge>
        ) : null}
        <div
          aria-hidden="true"
          className="absolute inset-x-4 top-4 z-[1] h-px bg-white/45 dark:bg-white/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] bg-gradient-to-b from-white/28 via-transparent to-transparent opacity-75 dark:from-white/12"
        />
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes={imageSizes}
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] rounded-xl border border-white/26 dark:border-white/10"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-xl text-fg sm:text-2xl">{project.title}</h3>
        <p className="mt-2 max-w-prose truncate text-sm text-mutedFg">
          {displaySummary}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fg/90 transition group-hover:text-fg">
        <span>View project</span>
        <ArrowUpRight size={15} aria-hidden="true" className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Card>
  );
}
