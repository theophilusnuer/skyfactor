"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Guest } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function GuestFeatureCard({
  guest,
  index = 0,
}: {
  guest: Guest;
  index?: number;
}) {
  const reduceMotion = useReducedMotion();
  const src = guest.photo?.asset
    ? urlFor(guest.photo).width(900).height(1100).fit("crop").url()
    : null;
  const role = [guest.jobTitle, guest.organization].filter(Boolean).join(" · ");
  const excerpt = guest.excerpt
    ? guest.excerpt.length > 260
      ? `${guest.excerpt.slice(0, 260).trimEnd()}…`
      : guest.excerpt
    : null;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/guests/${guest.slug}`}
        className="group grid border border-white/20 bg-white/[0.03] transition-colors duration-300 hover:border-sky-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#1a2433] sm:aspect-auto sm:min-h-[26rem]">
          {src ? (
            <Image
              src={src}
              alt={guest.photo?.alt || guest.name}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1279px) 30vw, 22vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-playfair text-6xl italic text-white/30">
              {initials(guest.name)}
            </div>
          )}
          <span className="absolute left-0 top-0 bg-sky-400 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#0B1320]">
            This week
          </span>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <h3 className="font-playfair text-3xl italic leading-tight tracking-tight text-white transition-colors group-hover:text-sky-300 sm:text-5xl">
            {guest.name}
          </h3>
          {role && (
            <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/55">
              {role}
            </p>
          )}
          {excerpt && (
            <p className="mt-6 text-base leading-8 text-white/65">{excerpt}</p>
          )}
          <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">
            Read profile
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
