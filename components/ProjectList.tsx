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

function ProjectFigure({
  project,
  figure
}: {
  project: Project;
  figure: number;
}) {
  return (
    <span className="novel-figure block">
      <span className="novel-figure-frame block">
        <Image
          src={project.thumbnail}
          alt=""
          fill
          sizes="560px"
          className="object-cover"
        />
      </span>
      <span className="mt-2 block text-center font-editorial text-sm italic text-mutedFg">
        Figure {figure}. {project.title}
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
                className="group w-full py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <span className="block font-novel text-xl font-normal tracking-[-0.02em] text-fg transition-colors group-hover:text-accent sm:text-2xl">
                  {index + 1}. {project.title}
                </span>
                <span className="mt-2 block font-editorial text-sm leading-relaxed text-mutedFg sm:text-base">
                  {summary.length > 0 ? summary : "Project summary coming soon."}
                </span>
                <ProjectFigure project={project} figure={index + 1} />
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
            <Link
              href={`/projects/${project.slug}`}
              className="group block py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <h3 className="font-novel text-xl font-normal tracking-[-0.02em] text-fg transition-colors group-hover:text-accent sm:text-2xl">
                {index + 1}. {project.title}
              </h3>
              <p className="mt-2 font-editorial text-sm leading-relaxed text-mutedFg sm:text-base">
                {summary.length > 0 ? summary : "Project summary coming soon."}
              </p>
              <ProjectFigure project={project} figure={index + 1} />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
