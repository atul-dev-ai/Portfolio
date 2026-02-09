"use client";

import Image from "next/image";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  // অ্যানিমেশন ভেরিয়েন্ট (Smooth Entrance এর জন্য)
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="container flex flex-col-reverse md:flex-row items-center justify-between py-24 md:py-24 gap-10 px-4 md:px-8 overflow-hidden">
      {/* Left Side: Text Content */}
      <motion.div
        className="flex-1 flex flex-col gap-6 text-center md:text-left"
        initial="initial"
        animate="animate"
        variants={{
          animate: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.span
          variants={fadeInUp}
          className="text-primary font-medium tracking-wider uppercase"
        >
          Welcome to my portfolio
        </motion.span>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Hi, I'm <span className="text-primary">Atul Paul</span>
        </motion.h1>

        {/* Typing Effect Section */}
        <motion.div
          variants={fadeInUp}
          className="text-2xl md:text-4xl font-semibold flex gap-2 justify-center md:justify-start text-muted-foreground"
        >
          <span>I am a</span>
          <span className="text-foreground"> {/* Typing Effect */}
            <Typewriter 
              options={{
                strings: [
                  "Developer.",
                  "Student.",
                  "AI Enthusiast.",
                  "Problem Solver.",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 75,
                wrapperClassName: "text-primary font-bold", // Typing text colour 
              }}
            />
          </span>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0"
        >
          Passionate about building modern web applications and exploring the
          frontiers of Artificial Intelligence. Let's create something amazing
          together.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center md:justify-start gap-4 pt-4"
        >
          <Button asChild size="lg" className="rounded-full gap-2">
            <Link href="#projects">
              View My Work <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full gap-2"
          >
            {/* Resume file link path like     href="/resume.pdf" */}
            <Link href="/my-cv.pdf" target="_blank">
              Download CV <Download className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Side: Image Section with Decor */}
      <motion.div
        className="flex-1 relative flex items-center justify-center w-full max-w-[400px] aspect-square"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Background Decorative blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob dark:mix-blend-screen"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/40 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000 dark:mix-blend-screen"></div>

        {/* Main Image Container */}
        <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full border-4 border-background shadow-2xl overflow-hidden z-10">
          <Image
            /* ⚠️ গুরুত্বপূর্ণ: আপনার ছবি public ফোল্ডারে রাখার পর
              নিচের লাইনটি বদলে src="/profile.jpg" করে দিন।
            */
            src="/atul3.jpg"
            alt="Atul Paul"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
