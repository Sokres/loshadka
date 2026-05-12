"use client";

import * as React from "react";
import Link from "next/link";
import {
  Home,
  MessageCircle,
  Menu,
  Phone,
  ReceiptRussianRuble,
  type LucideIcon,
} from "lucide-react";

import type { ServiceCategoryDTO } from "@/lib/cms/types-and-fallback";
import type { StandaloneNavEntry } from "@/components/layout/nav-config";
import {
  iconForCategorySlug,
  iconForStandaloneSlug,
} from "@/components/layout/nav-config";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const rowClass = cn(
  "flex min-h-[2.875rem] items-center gap-3 rounded-xl px-2 py-2 text-[15px] leading-snug outline-none transition-colors",
  "text-foreground/95 hover:bg-muted/55 active:bg-muted/75",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

function MobileNavLink({
  href,
  label,
  Icon,
  onNavigate,
}: {
  href: string;
  label: string;
  Icon: LucideIcon;
  onNavigate?: () => void;
}) {
  return (
    <Link href={href} onClick={onNavigate} className={rowClass}>
      <Icon className="size-[18px] shrink-0 text-primary/75" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}

export function MobileNav({
  categories,
  standaloneItems,
  siteTitle,
  waLink,
}: {
  categories: ServiceCategoryDTO[];
  standaloneItems: StandaloneNavEntry[];
  siteTitle: string;
  waLink: string;
}) {
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "shrink-0 border-border/60 bg-background/80 shadow-none backdrop-blur-sm",
        )}
        aria-label="Открыть меню"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton
        className={cn(
          "h-dvh max-h-dvh w-[min(100vw-12px,19rem)] gap-0 border-l-0 bg-background/97 p-0 shadow-2xl ring-1 ring-black/4",
          "data-[side=right]:border-l-0",
        )}
      >
        <SheetHeader className="space-y-0.5 px-5 pb-2 pt-14 text-left">
          <SheetTitle className="text-xl tracking-tight">{siteTitle}</SheetTitle>
          <SheetDescription className="text-sm font-normal text-muted-foreground">
            Маршруты и контакты
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-1 flex-col overflow-y-auto px-5 pb-2" aria-label="Мобильное меню">
          <div className="flex flex-col gap-0.5">
            <MobileNavLink href="/" label="Главная" Icon={Home} onNavigate={close} />
          </div>

          <p className="mt-5 mb-1.5 px-2 text-[11px] font-medium text-muted-foreground">Услуги</p>
          <div className="flex flex-col gap-0.5">
            {categories.map((cat) => {
              const slug = cat.slug.current;
              const Icon = iconForCategorySlug(slug);
              return (
                <MobileNavLink
                  key={cat._id}
                  href={`/${slug}`}
                  label={cat.title}
                  Icon={Icon}
                  onNavigate={close}
                />
              );
            })}
          </div>

          {standaloneItems.length > 0 ? (
            <>
              <p className="mb-1.5 mt-4 px-2 text-[11px] font-medium text-muted-foreground">Ещё</p>
              <div className="flex flex-col gap-0.5">
                {standaloneItems.map((item) => {
                  const Icon = iconForStandaloneSlug(item.slug);
                  return (
                    <MobileNavLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      Icon={Icon}
                      onNavigate={close}
                    />
                  );
                })}
              </div>
            </>
          ) : null}

          <div className="mt-6 flex flex-col gap-0.5">
            <MobileNavLink
              href="/ceny"
              label="Цены"
              Icon={ReceiptRussianRuble}
              onNavigate={close}
            />
            <MobileNavLink
              href="/kontakty"
              label="Контакты"
              Icon={Phone}
              onNavigate={close}
            />
          </div>
        </nav>

        <div className="mt-auto shrink-0 bg-muted/25 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full gap-2 rounded-2xl shadow-sm",
            )}
          >
            <MessageCircle className="size-5" aria-hidden />
            Написать в WhatsApp
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
