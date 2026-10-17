import Link from "next/link";
import { Suspense } from "react";

const MESSAGES: Record<string, string> = {
  unsubscribed: "You have been unsubscribed. We're sorry to see you go.",
  invalid: "This unsubscribe link is invalid or has expired.",
  error: "Something went wrong. Please try again.",
};

async function Status({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const message = (status && MESSAGES[status]) || "Subscribe from the footer of any page to get new episodes and notes from Richard Sky.";
  return <p className="mt-6 max-w-md text-white/70">{message}</p>;
}

export default function NewsletterPage(props: {
  searchParams: Promise<{ status?: string }>;
}) {
  return (
    <main className="flex min-h-[70vh] flex-col items-start justify-center bg-[#101820] px-5 py-32 text-white sm:px-8 lg:px-20">
      <h1 className="text-5xl font-medium tracking-[-0.05em]">
        The{" "}
        <em className="font-playfair font-normal">Dispatch.</em>
      </h1>
      <Suspense fallback={null}>
        <Status searchParams={props.searchParams} />
      </Suspense>
      <Link href="/" className="mt-8 border border-white/70 px-5 py-3 text-sm hover:border-sky-300">
        Back home
      </Link>
    </main>
  );
}
