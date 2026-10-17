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

export default function GuestCard({
  guest,
  index = 0,
}: {
  guest: Guest;
  index?: number;
}) {
  const reduceMotion = useReducedMotion();
  const src = guest.photo?.asset
    ? urlFor(guest.photo).width(720).height(960).fit("crop").url()
    : null;
  const role = [guest.jobTitle, guest.organization].filter(Boolean).join(" · ");

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: "easeOut" }}
    >
      <Link
        href={`/guests/${guest.slug}`}
        className="group flex h-full flex-col border border-white/20 bg-white/[0.03] text-left transition-colors duration-300 hover:border-sky-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a2433]">
          {src ? (
            <Image
              src={src}
              alt={guest.photo?.alt || guest.name}
              fill
              sizes="(max-width: 639px) 70vw, (max-width: 1023px) 33vw, 25vw"
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-playfair text-6xl italic text-white/30">
              {initials(guest.name)}
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0B1320]/70 via-transparent to-transparent"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="flex items-center justify-between gap-2 font-playfair text-2xl italic tracking-tight text-white transition-colors group-hover:text-sky-300">
            {guest.name}
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 shrink-0 text-white/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300"
            />
          </h3>
          {role && (
            <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/50">
              {role}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
