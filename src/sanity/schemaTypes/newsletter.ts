import { defineArrayMember, defineField, defineType } from "sanity";

export const newsletter = defineType({
  name: "newsletter",
  title: "Newsletters",
  type: "document",
  icon: () => "📨",
  fields: [
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "preheader",
      title: "Preview text",
      type: "string",
      description: "Shown next to the subject in the inbox.",
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: "body",
      title: "Message",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https", "mailto"] }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "Button label",
      type: "string",
    }),
    defineField({
      name: "ctaUrl",
      title: "Button link",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "sentAt",
      title: "Sent at",
      type: "datetime",
      readOnly: true,
      description: "Set automatically when the newsletter is sent.",
    }),
    defineField({
      name: "recipientCount",
      title: "Recipients",
      type: "number",
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: "subject", sentAt: "sentAt" },
    prepare: ({ title, sentAt }) => ({
      title,
      subtitle: sentAt
        ? `Sent ${new Date(sentAt).toLocaleString()}`
        : "Not sent — publish, then use “Send to subscribers”",
    }),
  },
});
