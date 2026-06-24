"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Heart,
  MapPin,
  MessageCircle,
  Play,
  Shield,
  type LucideIcon,
} from "lucide-react";

import type { SiteSettingsDTO } from "@/lib/cms/types-and-fallback";
import { toVideoEmbedUrl } from "@/lib/marketing/video-embed";
import { cn } from "@/lib/utils";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: Shield,
    title: "Безопасность",
    description: "Спокойные лошади, инструктаж перед выездом и сопровождение инструкторов",
  },
  {
    icon: MapPin,
    title: "Маршруты полуострова",
    description: "От берега Авачи до океана — соберём программу под сезон и ваш уровень",
  },
  {
    icon: MessageCircle,
    title: "Живой контакт",
    description: "Запись в WhatsApp или звонок — ответим по датам без длинных форм",
  },
  {
    icon: Heart,
    title: "Забота о животных",
    description: "Лошади ухожены, темп комфортный — мы любим своё дело и природу",
  },
];

function FeatureItem({ icon: Icon, title, description }: Feature) {
  return (
    <div className="flex gap-4 rounded-xl p-2">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function VideoBlock({
  videoUrl,
  posterUrl,
}: {
  videoUrl?: string | null;
  posterUrl?: string | null;
}) {
  const [playing, setPlaying] = useState(false);

  if (!videoUrl && !posterUrl) return null;

  if (playing && videoUrl) {
    const embedUrl = toVideoEmbedUrl(videoUrl);
    if (!embedUrl) return null;
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-md">
        <iframe
          src={embedUrl}
          title="Как мы работаем"
          className="absolute inset-0 size-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => videoUrl && setPlaying(true)}
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-2xl bg-muted shadow-md outline-none",
        videoUrl &&
          "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      )}
      disabled={!videoUrl}
      aria-label={videoUrl ? "Посмотреть видео" : undefined}
    >
      {posterUrl ? (
        <Image
          src={posterUrl}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 480px"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-primary/10" />
      )}
      <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />
      {videoUrl ? (
        <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg transition group-hover:scale-105">
          <Play className="ml-0.5 size-6 fill-primary" aria-hidden />
        </span>
      ) : null}
      <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-4 py-4 text-left text-sm font-medium text-white">
        Посмотрите, как мы работаем
      </span>
    </button>
  );
}

export function HomeWhyUsSection({ settings }: { settings: SiteSettingsDTO }) {
  const hasVideo = Boolean(settings.promoVideoUrl || settings.promoVideoPosterUrl);

  return (
    <section className="bg-muted/50 px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
            О нас
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Ваш комфорт и безопасность — наш приоритет
          </h2>
        </div>

        <div
          className={cn(
            "mt-10 grid gap-10",
            hasVideo ? "lg:grid-cols-2 lg:items-start lg:gap-12" : "max-w-3xl",
          )}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <FeatureItem key={feature.title} {...feature} />
            ))}
          </div>
          {hasVideo ? (
            <VideoBlock
              videoUrl={settings.promoVideoUrl}
              posterUrl={settings.promoVideoPosterUrl ?? undefined}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
