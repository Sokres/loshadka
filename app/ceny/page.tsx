import type { Metadata } from "next";

import { PricingHub } from "@/components/marketing/pricing-hub";
import { getSiteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const base = getSiteUrl();
  return {
    title: "Цены",
    description:
      "Основные конные программы турзоны «Лошадка»: продолжительность, сложность и стоимость. Аренда беседок.",
    alternates: { canonical: `${base}/ceny` },
    openGraph: {
      title: "Цены — Турзона «Лошадка»",
      description:
        "Прайс на конные прогулки и маршруты на Камчатке, аренда тёплых беседок.",
      url: `${base}/ceny`,
      locale: "ru_RU",
      type: "website",
    },
  };
}

export default function PricesPage() {
  return <PricingHub />;
}
