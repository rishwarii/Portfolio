"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink as ExternalLinkIcon, X } from "lucide-react";
import { Badge } from "@/components/Badge";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Project } from "@/lib/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const open = project != null;

  // Lock background scroll, move focus into the modal, and return focus to the
  // triggering card on close.
  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const raf = window.requestAnimationFrame(() => {
      const target =
        panelRef.current?.querySelector<HTMLElement>("[data-autofocus]");
      target?.focus();
    });

    return () => {
      document.body.style.overflow = originalOverflow;
      window.cancelAnimationFrame(raf);
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  // Escape to close + trap Tab within the modal.
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const panel = panelRef.current;
      if (!panel) {
        return;
      }

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const panelMotion = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.96 }
      };

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-fg/45 backdrop-blur-sm"
          />

          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[1] flex max-h-[90vh] w-full max-w-[44rem] flex-col overflow-hidden rounded-2xl border border-border bg-card text-cardFg shadow-feature"
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            {...panelMotion}
          >
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/90 bg-card/85 text-mutedFg backdrop-blur-sm transition hover:border-accent/70 hover:bg-accent/20 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <X size={16} aria-hidden="true" />
            </button>

            {/* Fixed, height-capped image header (supporting preview, not the
                dominant element). Contain on a neutral pad so any aspect ratio
                (incl. the portrait chatbot) shows fully, not cropped. */}
            <div className="relative h-[34vh] max-h-72 w-full flex-none overflow-hidden border-b border-border/70 bg-muted/40">
              <div className="absolute inset-3 sm:inset-4">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 700px) 100vw, 42rem"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Scrollable body — never lets the panel exceed the viewport. */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="p-7 sm:p-9">
                <h2
                  id={titleId}
                  className="font-display text-2xl text-fg sm:text-3xl"
                >
                  {project.title}
                </h2>
                <p className="mt-2 font-body text-sm text-mutedFg sm:text-base">
                  {project.summary}
                </p>

                {project.highlights.length > 0 ? (
                  <div className="mt-6">
                    <p className="font-editorial text-sm italic text-mutedFg">
                      Highlights
                    </p>
                    <ul className="mt-3 space-y-2 font-body text-sm text-mutedFg sm:text-base">
                      {project.highlights.map((highlight) => (
                        <li key={highlight.text} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent"
                          />
                          {highlight.href ? (
                            <a
                              href={highlight.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-fg underline decoration-accent/90 underline-offset-4 transition hover:text-mutedFg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                            >
                              {highlight.text}
                              <ExternalLinkIcon
                                size={13}
                                aria-hidden="true"
                                className="flex-none"
                              />
                            </a>
                          ) : (
                            <span>{highlight.text}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 border-t border-border/70 px-7 py-5 sm:px-9">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-fg underline decoration-accent/90 underline-offset-4 transition hover:text-mutedFg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    Live site
                    <ExternalLinkIcon size={14} aria-hidden="true" />
                  </a>
                ) : null}

                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-fg underline decoration-accent/90 underline-offset-4 transition hover:text-mutedFg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Full case study
                  <ExternalLinkIcon size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
