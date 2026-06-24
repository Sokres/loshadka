import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import type { ReviewDTO } from "@/lib/cms/types-and-fallback";
import { cn } from "@/lib/utils";

import { ScrollReveal } from "@/components/marketing/scroll-reveal";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Оценка ${rating} из 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating ? "fill-amber-400 text-amber-400" : "text-border",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewDTO }) {
  const rating = review.rating ?? 5;
  const initial = review.authorName.trim().charAt(0).toUpperCase();

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        {review.authorPhotoUrl ? (
          <Image
            src={review.authorPhotoUrl}
            alt=""
            width={44}
            height={44}
            className="size-11 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {initial}
          </span>
        )}
        <div>
          <p className="font-semibold">{review.authorName}</p>
          <StarRating rating={rating} />
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">{review.quote}</p>
      {review.tripPhotoUrl ? (
        <div className="relative mt-4 aspect-video overflow-hidden rounded-xl bg-muted">
          <Image
            src={review.tripPhotoUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
          />
        </div>
      ) : null}
    </article>
  );
}

export function HomeReviewsSection({ reviews }: { reviews: ReviewDTO[] }) {
  if (!reviews.length) return null;

  const displayed = reviews.slice(0, 3);

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 md:hidden">
        {displayed.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>

      <div className="mt-10 hidden gap-6 md:grid md:grid-cols-3">
        {displayed.map((review, i) => (
          <ScrollReveal key={review._id} delayMs={i * 70}>
            <ReviewCard review={review} />
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/kontakty" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Читать больше отзывов
        </Link>
      </div>
    </>
  );
}
