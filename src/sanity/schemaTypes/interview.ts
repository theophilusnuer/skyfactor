import { defineField, defineType } from "sanity";
import { StreamUrlInput } from "../components/stream-url-input";

export const interview = defineType({
  name: "interview",
  title: "Interviews",
  type: "document",
  icon: () => "▶️",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "summary",
      title: "Brief summary",
      type: "text",
      rows: 3,
      description: "One or two sentences shown on the card. Max 220 characters.",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "url",
      title: "Streaming link",
      type: "url",
      description:
        "Paste a link from YouTube, Spotify, Apple Podcasts, SoundCloud, Vimeo or any other platform. Clicking the card opens this link.",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"] }),
      components: { input: StreamUrlInput },
    }),
    defineField({
      name: "mediaType",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "Watch (video)", value: "watch" },
          { title: "Listen (audio)", value: "listen" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "watch",
    }),
    defineField({
      name: "guestName",
      title: "Featured guest",
      type: "string",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional for YouTube links (the video thumbnail is used automatically). Required for other platforms.",
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
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
    select: {
      title: "title",
      guest: "guestName",
      date: "publishedAt",
      media: "thumbnail",
    },
    prepare({ title, guest, date, media }) {
      const when = date ? new Date(date).toLocaleDateString() : "";
      return {
        title,
        subtitle: [guest, when].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
