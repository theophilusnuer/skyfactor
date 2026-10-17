import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { Initiative } from "@/types/sanity";
import { DEFAULT_INITIATIVES } from "@/lib/initiatives-defaults";

const INITIATIVES_QUERY = defineQuery(`*[_type == "initiative" && defined(slug.current)]
  | order(order asc, _createdAt asc){
    _id,
    title,
    "slug": slug.current,
    eyebrow,
    category,
    summary,
    description,
    status,
    location,
    stats,
    image,
    logo,
    ctaLabel,
    ctaUrl,
    order
  }`);

const options = { useCdn: false, next: { revalidate: 10 } } as const;

export async function getInitiatives(): Promise<Initiative[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return DEFAULT_INITIATIVES;
  try {
    const items = await client.fetch<Initiative[]>(INITIATIVES_QUERY, {}, options);
    return items.length > 0 ? items : DEFAULT_INITIATIVES;
  } catch (error) {
    console.warn("[sanity] Failed to fetch initiatives:", error);
    return DEFAULT_INITIATIVES;
  }
}
