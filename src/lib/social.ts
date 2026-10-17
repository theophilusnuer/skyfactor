export const SOCIAL_PLATFORMS = [
  { value: "linkedin", title: "LinkedIn", base: "https://www.linkedin.com/in/" },
  { value: "x", title: "X (Twitter)", base: "https://x.com/" },
  { value: "instagram", title: "Instagram", base: "https://www.instagram.com/" },
  { value: "facebook", title: "Facebook", base: "https://www.facebook.com/" },
  { value: "youtube", title: "YouTube", base: "https://www.youtube.com/@" },
  { value: "tiktok", title: "TikTok", base: "https://www.tiktok.com/@" },
  { value: "threads", title: "Threads", base: "https://www.threads.net/@" },
  { value: "github", title: "GitHub", base: "https://github.com/" },
  { value: "website", title: "Website", base: "https://" },
] as const;

export function platformInfo(value?: string) {
  return SOCIAL_PLATFORMS.find((p) => p.value === value);
}
