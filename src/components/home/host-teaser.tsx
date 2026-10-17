"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Host } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";

const DEFAULT_HEADLINE =
  "A Ghanaian editorial voice. An open invitation to the world.";

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

type HostTeaserProps = {
  host: Host;
  showMoreLink?: boolean;
};

/**
 * Host teaser — sits directly after BrandPillars.
 * The brand pillars are sticky; this section slides up over them on scroll,
 * creating a "page turn" effect.
 */
export default function HostTeaser({
  host,
  showMoreLink = true,
}: HostTeaserProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  // Render portable text blocks as simple paragraphs
  const profileText =
    (host.aboutSkyFactor?.shortBio?.length ? host.aboutSkyFactor.shortBio : host.profile)
      ?.map((block: { children?: { text?: string }[] }) =>
        block.children?.map((child: { text?: string }) => child.text ?? "").join("") ?? "",
      )
      .filter(Boolean)
      .join("\n\n") ?? "";

  const hostName = host.name || "Richard Sky";
  const headline = host.aboutSkyFactor?.tagline || host.headline || DEFAULT_HEADLINE;
  const teaserTitle = host.aboutSkyFactor?.title || hostName;
  const profileImage = host.profileImage;
  const imageSrc = profileImage
    ? urlFor(profileImage).width(900).height(1100).fit("crop").url()
    : null;
  const imageAlt = profileImage?.alt || `${hostName} portrait`;

  return (
    <div ref={containerRef} className="relative">
      <section
        aria-labelledby="host-teaser-heading"
      className="relative z-15 overflow-hidden bg-[#101820] text-[#F5F1E8] shadow-[0_-30px_60px_-20px_rgba(16,24,32,0.45)] sm:rounded-t-[3rem] pt-8"
      >
       <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(40,119,212,0.12),transparent_40%),radial-gradient(ellipse_at_80%_100%,rgba(91,22,170,0.1),transparent_45%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(245,241,232,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,232,0.3)_1px,transparent_1px)] [background-size:80px_80px]"
      />

        <div className="relative mx-auto grid max-w-[90rem] items-center gap-8 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-[2fr_3fr] lg:gap-14 lg:px-14 lg:py-16 xl:px-20">
          {/* LEFT: Image with parallax */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="relative overflow-hidden">
            <motion.div style={{ y: imageY, scale: imageScale }} className="relative aspect-[4/5] w-full overflow-hidden">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
              ) : (
                <div
                  role="img"
                  aria-label={`${hostName} portrait coming soon`}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#182941] via-[#101C2E] to-[#080E1A] text-sm uppercase tracking-[0.18em] text-white/50"
                >
                  Portrait coming soon
                </div>
              )}
              {/* Subtle vignette */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#080E1A]/30 via-transparent to-transparent"
              />
            </motion.div>
            </div>

            {/* Name plate */}
            <div className="mt-4 flex items-center gap-3">
              <motion.span
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="h-px w-8 origin-left bg-[#2877D4]"
              />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-400">
                The Host
              </span>
            </div>
          </motion.div>

          {/* RIGHT: Brief profile */}
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
            }}
            className="flex flex-col justify-center"
          >
            <motion.h2
              variants={item}
              id="host-teaser-heading"
              className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.06em]"
            >
              {teaserTitle}
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-sky-400 sm:text-xs sm:tracking-[0.22em]"
            >
              {headline}
            </motion.p>

            {/* Profile — clamped to 4 lines */}
            <motion.div
              variants={item}
              className="mt-6 line-clamp-5 max-w-xl text-base leading-7 text-white/70 sm:text-[1.0625rem]"
            >
              {profileText.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>

            {/* CTA */}
            {showMoreLink && (
              <motion.div variants={item} className="mt-8">
                <Link
                  href="/host"
                  className="group inline-flex min-h-14 items-center justify-between gap-7 border border-white/70 bg-white/[0.025] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-sky-300 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 sm:min-w-56"
                >
                  <span>About the Host</span>
                  <span className="flex size-10 shrink-0 items-center justify-center bg-gradient-to-br from-blue-500 to-sky-400 text-white transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </span>
                </Link>
              </motion.div>
            )}

            {/* Press / achievements preview — if available */}
            {host.achievements && host.achievements.length > 0 && (
              <motion.div variants={item} className="mt-8">
                <p className="mb-3 text-[0.625rem] uppercase tracking-[0.18em] text-white/40">
                  Featured in
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {host.achievements.slice(0, 4).map((a, i) => (
                    <span
                      key={i}
                      className="text-xs uppercase tracking-[0.12em] text-white/55"
                    >
                      {a.source || a.title}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
