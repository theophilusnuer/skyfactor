
import { defineField, defineType } from "sanity";
import { SocialUrlInput } from "../components/social-url-input";
import { SOCIAL_PLATFORMS, platformInfo } from "../../lib/social";

export const guest = defineType({
  name: "guest",
  title: "Guests",
  type: "document",
  icon: () => "🎤",

  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "photo",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "jobTitle",
      title: "Job title",
      type: "string",
    }),

    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
    }),

    defineField({
      name: "biography",
      title: "Biography",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          title: "Social link",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: SOCIAL_PLATFORMS.map((p) => ({ title: p.title, value: p.value })),
              },
              validation: (rule) => rule.required(),
            },
            {
              name: "url",
              title: "Profile",
              type: "url",
              description: "Pick the platform, then just add the username. The link is filled in for you.",
              components: { input: SocialUrlInput },
              validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
            },
          ],
          preview: {
            select: { platform: "platform", url: "url" },
            prepare: ({ platform, url }) => ({
              title: platformInfo(platform)?.title ?? platform,
              subtitle: url,
            }),
          },
        },
      ],
    }),

    defineField({
      name: "thisWeek",
      title: "This week's guest?",
      type: "boolean",
      description:
        "Turn on to spotlight this guest as a weekly guest on the home page and Guests page. Turn off once the week is over and they move to the archive.",
      initialValue: false,
    }),

    defineField({
      name: "featured",
      title: "Featured guest",
      type: "boolean",
      description: "Marks a standout guest. Shown first in the archive.",
      initialValue: false,
    }),
  ],

  orderings: [
    { title: "Name A–Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
    {
      title: "This week first",
      name: "thisWeekFirst",
      by: [
        { field: "thisWeek", direction: "desc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],

  preview: {
    select: {
      title: "name",
      role: "jobTitle",
      org: "organization",
      thisWeek: "thisWeek",
      featured: "featured",
      media: "photo",
    },
    prepare: ({ title, role, org, thisWeek, featured, media }) => ({
      title: `${thisWeek ? "⭐ " : featured ? "🌟 " : ""}${title}`,
      subtitle: [thisWeek ? "This week's guest" : null, role, org]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
