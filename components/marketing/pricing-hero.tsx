import Image from "next/image";
import Link from "next/link";

import { PRICING_INFO_CARDS, PricingInfoIcon } from "@/components/marketing/pricing-icons";
import { cn } from "@/lib/utils";

export const PRICING_HERO_IMAGE = "/images/9727ab13-d42e-48de-8e37-5f2106e23b28.jpg";

export function PricingHero() {
  return (
    <>
      <section className="relative isolate min-h-[300px] overflow-hidden sm:min-h-[340px] md:min-h-[380px]">
        <Image
          src={PRICING_HERO_IMAGE}
          alt="Конная прогулка на Камчатке"
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/25" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-16 pt-10 sm:px-6 sm:pb-20 md:justify-center md:pb-24 md:pt-16">
          <nav aria-label="Хлебные крошки" className="text-sm text-white/75">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Главная
                </Link>
              </li>
              <li aria-hidden className="text-white/45">
                /
              </li>
              <li className="text-white/95">Цены</li>
            </ol>
          </nav>
          <h1 className="mt-3 max-w-xl font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Цены
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Конные прогулки для души, познания, тела и для опытных наездников.
          </p>
        </div>
      </section>

      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6">
        <PricingInfoBar />
      </div>
    </>
  );
}

function PricingInfoBar() {
  return (
    <div className="-mt-10 rounded-2xl border border-border/60 bg-card px-4 py-6 shadow-lg sm:px-6 md:-mt-12 md:px-8">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-4">
        {PRICING_INFO_CARDS.map(({ Icon, text, tone, lucide }) => (
          <div
            key={text}
            className="flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:gap-3 md:text-left"
          >
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl",
                tone === "amber" ? "bg-amber-500/12 text-amber-600" : "bg-primary/10 text-primary",
              )}
            >
              <PricingInfoIcon Icon={Icon} lucide={lucide} className="size-6" />
            </span>
            <p className="text-sm leading-snug text-foreground/90">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
