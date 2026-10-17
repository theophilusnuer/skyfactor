import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { writeClient } from "@/lib/newsletter-server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body?.email ?? "").trim().toLowerCase();

  if (body?.website) return NextResponse.json({ ok: true }); // honeypot
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const id = `subscriber-${createHash("sha256").update(email).digest("hex").slice(0, 32)}`;

  try {
    const existing = await writeClient.fetch<{ status?: string } | null>(
      `*[_id == $id][0]{status}`,
      { id },
    );

    if (existing?.status === "subscribed") {
      return NextResponse.json({ ok: true, already: true });
    }

    await writeClient.createOrReplace({
      _id: id,
      _type: "subscriber",
      email,
      status: "subscribed",
      subscribedAt: new Date().toISOString(),
      token: randomBytes(24).toString("hex"),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
