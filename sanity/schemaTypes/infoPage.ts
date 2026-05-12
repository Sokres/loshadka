import { defineField, defineType } from "sanity";

export const infoPage = defineType({
  name: "infoPage",
  title: "Информационная страница",
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
      name: "body",
      title: "Текст",
      type: "blockContent",
    }),
  ],
});
