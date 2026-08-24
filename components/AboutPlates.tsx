import Image from "next/image";
import Link from "next/link";
import { InkOrnament } from "@/components/InkOrnament";
import { cn } from "@/lib/cn";

const linkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const aboutLink = cn(
  "font-editorial text-base italic text-mutedFg underline decoration-transparent underline-offset-4 transition-colors hover:text-fg hover:decoration-border",
  linkFocus
);

type PlateProps = {
  src: string;
  alt: string;
  caption: string;
  href?: string;
  aspect: string;
  sizes: string;
  priority?: boolean;
  objectPosition?: string;
  className?: string;
};

function Plate({
  src,
  alt,
  caption,
  href,
  aspect,
  sizes,
  priority = false,
  objectPosition,
  className
}: PlateProps) {
  const frame = (
    <>
      <div className="figure-plate figure-plate-natural">
        <div className={cn("relative w-full overflow-hidden", aspect)}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn("object-cover", objectPosition)}
          />
        </div>
      </div>
      <figcaption
        className={cn(
          "mt-3 font-editorial text-base italic leading-snug text-mutedFg",
          href && "transition-colors group-hover:text-fg"
        )}
      >
        {caption}
        {href ? (
          <span aria-hidden="true" className="ml-1.5 text-mutedFg transition group-hover:text-fg">
            →
          </span>
        ) : null}
      </figcaption>
    </>
  );

  if (href) {
    return (
      <figure className={className}>
        <Link href={href} target="_blank" rel="noreferrer" className={cn("group block", linkFocus)}>
          {frame}
        </Link>
      </figure>
    );
  }

  return <figure className={className}>{frame}</figure>;
}

const shelf = [
  {
    key: "tolstoy",
    src: "/images/bento/IMG_7323.JPG",
    alt: "A Leo Tolstoy short story collection held up outdoors",
    caption: "Tolstoy"
  },
  {
    key: "circe",
    src: "/images/bento/circeairplane.jpg",
    alt: "A copy of Circe by Madeline Miller",
    caption: "Circe"
  },
  {
    key: "evelyn",
    src: "/images/bento/IMG_7324.JPG",
    alt: "A copy of The Seven Husbands of Evelyn Hugo",
    caption: "Evelyn Hugo"
  }
] as const;

function DianaCameo() {
  return (
    <figure className="mx-auto w-full max-w-md">
      <Link
        href="https://www.instagram.com/diana_purrss/"
        target="_blank"
        rel="noreferrer"
        className={cn("group block", linkFocus)}
      >
        <div className="relative mx-auto aspect-[4/5] w-[min(100%,22rem)]">
          <div className="absolute inset-[20%_22%] overflow-hidden rounded-[50%] bg-muted">
            <Image
              src="/images/bento/IMG_4655.jpeg"
              alt=""
              fill
              sizes="22rem"
              className="object-cover object-[center_16%]"
            />
          </div>
          <InkOrnament
            src="/images/ornaments/vine-sprig-flourish-alpha.png"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        </div>
        <figcaption className="mt-5 text-center font-editorial text-base italic leading-snug text-mutedFg underline decoration-transparent underline-offset-4 transition-colors group-hover:text-fg group-hover:decoration-border">
          Diana — aka Booboo. She has strong opinions and, somehow, her own page.
          <span aria-hidden="true" className="ml-1.5">
            →
          </span>
        </figcaption>
      </Link>
    </figure>
  );
}

export function AboutPlates() {
  return (
    <section aria-labelledby="on-the-shelf">
      <h2
        id="on-the-shelf"
        className="caps-heading text-center font-novel text-xs font-medium tracking-[0.32em] text-accent sm:text-sm"
      >
        On the shelf
      </h2>
      <p className="mt-2 text-center font-editorial text-base italic text-mutedFg">
        Currently rotating
      </p>

      <ul className="mt-8 grid list-none grid-cols-3 gap-3 p-0 sm:gap-5">
        {shelf.map((book) => (
          <li key={book.key}>
            <Plate
              src={book.src}
              alt={book.alt}
              caption={book.caption}
              aspect="aspect-[3/4]"
              sizes="(max-width: 768px) 30vw, 18rem"
            />
          </li>
        ))}
      </ul>
      <div className="mt-5 text-center">
        <Link
          href="https://www.goodreads.com/rishwari"
          target="_blank"
          rel="noreferrer"
          className={cn("group inline-flex items-center", aboutLink)}
        >
          <span>The rest of the stack</span>
          <span aria-hidden="true" className="ml-1.5 transition group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      <Plate
        src="/images/bento/20240606_112829_Original.jpeg"
        alt="An acrylic painting of an orange tree above a blue coastline"
        caption="A half-finished painting."
        aspect="aspect-[4/5]"
        sizes="(max-width: 768px) 100vw, 28rem"
        className="mx-auto mt-16 w-full max-w-md sm:mt-20"
      />

      <div className="mt-16 sm:mt-20">
        <DianaCameo />
      </div>
    </section>
  );
}
