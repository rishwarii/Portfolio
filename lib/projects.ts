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

export const CASE_STUDY_SECTIONS: {
  key: ProjectSectionKey;
  label: string;
}[] = [
  { key: "overview", label: "Context" },
  { key: "problem", label: "Constraints" },
  { key: "approach", label: "Approach" },
  { key: "architecture", label: "Architecture" },
  { key: "outcomes", label: "Outcomes" },
  { key: "tradeoffs", label: "Tradeoffs" }
];

export function filledSectionParagraphs(paragraphs: string[]): string[] {
  return paragraphs.filter((paragraph) => paragraph.trim().length > 0);
}

export function hasCaseStudy(project: Project): boolean {
  return CASE_STUDY_SECTIONS.some(({ key }) =>
    filledSectionParagraphs(project.sections[key]).length > 0
  );
}

const projects: Project[] = [
  {
    slug: "healthcare-ai-chatbot",
    title: "Patient-facing AI for a psychiatry clinic",
    summary:
      "Clinic assistant with crisis-first routing, PHI redaction, and booking into the live site.",
    tags: [
      "React",
      "FastAPI",
      "LLM Safety"
    ],
    thumbnail: "/images/projects/placeholder-1.svg",
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
      overview: [
        "Built for a psychiatry practice to support prospective and existing patients with booking guidance and common care questions.",
        "The goal was reducing front-desk workload while maintaining reliable responses and safe escalation behavior in a sensitive domain."
      ],
      problem: [
        "Crisis messages required deterministic handling before any generative model could run.",
        "Answers had to stay grounded in clinic information while protecting PHI entered in free text."
      ],
      approach: [
        "Combined TF-IDF keyword retrieval with Gemini embedding search behind deterministic-first routing.",
        "Handled crisis messages and simple shortcuts before generation.",
        "Constrained low-temperature generation to retrieved clinic facts.",
        "Redacted PHI entered accidentally in free-text conversations.",
        "Secured deep-link parameter passing from the chatbot into the main booking site."
      ],
      architecture: [
        "Crisis/shortcut routing → TF-IDF + embedding retrieval → grounded generation → PHI-safe operations"
      ],
      outcomes: [
        "About 60% of submitted ratings are 4–5 stars.",
        "Lower-rated conversations feed targeted routing, FAQ, and call-to-action fixes.",
        "Integrated with the clinic's live booking site."
      ],
      tradeoffs: [
        "Deterministic routing prioritizes safety and consistency over open-ended flexibility.",
        "Grounded generation limits unsupported answers, while requiring continued retrieval-content maintenance."
      ]
    }
  },
  {
    slug: "campuscrew",
    title: "CampusCrew",
    summary:
      "Student community with role-based forums and moderation workflows, so collaboration stays permissioned as it scales.",
    tags: [
      "React",
      "Supabase",
      "Moderation"
    ],
    thumbnail: "/images/projects/campuscrew.png",
    featured: true,
    highlights: [
      {
        text: "Role-based forums so students collaborate with the right permissions as the community grows."
      },
      {
        text: "Moderation workflows for keeping discussion usable, not just open."
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
    featured: false,
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
