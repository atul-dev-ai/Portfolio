import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

// ------------------------------------------------------------------
// ১. এখানে আপনার মেটাডাটা এবং SEO কনফিগারেশন করা হলো
// ------------------------------------------------------------------
export const metadata: Metadata = {
  // ১. ব্রাউজার ট্যাবে যা দেখাবে
  title: {
    default: "Atul Paul | Full Stack Developer",
    template: "%s | Atul Paul",
  },
  description:
    "Portfolio of Atul Paul, a passionate Full Stack Developer specializing in Next.js, React, and Python based in Dhaka, Bangladesh.",

  // ২. কিওয়ার্ডস (গুগল সার্চের জন্য)
  keywords: [
    "Atul Paul",
    "Full Stack Developer",
    "Web Developer Bangladesh",
    "Next.js Developer",
    "React Developer",
    "Portfolio",
  ],

  // ৩. অরিজিনাল সাইট লিংক (Live হওয়ার পর ডোমেইন দেবেন)
  metadataBase: new URL("https://atulpaul.vercel.app"), // (⚠️ চেঞ্জ করুন: আপনার লাইভ ডোমেইন)

  // ৪. সোশ্যাল মিডিয়া শেয়ার প্রিভিউ (Open Graph)
  openGraph: {
    title: "Atul Paul | Full Stack Developer",
    description:
      "Building modern web applications with Next.js and AI integration.",
    url: "https://atulpaul.vercel.app",
    siteName: "Atul Paul Portfolio",
    images: [
      {
        url: "/og-image.png", // (⚠️ ধাপ ২ দেখুন)
        width: 1200,
        height: 630,
        alt: "Atul Paul Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ৫. টুইটার প্রিভিউ
  twitter: {
    card: "summary_large_image",
    title: "Atul Paul | Full Stack Developer",
    description:
      "Building modern web applications with Next.js and AI integration.",
    images: ["/og-image.png"], // (⚠️ ধাপ ২ দেখুন)
    creator: "@atulpaul020", // (আপনার টুইটার হ্যান্ডেল)
  },

  // ৬. আইকন (Favicon)
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
