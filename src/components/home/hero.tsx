import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import podcastImage from "../../images/podcast.webp";
import HeroLines from "./hero-lines";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[40rem] overflow-hidden bg-[#08050D] text-white md:min-h-[47.5rem] lg:min-h-[min(53.125rem,calc(100svh-5rem))]">
      {/* ---------- Base atmosphere (behind everything) ---------- */}

      {/* Dark gradient base + top-left purple light (stays inside the text column) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_4%_8%,rgba(91,22,170,0.42),transparent_35%),linear-gradient(115deg,#0A0612_0%,#08070D_55%,#100811_100%)]"
      />

      {/* Soft violet light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 -z-10 size-[31.25rem] rounded-full bg-violet-800/10 blur-[7.5rem]"
      />

      {/*
        Layout:
        - base: single column, text only (image hidden)
        - md:  image column takes 40% (roughly half of the photo is revealed)
        - lg:  45%  |  xl: 48%  |  2xl: 50% (full photo)
      */}
      <div className="relative mx-auto grid min-h-[inherit] max-w-[120rem] grid-cols-1 md:grid-cols-[60%_40%] lg:grid-cols-[55%_45%] xl:grid-cols-[52%_48%] 2xl:grid-cols-[50%_50%]">
        {/* LEFT: Editorial typography */}
        <div className="relative z-20 flex flex-col justify-center px-6 pb-14 pt-20 sm:px-10 lg:py-20 xl:px-16 2xl:px-20">
          {/* Eyebrow */}
          <div className="flex items-center gap-6">
            <span className="h-0.5 w-14 shrink-0 bg-gradient-to-r from-sky-400 to-violet-500" />
            <span className="text-[0.625rem] font-manrope font-medium uppercase tracking-[0.22em] text-white/70 sm:text-xs">
              An original interview series with Richard Sky
            </span>
          </div>

          {/* Main headline */}
          <h1 className="mt-10 max-w-4xl text-[clamp(2rem,8.5vw,3rem)] font-semibold leading-[1.12] tracking-[-0.065em] sm:mt-12 md:text-[clamp(2.25rem,4vw,4.75rem)]">
            <span className="block">
              Real{" "}
              <em className="font-playfair font-medium tracking-[-0.055em]">
                conversations.
              </em>
            </span>
            <span className="mt-1 block">
              Extraordinary{" "}
              <em className="font-playfair font-medium tracking-[-0.055em]">
                people.
              </em>
            </span>
       <span className="mt-1 block font-bold bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#E879F9] bg-clip-text text-transparent sm:mt-2">
              Global Perspectives.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl font-manrope text-base leading-[1.8] text-white/75 sm:text-lg">
            A front-row seat to the ideas, decisions and remarkable lives
            shaping our world. From an African perspective. For a global
            audience.
          </p>

          {/* Square CTA buttons */}
          <div className="mt-9 flex flex-col font-manrope items-start gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="/watch-listen"
              className="group inline-flex min-h-14 w-full items-center justify-between gap-7 border border-sky-500 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0.5rem_2.25rem_rgba(37,99,235,0.18)] transition-all duration-300 hover:border-sky-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 sm:w-auto sm:min-w-56 xl:min-w-60"
            >
              <span>Start Listening</span>
              <span className="flex size-10 shrink-0 items-center justify-center bg-white text-[#08050D] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.8} />
              </span>
            </Link>

            <Link
              href="/guests"
              className="group inline-flex min-h-14 w-full items-center justify-between gap-7 border border-white/70 bg-white/[0.025] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-sky-300 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 sm:w-auto sm:min-w-56 xl:min-w-60"
            >
              <span>Meet Our Guests</span>
              <span className="flex size-10 shrink-0 items-center justify-center bg-gradient-to-br from-blue-500 to-sky-400 text-white transition-transform duration-300 group-hover:translate-x-1">
                <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.8} />
              </span>
            </Link>
          </div>

        
        </div>

     {/* RIGHT: Podcast photograph — hidden on mobile, visible from md up */}
<div className="relative hidden min-h-[min(36rem,80svh)] overflow-hidden md:block lg:min-h-[min(48rem,90svh)] lg:self-stretch">
  {/* Soft violet glow behind the image */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -left-32 top-0 -z-10 size-[31.25rem] rounded-full bg-violet-800/10 blur-[7.5rem]"
  />

  <Image
    src={podcastImage}
    alt="Two professional microphones and headphones in a podcast studio illuminated by purple light"
    fill
    priority
    sizes="(max-width: 767px) 1px, (max-width: 1023px) 40vw, (max-width: 1279px) 45vw, (max-width: 1535px) 48vw, 50vw"
    className="object-cover object-[center_35%] "
  />

  {/* Optional: fade image into the dark left side */}
  <div
    aria-hidden="true"
    className="absolute inset-y-0 left-0 w-1/4 max-w-56 bg-gradient-to-r from-[#08060D] to-transparent"
  />
</div>
      </div>

      {/* ---------- Overlays: above the photograph, below the copy (z-10) ---------- */}

      {/* Faint architectural grid — continues past the column edge and fades out over the photo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-10 [background-image:linear-gradient(rgba(211,187,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(211,187,255,0.16)_1px,transparent_1px)] [background-size:4.75rem_4.75rem] md:[mask-image:linear-gradient(90deg,black_55%,transparent_92%)]"
      />

      {/* Studio glow that spills across the column boundary instead of being clipped by it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_58%_42%,rgba(82,20,143,0.18),transparent_38%),radial-gradient(ellipse_at_100%_75%,rgba(120,24,88,0.15),transparent_36%)] mix-blend-screen"
      />

      {/* Slow-drifting guide lines (Framer Motion) */}
      <HeroLines />
    </section>
  );
}
