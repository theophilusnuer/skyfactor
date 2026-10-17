
import { groq } from "next-sanity";

export const hostProfileQuery = groq`
  *[_type == "hostProfile"] | order(_updatedAt desc)[0] {
    _id,
    name,
    eyebrow,
    tagline,
    teaser,
    "portraitUrl": portrait.asset->url,
    "portraitAlt": portrait.alt,
    biography,
    pressPhotos[] {
      "imageUrl": asset->url,
      caption,
      alt,
      credit
    },
    achievements[] {
      title,
      organization,
      year,
      url
    },
    featuredIn[] {
      publication,
      title,
      url,
      date
    }
  }
`;
