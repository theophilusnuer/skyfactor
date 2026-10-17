import { Suspense } from "react";
import { getGuests } from "@/sanity/lib/guests";
import GuestTeaser from "./guest-teaser";

async function GuestTeaserContent() {
  const guests = await getGuests(12);
  return <GuestTeaser guests={guests} />;
}

export default function GuestTeaserSection() {
  return (
    <Suspense fallback={null}>
      <GuestTeaserContent />
    </Suspense>
  );
}
