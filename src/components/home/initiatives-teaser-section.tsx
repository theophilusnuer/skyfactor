import { Suspense } from "react";
import { getInitiatives } from "@/sanity/lib/initiatives";
import { DEFAULT_INITIATIVES } from "@/lib/initiatives-defaults";
import InitiativesTeaser from "./initiatives-teaser";

async function InitiativesTeaserContent() {
  const initiatives = await getInitiatives();
  return <InitiativesTeaser initiatives={initiatives} />;
}

export default function InitiativesTeaserSection() {
  return (
    <Suspense
      fallback={
        <InitiativesTeaser
          initiatives={DEFAULT_INITIATIVES}
        />
      }
    >
      <InitiativesTeaserContent />
    </Suspense>
  );
}
