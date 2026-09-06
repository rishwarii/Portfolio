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
  liveLabel?: string;
  figureCaption?: string;
  showFigure?: boolean;
  repoLinks?: {
    label: string;
    href: string;
  }[];
  sections: Record<ProjectSectionKey, string[]>;
};

export function projectLiveLabel(project: Project): string {
  return project.liveLabel ?? "Live site";
}

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

export function projectReadHref(project: Project): string | undefined {
  if (hasCaseStudy(project)) {
    return `/projects/${project.slug}`;
  }

  return project.highlights.find((highlight) => highlight.href)?.href;
}

const projects: Project[] = [
  {
    slug: "healthcare-ai-chatbot",
    title: "Hope — patient assistant at Animo Sano Psychiatry",
    summary:
      "Clinic assistant for booking and common questions. Crisis routing before the model, PHI redaction, and booking into the clinic site.",
    tags: [
      "React",
      "FastAPI",
      "Cloud Run"
    ],
    thumbnail: "/images/projects/placeholder-1.svg",
    featured: true,
    showFigure: false,
    liveUrl: "https://animosanopsychiatry.com/",
    liveLabel: "Clinic site",
    figureCaption: "Hope",
    highlights: [
      {
        text: "Crisis messages are handled by rules before any model runs."
      },
      {
        text: "PHI entered in free text is redacted, not only structured fields."
      },
      {
        text: "Booking details pass into the clinic site through a signed deep link."
      },
      {
        text: "Retrieval combines keyword search with Gemini embeddings, then a low-temperature prompt constrained to retrieved clinic facts."
      }
    ],
    sections: {
      overview: [
        "Built Hope for Animo Sano Psychiatry so patients can book appointments and find clinic information from the website.",
        "When a message indicates crisis, rules handle it before any model runs, then the conversation goes to a person."
      ],
      problem: [
        "Crisis messages must be handled by rules before generation.",
        "Answers must stay grounded in clinic information. PHI entered in free text must be redacted."
      ],
      approach: [
        "Crisis messages and simple shortcuts are handled before any generation runs.",
        "Crisis detection uses both pattern matching and a classifier over PHI-redacted text.",
        "Retrieval combines keyword search with Gemini embeddings, then a low-temperature prompt constrained to retrieved clinic facts.",
        "The chatbot redacts PHI entered in free text, not only structured fields.",
        "Booking details pass into the clinic site through a signed deep link."
      ],
      architecture: [
        "Crisis and shortcut routing → keyword plus embedding retrieval → grounded generation → PHI-safe logging and booking"
      ],
      outcomes: [
        "Completed bookings pass from the chat into the clinic site.",
        "Lower-rated conversations inform changes to routing, FAQ content, and booking prompts."
      ],
      tradeoffs: [
        "Handling crisis messages with rules before generation reduces flexibility and improves consistency where it is required.",
        "Grounding answers in clinic facts reduces unsupported replies and requires the retrieved content to stay current."
      ]
    }
  },
  {
    slug: "campuscrew",
    title: "CampusCrew",
    summary:
      "Student community with role-based forums and moderation. I contributed on the React front end and Supabase back end.",
    tags: [
      "React",
      "Supabase"
    ],
    thumbnail: "/images/projects/campuscrew.png",
    featured: true,
    figureCaption: "CampusCrew",
    repoLinks: [
      {
        label: "Front end",
        href: "https://github.com/roh-it/campuscrew-fe"
      },
      {
        label: "Back end",
        href: "https://github.com/roh-it/campuscrew-be"
      }
    ],
    highlights: [
      {
        text: "Role-based forums so students collaborate with the appropriate permissions."
      },
      {
        text: "Moderation workflows for threads that need review."
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
      "Landsat-8 NDVI analysis. Springer chapter, with a U.S. copyright.",
    tags: [
      "Python",
      "Landsat-8"
    ],
    thumbnail: "/images/projects/ndvi.jpg",
    featured: true,
    figureCaption: "NDVI",
    highlights: [
      {
        text: "Python pipeline for vegetation-health scoring from Landsat-8 NDVI."
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
