import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Hero } from "@/components/marketing/hero";
import { HomeReviewsSection } from "@/components/marketing/home-reviews-section";
import { HomeStatsBar } from "@/components/marketing/home-stats-bar";
import { HomeWhyUsSection } from "@/components/marketing/home-why-us-section";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { YandexConstructorMap } from "@/components/map/yandex-constructor-map";

import { SectionIntro } from "@/components/marketing/section-intro";
import { ServiceCard } from "@/components/marketing/service-card";
import {
  loadCategories,
  loadReviews,
  loadSiteSettings,
} from "@/lib/cms/loaders";
import { HOME_PRIMARY_WHATSAPP_MESSAGE } from "@/lib/marketing/contact-prompts";
import { HERO_SLIDES } from "@/lib/marketing/hero-slides";
import { categoryHomeCoverPaths } from "@/lib/marketing/site-assets";
import { getSiteUrl } from "@/lib/site";
import { whatsappHref } from "@/lib/contact";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await loadSiteSettings();
  const base = getSiteUrl();
  return {
    title: settings.siteTitle,
    description: settings.defaultMetaDescription ?? undefined,
    alternates: { canonical: base },
  };
}

export default async function HomePage() {
  const [settings, categories, reviews] = await Promise.all([
    loadSiteSettings(),
    loadCategories(),
    loadReviews(),
  ]);

  const wa = whatsappHref(settings.whatsappPhone, HOME_PRIMARY_WHATSAPP_MESSAGE);
  const primaryCategory = categories[0]?.slug.current;

  return (
    <>
      <Hero
        title={settings.siteTitle}
        subtitle={
          settings.tagline ??
          "Конные прогулки по полуострову: реки, океан, озёра и сезонные туры."
        }
        whatsappPhone={settings.whatsappPhone}
        slides={HERO_SLIDES}
      />

      <div className="relative z-20 px-4 sm:px-6">
        <HomeStatsBar settings={settings} />
      </div>

      <section className="bg-background px-4 pt-10 pb-16 sm:px-6 sm:pt-12 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionIntro
                align="start"
                eyebrow="Куда поедем"
                title="Направления"
                description="Выберите формат отдыха — от короткой прогулки до многодневного похода."
                className="max-w-xl"
              />
              {primaryCategory ? (
                <Link
                  href={`/${primaryCategory}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "hidden shrink-0 sm:inline-flex",
                  )}
                >
                  Все направления
                </Link>
              ) : null}
            </div>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {categories.slice(0, 3).map((c, idx) => (
              <ScrollReveal key={c._id} delayMs={Math.min(idx, 3) * 60}>
                <ServiceCard
                  href={`/${c.slug.current}`}
                  title={c.title}
                  excerpt={c.description ?? ""}
                  galleryPaths={categoryHomeCoverPaths(c.slug.current)}
                  durationLabel={c.durationLabel}
                  levelLabel={c.levelLabel}
                  isPopular={c.isPopular}
                  variant="direction"
                />
              </ScrollReveal>
            ))}
          </div>
          {primaryCategory ? (
            <div className="mt-8 flex justify-center sm:hidden">
              <Link href={`/${primaryCategory}`} className={buttonVariants({ variant: "outline" })}>
                Все направления
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <HomeWhyUsSection settings={settings} />

      <section id="reviews" className="bg-background px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionIntro eyebrow="Слово тем, кто уже был с нами" title="Отзывы гостей" align="center" />
          </ScrollReveal>
          <HomeReviewsSection reviews={reviews} />
        </div>
      </section>

      <section className="bg-muted/40 px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
          <ScrollReveal className="min-w-0 overflow-hidden">
            <SectionIntro
              align="start"
              eyebrow="Сбор и ориентиры"
              title="Как добраться"
              description="Точку встречи и проезд уточняйте при записи — на карте общий ориентир."
            />
            <div className="mt-8 min-w-0 max-w-full">
              <YandexConstructorMap containerId="ym-home-how-to-get" strategy="lazyOnload" />
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={80} className="flex">
            <div className="flex flex-1 flex-col justify-center rounded-2xl bg-primary p-8 text-primary-foreground md:p-10">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                Готовы к приключению?
              </h2>
              <p className="mt-4 text-pretty text-primary-foreground/80 md:text-lg">
                Напишите, какой формат вам интересен — подскажем даты, сложность и что взять с собой.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "gap-2 bg-white text-primary hover:bg-white/90",
                  )}
                >
                  <MessageCircle className="size-5" aria-hidden />
                  Написать в WhatsApp
                </a>
                <Link
                  href="/kontakty"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white",
                  )}
                >
                  Контакты и как добраться
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
