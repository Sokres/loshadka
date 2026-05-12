import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, MessageCircle, Shield } from "lucide-react";

import { Hero } from "@/components/marketing/hero";
import { HomeReviewsSection } from "@/components/marketing/home-reviews-section";
import { LocationsMarquee } from "@/components/marketing/locations-marquee";
import { ScrollReveal } from "@/components/marketing/scroll-reveal";
import { SectionWave } from "@/components/marketing/section-wave";
import { YandexConstructorMap } from "@/components/map/yandex-constructor-map";

import { SectionIntro } from "@/components/marketing/section-intro";
import { ServiceCard } from "@/components/marketing/service-card";
import {
  loadCategories,
  loadFeaturedStandaloneServices,
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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function directionsGridItemClass(index: number): string {
  if (index === 0) return "lg:col-span-6 lg:row-span-2";
  if (index === 1) return "lg:col-span-6 lg:col-start-7 lg:row-start-1";
  if (index === 2) return "lg:col-span-6 lg:col-start-7 lg:row-start-2";
  return "lg:col-span-6 xl:col-span-4";
}

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
  const [settings, categories, standalones, reviews] = await Promise.all([
    loadSiteSettings(),
    loadCategories(),
    loadFeaturedStandaloneServices(),
    loadReviews(),
  ]);

  const useBento = categories.length + standalones.length >= 3;
  const wa = whatsappHref(settings.whatsappPhone, HOME_PRIMARY_WHATSAPP_MESSAGE);

  return (
    <>
      <Hero
        title={settings.siteTitle}
        subtitle={
          settings.tagline ??
          "Конные прогулки по Камчатке: реки, океан, озёра и сезонные туры. Запишитесь в один клик — мы подскажем маршрут под ваш уровень."
        }
        whatsappPhone={settings.whatsappPhone}
        slides={HERO_SLIDES}
      />

      <SectionWave />

      <section className="bg-background px-4 py-20 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionIntro
              align="start"
              eyebrow="Куда поедем"
              title="Направления"
              description="Выберите формат отдыха — от короткой прогулки до многодневного похода."
              className="max-w-xl"
            />
          </ScrollReveal>
          <div
            className={cn(
              "mt-10 grid gap-6",
              useBento ? "lg:grid-cols-12" : "sm:grid-cols-2",
            )}
          >
            {categories.map((c, idx) => (
              <ScrollReveal
                key={c._id}
                delayMs={Math.min(idx, 5) * 55}
                className={cn(useBento && directionsGridItemClass(idx))}
              >
                <ServiceCard
                  href={`/${c.slug.current}`}
                  title={c.title}
                  excerpt={c.description ?? ""}
                  galleryPaths={categoryHomeCoverPaths(c.slug.current)}
                  variant={useBento && idx === 0 ? "featured" : "default"}
                />
              </ScrollReveal>
            ))}
            {standalones.map((s, j) => {
              const idx = categories.length + j;
              return (
                <ScrollReveal
                  key={s._id}
                  delayMs={Math.min(idx, 5) * 55}
                  className={cn(useBento && directionsGridItemClass(idx))}
                >
                  <ServiceCard
                    href={`/${s.slug.current}`}
                    title={s.title}
                    excerpt={s.excerpt}
                    variant={useBento && idx === 0 ? "featured" : "default"}
                  />
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/35 px-4 py-16 sm:px-6">
        <ScrollReveal className="mx-auto max-w-6xl">
          <SectionIntro
            align="start"
            eyebrow="О нас"
            title="Почему мы"
            description="Спокойный темп, природа Камчатки и команда, которая действительно любит лошадей."
            className="max-w-xl"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <ScrollReveal delayMs={0} className="lg:col-span-7 lg:row-span-2 lg:min-h-80">
              <Card className="flex h-full flex-col justify-between gap-6 rounded-3xl border-border/70 bg-card/90 p-1 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="gap-5 p-6 sm:p-8">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Shield className="size-7" aria-hidden />
                  </span>
                  <CardTitle className="text-2xl font-semibold tracking-tight">Безопасность</CardTitle>
                  <CardDescription className="text-base leading-relaxed md:text-[17px]">
                    Спокойные лошади для новичков и понятные инструкции перед выездом — без давления и спешки.
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollReveal>
            <ScrollReveal delayMs={90} className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
              <Card className="rounded-3xl border-border/70 bg-card/90 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="gap-4 p-6 sm:p-7">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <MapPin className="size-6" aria-hidden />
                  </span>
                  <CardTitle className="text-xl">Маршруты Камчатки</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    От берега Авачи до океана и горячих источников — соберём программу под сезон и вашу
                    подготовку.
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollReveal>
            <ScrollReveal delayMs={180} className="lg:col-span-5 lg:col-start-8 lg:row-start-2">
              <Card className="rounded-3xl border-border/70 bg-card/90 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="gap-4 p-6 sm:p-7">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <MessageCircle className="size-6" aria-hidden />
                  </span>
                  <CardTitle className="text-xl">Живой контакт</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Запись в WhatsApp или звонок — ответим по датам и маршрутам без длинных форм и ожидания.
                  </CardDescription>
                </CardHeader>
              </Card>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </section>

      <LocationsMarquee />

      <section className="bg-muted/25 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionIntro
              eyebrow="Слово тем, кто уже был с нами"
              title="Отзывы гостей"
              align="center"
            />
          </ScrollReveal>
          <HomeReviewsSection reviews={reviews} />
        </div>
      </section>

      <section className="border-y border-border/50 bg-background px-4 py-16 sm:px-6">
        <ScrollReveal className="mx-auto max-w-6xl">
          <SectionIntro
            align="center"
            eyebrow="Сбор и ориентиры"
            title="Как добраться"
            description="Точку встречи и проезд уточняйте при записи — на карте общий ориентир."
          />
          <div className="mt-10">
            <YandexConstructorMap containerId="ym-home-how-to-get" strategy="lazyOnload" />
          </div>
        </ScrollReveal>
      </section>

      <section className="border-t border-border/60 bg-linear-to-b from-muted/45 via-muted/25 to-background px-4 py-16 sm:px-6">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Готовы к приключению?
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground md:text-lg">
            Напишите, какой формат вам интересен — подскажем даты, сложность и что взять с собой.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 rounded-full px-8 shadow-md")}
            >
              <MessageCircle className="size-5" aria-hidden />
              Написать в WhatsApp
            </a>
            <Link
              href="/kontakty"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8")}
            >
              Контакты и как добраться
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
