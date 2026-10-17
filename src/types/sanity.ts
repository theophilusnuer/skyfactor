// Sanity schema types
// Add your Sanity schema types here as you define them in your Sanity studio

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityReference {
  _ref: string;
  _type: 'reference';
}

// Example post type - can be customized based on your schema
export interface Post {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'post';
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  mainImage?: SanityImage;
  body: any[]; // Portable Text / Block Content
  author?: SanityReference;
  categories?: SanityReference[];
  publishedAt?: string;
  isFeatured?: boolean;
}

// Example author type
export interface Author {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'author';
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  bio?: any[]; // Portable Text
}

// Example category type
export interface Category {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'category';
  title: string;
  slug: SanitySlug;
  description?: string;
}

// Example page type
export interface Page {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'page';
  title: string;
  slug: SanitySlug;
  content: any[]; // Portable Text / Block Content
}

// Host profile (Richard Sky)
export interface Host {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'host';
  name: string;
  headline?: string;
  profile?: any[]; // Portable Text / Block Content
  aboutSkyFactor?: {
    title?: string;
    tagline?: string;
    shortBio?: any[];
  };
  fullBio?: any[]; // Portable Text / Block Content
  profileImage?: SanityImage;
  pressPhotography?: Array<
    SanityImage & {
      _key?: string;
      alt?: string;
      caption?: string;
      credit?: string;
    }
  >;
  achievements?: Array<{
    _key?: string;
    year?: string;
    title: string;
    source?: string;
    url?: string;
  }>;
}

// Generic Sanity document type
export interface SanityDocument {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: string;
}

// Interview / streaming entry
export interface Interview {
  _id: string;
  title: string;
  summary: string;
  url: string;
  mediaType?: 'watch' | 'listen';
  guestName?: string;
  thumbnail?: SanityImage & { alt?: string };
}

export interface Guest {
  _id: string;
  name: string;
  slug: string;
  jobTitle?: string;
  organization?: string;
  featured?: boolean;
  thisWeek?: boolean;
  excerpt?: string;
  photo?: SanityImage;
  biography?: import('@portabletext/types').PortableTextBlock[];
  socialLinks?: { platform?: string; url?: string }[];
}

export interface Initiative {
  _id: string;
  title: string;
  slug: string;
  eyebrow?: string;
  category?: string;
  summary: string;
  description?: import('@portabletext/types').PortableTextBlock[];
  status?: 'active' | 'upcoming' | 'completed';
  location?: string;
  stats?: { value: string; label: string }[];
  image?: SanityImage;
  logo?: SanityImage;
  ctaLabel?: string;
  ctaUrl?: string;
  order?: number;
}

export interface InitiativesPageContent {
  eyebrow: string;
  kicker: string;
  titleLead: string;
  titleAccent: string;
  intro: string;
}

export interface JournalEntry {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  guestName?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
  momentsCount?: number;
  chaptersCount?: number;
  interviewUrl?: string;
  // Present only when fetched for search
  searchText?: string;
  definingMoments?: { quote: string; speaker?: string; timestamp?: string }[];
  chapters?: { timestamp?: string; title: string; summary?: string }[];
  sourceNotes?: { label: string; url?: string; note?: string }[];
  transcript?: import('@portabletext/types').PortableTextBlock[];
}