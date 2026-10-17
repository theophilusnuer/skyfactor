"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Interview } from "@/types/sanity";
import InterviewCard from "@/components/watch-listen/interview-card";

export default function WatchListenTeaser({
  interviews,
}: {
  interviews: Interview[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="watch-listen-teaser-heading"
      className="relative z-20 overflow-hidden bg-[#F5F1E8] text-[#101820]"
    >
      <div className="mx-auto max-w-[90rem] px-5 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-20 xl:px-20">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3">
              <motion.span
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                className="h-px w-8 origin-left bg-[#2877D4]"
              />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2877D4]">
                Watch &amp; Listen
              </span>
            </div>
            <h2
              id="watch-listen-teaser-heading"
              className="mt-5 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.065em]"
            >
              Different voices.{" "}
              <em className="font-playfair font-normal tracking-[-0.05em]">
                Deeper perspectives.
              </em>
            </h2>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <SeeMore />
          </motion.div>
        </div>

        {interviews.length > 0 ? (
          <div className="mt-10 grid gap-4 border-l border-[#101820]/15 md:grid-cols-2 xl:grid-cols-3 sm:mt-12">
            {interviews.map((interview, i) => (
              <InterviewCard key={interview._id} interview={interview} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-[#101820]/15 p-10 text-center text-sm text-[#101820]/60 sm:mt-12">
            New conversations are on their way.
          </div>
        )}
      </div>
    </section>
  );
}

function SeeMore() {
  return (
    <Link
      href="/watch-listen"
      className="group inline-flex min-h-14 items-center justify-between gap-7 border border-[#101820] bg-transparent px-5 py-3 text-sm font-medium text-[#101820] transition-all duration-300 hover:border-[#2877D4] hover:bg-[#101820]/[0.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2877D4] sm:min-w-56"
    >
      <span>See more</span>
      <span className="flex size-10 shrink-0 items-center justify-center bg-gradient-to-br from-blue-500 to-sky-400 text-white transition-transform duration-300 group-hover:translate-x-1">
        <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.8} />
      </span>
    </Link>
  );
}
