import { Suspense } from "react";
import type { Metadata } from "next";
import { getInitiatives } from "@/sanity/lib/initiatives";
import { DEFAULT_INITIATIVES } from "@/lib/initiatives-defaults";
import InitiativesPageClient from "@/components/initiatives/initiatives-page-client";

export const metadata: Metadata = {
  title: "Initiatives",
  description:
    "Beyond the microphone: the SkyFactor initiatives taking conversations into the world and turning them into action.",
};

async function InitiativesContent() {
  const initiatives = await getInitiatives();
  return <InitiativesPageClient initiatives={initiatives} />;
}

export default function InitiativesPage() {
  return (
    <Suspense
      fallback={
        <InitiativesPageClient
          initiatives={DEFAULT_INITIATIVES}
        />
      }
    >
      <InitiativesContent />
    </Suspense>
  );
}
