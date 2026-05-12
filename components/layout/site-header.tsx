import Image from "next/image";
import Link from "next/link";

import type { ServiceCategoryDTO } from "@/lib/cms/types-and-fallback";
import { getFeaturedStandaloneSlugs } from "@/lib/cms/loaders";

import { SITE_LOGO_PNG } from "@/lib/marketing/site-assets";

import { MobileNav } from "./mobile-nav";
import { SiteHeaderDesktopNav } from "./site-header-desktop-nav";
import { buttonVariants } from "@/components/ui/button";
import { whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Props = {
  siteTitle: string;
  tagline?: string | null;
  whatsappPhone: string;
  categories: ServiceCategoryDTO[];
};

const standaloneLabels: Record<string, string> = {
  kareta: "Карета",
  sani: "Сани",
  fotosessii: "Фотосессии",
  "arenda-besedki": "Беседка",
  sertifikat: "Сертификат",
};

export function SiteHeader({ siteTitle, tagline, whatsappPhone, categories }: Props) {
  const waLink = whatsappHref(
    whatsappPhone,
    "Здравствуйте! Хочу узнать про конные прогулки на Камчатке.",
  );

  const standaloneItems = getFeaturedStandaloneSlugs().map((slug) => ({
    href: `/${slug}`,
    label: standaloneLabels[slug] ?? slug,
    slug,
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-border/45 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/72">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6 md:min-h-[4.25rem] md:py-0">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 py-1">
          <Image
            src={SITE_LOGO_PNG}
            alt=""
            width={44}
            height={44}
            className="size-10 shrink-0 object-contain md:size-11"
            priority
          />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="font-semibold tracking-tight text-primary transition-colors group-hover:text-primary/90">
              {siteTitle}
            </span>
            {tagline ? (
              <span className="hidden max-w-[220px] truncate text-xs text-muted-foreground sm:inline lg:max-w-[280px]">
                {tagline}
              </span>
            ) : null}
          </div>
        </Link>

        <SiteHeaderDesktopNav
          categories={categories}
          standaloneItems={standaloneItems}
          waLink={waLink}
        />

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "sm" }), "gap-1.5 rounded-full px-3")}
            aria-label="Написать в WhatsApp"
          >
            <span className="hidden [@media(min-width:380px)]:inline">WhatsApp</span>
            <span className="[@media(min-width:380px)]:hidden">WA</span>
          </a>
          <MobileNav
            categories={categories}
            standaloneItems={standaloneItems}
            siteTitle={siteTitle}
            waLink={waLink}
          />
        </div>
      </div>
    </header>
  );
}
