import { Suspense } from "react";
import { getJournalEntries } from "@/sanity/lib/journal";
import JournalTeaser from "./journal-teaser";

async function JournalTeaserContent() {
  const entries = await getJournalEntries(3);
  return <JournalTeaser entries={entries} />;
}

export default function JournalTeaserSection() {
  return (
    <Suspense fallback={<JournalTeaser entries={[]} />}>
      <JournalTeaserContent />
    </Suspense>
  );
}
