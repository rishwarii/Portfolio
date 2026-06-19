export type ProjectSectionKey =
  | "overview"
  | "problem"
  | "approach"
  | "architecture"
  | "outcomes"
  | "tradeoffs";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  thumbnail: string;
  featured: boolean;
  sections: Record<ProjectSectionKey, string[]>;
};

const projects: Project[] = [
  {
    slug: "healthcare-ai-chatbot",
    title: "Healthcare AI Chatbot",
    summary:
      "Patient-facing assistant with reliability guardrails, crisis routing, and production auditability.",
    tags: [
      "React",
      "FastAPI",
      "LLM Safety"
    ],
    thumbnail: "/images/projects/placeholder-1.svg",
    featured: true,
    sections: {
      overview: [""],
      problem: [""],
      approach: [""],
      architecture: [
        "Rules/FAQ -> Retrieval -> Confidence Gate -> LLM -> Audit Logs"
      ],
      outcomes: [""],
      tradeoffs: [""]
    }
  },
  {
    slug: "campuscrew",
    title: "CampusCrew",
    summary:
      "Student community platform with moderation workflows and scalable role-based collaboration features.",
    tags: [
      "React",
      "Supabase",
      "Moderation"
    ],
    thumbnail: "/images/projects/placeholder-2.svg",
    featured: true,
    sections: {
      overview: [""],
      problem: [""],
      approach: [""],
      architecture: [""],
      outcomes: [""],
      tradeoffs: [""]
    }
  },
  {
    slug: "ai-job-tracker",
    title: "AI Job Application Tracker",
    summary:
      "Structured application pipeline with AI-assisted tracking to improve follow-through and interview readiness.",
    tags: [
      "Next.js",
      "Node.js",
      "PostgreSQL"
    ],
    thumbnail: "/images/projects/placeholder-3.svg",
    featured: true,
    sections: {
      overview: [""],
      problem: [""],
      approach: [""],
      architecture: [""],
      outcomes: [""],
      tradeoffs: [""]
    }
  },
  {
    slug: "ndvi-vegetation-health-automation",
    title: "NDVI Vegetation Health Automation",
    summary:
      "Remote sensing workflow that automates NDVI processing for faster vegetation health analysis at scale.",
    tags: [
      "Python",
      "Remote Sensing",
      "Research"
    ],
    thumbnail: "/images/projects/placeholder-4.svg",
    featured: true,
    sections: {
      overview: [""],
      problem: [""],
      approach: [""],
      architecture: [""],
      outcomes: [""],
      tradeoffs: [""]
    }
  }
];

export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(limit = 4): Project[] {
  return projects.filter((project) => project.featured).slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
