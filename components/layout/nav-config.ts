import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Footprints,
  Gift,
  GraduationCap,
  Heart,
  Mountain,
  Snowflake,
  Sparkles,
  Trees,
} from "lucide-react";

/** Иконки для категорий услуг (slug из CMS) */
export const categoryNavIconBySlug: Record<string, LucideIcon> = {
  progulki: Footprints,
  sezonnye: Mountain,
  obuchenie: GraduationCap,
};

/** Иконки для отдельных страниц на корне сайта */
export const standaloneNavIconBySlug: Record<string, LucideIcon> = {
  kareta: Heart,
  sani: Snowflake,
  fotosessii: Camera,
  "arenda-besedki": Trees,
  sertifikat: Gift,
};

/** Запись доп. услуги для меню (корневые страницы) */
export type StandaloneNavEntry = {
  href: string;
  label: string;
  slug: string;
};

export function iconForCategorySlug(slug: string): LucideIcon {
  return categoryNavIconBySlug[slug] ?? Sparkles;
}

export function iconForStandaloneSlug(slug: string): LucideIcon {
  return standaloneNavIconBySlug[slug] ?? Sparkles;
}
