import { defineField, defineType } from "sanity";

export const subscriber = defineType({
  name: "subscriber",
  title: "Subscribers",
  type: "document",
  icon: () => "✉️",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Subscribed", value: "subscribed" },
          { title: "Unsubscribed", value: "unsubscribed" },
        ],
        layout: "radio",
      },
      initialValue: "subscribed",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "subscribedAt", title: "Subscribed at", type: "datetime" }),
    defineField({ name: "unsubscribedAt", title: "Unsubscribed at", type: "datetime" }),
    defineField({
      name: "token",
      title: "Unsubscribe token",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "subscribedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "email", status: "status", date: "subscribedAt" },
    prepare: ({ title, status, date }) => ({
      title,
      subtitle: `${status === "unsubscribed" ? "Unsubscribed" : "Subscribed"}${
        date ? ` · ${new Date(date).toLocaleDateString()}` : ""
      }`,
    }),
  },
});
