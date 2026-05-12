import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StickyContactBar } from "@/components/layout/sticky-contact";
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
      <body className="text-foreground bg-background min-h-full flex flex-col pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
        <LocalBusinessJsonLd settings={settings} />
        <SiteHeader
          siteTitle={settings.siteTitle}
          tagline={settings.tagline}
          whatsappPhone={settings.whatsappPhone}
          categories={categories}
        />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter settings={settings} />
        <StickyContactBar
          whatsappPhone={settings.whatsappPhone}
          phoneTel={settings.phoneTel}
        />
      </body>
    </html>
  );
}
