import BrandPillars from "@/components/home/brand-pillar";
import Hero from "@/components/home/hero";
import HostTeaserSection from "@/components/home/host-teaser-section";
import GuestTeaserSection from "@/components/home/guest-teaser-section";
import InitiativesTeaserSection from "@/components/home/initiatives-teaser-section";
import JournalTeaserSection from "@/components/home/journal-teaser-section";
import WatchListenTeaserSection from "@/components/home/watch-listen-teaser-section";

export default function Home() {
  return (
    <div>
      <Hero />
      <BrandPillars />
      <HostTeaserSection />
      <WatchListenTeaserSection />
      <GuestTeaserSection />
      <InitiativesTeaserSection />
      <JournalTeaserSection />
    </div>
  );
}
