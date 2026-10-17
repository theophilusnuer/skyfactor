import { Suspense } from "react";
import { getInterviews } from "@/sanity/lib/interviews";
import WatchListenTeaser from "./watch-listen-teaser";

async function WatchListenTeaserContent() {
  const interviews = await getInterviews(3);
  return <WatchListenTeaser interviews={interviews} />;
}

export default function WatchListenTeaserSection() {
  return (
    <Suspense fallback={<WatchListenTeaser interviews={[]} />}>
      <WatchListenTeaserContent />
    </Suspense>
  );
}
