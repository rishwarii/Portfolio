import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutPlates } from "@/components/AboutPlates";
import { EditionFrame } from "@/components/EditionFrame";
import { Section } from "@/components/Section";
import { VineSprig } from "@/components/VineSprig";

export const metadata: Metadata = {
  title: "About | Rishwari Ranjan",
  description:
    "A little more about the person behind the code — books, painting, and Diana the cat."
};

export default function AboutPage() {
  return (
    <Section id="about" spacing="hero" containerSize="folio">
      <EditionFrame>
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/about/book-stack.png"
            alt=""
            width={220}
            height={420}
            className="h-auto w-16 sm:w-20"
          />
          <h1 className="caps-heading mt-6 font-novel text-xs font-medium tracking-[0.32em] text-accent sm:text-sm">
            A note
          </h1>
        </div>

        <figure className="mx-auto mt-10 w-full max-w-lg sm:mt-12">
          <div className="figure-plate figure-plate-natural">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/bento/bookbyriver.jpg"
                alt="Reading a Kindle on the grass by a river at sunset"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 32rem"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-center font-editorial text-base italic text-mutedFg">
            Reading by the river.
          </figcaption>
        </figure>

        <VineSprig />

        <p className="mx-auto max-w-xl text-left font-editorial text-lg leading-[1.7] text-fg sm:text-xl sm:leading-[1.65]">
          I&apos;m an engineer, but I don&apos;t think like one all the time. Away
          from the keyboard it&apos;s usually a 19th-century novel or a
          half-finished painting. Usually with something loud playing.
        </p>

        <div className="mt-8 text-center">
          <Link
            href="https://open.spotify.com/playlist/16MpcaQE722ZsIRVpHdc3u"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-editorial text-base italic text-mutedFg underline decoration-transparent underline-offset-4 transition-colors hover:text-fg hover:decoration-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span>The playlist I code to</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <VineSprig />

        <AboutPlates />
      </EditionFrame>
    </Section>
  );
}
