import { Suspense } from "react";
import { DEFAULT_HOST, getHost } from "@/sanity/lib/host";
import HostTeaser from "./host-teaser";

type HostTeaserSectionProps = {
  showMoreLink?: boolean;
};

async function HostTeaserContent({
  showMoreLink,
}: HostTeaserSectionProps) {
  const host = await getHost();
  return <HostTeaser host={host} showMoreLink={showMoreLink} />;
}

export default function HostTeaserSection({
  showMoreLink = true,
}: HostTeaserSectionProps) {
  return (
    <Suspense
      fallback={
        <HostTeaser host={DEFAULT_HOST} showMoreLink={showMoreLink} />
      }
    >
      <HostTeaserContent showMoreLink={showMoreLink} />
    </Suspense>
  );
}
