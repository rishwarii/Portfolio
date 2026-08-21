type FolioMarkProps = {
  page: string;
  className?: string;
};

export function FolioMark({ page, className = "" }: FolioMarkProps) {
  return (
    <p className={`font-editorial text-xs text-mutedFg ${className}`.trim()}>
      — p. {page} —
    </p>
  );
}
