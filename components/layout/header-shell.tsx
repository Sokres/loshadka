"use client";

import { usePathname } from "next/navigation";

import type { ServiceCategoryDTO } from "@/lib/cms/types-and-fallback";

import { SiteHeader } from "./site-header";

type Props = {
  siteTitle: string;
  tagline?: string | null;
  whatsappPhone: string;
  categories: ServiceCategoryDTO[];
  socialVk?: string | null;
  socialInstagram?: string | null;
  socialTelegram?: string | null;
};

export function HeaderShell(props: Props) {
  const pathname = usePathname();
  const overlay = pathname === "/";

  return <SiteHeader {...props} overlay={overlay} />;
}
