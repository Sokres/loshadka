"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Home,
  MessageCircle,
  Menu,
  Phone,
  ReceiptRussianRuble,
  X,
  type LucideIcon,
} from "lucide-react";

import type { ServiceCategoryDTO } from "@/lib/cms/types-and-fallback";
import type { StandaloneNavEntry } from "@/components/layout/nav-config";
import {
  iconForCategorySlug,
  iconForStandaloneSlug,
} from "@/components/layout/nav-config";
import { SITE_LOGO_PNG } from "@/lib/marketing/site-assets";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SocialLinks } from "@/components/layout/social-links";

function NavRow({
  href,
  label,
  Icon,
  onNavigate,
  className,
}: {
  href: string;
  label: string;
  Icon: LucideIcon;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex min-h-12 items-center gap-3 rounded-xl px-3 py-2 text-[17px] font-medium text-white/95 transition hover:bg-white/10",
        className,
      )}
    >
      <Icon className="size-5 shrink-0 opacity-80" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}

function AccordionSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-12 w-full items-center justify-between px-3 py-2 text-[17px] font-medium text-white"
      >
        {title}
        <ChevronDown
          className={cn("size-5 transition", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? <div className="pb-2 pl-2">{children}</div> : null}
    </div>
  );
}

function MobileMenuOverlay({
  siteTitle,
  categories,
  standaloneItems,
  waLink,
  socialVk,
  socialInstagram,
  socialTelegram,
  onClose,
}: {
  siteTitle: string;
  categories: ServiceCategoryDTO[];
  standaloneItems: StandaloneNavEntry[];
  waLink: string;
  socialVk?: string | null;
  socialInstagram?: string | null;
  socialTelegram?: string | null;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-primary text-white">
      <div className="flex items-center justify-between px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <Link href="/" onClick={onClose} className="flex items-center py-1" aria-label={siteTitle}>
          <Image
            src={SITE_LOGO_PNG}
            alt={siteTitle}
            width={40}
            height={40}
            className="size-10 brightness-0 invert"
          />
        </Link>
        <button
          type="button"
          aria-label="Закрыть меню"
          onClick={onClose}
          className="flex size-10 items-center justify-center rounded-xl text-white/90 transition hover:bg-white/10"
        >
          <X className="size-6" />
        </button>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2" aria-label="Мобильное меню">
        <NavRow href="/" label="Главная" Icon={Home} onNavigate={onClose} />

        <AccordionSection title="Услуги">
          {categories.map((cat) => {
            const slug = cat.slug.current;
            const Icon = iconForCategorySlug(slug);
            return (
              <NavRow
                key={cat._id}
                href={`/${slug}`}
                label={cat.title}
                Icon={Icon}
                onNavigate={onClose}
                className="text-base"
              />
            );
          })}
        </AccordionSection>

        {standaloneItems.length > 0 ? (
          <AccordionSection title="Ещё">
            {standaloneItems.map((item) => {
              const Icon = iconForStandaloneSlug(item.slug);
              return (
                <NavRow
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  Icon={Icon}
                  onNavigate={onClose}
                  className="text-base"
                />
              );
            })}
          </AccordionSection>
        ) : null}

        <NavRow href="/ceny" label="Цены" Icon={ReceiptRussianRuble} onNavigate={onClose} />
        <NavRow href="/kontakty" label="Контакты" Icon={Phone} onNavigate={onClose} />
      </nav>

      <div className="shrink-0 space-y-4 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className={cn(
            buttonVariants({ size: "lg" }),
            "w-full gap-2 bg-white text-primary hover:bg-white/90",
          )}
        >
          <MessageCircle className="size-5" aria-hidden />
          Написать в WhatsApp
        </a>
        <SocialLinks
          vk={socialVk}
          instagram={socialInstagram}
          telegram={socialTelegram}
          className="justify-center"
          iconClassName="text-white/90 hover:text-white"
        />
      </div>
    </div>
  );
}

export function MobileNav({
  categories,
  standaloneItems,
  siteTitle,
  waLink,
  overlay = false,
  socialVk,
  socialInstagram,
  socialTelegram,
}: {
  categories: ServiceCategoryDTO[];
  standaloneItems: StandaloneNavEntry[];
  siteTitle: string;
  waLink: string;
  overlay?: boolean;
  socialVk?: string | null;
  socialInstagram?: string | null;
  socialTelegram?: string | null;
}) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Открыть меню"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "shrink-0",
          overlay
            ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
            : "border-border/60 bg-background shadow-none",
        )}
      >
        <Menu className="size-5" />
      </button>

      {open && mounted
        ? createPortal(
            <MobileMenuOverlay
              siteTitle={siteTitle}
              categories={categories}
              standaloneItems={standaloneItems}
              waLink={waLink}
              socialVk={socialVk}
              socialInstagram={socialInstagram}
              socialTelegram={socialTelegram}
              onClose={close}
            />,
            document.body,
          )
        : null}
    </>
  );
}
