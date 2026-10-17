"use client";

import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FullBioModal({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <div className="">
                    <button
                    type="button"
                     onClick={() => setOpen(true)}
                      className="group inline-flex min-h-14 uppercase items-center justify-between gap-7 border border-[#101820] cursor-pointer bg-white/[0.025] px-5 py-3 text-sm font-medium transition-all duration-300 hover:border-sky-300 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 sm:min-w-56"
                    >
                      <span>Read full bio</span>
                      <span className="flex size-10 shrink-0 items-center justify-center bg-gradient-to-br from-blue-500 text-white to-sky-400 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.8} />
                      </span>
                    </button>
                  </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} full biography`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#101820]/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-[#F5F1E8] p-6 text-[#101820] shadow-2xl sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 p-2 text-[#101820]/60 hover:text-[#101820]"
            >
              <X className="size-5" />
            </button>
            <h2 className="pr-10 text-2xl font-medium tracking-[-0.04em] sm:text-4xl">
              {name}
            </h2>
            <div className="mt-6">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
