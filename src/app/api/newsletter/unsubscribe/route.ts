import { NextResponse } from "next/server";
import { writeClient, siteUrl } from "@/lib/newsletter-server";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  const done = (s: string) =>
    NextResponse.redirect(`${siteUrl}/newsletter?status=${s}`);

  if (!/^[a-f0-9]{48}$/.test(token)) return done("invalid");

  try {
    const id = await writeClient.fetch<string | null>(
      `*[_type == "subscriber" && token == $tok][0]._id`,
      { tok: token },
    );
    if (!id) return done("invalid");
    await writeClient
      .patch(id)
      .set({ status: "unsubscribed", unsubscribedAt: new Date().toISOString() })
      .commit();
    return done("unsubscribed");
  } catch {
    return done("error");
  }
}
