export function ChatbotArchitecture() {
  return (
    <svg
      viewBox="0 0 800 500"
      role="img"
      aria-label="Healthcare chatbot architecture: user query flows through a deterministic router and confidence gate to the LLM, with low-confidence queries routed to human handoff, and all paths writing to PHI-aware logging."
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-mutedFg" />
        </marker>
      </defs>

      {/* connectors */}
      <g
        className="stroke-mutedFg/50"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrow)"
      >
        <line x1="150" y1="90" x2="150" y2="150" />
        <line x1="150" y1="220" x2="150" y2="280" />
        <line x1="150" y1="350" x2="150" y2="410" />
        {/* confidence gate -> human handoff (branch right) */}
        <path d="M 250 315 H 470 V 200 H 560" />
        {/* all-paths -> logging (from LLM down to logging bar) */}
        <line x1="150" y1="480" x2="150" y2="455" markerEnd="" />
      </g>

      {/* nodes */}
      {[
        { y: 40, label: "User Query", sub: "patient message", accent: false },
        { y: 165, label: "Deterministic Router", sub: "rules / FAQ first-pass", accent: false },
        { y: 295, label: "Confidence Gate", sub: "threshold check", accent: true },
        { y: 425, label: "LLM Response", sub: "retrieval-augmented", accent: false }
      ].map((n) => (
        <g key={n.label}>
          <rect
            x="30"
            y={n.y}
            width="240"
            height="60"
            rx="10"
            className={
              n.accent
                ? "fill-accent/12 stroke-accent/60"
                : "fill-card stroke-border"
            }
            strokeWidth="1.5"
          />
          <text
            x="150"
            y={n.y + 26}
            textAnchor="middle"
            className="fill-fg"
            style={{ fontSize: "15px", fontWeight: 600 }}
          >
            {n.label}
          </text>
          <text
            x="150"
            y={n.y + 45}
            textAnchor="middle"
            className="fill-mutedFg"
            style={{ fontSize: "11px" }}
          >
            {n.sub}
          </text>
        </g>
      ))}

      {/* human handoff (branch node) */}
      <g>
        <rect
          x="560"
          y="170"
          width="210"
          height="60"
          rx="10"
          className="fill-accent/12 stroke-accent/60"
          strokeWidth="1.5"
        />
        <text
          x="665"
          y="196"
          textAnchor="middle"
          className="fill-fg"
          style={{ fontSize: "15px", fontWeight: 600 }}
        >
          Human Handoff
        </text>
        <text
          x="665"
          y="215"
          textAnchor="middle"
          className="fill-mutedFg"
          style={{ fontSize: "11px" }}
        >
          low-confidence fallback
        </text>
      </g>

      {/* PHI-aware logging bar (spans bottom) */}
      <g>
        <rect
          x="30"
          y="455"
          width="740"
          height="34"
          rx="8"
          className="fill-mutedFg/8 stroke-border"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <text
          x="400"
          y="477"
          textAnchor="middle"
          className="fill-mutedFg"
          style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em" }}
        >
          PHI-AWARE STRUCTURED LOGGING · ALL PATHS
        </text>
      </g>
    </svg>
  );
}