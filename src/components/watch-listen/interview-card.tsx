
"use client";

import Image from "next/image";
import { ArrowUpRight, Headphones, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Interview } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import {
  PLATFORM_LABELS,
  getPlatform,
  getYouTubeThumbnail,
} from "@/lib/media";

type InterviewCardProps = {
  interview: Interview;
  index?: number;
  variant?: "standard" | "featured";
};

export default function InterviewCard({
  interview,
  index = 0,
  variant = "standard",
}: InterviewCardProps) {
  const reduceMotion = useReducedMotion();
  const platform = getPlatform(interview.url);
  const platformLabel = PLATFORM_LABELS[platform];
  const isListen = interview.mediaType === "listen";
  const action = isListen ? "Listen" : "Watch";
  const isFeatured = variant === "featured";

  const thumbSrc = interview.thumbnail?.asset
    ? urlFor(interview.thumbnail).width(1600).height(1200).fit("crop").url()
    : getYouTubeThumbnail(interview.url);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay: reduceMotion ? 0 : (index % 3) * 0.08,
        ease: "easeOut",
      }}
      className={`group min-w-0 border border-[#101820]/15 bg-[#F5F1E8] ${
        isFeatured ? "border-l-0" : ""
      }`}
    >
      <a
        href={interview.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${interview.title} — open on ${platformLabel}`}
        className={`group/link flex h-full flex-col focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2877D4] ${
          isFeatured ? "lg:grid lg:grid-cols-12" : ""
        }`}
      >
        {/* Artwork */}
        <div
          className={`relative isolate overflow-hidden bg-[#101820] ${
            isFeatured
              ? "aspect-[4/3] sm:aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[32rem]"
              : "aspect-[5/3]"
          }`}
        >
          {thumbSrc ? (
            <Image
              src={thumbSrc}
              alt={interview.thumbnail?.alt || interview.title}
              fill
              priority={isFeatured}
              sizes={
                isFeatured
                  ? "(max-width: 1023px) 100vw, 58vw"
                  : "(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
              }
              className={`object-cover transition-transform duration-700 ease-out ${
                reduceMotion
                  ? ""
                  : "group-hover/link:scale-[1.04]"
              }`}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(40,119,212,0.35),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(91,22,170,0.3),transparent_55%)]" />
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#101820]/75 via-[#101820]/5 to-[#101820]/10"
          />

          {/* Image metadata */}
          <div className="absolute left-0 top-0 flex items-center gap-2 bg-[#101820] px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white sm:px-4">
            <span className="size-1.5 bg-[#6EA8F5]" />
            {platformLabel}
          </div>

          {isFeatured && (
            <span className="absolute bottom-5 left-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/80 sm:bottom-7 sm:left-7">
              A SkyFactor conversation
            </span>
          )}

          {/* Play / listen affordance */}
          <span
            className={`absolute bottom-0 right-0 flex items-center justify-center bg-[#2877D4] text-white transition-colors duration-300 group-hover/link:bg-[#101820] ${
              isFeatured ? "size-16 sm:size-20" : "size-12"
            }`}
          >
            {isListen ? (
              <Headphones
                aria-hidden="true"
                className={isFeatured ? "size-7" : "size-5"}
                strokeWidth={1.6}
              />
            ) : (
              <Play
                aria-hidden="true"
                className={isFeatured ? "ml-1 size-7" : "ml-0.5 size-5"}
                fill="currentColor"
                strokeWidth={1.5}
              />
            )}
          </span>
        </div>

        {/* Editorial content */}
        <div
          className={`flex min-w-0 flex-1 flex-col ${
            isFeatured
              ? "justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10 xl:p-12"
              : "p-5 sm:p-6"
          }`}
        >
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#101820]/50">
              <span className="text-[#2877D4]">{action}</span>
              
            </div>

            <h3
              className={`mt-4 font-medium leading-[1.08] tracking-[-0.055em] transition-colors duration-300 group-hover/link:text-[#2877D4] ${
                isFeatured
                  ? "text-3xl sm:text-4xl lg:text-[clamp(2rem,3vw,3.5rem)]"
                  : "text-xl sm:text-2xl"
              }`}
            >
              {interview.title}
            </h3>

            {interview.guestName && (
              <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#101820]/55">
                Featuring {interview.guestName}
              </p>
            )}

            {interview.summary && (
              <p
                className={`mt-4 text-sm leading-7 text-[#101820]/65 ${
                  isFeatured ? "max-w-lg sm:mt-6 sm:text-base sm:leading-8" : "line-clamp-3"
                }`}
              >
                {interview.summary}
              </p>
            )}
          </div>

          <div
            className={`mt-7 flex items-center justify-between border-t border-[#101820]/15 pt-4 ${
              isFeatured ? "sm:mt-10 sm:pt-5" : "mt-auto"
            }`}
          >
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[#101820]/75 transition-colors group-hover/link:text-[#2877D4] sm:text-xs">
              {isFeatured ? "Enter the conversation" : `${action} on ${platformLabel}`}
            </span>

            <ArrowUpRight
              aria-hidden="true"
              className={`shrink-0 transition-transform duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 ${
                isFeatured ? "size-5" : "size-4"
              }`}
              strokeWidth={1.6}
            />
          </div>
        </div>
      </a>
    </motion.article>
  );
}
