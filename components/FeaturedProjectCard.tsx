import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/Badge";
import type { Project } from "@/lib/projects";
import { renderText } from "@/lib/renderText";

type FeaturedProjectCardProps = {
  project: Project;
};

// Larger, full-width featured card: image on one side, text on the other
// (stacked on mobile). Shares the "project" card tokens with the grid cards so
// the section reads as one system.
export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const summary = renderText(project.summary);
  const displaySummary =
    summary.length > 0 ? summary : "Project summary coming soon.";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="project-hover-card group block overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-card text-cardFg shadow-medium transition-[transform,box-shadow,border-color] duration-200 ease-out hover:border-accent/44 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <div className="grid lg:grid-cols-2">
        {/* Fixed aspect-ratio frame + object-cover so image dimensions never
            dictate the card's height. Fills the cell on desktop. */}
        {/* Portrait screenshot: neutral paper pad + object-contain so the whole
            phone screen shows, centered and framed, never cropped or stretched. */}
        <div className="relative aspect-[4/5] overflow-hidden border-b border-border/70 bg-muted/40 lg:aspect-auto lg:min-h-[30rem] lg:border-b-0 lg:border-r">
          <Badge
            variant="accent"
            className="absolute left-3 top-3 z-10 text-[0.55rem]"
          >
            Featured
          </Badge>
          <div className="absolute inset-4 sm:inset-6">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain transition duration-300 group-hover:scale-[1.01]"
              priority
            />
          </div>
          {/* Healthcare-only subtle caption near the image. */}
          <p className="absolute bottom-3 left-3 z-10 rounded-md border border-border/60 bg-card/85 px-2 py-1 font-editorial text-[0.7rem] italic text-mutedFg backdrop-blur-sm">
            Screens shown are non-sensitive by design.
          </p>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <h3 className="font-display text-2xl text-fg sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-prose font-body text-sm text-mutedFg sm:text-base">
            {displaySummary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg/90 transition group-hover:text-fg">
            <span>View project</span>
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
