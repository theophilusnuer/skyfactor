
  "use client";

  import { useRef } from "react";
  import Link from "next/link";
  import { ArrowUpRight } from "lucide-react";
  import { motion, useScroll, useTransform } from "framer-motion";

  export default function HostClosing() {
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress: rawProgress } = useScroll({
      target: ref,
      offset: ["start start", "end end"],
    });

    // The animation finishes before the press section starts sliding over this one.
    const scrollYProgress = useTransform(rawProgress, [0, 0.6], [0, 1], {
      clamp: true,
    });

    const scale = useTransform(
      scrollYProgress,
      [0, 0.45, 0.75, 1],
      [0.65,0.75,0.85, 1.0]
    );

    const opacity = useTransform(
      scrollYProgress,
      [0, 0.2, 0.75, 1],
      [0.45, 0.75, 1, 0.9]
    );

    const colorProgress = useTransform(
      scrollYProgress,
      [0, 0.45, 0.85],
      [0, 0.6, 1]
    );

    const greyOpacity = useTransform(colorProgress, [0, 1], [1, 0]);
    const whiteOpacity = useTransform(colorProgress, [0, 1], [0.25, 1]);

    const ctaOpacity = useTransform(
      scrollYProgress,
      [0.35, 0.65],
      [0, 1]
    );

    const ctaY = useTransform(
      scrollYProgress,
      [0.35, 0.65],
      [6, 0]
    );

    return (
      <section
        ref={ref}
        className="relative h-[350vh] bg-[#101820] text-white"
      >
        <div className="sticky top-0 flex h-screen min-h-[36rem] items-center justify-center overflow-hidden">
          {/* Atmospheric background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(91,22,170,0.1),transparent_40%),radial-gradient(ellipse_at_20%_100%,rgba(40,119,212,0.12),transparent_45%)]"
          />

          {/* Subtle editorial grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(245,241,232,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,232,0.3)_1px,transparent_1px)] [background-size:5rem_5rem]"
          />

          <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-5 text-center sm:px-8 lg:px-12">
            <motion.div
              style={{ scale, opacity }}
              className="relative w-full"
            >
              {/* Grey base */}
              <motion.p
                style={{ opacity: greyOpacity }}
                className="font-playfair text-4xl  leading-[1.08] tracking-[-0.045em] text-white/40 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              >
                The right conversation
                <br />
                can change the way we see the world.
              </motion.p>

              {/* White overlay */}
              <motion.p
                aria-hidden="true"
                style={{ opacity: whiteOpacity }}
                className="pointer-events-none absolute inset-0 font-playfair text-4xl  leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              >
                The right conversation
                <br />
                can change the way we see the world.
              </motion.p>
            </motion.div>

            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="mt-8 sm:mt-18"
            >
              <Link
                href="/watch-listen"
                className="group inline-flex min-h-14 items-center justify-between gap-6 border border-white/70 bg-white/[0.025] px-5 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-sky-300 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 sm:min-w-60"
              >
                <span>Explore SkyFactor</span>

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
        </div>
      </section>
    );
  }
