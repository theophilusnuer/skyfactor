
"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Guest } from "@/types/sanity";
import GuestCard from "@/components/guests/guest-card";
import { useStickyTop } from "@/lib/use-sticky-top";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const guestVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function GuestTeaser({ guests }: { guests: Guest[] }) {
  const reduceMotion = useReducedMotion();
  const { ref, top } = useStickyTop<HTMLElement>();

  if (guests.length === 0) return null;

  const visibleGuests = guests.slice(0, 4);

  return (
    <section
      ref={ref}
      aria-labelledby="guest-teaser-heading"
      className="sticky z-25 overflow-hidden bg-[#0B1320] text-white"
      style={{ top }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(40,119,212,0.18),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[90rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24 xl:px-20">
        {/* Heading */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-400">
            The Guests
          </p>

          <h2
            id="guest-teaser-heading"
            className="mt-5 text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.065em]"
          >
            Meet the{" "}
            <em className="font-playfair font-normal tracking-[-0.05em]">
              voices
            </em>{" "}
            in the room.
          </h2>
        </motion.div>

        {/* Sequential guest entrance */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="-mx-5 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-0"
        >
          {visibleGuests.map((guest, index) => (
            <motion.div
              key={guest._id}
              variants={reduceMotion ? undefined : guestVariants}
              className={`w-[68vw] shrink-0 snap-center sm:w-[40vw] lg:w-auto ${
                index % 2 === 1 ? "lg:mt-14" : ""
              }`}
            >
              <GuestCard guest={guest} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.5 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/guests"
            className="group inline-flex min-h-14 items-center justify-between gap-7 border border-white/70 bg-white/[0.025] px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-sky-300 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 sm:min-w-56"
          >
            <span>All guests</span>

            <span className="flex size-10 shrink-0 items-center justify-center bg-gradient-to-br from-blue-500 to-sky-400 text-white transition-transform duration-300 group-hover:translate-x-1">
              <ArrowUpRight
                aria-hidden="true"
                className="size-5"
                strokeWidth={1.8}
              />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
