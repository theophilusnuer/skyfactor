import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getGuest } from "@/sanity/lib/guests";
import { urlFor } from "@/sanity/lib/image";
import { platformInfo } from "@/lib/social";

const bioComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-base leading-8 text-white/70 first:mt-0 sm:text-lg sm:leading-9">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-white/70">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-white/70">{children}</ol>
    ),
  },
  marks: {
    underline: ({ children }) => <span className="underline">{children}</span>,
  },
};

async function GuestContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guest = await getGuest(slug);
  if (!guest) notFound();

  const src = guest.photo?.asset
    ? urlFor(guest.photo).width(900).height(1200).fit("crop").url()
    : null;
  const role = [guest.jobTitle, guest.organization].filter(Boolean).join(" · ");
  const links = guest.socialLinks?.filter((l) => l.url) ?? [];

  return (
    <div className="relative overflow-hidden bg-[#0B1320] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(40,119,212,0.2),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-[90rem] px-5 pb-24 pt-12 sm:px-8 lg:px-14 xl:px-20">
        <Link
          href="/guests"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-sky-300"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> All guests
        </Link>

        <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden bg-[#1a2433]">
              {src ? (
                <Image
                  src={src}
                  alt={guest.photo?.alt || guest.name}
                  fill
                  priority
                  sizes="(max-width: 1023px) 90vw, 35vw"
                  className="object-cover"
                />
              ) : null}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-400">
              Guest
            </p>
            <h1 className="mt-5 font-playfair text-[clamp(2.75rem,7vw,5.5rem)] italic leading-[0.95] tracking-[-0.04em]">
              {guest.name}
            </h1>
            {role && (
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                {role}
              </p>
            )}

            {guest.biography && guest.biography.length > 0 && (
              <div className="mt-10 max-w-2xl">
                <PortableText value={guest.biography} components={bioComponents} />
              </div>
            )}

            {links.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-3">
                {links.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors hover:border-sky-300 hover:text-sky-300"
                    >
                      {platformInfo(l.platform)?.title ?? l.platform ?? "Link"}
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GuestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B1320]" />}>
      <GuestContent params={params} />
    </Suspense>
  );
}
