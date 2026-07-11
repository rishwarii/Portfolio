import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type BentoTile = {
  key: string;
  src: string;
  alt: string;
  caption: string;
  href?: string;
  objectPosition?: string;
  imageAspect: string;
  gridClassName: string;
  orderClassName: string;
};

const tiles: BentoTile[] = [
  {
    key: "tolstoy",
    src: "/images/bento/IMG_7323.JPG",
    alt: "A Leo Tolstoy short story collection held up outdoors",
    caption: "Currently rotating through Tolstoy, Dostoevsky, du Maurier, and Austen.",
    href: "https://www.goodreads.com/rishwari",
    imageAspect: "aspect-square lg:aspect-auto lg:h-full",
    gridClassName: "lg:col-start-1 lg:col-span-6 lg:row-start-1",
    orderClassName: "order-1"
  },
  {
    key: "river",
    src: "/images/bento/bookbyriver.jpg",
    alt: "Reading by the river at sunset",
    caption: "Reading by the river.",
    imageAspect: "aspect-[3/4] lg:aspect-auto lg:h-full",
    gridClassName: "lg:col-start-7 lg:col-span-4 lg:row-start-1",
    orderClassName: "order-2"
  },
  {
    key: "painting",
    src: "/images/bento/20240606_112829_Original.jpeg",
    alt: "An acrylic painting of an orange tree above a blue coastline",
    caption: "Painting",
    imageAspect: "aspect-[3/4] lg:aspect-auto lg:h-full",
    gridClassName: "lg:col-start-1 lg:col-span-4 lg:row-start-2",
    orderClassName: "order-3"
  },
  {
    key: "diana",
    src: "/images/bento/IMG_4655.jpeg",
    alt: "Diana the cat sitting upright",
    caption: "Diana — aka Booboo. She has strong opinions and, somehow, her own page.",
    href: "https://www.instagram.com/diana_purrss/",
    imageAspect: "aspect-[3/2] lg:aspect-auto lg:h-full",
    gridClassName: "lg:col-start-5 lg:col-span-6 lg:row-start-2",
    orderClassName: "order-4"
  }
];

const TILE_FRAME =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-card shadow-soft transition-[box-shadow,border-color] duration-200 hover:shadow-card";
const TILE_FRAME_LINKED = "hover:border-accent/36";

export function AboutBento() {
  return (
    <div className="grid gap-5 sm:gap-6 lg:h-[44rem] lg:grid-cols-10 lg:grid-rows-2">
      {tiles.map((tile) => {
        const imageEl = (
          <div className={cn("relative w-full flex-1 bg-muted/40", tile.imageAspect)}>
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className={cn(
                "object-cover transition duration-300 group-hover:scale-[1.02]",
                tile.objectPosition
              )}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
            />
            <p className="pointer-events-none absolute inset-x-0 bottom-0 p-3 font-editorial text-xs italic leading-snug text-white/95 sm:p-4 sm:text-sm">
              {tile.caption}
            </p>
          </div>
        );

        const linkArrow = tile.href ? (
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-card/85 text-mutedFg backdrop-blur-sm transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
          >
            <ArrowUpRight size={14} />
          </span>
        ) : null;

        const frameClassName = cn(
          TILE_FRAME,
          tile.href ? TILE_FRAME_LINKED : "",
          tile.gridClassName,
          tile.orderClassName
        );

        if (tile.href) {
          return (
            <Link
              key={tile.key}
              href={tile.href}
              target="_blank"
              rel="noreferrer"
              aria-label={tile.caption}
              className={cn(
                frameClassName,
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              )}
            >
              {imageEl}
              {linkArrow}
            </Link>
          );
        }

        return (
          <div key={tile.key} className={frameClassName}>
            {imageEl}
          </div>
        );
      })}
    </div>
  );
}