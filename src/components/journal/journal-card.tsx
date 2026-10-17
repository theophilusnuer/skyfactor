"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { JournalEntry } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";

export default function JournalCard({
  entry,
  index = 0,
}: {
  entry: JournalEntry;
  index?: number;
}) {
  const reduceMotion = useReducedMotion();
  const src = entry.coverImage?.asset
    ? urlFor(entry.coverImage).width(900).height(600).fit("crop").url()
    : null;
  const meta = [
    entry.momentsCount ? `${entry.momentsCount} moments` : null,
    entry.chaptersCount ? `${entry.chaptersCount} chapters` : null,
  ].filter(Boolean);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: reduceMotion ? 0 : (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col border border-[#080E1A]/15 bg-white/50 backdrop-blur-sm transition-colors duration-300 hover:border-sky-400 hover:bg-white/80"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-[#080E1A]/[0.06]">
        {src && (
          <Image
            src={src}
            alt={entry.coverImage?.alt || entry.title}
            fill
            sizes="(max-width: 1023px) 90vw, 30vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {entry.guestName && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
            {entry.guestName}
          </p>
        )}
        <h3 className="mt-3 text-2xl font-medium leading-[1.1] tracking-[-0.04em]">
          <Link
            href={`/journal/${entry.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-sky-400"
          >
            {entry.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#080E1A]/65">
          {entry.summary}
        </p>
        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#080E1A]/50">
            {meta.join(" · ")}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 text-sky-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>
      </div>
    </motion.article>
  );
}
