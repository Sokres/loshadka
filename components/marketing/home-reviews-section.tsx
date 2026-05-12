"use client";

import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReviewDTO } from "@/lib/cms/types-and-fallback";

import { ScrollReveal } from "@/components/marketing/scroll-reveal";

function ReviewQuoteCard({
  authorName,
  quote,
}: Pick<ReviewDTO, "authorName" | "quote">) {
  return (
    <Card className="rounded-2xl border-border/70 bg-background/95 shadow-sm ring-1 ring-border/55">
      <CardHeader className="gap-3">
        <CardTitle className="text-base font-semibold">{authorName}</CardTitle>
        <CardDescription className="relative pl-5 text-base leading-relaxed text-foreground/90">
          <span
            className="absolute top-0 left-0 translate-y-[-2px] font-heading text-4xl leading-none text-primary/35 selection:bg-transparent"
            aria-hidden
          >
            «
          </span>
          <span>{quote}</span>
          <span aria-hidden className="text-foreground/55">
            »
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function HomeReviewsSection({ reviews }: { reviews: ReviewDTO[] }) {
  const [index, setIndex] = useState(0);

  const len = reviews.length;
  const safeIndex = len ? ((index % len) + len) % len : 0;

  const go = useCallback(
    (delta: number) => {
      if (!len) return;
      setIndex((i) => ((i + delta) % len + len) % len);
    },
    [len],
  );

  if (!len) return null;

  return (
    <>
      <div className="mt-10 md:hidden">
        <div className="relative px-12">
          <ReviewQuoteCard {...reviews[safeIndex]} />
          <button
            type="button"
            aria-label="Предыдущий отзыв"
            className="absolute top-1/2 left-0 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-background/95 text-foreground shadow-sm transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:hidden"
            onClick={() => go(-1)}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Следующий отзыв"
            className="absolute top-1/2 right-0 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-background/95 text-foreground shadow-sm transition hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:hidden"
            onClick={() => go(1)}
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
        <div
          className="mt-6 flex justify-center gap-2"
          role="tablist"
          aria-label="Выбор отзыва"
        >
          {reviews.map((r, i) => (
            <button
              key={r._id}
              type="button"
              role="tab"
              aria-selected={i === safeIndex}
              aria-label={`Отзыв ${i + 1} из ${len}`}
              className={cn(
                "h-2 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none",
                i === safeIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/35 hover:bg-muted-foreground/55",
              )}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 hidden gap-6 md:grid md:grid-cols-3">
        {reviews.map((r, i) => (
          <ScrollReveal key={r._id} delayMs={i * 70}>
            <ReviewQuoteCard {...r} />
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}
