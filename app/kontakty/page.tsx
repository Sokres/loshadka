import type { Metadata } from "next";

import { YandexConstructorMap } from "@/components/map/yandex-constructor-map";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { loadSiteSettings } from "@/lib/cms/loaders";
import { whatsappHref } from "@/lib/contact";
import { getSiteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await loadSiteSettings();
  return {
    title: "Контакты и запись",
    description: `Запись на конные прогулки «Лошадка»: телефон ${settings.phoneDisplay}.`,
    alternates: { canonical: `${getSiteUrl()}/kontakty` },
  };
}

export default async function ContactsPage() {
  const settings = await loadSiteSettings();
  const wa = whatsappHref(
    settings.whatsappPhone,
    "Здравствуйте! Хочу записаться на конную программу.",
  );

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Контакты</h1>
      <p className="mt-4 text-muted-foreground">
        Чтобы забронировать дату или уточнить маршрут, напишите в WhatsApp или позвоните — мы на связи.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          Написать в WhatsApp
        </a>
        <a
          href={`tel:${settings.phoneTel}`}
          className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}
        >
          Позвонить {settings.phoneDisplay}
        </a>
      </div>
      {settings.address ? (
        <p className="mt-10 whitespace-pre-line text-sm text-muted-foreground">{settings.address}</p>
      ) : null}

      <section className="mt-12" aria-labelledby="map-heading">
        <h2 id="map-heading" className="text-lg font-semibold tracking-tight">
          На карте
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Интерактивная схема от Яндекс.Карт — можно приблизить и посмотреть окрестности.
        </p>
        <div className="mt-6">
          <YandexConstructorMap containerId="ym-kontakty-map" strategy="afterInteractive" />
        </div>
      </section>
    </main>
  );
}
