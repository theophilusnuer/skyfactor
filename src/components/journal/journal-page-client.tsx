"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { JournalEntry } from "@/types/sanity";
import { JOURNAL_CONTENT as content } from "@/lib/journal-defaults";
import InitiativesBackdrop from "@/components/initiatives/initiatives-backdrop";
import JournalCard from "@/components/journal/journal-card";

export default function JournalPageClient({ entries }: { entries: JournalEntry[] }) {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) =>
      [e.title, e.summary, e.guestName, e.searchText]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [entries, query]);

  return (
    <div className="relative overflow-hidden bg-[#F5F1E8] text-[#080E1A]">
      <InitiativesBackdrop />
      <div className="relative mx-auto max-w-[90rem] px-5 pb-24 pt-16 sm:px-8 lg:px-14 lg:pt-24 xl:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl"
        >
          <p className="text-base font-bold uppercase tracking-[0.3em] text-sky-500">
            {content.eyebrow}
          </p>
          <h1 className="mt-5 text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.96] tracking-[-0.07em]">
            {content.titleLead}{" "}
            
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8  text-[#080E1A]/65 sm:text-lg">
            {content.intro}
          </p>
          <p className="mt-6 border-t border-sky-300 max-w-3xl text-base leading-8 text-sky-500 sm:text-lg">
            {content.sub}
          </p>
        </motion.div>

        <div className="mt-12 flex items-center border border-[#080E1A]/25 bg-white/60 focus-within:border-sky-400 sm:max-w-xl">
          <Search aria-hidden="true" className="ml-4 size-5 text-[#080E1A]/50" />
          <label htmlFor="journal-search" className="sr-only">
            Search the journal
          </label>
          <input
            id="journal-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search moments, transcripts, chapters…"
            className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm placeholder:text-[#080E1A]/40 focus:outline-none"
          />
        </div>

        {results.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((entry, i) => (
              <JournalCard key={entry._id} entry={entry} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-[#080E1A]/60" role="status">
            {entries.length === 0
              ? "The first journal entries will appear here soon."
              : `No entries match “${query}”.`}
          </p>
        )}
      </div>
    </div>
  );
}
