import Link from "next/link";

import type { SiteSettingsDTO } from "@/lib/cms/types-and-fallback";
import { Separator } from "@/components/ui/separator";

export function SiteFooter({ settings }: { settings: SiteSettingsDTO }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/70 bg-muted/35">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-primary">{settings.siteTitle}</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{settings.tagline}</p>
            {settings.address ? (
              <p className="mt-4 text-sm text-muted-foreground whitespace-pre-line">
                {settings.address}
              </p>
            ) : null}
          </div>
          <div className="text-sm">
            <p className="font-medium">Контакты</p>
            <p className="mt-2">
              <a className="text-primary hover:underline" href={`tel:${settings.phoneTel}`}>
                {settings.phoneDisplay}
              </a>
            </p>
            <Separator className="my-4" />
            <nav className="flex flex-col gap-2 text-muted-foreground">
              <Link href="/politika" className="hover:text-foreground">
                Политика конфиденциальности
              </Link>
              <Link href="/ceny" className="hover:text-foreground">
                Цены
              </Link>
              <Link href="/kontakty" className="hover:text-foreground">
                Как записаться
              </Link>
            </nav>
          </div>
        </div>
        <p className="mt-10 text-xs text-muted-foreground">
          © {year} {settings.siteTitle}. Конные прогулки на Камчатке.
        </p>
      </div>
    </footer>
  );
}
