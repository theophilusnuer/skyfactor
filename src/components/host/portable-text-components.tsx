import type { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-base leading-8 text-[#101820]/75 first:mt-0 sm:text-lg sm:leading-9">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h2 className="mt-12 text-3xl font-medium tracking-tight first:mt-0 sm:text-4xl">
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h3 className="mt-10 text-2xl font-medium tracking-tight first:mt-0 sm:text-3xl">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="mt-8 text-xl font-medium tracking-tight first:mt-0">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-[#2877D4] pl-6 font-playfair text-2xl italic leading-relaxed text-[#101820]/80 sm:text-3xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-3 pl-6 text-base leading-8 text-[#101820]/75">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-3 pl-6 text-base leading-8 text-[#101820]/75">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#101820]">{children}</strong>
    ),
    em: ({ children }) => <em className="font-playfair italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline decoration-[#2877D4] underline-offset-4">
        {children}
      </span>
    ),
    "strike-through": ({ children }) => <s>{children}</s>,
    code: ({ children }) => (
      <code className="bg-[#101820]/5 px-2 py-1 text-[0.9em]">{children}</code>
    ),
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const external = /^https?:\/\//i.test(href);

      return (
        <a
          href={href}
          className="text-[#2877D4] underline underline-offset-4 transition-colors hover:text-[#101820]"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};
