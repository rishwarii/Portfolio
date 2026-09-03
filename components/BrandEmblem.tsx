export function BrandEmblem() {
  return (
    <svg
      className="brand-emblem"
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer quiet boundary */}
      <circle
        cx="12"
        cy="12"
        r="10.35"
        stroke="currentColor"
        strokeWidth="0.7"
      />

      {/* System Underneath (Foundation Bar & Nodes) */}
      <line
        x1="6.4"
        y1="16.85"
        x2="17.6"
        y2="16.85"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <circle cx="6.4" cy="16.85" r="0.85" fill="currentColor" />
      <circle cx="12" cy="16.85" r="0.85" fill="currentColor" />
      <circle cx="17.6" cy="16.85" r="0.85" fill="currentColor" />

      {/* Vertical Data Thread */}
      <line
        x1="12"
        y1="16.85"
        x2="12"
        y2="8.7"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
      />

      {/* AI On Top (Synaptic / Intelligence Node) */}
      <circle
        cx="12"
        cy="6.95"
        r="2.05"
        stroke="currentColor"
        strokeWidth="0.85"
      />
      <g
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        fill="currentColor"
      >
        <line x1="12" y1="4.9" x2="12" y2="3.15" />
        <circle cx="12" cy="3.15" r="0.42" />
        <line x1="10.35" y1="5.85" x2="8.75" y2="4.55" />
        <circle cx="8.75" cy="4.55" r="0.42" />
        <line x1="13.65" y1="5.85" x2="15.25" y2="4.55" />
        <circle cx="15.25" cy="4.55" r="0.42" />
      </g>
    </svg>
  );
}
