"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  // <--- export default ব্যবহার করা হলো
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Dhaka",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 md:px-12 py-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              Let's work together
            </h2>
            <p className="text-muted-foreground text-lg">
              Creating digital experiences with code & passion.
            </p>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="mailto:your@email.com">Get in touch</Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b pb-12 border-border/40">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#bio"
                  className="hover:text-primary transition-colors"
                >
                  Bio
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Socials</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="https://linkedin.com/in/paul-atul"
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/atul-dev-ai"
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://x.com/paulatul020"
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  Twitter (X)
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-4 bg-accent/5 p-6 rounded-2xl border border-border/50">
            <h3 className="font-semibold text-foreground">Local Time</h3>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-2xl font-mono font-bold">{time}</span>
            </div>
            <p className="text-xs text-muted-foreground">Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()}
            <a href="/" className="text-pink-500 font-bold text-[18px]">
              {" "}
              Atul Paul
            </a>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>using Next.js & shadcn/ui</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
