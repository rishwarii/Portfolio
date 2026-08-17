export function ChatbotArchitecture() {
  return (
    <svg
      viewBox="0 0 960 640"
      role="img"
      aria-label="Healthcare chatbot architecture: a React chat widget sends patient messages through a FastAPI gateway with deterministic rules and FAQ first-pass routing. A crisis-term filter can trigger immediate human handoff. Otherwise a retrieval-augmented LLM generates a grounded response, gated by a confidence threshold; low-confidence responses fall back to human handoff. All paths write to PHI-aware structured logging deployed on Google Cloud Run."
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-mutedFg" />
        </marker>
      </defs>

      {/* ================= LANE LABELS (own row, clear of boxes) ================= */}
      <text x="60" y="40" className="fill-mutedFg" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em" }}>CLIENT</text>
      <text x="60" y="150" className="fill-mutedFg" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em" }}>GATEWAY · ROUTING</text>
      <text x="60" y="300" className="fill-mutedFg" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em" }}>REASONING</text>
      <text x="60" y="470" className="fill-mutedFg" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em" }}>SAFETY · OBSERVABILITY</text>

      {/* ================= CONNECTORS (drawn first, behind boxes) ================= */}
      <g stroke="currentColor" className="text-mutedFg" strokeWidth="1.5" fill="none" markerEnd="url(#ar)" opacity="0.6">
        {/* widget -> gateway */}
        <line x1="180" y1="108" x2="180" y2="162" />
        {/* gateway -> confidence gate */}
        <line x1="180" y1="230" x2="180" y2="312" />
        {/* confidence gate -> LLM */}
        <line x1="180" y1="380" x2="180" y2="590" markerEnd="" opacity="0.001" />
      </g>

      {/* gateway -> crisis filter (right) */}
      <g stroke="currentColor" className="text-mutedFg" strokeWidth="1.5" fill="none" markerEnd="url(#ar)" opacity="0.6">
        <path d="M300 196 H520" />
        {/* crisis filter -> human handoff (up-right) */}
        <path d="M700 196 H760" />
        {/* confidence gate -> human handoff (low-confidence, long L) */}
        <path d="M300 346 H620 V180 H760" opacity="0.55" strokeDasharray="6 4" />
      </g>

      {/* confidence gate -> LLM (clean) */}
      <g stroke="currentColor" className="text-mutedFg" strokeWidth="1.5" fill="none" markerEnd="url(#ar)" opacity="0.6">
        <line x1="180" y1="380" x2="180" y2="418" />
      </g>

      {/* ================= NODES ================= */}

      {/* React Chat Widget */}
      <g>
        <rect x="60" y="52" width="240" height="56" rx="11" className="fill-card stroke-border" strokeWidth="1.5" />
        <text x="180" y="80" textAnchor="middle" className="fill-fg" style={{ fontSize: 15, fontWeight: 600 }}>React Chat Widget</text>
        <text x="180" y="98" textAnchor="middle" className="fill-mutedFg" style={{ fontSize: 11.5 }}>patient-facing · embedded</text>
      </g>

      {/* FastAPI Gateway */}
      <g>
        <rect x="60" y="164" width="240" height="66" rx="11" className="fill-card stroke-border" strokeWidth="1.5" />
        <text x="180" y="192" textAnchor="middle" className="fill-fg" style={{ fontSize: 15, fontWeight: 600 }}>FastAPI Gateway</text>
        <text x="180" y="212" textAnchor="middle" className="fill-mutedFg" style={{ fontSize: 11.5 }}>deterministic rules · FAQ first-pass</text>
      </g>

      {/* Crisis Term Filter (middle-right) */}
      <g>
        <rect x="520" y="164" width="180" height="66" rx="11" className="fill-card stroke-border" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x="610" y="192" textAnchor="middle" className="fill-fg" style={{ fontSize: 14, fontWeight: 600 }}>Crisis Term Filter</text>
        <text x="610" y="212" textAnchor="middle" className="fill-mutedFg" style={{ fontSize: 11 }}>escalation triggers</text>
      </g>

      {/* Human Handoff (accent, top-right) */}
      <g>
        <rect x="760" y="150" width="200" height="60" rx="11" className="fill-accent stroke-accent" fillOpacity="0.13" strokeOpacity="0.55" strokeWidth="1.6" />
        <text x="860" y="176" textAnchor="middle" className="fill-fg" style={{ fontSize: 14, fontWeight: 600 }}>Human Handoff</text>
        <text x="860" y="195" textAnchor="middle" className="fill-mutedFg" style={{ fontSize: 11 }}>low-confidence fallback</text>
      </g>

      {/* Confidence Gate (accent) */}
      <g>
        <rect x="60" y="314" width="240" height="66" rx="11" className="fill-accent stroke-accent" fillOpacity="0.13" strokeOpacity="0.55" strokeWidth="1.6" />
        <text x="180" y="342" textAnchor="middle" className="fill-fg" style={{ fontSize: 15, fontWeight: 600 }}>Confidence Gate</text>
        <text x="180" y="362" textAnchor="middle" className="fill-mutedFg" style={{ fontSize: 11.5 }}>threshold check</text>
      </g>

      {/* Retrieval-Augmented LLM */}
      <g>
        <rect x="60" y="420" width="240" height="66" rx="11" className="fill-card stroke-border" strokeWidth="1.5" />
        <text x="180" y="448" textAnchor="middle" className="fill-fg" style={{ fontSize: 15, fontWeight: 600 }}>Retrieval-Augmented LLM</text>
        <text x="180" y="468" textAnchor="middle" className="fill-mutedFg" style={{ fontSize: 11.5 }}>grounded generation</text>
      </g>

      {/* Logging bar (spans width) */}
      <g>
        <rect x="60" y="500" width="900" height="46" rx="11" className="fill-accent stroke-accent" fillOpacity="0.07" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="7 5" />
        <text x="510" y="528" textAnchor="middle" className="fill-mutedFg" style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.1em" }}>PHI-AWARE STRUCTURED LOGGING · GOOGLE CLOUD RUN · ALL PATHS</text>
      </g>
    </svg>
  );
}