/**
 * Пути к статике после переноса из `img/` (латиница, без пробелов).
 * Оригиналы: seasonal ← `img/SEASONAL_TOURS/`, routes ← `img/heeroy_traavel/`.
 */
export const SITE_LOGO_PNG = "/brand/logo.png";

export const SEASONAL_IMAGES = {
  blizheKVulkanam: [
    "/images/seasonal/blizhe-k-vulkanam-01.jpg",
    "/images/seasonal/blizhe-k-vulkanam-02.jpg",
    "/images/seasonal/blizhe-k-vulkanam-03.jpg",
    "/images/seasonal/blizhe-k-vulkanam-04.jpg",
    "/images/seasonal/blizhe-k-vulkanam-05.jpg",
  ],
  talyeOzera: [
    "/images/seasonal/talye-ozera-01.jpg",
    "/images/seasonal/talye-ozera-02.jpg",
    "/images/seasonal/talye-ozera-03.jpg",
    "/images/seasonal/talye-ozera-04.jpg",
    "/images/seasonal/talye-ozera-05.jpg",
  ],
} as const;

/** Привязка slug услуги (CMS / fallback) к наборам `public/images/seasonal`. */
const SEASONAL_SLUG_TO_IMAGES: Record<string, readonly string[]> = {
  "blizhe-k-vulkanam": SEASONAL_IMAGES.blizheKVulkanam,
  "talye-ozera-koryakskiy": SEASONAL_IMAGES.talyeOzera,
};

export function seasonalStaticGalleryPaths(serviceSlug: string): readonly string[] | undefined {
  const paths = SEASONAL_SLUG_TO_IMAGES[serviceSlug];
  return paths?.length ? paths : undefined;
}

export const ROUTE_GALLERY_IMAGES = {
  hotSprings: [
    "/images/routes/hot-springs-01.jpg",
    "/images/routes/hot-springs-02.jpg",
    "/images/routes/hot-springs-03.jpg",
    "/images/routes/hot-springs-04.jpg",
  ],
  oceanDay: [
    "/images/routes/ocean-day-01.jpeg",
    "/images/routes/ocean-day-02.jpeg",
    "/images/routes/ocean-day-03.jpeg",
    "/images/routes/ocean-day-04.jpeg",
  ],
  twoHourChoice: ["/images/routes/two-hour-choice.jpg"],
  blueLakes: ["/images/routes/blue-lakes-01.jpg", "/images/routes/blue-lakes-02.jpg"],
  khalchDogKennel: [
    "/images/routes/khalch-dog-kennel-01.jpg",
    "/images/routes/khalch-dog-kennel-02.jpg",
  ],
  sokochLakes: [
    "/images/routes/sokoch-lakes-01.jpg",
    "/images/routes/sokoch-lakes-02.jpg",
    "/images/routes/sokoch-lakes-03.jpg",
  ],
  avachaRiver: ["/images/routes/avacha-river-01.jpg"],
  ostray: ["/images/routes/ostray-route-01.jpg"],
} as const;

/** Slug услуги из CMS / fallback → набор `public/images/routes` (конные прогулки). */
const ROUTE_SERVICE_SLUG_TO_IMAGES: Record<string, readonly string[]> = {
  "konnaya-progulka-k-reke-avacha": ROUTE_GALLERY_IMAGES.avachaRiver,
  "progulka-verhom-2-chasa": ROUTE_GALLERY_IMAGES.twoHourChoice,
  "marshrut-halch-sobakolen": ROUTE_GALLERY_IMAGES.khalchDogKennel,
  "vodopad-na-goru-ostraya": ROUTE_GALLERY_IMAGES.ostray,
  "golubye-ozera": ROUTE_GALLERY_IMAGES.blueLakes,
  "sokochinskie-ozera": ROUTE_GALLERY_IMAGES.sokochLakes,
  "bolshe-bannye-istochniki-3-dnya": ROUTE_GALLERY_IMAGES.hotSprings,
  "progulki-na-okean": ROUTE_GALLERY_IMAGES.oceanDay,
};

export function routeStaticGalleryPaths(serviceSlug: string): readonly string[] | undefined {
  const paths = ROUTE_SERVICE_SLUG_TO_IMAGES[serviceSlug];
  return paths?.length ? paths : undefined;
}

/** Статические фото для страниц обучения (`public/images/obuchenie`). */
const OBUCHENIE_SERVICE_SLUG_TO_IMAGES: Record<string, readonly string[]> = {
  "individualnoe-obuchenie": [
    "/images/obuchenie/individualnoe-obuchenie-01.jpg",
    "/images/obuchenie/individualnoe-obuchenie-02.jpg",
  ],
};

export function obuchenieStaticGalleryPaths(serviceSlug: string): readonly string[] | undefined {
  const paths = OBUCHENIE_SERVICE_SLUG_TO_IMAGES[serviceSlug];
  return paths?.length ? paths : undefined;
}

/** Обложки направлений на главной (slug категории из CMS / fallback). */
const CATEGORY_HOME_SLUG_TO_IMAGES: Record<string, readonly string[]> = {
  progulki: [ROUTE_GALLERY_IMAGES.oceanDay[0], ROUTE_GALLERY_IMAGES.avachaRiver[0]],
  sezonnye: [SEASONAL_IMAGES.blizheKVulkanam[0], SEASONAL_IMAGES.talyeOzera[0]],
  obuchenie: [...(OBUCHENIE_SERVICE_SLUG_TO_IMAGES["individualnoe-obuchenie"] ?? [])],
};

export function categoryHomeCoverPaths(categorySlug: string): readonly string[] | undefined {
  const paths = CATEGORY_HOME_SLUG_TO_IMAGES[categorySlug];
  return paths?.length ? paths : undefined;
}
