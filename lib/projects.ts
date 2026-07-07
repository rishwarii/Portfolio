export type ProjectSectionKey =
  | "overview"
  | "problem"
  | "approach"
  | "architecture"
  | "outcomes"
  | "tradeoffs";

// A highlight bullet; when `href` is set it renders as an external link
// (e.g. NDVI's published Springer paper).
export type ProjectHighlight = {
  text: string;
  href?: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  thumbnail: string;
  featured: boolean;
  // Concise modal highlights. Empty array => no highlights block (e.g. the
  // placeholder Job Tracker project).
  highlights: ProjectHighlight[];
  // Optional live product URL. Only projects with a real deployment set this.
  liveUrl?: string;
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
    thumbnail: "/images/projects/chatbot2.png",
    featured: true,
    liveUrl: "https://animosanopsychiatry.com/",
    highlights: [
      {
        text: "Deterministic first-pass routing to reduce hallucination risk and keep responses consistent."
      },
      {
        text: "Confidence thresholds with human-handoff fallback so uncertain answers stay out of user-facing flows."
      },
      {
        text: "PHI-aware structured logging for fast incident review and production observability."
      },
      {
        text: "500+ users/month with ~30% of bookings via the assistant; deployed on Google Cloud Run."
      }
    ],
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
    thumbnail: "/images/projects/campuscrew.png",
    featured: true,
    highlights: [
      {
        text: "Student community platform for collaboration and discussion."
      },
      {
        text: "Moderation workflows to keep community content safe."
      },
      {
        text: "Role-based access for scalable, permissioned collaboration."
      },
      {
        text: "Built with React and Supabase."
      }
    ],
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
    // Placeholder project — no highlights manufactured (Option C).
    highlights: [],
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
    thumbnail: "/images/projects/ndvi.jpg",
    featured: true,
    highlights: [
      {
        text: "Automated Landsat-8 NDVI processing workflow."
      },
      {
        text: "Faster vegetation-health analysis at scale."
      },
      {
        text: "Published research — read the paper on Springer.",
        href: "https://link.springer.com/chapter/10.1007/978-981-16-8403-6_32"
      }
    ],
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
