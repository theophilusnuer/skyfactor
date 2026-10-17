"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    setState("loading");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setState("done");
      setMessage(data.already ? "You're already subscribed." : "Thank you — you're in.");
      setEmail("");
    } catch (err) {
      setState("error");
      setMessage((err as Error).message || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex border border-white/70 bg-white/[0.025] focus-within:border-sky-300">
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          aria-label="Subscribe"
          className="flex min-h-14 shrink-0 items-center gap-3 px-5 text-sm font-medium text-white disabled:opacity-60"
        >
          <span className="hidden sm:inline">
            {state === "loading" ? "Joining…" : "Subscribe"}
          </span>
          <span className="flex size-10 items-center justify-center bg-gradient-to-br from-blue-500 to-sky-400">
            <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.8} />
          </span>
        </button>
      </div>
      <p
        role="status"
        className={`mt-3 min-h-5 text-sm ${state === "error" ? "text-red-300" : "text-sky-300"}`}
      >
        {message}
      </p>
    </form>
  );
}
