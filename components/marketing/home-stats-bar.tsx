import { Map, Mountain, Star, Users } from "lucide-react";

import type { SiteSettingsDTO } from "@/lib/cms/types-and-fallback";
import { cn } from "@/lib/utils";

type StatItem = {
  icon: typeof Mountain;
  value: string;
  label: string;
};

function buildStats(settings: SiteSettingsDTO): StatItem[] {
  return [
    {
      icon: Mountain,
      value: settings.statsYears ?? "15+",
      label: settings.statsYearsLabel ?? "лет работы на Камчатке",
    },
    {
      icon: Users,
      value: settings.statsGuests ?? "2000+",
      label: settings.statsGuestsLabel ?? "счастливых гостей",
    },
    {
      icon: Map,
      value: settings.statsRoutes ?? "20+",
      label: settings.statsRoutesLabel ?? "маршрутов на любой вкус",
    },
    {
      icon: Star,
      value: settings.statsRating ?? "4.9",
      label: settings.statsRatingLabel ?? "рейтинг гостей",
    },
  ];
}

export function HomeStatsBar({
  settings,
  className,
}: {
  settings: SiteSettingsDTO;
  className?: string;
}) {
  const stats = buildStats(settings);

  return (
    <div
      className={cn(
        "relative z-20 mx-auto max-w-5xl rounded-2xl border border-border/60 bg-card px-4 py-6 shadow-lg sm:px-8 -mt-10 md:-mt-12",
        className,
      )}
    >
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 text-center md:flex-row md:items-start md:gap-3 md:text-left"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <stat.icon className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                {stat.value}
                {stat.icon === Star ? (
                  <Star
                    className="ml-1 inline size-4 fill-amber-400 text-amber-400"
                    aria-hidden
                  />
                ) : null}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
