import { Suspense } from "react";
import type { Metadata } from "next";
import { getJournalSearchEntries } from "@/sanity/lib/journal";
import JournalPageClient from "@/components/journal/journal-page-client";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Defining moments, searchable transcripts, chapter highlights and source notes from published SkyFactor interviews.",
};

async function JournalContent() {
  const entries = await getJournalSearchEntries();
  return <JournalPageClient entries={entries} />;
}

export default function JournalPage() {
  return (
    <Suspense fallback={<JournalPageClient entries={[]} />}>
      <JournalContent />
    </Suspense>
  );
}
