import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Услуга / маршрут",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Слаг",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Категория",
      type: "reference",
      to: [{ type: "serviceCategory" }],
    }),
    defineField({
      name: "standaloneRoute",
      title: "Страница на корне сайта (/slug)",
      type: "boolean",
      description:
        "Включите для кареты, саней, беседки и т.п. Иначе URL будет /категория/slug",
      initialValue: false,
    }),
    defineField({
      name: "excerpt",
      title: "Краткое описание (карточка)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Текст страницы",
      type: "blockContent",
    }),
    defineField({
      name: "durationHours",
      title: "Длительность (часы)",
      type: "number",
    }),
    defineField({
      name: "distanceKm",
      title: "Километраж / протяжённость",
      type: "string",
      description: 'Например "17+17 км"',
    }),
    defineField({
      name: "difficulty",
      title: "Сложность",
      type: "string",
      description:
        "Текст для гостей + при желании шкала из эмодзи: 🍎 — сложнее, 🍏 — легче (как на классическом сайте турзоны).",
    }),
    defineField({
      name: "seasonNote",
      title: "Сезонность",
      type: "string",
    }),
    defineField({
      name: "highlights",
      title: "Буллеты (преимущества)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "packingTips",
      title: "Что взять / ограничения",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "gallery",
      title: "Галерея",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Вопрос",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Ответ",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      standalone: "standaloneRoute",
    },
    prepare({ title, slug, standalone }) {
      return {
        title,
        subtitle: standalone ? `/${slug}` : slug,
      };
    },
  },
});
