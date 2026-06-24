import Image from "next/image";
import Link from "next/link";

import type { ServiceCategoryDTO, SiteSettingsDTO } from "@/lib/cms/types-and-fallback";
import { SITE_LOGO_PNG } from "@/lib/marketing/site-assets";
import { whatsappHref } from "@/lib/contact";
import { SocialLinks } from "@/components/layout/social-links";

export function SiteFooter({
  settings,
  categories,
}: {
  settings: SiteSettingsDTO;
  categories: ServiceCategoryDTO[];
}) {
  const year = new Date().getFullYear();
  const wa = whatsappHref(settings.whatsappPhone, "Здравствуйте! Хочу связаться с турзоной.");

  return (
    <footer className="mt-auto bg-footer text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image
                src={SITE_LOGO_PNG}
                alt=""
                width={40}
                height={40}
                className="size-10 brightness-0 invert"
              />
              <p className="font-semibold">{settings.siteTitle}</p>
            </div>
            {settings.tagline ? (
              <p className="mt-3 max-w-xs text-sm text-primary-foreground/75">{settings.tagline}</p>
            ) : null}
            <SocialLinks
              vk={settings.socialVk}
              instagram={settings.socialInstagram}
              telegram={settings.socialTelegram}
              className="mt-5"
              iconClassName="text-primary-foreground/80 hover:text-primary-foreground"
            />
          </div>

          <div>
            <p className="text-sm font-semibold">Услуги</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-primary-foreground/75">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/${cat.slug.current}`}
                  className="transition hover:text-primary-foreground"
                >
                  {cat.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold">Полезное</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-primary-foreground/75">
              <Link href="/ceny" className="transition hover:text-primary-foreground">
                Цены
              </Link>
              <Link href="/#reviews" className="transition hover:text-primary-foreground">
                Отзывы
              </Link>
              <Link href="/politika" className="transition hover:text-primary-foreground">
                Политика конфиденциальности
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold">Контакты</p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-primary-foreground/75">
              <a href={`tel:${settings.phoneTel}`} className="transition hover:text-primary-foreground">
                {settings.phoneDisplay}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-primary-foreground"
              >
                WhatsApp
              </a>
              {settings.email ? (
                <a
                  href={`mailto:${settings.email}`}
                  className="transition hover:text-primary-foreground"
                >
                  {settings.email}
                </a>
              ) : null}
              {settings.address ? (
                <p className="whitespace-pre-line leading-relaxed">{settings.address}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.siteTitle}. Конные прогулки на полуострове.
          </p>
          <Link href="/politika" className="transition hover:text-primary-foreground/90">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
