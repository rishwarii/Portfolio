"use client";

import { useEffect, useState } from "react";
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
  "group w-full py-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

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
      <ul className={cn("w-full", className)}>
        {projects.map((project, index) => {
          const summary = renderText(project.summary);
          const isLast = index === projects.length - 1;

          return (
            <motion.li
              key={project.slug}
              {...reveal(index)}
              className={isLast ? "" : "border-b border-border"}
            >
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className={entryClassName}
              >
                <h3 className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-border sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-3xl font-editorial text-lg leading-relaxed text-mutedFg">
                  {summary.length > 0 ? summary : "Project summary coming soon."}
                </p>
              </button>
            </motion.li>
          );
        })}
      </ul>

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
    <ul className="w-full">
      {projects.map((project, index) => {
        const summary = renderText(project.summary);
        const isLast = index === projects.length - 1;

        return (
          <li
            key={project.slug}
            className={isLast ? "" : "border-b border-border"}
          >
            <Link href={`/projects/${project.slug}`} className={entryClassName}>
              <h3 className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-border sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 max-w-3xl font-editorial text-lg leading-relaxed text-mutedFg">
                {summary.length > 0 ? summary : "Project summary coming soon."}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
