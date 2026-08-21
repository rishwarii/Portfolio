"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChatbotArchitecture } from "@/components/ChatbotArchitecture";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Project } from "@/lib/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const linkClassName =
  "font-body text-sm font-medium text-fg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-accent";

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const open = project != null;

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
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      };

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-bg/80" />

          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[1] flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border border-border bg-bg text-fg"
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            {...panelMotion}
          >
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              className="absolute right-5 top-4 z-[30] font-body text-sm text-mutedFg underline decoration-transparent decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-border"
            >
              Close
            </button>

            <div className="relative h-[28vh] max-h-56 w-full flex-none overflow-hidden border-b border-border bg-muted/30">
              <div className="absolute inset-4">
                {project.diagram ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <ChatbotArchitecture />
                  </div>
                ) : (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes="(max-width: 700px) 100vw, 42rem"
                    className="object-contain"
                  />
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="px-7 py-8 sm:px-9">
                <h2
                  id={titleId}
                  className="font-novel text-2xl font-normal tracking-[-0.02em] text-fg sm:text-3xl"
                >
                  {project.title}
                </h2>
                <p className="mt-3 font-editorial text-base leading-relaxed text-mutedFg">
                  {project.summary}
                </p>

                {project.highlights.length > 0 ? (
                  <div className="mt-8">
                    <p className="font-editorial text-sm italic text-mutedFg">
                      Highlights
                    </p>
                    <ul className="mt-3 space-y-2 font-editorial text-sm leading-relaxed text-mutedFg sm:text-base">
                      {project.highlights.map((highlight) => (
                        <li key={highlight.text}>
                          {highlight.href ? (
                            <a
                              href={highlight.href}
                              target="_blank"
                              rel="noreferrer"
                              className={linkClassName}
                            >
                              {highlight.text}
                            </a>
                          ) : (
                            highlight.text
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {project.tags.length > 0 ? (
                  <p className="mt-8 font-editorial text-sm italic text-mutedFg">
                    {project.tags.join(" · ")}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-8 border-t border-border px-7 py-5 sm:px-9">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClassName}
                  >
                    Live site
                  </a>
                ) : null}

                <Link href={`/projects/${project.slug}`} className={linkClassName}>
                  Full case study
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
