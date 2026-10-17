"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Guest } from "@/types/sanity";
import GuestCard from "@/components/guests/guest-card";

export default function GuestsPageClient({ guests }: { guests: Guest[] }) {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const visible = guests.filter(
    (g) =>
      !q ||
      [g.name, g.jobTitle, g.organization]
        .filter(Boolean)
        .some((s) => s!.toLowerCase().includes(q)),
  );

  return (
    <div className="relative overflow-hidden bg-[#0B1320] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(40,119,212,0.2),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-[90rem] px-5 pb-24 pt-16 sm:px-8 sm:pt-24 lg:px-14 xl:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-400">
            The Guests
          </p>
          <h1 className="mt-6 text-[clamp(2.75rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.07em]">
            Voices worth{" "}
            <em className="font-playfair font-normal tracking-[-0.05em]">
              hearing
            </em>
            .
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/60 sm:text-lg">
            The leaders, thinkers and builders who have sat down with Richard Sky.
          </p>

          <label className="mx-auto mt-10 flex max-w-md items-center gap-3 border-b border-white/30 pb-3 focus-within:border-sky-400">
            <Search aria-hidden="true" className="size-4 shrink-0 text-white/50" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, role or organisation"
              aria-label="Search guests"
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
            />
          </label>
        </motion.div>

        {visible.length > 0 ? (
          <div
            key={q}
            className="mt-20 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visible.map((guest, i) => (
              <div
                key={guest._id}
                className={i % 2 === 1 ? "sm:mt-14" : ""}
              >
                <GuestCard guest={guest} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-20 text-center text-sm text-white/60">
            {guests.length === 0
              ? "Our guests will appear here soon."
              : "No guests match your search."}
          </p>
        )}
      </div>
    </div>
  );
}
