export const siteContent = {
  brand: {
    name: "Rishwari Ranjan",
    role: "Full-Stack Engineer building AI-enabled systems with reliability and product thinking."
  },
  hero: {
    halfTitle: "A Portfolio",
    eyebrow: "Software Engineer — Applied AI",
    headline: "Rishwari Ranjan",
    subheadline: "The system underneath, and the AI on top.",
    intro:
      "Software engineer at a psychiatry practice, building both the AI patients talk to and the record systems underneath it.",
    primaryCta: {
      label: "View Work",
      href: "#projects"
    },
    secondaryCta: {
      label: "Resume",
      href: "/resume"
    }
  },
  chapters: {
    projects: {
      roman: "I",
      title: "Selected Work",
      opener:
        "End-to-end systems: the interface people touch, the record underneath, and the AI in between."
    },
    experience: {
      roman: "II",
      title: "Experience"
    },
    education: {
      roman: "III",
      title: "Education"
    },
    contact: {
      roman: "IV",
      title: "Let's Connect"
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
  featuredCaseStudy: {
    title: "Featured Case Study",
    project: "Production Healthcare AI Chatbot",
    context: "Healthcare | Patient-facing assistant",
    contextNarrative: [
      "Built for a psychiatry practice to support prospective and existing patients with booking guidance and common care questions.",
      "The goal was reducing front-desk workload while maintaining reliable responses and safe escalation behavior in a sensitive domain."
    ],
    constraints: [
      "Crisis messages required deterministic handling before any generative model could run.",
      "Answers had to stay grounded in clinic information while protecting PHI entered in free text."
    ],
    liveUrl: "https://animosanopsychiatry.com/",
    engineeringDecisions: [
      "Combined TF-IDF keyword retrieval with Gemini embedding search behind deterministic-first routing.",
      "Handled crisis messages and simple shortcuts before generation.",
      "Constrained low-temperature generation to retrieved clinic facts.",
      "Redacted PHI entered accidentally in free-text conversations.",
      "Secured deep-link parameter passing from the chatbot into the main booking site."
    ],
    impact: [
      "60% of submitted ratings are 4–5 stars",
      "Lower-rated conversations feed targeted routing, FAQ, and call-to-action fixes",
      "Production booking integration"
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
      "Deterministic routing prioritizes safety and consistency over open-ended flexibility.",
      "Grounded generation limits unsupported answers, while requiring continued retrieval-content maintenance."
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
      title: "Software Engineer",
      date: "Jul 2025–Present",
      location: "North Carolina, USA",
      isCurrent: true,
      overview:
        "Built the patient-facing AI chatbot from scratch, and co-architected the practice's multi-tenant EHR.",
      highlights: [
        "Designed and built a production RAG chatbot end-to-end, combining TF-IDF keyword retrieval with Gemini embedding search behind deterministic-first routing. Crisis messages and simple shortcuts are handled before generation; grounded, low-temperature prompts constrain answers to retrieved clinic facts.",
        "Built redaction for PHI entered accidentally in free-text conversations, not only structured fields, and secured deep-link parameter passing from the chatbot into the main booking site.",
        "Diagnosed and fixed a race condition spanning the chatbot and the internal booking website.",
        "Co-architected the EHR's microservice, multi-tenant architecture and delivered the majority of its implementation.",
        "Managed integrations with Stedi for claims and eligibility and DoseSpot for e-prescribing.",
        "Introduced structured feedback collection to guide iteration. About 60% of submitted ratings are 4–5 stars; lower-rated interactions drive targeted routing, FAQ, and call-to-action fixes."
      ],
      projects: []
    },
    {
      id: "nagarro",
      company: "Nagarro",
      title: "SDE / Front-End Engineer",
      date: "Jan 2022–Aug 2023",
      location: "Gurgaon, India",
      isCurrent: false,
      overview:
        "Front-end SDE on two live-tracking products for Austria-based clients.",
      highlights: [
        "Worked directly with business analysts to translate operational requirements into tracking and analytics interfaces."
      ],
      projects: [
        {
          title: "Shared mobility platform",
          context: "Automotive client · EU",
          highlights: [
            "Built the front end for a shared-mobility vehicle tracking platform, rendering live IoT location and status data on an interactive Leaflet map refreshed every 10 seconds via WebSockets.",
            "Delivered the interface with React, Redux Thunk, Node.js, and Leaflet."
          ]
        },
        {
          title: "Shipment tracking dashboard",
          context: "Private logistics client",
          highlights: [
            "Built the front end, with supporting backend work, for a live fleet dashboard covering 55 vehicles and filtering by region, vehicle number, and origin/destination.",
            "Implemented ETA calculation and live location tracking from streamed IoT data across intercity and intra-city delivery routes."
          ]
        }
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
        points: []
      }
    ]
  },
  contact: {
    title: "Let's Connect",
    microcopy: "If you're hiring or collaborating, I'm happy to connect.",
    availability: "Open to AI Engineer, Software Engineer, and Full-Stack roles.",
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
