const STEPS = [
  "Crisis and shortcuts before the model",
  "Hybrid retrieval",
  "Grounded generation",
  "PHI redaction and logging",
  "Signed booking link"
] as const;

const STEP_Y = [40, 112, 184, 256, 328] as const;

export function ChatbotArchitecture({
  className,
  compact = false
}: {
  className?: string;
  compact?: boolean;
}) {
  const fontSize = compact ? 22 : 20;
  const stepY = compact ? [48, 128, 208, 288, 368] : STEP_Y;
  const viewBox = compact ? "0 0 480 416" : "0 0 640 368";
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label="Hope: crisis and shortcuts before the model, then hybrid retrieval, grounded generation, PHI redaction and logging, then a signed booking link."
      className={["hope-architecture h-auto w-full text-fg", className]
        .filter(Boolean)
        .join(" ")}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="28"
        y1="40"
        x2="28"
        y2={compact ? 368 : 328}
        className="stroke-fg"
        strokeWidth="1.25"
      />
      {STEPS.map((label, index) => {
        const y = stepY[index];

        return (
          <g key={label}>
            <circle cx="28" cy={y} r="4.5" className="fill-fg" />
            <text
              x="52"
              y={y + 6}
              className="fill-fg"
              style={{
                fontFamily: "var(--font-newsreader), Georgia, serif",
                fontSize
              }}
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
