import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/contact-page-client";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Guest suggestions, editorial ideas, partnerships, Vafiam, Venunye and speaking enquiries.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
