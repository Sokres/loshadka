import Image from "next/image";

type GalleryAsset = {
  asset?: {
    _id?: string;
    url?: string;
  } | null;
};

export function ServiceGallery({ images }: { images: unknown[] | undefined }) {
  if (!images?.length) return null;

  const normalized = images.filter(Boolean) as GalleryAsset[];

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {normalized.map((img, index) => {
        const src = img.asset?.url;

        if (!src) return null;

        return (
          <div
            key={img.asset?._id ?? `${src}-${index}`}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
