import { defineField, defineType } from "sanity";

export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "Категория услуг",
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
      title: "Слаг (URL)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Описание раздела",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "order",
      title: "Порядок в меню",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "heroImage",
      title: "Обложка раздела",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "durationLabel",
      title: "Длительность (подпись)",
      type: "string",
      description: 'Например: "от 1 часа"',
    }),
    defineField({
      name: "levelLabel",
      title: "Уровень (подпись)",
      type: "string",
      description: 'Например: "для всех уровней"',
    }),
    defineField({
      name: "isPopular",
      title: "Популярно",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `/${subtitle}` : undefined };
    },
  },
});
