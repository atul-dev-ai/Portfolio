"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function PrivacyPage() {
  // ১. স্ক্রল প্রগ্রেস বার লজিক
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "collect", title: "Information Collection" },
    { id: "usage", title: "Data Usage" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "thirdparty", title: "Third-Party Services" },
    { id: "security", title: "Data Security" },
    { id: "rights", title: "Your Rights" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      {/* ২. স্ক্রল প্রগ্রেস বার (একদম উপরে থাকবে) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* ৩. স্টিকি টেবিল অফ কন্টেন্টস (ডেস্কটপের জন্য) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 space-y-6 border-l border-primary/10 pl-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Contents
              </h3>
              <nav className="flex flex-col gap-4">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* ৪. বিস্তারিত কন্টেন্ট সেকশন */}
          <main className="flex-1 space-y-20 max-w-3xl">
            <header className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground">
                Privacy <span className="text-primary">Policy.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                আপনার তথ্যের সুরক্ষা আমার কাছে অত্যন্ত গুরুত্বপূর্ণ। আমি কিভাবে
                আপনার ডাটা সংগ্রহ ও ব্যবহার করি তার বিস্তারিত বিবরণ নিচে দেওয়া
                হলো।
              </p>
            </header>

            {/* --- Section 1: Intro --- */}
            <section id="intro" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                01. Introduction
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg text-justify">
                <p>
                  Welcome to the official portfolio of **Atul Paul**. I am
                  committed to protecting your personal information and your
                  right to privacy. In this document, I describe my privacy
                  policy in the clearest way possible.
                </p>
                <p>
                  This policy applies to all information collected through our
                  website (atulpaul.vercel.app), and/or any related services,
                  sales, marketing, or events. Please read this privacy notice
                  carefully as it will help you understand what I do with the
                  information I collect.
                </p>
              </div>
            </section>

            {/* --- Section 2: Collection --- */}
            <section id="collect" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                02. Information Collection
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  I collect personal information that you voluntarily provide to
                  me when you:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                  <li className="bg-muted/50 p-4 rounded-xl border border-primary/5">
                    ✅ Register on the Website
                  </li>
                  <li className="bg-muted/50 p-4 rounded-xl border border-primary/5">
                    ✅ Express interest in my projects
                  </li>
                  <li className="bg-muted/50 p-4 rounded-xl border border-primary/5">
                    ✅ Use the LifeFlow Dashboard
                  </li>
                  <li className="bg-muted/50 p-4 rounded-xl border border-primary/5">
                    ✅ Contact me via Form
                  </li>
                </ul>
                <p>
                  Specifically, through **Supabase Auth**, I store your unique
                  User ID, email, and last login time to manage your secure
                  session.
                </p>
              </div>
            </section>

            {/* --- Section 3: Usage --- */}
            <section id="usage" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                03. How I Use Data
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I use personal information collected via our Website for a
                variety of business purposes described below:
              </p>
              <ul className="list-disc pl-6 space-y-3 marker:text-primary text-muted-foreground">
                <li>
                  <strong>To facilitate account creation:</strong> Managing the
                  login process via Supabase.
                </li>
                <li>
                  <strong>To send administrative information:</strong> Updating
                  you on project changes or terms.
                </li>
                <li>
                  <strong>To protect our Services:</strong> Keeping the site
                  safe from bots and fraud.
                </li>
                <li>
                  <strong>To respond to legal requests:</strong> Complying with
                  law enforcement if necessary.
                </li>
              </ul>
            </section>

            {/* --- Section 4: Cookies --- */}
            <section id="cookies" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                04. Cookies & Tracking
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                This site uses technical cookies and LocalStorage to remember
                your preferences (like **Dark Mode**) and to maintain your
                logged-in session. These are essential for the site to function
                correctly. I do not use third-party tracking cookies for
                advertising.
              </p>
            </section>

            {/* --- Section 5: Third-Party --- */}
            <section id="thirdparty" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                05. Third-Party Services
              </h2>
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="mb-4 font-semibold text-foreground">
                  I share data only with the following essential processors:
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Vercel (Hosting)",
                    "Supabase (DB/Auth)",
                    "Resend (Email)",
                    "GitHub (OAuth)",
                  ].map((s) => (
                    <span
                      key={s}
                      className="px-4 py-2 bg-background border border-primary/20 rounded-full text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* --- Section 6: Security --- */}
            <section id="security" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                06. Data Security
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I have implemented appropriate technical and organizational
                security measures designed to protect the security of any
                personal information I process. However, please also remember
                that I cannot guarantee that the internet itself is 100% secure.
              </p>
            </section>

            {/* --- Section 7: Rights --- */}
            <section id="rights" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                07. Your Privacy Rights
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed italic">
                You may review, change, or terminate your account at any time.
                If you would like to request a copy of your data or its
                deletion, please contact me.
              </p>
            </section>

            {/* --- Section 8: Contact --- */}
            <section
              id="contact"
              className="scroll-mt-32 pt-10 border-t border-primary/20"
            >
              <h2 className="text-3xl font-bold text-foreground">
                08. Contact Me
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                If you have questions or comments about this notice, you may
                email me at:
              </p>
              <a
                href="mailto:paulatul020@gmail.com"
                className="text-2xl font-bold text-primary hover:underline underline-offset-8"
              >
                paulatul020@gmail.com
              </a>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
