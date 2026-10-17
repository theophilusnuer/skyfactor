import { defineArrayMember, defineField, defineType } from "sanity";

export const journalEntry = defineType({
  name: "journalEntry",
  title: "Journal",
  type: "document",
  icon: () => "📓",
  groups: [
    { name: "content", title: "Overview", default: true },
    { name: "moments", title: "Defining moments" },
    { name: "chapters", title: "Chapters" },
    { name: "transcript", title: "Transcript" },
    { name: "sources", title: "Source notes" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
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
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "Shown on cards. Max 240 characters.",
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "interview",
      title: "Published interview",
      type: "reference",
      to: [{ type: "interview" }],
      group: "content",
      description: "The interview this entry is based on. Adds a watch/listen link.",
    }),
    defineField({
      name: "guestName",
      title: "Guest",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "featured",
      title: "Featured on the home page?",
      type: "boolean",
      group: "content",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "definingMoments",
      title: "Defining moments",
      type: "array",
      group: "moments",
      of: [
        defineArrayMember({
          type: "object",
          name: "moment",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "speaker", title: "Speaker", type: "string" }),
            defineField({
              name: "timestamp",
              title: "Timestamp",
              type: "string",
              description: "e.g. 12:45",
            }),
          ],
          preview: {
            select: { title: "quote", subtitle: "timestamp" },
          },
        }),
      ],
    }),

    defineField({
      name: "chapters",
      title: "Chapter highlights",
      type: "array",
      group: "chapters",
      of: [
        defineArrayMember({
          type: "object",
          name: "chapter",
          fields: [
            defineField({
              name: "timestamp",
              title: "Timestamp",
              type: "string",
              description: "e.g. 00:00",
            }),
            defineField({
              name: "title",
              title: "Chapter title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "summary",
              title: "Highlight",
              type: "text",
              rows: 2,
            }),
          ],
          preview: { select: { title: "title", subtitle: "timestamp" } },
        }),
      ],
    }),

    defineField({
      name: "transcript",
      title: "Searchable transcript",
      type: "array",
      group: "transcript",
      description: "Paste the full transcript. Visitors can search it on the Journal page.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [],
          },
        }),
      ],
    }),

    defineField({
      name: "sourceNotes",
      title: "Source notes",
      type: "array",
      group: "sources",
      of: [
        defineArrayMember({
          type: "object",
          name: "sourceNote",
          fields: [
            defineField({
              name: "label",
              title: "Source",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Link",
              type: "url",
              validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
            }),
            defineField({ name: "note", title: "Note", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", guest: "guestName", media: "coverImage" },
    prepare: ({ title, guest, media }) => ({ title, subtitle: guest, media }),
  },
});
