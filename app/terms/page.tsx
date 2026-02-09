"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function TermsPage() {
  // ১. স্ক্রল প্রগ্রেস বার লজিক
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sections = [
    { id: "agreement", title: "Agreement to Terms" },
    { id: "intellectual", title: "Intellectual Property" },
    { id: "user-auth", title: "User Accounts" },
    { id: "license", title: "Usage License" },
    { id: "restrictions", title: "Prohibited Conduct" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "governing", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
    { id: "contact", title: "Contact Information" },
  ];

  return (
    <div className="relative min-h-screen bg-background">
      {/* ২. প্রগ্রেস বার */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* ৩. স্টিকি নেভিগেশন (TOC) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 space-y-6 border-l-2 border-primary/5 pl-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/40">
                Navigation
              </h3>
              <nav className="flex flex-col gap-5">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-sm font-medium text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* ৪. মেইন কন্টেন্ট */}
          <main className="flex-1 space-y-24 max-w-3xl">
            <header className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground italic">
                Terms of <span className="text-primary">Service.</span>
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="h-px w-12 bg-primary/30"></span>
                <p className="text-sm font-medium uppercase tracking-widest">
                  Version 1.2 • Feb 2026
                </p>
              </div>
            </header>

            {/* --- Section 1: Agreement --- */}
            <section id="agreement" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground underline decoration-primary/20 underline-offset-8">
                01. Agreement to Terms
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed text-justify">
                By accessing or using **atulpaul.vercel.app**, you agree to be
                bound by these Terms of Service. These terms constitute a
                legally binding agreement between you and **Atul Paul**. If you
                disagree with any part of the terms, you must discontinue use of
                the website immediately.
              </p>
            </section>

            {/* --- Section 2: Intellectual Property --- */}
            <section id="intellectual" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground underline decoration-primary/20 underline-offset-8">
                02. Intellectual Property
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The content, features, and functionality of this site are the
                exclusive property of **Atul Paul**. This includes all software
                code for projects such as:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-primary/10 bg-primary/5">
                  <h4 className="font-bold text-primary">LifeFlow</h4>
                  <p className="text-xs text-muted-foreground">
                    Blood Donor Find system.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-primary/10 bg-primary/5">
                  <h4 className="font-bold text-primary">Mobile Detector</h4>
                  <p className="text-xs text-muted-foreground">
                    AI detection algorithms and integration scripts.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-primary/10 bg-primary/5">
                  <h4 className="font-bold text-primary">Some Portfolio</h4>
                  <p className="text-xs text-muted-foreground">
                    Personal Portfolio Website.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-primary/10 bg-primary/5">
                  <h4 className="font-bold text-primary">QR Code Generator</h4>
                  <p className="text-xs text-muted-foreground">
                    From Long/Lage link to QR Code.
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic mt-4">
                You may not reproduce, distribute, or create derivative works
                from this content without explicit written permission.
              </p>
            </section>

            {/* --- Section 3: User Accounts --- */}
            <section id="user-auth" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground underline decoration-primary/20 underline-offset-8">
                03. User Accounts & Security
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  To access certain premium features, you must create an account
                  via our secure **Supabase Authentication** gateway.
                </p>
                <ul className="list-disc pl-6 space-y-3 marker:text-primary">
                  <li>
                    You are responsible for maintaining the confidentiality of
                    your credentials.
                  </li>
                  <li>
                    You must notify us of any security breach or unauthorized
                    use.
                  </li>
                  <li>
                    We reserve the right to suspend accounts that display
                    suspicious or malicious activity.
                  </li>
                </ul>
              </div>
            </section>

            {/* --- Section 4: License --- */}
            <section id="license" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground underline decoration-primary/20 underline-offset-8">
                04. Usage License
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Permission is granted to temporarily download one copy of the
                materials for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title, and
                under this license, you may not modify or copy the materials for
                resale.
              </p>
            </section>

            {/* --- Section 5: Restrictions --- */}
            <section id="restrictions" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground underline decoration-primary/20 underline-offset-8">
                05. Prohibited Conduct
              </h2>
              <div className="bg-red-500/5 p-6 rounded-2xl border border-red-500/10 border-dashed">
                <p className="text-foreground font-semibold mb-4">
                  You are strictly prohibited from:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    🚫 Using the site for any unauthorized commercial purposes.
                  </li>
                  <li>🚫 Attempting to bypass the Supabase security layers.</li>
                  <li>🚫 Using automated bots to scrape project data.</li>
                  <li>🚫 Impersonating another user or entity.</li>
                </ul>
              </div>
            </section>

            {/* --- Section 6: Liability --- */}
            <section id="liability" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground underline decoration-primary/20 underline-offset-8">
                06. Limitation of Liability
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                In no event shall **Atul Paul** be liable for any damages
                (including, without limitation, damages for loss of data or
                profit) arising out of the use or inability to use the materials
                on this website, even if notified of the possibility of such
                damage.
              </p>
            </section>

            {/* --- Section 7: Governing Law --- */}
            <section id="governing" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground underline decoration-primary/20 underline-offset-8">
                07. Governing Law
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                These terms and conditions are governed by and construed in
                accordance with the laws of **Bangladesh**. You irrevocably
                submit to the exclusive jurisdiction of the courts located in
                **Manikganj/Dhaka** for any disputes.
              </p>
            </section>

            {/* --- Section 8: Changes --- */}
            <section id="changes" className="scroll-mt-32 space-y-6">
              <h2 className="text-3xl font-bold text-foreground underline decoration-primary/20 underline-offset-8">
                08. Changes to Terms
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I reserve the right to revise these terms at any time. It is
                your responsibility to check this page periodically for updates.
                Your continued use of the site after changes signifies your
                acceptance.
              </p>
            </section>

            {/* --- Section 9: Contact --- */}
            <section
              id="contact"
              className="scroll-mt-32 pt-16 border-t border-primary/20"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground max-w-sm">
                  If you have any questions about these terms, feel free to
                  contact me directly.
                </p>
                <a
                  href="mailto:paulatul020@gmail.com"
                  className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                >
                  paulatul020@gmail.com
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
