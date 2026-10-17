"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Tone = "paper" | "dark";

type BrandPillarsProps = {
  tone?: Tone;
};

const PILLARS = [
  {
    number: "01",
    title: "Power",
    description: "The people and institutions shaping our world.",
  },
  {
    number: "02",
    title: "Law",
    description: "Justice, governance and the rules that bind us.",
  },
  {
    number: "03",
    title: "Business",
    description: "Enterprise, capital and the ideas driving progress.",
  },
  {
    number: "04",
    title: "Ideas",
    description: "The thinking that challenges convention.",
  },
  {
    number: "05",
    title: "People",
    description: "The lives, ambitions and stories behind the headlines.",
  },
  {
    number: "06",
    title: "Perspective",
    description: "A wider lens on Africa and the world.",
  },
] as const;

const THEMES = {
  paper: {
    section: "bg-[#F6F2EA] text-[#080E1A]",
    muted: "text-[#080E1A]/55",
    rule: "border-[#080E1A]/15",
    dash: "bg-[#080E1A]/30",
    accent: "text-[#38bdf8]",
    accentBg: "bg-[#38bdf8]",
    item: "hover:bg-[#080E1A]/[0.035]",
    number: "text-[#080E1A]/35",
    description: "text-[#080E1A]/60",
  },
  dark: {
    section: "bg-[#080E1A] text-[#F6F2EA]",
    muted: "text-[#F6F2EA]/55",
    rule: "border-[#F6F2EA]/15",
    dash: "bg-white/30",
    accent: "text-[#60A5FA]",
    accentBg: "bg-[#60A5FA]",
    item: "hover:bg-white/[0.035]",
    number: "text-[#F6F2EA]/35",
    description: "text-[#F6F2EA]/60",
  },
} as const;

// Soft "expo" ease for the drawing rule.
const DRAW_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BrandPillars({
  tone = "paper",
}: BrandPillarsProps) {
  const theme = THEMES[tone];
  const reduceMotion = useReducedMotion();

  // Pin by the section's bottom edge when it is taller than the viewport, so the
  // whole pillars grid is seen before the host teaser slides up over it.
  const sectionRef = useRef<HTMLElement>(null);
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
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
      ref={sectionRef}
      aria-labelledby="brand-pillars-heading"
      className={`relative overflow-hidden ${theme.section} sticky z-10`}
      style={{ top: stickyTop }}
    >
      <div className="mx-auto max-w-[112.5rem] px-5 py-16 sm:px-8 sm:py-18 lg:px-14 xl:px-20">
        {/* Editorial folio */}
        <div
          className={`relative flex flex-wrap items-center justify-between gap-4 border-b pb-5 ${theme.rule}`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`text-xs md:text-[0.985rem] font-bold uppercase tracking-[0.2em] ${theme.muted}`}
            >
              The SkyFactor perspective
            </span>
          </div>

        

          {/* SF-blue rule that draws left → right over the hairline underline */}
          <motion.span
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: DRAW_EASE }}
            className="absolute inset-x-0 -bottom-px h-px origin-left bg-sky-400"
          />
        </div>

        {/* Main editorial statement */}
        <div className="grid gap-10 py-8 sm:py-14 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-9">
            <motion.h2
              id="brand-pillars-heading"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[clamp(2rem,8.6vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.075em] lg:text-[clamp(3rem,5.2vw,5rem)]"
            >
              <span className="block">Independent thinking.</span>

              <span className="mt-1 block">
                <em className="font-playfair font-normal tracking-[-0.055em]">
                  Uncommon access.
                </em>
              </span>
            </motion.h2>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: reduceMotion ? 0 : 0.2,
                ease: "easeOut",
              }}
              className="mt-6 text-xs text-sky-400 font-bold uppercase tracking-[0.18em] sm:mt-8 sm:text-xs sm:tracking-[0.22em]"
            >
              <span
                aria-hidden="true"
                className="mr-3 inline-block h-px w-6 bg-sky-400 align-middle sm:mr-4 sm:w-12"
              />
              Rooted in Ghana. Open to the world.
            </motion.p>
          </div>

          <div className="lg:col-span-3 lg:pb-2">
            <div className={`hidden md:block mb-5 h-1 w-12 ${theme.accentBg}`} />

            <p
              className={`max-w-sm text-sm leading-7 sm:text-base sm:leading-8 ${theme.description}`}
            >
              Conversations that look beyond the obvious. Exploring
              the people, institutions and ideas shaping Africa and
              the wider world.
            </p>

          </div>
        </div>

        {/* Six editorial pillars */}
        <div className={`border-t ${theme.rule}`}>
          <h3
            id="brand-pillars-index"
            className="py-4 text-xs font-semibold uppercase tracking-[0.17em]"
          >
            What moves the conversation
          </h3>

          <ol
            aria-labelledby="brand-pillars-index"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {PILLARS.map((pillar, index) => {
              // Hairlines between cells only — never on the outer right edge.
              const lastInPair = index % 2 === 1; // sm: 2 columns
              const lastInTrio = index % 3 === 2; // lg: 3 columns

              return (
                <motion.li
                  key={pillar.number}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : (index % 3) * 0.08,
                  }}
                  className={`group flex min-h-32 flex-col justify-between border-b p-4 transition-colors duration-300 sm:p-5 lg:min-h-36 ${theme.rule} ${lastInPair ? "sm:border-r-0" : "sm:border-r"} ${lastInTrio ? "lg:border-r-0" : "lg:border-r"} ${theme.item}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[0.925rem] text-sky-400 font-bold tabular-nums tracking-[0.16em] ${theme.number}`}
                    >
                      {pillar.number}
                    </span>

                  </div>

                  <div className="mt-4">
                    <h4 className="text-2xl font-medium tracking-[-0.045em] transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                      {pillar.title}
                    </h4>

                    <p
                      className={`mt-1.5 max-w-xs text-xs leading-5 sm:text-sm sm:leading-6 ${theme.description}`}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

      </div>
    </section>
  );
}
