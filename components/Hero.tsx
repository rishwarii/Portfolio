"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/Badge";
import { ButtonLink } from "@/components/Button";
import { CatPeek } from "@/components/CatPeek";
import { Container } from "@/components/Container";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { renderText } from "@/lib/renderText";
import { siteContent } from "@/lib/siteContent";

const BASE_PARALLAX_OFFSET = 44;
const DEBUG_PARALLAX_OFFSET = 76;
const PARALLAX_LERP = 0.38;
export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [debugMotion, setDebugMotion] = useState(false);
  const headline = renderText(siteContent.hero.headline);
  const roleLine = renderText(siteContent.hero.roleLine);
  const subheadline = renderText(siteContent.hero.subheadline);
  const stackChips = siteContent.hero.stackChips.map(renderText).filter(Boolean);
  const supportingLine = renderText(siteContent.hero.supportingLine);
  const primaryLabel = renderText(siteContent.hero.primaryCta.label);
  const primaryHref = renderText(siteContent.hero.primaryCta.href);
  const secondaryLabel = renderText(siteContent.hero.secondaryCta.label);
  const secondaryHref = renderText(siteContent.hero.secondaryCta.href);

  useEffect(() => {
    setMounted(true);
    const nextDebugMotion =
      new URLSearchParams(window.location.search).get("debugMotion") === "1";
    setDebugMotion(nextDebugMotion);
  }, []);

  useEffect(() => {
    const aura = document.getElementById("heroAura");
    if (!aura) {
      return;
    }
    aura.style.willChange = "transform";

    if (prefersReducedMotion && !debugMotion) {
      aura.style.setProperty("--hero-aura-x", "0px");
      aura.style.setProperty("--hero-aura-y", "0px");
      return;
    }

    const range = debugMotion ? DEBUG_PARALLAX_OFFSET : BASE_PARALLAX_OFFSET;
    let animationFrame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const render = () => {
      currentX += (targetX - currentX) * PARALLAX_LERP;
      currentY += (targetY - currentY) * PARALLAX_LERP;
      aura.style.setProperty("--hero-aura-x", `${currentX.toFixed(2)}px`);
      aura.style.setProperty("--hero-aura-y", `${currentY.toFixed(2)}px`);

      if (Math.abs(targetX - currentX) > 0.08 || Math.abs(targetY - currentY) > 0.08) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        animationFrame = 0;
      }
    };

    const queueRender = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      targetX = x * range;
      targetY = y * range;
      queueRender();
    };

    const resetParallax = () => {
      targetX = 0;
      targetY = 0;
      queueRender();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", resetParallax);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetParallax);
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
      aura.style.willChange = "auto";
      aura.style.setProperty("--hero-aura-x", "0px");
      aura.style.setProperty("--hero-aura-y", "0px");
    };
  }, [debugMotion, prefersReducedMotion]);

  return (
    <section id="home" className="relative overflow-hidden">
      <div id="heroAura" aria-hidden="true" />
      <div id="heroGrain" aria-hidden="true" />
      <div className="hero-bottom-fade-layer" aria-hidden="true" />
      <CatPeek />
      {mounted && debugMotion ? (
        <div
          style={{
            position: "fixed",
            bottom: 12,
            right: 12,
            zIndex: 9999,
            background: "#111",
            color: "#fff",
            padding: "8px 10px",
            borderRadius: "10px",
            fontSize: "12px"
          }}
        >
          {prefersReducedMotion ? "debugMotion=1 (override)" : "debugMotion=1"}
        </div>
      ) : null}

      <Container
        size="hero"
        className="relative z-[1] flex min-h-[72svh] items-center justify-center pb-16 pt-20 text-center sm:min-h-[75svh] sm:pb-20 sm:pt-24"
      >
        <div className="w-full max-w-5xl">
          <h1 className="mx-auto pb-1 text-balance font-display text-[clamp(2.6rem,7.7vw,5.9rem)] font-semibold leading-[0.98] tracking-[-0.042em] text-fg">
            {headline}
          </h1>
          {roleLine.length > 0 ? (
            <p className="mt-5 text-[1.08rem] font-medium text-fg sm:text-[1.22rem]">
              {roleLine}
            </p>
          ) : null}
          {subheadline.length > 0 ? (
            <p className="mx-auto mt-3.5 max-w-3xl text-[0.98rem] text-mutedFg sm:text-[1.06rem]">
              {subheadline}
            </p>
          ) : null}
          {stackChips.length > 0 ? (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {stackChips.map((chip) => (
                <Badge
                  key={chip}
                  variant="outline"
                  className="rounded-md border-border/70 bg-card/70 px-2.5 py-1 text-[0.58rem] tracking-[0.13em] text-mutedFg"
                >
                  {chip}
                </Badge>
              ))}
            </div>
          ) : null}
          <p className="mt-2 text-xs tracking-[0.03em] text-mutedFg/84">Based in USA</p>
          {supportingLine.length > 0 ? (
            <p className="mx-auto mt-3.5 max-w-3xl text-[0.78rem] tracking-[0.01em] text-mutedFg/86">
              {supportingLine}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {primaryLabel.length > 0 && primaryHref.length > 0 ? (
              <ButtonLink
                href={primaryHref}
                variant="primary"
                className="rounded-lg px-[1.15rem] py-2.5 font-semibold shadow-soft"
              >
                {primaryLabel}
              </ButtonLink>
            ) : null}
            {secondaryLabel.length > 0 && secondaryHref.length > 0 ? (
              <ButtonLink
                href={secondaryHref}
                variant="secondary"
                className="rounded-lg px-[1.15rem] py-2.5 font-medium"
              >
                {secondaryLabel}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
