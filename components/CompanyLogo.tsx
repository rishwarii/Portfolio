import { readFileSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "@/lib/cn";

const svgMarkup = new Map<string, string>();

function publicSvg(src: string) {
  const cached = svgMarkup.get(src);
  if (cached) {
    return cached;
  }

  const markup = readFileSync(
    path.join(process.cwd(), "public", src.replace(/^\//, "")),
    "utf8"
  );
  svgMarkup.set(src, markup);
  return markup;
}

type CompanyLogoProps = {
  src: string;
  className?: string;
};

export function CompanyLogo({ src, className }: CompanyLogoProps) {
  if (src.endsWith(".svg")) {
    return (
      <span
        aria-hidden="true"
        className={cn("company-mark company-mark-svg", className)}
        dangerouslySetInnerHTML={{ __html: publicSvg(src) }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={800}
      height={225}
      className={cn("company-mark company-mark-raster", className)}
    />
  );
}
