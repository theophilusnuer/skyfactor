"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { getPortableTextComponents } from "@/components/host/portable-text-components";
import type { Host } from "@/types/sanity";

export default function HostAchievements({
  achievements,
  about,
}: {
  achievements: NonNullable<Host["achievements"]>;
  about?: Host["aboutSkyFactor"];
}) {
  const hasAbout = Boolean(
    about?.title || about?.tagline || (about?.shortBio?.length ?? 0) > 0,
  );
  if (achievements.length === 0 && !hasAbout) return null;

  const components = getPortableTextComponents({
  normalTextClassName: "text-white/75",
});

  return (
    <section
      aria-labelledby="achievements-heading"
      className="relative overflow-hidden bg-[#101820] text-[#F5F1E8] shadow-[0_-30px_60px_-20px_rgba(16,24,32,0.45)] sm:rounded-t-[3rem] pt-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(40,119,212,0.12),transparent_40%),radial-gradient(ellipse_at_80%_100%,rgba(91,22,170,0.1),transparent_45%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(245,241,232,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,232,0.3)_1px,transparent_1px)] [background-size:80px_80px]"
      />

      <div className="relative mx-auto max-w-screen-2xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
        {hasAbout && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className={`grid gap-8 lg:grid-cols-12 lg:gap-12 ${
              achievements.length > 0
                ? "mb-16 border-b border-white/15 pb-16 sm:mb-20 sm:pb-20"
                : ""
            }`}
          >
            <div className="lg:col-span-5">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-sky-400">
                <span aria-hidden="true" className="h-px w-8 bg-sky-400" />
                About SkyFactor
              </p>
              {about?.title && (
                <h2 className="mt-6 text-4xl font-medium leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                  {about.title}
                </h2>
              )}
              {about?.tagline && (
                <p className="mt-5 font-playfair text-lg italic leading-8 text-white/65 sm:text-2xl">
                  {about.tagline}
                </p>
              )}
              
            </div>
            {(about?.shortBio?.length ?? 0) > 0 && (
              <div className="space-y-5 text-base leading-8 text-white/70 sm:text-lg sm:leading-9 lg:col-span-7">
                <PortableText
                  value={about!.shortBio!}
                  components={components}
                />
              </div>
            )}
          </motion.div>
        )}
        {achievements.length > 0 && (
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-4"
          >
            <h2
              id="achievements-heading"
              className="sm:mt-6 max-w-sm text-4xl font-medium leading-tight tracking-[-0.06em] text-sky-400 sm:text-5xl"
            >
              A record of work.
            </h2>

            <p className="mt-5 max-w-sm text-[0.955rem] leading-7 text-white/55">
              Selected achievements and features from across a career shaped by
              journalism, law and public conversation.
            </p>
          </motion.div>

          <div className="lg:col-span-8">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="h-px origin-left bg-white/25"
            />
            <div>
              {achievements.map((achievement, index) => {
                const row = (
                  <>
                    <span className="w-14 shrink-0 font-manrope text-xs tabular-nums text-[#60A5FA]/70 transition-colors group-hover:text-[#60A5FA] sm:w-20 sm:text-lg">
                      {achievement.year || String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-medium transition-transform duration-300 group-hover:translate-x-2 sm:text-xl">
                        {achievement.title}
                      </span>

                      {achievement.source && (
                        <span className="mt-1 block text-xs uppercase tracking-[0.12em] text-white/45">
                          {achievement.source}
                        </span>
                      )}
                    </span>

                    {achievement.url && (
                      <ArrowUpRight className="size-5 shrink-0 text-white/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#60A5FA]" />
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#2877D4] transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </>
                );

                const className =
                  "group relative flex items-center gap-4 border-b border-white/15 py-5 transition-colors hover:bg-white/[0.04] sm:gap-6 sm:py-7";

                return (
                  <motion.div
                    key={achievement._key || index}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.7,
                      delay: Math.min(index, 4) * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    {achievement.url ? (
                      <a
                        href={achievement.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {row}
                      </a>
                    ) : (
                      <div className={className}>{row}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
