import type { Initiative, InitiativesPageContent } from "@/types/sanity";

export const DEFAULT_PAGE_CONTENT: InitiativesPageContent = {
  eyebrow: "The SkyFactor Universe",
  kicker: "Beyond the microphone",
  titleLead: "More than a show",
  titleAccent: "a show.",
  intro: "Ideas matter most when they move beyond the studio.",
};

// Shown until initiatives are published in the studio.
export const DEFAULT_INITIATIVES: Initiative[] = [
  {
    _id: "default-vafiam",
    title: "VAFIAM",
    slug: "vafiam",
    eyebrow: "On the road",
    category: "The Outdoor Initiative",
    summary:
      "Taking conversations to young people, educators, professionals and influential voices. Learning together, challenging assumptions and informing policy.",
    ctaLabel: "Explore collaboration",
    ctaUrl: "/contact",
    order: 1,
  },
  {
    _id: "default-venunye",
    title: "VENUNYE",
    slug: "venunye",
    eyebrow: "Social impact",
    category: "The Charitable Arm",
    summary:
      "Because the most meaningful conversations should inspire meaningful action. A charitable vision grounded in dignity, opportunity and service.",
    ctaLabel: "Explore collaboration",
    ctaUrl: "/contact",
    order: 2,
  },
];
