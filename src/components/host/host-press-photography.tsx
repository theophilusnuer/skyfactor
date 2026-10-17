"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Host } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import SectionLabel from "@/components/host/section-label";

export default function HostPressPhotography({
  photos,
  hostName,
}: {
  photos: NonNullable<Host["pressPhotography"]>;
  hostName: string;
}) {
  if (!photos.some((photo) => photo?.asset)) return null;

  return (
    <section
      aria-labelledby="press-heading"
      className="relative -mt-[100vh] rounded-t-[2rem] bg-[#F5F1E8] shadow-[0_-30px_60px_-20px_rgba(16,24,32,0.45)] sm:rounded-t-[3rem]"
    >
      <div className="mx-auto max-w-screen-2xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SectionLabel>The visual archive</SectionLabel>
            <h2
              id="press-heading"
              className="mt-5 text-3xl font-medium tracking-[-0.055em] sm:text-5xl"
            >
              Press photography
              <motion.span
                initial={{ scale: 1, rotate: 0 }}
                animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 4,
                }}
                className="inline-block text-[#2877D4]"
              >
                .
              </motion.span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-sm text-sm leading-7 text-[#101820]/60"
          >
            Selected portraits and images from Richard&apos;s professional
            journey.
          </motion.p>
        </div>

        {/* Masonry gallery: images keep their natural proportions */}
        <div className="mt-10 columns-2 gap-3 sm:gap-5 lg:columns-3">
          {photos.map((photo, index) => {
            if (!photo?.asset) return null;

            const ref: string = (photo.asset as { _ref?: string })._ref ?? "";
            const dims = ref.match(/-(\d+)x(\d+)-/);
            const width = dims ? Number(dims[1]) : 1000;
            const height = dims ? Number(dims[2]) : 1250;

            const builder = urlFor(photo);
            const src = builder
              ? builder.width(1000).url()
              : "/images/host-portrait.jpg";

            return (
              <motion.figure
                key={photo._key || index}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.8,
                  delay: (index % 3) * 0.1,
                  ease: "easeOut",
                }}
                className="group relative mb-3 break-inside-avoid overflow-hidden bg-[#DED8CD] sm:mb-5"
              >
                <Image
                  src={src}
                  alt={
                    photo.alt || `${hostName} — press photograph ${index + 1}`
                  }
                  width={width}
                  height={height}
                  sizes="(max-width: 1023px) 50vw, 33vw"
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {(photo.caption || photo.credit) && (
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-[#101820]/85 via-[#101820]/50 to-transparent p-4 pt-12 text-white transition-transform duration-500 ease-out group-hover:translate-y-0 max-lg:translate-y-0">
                    {photo.caption && (
                      <span className="block text-sm">{photo.caption}</span>
                    )}

                    {photo.credit && (
                      <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.14em] text-white/60">
                        Photo: {photo.credit}
                      </span>
                    )}
                  </figcaption>
                )}
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
