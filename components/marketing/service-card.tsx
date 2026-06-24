import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight, Clock, Route } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  title: string;
  excerpt: string;
  durationHours?: number | null;
  distanceKm?: string | null;
  durationLabel?: string | null;
  levelLabel?: string | null;
  isPopular?: boolean | null;
  galleryPaths?: readonly string[];
  variant?: "default" | "featured" | "direction";
};

export function ServiceCard({
  href,
  title,
  excerpt,
  durationHours,
  distanceKm,
  durationLabel,
  levelLabel,
  isPopular,
  galleryPaths,
  variant = "default",
}: Props) {
  const direction = variant === "direction";
  const coverSrc = galleryPaths?.[0];

  if (direction) {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={`${title} — фото`}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : null}
          {isPopular ? (
            <Badge className="absolute top-3 left-3 border-0 bg-primary text-primary-foreground">
              Популярно
            </Badge>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-heading text-xl font-semibold tracking-tight transition group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {excerpt}
          </p>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div className="text-xs text-muted-foreground">
              {durationLabel ? <p>{durationLabel}</p> : null}
              {levelLabel ? <p className="mt-0.5">{levelLabel}</p> : null}
            </div>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition group-hover:bg-primary/90">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  const featured = variant === "featured";

  const cardInner = (
    <div
      className={cn(
        "h-full overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg",
        featured && "shadow-md",
      )}
    >
      {coverSrc ? (
        <div
          className={cn(
            "relative w-full overflow-hidden bg-muted",
            featured ? "aspect-5/4 min-h-50 sm:min-h-64" : "aspect-video",
          )}
        >
          <Image
            src={coverSrc}
            alt={`${title} — фото маршрута`}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 55vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />
        </div>
      ) : null}
      <div className={cn("px-6 pt-6", featured && "sm:px-8 sm:pt-8")}>
        <h3
          className={cn(
            "font-semibold leading-snug",
            featured ? "text-xl sm:text-2xl" : "text-lg",
          )}
        >
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-base leading-relaxed text-muted-foreground">
          {excerpt}
        </p>
      </div>
      {durationHours || distanceKm ? (
        <div className="flex flex-wrap gap-2 px-6 pb-6 pt-2">
          {durationHours ? (
            <Badge variant="secondary" className="gap-1 font-normal">
              <Clock className="size-3.5" />
              ~{durationHours} ч
            </Badge>
          ) : null}
          {distanceKm ? (
            <Badge variant="outline" className="gap-1 font-normal">
              <Route className="size-3.5" />
              {distanceKm}
            </Badge>
          ) : null}
        </div>
      ) : (
        <div className="px-6 pb-6 pt-4" />
      )}
    </div>
  );

  return (
    <Link
      href={href}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {cardInner}
    </Link>
  );
}
