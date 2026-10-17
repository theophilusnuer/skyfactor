import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import NewsletterForm from "./newsletter-form";
import { BackToTop, CurrentYear } from "./footer-widgets";

/**
 * SiteFooter — the magazine "colophon".
 *
 *  1. The Dispatch      newsletter band (API route → Sanity)
 *  2. Directory         wordmark, brand statement, listening platforms, link index
 *  3. Signature         oversized fading wordmark
 *  4. Legal bar         ©, policies, live Accra clock, back to top
 */

type FooterLink = { label: string; href: string; external?: boolean };

const DIRECTORY: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Pillars",
    links: [
      { label: "Power", href: "/" },
      { label: "Law", href: "/" },
      { label: "Business", href: "/" },
      { label: "Ideas", href: "/" },
      { label: "People", href: "/" },
      { label: "Perspective", href: "/" },
    ],
  },
  {
    heading: "Listen",
    links: [
      // { label: "Episodes", href: "/episodes" },
      { label: "Watch & Listen", href: "/watch-listen" },
      { label: "Guests", href: "/guests" },
      { label: "Journals", href: "/journal" },
    ],
  },
  
  {
    heading: "Series",
    links: [
      { label: "About SkyFactor", href: "/about" },
      { label: "Richard Sky", href: "/richard-sky" },
      { label: "Partner with us", href: "/contact#send-an-enquiry" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Follow",
    // Replace with the series' profile URLs.
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/",
        external: true,
      },
      { label: "X", href: "https://x.com/", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/", external: true },
      { label: "YouTube", href: "https://www.youtube.com/", external: true },
    ],
  },
];

// Replace with the show's platform URLs.
const PLATFORMS: FooterLink[] = [
  {
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com/",
    external: true,
  },
  { label: "Spotify", href: "https://open.spotify.com/", external: true },
  { label: "YouTube", href: "https://www.youtube.com/", external: true },
  { label: "RSS", href: "/feed.xml" },
];

const LEGAL: FooterLink[] = [
  // { label: "Privacy", href: "/privacy" },
  // { label: "Terms", href: "/terms" },
  // { label: "Cookies", href: "/cookies" },
];

const EYEBROW =
  "text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/45";

function FooterAnchor({
  link,
  className = "",
}: {
  link: FooterLink;
  className?: string;
}) {
  const externalProps = link.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={link.href}
      {...externalProps}
      className={`group relative inline-flex items-center gap-1.5 text-white/75 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 ${className}`}
    >
      <span className="relative">
        {link.label}
        {/* hairline that draws in from the left on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-sky-400 transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
      </span>
      {link.external && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-3 text-white/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-400"
          strokeWidth={1.8}
        />
      )}
    </Link>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#080E1A] text-[#F6F2EA]">
      {/* Signature top rule */}
      {/* <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-sky-400 via-sky-400/50 to-transparent"
      /> */}

      {/* Quiet studio glow behind the signature */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_105%,rgba(40,119,212,0.16),transparent_55%),radial-gradient(ellipse_at_0%_0%,rgba(91,22,170,0.12),transparent_40%)]"
      />

      <div className="mx-auto max-w-[112.5rem] px-5 sm:px-8 lg:px-14 xl:px-20">
        {/* ------------------------------------------------ 1. The Dispatch */}
        <section
          id="dispatch"
          aria-labelledby="dispatch-heading"
          className="grid gap-10 border-b border-white/10 py-14 scroll-mt-20 lg:grid-cols-12 lg:gap-8 lg:py-20"
        >
          <div className="lg:col-span-6">
            <h2
              id="dispatch-heading"
              className="mt-6 text-[clamp(2.25rem,7vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.06em] lg:text-[clamp(2.75rem,3.8vw,4rem)]"
            >
              Stay in the{" "}
              <em className="font-playfair text-sky-300 font-normal tracking-[-0.04em]">
                conversation.
              </em>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="max-w-md text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              New episodes, notes from Richard Sky and the ideas worth your
              attention — from Accra to everywhere.
            </p>
            <div className="mt-8"><NewsletterForm /></div>
          </div>
        </section>

        {/* ------------------------------------------------ 2. Directory */}
        <section
          aria-label="Site directory"
          className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-8 lg:py-20"
        >
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block text-2xl font-semibold tracking-[-0.05em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
            >
              <span className="font-manrope text-2xl font-extrabold tracking-[-0.08em]">
                SF<span className="text-sky-400">.</span>
              </span>
              <span className=" ml-3 text-xs font-extrabold tracking-[0.15em] min-[24rem]:inline">
                SKYFACTOR
              </span>
            </Link>

            <p className="mt-2 text-[0.625rem] uppercase tracking-[0.2em] text-white/45">
              The global conversation
            </p>

            <p className="mt-6 max-w-xs text-sm leading-7 text-white/60">
              An original interview series with Richard Sky. Real conversations
              with the people shaping power, law, business and ideas — from an
              African perspective, for a global audience.
            </p>

            <div className="mt-8">
              <p className={EYEBROW}>Listen on</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {PLATFORMS.map((platform) => (
                  <li key={platform.label}>
                    <Link
                      href={platform.href}
                      {...(platform.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex h-9 items-center border border-white/15 px-3 text-xs text-white/75 transition-colors duration-300 hover:border-sky-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                    >
                      {platform.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:items-center sm:gap-8 text-[0.625rem] uppercase tracking-[0.18em] text-white/50">
            <p>
              © <CurrentYear /> SkyFactor
              <span className="text-sky-400"> / </span>
              All rights reserved
            </p>
            <ul className="flex items-center gap-6">
              {LEGAL.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
          </div>

          {/* Link index */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8 lg:col-start-5 lg:gap-x-8"
          >
            {DIRECTORY.map((column) => (
              <div key={column.heading}>
                <p className={`border-b border-white/10 pb-3 ${EYEBROW}`}>
                  {column.heading}
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </section>

        {/* ------------------------------------------------ 3. Signature */}
        <div aria-hidden="true" className="select-none  text-center">
          <p className="-mb-[0.14em] bg-gradient-to-b from-white/15 to-white/[0.02] bg-clip-text text-[clamp(3.5rem,18vw,19.5rem)] font-semibold leading-[0.82] tracking-[-0.07em] text-transparent">
            SkyFactor
          </p>
        </div>

        {/* ------------------------------------------------ 4. Legal bar */}
        <div className="flex flex-col gap-6 py-6 text-[0.625rem] uppercase tracking-[0.18em] text-white/50 lg:flex-row lg:items-center lg:justify-between">
          <div></div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
