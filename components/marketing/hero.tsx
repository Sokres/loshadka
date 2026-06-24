"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, MessageCircle } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/contact";
import { HOME_PRIMARY_WHATSAPP_MESSAGE } from "@/lib/marketing/contact-prompts";
import { HERO_FEATURES } from "@/lib/marketing/hero-features";
import type { HeroSlide } from "@/lib/marketing/hero-slides";

const AUTOPLAY_MS = 6000;

type Props = {
  title: string;
  subtitle: string;
  whatsappPhone: string;
  slides: readonly HeroSlide[];
};

export function Hero({ title, subtitle, whatsappPhone, slides }: Props) {
  const wa = whatsappHref(whatsappPhone, HOME_PRIMARY_WHATSAPP_MESSAGE);

  const validSlides = slides.filter((s) => s.src?.trim());
  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduce = () => setReducedMotion(mqReduce.matches);
    syncReduce();
    mqReduce.addEventListener("change", syncReduce);
    return () => mqReduce.removeEventListener("change", syncReduce);
  }, []);

  useEffect(() => {
    if (validSlides.length <= 1 || reducedMotion || pause) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % validSlides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [validSlides.length, reducedMotion, pause]);

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % validSlides.length) + validSlides.length) % validSlides.length);
    },
    [validSlides.length],
  );

  const slideCount = validSlides.length || 1;
  const slideLabel = `${String(index + 1).padStart(2, "0")} / ${String(slideCount).padStart(2, "0")}`;

  return (
    <section
      className="relative isolate min-h-[520px] overflow-hidden md:min-h-[580px] lg:min-h-[640px]"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onFocusCapture={() => setPause(true)}
      onBlurCapture={(ev) => {
        if (!ev.currentTarget.contains(ev.relatedTarget)) setPause(false);
      }}
    >
      <div className="absolute inset-0 z-0">
        {validSlides.length > 0 ? (
          validSlides.map((slide, i) => (
            <div
              key={slide.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none",
                i === index ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={i !== index}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-primary/40" aria-hidden />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-28 sm:px-6 md:pb-20 md:pt-32 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-24">
        <div className="max-w-xl lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[13px] font-medium text-white/95 backdrop-blur-sm">
            <MapPin className="size-3.5" aria-hidden />
            Туры и прогулки на полуострове
          </span>
          <h1 className="mt-5 text-balance font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            {title}
          </h1>
          <p className="mt-4 max-w-lg text-pretty text-base text-white/85 md:text-lg">{subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 bg-white text-primary hover:bg-white/90 sm:min-w-[220px]",
              )}
            >
              <MessageCircle className="size-5" aria-hidden />
              Написать в WhatsApp
            </a>
            <Link
              href="/kontakty"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:min-w-[220px]",
              )}
            >
              Контакты и как добраться
            </Link>
          </div>

          {validSlides.length > 1 ? (
            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm font-medium tabular-nums text-white/80">{slideLabel}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Предыдущий слайд"
                  className="flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
                  onClick={() => goTo(index - 1)}
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label="Следующий слайд"
                  className="flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/20"
                  onClick={() => goTo(index + 1)}
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="hidden grid-cols-2 gap-3 lg:col-span-5 lg:grid">
          {HERO_FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-white/15 bg-black/30 p-4 backdrop-blur-sm"
            >
              <feature.icon className="size-5 text-white/90" aria-hidden />
              <p className="mt-2 text-sm font-semibold text-white">{feature.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/75">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
