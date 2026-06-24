"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, List } from "lucide-react";

import { DifficultyDisplay } from "@/components/marketing/difficulty-display";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { RoutePriceEntry } from "@/lib/marketing/site-pricing";

function formatRub(amount: number) {
  return `от ${new Intl.NumberFormat("ru-RU").format(amount)}\u00A0₽`;
}

const INITIAL_VISIBLE = 5;

export function PricingRouteList({ entries }: { entries: readonly RoutePriceEntry[] }) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = Math.max(0, entries.length - INITIAL_VISIBLE);
  const visible = expanded ? entries : entries.slice(0, INITIAL_VISIBLE);

  return (
    <div>
      <div className="divide-y divide-border/70 rounded-2xl border border-border/70 bg-card shadow-sm">
        {visible.map((entry) => (
          <article
            key={entry.indexLabel}
            className={cn(
              "flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-5",
              entry.emphasis === "accent" && "bg-primary/3",
            )}
          >
            {entry.imageSrc ? (
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:aspect-square sm:w-28 md:w-32">
                <Image
                  src={entry.imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 128px"
                />
              </div>
            ) : null}

            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight">
                <span className="text-primary">{entry.indexLabel}.</span> {entry.title}
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
                {entry.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              {entry.difficulty || entry.difficultyLevel ? (
                <DifficultyDisplay
                  value={entry.difficulty}
                  level={entry.difficultyLevel}
                  compact
                  className="mt-3"
                />
              ) : null}
            </div>

            <div className="flex shrink-0 items-end justify-between gap-3 sm:flex-col sm:items-end sm:justify-start sm:pt-1">
              <p className="text-lg font-semibold tabular-nums text-foreground sm:text-right">
                {formatRub(entry.priceRub)}
                {entry.priceSuffix ? (
                  <span className="mt-0.5 block text-sm font-normal text-muted-foreground">
                    {entry.priceSuffix}
                  </span>
                ) : null}
              </p>
            </div>
          </article>
        ))}
      </div>

      {!expanded && hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "mt-6 w-full rounded-xl sm:w-auto",
          )}
        >
          Показать ещё маршруты ({hiddenCount})
        </button>
      ) : null}
    </div>
  );
}

export function PricingCtaButtons() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Link
        href="/kontakty"
        className={cn(buttonVariants({ size: "lg" }), "gap-2 rounded-xl sm:min-w-[240px]")}
      >
        <CalendarDays className="size-5" aria-hidden />
        Записаться и уточнить дату
      </Link>
      <Link
        href="/progulki"
        className={cn(
          buttonVariants({ size: "lg", variant: "outline" }),
          "gap-2 rounded-xl sm:min-w-[200px]",
        )}
      >
        <List className="size-5" aria-hidden />
        Все маршруты
      </Link>
    </div>
  );
}
