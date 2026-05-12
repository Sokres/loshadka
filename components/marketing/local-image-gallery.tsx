import Image from "next/image";

import { cn } from "@/lib/utils";

type Layout = "grid" | "featured" | "ribbon";

export function LocalImageGallery({
  paths,
  altBase,
  layout = "grid",
  className,
}: {
  paths: readonly string[];
  altBase: string;
  layout?: Layout;
  className?: string;
}) {
  if (!paths.length) return null;

  if (layout === "ribbon") {
    return (
      <div
        className={cn(
          "flex gap-3 overflow-x-auto pb-2 scrollbar-none [-ms-overflow-style:none] snap-x snap-mandatory md:grid md:snap-none md:grid-cols-2 md:overflow-visible lg:grid-cols-3 [&::-webkit-scrollbar]:hidden",
          className,
        )}
      >
        {paths.map((src, index) => (
          <figure
            key={src}
            className="relative aspect-video w-[min(88vw,19rem)] shrink-0 snap-center overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm md:w-auto"
          >
            <Image
              src={src}
              alt={`${altBase} — фото ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 88vw, 33vw"
            />
          </figure>
        ))}
      </div>
    );
  }

  if (layout === "featured") {
    if (paths.length === 1) {
      return (
        <figure
          className={cn(
            "relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-md",
            className,
          )}
        >
          <Image
            src={paths[0]}
            alt={`${altBase} — фото`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 42rem"
          />
        </figure>
      );
    }

    if (paths.length === 2) {
      return (
        <div className={cn("grid gap-3 sm:grid-cols-2", className)}>
          {paths.map((src, index) => (
            <figure
              key={src}
              className="relative aspect-video overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm"
            >
              <Image
                src={src}
                alt={`${altBase} — фото ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </figure>
          ))}
        </div>
      );
    }

    return (
      <div className={cn("flex flex-col gap-3", className)}>
        <figure className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-md md:aspect-2/1">
          <Image
            src={paths[0]}
            alt={`${altBase} — фото 1`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 72rem"
          />
        </figure>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {paths.slice(1).map((src, index) => (
            <figure
              key={src}
              className="relative aspect-video overflow-hidden rounded-xl border border-border/50 bg-muted shadow-sm"
            >
              <Image
                src={src}
                alt={`${altBase} — фото ${index + 2}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </figure>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {paths.map((src, index) => (
        <figure
          key={src}
          className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm"
        >
          <Image
            src={src}
            alt={`${altBase} — фото ${index + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </figure>
      ))}
    </div>
  );
}
