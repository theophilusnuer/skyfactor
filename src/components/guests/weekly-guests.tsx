"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Guest } from "@/types/sanity";
import { GuestFeatureCard } from "@/components/guests/guest-feature-card";

export function WeeklyGuestsSection({ guests }: { guests: Guest[] }) {
  const reduceMotion = useReducedMotion();
  if (guests.length === 0) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3.2fr)] lg:gap-12">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-left lg:sticky lg:top-32 lg:self-start"
      >
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-sky-400">
          <span aria-hidden="true" className="h-px w-8 bg-sky-400" />
          Featured
        </p>
        <h2 className="mt-4 text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.02] tracking-[-0.06em]">
          This week&rsquo;s{" "}
          <em className="font-playfair font-normal tracking-[-0.04em]">
            {guests.length > 1 ? "guests" : "guest"}
          </em>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6">
        {guests.map((guest, i) => (
          <GuestFeatureCard key={guest._id} guest={guest} index={i} />
        ))}
      </div>
    </div>
  );
}

export function ArchiveHeading() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.h2
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-3xl text-left font-playfair text-2xl italic leading-snug text-white/80 sm:text-3xl"
    >
      Every perspective has a story. Discover the voices joining the
      conversation.
    </motion.h2>
  );
}