import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/service-detail";
import {
  loadCategoryBySlug,
  loadNestedService,
  loadSiteSettings,
  loadStaticNestedSegments,
} from "@/lib/cms/loaders";
import { getSiteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string; serviceSlug: string }> };

export async function generateStaticParams() {
  return loadStaticNestedSegments();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, serviceSlug } = await params;
  const service = await loadNestedService(slug, serviceSlug);

  if (!service) return {};

  const base = getSiteUrl();

  return {
    title: service.seoTitle ?? service.title,
    description: service.seoDescription ?? service.excerpt,
    alternates: { canonical: `${base}/${slug}/${serviceSlug}` },
  };
}

export default async function NestedServicePage({ params }: Props) {
  const { slug, serviceSlug } = await params;
  const [category, service, settings] = await Promise.all([
    loadCategoryBySlug(slug),
    loadNestedService(slug, serviceSlug),
    loadSiteSettings(),
  ]);

  if (!category || !service) notFound();

  return (
    <main>
      <ServiceDetail
        service={service}
        whatsappPhone={settings.whatsappPhone}
        phoneTel={settings.phoneTel}
      />
    </main>
  );
}
