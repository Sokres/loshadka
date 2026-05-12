import type { MetadataRoute } from "next";

import {
  loadStaticNestedSegments,
  loadStaticRootSegments,
} from "@/lib/cms/loaders";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const [roots, nested] = await Promise.all([
    loadStaticRootSegments(),
    loadStaticNestedSegments(),
  ]);

  const routes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/ceny`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/kontakty`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/politika`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  for (const r of roots) {
    routes.push({
      url: `${base}/${r.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  for (const n of nested) {
    routes.push({
      url: `${base}/${n.slug}/${n.serviceSlug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  return routes;
}
