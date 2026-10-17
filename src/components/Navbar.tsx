"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "The Host", href: "/host" },
  { label: "Guests", href: "/guests" },
  { label: "Watch & Listen", href: "/watch-listen" },
  { label: "Our World - Initiatives", href: "/initiatives" },
  { label: "Shop", href: "/shop" },
  { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
];

// const secondaryLinks = [
//   { label: "Contact", href: "/contact" },
// ];

/** The three primary destinations shown in the centre of the bar (md and up). */
const primaryLinks = ["/host", "/guests", "/watch-listen"].map(
  (href) => links.find((link) => link.href === href)!,
);

/** Routes whose hero sits underneath a transparent bar. Everywhere else the bar is solid. */
const OVERLAY_ROUTES = ["/"];

const SCROLL_THRESHOLD = 24;

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarRoute />
    </Suspense>
  );
}

function NavbarFallback() {
  return (
    <header
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-sf-navy/10 bg-sf-ivory/95 md:h-20"
    />
  );
}

function NavbarRoute() {
  const pathname = usePathname();
  return <NavbarContent key={pathname} pathname={pathname} />;
}

function NavbarContent({ pathname }: { pathname: string }) {
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const overlay = OVERLAY_ROUTES.includes(pathname);
  // Transparent only while sitting on top of a hero with the menu closed.
  const solid = open || scrolled || !overlay;

  /* ---------- Scroll state ---------- */
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* ---------- Scroll lock (with scrollbar-width compensation, no layout jump) ---------- */
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const body = document.body;
    const gutter = window.innerWidth - root.clientWidth;
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };

    body.style.overflow = "hidden";
    body.style.paddingRight = `${gutter}px`;
    root.style.setProperty("--sf-scrollbar", `${gutter}px`);

    return () => {
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      root.style.removeProperty("--sf-scrollbar");
    };
  }, [open]);

  /* ---------- Keyboard: Escape closes, Tab stays inside bar + panel ---------- */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = [headerRef.current, panelRef.current]
        .filter((node): node is HTMLElement => node !== null)
        .flatMap((node) =>
          Array.from(
            node.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          ),
        )
        .filter((node) => node.getClientRects().length > 0);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  /* ---------- Focus management ---------- */
  useEffect(() => {
    if (open) {
      panelRef.current?.focus({ preventScroll: true });
    } else if (wasOpenRef.current) {
      toggleRef.current?.focus({ preventScroll: true });
    }
    wasOpenRef.current = open;
  }, [open]);

  const close = () => setOpen(false);

  /* ---------- Tone (dark-on-ivory vs. white-on-hero) ---------- */
  const tone = solid
    ? {
        text: "text-sf-navy",
        dot: "text-sky-400",
        link: "text-sf-navy/80 hover:text-sky-400 after:bg-sky-400",
        box: "border-sf-navy text-sf-navy hover:bg-sf-navy hover:text-sf-ivory",
        icon: "text-sf-navy hover:text-sky-400",
      }
    : {
        text: "text-white",
        dot: "text-sky-400",
        link: "text-white/80 hover:text-white after:bg-sky-400",
        box: "border-white/70 text-white hover:border-white hover:bg-white hover:text-sf-navy",
        icon: "text-white hover:text-sky-300",
      };

  /* ---------- Menu animation ---------- */
  const panelMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.75 },
      }
    : {
        initial: { y: "-100%" },
        animate: { y: 0 },
        exit: { y: "-100%" },
        transition: { duration: 0.85, ease: EASE_OUT },
      };

  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: reduceMotion ? { duration: 0 } : { staggerChildren: 0.06, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
      };

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "fixed left-0 right-[var(--sf-scrollbar,0px)] top-0 z-50 border-b transition-[background-color,border-color,color,box-shadow] duration-500",
          solid ? "bg-sf-ivory/95 backdrop-blur-md" : "bg-transparent",
          solid && !open ? "border-sf-navy/10 shadow-[0_0.0625rem_0_rgba(11,26,51,0.04)]" : "border-transparent",
          tone.text,
        ].join(" ")}
      >
        <div className="mx-auto flex h-16 max-w-[120rem] items-center justify-between gap-3 px-5 sm:px-8 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 md:h-20 lg:px-20">
          {/* Logo */}
          <Link
            href="/"
            aria-label="SkyFactor homepage"
            onClick={close}
            className="flex shrink-0 items-center gap-2.5 transition-colors "
          >
            <span className="font-manrope text-2xl font-extrabold tracking-[-0.08em]">
              SF<span className={`transition-colors  ${tone.dot}`}>.</span>
            </span>
            <span className="hidden text-xs font-extrabold tracking-[0.15em] min-[24rem]:inline">
              SKYFACTOR
            </span>
          </Link>

          {/* Centre: three primary destinations (md and up) */}
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex md:justify-self-center">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`relative py-2 font-manrope text-xs font-semibold tracking-[0.08em] transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 ${tone.link}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: menu toggle + boxed CTA (all screen sizes) */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:justify-self-end">
            <button
              ref={toggleRef}
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-controls="site-menu"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className={`inline-flex size-11 items-center justify-center transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${tone.icon}`}
            >
              <span className="relative block size-6">
                <Menu
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className={`absolute inset-0 size-6 transition-all duration-300 ${
                    open ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
                  }`}
                />
                <X
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className={`absolute inset-0 size-6 transition-all duration-300 ${
                    open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
                  }`}
                />
              </span>
            </button>

            <Link
              href="/contact"
              onClick={close}
              className={`inline-flex h-10 font-manrope items-center gap-2 border px-3 text-xs font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 sm:h-11 sm:px-4 ${tone.box}`}
            >
              Get in touch
              <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </header>

      {/* Keeps page content clear of the fixed bar on pages without a hero */}
      {!overlay && <div aria-hidden="true" className="h-16 md:h-20" />}

      {/* Full-screen menu: gently drops from the top */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="site-menu"
            id="site-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            {...panelMotion}
            className="fixed inset-y-0 left-0 right-[var(--sf-scrollbar,0px)] z-40 overflow-y-auto overscroll-contain bg-sf-ivory text-sf-navy focus:outline-none"
          >
            <div className="mx-auto grid min-h-full max-w-[120rem] grid-cols-1 gap-12 px-5 pb-12 pt-24 sm:px-8 md:pt-32 lg:grid-cols-12 lg:gap-8 lg:px-20 lg:pb-20">
              {/* LEFT: brand */}
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col justify-between lg:col-span-5"
              >
                <motion.div variants={itemVariants}>
                  <Link href="/" onClick={close} className="inline-block" aria-label="SkyFactor homepage">
                    <span className="font-manrope text-6xl font-extrabold leading-none tracking-[-0.08em] sm:text-7xl lg:text-8xl">
                      SF<span className="text-sky-400">.</span>
                    </span>
                  </Link>
                  <p className="mt-6 text-xs font-extrabold tracking-[0.3em]">SKYFACTOR</p>
                  <p className="mt-5 max-w-xs text-sm leading-[1.8] text-sf-navy/65">
                    An original interview series with Richard Sky. Real conversations.
                    Extraordinary people. Global perspectives.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mt-12 hidden items-center gap-5 text-[0.625rem] uppercase tracking-[0.2em] text-sf-navy/50 lg:flex"
                >
                  <span className="h-px w-12 bg-sf-navy/30" />
                  <span>The global conversation</span>
                </motion.div>
              </motion.div>

              {/* RIGHT: every destination */}
              <motion.nav
                aria-label="Site navigation"
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="lg:col-span-6 lg:col-start-7"
              >
                <ul className="border-t border-sf-navy/10">
                  {links.map((link, index) => (
                    <motion.li key={link.href} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={close}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className="group flex items-center gap-5 border-b border-sf-navy/10 py-4 text-2xl font-semibold tracking-[-0.03em] transition-colors hover:text-sky-400 focus-visible:text-sky-400 focus-visible:outline-none sm:text-3xl lg:py-5 lg:text-4xl"
                      >
                        <span className="w-7 text-xs font-semibold tabular-nums tracking-[0.1em] text-sf-navy/40 transition-colors group-hover:text-sky-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1">{link.label}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          strokeWidth={1.6}
                          className="size-6 shrink-0 text-sf-navy/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-400"
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* <motion.ul variants={itemVariants} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                  {secondaryLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={close}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-sf-navy/70 transition-colors hover:text-sky-400"
                      >
                        {link.label}
                        <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={2} />
                      </Link>
                    </li>
                  ))}
                </motion.ul> */}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
