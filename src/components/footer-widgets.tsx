"use client";

import { useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Live Accra clock — Monocle-style dateline                          */
/* ------------------------------------------------------------------ */

const accraTime = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Africa/Accra",
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1_000);
  return () => clearInterval(id);
}

// Minute precision → the string is stable between ticks, so React only
// re-renders when the displayed time actually changes.
const getSnapshot = () => accraTime.format(new Date());
const getServerSnapshot = () => null;


export function CurrentYear() {
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => null,
  );

  return <>{year}</>;
}

/* ------------------------------------------------------------------ */
/*  Back to top                                                        */
/* ------------------------------------------------------------------ */

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-3 text-[0.625rem] uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
    >
      <span>Back to top</span>
      <span className="flex size-8 items-center justify-center border border-white/20 transition-colors duration-300 group-hover:border-sky-400 group-hover:bg-sky-400 group-hover:text-[#080E1A]">
        <ArrowUp
          aria-hidden="true"
          className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
          strokeWidth={1.8}
        />
      </span>
    </button>
  );
}
