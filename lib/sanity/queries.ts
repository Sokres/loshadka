import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteTitle,
    tagline,
    phoneDisplay,
    phoneTel,
    whatsappPhone,
    address,
    geoLat,
    geoLng,
    defaultMetaDescription
  }
`;

export const categoriesQuery = groq`
  *[_type == "serviceCategory"] | order(order asc) {
    _id,
    title,
    slug,
    description
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "serviceCategory" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description
  }
`;

export const servicesByCategorySlugQuery = groq`
  *[
    _type == "service"
    && category->slug.current == $slug
    && (!defined(standaloneRoute) || standaloneRoute == false)
  ] | order(title asc) {
    _id,
    title,
    slug,
    excerpt,
    durationHours,
    distanceKm,
    difficulty,
    seasonNote,
    standaloneRoute,
    category->{slug},
    highlights,
    gallery[]{ ..., asset-> }
  }
`;

export const nestedServiceQuery = groq`
  *[
    _type == "service"
    && slug.current == $serviceSlug
    && category->slug.current == $categorySlug
    && (!defined(standaloneRoute) || standaloneRoute == false)
  ][0]{
    _id,
    title,
    slug,
    excerpt,
    standaloneRoute,
    category->{slug},
    body,
    durationHours,
    distanceKm,
    difficulty,
    seasonNote,
    highlights,
    packingTips,
    gallery[]{ ..., asset-> },
    faq,
    seoTitle,
    seoDescription
  }
`;

export const standaloneServiceQuery = groq`
  *[
    _type == "service"
    && slug.current == $slug
    && standaloneRoute == true
  ][0]{
    _id,
    title,
    slug,
    excerpt,
    standaloneRoute,
    category->{slug},
    body,
    durationHours,
    distanceKm,
    difficulty,
    seasonNote,
    highlights,
    packingTips,
    gallery[]{ ..., asset-> },
    faq,
    seoTitle,
    seoDescription
  }
`;

export const reviewsQuery = groq`
  *[_type == "review"] | order(order asc, publishedAt desc) [0...12]{
    _id,
    authorName,
    quote,
    publishedAt,
    rating
  }
`;

export const categorySlugPathsQuery = groq`
  *[_type == "serviceCategory"].slug.current
`;

export const standaloneSlugPathsQuery = groq`
  *[_type == "service" && standaloneRoute == true].slug.current
`;

export const nestedPathsQuery = groq`
  *[
    _type == "service"
    && (!defined(standaloneRoute) || standaloneRoute == false)
    && defined(category)
  ]{
    "slug": category->slug.current,
    "serviceSlug": slug.current
  }
`;
