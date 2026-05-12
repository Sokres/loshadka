import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

import { getSanityClient } from "./client";

export function sanityImageUrl(source: SanityImageSource, width: number) {
  const client = getSanityClient();

  const builder = client
    ? imageUrlBuilder(client)
    : imageUrlBuilder({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder",
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      });

  try {
    return builder.image(source).width(width).quality(85).auto("format").url();
  } catch {
    return undefined;
  }
}
