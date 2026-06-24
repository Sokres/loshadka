import type { Metadata } from "next";

import { HeaderShell } from "@/components/layout/header-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { StickyContactShell } from "@/components/layout/sticky-contact-shell";
import { LocalBusinessJsonLd } from "@/components/json-ld";
import { loadCategories, loadSiteSettings } from "@/lib/cms/loaders";
import { getSiteUrl } from "@/lib/site";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await loadSiteSettings();
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: settings.siteTitle,
      template: `%s · ${settings.siteTitle}`,
    },
    description: settings.defaultMetaDescription ?? undefined,
    openGraph: {
      locale: "ru_RU",
      siteName: settings.siteTitle,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, categories] = await Promise.all([
    loadSiteSettings(),
    loadCategories(),
  ]);

  return (
    <html lang="ru" className="h-full antialiased">
      <body className="text-foreground flex min-h-full flex-col bg-background pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
        <LocalBusinessJsonLd settings={settings} />
        <HeaderShell
          siteTitle={settings.siteTitle}
          tagline={settings.tagline}
          whatsappPhone={settings.whatsappPhone}
          categories={categories}
          socialVk={settings.socialVk}
          socialInstagram={settings.socialInstagram}
          socialTelegram={settings.socialTelegram}
        />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter settings={settings} categories={categories} />
        <StickyContactShell
          whatsappPhone={settings.whatsappPhone}
          phoneTel={settings.phoneTel}
        />
      </body>
    </html>
  );
}
