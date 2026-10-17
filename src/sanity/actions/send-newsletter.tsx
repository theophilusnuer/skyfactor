import { useState } from "react";
import type { DocumentActionComponent } from "sanity";

export const SendNewsletterAction: DocumentActionComponent = (props) => {
  const { type, id, published, onComplete } = props;
  const [busy, setBusy] = useState(false);
  const [dialog, setDialog] = useState<"confirm" | "result" | null>(null);
  const [message, setMessage] = useState("");

  if (type !== "newsletter") return null;

  const alreadySent = Boolean(published?.sentAt);
  const publishedId = id.replace(/^drafts\./, "");

  return {
    label: busy ? "Sending…" : alreadySent ? "Sent" : "Send to subscribers",
    icon: () => "📨",
    tone: "positive",
    disabled: busy || alreadySent || !published,
    title: !published
      ? "Publish the newsletter first"
      : alreadySent
        ? "This newsletter has already been sent"
        : undefined,
    onHandle: () => setDialog("confirm"),
    dialog:
      dialog === "confirm"
        ? {
            type: "confirm",
            tone: "positive",
            message:
              "Send this newsletter to all active subscribers? This cannot be undone.",
            onCancel: () => setDialog(null),
            onConfirm: async () => {
              setDialog(null);
              setBusy(true);
              try {
                const res = await fetch("/api/newsletter/send", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id: publishedId }),
                });
                const data = await res.json();
                setMessage(
                  res.ok
                    ? `Sent to ${data.sent} subscriber(s).`
                    : (data.error ?? "Sending failed."),
                );
              } catch {
                setMessage("Network error while sending.");
              }
              setBusy(false);
              setDialog("result");
            },
          }
        : dialog === "result"
          ? {
              type: "dialog",
              header: "Newsletter",
              content: <div style={{ padding: 16 }}>{message}</div>,
              onClose: () => {
                setDialog(null);
                onComplete();
              },
            }
          : null,
  };
};
