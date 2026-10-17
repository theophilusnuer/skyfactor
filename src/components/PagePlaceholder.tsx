import Link from "next/link";

type PagePlaceholderProps = {
  title: string;
  description: string;
};

export default function PagePlaceholder({
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <section
      aria-labelledby="page-placeholder-heading"
      className="flex min-h-[65vh] items-center bg-[#F6F2EA] px-5 py-20 text-[#080E1A] sm:px-8 lg:px-14 xl:px-20"
    >
      <div className="mx-auto w-full max-w-[112.5rem]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2877D4]">
          SkyFactor
        </p>
        <h1
          id="page-placeholder-heading"
          className="mt-5 max-w-4xl text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[0.98] tracking-[-0.07em]"
        >
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-[#080E1A]/65 sm:text-lg">
          {description}
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex min-h-12 items-center border border-[#080E1A]/30 px-5 py-3 text-sm font-medium transition-colors hover:border-[#2877D4] hover:text-[#2877D4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2877D4]"
        >
          Return to home
        </Link>
      </div>
    </section>
  );
}
