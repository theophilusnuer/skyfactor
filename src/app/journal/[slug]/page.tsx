import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { getJournalEntry } from "@/sanity/lib/journal";
import { urlFor } from "@/sanity/lib/image";
import InitiativesBackdrop from "@/components/initiatives/initiatives-backdrop";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-sky-500">
      <span aria-hidden="true" className="h-px w-10 bg-sky-400" />
      {children}
    </h2>
  );
}

async function EntryContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getJournalEntry(slug);
  if (!entry) notFound();

  const src = entry.coverImage?.asset
    ? urlFor(entry.coverImage).width(1400).height(800).fit("crop").url()
    : null;

  return (
    <div className="relative overflow-hidden bg-[#F5F1E8] text-[#080E1A]">
      <InitiativesBackdrop />
      <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-12 sm:px-8 lg:pt-16">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#080E1A]/60 transition-colors hover:text-sky-500"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> Journal
        </Link>

        <header className="mt-10">
          {entry.guestName && (
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-500">
              {entry.guestName}
            </p>
          )}
          <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-[-0.07em]">
            {entry.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#080E1A]/65">
            {entry.summary}
          </p>
          {entry.interviewUrl && (
            <a
              href={entry.interviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 border border-[#080E1A]/70 px-5 py-3 text-sm font-medium transition-colors hover:border-sky-400"
            >
              Watch or listen to the interview
              <ArrowUpRight aria-hidden="true" className="size-4 text-sky-500" />
            </a>
          )}
        </header>

        {src && (
          <div className="relative mt-12 aspect-[7/4] overflow-hidden bg-[#080E1A]/10">
            <Image
              src={src}
              alt={entry.coverImage?.alt || entry.title}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 64rem"
              className="object-cover"
            />
          </div>
        )}

        {entry.definingMoments && entry.definingMoments.length > 0 && (
          <section className="mt-20">
            <SectionTitle>Defining moments</SectionTitle>
            <ul className="mt-8 grid gap-6">
              {entry.definingMoments.map((m, i) => (
                <li key={i} className="border border-[#080E1A]/15 bg-white/50 p-6 sm:p-10">
                  <blockquote className="font-playfair text-2xl italic leading-[1.3] tracking-[-0.02em] sm:text-3xl">
                    “{m.quote}”
                  </blockquote>
                  {(m.speaker || m.timestamp) && (
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#080E1A]/55">
                      {[m.speaker, m.timestamp].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {entry.chapters && entry.chapters.length > 0 && (
          <section className="mt-20">
            <SectionTitle>Chapter highlights</SectionTitle>
            <ol className="mt-8 border-t border-[#080E1A]/15">
              {entry.chapters.map((c, i) => (
                <li
                  key={i}
                  className="grid gap-2 border-b border-[#080E1A]/15 py-6 sm:grid-cols-[7rem_1fr] sm:gap-8"
                >
                  <span className="text-sm font-bold tabular-nums tracking-[0.1em] text-sky-500">
                    {c.timestamp || String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.03em]">{c.title}</h3>
                    {c.summary && (
                      <p className="mt-2 text-sm leading-7 text-[#080E1A]/65">{c.summary}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {entry.transcript && entry.transcript.length > 0 && (
          <section className="mt-20">
            <SectionTitle>Transcript</SectionTitle>
            <details className="group mt-8 border border-[#080E1A]/15 bg-white/50">
              <summary className="cursor-pointer select-none px-6 py-5 text-sm font-semibold uppercase tracking-[0.16em]">
                <span className="group-open:hidden">Read the full transcript</span>
                <span className="hidden group-open:inline">Hide transcript</span>
              </summary>
              <div className="space-y-5 border-t border-[#080E1A]/15 px-6 py-8 text-base leading-8 text-[#080E1A]/75">
                <PortableText value={entry.transcript} />
              </div>
            </details>
          </section>
        )}

        {entry.sourceNotes && entry.sourceNotes.length > 0 && (
          <section className="mt-20">
            <SectionTitle>Source notes</SectionTitle>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {entry.sourceNotes.map((s, i) => (
                <li key={i} className="border border-[#080E1A]/15 bg-white/50 p-6">
                  <p className="font-medium">
                    {s.url ? (
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-sky-500"
                      >
                        {s.label}
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </a>
                    ) : (
                      s.label
                    )}
                  </p>
                  {s.note && (
                    <p className="mt-2 text-sm leading-7 text-[#080E1A]/65">{s.note}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F1E8]" />}>
      <EntryContent params={params} />
    </Suspense>
  );
}