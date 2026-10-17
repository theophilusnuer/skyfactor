"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CONTACT_SUBJECTS } from "@/lib/contact";

const field =
  "mt-2 w-full border border-[#101A28]/25 bg-white/70 px-4 py-3.5 text-sm text-[#101A28] placeholder:text-[#101A28]/35 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none";
const label = "block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#101A28]/60";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState<string | undefined>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form)), phone: phone ?? "" };
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      form.reset();
      setPhone(undefined);
      setState("done");
    } catch (err) {
      setError((err as Error).message || "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="border border-sky-500/50 bg-sky-400/10 p-8 text-[#101A28] sm:p-10">
        <p className="font-playfair text-3xl italic">Thank you.</p>
        <p className="mt-3 text-[#101A28]/70">
          Your message has reached us. We read every one and will reply soon.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 underline underline-offset-8"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={label}>Your name</label>
          <input id="c-name" name="name" required autoComplete="name" maxLength={120} className={field} />
        </div>
        <div>
          <label htmlFor="c-email" className={label}>Email address</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="c-phone" className={label}>
          Telephone <span className="normal-case tracking-normal text-[#101A28]/40">(optional)</span>
        </label>
        <PhoneInput
          id="c-phone"
          international
          defaultCountry="GH"
          withCountryCallingCode
          value={phone}
          onChange={setPhone}
          autoComplete="tel"
          className="contact-phone mt-2"
        />
      </div>

      <div>
        <label htmlFor="c-subject" className={label}>I&apos;m getting in touch about</label>
        <select id="c-subject" name="subject" required defaultValue="" className={field}>
          <option value="" disabled className="bg-white">Choose a subject</option>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s} value={s} className="bg-white">{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="c-message" className={label}>Your message</label>
        <textarea id="c-message" name="message" required rows={7} maxLength={5000} className={field} />
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={state === "loading"}
          className="group inline-flex min-h-14 items-center justify-between gap-7 border border-[#101A28] px-5 py-3 text-sm font-medium text-[#101A28] transition-colors duration-300 hover:bg-[#101A28] hover:text-[#F3F0E8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 disabled:opacity-60 sm:min-w-56"
        >
          <span>{state === "loading" ? "Sending…" : "Send message"}</span>
          <span className="flex size-10 shrink-0 items-center justify-center bg-gradient-to-br from-blue-500 to-sky-400 text-white transition-transform duration-300 group-hover:translate-x-1">
            <ArrowUpRight aria-hidden="true" className="size-5" strokeWidth={1.8} />
          </span>
        </button>
        {state === "error" && (
          <p role="alert" className="text-sm text-red-600">{error}</p>
        )}
      </div>
    </form>
  );
}
