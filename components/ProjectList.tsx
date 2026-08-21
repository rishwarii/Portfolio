"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ProjectModal } from "@/components/ProjectModal";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/cn";
import { renderText } from "@/lib/renderText";

type ProjectListProps = {
  projects: Project[];
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const entryClassName =
  "group flex w-full items-start gap-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

function ProjectThumb({
  project,
  figure
}: {
  project: Project;
  figure: number;
}) {
  return (
    <span className="figure-plate mt-0.5 hidden w-[9.5rem] shrink-0 sm:block">
      <span className="relative block aspect-[4/3] overflow-hidden bg-muted/20">
        <Image
          src={project.thumbnail}
          alt=""
          fill
          sizes="152px"
          className="object-cover"
        />
      </span>
      <span className="mt-1.5 block text-center font-editorial text-[0.65rem] italic text-mutedFg">
        Fig. {figure}
      </span>
    </span>
  );
}

export function ProjectList({ projects, className }: ProjectListProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const animate = isMounted && !prefersReducedMotion;

  const reveal = (index: number) =>
    animate
      ? {
          initial: { opacity: 0, y: 8 },
          whileInView: { opacity: 1, y: 0 },
          viewport: {
            once: true,
            amount: 0.2,
            margin: "0px 0px -80px 0px"
          },
          transition: { duration: 0.5, delay: index * 0.08, ease: EASE }
        }
      : {};

  return (
    <>
      <ol className={cn("w-full", className)}>
        {projects.map((project, index) => {
          const summary = renderText(project.summary);

          return (
            <motion.li key={project.slug} {...reveal(index)}>
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className={entryClassName}
              >
                <span className="w-5 shrink-0 pt-0.5 font-editorial text-sm text-mutedFg">
                  {index + 1}.
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-novel text-xl font-normal tracking-[-0.02em] text-fg transition-colors group-hover:text-accent sm:text-2xl">
                    {project.title}
                  </span>
                  <span className="mt-1 block font-editorial text-sm leading-relaxed text-mutedFg sm:text-base">
                    {summary.length > 0 ? summary : "Project summary coming soon."}
                  </span>
                </span>
                <ProjectThumb project={project} figure={index + 1} />
              </button>
            </motion.li>
          );
        })}
      </ol>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}

type ProjectIndexProps = {
  projects: Project[];
};

export function ProjectIndex({ projects }: ProjectIndexProps) {
  return (
    <ol className="w-full">
      {projects.map((project, index) => {
        const summary = renderText(project.summary);

        return (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`} className={entryClassName}>
              <span className="w-5 shrink-0 pt-0.5 font-editorial text-sm text-mutedFg">
                {index + 1}.
              </span>
              <span className="min-w-0 flex-1">
                <h3 className="font-novel text-xl font-normal tracking-[-0.02em] text-fg transition-colors group-hover:text-accent sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 font-editorial text-sm leading-relaxed text-mutedFg sm:text-base">
                  {summary.length > 0 ? summary : "Project summary coming soon."}
                </p>
              </span>
              <ProjectThumb project={project} figure={index + 1} />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
