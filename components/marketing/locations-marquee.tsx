"use client";

import { cn } from "@/lib/utils";

const LOCATIONS = [
  "Авачинская долина",
  "Тихий океан",
  "Горячие источники",
  "Озёрная тундра",
  "Берег Халактырского",
  "Реки полуострова",
  "Вулканические сопки",
  "Лесные перелазы",
] as const;

export function LocationsMarquee({ className }: { className?: string }) {
  const dup = [...LOCATIONS, ...LOCATIONS];

  return (
    <div
      className={cn(
        "border-y border-border/55 bg-muted/40 py-3 text-muted-foreground",
        className,
      )}
    >
      <p className="sr-only">
        Направления и локации: {LOCATIONS.join(", ")}
      </p>
      <div className="hidden overflow-hidden md:block">
        <div className="animate-marquee-track flex w-max gap-10 whitespace-nowrap px-4 text-sm font-medium tracking-wide">
          {dup.map((label, i) => (
            <span key={`${label}-${i}`} className="flex shrink-0 items-center gap-10">
              <span aria-hidden className="text-primary/55">
                ◆
              </span>
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="px-4 py-1 text-center text-sm font-medium leading-relaxed md:hidden">
        {LOCATIONS.join(" · ")}
      </div>
    </div>
  );
}
