import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { Guest } from "@/types/sanity";

const GUEST_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  jobTitle,
  organization,
  featured,
  thisWeek,
  "excerpt": pt::text(biography),
  photo`;

const GUESTS_QUERY = defineQuery(`*[_type == "guest" && defined(slug.current)]
  | order(featured desc, name asc)[0...$limit]{${GUEST_FIELDS}}`);

const GUEST_QUERY = defineQuery(`*[_type == "guest" && slug.current == $slug][0]{
  ${GUEST_FIELDS},
  biography,
  socialLinks
}`);

const options = { useCdn: false, next: { revalidate: 10 } } as const;

export async function getGuests(limit = 200): Promise<Guest[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
  try {
    return await client.fetch<Guest[]>(GUESTS_QUERY, { limit }, options);
  } catch (error) {
    console.warn("[sanity] Failed to fetch guests:", error);
    return [];
  }
}

export async function getGuest(slug: string): Promise<Guest | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  try {
    return await client.fetch<Guest | null>(GUEST_QUERY, { slug }, options);
  } catch (error) {
    console.warn("[sanity] Failed to fetch guest:", error);
    return null;
  }
}
