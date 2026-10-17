import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { JournalEntry } from "@/types/sanity";

const CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  summary,
  guestName,
  coverImage,
  publishedAt,
  "momentsCount": count(definingMoments),
  "chaptersCount": count(chapters)
`;

const LIST_QUERY = defineQuery(`*[_type == "journalEntry" && defined(slug.current)]
  | order(publishedAt desc)[0...$limit]{${CARD_FIELDS}}`);

const SEARCH_QUERY = defineQuery(`*[_type == "journalEntry" && defined(slug.current)]
  | order(publishedAt desc){
    ${CARD_FIELDS},
    "searchText": array::join(
      definingMoments[].quote, " "
    ) + " " + array::join(chapters[].title, " ") + " " + coalesce(pt::text(transcript), "")
  }`);

const ENTRY_QUERY = defineQuery(`*[_type == "journalEntry" && slug.current == $slug][0]{
  ${CARD_FIELDS},
  "interviewUrl": interview->url,
  definingMoments,
  chapters,
  sourceNotes,
  transcript
}`);

const options = { useCdn: false, next: { revalidate: 10 } } as const;

async function safe<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return fallback;
  try {
    return await run();
  } catch (error) {
    console.warn("[sanity] Failed to fetch journal:", error);
    return fallback;
  }
}

export const getJournalEntries = (limit = 3) =>
  safe(() => client.fetch<JournalEntry[]>(LIST_QUERY, { limit }, options), []);

export const getJournalSearchEntries = () =>
  safe(() => client.fetch<JournalEntry[]>(SEARCH_QUERY, {}, options), []);

export const getJournalEntry = (slug: string) =>
  safe(
    () => client.fetch<JournalEntry | null>(ENTRY_QUERY, { slug }, options),
    null,
  );
