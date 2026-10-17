
"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Search, X } from "lucide-react";
import type { Interview } from "@/types/sanity";
import InterviewCard from "@/components/watch-listen/interview-card";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "watch", label: "Watch" },
  { value: "listen", label: "Listen" },
] as const;

type Filter = (typeof FILTERS)[number]["value"];

export default function WatchListenPageClient({
  interviews,
}: {
  interviews: Interview[];
}) {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const hasListen = interviews.some((item) => item.mediaType === "listen");
  const normalizedQuery = query.trim().toLowerCase();

  const visible = useMemo(
    () =>
      interviews.filter((item) => {
        const mediaType = item.mediaType ?? "watch";

        if (filter !== "all" && mediaType !== filter) return false;

        if (!normalizedQuery) return true;

        return [item.title, item.summary, item.guestName]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedQuery));
      }),
    [interviews, filter, normalizedQuery]
  );

  const featured = visible[0];
  const remaining = visible.slice(1);

  return (
    <main className="overflow-hidden bg-[#F5F1E8] text-[#101820]">
      {/* Editorial masthead */}
      <section className="relative border-b border-[#101820]/15">
        <div className="mx-auto max-w-[112.5rem] px-5 sm:px-8 lg:px-14 xl:px-20">
          

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid gap-8 py-14 sm:py-20 lg:grid-cols-12 lg:items-end lg:gap-10 lg:py-24"
          >
            <div className="lg:col-span-8">
             

              <h1 className="max-w-6xl text-[clamp(3.25rem,8.5vw,8.5rem)] font-medium leading-[0.86] tracking-[-0.085em]">
                Listen closely.
                <br />
                <span className="font-playfair font-normal italic tracking-[-0.07em]">
                  Think differently.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:justify-self-end lg:pb-2">
              <p className="max-w-md text-base leading-8 text-[#101820]/70 sm:text-lg">
                Meaningful conversations with the people shaping Africa and
                the wider world. Ideas, experiences and perspectives beyond
                the headlines.
              </p>

              <a
                href="#interview-archive"
                className="group mt-6 inline-flex items-center gap-3 border-b border-[#101820]/40 pb-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:border-[#2877D4] hover:text-[#2877D4]"
              >
                Explore the collection
                <ArrowDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Archive and discovery */}
      <section
        id="interview-archive"
        aria-label="Interview archive"
        className="mx-auto max-w-[100rem] px-5 py-10 sm:px-8 sm:py-14 lg:px-14 lg:py-16 xl:px-20"
      >
        <div className="flex flex-col gap-6 border-b border-[#101820]/20 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
          
            <h2 className="mt-2 font-playfair text-3xl italic tracking-[-0.04em] sm:text-4xl">
              Conversations worth your time.
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {hasListen && (
              <div
                role="group"
                aria-label="Filter by format"
                className="flex border border-[#101820]/20"
              >
                {FILTERS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFilter(item.value)}
                    aria-pressed={filter === item.value}
                    className={`min-h-12 px-4 text-[0.65rem] font-bold uppercase tracking-[0.13em] transition-colors sm:px-5 ${
                      filter === item.value
                        ? "bg-[#101820] text-[#F5F1E8]"
                        : "text-[#101820]/60 hover:bg-[#101820]/[0.05] hover:text-[#101820]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <label className="flex min-h-12 min-w-0 items-center gap-3 border border-[#101820]/20 px-4 transition-colors focus-within:border-[#2877D4] sm:w-72">
              <Search
                aria-hidden="true"
                className="size-4 shrink-0 text-[#101820]/50"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a conversation"
                aria-label="Search interviews"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#101820]/40"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-[#101820]/50 transition-colors hover:text-[#2877D4]"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              )}
            </label>
          </div>
        </div>

        {visible.length > 0 ? (
          <>
            {/* Lead story */}
            {featured && (
              <div className="mt-8 sm:mt-10">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#101820]/55">
                    {normalizedQuery || filter !== "all"
                      ? "Top result"
                      : "Latest conversation"}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.16em] text-[#101820]/45">
                    01 / {String(visible.length).padStart(2, "0")}
                  </span>
                </div>

                <InterviewCard
                  interview={featured}
                  index={0}
                  variant="featured"
                />
              </div>
            )}

            {/* Remaining stories */}
            {remaining.length > 0 && (
              <div className="mt-14 sm:mt-20">
                <div className="mb-5 flex items-end justify-between border-b border-[#101820]/20 pb-4">
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#2877D4]">
                      Keep exploring
                    </p>
                    <h3 className="mt-2 text-2xl font-medium tracking-[-0.05em] sm:text-3xl">
                      More perspectives
                    </h3>
                  </div>

                  <span className="text-xs tabular-nums text-[#101820]/50">
                    {String(remaining.length).padStart(2, "0")} stories
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 border-l  border-[#101820]/15 sm:grid-cols-2 xl:grid-cols-3">
                  {remaining.map((interview, index) => (
                    <InterviewCard
                      key={interview._id}
                      interview={interview}
                      index={index + 1}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 sm:py-28">
            <p className="font-playfair text-3xl italic sm:text-4xl">
              {interviews.length === 0
                ? "The next conversation is taking shape."
                : "No stories found."}
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#101820]/60">
              {interviews.length === 0
                ? "New voices and fresh perspectives will appear here. Come back for the next conversation."
                : "Try another search or choose a different format to discover more conversations."}
            </p>
            {(query || filter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
                className="mt-6 border-b border-[#101820] pb-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors hover:border-[#2877D4] hover:text-[#2877D4]"
              >
                Reset discovery
              </button>
            )}
          </div>
        )}
      </section>

    </main>
  );
}
