"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

import { YANDEX_CONSTRUCTOR_UM } from "@/lib/marketing/yandex-constructor";
import { cn } from "@/lib/utils";

type Props = {
  containerId: string;
  className?: string;
  heightPx?: number;
  mobileHeightPx?: number;
  strategy?: "afterInteractive" | "lazyOnload";
};

function buildConstructorScriptSrc(
  containerId: string,
  widthPx: number,
  heightPx: number,
): string {
  const params = new URLSearchParams({
    um: YANDEX_CONSTRUCTOR_UM,
    width: String(Math.max(280, Math.round(widthPx))),
    height: String(heightPx),
    lang: "ru_RU",
    scroll: "true",
    id: containerId,
  });
  return `https://api-maps.yandex.ru/services/constructor/1.0/js/?${params.toString()}`;
}

export function YandexConstructorMap({
  containerId,
  className,
  heightPx = 400,
  mobileHeightPx = 280,
  strategy = "lazyOnload",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [widthPx, setWidthPx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const mq = window.matchMedia("(max-width: 767px)");
    const syncMobile = () => setIsMobile(mq.matches);
    syncMobile();
    mq.addEventListener("change", syncMobile);

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? el.clientWidth;
      if (w > 0) setWidthPx(w);
    });
    ro.observe(el);

    return () => {
      mq.removeEventListener("change", syncMobile);
      ro.disconnect();
    };
  }, []);

  const mapHeight = isMobile ? mobileHeightPx : heightPx;
  const scriptSrc =
    widthPx > 0 ? buildConstructorScriptSrc(containerId, widthPx, mapHeight) : null;

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative w-full max-w-full overflow-hidden rounded-2xl border border-border/60 shadow-sm",
        className,
      )}
    >
      <div
        id={containerId}
        className="w-full max-w-full overflow-hidden bg-muted [&_iframe]:max-w-full [&_iframe]:!w-full"
        style={{ height: `${mapHeight}px` }}
        aria-label="Карта: как нас найти"
      />
      {scriptSrc ? (
        <Script key={scriptSrc} src={scriptSrc} strategy={strategy} />
      ) : null}
    </div>
  );
}
