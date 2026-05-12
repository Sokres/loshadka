"use client";

import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Users,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/contact";
import { HOME_PRIMARY_WHATSAPP_MESSAGE } from "@/lib/marketing/contact-prompts";
import type { HeroSlide } from "@/lib/marketing/hero-slides";
import { renderHeroTitle } from "@/lib/marketing/hero-title";

const HERO_NOISE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.52'/%3E%3C/svg%3E";

const AUTOPLAY_MS = 6000;

const PARALLAX_MAX_PX = 4;

function HeroMountainDecoration({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-full max-w-xs text-primary/45 dark:text-primary/40", className)}
      viewBox="0 0 320 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 42 L52 14 L78 26 L118 8 L154 34 L188 18 L226 38 L268 12 L316 44"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="118" cy="8" r="2.25" fill="currentColor" opacity="0.85" />
      <circle cx="188" cy="18" r="2.25" fill="currentColor" opacity="0.85" />
      <circle cx="268" cy="12" r="2.25" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

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
  const [finePointer, setFinePointer] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqFine = window.matchMedia("(pointer: fine)");
    const syncReduce = () => setReducedMotion(mqReduce.matches);
    const syncFine = () => setFinePointer(mqFine.matches);
    syncReduce();
    syncFine();
    mqReduce.addEventListener("change", syncReduce);
    mqFine.addEventListener("change", syncFine);
    return () => {
      mqReduce.removeEventListener("change", syncReduce);
      mqFine.removeEventListener("change", syncFine);
    };
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

  const next = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

  const prev = useCallback(() => {
    goTo(index - 1);
  }, [goTo, index]);

  const resetParallax = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  const handleHeroMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!finePointer || reducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / Math.max(rect.width / 2, 1);
      const ny = (e.clientY - cy) / Math.max(rect.height / 2, 1);
      const x = Math.max(-1, Math.min(1, nx)) * PARALLAX_MAX_PX;
      const y = Math.max(-1, Math.min(1, ny)) * PARALLAX_MAX_PX;
      setParallax({ x, y });
    },
    [finePointer, reducedMotion],
  );

  const activeCaption = validSlides[index]?.caption?.trim();

  return (
    <section
      className="relative isolate min-h-[460px] overflow-hidden rounded-b-[2rem] bg-muted shadow-inner"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => {
        setPause(false);
        resetParallax();
      }}
      onMouseMove={handleHeroMouseMove}
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
                "absolute inset-0 transition-opacity duration-1100 ease-out motion-reduce:transition-none",
                i === index ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={i !== index}
            >
              <Image
                key={reducedMotion ? slide.src : `${slide.src}-${index}`}
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className={cn(
                  "object-cover brightness-[0.68] saturate-[1.05]",
                  i === index && !reducedMotion && "animate-hero-kenburns",
                )}
                sizes="100vw"
              />
            </div>
          ))
        ) : (
          <div
            className="absolute inset-0 bg-linear-to-br from-primary/26 via-background to-teal-950/16"
            aria-hidden
          />
        )}
      </div>

      <div
        className={cn(
          "hero-aurora-layer pointer-events-none absolute inset-0 z-1 mix-blend-soft-light",
          !reducedMotion && "animate-hero-aurora",
        )}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-2 opacity-[0.045] mix-blend-soft-light"
        style={{ backgroundImage: `url("${HERO_NOISE_SVG}")` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-2 bg-linear-to-t from-background/45 via-transparent to-background/28"
        aria-hidden
      />

      <div className="relative z-3 mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div
          ref={cardRef}
          style={{
            transform:
              finePointer && !reducedMotion
                ? `translate(${parallax.x}px, ${parallax.y}px)`
                : undefined,
          }}
          className={cn(
            "max-w-2xl rounded-2xl border border-white/25 bg-background/88 p-6 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.35)] ring-1 ring-white/15 backdrop-blur-md transition-[transform] duration-200 ease-out motion-reduce:transform-none sm:p-10 lg:col-span-7",
          )}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/9 px-3 py-1.5 text-[13px] font-medium leading-none text-primary">
            <MapPin className="size-3.5 opacity-90" aria-hidden />
            Камчатка — туры и прогулки
          </span>
          <HeroMountainDecoration className="mt-5" />
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {renderHeroTitle(title)}
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 rounded-full px-6 shadow-md")}
            >
              <MessageCircle className="size-5" aria-hidden />
              Написать в WhatsApp
            </a>
            <Link
              href="/kontakty"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-background/40 bg-background/50 backdrop-blur-sm",
              )}
            >
              Контакты и как добраться
            </Link>
          </div>
        </div>

        <aside
          className="hidden flex-col gap-3 lg:col-span-4 lg:col-start-9 lg:flex xl:gap-4"
          aria-label="Сезон и формат"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            В сезоне
          </p>
          <div className="flex flex-col gap-2.5">
            <span className="flex items-center gap-3 rounded-2xl border border-white/20 bg-black/28 px-4 py-3 text-sm font-medium text-white shadow-md backdrop-blur-md">
              <CalendarRange className="size-5 shrink-0 text-primary-foreground/90" aria-hidden />
              Июнь — середина октября
            </span>
            <span className="flex items-center gap-3 rounded-2xl border border-white/20 bg-black/28 px-4 py-3 text-sm font-medium text-white shadow-md backdrop-blur-md">
              <Users className="size-5 shrink-0 text-primary-foreground/90" aria-hidden />
              Группы по записи, без толпы
            </span>
            <span className="flex items-center gap-3 rounded-2xl border border-white/20 bg-black/28 px-4 py-3 text-sm font-medium text-white shadow-md backdrop-blur-md">
              <MapPin className="size-5 shrink-0 text-primary-foreground/90" aria-hidden />
              Маршрут под ваш уровень
            </span>
          </div>
        </aside>
      </div>

      {activeCaption && validSlides.length > 0 ? (
        <div
          className="pointer-events-none absolute bottom-17 left-4 z-5 max-w-[min(90vw,18rem)] md:bottom-19 md:left-8"
          aria-live="polite"
        >
          <p className="rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-[13px] font-medium text-white/95 shadow-lg backdrop-blur-md">
            {activeCaption}
          </p>
        </div>
      ) : null}

      {validSlides.length > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-4 flex justify-center bg-linear-to-t from-black/40 via-black/10 to-transparent pb-5 pt-16 md:pb-6 md:pt-20">
            <div
              className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-2 py-1.5 backdrop-blur-md"
              role="tablist"
              aria-label="Слайды главного экрана"
            >
              {validSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Показать слайд ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 outline-none motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-white/95 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
                    i === index ? "w-8 bg-white/95" : "w-2 bg-white/45 hover:bg-white/70",
                  )}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-4 hidden items-center justify-between px-2 md:flex md:px-4">
            <button
              type="button"
              aria-label="Предыдущий слайд"
              className="pointer-events-auto rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm transition outline-none hover:bg-black/45 focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
              onClick={prev}
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Следующий слайд"
              className="pointer-events-auto rounded-full border border-white/20 bg-black/30 p-2 text-white backdrop-blur-sm transition outline-none hover:bg-black/45 focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
              onClick={next}
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </div>
        </>
      ) : null}
    </section>
  );
}
