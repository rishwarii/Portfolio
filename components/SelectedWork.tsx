"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FeaturedProjectCard } from "@/components/FeaturedProjectCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import type { Project } from "@/lib/projects";

type SelectedWorkProps = {
  featured: Project;
  projects: Project[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function SelectedWork({ featured, projects }: SelectedWorkProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const animate = isMounted && !prefersReducedMotion;

  // Subtle fade/rise on scroll into view, gently staggered top-to-bottom.
  // Static (no motion) before mount or when reduced motion is preferred.
  const reveal = (index: number) =>
    animate
      ? {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: {
            once: true,
            amount: 0.2,
            margin: "0px 0px -80px 0px"
          },
          transition: { duration: 0.5, delay: index * 0.09, ease: EASE }
        }
      : {};

  return (
    <div className="space-y-6">
      <motion.div {...reveal(0)}>
        <FeaturedProjectCard project={featured} onSelect={setActiveProject} />
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div key={project.slug} {...reveal(index + 1)}>
            <ProjectCard
              project={project}
              className="h-full"
              onSelect={setActiveProject}
            />
          </motion.div>
        ))}
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
