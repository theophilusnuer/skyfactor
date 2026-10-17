import { NextResponse } from "next/server";
import { CONTACT_SUBJECTS } from "@/lib/contact";
import { esc, sendEmail, writeClient } from "@/lib/newsletter-server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function bad(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  if (b?.website) return NextResponse.json({ ok: true }); // honeypot

  const name = String(b?.name ?? "").trim();
  const email = String(b?.email ?? "").trim().toLowerCase();
  const subject = String(b?.subject ?? "");
  const phone = String(b?.phone ?? "").trim();
  const message = String(b?.message ?? "").trim();

  if (!name || name.length > 120) return bad("Please enter your name.");
  if (!EMAIL_RE.test(email) || email.length > 254) return bad("Enter a valid email address.");
  if (phone && !/^\+[1-9]\d{6,14}$/.test(phone)) return bad("Enter a valid telephone number.");
  if (!(CONTACT_SUBJECTS as readonly string[]).includes(subject)) return bad("Choose a subject.");
  if (message.length < 10 || message.length > 5000) {
    return bad("Your message should be between 10 and 5000 characters.");
  }

  try {
    await writeClient.create({
      _type: "contactMessage",
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
      status: "new",
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }

  // Optional email notification; the message is already stored in Sanity.
  const to = process.env.CONTACT_TO_EMAIL;
  if (to) {
    try {
      await sendEmail({
        to,
        subject: `[SkyFactor] ${subject} — ${name}`,
        html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;${phone ? ` · ${esc(phone)}` : ""}</p><p><strong>${esc(subject)}</strong></p><p style="white-space:pre-wrap">${esc(message)}</p>`,
      });
    } catch {
      // ignore notification failures
    }
  }

  return NextResponse.json({ ok: true });
}
