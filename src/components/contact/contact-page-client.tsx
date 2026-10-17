
"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ContactForm from "@/components/contact/contact-form";

export default function ContactPageClient() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: 0.75,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <main className="bg-[#F3F0E8] text-[#101A28]">
      {/* Editorial hero */}
      <section className="relative isolate overflow-hidden bg-[#101A28] text-[#F3F0E8]">

        <div className="mx-auto max-w-[100rem] px-5 pb-16 pt-8 sm:px-8 sm:pt-12 lg:px-14 xl:px-20">
          <motion.div {...reveal()}>
           

            <div className="grid gap-10 py-8 sm:py-12 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-9">
                <h1 className="max-w-6xl text-[clamp(3.0rem,10vw,8.5rem)] font-medium leading-[0.84] tracking-[-0.085em]">
                  Let&apos;s have{" "}
                  <span className="">
                    a
                  </span>
                  <span className="block font-playfair font-normal italic text-sky-400">  conversation.</span>
                </h1>
              </div>

              <div className="max-w-sm lg:col-span-3 lg:justify-self-end">
                <p className="text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                  Ideas worth exploring. People worth meeting. Stories that
                  deserve to travel further.
                </p>
                <a
                  href="#send-an-enquiry"
                  className="mt-7 inline-flex items-center gap-3 border-b border-white/35 pb-2 text-sm transition-colors hover:border-sky-300 hover:text-sky-300"
                >
                  Start here
                  <ArrowDownRight className="size-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/20 pt-5 text-[0.65rem] uppercase tracking-[0.18em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
             
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enquiry area */}
      <section
        id="send-an-enquiry"
        className="relative scroll-mt-24"
      >
        <div className="mx-auto max-w-[100rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-14 lg:py-28 xl:px-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <motion.aside
              {...reveal()}
              className="lg:col-span-4"
            >
             

              <h2 className="mt-5 max-w-md text-4xl font-medium leading-[0.98] tracking-[-0.065em] sm:text-5xl">
                What would you like to{" "}
                <span className="font-playfair font-normal italic text-[#64758A]">
                  talk about?
                </span>
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-[#101A28]/85 sm:text-base sm:leading-8">
                Whether you have a guest in mind, an editorial idea, a
                partnership proposal or a speaking enquiry, give us a little
                context and we&apos;ll take it from there.
              </p>


              <p className="mt-8 max-w-sm font-playfair text-xl italic leading-8 text-[#64758A]">
                The right question can take a conversation somewhere
                unexpected.
              </p>
            </motion.aside>

            <motion.div
              {...reveal(0.12)}
              className="lg:col-span-8"
            >
              <div className="border-t-1 border-[#101A28] pt-6 sm:pt-8">
                <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sky-700">
                      Your enquiry
                    </p>
                    <h3 className="mt-3 text-2xl font-medium tracking-[-0.045em] sm:text-3xl">
                      Tell us a little more.
                    </h3>
                  </div>
                 
                </div>

                {/* Keep the existing form submission logic */}
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Watch & Listen */}
      <section className="bg-[#E7E3D9]">
        <div className="mx-auto max-w-[100rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-24 xl:px-20">
          <motion.div
            {...reveal()}
            className="grid gap-8 sm:grid-cols-2 sm:items-end"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                Before you go
              </p>
              <h2 className="mt-5 max-w-2xl text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.075em]">
                There&apos;s more to{" "}
                <span className="font-playfair font-normal italic text-[#64758A]">
                  discover.
                </span>
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#101A28]/65 sm:text-base sm:leading-8">
                Meet the people behind the ideas. Explore the conversations
                shaping perspectives across Ghana and beyond.
              </p>
            </div>

            <div className="sm:justify-self-end">
              <Link
                href="/watch-listen"
                className="group inline-flex min-h-14 items-center justify-between gap-10 border border-[#101A28] px-5 py-3 text-sm transition-colors duration-300 hover:bg-[#101A28] hover:text-[#F3F0E8] sm:min-w-64"
              >
                <span>Explore Watch &amp; Listen</span>
                <span className="flex size-9 items-center justify-center bg-[#101A28] text-white transition-colors group-hover:bg-sky-400 group-hover:text-[#101A28]">
                  <ArrowUpRight className="size-5" strokeWidth={1.6} />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
