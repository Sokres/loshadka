import Link from "next/link";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

import { DifficultyDisplay } from "@/components/marketing/difficulty-display";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  GAZEBO_LINES,
  GAZEBO_SECTION_TITLE,
  PRICING_INTRO_ALERTS,
  PRICING_INTRO_LEAD,
  ROUTE_PRICE_ENTRIES,
} from "@/lib/marketing/site-pricing";

function formatRub(amount: number) {
  return `${new Intl.NumberFormat("ru-RU").format(amount)}\u00A0₽`;
}

export function PricingHub() {
  return (
    <main>
      <section className="border-b border-border/50 bg-muted/35 px-4 py-12 sm:px-6 md:py-14">
        <div className="mx-auto max-w-4xl space-y-6">
          <div>
            <p className="text-sm font-medium text-primary">Турзона «Лошадка»</p>
            <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Цены
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{PRICING_INTRO_LEAD}</p>
          </div>

          <ul className="flex flex-col gap-3">
            {PRICING_INTRO_ALERTS.map((item, i) => (
              <li
                key={i}
                className={cn(
                  "flex gap-3 rounded-2xl border px-4 py-3 text-sm leading-relaxed md:text-[15px]",
                  item.kind === "alert" &&
                    "border-amber-500/35 bg-amber-500/6 text-foreground/95 dark:bg-amber-500/8",
                  item.kind === "success" &&
                    "border-primary/25 bg-primary/6 text-foreground/95",
                  item.kind === "note" &&
                    "border-border/70 bg-background/80 text-muted-foreground",
                )}
              >
                {item.kind === "alert" ? (
                  <AlertTriangle
                    className="mt-0.5 size-[18px] shrink-0 text-amber-600 dark:text-amber-400"
                    aria-hidden
                  />
                ) : null}
                {item.kind === "success" ? (
                  <CheckCircle2
                    className="mt-0.5 size-[18px] shrink-0 text-primary"
                    aria-hidden
                  />
                ) : null}
                {item.kind === "note" ? (
                  <Info
                    className="mt-0.5 size-[18px] shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                ) : null}
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/kontakty" className={cn(buttonVariants({ size: "lg" }), "rounded-2xl")}>
              Записаться и уточнить дату
            </Link>
            <Link
              href="/progulki"
              className={cn(
                buttonVariants({ size: "lg", variant: "secondary" }),
                "rounded-2xl",
              )}
            >
              Все маршруты
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Основные программы и цены
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-[15px]">
              Уточняйте наличие мест и актуальность цены при записи — сезон и погода могут влиять на
              доступность маршрутов.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:gap-6">
          {ROUTE_PRICE_ENTRIES.map((entry) => (
            <Card
              key={entry.indexLabel}
              className={cn(
                "overflow-hidden shadow-sm",
                entry.emphasis === "accent" &&
                  "border-primary/35 bg-primary/3 ring-1 ring-primary/15",
              )}
            >
              <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-heading text-lg font-semibold text-primary">
                    {entry.indexLabel}.
                  </span>
                  <CardTitle className="text-[17px] leading-snug md:text-lg">
                    {entry.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-5">
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                  {entry.lines.map((line) => (
                    <li key={line} className="leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
                {entry.difficulty ? (
                  <DifficultyDisplay value={entry.difficulty} className="max-w-lg" />
                ) : null}
              </CardContent>
              <CardFooter className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-border/60 bg-muted/40">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Цена
                </span>
                <span className="text-lg font-semibold tabular-nums text-foreground">
                  {formatRub(entry.priceRub)}
                </span>
                {entry.priceSuffix ? (
                  <span className="text-sm text-muted-foreground">{entry.priceSuffix}</span>
                ) : null}
              </CardFooter>
            </Card>
          ))}
        </div>

        <Separator className="my-14 opacity-60" />

        <div>
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{GAZEBO_SECTION_TITLE}</h2>
          <ul className="mt-6 max-w-3xl list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-muted-foreground">
            {GAZEBO_LINES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">
            Отдельная страница услуги:{" "}
            <Link
              href="/arenda-besedki"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              аренда беседки
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
