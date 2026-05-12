import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import type { ServiceDTO } from "@/lib/cms/types-and-fallback";
import { whatsappHref } from "@/lib/contact";
import {
  obuchenieStaticGalleryPaths,
  routeStaticGalleryPaths,
} from "@/lib/marketing/site-assets";

import { PortableBody } from "./portable-body";
import { DifficultyDisplay } from "@/components/marketing/difficulty-display";
import { LocalImageGallery } from "@/components/marketing/local-image-gallery";
import { ServiceGallery } from "./service-gallery";

export function ServiceDetail({
  service,
  whatsappPhone,
  phoneTel,
}: {
  service: ServiceDTO;
  whatsappPhone: string;
  phoneTel: string;
}) {
  const wa = whatsappHref(
    whatsappPhone,
    `Здравствуйте! Хочу узнать про программу: ${service.title}`,
  );

  const routePhotos = routeStaticGalleryPaths(service.slug.current);
  const obucheniePhotos = obuchenieStaticGalleryPaths(service.slug.current);
  const inlineGalleryPaths = obucheniePhotos ?? routePhotos;
  const inlineGalleryLabel = obucheniePhotos ? "Фото занятий" : "Фото маршрута";

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
        {service.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{service.excerpt}</p>

      {inlineGalleryPaths ? (
        <>
          <div className="mt-6 md:hidden">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {inlineGalleryLabel}
            </p>
            <LocalImageGallery
              layout="ribbon"
              paths={inlineGalleryPaths}
              altBase={service.title}
            />
          </div>
          <div className="mt-6 hidden md:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {inlineGalleryLabel}
            </p>
            <LocalImageGallery
              layout="featured"
              paths={inlineGalleryPaths}
              altBase={service.title}
            />
          </div>
        </>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {service.durationHours ? (
          <Badge variant="secondary">~{service.durationHours} ч</Badge>
        ) : null}
        {service.distanceKm ? <Badge variant="outline">{service.distanceKm}</Badge> : null}
        {service.seasonNote ? (
          <Badge variant="secondary" className="font-normal">
            {service.seasonNote}
          </Badge>
        ) : null}
      </div>

      {service.difficulty ? (
        <DifficultyDisplay value={service.difficulty} className="mt-5 max-w-xl" />
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "lg" }), "inline-flex gap-2")}
        >
          <MessageCircle className="size-4" />
          WhatsApp
        </a>
        <a
          href={`tel:${phoneTel}`}
          className={cn(
            buttonVariants({ size: "lg", variant: "secondary" }),
            "inline-flex gap-2",
          )}
        >
          <Phone className="size-4" />
          Позвонить
        </a>
      </div>

      {service.slug.current === "shkola-verhovoy-ezdy" ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Набор в группы школы — телефон из объявления:{" "}
          <a
            href="tel:+79146261045"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            +7 (914) 626-10-45
          </a>
          .
        </p>
      ) : null}

      {service.highlights?.length ? (
        <>
          <Separator className="my-10" />
          <h2 className="text-xl font-semibold">Коротко о программе</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {service.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}

      {service.body?.length ? (
        <>
          <Separator className="my-10" />
          <PortableBody value={service.body} />
          {service.slug.current === "individualnoe-obuchenie" ? (
            <p className="mt-6 text-base text-muted-foreground">
              Раздел{" "}
              <Link
                href="/progulki"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                «Конные прогулки»
              </Link>
              .
            </p>
          ) : null}
        </>
      ) : null}

      {service.packingTips ? (
        <>
          <Separator className="my-10" />
          <h2 className="text-xl font-semibold">Что учесть</h2>
          <p className="mt-4 whitespace-pre-line text-muted-foreground">{service.packingTips}</p>
        </>
      ) : null}

      <ServiceGallery images={service.gallery as unknown[] | undefined} />

      {service.faq?.length ? (
        <>
          <Separator className="my-10" />
          <h2 className="text-xl font-semibold">Вопросы</h2>
          <Accordion className="mt-4 w-full">
            {service.faq.map((item, index) => (
              <AccordionItem key={`${item.question}-${index}`} value={`faq-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      ) : null}
    </article>
  );
}
