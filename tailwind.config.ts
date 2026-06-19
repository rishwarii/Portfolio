import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.mdx"
  ],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg) / <alpha-value>)",
        fg: "hsl(var(--fg) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        mutedFg: "hsl(var(--muted-fg) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        cardFg: "hsl(var(--card-fg) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        primaryFg: "hsl(var(--primary-fg) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        accentFg: "hsl(var(--accent-fg) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        blush: "hsl(var(--bg) / <alpha-value>)",
        lavender: "hsl(var(--accent) / <alpha-value>)",
        plum: "hsl(var(--fg) / <alpha-value>)",
        plumSoft: "hsl(var(--muted-fg) / <alpha-value>)",
        line: "hsl(var(--border) / <alpha-value>)"
      },
      fontFamily: {
        sans: [
          "var(--font-body)"
        ],
        display: [
          "var(--font-display)"
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace"
        ]
      },
      maxWidth: {
        hero: "64rem",
        content: "72rem"
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)"
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
        feature: "var(--shadow-feature)"
      }
    }
  },
  plugins: []
};

export default config;
