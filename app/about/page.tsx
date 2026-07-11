import type { Metadata } from "next";
import Link from "next/link";
import { AboutBento } from "@/components/AboutBento";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "About | Rishwari Ranjan",
  description:
    "A little more about the person behind the code — books, painting, and Diana the cat."
};

export default function AboutPage() {
  return (
    <Section id="about" aura="left" spacing="hero">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
         <p className="micro-label font-medium text-mutedFg/95">About</p>
          <p className="mt-6 font-editorial text-2xl leading-relaxed text-fg sm:text-3xl sm:leading-[1.55]">
            I&apos;m an engineer, but I don&apos;t think like one all the time. Away
            from the keyboard it&apos;s usually a 19th-century novel, or a
            half-finished painting — both of which have taught me more about my
            craft than any framework has. Usually with something loud playing.
          </p>
          <Link
            href="https://open.spotify.com/playlist/16MpcaQE722ZsIRVpHdc3u"
            target="_blank"
            rel="noreferrer"
            className="group mt-6 inline-flex items-center gap-1.5 font-editorial text-sm italic text-mutedFg transition hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span>The playlist I code to</span>
            <span aria-hidden="true" className="text-accent transition group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
        <AboutBento />
      </div>
    </Section>
  );
}
