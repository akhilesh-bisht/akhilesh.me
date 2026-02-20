import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css" assert { type: "css" };

import ClientLayout from "./ClientLayout";
import { Analytics } from "@vercel/analytics/next";

const fallbackStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
  clear: () => undefined,
};

if (typeof globalThis !== "undefined") {
  const storage = (globalThis as { localStorage?: unknown }).localStorage as
    | { getItem?: unknown }
    | undefined;
  if (storage && typeof storage.getItem !== "function") {
    (globalThis as { localStorage?: unknown }).localStorage = fallbackStorage;
  }
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Akhilesh Bisht - Full Stack Developer",
    template: "%s | Akhilesh Bisht",
  },
  description:
    "Full Stack Developer specializing in React, Node.js, MongoDB. Building responsive, scalable web apps with RESTful APIs and modern UI.",
  metadataBase: new URL("https://akhilesj.me"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akhilesj.me",
    title: "Akhilesh Bisht - Full Stack Developer",
    description:
      "Full Stack Developer from Dehradun. React, Node.js, MongoDB. Building responsive web apps from concept to deployment.",
    siteName: "Akhilesh Bisht",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhilesh Bisht - Full Stack Developer",
    description: "Full Stack Developer. React, Node.js, MongoDB. Dehradun, India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
