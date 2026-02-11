import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react"; // ✅ ১. Suspense ইমপোর্ট
import Tracker from "@/components/Tracker";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ui/theme-provider";

import ClientLoader from "@/components/ui/ClientLoader";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://atulpaul.vercel.app"),
  title: {
    default: "Atul Paul | Full Stack Developer",
    template: "%s | Atul Paul",
  },
  description:
    "Portfolio of Atul Paul, a passionate Full Stack Developer specializing in Next.js, React, and Python based in Dhaka, Bangladesh.",
  keywords: [
    "Atul Paul",
    "Full Stack Developer",
    "Web Developer Bangladesh",
    "Next.js Developer",
    "React Developer",
    "Portfolio",
  ],
  openGraph: {
    title: "Atul Paul | Full Stack Developer",
    description:
      "Building modern web applications with Next.js and AI integration.",
    url: "https://atulpaul.vercel.app",
    siteName: "Atul Paul Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Atul Paul Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atul Paul | Full Stack Developer",
    description:
      "Building modern web applications with Next.js and AI integration.",
    images: ["/og-image.jpg"],
    creator: "@atulpaul020",
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "fb:app_id": "829194552813351",
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
          {/* 🔥 SOLUTION: পুরো ClientLoader এবং এর ভেতরের সবকিছুকে 
            Suspense দিয়ে র‍্যাপ (Wrap) করা হলো। 
            এখন ClientLoader বা Navbar যেই useSearchParams ব্যবহার করুক, 
            বিল্ড আর ফেইল করবে না।
          */}
          <Suspense
            fallback={<div className="h-screen w-full bg-background" />}
          >
            <ClientLoader>
              {/* Navbar আগেই ঠিক করা হয়েছে, তবুও সেইফটির জন্য এখানে থাকলো */}
              <Navbar />
              <Tracker />

              {children}

              <Toaster />
              <Footer />
              <Analytics />
            </ClientLoader>
          </Suspense>

          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
