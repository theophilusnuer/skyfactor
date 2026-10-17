import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { Interview } from "@/types/sanity";

const INTERVIEWS_QUERY = defineQuery(`*[_type == "interview" && defined(url)]
  | order(publishedAt desc, _createdAt desc)[0...$limit]{
    _id,
    title,
    summary,
    url,
    mediaType,
    guestName,
    thumbnail
  }`);

export async function getInterviews(limit = 100): Promise<Interview[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];

  try {
    return await client.fetch<Interview[]>(
      INTERVIEWS_QUERY,
      { limit },
      { useCdn: false, next: { revalidate: 10 } },
    );
  } catch (error) {
    console.warn("[sanity] Failed to fetch interviews:", error);
    return [];
  }
}
