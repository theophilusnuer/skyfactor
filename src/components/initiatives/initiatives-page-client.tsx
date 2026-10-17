"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { motion, useReducedMotion } from "framer-motion";
import type { Initiative } from "@/types/sanity";
import { DEFAULT_PAGE_CONTENT as content } from "@/lib/initiatives-defaults";
import { urlFor } from "@/sanity/lib/image";
import InitiativesBackdrop from "@/components/initiatives/initiatives-backdrop";
import InitiativeCta from "@/components/initiatives/initiative-cta";
import { portableTextComponents } from "@/components/host/portable-text-components";

const DRAW_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATUS_LABEL = {
  active: "Active",
  upcoming: "Upcoming",
  completed: "Completed",
} as const;

function InitiativeRow({
  initiative,
  index,
}: {
  initiative: Initiative;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");
  const src = initiative.image?.asset
    ? urlFor(initiative.image).width(900).height(700).fit("crop").url()
    : null;

  return (
    <motion.li
      id={initiative.slug}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group relative scroll-mt-32 border-b border-[#080E1A]/15 transition-colors duration-300 hover:bg-[#080E1A]/[0.035]"
    >
      <div className="grid gap-8 p-5 py-10 sm:p-8 sm:py-14 lg:grid-cols-12 lg:gap-10">
        <div className="flex items-start justify-between gap-4 lg:col-span-2 lg:flex-col lg:justify-start">
          <span className="text-[0.925rem] font-bold tabular-nums tracking-[0.16em] text-sky-500">
            {number}
          </span>
          {initiative.eyebrow && (
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#080E1A]/55">
              {initiative.eyebrow}
            </span>
          )}
        </div>

        <div className="lg:col-span-6">
          {initiative.category && (
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
              <span aria-hidden="true" className="h-px w-8 bg-sky-400" />
              {initiative.category}
              {initiative.status && (
                <span className="border border-sky-400 px-2 py-0.5 text-[0.65rem] text-sky-600">
                  {STATUS_LABEL[initiative.status]}
                </span>
              )}
            </p>
          )}

          <h2 className="mt-5 text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.075em] transition-transform duration-500 group-hover:translate-x-2">
            {initiative.title}
            <span className="text-sky-500">.</span>
          </h2>

          {initiative.location && (
            <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#080E1A]/55">
              <MapPin aria-hidden="true" className="size-4 text-sky-500" />
              {initiative.location}
            </p>
          )}

          <p className="mt-6 max-w-xl text-base leading-8 text-[#080E1A]/70 sm:text-lg">
            {initiative.summary}
          </p>

          {initiative.description && initiative.description.length > 0 && (
            <div className="mt-6 max-w-xl">
              <PortableText
                value={initiative.description}
                components={portableTextComponents}
              />
            </div>
          )}

          {initiative.stats && initiative.stats.length > 0 && (
            <dl className="mt-8 grid max-w-xl grid-cols-2 border-l border-t border-[#080E1A]/15 sm:grid-cols-3">
              {initiative.stats.map((s) => (
                <div key={s.label} className="border-b border-r border-[#080E1A]/15 p-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#080E1A]/55">
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-3xl font-medium tracking-[-0.05em]">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-9">
            <InitiativeCta
              href={initiative.ctaUrl || "/contact"}
              label={initiative.ctaLabel || "Explore collaboration"}
            />
          </div>
        </div>

        {src && (
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/3] overflow-hidden border border-[#080E1A]/15 bg-[#080E1A] lg:aspect-[4/5]">
              <Image
                src={src}
                alt={initiative.image?.alt || initiative.title}
                fill
                sizes="(max-width: 1023px) 100vw, 30vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        )}
      </div>
    </motion.li>
  );
}

export default function InitiativesPageClient({
  initiatives,
}: {
  initiatives: Initiative[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden bg-[#F5F1E8] text-[#080E1A]">
      <InitiativesBackdrop />

      <div className="relative mx-auto max-w-[112.5rem] px-5 py-16 sm:px-8 lg:px-14 xl:px-20">
        <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-[#080E1A]/15 pb-5">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#080E1A]/55 md:text-[0.985rem]">
            {content.eyebrow}
          </span>
          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.5, ease: DRAW_EASE }}
            className="absolute inset-x-0 -bottom-px h-px origin-left bg-sky-400"
          />
        </div>

        <div className="grid gap-10 py-10 sm:py-16 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-9">
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[clamp(2.5rem,9vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.075em] lg:text-[clamp(3rem,6vw,6.5rem)]"
            >
              <span className="block">{content.titleLead}</span>
              
            </motion.h1>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-[0.925rem] font-bold uppercase tracking-[0.18em] text-[#080E1A]/60 sm:mt-8 sm:tracking-[0.22em]"
            >
              
              {content.intro}
            </motion.p>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-sky-500 sm:mt-8 sm:tracking-[0.22em]"
            >
              <span
                aria-hidden="true"
                className="mr-3 inline-block h-px w-6 bg-sky-400 align-middle sm:mr-4 sm:w-12"
              />
              {content.kicker}
            </motion.p>
            
          </div>

     
        </div>

        <div className="border-t border-[#080E1A]/15">
          <h3 className="py-4 text-base font-semibold uppercase tracking-[0.25em]">
            The initiatives
          </h3>
          <ol className="border-t border-[#080E1A]/15">
            {initiatives.map((initiative, i) => (
              <InitiativeRow key={initiative._id} initiative={initiative} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
