export const theme = {
  colors: {
    bg: "hsl(var(--bg))",
    fg: "hsl(var(--fg))",
    muted: "hsl(var(--muted))",
    mutedFg: "hsl(var(--muted-fg))",
    card: "hsl(var(--card))",
    border: "hsl(var(--border))",
    primary: "hsl(var(--primary))",
    accent: "hsl(var(--accent))"
  },
  typography: {
    display: "var(--font-display)",
    body: "var(--font-body)",
    label: "ui-monospace"
  }
} as const;
