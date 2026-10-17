"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import type { Host } from "@/types/sanity";
import { urlFor } from "@/sanity/lib/image";
import FullBioModal from "@/components/host/full-bio-modal";
import SectionLabel from "@/components/host/section-label";
import { portableTextComponents } from "@/components/host/portable-text-components";

export default function HostIntro({ host }: { host: Host }) {
  const hostName = host.name || "Richard Sky";
  const headline =
    host.headline ||
    "A Ghanaian editorial voice. An open invitation to the world.";

  const profileImage = host.profileImage;
  const imageUrl = profileImage ? urlFor(profileImage) : null;

  const imageSrc = imageUrl
    ? imageUrl.width(1400).height(1700).fit("crop").url()
    : "/images/host-portrait.jpg";

  const imageAlt = profileImage?.alt || `${hostName} portrait`;

  const profileBlocks = host.profile ?? [];
  const hasFullBio = (host.fullBio ?? []).some((b: any) =>
    b?.children?.some((c: any) => c?.text?.trim()),
  );

  // Pin the intro so the next sections slide over it, but only once the intro's
  // bottom edge is visible, so taller-than-viewport intros can still be read fully.
  const introRef = useRef<HTMLElement>(null);
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    const update = () =>
      setStickyTop(Math.min(0, window.innerHeight - el.offsetHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={introRef}
      aria-labelledby="host-heading"
      className="sticky z-0 bg-[#F5F1E8]"
      style={{ top: stickyTop }}
    >
      <div className="mx-auto max-w-screen-2xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-12 lg:pb-28 xl:px-16">
        <div className="flex items-center justify-between gap-4 pb-5">
          <SectionLabel>The person behind the questions</SectionLabel>

          <span className="hidden text-xs uppercase tracking-[0.14em] text-[#101820]/45 md:block">
            Accra, Ghana · Global perspective
          </span>
        </div>

        <div className="grid items-start gap-10 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:pt-16">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="border-b border-r border-sky-400 pb-2.5 pr-2.5">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/35 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                  <div className="text-white">
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="mb-2 font-playfair text-2xl sm:text-3xl"
                    >
                      {hostName}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xs uppercase tracking-[0.18em] text-white/75"
                    >
                      Journalist · Lawyer · Speaker
                    </motion.p>
                  </div>

                  <span className="flex size-10 shrink-0 items-center justify-center border border-white/50 text-white">
                    <ArrowDownRight className="size-5" />
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-sky-400">
                The host
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-sky-400">
                SkyFactor
              </span>
            </div>
          </motion.div>

          {/* Name and biography */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 lg:pt-8"
          >
            <h1
              id="host-heading"
              className="text-[clamp(3.25rem,7vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.075em]"
            >
              {hostName}
              <motion.span
                initial={{ scale: 1, rotate: 0 }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 3,
                }}
                className="inline-block text-sky-400"
              >
                .
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-7 max-w-2xl font-playfair text-[clamp(1.5rem,3vw,2.75rem)] italic leading-[1.2] tracking-[-0.035em] text-[#101820]/75"
            >
              {headline}
            </motion.p>

            <div className="my-8 h-px max-w-2xl bg-[#101820]/15">
              <div className="h-px w-1/4 bg-[#2877D4]" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="max-w-2xl"
            >
              {profileBlocks.length > 0 ? (
                <PortableText
                  value={profileBlocks}
                  components={portableTextComponents}
                />
              ) : (
                <>
                  <p className="text-base leading-8 text-[#101820]/75 sm:text-lg sm:leading-9">
                    Journalist. Lawyer. Speaker. Richard brings more than two
                    decades of frontline journalism and legal understanding to
                    conversations about the people and forces shaping our lives.
                  </p>

                  <p className="mt-6 text-base leading-8 text-[#101820]/75 sm:text-lg sm:leading-9">
                    SkyFactor is built on the conviction that the right
                    conversation can open minds, challenge assumptions and
                    illuminate what matters.
                  </p>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              {hasFullBio && (
                <FullBioModal name={hostName}>
                  <PortableText
                    value={host.fullBio ?? []}
                    components={portableTextComponents}
                  />
                </FullBioModal>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
