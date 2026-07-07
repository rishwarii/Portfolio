export const siteContent = {
  brand: {
    name: "Rishwari Ranjan",
    role: "Full-Stack Engineer building AI-enabled systems with reliability and product thinking."
  },
  hero: {
    oneLiner: "",
    headline: "Rishwari Ranjan",
    roleLine: "Software Engineer, AI Products",
    subheadline:
      "Python + cloud deployments (AWS/GCP), reliability-first systems, and AI workflows with guardrails.",
    stackChips: [
      "Python",
      "AWS",
      "GCP"
    ],
    supportingLine:
      "Shipped production chatbot systems with safety checks, logging, and human handoff.",
    primaryCta: {
      label: "View Projects",
      href: "#projects"
    },
    secondaryCta: {
      label: "Resume",
      href: "/resume"
    }
  },
  proofStrip: [
    {
      metric: "2.5+ Years Experience"
    },
    {
      metric: "End-to-End Systems Built"
    },
    {
      metric: "Real-World AI in Production"
    },
    {
      metric: "AWS Certified (2024)"
    }
  ],
  howIBuild: {
    title: "How I Build",
    description: "Principles I use to ship reliable AI-enabled products.",
    items: [
      {
        title: "Outcome-driven delivery",
        body: "I define success metrics early and ship iteratively to reach measurable user outcomes."
      },
      {
        title: "Production reliability",
        body: "I prioritize observability, safe rollouts, and failure modes so systems hold up under real usage."
      },
      {
        title: "AI UX + guardrails",
        body: "I design workflows that handle uncertainty with confidence checks, fallbacks, and safety constraints."
      },
      {
        title: "Clean, scalable architecture",
        body: "I build modular components and interfaces that make features easier to extend and maintain."
      }
    ]
  },
  featuredCaseStudy: {
    title: "Featured Case Study",
    project: "Production Healthcare AI Chatbot",
    context: "Healthcare | Patient-facing assistant",
    contextNarrative: [
      "Built for a psychiatry practice to support prospective and existing patients with booking guidance and common care questions.",
      "The goal was reducing front-desk workload while maintaining reliable responses and safe escalation behavior in a sensitive domain."
    ],
    constraints: [
      "Safety-sensitive prompts required deterministic handling and explicit escalation paths.",
      "The system needed fast responses in production with operationally light deployment and observability."
    ],
    liveUrl: "https://animosanopsychiatry.com/",
    engineeringDecisions: [
      "Added deterministic first-pass routing to reduce hallucination risk and improve response consistency.",
      "Used confidence thresholds with human handoff fallback to keep uncertain responses out of user-facing flows.",
      "Implemented PHI-aware structured logging to speed incident review and improve observability.",
      "Designed modular service boundaries so retrieval and model providers can be swapped with low refactor overhead."
    ],
    impact: [
      "500+ users/month",
      "30% bookings via chatbot",
      "Deployed on Google Cloud Run"
    ],
    architectureFlow: [
      "Frontend",
      "API",
      "LLM",
      "Guardrails",
      "Logging"
    ],
    techStack: [
      "Frontend: React",
      "Backend: FastAPI",
      "Deploy: Google Cloud Run",
      "CI/CD: Cloud Build",
      "Logging: Pub/Sub",
      "Model: Gemini 2.5 Flash"
    ],
    tradeoffs: [
      "Deterministic routing improved reliability, but reduced flexibility for ambiguous user phrasing.",
      "Strict confidence thresholds lowered unsafe outputs, while increasing fallback frequency in edge cases."
    ],
    futureImprovements: [
      "Global rate limiting across upstream services",
      "Automated evaluation pipeline for LLM quality"
    ]
  },
  experience: [
    {
      id: "animo-sano",
      company: "Animo Sano Psychiatry",
      title: "Software Developer",
      date: "Jul 2025–Present",
      location: "North Carolina, USA",
      isCurrent: true,
      highlights: [
        "Led end-to-end delivery of a patient-facing AI assistant now used by 500+ people a month, turning staff feedback into shipped features.",
        "Built the reliability layer — deterministic routing, confidence checks, human-handoff escalation — that keeps responses safe in a clinical setting.",
        "Set up PHI-aware logging and incident review so the system stays observable and auditable in production."
      ]
    },
    {
      id: "nagarro",
      company: "Nagarro",
      title: "Associate Software Engineer",
      date: "Jan 2022–Aug 2023",
      location: "Gurgaon, India",
      isCurrent: false,
      highlights: [
        "Built React + Redux modules for enterprise asset-tracking dashboards, shipping features on a bi-weekly Agile cadence.",
        "Implemented JWT auth and role-based access that cut access-related defects across releases."
      ]
    },
    {
      id: "purdue-gta",
      company: "Purdue University",
      title: "Graduate Teaching Assistant",
      date: "Aug 2024–May 2025",
      location: "",
      isCurrent: false,
      highlights: [
        "Taught CS161 labs (Java, OOP, data structures) to 40+ students, and built lightweight grading workflows that sped up feedback."
      ]
    }
  ],
  educationResearch: {
    title: "Education + Research",
    items: [
      {
        title: "Purdue University",
        subtitle: "M.S. Computer Science (2023-2025)",
        date: "Purdue University",
        gpa: "4.0/4.0",
        courseTags: [
          "Distributed Systems",
          "Machine Learning",
          "Cloud Computing"
        ],
        points: [
          "Graduate Teaching Assistant (CS161)"
        ]
      },
      {
        title: "NDVI Vegetation Health Automation",
        subtitle: "Research Project",
        date: "Published Work",
        courseTags: [
          "Remote Sensing",
          "Geospatial Workflows"
        ],
        points: [
          "Automated Landsat-8 NDVI processing workflow.",
          "Paper link available on Springer."
        ],
        link: "https://link.springer.com/chapter/10.1007/978-981-16-8403-6_32"
      }
    ]
  },
  contact: {
    title: "Let's Connect",
    microcopy: "Open to Software Engineer roles (AI products).",
    availability: "Actively interviewing.",
    email: "rishwari.connect@gmail.com",
    linkedin: "https://www.linkedin.com/in/rishwari/",
    github: "https://github.com/rishwarii",
    resume: ""
  },
  blog: {
    title: "Blog",
    description: "Short writing on architecture, reliability, and product systems.",
    posts: [
      {
        slug: "placeholder-post",
        title: "",
        date: "",
        summary: ""
      }
    ]
  }
} as const;

export type SiteContent = typeof siteContent;
