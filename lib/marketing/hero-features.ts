import type { LucideIcon } from "lucide-react";
import { Heart, MapPin, Route, Users } from "lucide-react";

export type HeroFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const HERO_FEATURES: HeroFeature[] = [
  {
    icon: Users,
    title: "Индивидуальный подход",
    description: "Подберём маршрут и темп под ваш уровень подготовки",
  },
  {
    icon: Route,
    title: "Маршруты для всех уровней",
    description: "От короткой прогулки до многодневного похода",
  },
  {
    icon: MapPin,
    title: "Живописные локации",
    description: "Реки, океан, вулканы и горячие источники полуострова",
  },
  {
    icon: Heart,
    title: "Забота о лошадях",
    description: "Спокойные животные и бережное отношение к природе",
  },
];
