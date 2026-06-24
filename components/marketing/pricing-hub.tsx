import Link from "next/link";

import { PricingHero } from "@/components/marketing/pricing-hero";
import { PricingGazeboIcon } from "@/components/marketing/pricing-icons";
import {
  PricingCtaButtons,
  PricingRouteList,
} from "@/components/marketing/pricing-route-list";
import {
  GAZEBO_LINES,
  GAZEBO_SECTION_TITLE,
  ROUTE_PRICE_ENTRIES,
} from "@/lib/marketing/site-pricing";

export function PricingHub() {
  return (
    <main>
      <PricingHero />

      <section className="bg-background px-4 pt-8 pb-10 sm:px-6 md:pt-10 md:pb-12">
        <div className="mx-auto max-w-6xl">
          <PricingCtaButtons />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6 md:py-8">
        <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          Основные программы и цены
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-[15px]">
          Уточняйте наличие мест и актуальность цены при записи — сезон и погода могут влиять на
          доступность маршрутов.
        </p>

        <div className="mt-8">
          <PricingRouteList entries={ROUTE_PRICE_ENTRIES} />
        </div>
      </section>

      <section className="border-t border-border/50 bg-muted/35 px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
              <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <PricingGazeboIcon />
              </span>
              <div>
                <h2 className="font-heading text-xl font-semibold tracking-tight md:text-2xl">
                  {GAZEBO_SECTION_TITLE}
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
                  {GAZEBO_LINES.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-muted-foreground">
                  Подробнее на странице{" "}
                  <Link
                    href="/arenda-besedki"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    аренды беседки
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
