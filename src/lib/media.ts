export type MediaPlatform =
  | "youtube"
  | "spotify"
  | "apple"
  | "soundcloud"
  | "vimeo"
  | "other";

export const PLATFORM_LABELS: Record<MediaPlatform, string> = {
  youtube: "YouTube",
  spotify: "Spotify",
  apple: "Apple Podcasts",
  soundcloud: "SoundCloud",
  vimeo: "Vimeo",
  other: "Stream",
};

export function getPlatform(url?: string | null): MediaPlatform {
  if (!url) return "other";
  let host = "";
  try {
    host = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "other";
  }
  if (host === "youtu.be" || host.endsWith("youtube.com")) return "youtube";
  if (host.endsWith("spotify.com")) return "spotify";
  if (host.endsWith("podcasts.apple.com") || host.endsWith("music.apple.com"))
    return "apple";
  if (host.endsWith("soundcloud.com")) return "soundcloud";
  if (host.endsWith("vimeo.com")) return "vimeo";
  return "other";
}

export function getYouTubeId(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1) || null;
    if (host.endsWith("youtube.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/);
      return m ? m[1] : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function getYouTubeThumbnail(url?: string | null): string | null {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}
