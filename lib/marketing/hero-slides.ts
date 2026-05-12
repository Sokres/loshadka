/** Файлы: `public/images/hero/hero-slide-*.jpg` (бывш. `img/slider_hero/`). */
export type HeroSlide = {
  src: string;
  alt: string;
};

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    src: "/images/hero/hero-slide-01.jpg",
    alt: "Всадники на фоне камчатских просторов",
  },
  {
    src: "/images/hero/hero-slide-02.jpg",
    alt: "Конная прогулка по тропам полуострова",
  },
  {
    src: "/images/hero/hero-slide-03.jpg",
    alt: "Лошади и природа Камчатки",
  },
];
