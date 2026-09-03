"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChatbotArchitecture } from "@/components/ChatbotArchitecture";
import { ProjectModal } from "@/components/ProjectModal";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/cn";
import { renderText } from "@/lib/renderText";

type ProjectListProps = {
  projects: Project[];
  className?: string;
  figureStart?: number;
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
    <span className="novel-figure">
      <span className="novel-figure-frame">
        <span className="novel-figure-media">
          {project.diagram ? (
            <ChatbotArchitecture />
          ) : (
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(max-width: 767px) 90vw, 384px"
              className="novel-figure-image"
            />
          )}
        </span>
      </span>
      <span className="novel-figure-caption">
        Figure {figure}. {project.title}
      </span>
    </span>
  );
}

export function ProjectList({
  projects,
  className,
  figureStart = 1
}: ProjectListProps) {
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
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: {
            once: true,
            amount: 0.2,
            margin: "0px 0px -80px 0px"
          },
          transition: { duration: 0.6, delay: index * 0.1, ease: EASE }
        }
      : {};

  return (
    <>
      <ol className={cn("project-grid list-none p-0", className)}>
        {projects.map((project, index) => {
          const summary = renderText(project.summary);

          return (
            <motion.li key={project.slug} className="min-w-0" {...reveal(index)}>
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="group flex h-full w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <span className="block font-novel text-[1.1rem] font-normal tracking-[-0.02em] text-fg transition-colors group-hover:text-accent">
                  {project.title}
                </span>
                <span className="mt-2 line-clamp-2 block font-editorial text-sm leading-relaxed text-mutedFg">
                  {summary.length > 0 ? summary : "Project summary coming soon."}
                </span>
                <ProjectFigure
                  project={project}
                  figure={figureStart + index}
                />
                <span className="mt-3 block font-editorial text-sm italic text-mutedFg transition-colors group-hover:text-accent">
                  Read →
                </span>
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
              <h3 className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg transition-colors group-hover:text-accent sm:text-3xl">
                {index + 1}. {project.title}
              </h3>
              <p className="mt-2 font-editorial text-base leading-relaxed text-mutedFg sm:text-lg">
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
