"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Initiative } from "@/types/sanity";
import { DEFAULT_PAGE_CONTENT as content } from "@/lib/initiatives-defaults";
import InitiativesBackdrop from "@/components/initiatives/initiatives-backdrop";
import InitiativeCard from "@/components/initiatives/initiative-card";
import { useStickyTop } from "@/lib/use-sticky-top";

export default function InitiativesTeaser({ initiatives }: { initiatives: Initiative[] }) {
  const reduceMotion = useReducedMotion();
    const { ref, top } = useStickyTop<HTMLElement>();
  

  return (
    <section
    ref={ref}
      aria-labelledby="initiatives-teaser-heading"
      className="sticky z-30 overflow-hidden bg-[#F5F1E8] text-[#101820] shadow-[0_-30px_60px_-20px_rgba(16,24,32,0.45)] sm:rounded-t-[3rem] pt-8"
     style={{ top }}
    >
      <InitiativesBackdrop />

      <div className="relative mx-auto max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24 xl:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-500">
            {content.eyebrow}
          </p>
          <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#101820]/50">
            {content.kicker}
          </p>
          <h2
            id="initiatives-teaser-heading"
            className="mt-6 text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.98] tracking-[-0.07em]"
          >
            {content.titleLead}{" "}
            <em className="font-playfair font-normal tracking-[-0.05em]">
              {content.titleAccent}
            </em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#101820]/65 sm:text-lg">
            {content.intro}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {initiatives.slice(0, 2).map((initiative, i) => (
            <InitiativeCard key={initiative._id} initiative={initiative} index={i} />
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <Link
            href="/initiatives"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#101820]/70 underline decoration-sky-400 decoration-2 underline-offset-8 transition-colors hover:text-sky-500"
          >
            View all initiatives
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
