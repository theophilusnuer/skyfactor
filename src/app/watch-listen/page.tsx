import { Suspense } from "react";
import type { Metadata } from "next";
import { getInterviews } from "@/sanity/lib/interviews";
import WatchListenPageClient from "@/components/watch-listen/watch-listen-page-client";

export const metadata: Metadata = {
  title: "Watch & Listen",
  description:
    "The stories behind the headlines. Watch and listen to SkyFactor conversations on your favourite platform.",
};

async function WatchListenContent() {
  const interviews = await getInterviews();
  return <WatchListenPageClient interviews={interviews} />;
}

export default function WatchListenPage() {
  return (
    <Suspense fallback={<WatchListenPageClient interviews={[]} />}>
      <WatchListenContent />
    </Suspense>
  );
}
