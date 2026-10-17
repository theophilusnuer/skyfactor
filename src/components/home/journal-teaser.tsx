"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { JournalEntry } from "@/types/sanity";
import { JOURNAL_CONTENT as content } from "@/lib/journal-defaults";
import JournalCard from "@/components/journal/journal-card";
import { InitiativesBackdropInverse } from "../initiatives/initiatives-backdrop";

export default function JournalTeaser({ entries }: { entries: JournalEntry[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="journal-teaser-heading"
      className="relative z-35 overflow-hidden bg-[#F5F1E8] text-[#101820] shadow-[0_-30px_60px_-20px_rgba(16,24,32,0.45)] sm:rounded-t-[3rem] pt-8"
    >
      <InitiativesBackdropInverse/>

      <div className="relative mx-auto max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24 xl:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-500">
              {content.eyebrow}
            </p>
            <h2
              id="journal-teaser-heading"
              className="mt-5 text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-[-0.07em]"
            >
              {content.titleLead}{" "}
              
            </h2>
          </div>
          <p className="max-w-md text-base leading-8 text-[#101820]/65">
            {content.intro}
          </p>
        </motion.div>

        {entries.length > 0 ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {entries.slice(0, 3).map((entry, i) => (
              <JournalCard key={entry._id} entry={entry} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-14 border border-[#101820]/15 bg-white/50 p-8 text-[#101820]/60">
            The first journal entries will appear here soon.
          </p>
        )}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/journal"
            className="group inline-flex min-h-14 items-center justify-between gap-7 border border-[#101820]/70 bg-white/40 px-5 py-3 text-sm font-medium text-[#101820] transition-colors duration-300 hover:border-sky-400 hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 sm:min-w-56"
          >
            <span>Explore the journal</span>
            <span className="flex size-10 shrink-0 items-center justify-center bg-gradient-to-br from-blue-500 to-sky-400 text-white transition-transform duration-300 group-hover:translate-x-1">
              <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.8} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
