export const siteContent = {
  brand: {
    name: "Rishwari Ranjan",
    role: "I build production software, currently in healthcare."
  },
  hero: {
    halfTitle: "A Portfolio",
    eyebrow: "Software Engineer",
    headline: "Rishwari Ranjan",
    location: "Chicago, IL",
    roles: "Software Engineer",
    status: "",
    intro:
      "I build production software, currently in healthcare.",
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
      opener: "",
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
      title: "Contact"
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
    project: "Hope — patient assistant at Animo Sano Psychiatry",
    context: "Animo Sano Psychiatry",
    homepageLead:
      "At Animo Sano I built Hope, the clinic’s patient assistant, and most of a multi-tenant EHR: eligibility, claims, and e-prescribing.",
    homepageProof:
      "Crisis messages are handled by rules before any model runs. Booking details pass into the clinic site through a signed deep link.",
    contextNarrative: [
      "Built Hope for Animo Sano Psychiatry so patients can book appointments and find clinic information from the website.",
      "When a message indicates crisis, rules handle it before any model runs, then the conversation goes to a person."
    ],
    constraints: [
      "Crisis messages must be handled by rules before generation.",
      "Answers must stay grounded in clinic information. PHI entered in free text must be redacted."
    ],
    liveUrl: "https://animosanopsychiatry.com/",
    engineeringDecisions: [
      "Crisis messages and simple shortcuts are handled before any generation runs.",
      "Crisis detection uses both pattern matching and a classifier over PHI-redacted text.",
      "Retrieval combines keyword search with Gemini embeddings, then a low-temperature prompt constrained to retrieved clinic facts.",
      "The chatbot redacts PHI entered in free text, not only structured fields.",
      "Booking details pass into the clinic site through a signed deep link."
    ],
    impact: [
      "Crisis messages are handled by rules before any model runs",
      "PHI entered in free text is redacted, not only structured fields",
      "Booking details pass into the clinic site through a signed deep link"
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
      "Handling crisis messages with rules before generation reduces flexibility and improves consistency where it is required.",
      "Grounding answers in clinic facts reduces unsupported replies and requires the retrieved content to stay current."
    ],
    futureImprovements: [
      "Global rate limiting across upstream services",
      "Automated evaluation pipeline for LLM quality"
    ],
    proofPoints: [
      "Crisis messages are handled by rules before any model runs.",
      "PHI entered in free text is redacted, not only structured fields.",
      "Booking details pass into the clinic site through a signed deep link."
    ]
  },
  experience: [
    {
      id: "animo-sano",
      company: "Animo Sano Psychiatry",
      logo: "/logos/animo-sano-psychiatry.png",
      companyUrl: "https://animosanopsychiatry.com/",
      title: "Software Engineer",
      date: "Jul 2025 – Present",
      location: "Remote — Raleigh, NC",
      isCurrent: true,
      overview:
        "Built Hope from scratch and most of a multi-tenant EHR, including eligibility, claims, and e-prescribing.",
      highlights: [
        "Designed and built Hope end to end. Crisis messages and simple shortcuts are handled before generation. Retrieval uses keyword search and Gemini embeddings, then a low-temperature prompt constrained to retrieved clinic facts.",
        "Redacts PHI entered in free text, not only structured fields, and passes booking details into the clinic site through a signed deep link.",
        "Diagnosed and fixed a race condition spanning the chatbot and the internal booking website.",
        "Designed a multi-tenant EHR and wrote most of the implementation: payer eligibility (270/271) into appointment-clearance, Stedi claims and remittance, and DoseSpot e-prescribing.",
        "Introduced structured feedback collection. Lower-rated conversations inform changes to routing, FAQ content, and booking prompts."
      ],
      projects: []
    },
    {
      id: "nagarro",
      company: "Nagarro",
      logo: "/logos/nagarro.svg",
      companyUrl: "https://www.nagarro.com/",
      title: "Associate Software Engineer",
      date: "Jan 2022 – Aug 2023",
      location: "Gurgaon, India",
      isCurrent: false,
      overview:
        "Front-end engineer on two live-tracking products for Austrian clients: a shared-mobility Leaflet map refreshed every ten seconds over WebSockets, and a fleet dashboard covering 55 vehicles.",
      highlights: [
        "Worked with business analysts to turn operational requirements into tracking and analytics interfaces."
      ],
      projects: [
        {
          title: "Shared Mobility Accelerator",
          href: "https://www.nagarro.com/en/industries/automotive/shared-mobility-accelerator",
          context: "Automotive client · EU",
          highlights: [
            "Built the front end for a shared-mobility tracking platform: live IoT location and status on a Leaflet map, refreshed every 10 seconds over WebSockets.",
            "Implemented in React, Redux Thunk, Node.js, and Leaflet."
          ]
        },
        {
          title: "Shipment tracking dashboard",
          href: "",
          context: "Private logistics client",
          highlights: [
            "Built the front end, with supporting backend work, for a live fleet dashboard covering 55 vehicles, with filters by region, vehicle number, and origin or destination.",
            "Implemented ETA calculation and live location from streamed IoT data on intercity and intra-city routes."
          ]
        }
      ]
    }
  ],
  educationResearch: {
    title: "Education",
    credentials: "",
    items: [
      {
        title: "Purdue University",
        subtitle: "M.S. Computer Science (Aug 2023 – May 2025)",
        date: "Aug 2023 – May 2025",
        gpa: "4.0/4.0",
        courseTags: [
          "Distributed Systems",
          "Machine Learning",
          "Cloud Computing"
        ],
        credential: "AWS Certified Cloud Practitioner (2024)",
        href: "",
        points: [
          "Graduate teaching assistant: Java and data structures, 40+ students."
        ]
      }
    ]
  },
  contact: {
    title: "Contact",
    microcopy: "I build production software, currently in healthcare.",
    availability: "",
    emailNote: "Email is the fastest way to reach me.",
    email: "rishwari.connect@gmail.com",
    linkedin: "https://www.linkedin.com/in/rishwari/",
    github: "https://github.com/rishwarii",
    resume: "/resume"
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
