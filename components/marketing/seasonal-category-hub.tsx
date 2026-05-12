import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

import { PortableBody } from "@/components/portable-body";
import { DifficultyDisplay } from "@/components/marketing/difficulty-display";
import { LocalImageGallery } from "@/components/marketing/local-image-gallery";
import { ServiceGallery } from "@/components/service-gallery";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ServiceCategoryDTO, ServiceDTO } from "@/lib/cms/types-and-fallback";
import { whatsappHref } from "@/lib/contact";
import { seasonalStaticGalleryPaths } from "@/lib/marketing/site-assets";
import { cn } from "@/lib/utils";

export function SeasonalCategoryHub({
  category,
  services,
  whatsappPhone,
  phoneTel,
}: {
  category: ServiceCategoryDTO;
  services: ServiceDTO[];
  whatsappPhone: string;
  phoneTel: string;
}) {
  return (
    <main>
      <section className="border-b border-border/50 bg-muted/35 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium text-primary">Турзона «Лошадка»</p>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {category.title}
          </h1>
          {category.description ? (
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{category.description}</p>
          ) : null}
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Ниже — все сезонные программы на одной странице: можно быстро сравнить маршруты и написать в
            WhatsApp с нужным названием. Отдельные страницы остаются для ссылки или поиска.
          </p>

          {services.length > 1 ? (
            <nav
              className="mt-8 flex flex-wrap gap-2"
              aria-label="Переход к программе"
            >
              {services.map((s) => (
                <a
                  key={s._id}
                  href={`#${s.slug.current}`}
                  className="rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-sm text-foreground shadow-sm transition-colors hover:border-primary/35 hover:bg-primary/6"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          ) : null}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
        {services.map((service, index) => (
          <SeasonalTourSection
            key={service._id}
            service={service}
            categorySlug={category.slug.current}
            whatsappPhone={whatsappPhone}
            phoneTel={phoneTel}
            stripe={index % 2 === 1}
          />
        ))}
      </div>
    </main>
  );
}

function SeasonalTourSection({
  service,
  categorySlug,
  whatsappPhone,
  phoneTel,
  stripe,
}: {
  service: ServiceDTO;
  categorySlug: string;
  whatsappPhone: string;
  phoneTel: string;
  stripe: boolean;
}) {
  const slug = service.slug.current;
  const wa = whatsappHref(
    whatsappPhone,
    `Здравствуйте! Интересует сезонная программа: «${service.title}».`,
  );
  const detailHref = `/${categorySlug}/${slug}`;
  const seasonalPhotos = seasonalStaticGalleryPaths(slug);
  const hasPhotos = Boolean(seasonalPhotos?.length);

  return (
    <article
      id={slug}
      className={cn(
        "scroll-mt-28 rounded-3xl border border-border/50 px-5 py-10 shadow-sm sm:px-8 md:px-10",
        stripe ? "bg-muted/25" : "bg-background",
      )}
    >
      <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
        {service.title}
      </h2>
      <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{service.excerpt}</p>

      {hasPhotos && seasonalPhotos ? (
        <div className="mt-6 lg:hidden">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Фото маршрута
          </p>
          <LocalImageGallery layout="ribbon" paths={seasonalPhotos} altBase={service.title} />
        </div>
      ) : null}

      <div
        className={cn(
          hasPhotos &&
            "lg:mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-12",
          !hasPhotos && "mt-8 space-y-6",
        )}
      >
        <div
          className={cn(
            "space-y-6",
            hasPhotos && "lg:col-span-7 xl:col-span-8",
            hasPhotos && "mt-8 lg:mt-0",
          )}
        >
          <div className="flex flex-wrap gap-2">
            {service.distanceKm ? (
              <Badge variant="secondary" className="font-normal">
                {service.distanceKm}
              </Badge>
            ) : null}
            {service.durationHours ? (
              <Badge variant="outline" className="font-normal">
                ~{service.durationHours} ч
              </Badge>
            ) : null}
            {service.seasonNote ? (
              <Badge variant="outline" className="border-primary/25 bg-primary/6 font-normal">
                {service.seasonNote}
              </Badge>
            ) : null}
          </div>

          <div className="max-w-xl">
            <DifficultyDisplay value={service.difficulty} />
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "inline-flex gap-2 rounded-2xl")}
            >
              <MessageCircle className="size-4" aria-hidden />
              Записаться в WhatsApp
            </a>
            <a
              href={`tel:${phoneTel}`}
              className={cn(
                buttonVariants({ size: "lg", variant: "secondary" }),
                "inline-flex gap-2 rounded-2xl",
              )}
            >
              <Phone className="size-4" aria-hidden />
              Позвонить
            </a>
          </div>

          {service.highlights?.length ? (
            <>
              <Separator className="opacity-60" />
              <div>
                <h3 className="text-lg font-semibold">Коротко о программе</h3>
                <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-muted-foreground">
                  {service.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}

          {service.body?.length ? (
            <>
              <Separator className="opacity-60" />
              <PortableBody value={service.body} />
            </>
          ) : null}

          {service.packingTips ? (
            <>
              <Separator className="opacity-60" />
              <div>
                <h3 className="text-lg font-semibold">Что учесть</h3>
                <p className="mt-4 max-w-3xl whitespace-pre-line text-muted-foreground">
                  {service.packingTips}
                </p>
              </div>
            </>
          ) : null}

          <ServiceGallery images={service.gallery as unknown[] | undefined} />

          <p className="text-sm text-muted-foreground">
            <Link
              href={detailHref}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Открыть эту программу отдельной страницей
            </Link>{" "}
            — если хотите поделиться прямой ссылкой или сохранить в закладки.
          </p>
        </div>

        {hasPhotos && seasonalPhotos ? (
          <aside className="hidden lg:col-span-5 lg:block xl:col-span-4">
            <div className="sticky top-28 space-y-3 xl:top-32">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Фото маршрута
              </p>
              <LocalImageGallery
                layout="featured"
                paths={seasonalPhotos}
                altBase={service.title}
              />
            </div>
          </aside>
        ) : null}
      </div>
    </article>
  );
}
