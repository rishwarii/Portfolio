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
  diagram?: boolean;
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
    title: "Production Healthcare AI Chatbot",
    summary:
      "Patient-facing RAG assistant with deterministic crisis routing, free-text PHI redaction, and booking integration.",
    tags: [
      "React",
      "FastAPI",
      "LLM Safety"
    ],
    thumbnail: "/images/projects/chatbot.png",
    diagram: true,
    featured: true,
    liveUrl: "https://animosanopsychiatry.com/",
    highlights: [
      {
        text: "Combines TF-IDF keyword retrieval with Gemini embedding search behind a deterministic-first routing pipeline."
      },
      {
        text: "Handles crisis messages before generation runs, while grounded, low-temperature prompting limits answers to retrieved clinic facts."
      },
      {
        text: "Redacts PHI entered accidentally in free-text conversations and securely carries booking details into the main booking site."
      },
      {
        text: "About 60% of submitted ratings are 4–5 stars; structured feedback drives targeted fixes to lower-rated interactions."
      }
    ],
    sections: {
      overview: [""],
      problem: [""],
      approach: [""],
      architecture: [
        "Crisis/shortcut routing -> TF-IDF + embedding retrieval -> grounded generation -> PHI-safe operations"
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
    thumbnail: "/images/projects/jobtracker.jpg",
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
      "Landsat-8 NDVI workflow, published in Springer, with a U.S. copyright registration.",
    tags: [
      "Python",
      "Remote Sensing",
      "Research"
    ],
    thumbnail: "/images/projects/ndvi.jpg",
    featured: true,
    highlights: [
      {
        text: "Automated Landsat-8 NDVI processing for vegetation-health analysis."
      },
      {
        text: "Published as a Springer book chapter.",
        href: "https://link.springer.com/chapter/10.1007/978-981-16-8403-6_32"
      },
      {
        text: "U.S. copyright registration for the processing workflow."
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
