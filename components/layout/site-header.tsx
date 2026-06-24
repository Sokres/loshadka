import Image from "next/image";
import Link from "next/link";

import type { ServiceCategoryDTO } from "@/lib/cms/types-and-fallback";
import { getFeaturedStandaloneSlugs } from "@/lib/cms/loaders";

import { SITE_LOGO_PNG } from "@/lib/marketing/site-assets";

import { MobileNav } from "./mobile-nav";
import {
  SiteHeaderDesktopActions,
  SiteHeaderDesktopNav,
} from "./site-header-desktop-nav";
import { buttonVariants } from "@/components/ui/button";
import { whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Props = {
  siteTitle: string;
  tagline?: string | null;
  whatsappPhone: string;
  categories: ServiceCategoryDTO[];
  overlay?: boolean;
  socialVk?: string | null;
  socialInstagram?: string | null;
  socialTelegram?: string | null;
};

const standaloneLabels: Record<string, string> = {
  kareta: "Карета",
  sani: "Сани",
  fotosessii: "Фотосессии",
  "arenda-besedki": "Беседка",
  sertifikat: "Сертификат",
};

export function SiteHeader({
  siteTitle,
  tagline,
  whatsappPhone,
  categories,
  overlay = false,
  socialVk,
  socialInstagram,
  socialTelegram,
}: Props) {
  const waLink = whatsappHref(
    whatsappPhone,
    "Здравствуйте! Хочу узнать про конные прогулки.",
  );

  const standaloneItems = getFeaturedStandaloneSlugs().map((slug) => ({
    href: `/${slug}`,
    label: standaloneLabels[slug] ?? slug,
    slug,
  }));

  return (
    <header
      className={cn(
        "z-50 w-full transition-colors",
        overlay
          ? "absolute top-0 border-b border-white/10 bg-black/15 backdrop-blur-sm"
          : "sticky top-0 border-b border-border/60 bg-background/95 backdrop-blur-md",
      )}
    >
      <div className="mx-auto grid min-h-16 max-w-6xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-2 sm:px-6 md:min-h-[4.25rem] md:grid-cols-[auto_1fr_auto]">
        <Link href="/" className="group flex min-w-0 items-center py-1 md:col-start-1" aria-label={siteTitle}>
          <Image
            src={SITE_LOGO_PNG}
            alt={siteTitle}
            width={44}
            height={44}
            className="size-10 shrink-0 object-contain md:size-11"
            priority
          />
          {!overlay ? (
            <div className="ml-2.5 flex min-w-0 flex-col gap-0.5">
              <span className="font-semibold tracking-tight text-primary transition-colors group-hover:text-primary/90">
                {siteTitle}
              </span>
              {tagline ? (
                <span className="hidden max-w-[280px] truncate text-xs text-muted-foreground lg:inline">
                  {tagline}
                </span>
              ) : null}
            </div>
          ) : null}
        </Link>

        <SiteHeaderDesktopNav
          categories={categories}
          standaloneItems={standaloneItems}
          waLink={waLink}
          overlay={overlay}
        />

        <div className="flex items-center justify-end gap-2 md:col-start-3">
          <SiteHeaderDesktopActions waLink={waLink} overlay={overlay} />

          <div className="flex items-center gap-2 md:hidden">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "sm" }),
              "gap-1.5 px-3",
              overlay && "bg-white text-primary hover:bg-white/90",
            )}
            aria-label="Написать в WhatsApp"
          >
            WhatsApp
          </a>
          <MobileNav
            categories={categories}
            standaloneItems={standaloneItems}
            siteTitle={siteTitle}
            waLink={waLink}
            overlay={overlay}
            socialVk={socialVk}
            socialInstagram={socialInstagram}
            socialTelegram={socialTelegram}
          />
          </div>
        </div>
      </div>
    </header>
  );
}
