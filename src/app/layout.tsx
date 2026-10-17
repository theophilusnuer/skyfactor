
import type { Metadata } from "next";
import {
  DM_Sans,
  Manrope,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SkyFactor | Real conversations. Extraordinary people.",
    template: "%s | SkyFactor",
  },
  description:
    "SkyFactor with Richard Sky. Real conversations, extraordinary people and global perspectives on power, law and business.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${manrope.variable} ${dmSans.variable} ${playfair.variable}`}
      >
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
