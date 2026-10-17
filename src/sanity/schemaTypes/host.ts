import { defineType, defineField } from 'sanity';

export const host = defineType({
  name: 'host',
  title: 'Host',
  type: 'document',
  icon: () => '🎙️',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'A short one-line descriptor, e.g. "A Ghanaian editorial voice. An open invitation to the world."',
    }),
    defineField({
      name: 'profile',
      title: 'Short Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'A short bio shown on the host page. Maximum 300 words.',
      validation: (Rule) =>
        Rule.custom((blocks) => {
          if (!Array.isArray(blocks)) return true;
          const words = blocks
            .flatMap((b: any) => (b?.children ?? []).map((c: any) => c?.text ?? ''))
            .join(' ')
            .trim()
            .split(/\s+/)
            .filter(Boolean).length;
          return words <= 300 || `Short bio is ${words} words. Keep it to 300 or fewer; put the rest in Full Bio.`;
        }),
    }),
    defineField({
      name: 'aboutSkyFactor',
      title: 'About SkyFactor',
      type: 'object',
      description: 'Shown on the host page above the achievements, and used for the home page host teaser.',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Replaces the host name on the home page teaser.',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          description: 'Replaces the headline on the home page teaser.',
        }),
        defineField({
          name: 'shortBio',
          title: 'Short bio',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Maximum 250 words.',
          validation: (Rule) =>
            Rule.custom((blocks) => {
              if (!Array.isArray(blocks)) return true;
              const words = blocks
                .flatMap((b: any) => (b?.children ?? []).map((c: any) => c?.text ?? ''))
                .join(' ')
                .trim()
                .split(/\s+/)
                .filter(Boolean).length;
              return words <= 250 || 'Short bio is ' + words + ' words. Keep it to 250 or fewer.';
            }),
        }),
      ],
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The complete biography. Shown in a pop-up when visitors click "Read full bio".',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'pressPhotography',
      title: 'Press Photography',
      type: 'array',
      of: [
        defineField({
          name: 'photo',
          title: 'Photo',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'credit',
              title: 'Photo credit',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements & Features',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Achievement',
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'source',
              title: 'Source / Publication',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'Link',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'profileImage',
    },
  },
});

export const hostSchemaTypes = [host];
