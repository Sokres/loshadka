import { Lock, ShieldCheck, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type IconProps = { className?: string };

function PricingShieldBriefingIcon({ className }: IconProps) {
  return (
    <svg className={cn("size-7", className)} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 4 6.5v5.8c0 4.6 3.4 8.9 8 10.2 4.6-1.3 8-5.6 8-10.2V6.5L12 3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M12 8v8M8.5 12H15.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function PricingSeasonRoutesIcon({ className }: IconProps) {
  return (
    <svg className={cn("size-7", className)} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 10c0-3.3 2.7-6 6-6 1.8 0 3.4.8 4.5 2.1M19 14c0 3.3-2.7 6-6 6-1.8 0-3.4-.8-4.5-2.1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M16 4h3v3M8 20H5v-3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 14.5 11 12l2.5 2.5M12 12v5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PricingGazeboIcon({ className }: IconProps) {
  return (
    <svg className={cn("size-10", className)} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path d="M6 18 20 8l14 10" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path
        d="M9 18v14h22V18M14 32v-8h12v8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M18 24h4v4h-4z" fill="currentColor" opacity="0.35" />
      <path
        d="M20 14c0 1.5-1 2.5-2 3.5M20 14c0 1.5 1 2.5 2 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type PricingInfoCard = {
  Icon: LucideIcon | ((props: IconProps) => React.JSX.Element);
  lucide?: boolean;
  text: string;
  tone: "amber" | "green";
};

export const PRICING_INFO_CARDS: PricingInfoCard[] = [
  {
    Icon: PricingShieldBriefingIcon,
    text: "Перед каждым выездом проводим инструктаж по технике безопасности",
    tone: "amber",
  },
  {
    Icon: Lock,
    lucide: true,
    text: "По желанию надеваем шлемы безопасности для верховой езды",
    tone: "amber",
  },
  {
    Icon: ShieldCheck,
    lucide: true,
    text: "Маршруты соответствуют стандартам безопасности и подходят для разного уровня подготовки",
    tone: "green",
  },
  {
    Icon: PricingSeasonRoutesIcon,
    text: "Маршруты меняются в связи с сезоном",
    tone: "green",
  },
];

export function PricingInfoIcon({
  Icon,
  lucide,
  className,
}: {
  Icon: PricingInfoCard["Icon"];
  lucide?: boolean;
  className?: string;
}) {
  if (lucide) {
    const LucideIcon = Icon as LucideIcon;
    return <LucideIcon className={className} strokeWidth={1.75} aria-hidden />;
  }
  const CustomIcon = Icon as (props: IconProps) => React.JSX.Element;
  return <CustomIcon className={className} />;
}
