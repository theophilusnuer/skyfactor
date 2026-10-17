"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Initiative } from "@/types/sanity";
import InitiativeCta from "@/components/initiatives/initiative-cta";

export default function InitiativeCard({
  initiative,
  index,
}: {
  initiative: Initiative;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group relative flex flex-col border border-[#101820]/20 bg-white/50 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-sky-400 sm:p-9"
    >
      <div className="flex items-center justify-between gap-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-sky-500">
        <span>
          {number}
          {initiative.eyebrow ? ` / ${initiative.eyebrow}` : ""}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 text-[#101820]/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sky-500"
        />
      </div>

      {initiative.category && (
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#101820]/55">
          {initiative.category}
        </p>
      )}
      <h3 className="mt-3 text-[clamp(2.5rem,5vw,4rem)] font-medium leading-none tracking-[-0.06em] text-[#101820]">
        {initiative.title}
        <span className="text-sky-500">.</span>
      </h3>
      <p className="mt-6 max-w-md text-base leading-8 text-[#101820]/70">
        {initiative.summary}
      </p>

      <div className="mt-8 pt-2">
        <InitiativeCta
          href={initiative.ctaUrl || "/contact"}
          label={initiative.ctaLabel || "Explore collaboration"}
        />
      </div>
    </motion.article>
  );
}
