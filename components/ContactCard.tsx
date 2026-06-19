import Link from "next/link";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { buttonClasses } from "@/components/Button";
import { Card } from "@/components/Card";
import { PlayfulModeToggle } from "@/components/PlayfulModeToggle";
import { siteContent } from "@/lib/siteContent";

export function ContactCard() {
  const availability = siteContent.contact.availability?.trim() ?? "";
  const actionButtonClass =
    "h-10 min-w-[8.5rem] justify-center rounded-lg px-4 text-sm font-medium [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0";

  return (
    <Card variant="default" className="p-6 sm:p-8">
      <p className="micro-label font-medium text-mutedFg">
        Contact
      </p>
      <h2 className="mt-3 text-3xl text-fg sm:text-4xl">{siteContent.contact.title}</h2>
      {siteContent.contact.microcopy.trim().length > 0 ? (
        <p className="mt-3 max-w-xl text-base font-medium text-fg sm:text-[1.05rem]">
          {siteContent.contact.microcopy}
        </p>
      ) : null}
      {availability.length > 0 ? (
        <p className="mt-2 text-sm text-mutedFg">
          Availability: {availability}
        </p>
      ) : null}

      <div className="mt-7 flex flex-wrap gap-2.5">
        <a
          href={`mailto:${siteContent.contact.email}`}
          className={buttonClasses({
            variant: "primary",
            className: actionButtonClass
          })}
        >
          <Mail size={16} />
          Email
        </a>
        <a
          href={siteContent.contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className={buttonClasses({
            variant: "secondary",
            className: actionButtonClass
          })}
        >
          <Linkedin size={16} />
          LinkedIn
        </a>
        <a
          href={siteContent.contact.github}
          target="_blank"
          rel="noreferrer"
          className={buttonClasses({
            variant: "secondary",
            className: actionButtonClass
          })}
        >
          <Github size={16} />
          GitHub
        </a>
        <Link
          href="/resume"
          className={buttonClasses({
            variant: "secondary",
            className: actionButtonClass
          })}
        >
          <FileText size={16} />
          Resume
        </Link>
      </div>

      <div className="mt-7">
        <PlayfulModeToggle />
      </div>

      {/* TODO: Add calendar link when scheduling URL is ready */}
    </Card>
  );
}
