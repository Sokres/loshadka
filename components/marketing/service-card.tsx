import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Clock, Route } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  title: string;
  excerpt: string;
  durationHours?: number | null;
  distanceKm?: string | null;
  /** Локальные фото из `public/images/routes` (обложка + счётчик). */
  galleryPaths?: readonly string[];
  /** На главной: крупная плитка bento-сетки. */
  variant?: "default" | "featured";
};

export function ServiceCard({
  href,
  title,
  excerpt,
  durationHours,
  distanceKm,
  galleryPaths,
  variant = "default",
}: Props) {
  const featured = variant === "featured";
  const coverSrc = galleryPaths?.[0];
  const extraCount = galleryPaths && galleryPaths.length > 1 ? galleryPaths.length - 1 : 0;

  return (
    <Link
      href={href}
      className={cn(
        "group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      <Card
        className={cn(
          "h-full overflow-hidden rounded-2xl border border-border/70 bg-card p-0 shadow-sm transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/8",
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
            {extraCount > 0 ? (
              <span className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                +{extraCount} фото
              </span>
            ) : null}
          </div>
        ) : null}
        <CardHeader className={cn("gap-2 px-6 pt-6", featured && "gap-3 sm:px-8 sm:pt-8")}>
          <CardTitle
            className={cn(
              "flex items-start justify-between gap-2 leading-snug",
              featured ? "text-xl sm:text-2xl" : "text-lg",
            )}
          >
            <span className="transition-colors group-hover:text-primary">{title}</span>
            <ArrowRight className="mt-1 size-4 shrink-0 opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
          </CardTitle>
          <CardDescription className="line-clamp-3 text-base leading-relaxed">
            {excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 px-6 pb-6">
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
        </CardContent>
      </Card>
    </Link>
  );
}
