import { defineField, defineType } from "sanity";

export const contactMessage = defineType({
  name: "contactMessage",
  title: "Contact messages",
  type: "document",
  icon: () => "💬",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "phone", title: "Telephone", type: "string", readOnly: true }),
    defineField({ name: "subject", title: "Subject", type: "string", readOnly: true }),
    defineField({ name: "message", title: "Message", type: "text", rows: 8, readOnly: true }),
    defineField({ name: "receivedAt", title: "Received", type: "datetime", readOnly: true }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Replied", value: "replied" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
  ],
  orderings: [
    { title: "Newest first", name: "newest", by: [{ field: "receivedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "name", subject: "subject", status: "status" },
    prepare: ({ title, subject, status }) => ({
      title: `${status === "new" ? "🔵 " : ""}${title ?? "Unknown"}`,
      subtitle: subject,
    }),
  },
});
