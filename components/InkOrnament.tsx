import { cn } from "@/lib/cn";

type InkOrnamentProps = {
  src: string;
  className?: string;
};

export function InkOrnament({ src, className }: InkOrnamentProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("ink-ornament", className)}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`
      }}
    />
  );
}
