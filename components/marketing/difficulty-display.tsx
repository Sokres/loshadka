import { cn } from "@/lib/utils";
import { parseDifficultyLevel } from "@/lib/marketing/parse-difficulty-level";

function DifficultyDots({
  level,
  compact = false,
}: {
  level: number;
  compact?: boolean;
}) {
  const clamped = Math.min(5, Math.max(1, level));

  return (
    <div
      className={cn("flex items-center", compact ? "gap-1.5" : "gap-2")}
      role="img"
      aria-label={`Сложность ${clamped} из 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={cn(
            "rounded-full",
            compact ? "size-2.5" : "size-3",
            i < clamped ? "bg-orange-500" : "bg-primary/75",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function DifficultyDisplay({
  value,
  level: levelProp,
  className,
  compact = false,
}: {
  value?: string | null;
  level?: number | null;
  className?: string;
  compact?: boolean;
}) {
  const level = levelProp ?? parseDifficultyLevel(value);
  if (level == null) return null;

  if (compact) {
    return (
      <div className={cn("flex flex-wrap items-center gap-x-2 gap-y-1", className)}>
        <span className="text-xs text-muted-foreground">Сложность</span>
        <DifficultyDots level={level} compact />
      </div>
    );
  }

  const label = value?.replace(/[\u{1F34E}\u{1F34F}]/gu, "").replace(/\s+/g, " ").trim();

  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-muted/30 px-4 py-3",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Сложность
        </span>
        <DifficultyDots level={level} />
      </div>
      {label ? (
        <p className="mt-2 text-sm leading-snug text-foreground/90">{label}</p>
      ) : null}
    </div>
  );
}
