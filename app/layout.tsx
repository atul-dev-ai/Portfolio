import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

// ------------------------------------------------------------------
// ১. এখানে আপনার মেটাডাটা এবং SEO কনফিগারেশন করা হলো
// ------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL("https://atulpaul.vercel.app"), // 👈 এখানে আসল লিংক বসানো হলো

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
    url: "https://atulpaul.vercel.app", // 👈 এখানেও ঠিক করা হলো
    siteName: "Atul Paul Portfolio",
    images: [
      {
        url: "/og-image.jpg", // ⚠️ নিচে পড়ুন
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
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
