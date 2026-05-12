import { cn } from "@/lib/utils";

function inferLevel(text: string): number {
  const t = text.toLowerCase();
  if (/опытн|высок|сложн|требовател|только\s+для\s+опытн/u.test(t)) return 5;
  if (/подготовлен|уверенн|для\s+подготовлен/u.test(t)) return 4;
  if (/начинающ|новичок|лёгк|легк|низк|семейн|мягк/u.test(t)) return 2;
  return 3;
}

/** Отображает сложность: эмодзи 🍎/🍏 из текста или компактную 5-бальную шкалу + подпись. */
export function DifficultyDisplay({
  value,
  className,
}: {
  value?: string | null;
  className?: string;
}) {
  if (!value?.trim()) return null;

  const fruits = [...value].filter((c) => c === "🍎" || c === "🍏");
  let textOnly = value;
  for (const f of fruits) {
    textOnly = textOnly.split(f).join("");
  }
  textOnly = textOnly.replace(/\s+/g, " ").trim();

  if (fruits.length > 0) {
    const ariaLabel =
      textOnly ||
      fruits.map((f) => (f === "🍎" ? "высокая нагрузка" : "легче")).join(", ");

    return (
      <div
        className={cn(
          "rounded-2xl border border-primary/15 bg-linear-to-br from-primary/[0.07] to-transparent px-4 py-3",
          className,
        )}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Сложность
          </span>
          <div
            className="flex items-center gap-0.5 text-[22px] leading-none tracking-tight"
            role="img"
            aria-label={ariaLabel}
          >
            {fruits.map((f, i) => (
              <span key={`${f}-${i}`} aria-hidden>
                {f}
              </span>
            ))}
          </div>
        </div>
        {textOnly ? (
          <p className="mt-2 text-sm leading-snug text-foreground/90">{textOnly}</p>
        ) : null}
      </div>
    );
  }

  const level = inferLevel(value);
  const clamped = Math.min(5, Math.max(1, level));

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/60 bg-muted/35 px-4 py-3",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Сложность
        </span>
        <div className="flex gap-1.5" role="img" aria-label={value}>
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 w-7 rounded-full transition-colors",
                i < clamped ? "bg-primary ring-1 ring-primary/35 ring-inset" : "bg-muted",
              )}
              aria-hidden
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm leading-snug text-foreground/90">{value}</p>
    </div>
  );
}
