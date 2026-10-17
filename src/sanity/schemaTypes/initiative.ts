import { defineArrayMember, defineField, defineType } from "sanity";

export const initiative = defineType({
  name: "initiative",
  title: "Initiatives",
  type: "document",
  icon: () => "🌍",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "action", title: "Call to action" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      group: "content",
      description: "The initiative name, e.g. VAFIAM.",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Label",
      type: "string",
      group: "content",
      description: 'Short uppercase label shown next to the number, e.g. "On the road".',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      description: 'e.g. "The Outdoor Initiative" or "The Charitable Arm".',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      group: "content",
      description: "Shown on the home page teaser and the initiatives page. Max 400 characters.",
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "array",
      group: "content",
      description: "Optional longer story shown on the Initiatives page.",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Upcoming", value: "upcoming" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "active",
    }),
    defineField({
      name: "location",
      title: "Location / reach",
      type: "string",
      group: "content",
      description: 'e.g. "Accra, Ghana" or "Across West Africa".',
    }),
    defineField({
      name: "stats",
      title: "Impact figures",
      type: "array",
      group: "content",
      description: 'Optional highlights, e.g. "12 / Schools visited".',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Figure",
              type: "string",
              validation: (rule) => rule.required().max(12),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required().max(40),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
    }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "media",
      description: "Optional. Transparent PNG or SVG works best.",
    }),
    defineField({
      name: "ctaLabel",
      title: "Button label",
      type: "string",
      group: "action",
      initialValue: "Explore collaboration",
    }),
    defineField({
      name: "ctaUrl",
      title: "Button link",
      type: "string",
      group: "action",
      description: "Use /contact for an internal page or a full https:// link.",
      initialValue: "/contact",
      validation: (rule) =>
        rule.custom((value) =>
          !value || /^(\/|https?:\/\/)/.test(value)
            ? true
            : "Start with / or https://",
        ),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "content",
      description: "Lower numbers appear first (1, 2, 3…).",
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.max(160),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", order: "order", media: "image" },
    prepare: ({ title, subtitle, order, media }) => ({
      title: `${String(order ?? "").padStart(2, "0")} · ${title}`,
      subtitle,
      media,
    }),
  },
});
