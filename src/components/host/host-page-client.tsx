"use client";

import type { Host } from "@/types/sanity";
import HostIntro from "@/components/host/host-intro";
import HostAchievements from "@/components/host/host-achievements";
import HostClosing from "@/components/host/host-closing";
import HostPressPhotography from "@/components/host/host-press-photography";

export default function HostPageClient({ host }: { host: Host }) {
  return (
    <main className="bg-[#F5F1E8] text-[#101820]">
      <HostIntro host={host} />

      <div className="relative z-10">
        <HostAchievements
          achievements={host.achievements ?? []}
          about={host.aboutSkyFactor}
        />
        <HostClosing />
        <HostPressPhotography
          photos={host.pressPhotography ?? []}
          hostName={host.name || "Richard Sky"}
        />
      </div>
    </main>
  );
}
