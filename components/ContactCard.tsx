import { siteContent } from "@/lib/siteContent";

const linkClassName =
  "font-body text-base font-medium text-fg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-accent";

export function ContactCard() {
  const { contact } = siteContent;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-8">
        <a href={`mailto:${contact.email}`} className={linkClassName}>
          Email
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className={linkClassName}
        >
          LinkedIn
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          className={linkClassName}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
