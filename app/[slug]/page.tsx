import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceCard } from "@/components/marketing/service-card";
import { SeasonalCategoryHub } from "@/components/marketing/seasonal-category-hub";
import { ServiceDetail } from "@/components/service-detail";
import {
  loadCategoryBySlug,
  loadServicesForCategorySlug,
  loadSiteSettings,
  loadStandaloneService,
  loadStaticRootSegments,
} from "@/lib/cms/loaders";
import { getSiteUrl } from "@/lib/site";
import {
  obuchenieStaticGalleryPaths,
  routeStaticGalleryPaths,
} from "@/lib/marketing/site-assets";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return loadStaticRootSegments();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [category, service, settings] = await Promise.all([
    loadCategoryBySlug(slug),
    loadStandaloneService(slug),
    loadSiteSettings(),
  ]);

  const base = getSiteUrl();

  if (category) {
    return {
      title: category.title,
      description: category.description ?? settings.defaultMetaDescription ?? undefined,
      alternates: { canonical: `${base}/${slug}` },
    };
  }

  if (service) {
    return {
      title: service.seoTitle ?? service.title,
      description: service.seoDescription ?? service.excerpt,
      alternates: { canonical: `${base}/${slug}` },
    };
  }

  return {};
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const settings = await loadSiteSettings();

  const category = await loadCategoryBySlug(slug);
  if (category) {
    const services = await loadServicesForCategorySlug(category.slug.current);

    if (category.slug.current === "sezonnye") {
      return (
        <SeasonalCategoryHub
          category={category}
          services={services}
          whatsappPhone={settings.whatsappPhone}
          phoneTel={settings.phoneTel}
        />
      );
    }

    return (
      <main>
        <section className="border-b bg-muted/40 px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Турзона «Лошадка»
            </p>
            <h1 className="mt-2 text-balance text-3xl font-semibold md:text-4xl">
              {category.title}
            </h1>
            {category.description ? (
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                {category.description}
              </p>
            ) : null}
          </div>
        </section>
        <section className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard
              key={s._id}
              href={`/${category.slug.current}/${s.slug.current}`}
              title={s.title}
              excerpt={s.excerpt}
              durationHours={s.durationHours}
              distanceKm={s.distanceKm}
              galleryPaths={
                category.slug.current === "progulki"
                  ? routeStaticGalleryPaths(s.slug.current)
                  : category.slug.current === "obuchenie"
                    ? obuchenieStaticGalleryPaths(s.slug.current)
                    : undefined
              }
            />
          ))}
        </section>
      </main>
    );
  }

  const standalone = await loadStandaloneService(slug);
  if (standalone) {
    return (
      <main>
        <ServiceDetail
          service={standalone}
          whatsappPhone={settings.whatsappPhone}
          phoneTel={settings.phoneTel}
        />
      </main>
    );
  }

  notFound();
}
