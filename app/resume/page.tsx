import Link from "next/link";
import { Card } from "@/components/Card";
import { ExternalLink } from "@/components/ExternalLink";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { siteContent } from "@/lib/siteContent";

export default function ResumePage() {
  return (
    <Section reveal={false} spacing="compact" containerSize="narrow">
      <SectionHeading eyebrow="Resume" title="Professional Snapshot" />
      <Card variant="default" className="mt-8">
        {siteContent.contact.resume.trim().length > 0 ? (
          <ExternalLink href={siteContent.contact.resume} className="mt-1 font-semibold">
            Open Resume
          </ExternalLink>
        ) : (
          <p className="text-sm text-mutedFg sm:text-base">
            Resume URL will be added here.
          </p>
        )}
      </Card>
      <Link
        href="/"
        className="mt-8 inline-flex text-sm font-semibold text-fg underline decoration-accent/90 underline-offset-4 transition hover:text-mutedFg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        Back to Home
      </Link>
    </Section>
  );
}
