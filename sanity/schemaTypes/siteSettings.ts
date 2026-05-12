import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Настройки сайта",
  type: "document",
  groups: [
    { name: "contacts", title: "Контакты", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Название сайта",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "contacts",
    }),
    defineField({
      name: "tagline",
      title: "Слоган",
      type: "text",
      rows: 2,
      group: "contacts",
    }),
    defineField({
      name: "phoneDisplay",
      title: "Телефон (отображение)",
      type: "string",
      description: 'Например: "8 (924) 696-58-54"',
      validation: (Rule) => Rule.required(),
      group: "contacts",
    }),
    defineField({
      name: "phoneTel",
      title: "Телефон (tel:)",
      type: "string",
      description: 'Без пробелов, например "+79246965854"',
      validation: (Rule) => Rule.required(),
      group: "contacts",
    }),
    defineField({
      name: "whatsappPhone",
      title: "WhatsApp (без +)",
      type: "string",
      description: "79246965854",
      validation: (Rule) => Rule.required(),
      group: "contacts",
    }),
    defineField({
      name: "address",
      title: "Адрес",
      type: "text",
      rows: 3,
      group: "contacts",
    }),
    defineField({
      name: "geoLat",
      title: "Широта (JSON-LD)",
      type: "number",
      group: "contacts",
    }),
    defineField({
      name: "geoLng",
      title: "Долгота (JSON-LD)",
      type: "number",
      group: "contacts",
    }),
    defineField({
      name: "defaultOgImage",
      title: "OG-изображение по умолчанию",
      type: "image",
      options: { hotspot: true },
      group: "seo",
    }),
    defineField({
      name: "defaultMetaDescription",
      title: "Meta description по умолчанию",
      type: "text",
      rows: 3,
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Настройки сайта" };
    },
  },
});
