import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Отзыв",
  type: "document",
  fields: [
    defineField({
      name: "authorName",
      title: "Имя",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Текст",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Дата",
      type: "datetime",
    }),
    defineField({
      name: "rating",
      title: "Оценка (1–5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "order",
      title: "Порядок на главной",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "quote" },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle?.slice(0, 80),
      };
    },
  },
});
