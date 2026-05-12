import type {
  ReviewDTO,
  ServiceCategoryDTO,
  ServiceDTO,
  SiteSettingsDTO,
} from "@/lib/cms/types-and-fallback";
import {
  FALLBACK_CATEGORIES,
  FALLBACK_REVIEWS,
  FALLBACK_SERVICES,
  FALLBACK_SITE,
} from "@/lib/cms/types-and-fallback";
import { getSanityClient } from "@/lib/sanity/client";
import {
  categoriesQuery,
  categoryBySlugQuery,
  categorySlugPathsQuery,
  nestedPathsQuery,
  nestedServiceQuery,
  reviewsQuery,
  servicesByCategorySlugQuery,
  siteSettingsQuery,
  standaloneServiceQuery,
  standaloneSlugPathsQuery,
} from "@/lib/sanity/queries";

export async function loadSiteSettings(): Promise<SiteSettingsDTO> {
  const client = getSanityClient();
  if (!client) return FALLBACK_SITE;

  const data = await client.fetch<SiteSettingsDTO | null>(siteSettingsQuery);
  return data ?? FALLBACK_SITE;
}

export async function loadCategories(): Promise<ServiceCategoryDTO[]> {
  const client = getSanityClient();
  if (!client) return FALLBACK_CATEGORIES;

  const data = await client.fetch<ServiceCategoryDTO[] | null>(categoriesQuery);
  return data?.length ? data : FALLBACK_CATEGORIES;
}

export async function loadCategoryBySlug(
  slug: string,
): Promise<ServiceCategoryDTO | null> {
  const client = getSanityClient();
  if (!client) {
    return FALLBACK_CATEGORIES.find((c) => c.slug.current === slug) ?? null;
  }

  const data = await client.fetch<ServiceCategoryDTO | null>(categoryBySlugQuery, {
    slug,
  });

  if (data) return data;

  return FALLBACK_CATEGORIES.find((c) => c.slug.current === slug) ?? null;
}

export async function loadServicesForCategorySlug(
  slug: string,
): Promise<ServiceDTO[]> {
  const client = getSanityClient();
  if (!client) {
    return FALLBACK_SERVICES.filter(
      (s) => !s.standaloneRoute && s.category?.slug.current === slug,
    );
  }

  const data = await client.fetch<ServiceDTO[] | null>(servicesByCategorySlugQuery, {
    slug,
  });

  if (data?.length) return data;

  return FALLBACK_SERVICES.filter(
    (s) => !s.standaloneRoute && s.category?.slug.current === slug,
  );
}

export async function loadNestedService(
  categorySlug: string,
  serviceSlug: string,
): Promise<ServiceDTO | null> {
  const client = getSanityClient();
  if (!client) {
    return (
      FALLBACK_SERVICES.find(
        (s) =>
          !s.standaloneRoute &&
          s.category?.slug.current === categorySlug &&
          s.slug.current === serviceSlug,
      ) ?? null
    );
  }

  const data = await client.fetch<ServiceDTO | null>(nestedServiceQuery, {
    categorySlug,
    serviceSlug,
  });

  if (data) return data;

  return (
    FALLBACK_SERVICES.find(
      (s) =>
        !s.standaloneRoute &&
        s.category?.slug.current === categorySlug &&
        s.slug.current === serviceSlug,
    ) ?? null
  );
}

export async function loadStandaloneService(slug: string): Promise<ServiceDTO | null> {
  const client = getSanityClient();
  if (!client) {
    return (
      FALLBACK_SERVICES.find((s) => s.standaloneRoute && s.slug.current === slug) ??
      null
    );
  }

  const data = await client.fetch<ServiceDTO | null>(standaloneServiceQuery, { slug });

  if (data) return data;

  return (
    FALLBACK_SERVICES.find((s) => s.standaloneRoute && s.slug.current === slug) ?? null
  );
}

export async function loadReviews(): Promise<ReviewDTO[]> {
  const client = getSanityClient();
  if (!client) return FALLBACK_REVIEWS;

  const data = await client.fetch<ReviewDTO[] | null>(reviewsQuery);
  return data?.length ? data : FALLBACK_REVIEWS;
}

export function getFeaturedStandaloneSlugs(): string[] {
  return ["kareta", "sani", "fotosessii", "arenda-besedki", "sertifikat"];
}

export async function loadFeaturedStandaloneServices(): Promise<ServiceDTO[]> {
  const slugs = getFeaturedStandaloneSlugs();
  const results: ServiceDTO[] = [];

  for (const slug of slugs) {
    const svc = await loadStandaloneService(slug);
    if (svc) results.push(svc);
  }

  return results;
}

function fallbackRootSlugs(): { slug: string }[] {
  const cats = FALLBACK_CATEGORIES.map((c) => ({ slug: c.slug.current }));
  const solo = FALLBACK_SERVICES.filter((s) => s.standaloneRoute).map((s) => ({
    slug: s.slug.current,
  }));
  return [...cats, ...solo];
}

function fallbackNestedSlugs(): { slug: string; serviceSlug: string }[] {
  return FALLBACK_SERVICES.filter((s) => !s.standaloneRoute && s.category).map((s) => ({
    slug: s.category!.slug.current,
    serviceSlug: s.slug.current,
  }));
}

export async function loadStaticRootSegments(): Promise<{ slug: string }[]> {
  const client = getSanityClient();
  if (!client) return fallbackRootSlugs();

  const [cats, stands] = await Promise.all([
    client.fetch<string[] | null>(categorySlugPathsQuery),
    client.fetch<string[] | null>(standaloneSlugPathsQuery),
  ]);

  const merged = [
    ...(cats ?? []).map((slug) => ({ slug })),
    ...(stands ?? []).map((slug) => ({ slug })),
  ];

  return merged.length ? merged : fallbackRootSlugs();
}

export async function loadStaticNestedSegments(): Promise<
  { slug: string; serviceSlug: string }[]
> {
  const client = getSanityClient();
  if (!client) return fallbackNestedSlugs();

  const rows = await client.fetch<{ slug: string; serviceSlug: string }[] | null>(
    nestedPathsQuery,
  );

  return rows?.length ? rows : fallbackNestedSlugs();
}
