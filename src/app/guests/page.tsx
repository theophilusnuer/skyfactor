import { Suspense } from "react";
import type { Metadata } from "next";
import { getGuests } from "@/sanity/lib/guests";
import GuestsPageClient from "@/components/guests/guests-page-client";

export const metadata: Metadata = {
  title: "Guests",
  description: "The voices who have sat down with Richard Sky on SkyFactor.",
};

async function GuestsContent() {
  const guests = await getGuests();
  return <GuestsPageClient guests={guests} />;
}

export default function GuestsPage() {
  return (
    <Suspense fallback={<GuestsPageClient guests={[]} />}>
      <GuestsContent />
    </Suspense>
  );
}
