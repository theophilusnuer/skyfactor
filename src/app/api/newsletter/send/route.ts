import { NextResponse } from "next/server";
import { toHTML, uriLooksSafe } from "@portabletext/to-html";
import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import { esc, sendEmail, siteUrl, writeClient } from "@/lib/newsletter-server";

export const maxDuration = 300;

const builder = createImageUrlBuilder({ projectId, dataset });

type Newsletter = {
  subject: string;
  preheader?: string;
  body: unknown[];
  ctaLabel?: string;
  ctaUrl?: string;
  sentAt?: string;
};

function render(n: Newsletter, unsubscribeUrl: string) {
  const body = toHTML(n.body as never, {
    components: {
      types: {
        image: ({ value }) =>
          `<img src="${esc(builder.image(value).width(1200).url())}" alt="" style="width:100%;height:auto;margin:24px 0" />`,
      },
      block: {
        normal: ({ children }) => `<p style="margin:0 0 18px;line-height:1.7">${children}</p>`,
        h2: ({ children }) => `<h2 style="margin:32px 0 12px;font-size:26px;line-height:1.2">${children}</h2>`,
        h3: ({ children }) => `<h3 style="margin:24px 0 10px;font-size:20px">${children}</h3>`,
        blockquote: ({ children }) =>
          `<blockquote style="margin:24px 0;padding-left:16px;border-left:3px solid #38bdf8;font-style:italic">${children}</blockquote>`,
      },
      marks: {
        underline: ({ children }) => `<u>${children}</u>`,
        link: ({ children, value }) => {
          const href = value?.href ?? "";
          return uriLooksSafe(href)
            ? `<a href="${esc(href)}" style="color:#0ea5e9">${children}</a>`
            : String(children);
        },
      },
    },
  });

  const cta =
    n.ctaUrl && n.ctaLabel
      ? `<p style="margin:32px 0"><a href="${esc(n.ctaUrl)}" style="display:inline-block;background:#0ea5e9;color:#fff;padding:14px 24px;text-decoration:none;font-weight:600">${esc(n.ctaLabel)}</a></p>`
      : "";

  return `<!doctype html><html><body style="margin:0;background:#f5f1e8;font-family:Arial,Helvetica,sans-serif;color:#101820">
<span style="display:none;opacity:0;height:0;overflow:hidden">${esc(n.preheader ?? "")}</span>
<div style="max-width:620px;margin:0 auto;padding:40px 24px">
<p style="font-size:13px;letter-spacing:.3em;text-transform:uppercase;font-weight:700;margin:0 0 32px">SkyFactor</p>
<h1 style="font-size:32px;line-height:1.15;margin:0 0 24px">${esc(n.subject)}</h1>
${body}${cta}
<hr style="border:0;border-top:1px solid #d8d2c4;margin:40px 0 16px" />
<p style="font-size:12px;color:#666">You receive this because you subscribed on ${esc(siteUrl)}. <a href="${esc(unsubscribeUrl)}" style="color:#666">Unsubscribe</a></p>
</div></body></html>`;
}

export async function POST(req: Request) {
  const { id } = await req.json().catch(() => ({}));
  if (typeof id !== "string" || !/^[\w-]+$/.test(id) || id.startsWith("drafts.")) {
    return NextResponse.json({ error: "Invalid newsletter." }, { status: 400 });
  }

  const newsletter = await writeClient.fetch<Newsletter | null>(
    `*[_id == $id && _type == "newsletter"][0]{subject, preheader, body, ctaLabel, ctaUrl, sentAt}`,
    { id },
  );
  if (!newsletter) {
    return NextResponse.json({ error: "Publish the newsletter first." }, { status: 404 });
  }
  if (newsletter.sentAt) {
    return NextResponse.json({ error: "Already sent." }, { status: 409 });
  }

  // Claim the send before delivering so concurrent requests can't double-send.
  try {
    await writeClient
      .patch(id)
      .ifRevisionId((await writeClient.getDocument(id))!._rev)
      .set({ sentAt: new Date().toISOString(), recipientCount: 0 })
      .commit();
  } catch {
    return NextResponse.json({ error: "Already sending." }, { status: 409 });
  }

  const subscribers = await writeClient.fetch<{ email: string; token: string }[]>(
    `*[_type == "subscriber" && status == "subscribed" && defined(token)]{email, token}`,
  );

  let sent = 0;
  try {
    for (const s of subscribers) {
      const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${s.token}`;
      await sendEmail({
        to: s.email,
        subject: newsletter.subject,
        html: render(newsletter, unsubscribeUrl),
        unsubscribeUrl,
      });
      sent++;
    }
  } catch (e) {
    await writeClient.patch(id).set({ recipientCount: sent }).commit();
    return NextResponse.json(
      { error: `Stopped after ${sent} of ${subscribers.length}: ${(e as Error).message}` },
      { status: 502 },
    );
  }

  await writeClient.patch(id).set({ recipientCount: sent }).commit();
  return NextResponse.json({ ok: true, sent });
}
