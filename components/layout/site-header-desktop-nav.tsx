"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

import type { ServiceCategoryDTO } from "@/lib/cms/types-and-fallback";
import {
  iconForCategorySlug,
  iconForStandaloneSlug,
  type StandaloneNavEntry,
} from "./nav-config";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  categories: ServiceCategoryDTO[];
  standaloneItems: StandaloneNavEntry[];
  waLink: string;
};

export function SiteHeaderDesktopNav({
  categories,
  standaloneItems,
  waLink,
}: Props) {
  const linkRowClass =
    "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium outline-none transition-colors hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <nav
      className="hidden items-center gap-1 md:flex"
      aria-label="Основная навигация"
    >
      <Link
        href="/"
        className={cn(
          navigationMenuTriggerStyle(),
          "no-underline hover:no-underline hover:text-primary",
        )}
      >
        Главная
      </Link>

      <NavigationMenu align="start" className="max-w-none">
        <NavigationMenuList className="gap-0">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Услуги</NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[260px] p-2">
              <ul className="flex flex-col gap-0.5">
                {categories.map((cat) => {
                  const slug = cat.slug.current;
                  const Icon = iconForCategorySlug(slug);
                  const href = `/${slug}`;
                  return (
                    <li key={cat._id}>
                      <NavigationMenuLink
                        closeOnClick
                        render={
                          <Link href={href} className={linkRowClass}>
                            <Icon
                              className="mt-0.5 size-5 shrink-0 text-primary"
                              aria-hidden
                            />
                            <span className="flex flex-col gap-0.5">
                              <span>{cat.title}</span>
                              {cat.description ? (
                                <span className="line-clamp-2 text-xs font-normal text-muted-foreground">
                                  {cat.description}
                                </span>
                              ) : null}
                            </span>
                          </Link>
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Ещё</NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[240px] p-2">
              <ul className="flex flex-col gap-0.5">
                {standaloneItems.map((item) => {
                  const Icon = iconForStandaloneSlug(item.slug);
                  return (
                    <li key={item.href}>
                      <NavigationMenuLink
                        closeOnClick
                        render={
                          <Link href={item.href} className={linkRowClass}>
                            <Icon
                              className="mt-0.5 size-5 shrink-0 text-primary"
                              aria-hidden
                            />
                            <span>{item.label}</span>
                          </Link>
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Link
        href="/ceny"
        className={cn(
          navigationMenuTriggerStyle(),
          "no-underline hover:no-underline hover:text-primary",
        )}
      >
        Цены
      </Link>

      <Link
        href="/kontakty"
        className={cn(
          navigationMenuTriggerStyle(),
          "no-underline hover:no-underline hover:text-primary",
        )}
      >
        Контакты
      </Link>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ size: "sm" }),
          "ml-2 gap-2 rounded-full px-4 shadow-sm",
        )}
      >
        <MessageCircle className="size-4" aria-hidden />
        WhatsApp
      </a>
    </nav>
  );
}
