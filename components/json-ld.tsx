import { getSiteUrl } from "@/lib/site";
import type { SiteSettingsDTO } from "@/lib/cms/types-and-fallback";

export function LocalBusinessJsonLd({ settings }: { settings: SiteSettingsDTO }) {
  const base = getSiteUrl();

  const payload: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: settings.siteTitle,
    url: base,
    telephone: settings.phoneTel,
  };

  const description = settings.tagline ?? settings.defaultMetaDescription;
  if (description) payload.description = description;

  if (settings.address) {
    payload.address = {
      "@type": "PostalAddress",
      addressCountry: "RU",
      streetAddress: settings.address,
    };
  }

  if (settings.geoLat != null && settings.geoLng != null) {
    payload.geo = {
      "@type": "GeoCoordinates",
      latitude: settings.geoLat,
      longitude: settings.geoLng,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
