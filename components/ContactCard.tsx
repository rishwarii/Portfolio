"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { siteContent } from "@/lib/siteContent";

const emailClassName =
  "font-body text-lg font-medium text-fg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const quietLinkClassName =
  "font-editorial text-base italic text-mutedFg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const labelClassName = "font-editorial text-base italic text-mutedFg";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type FormStatus = "idle" | "sending" | "sent" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateFields(name: string, email: string, message: string): FieldErrors {
  const fieldErrors: FieldErrors = {};

  if (name.length === 0) {
    fieldErrors.name = "Enter your name.";
  }

  if (email.length === 0) {
    fieldErrors.email = "Enter your email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Enter a valid email.";
  }

  if (message.length === 0) {
    fieldErrors.message = "Enter a message.";
  }

  return fieldErrors;
}

export function ContactCard() {
  const { contact } = siteContent;
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const focusFirstInvalid = (errors: FieldErrors) => {
    if (errors.name) {
      nameRef.current?.focus();
      return;
    }
    if (errors.email) {
      emailRef.current?.focus();
      return;
    }
    if (errors.message) {
      messageRef.current?.focus();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();
    const errors = validateFields(name, email, message);

    if (Object.keys(errors).length > 0) {
      setStatus("idle");
      setFieldErrors(errors);
      focusFirstInvalid(errors);
      return;
    }

    setFieldErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ name, email, message, website })
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (result.ok) {
        form.reset();
        setStatus("sent");
        return;
      }

      if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
        setFieldErrors(result.fieldErrors);
        setStatus("idle");
        focusFirstInvalid(result.fieldErrors);
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <div>
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <a href={`mailto:${contact.email}`} className={emailClassName}>
            {contact.email}
          </a>
          <span className="font-editorial text-base italic text-mutedFg">
            {contact.emailNote}
          </span>
        </p>
        <p className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className={quietLinkClassName}
          >
            LinkedIn
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className={quietLinkClassName}
          >
            GitHub
          </a>
          <Link href={contact.resume} className={quietLinkClassName}>
            Resume
          </Link>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={status === "sending"}
        className="mt-10"
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClassName}>
              Name
            </label>
            <input
              ref={nameRef}
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={120}
              aria-invalid={fieldErrors.name ? true : undefined}
              aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
              className="letter-field"
            />
            {fieldErrors.name ? (
              <p id="contact-name-error" className="mt-2 font-editorial text-sm text-accent">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClassName}>
              Email
            </label>
            <input
              ref={emailRef}
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
              className="letter-field"
            />
            {fieldErrors.email ? (
              <p id="contact-email-error" className="mt-2 font-editorial text-sm text-accent">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="contact-message" className={labelClassName}>
            Message
          </label>
          <textarea
            ref={messageRef}
            id="contact-message"
            name="message"
            rows={6}
            maxLength={5000}
            aria-invalid={fieldErrors.message ? true : undefined}
            aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
            className="letter-field letter-field-message"
          />
          {fieldErrors.message ? (
            <p id="contact-message-error" className="mt-2 font-editorial text-sm text-accent">
              {fieldErrors.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="letter-send"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>

        <p
          role="status"
          aria-live="polite"
          className={
            status === "sent"
              ? "mt-6 font-editorial text-base italic text-mutedFg"
              : "sr-only"
          }
        >
          {status === "sent" ? "Sent. I'll read it." : null}
        </p>
        <p
          role="alert"
          aria-live="assertive"
          className={
            status === "error"
              ? "mt-6 font-editorial text-base italic text-mutedFg"
              : "sr-only"
          }
        >
          {status === "error" ? (
            <>
              Couldn&apos;t send. Use the{" "}
              <a href={`mailto:${contact.email}`} className={emailClassName}>
                email
              </a>{" "}
              link above.
            </>
          ) : null}
        </p>
      </form>
    </div>
  );
}
