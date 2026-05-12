import { createClient, type SanityClient } from "next-sanity";

const apiVersion = "2025-05-01";

export function getSanityClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;

  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
}
