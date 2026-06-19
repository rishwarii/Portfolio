export function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
      <div className="hero-surface" />
      <div className="hero-aura" />
      <div className="hero-grain" />
      <div className="hero-bottom-fade-layer" />
    </div>
  );
}
