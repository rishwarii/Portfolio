import Link from "next/link";
import { ExternalLink } from "@/components/ExternalLink";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { siteContent } from "@/lib/siteContent";

const linkClassName =
  "font-body text-sm font-medium text-fg underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-accent";

export default function ResumePage() {
  return (
    <Section reveal={false} spacing="compact" containerSize="reading">
      <SectionHeading eyebrow="Resume" title="Professional Snapshot" />
      <div className="mt-10">
        {siteContent.contact.resume.trim().length > 0 ? (
          <ExternalLink href={siteContent.contact.resume} className={linkClassName}>
            Open Resume
          </ExternalLink>
        ) : (
          <p className="font-editorial text-base text-mutedFg">
            Resume URL will be added here.
          </p>
        )}
      </div>
      <Link href="/" className={`mt-10 inline-flex ${linkClassName}`}>
        Back to Home
      </Link>
    </Section>
  );
}
