"use client";

import Script from "next/script";
import { useId } from "react";

import { YANDEX_CONSTRUCTOR_UM } from "@/lib/marketing/yandex-constructor";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Как в коде конструктора (виджет задаёт высоту области карты). */
  heightPx?: number;
  strategy?: "afterInteractive" | "lazyOnload";
};

function buildConstructorScriptSrc(containerId: string, heightPx: number): string {
  const params = new URLSearchParams({
    um: YANDEX_CONSTRUCTOR_UM,
    width: "1280",
    height: String(heightPx),
    lang: "ru_RU",
    scroll: "true",
    id: containerId,
  });
  return `https://api-maps.yandex.ru/services/constructor/1.0/js/?${params.toString()}`;
}

export function YandexConstructorMap({
  className,
  heightPx = 400,
  strategy = "lazyOnload",
}: Props) {
  const containerId = `ym-${useId().replace(/:/g, "")}`;
  const scriptSrc = buildConstructorScriptSrc(containerId, heightPx);

  return (
    <div className={cn("relative w-full overflow-hidden rounded-2xl border border-border/60 shadow-sm", className)}>
      <div
        id={containerId}
        className="w-full bg-muted"
        style={{ minHeight: `${heightPx}px` }}
        aria-label="Карта: как нас найти"
      />
      <Script src={scriptSrc} strategy={strategy} />
    </div>
  );
}
