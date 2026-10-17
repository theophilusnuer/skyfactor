import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function InitiativeCta({
  href = "/contact",
  label = "Explore collaboration",
}: {
  href?: string;
  label?: string;
}) {
  const external = /^https?:\/\//.test(href);
  const className =
    "group inline-flex min-h-14 items-center justify-between gap-7 border border-[#101820]/70 bg-white/40 px-5 py-3 text-sm font-medium text-[#101820] transition-all duration-300 hover:border-sky-400 hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 sm:min-w-56";
  const content = (
    <>
      <span>{label}</span>
      <span className="flex size-10 shrink-0 items-center justify-center bg-gradient-to-br from-blue-500 to-sky-400 text-white transition-transform duration-300 group-hover:translate-x-1">
        <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.8} />
      </span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
