"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Code2,
  Globe,
  BrainCircuit,
  Wrench,
  Database,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// স্কিল ডাটা (আপনার প্রোফাইল অনুযায়ী)
const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code2 className="w-8 h-8 text-blue-500" />,
    skills: ["C", "C++", "Python", "JavaScript", "TypeScript"],
    gradient: "from-blue-500/10 via-cyan-500/10 to-transparent",
    border: "group-hover:border-blue-500/50",
  },
  {
    title: "Web Development",
    icon: <Globe className="w-8 h-8 text-green-500" />,
    skills: [
      "React.js",
      "Next.js 14",
      "Tailwind CSS",
      "HTML5/CSS3",
      "Bootstrap",
      "Django",
    ],
    gradient: "from-green-500/10 via-emerald-500/10 to-transparent",
    border: "group-hover:border-green-500/50",
  },
  {
    title: "AI & Machine Learning",
    icon: <BrainCircuit className="w-8 h-8 text-purple-500" />,
    skills: [
      "Generative AI",
      "Prompt Engineering",
      "LLMs",
      "OpenAI API",
      "Python for AI",
    ],
    gradient: "from-purple-500/10 via-pink-500/10 to-transparent",
    border: "group-hover:border-purple-500/50",
  },
  {
    title: "Tools & DevOps",
    icon: <Wrench className="w-8 h-8 text-orange-500" />,
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Vercel",
      "Figma",
      "Postman",
      "Supabase",
    ],
    gradient: "from-orange-500/10 via-yellow-500/10 to-transparent",
    border: "group-hover:border-orange-500/50",
  },
];

// ৩ডি টিল্ট কার্ড কম্পোনেন্ট
const TiltCard = ({
  data,
  index,
}: {
  data: (typeof skillCategories)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // মাউস পজিশন ডিটেকশন
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // স্মুথ এনিমেশনের জন্য স্প্রিং এফেক্ট
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;

    // রোটেশন ক্যালকুলেশন (Gyroscope feel)
    const rX = (mouseY / height - 32.5 / 2) * -1;
    const rY = mouseX / width - 32.5 / 2;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative group rounded-3xl border border-white/10 bg-gray-900/50 backdrop-blur-md p-8 h-full transition-colors duration-500 ${data.border}`}
    >
      {/* ব্যাকগ্রাউন্ড গ্রেডিয়েন্ট গ্লো */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${data.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        style={{ transform: "translateZ(-50px)" }}
      />

      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 flex flex-col h-full"
      >
        {/* আইকন ও টাইটেল */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            {data.icon}
          </div>
          <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
            {data.title}
          </h3>
        </div>

        {/* স্কিল ব্যাজগুলো (মার্জিন ফিক্স করা হয়েছে) */}
        <div className="flex flex-wrap gap-3 mt-auto">
          {data.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-4 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 border-white/5 text-gray-300 hover:text-white transition-all hover:scale-105 select-none"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black/95">
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10">
        {/* সেকশন হেডার */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            My Technical Arsenal
          </h2>
          <p className="text-lg text-gray-400">
            Expertise in modern web technologies and AI integration, utilized in
            building projects like LifeFlow-pro.
          </p>
        </div>

        {/* গ্রিড লেআউট */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 perspective-1000">
          {skillCategories.map((category, index) => (
            <TiltCard key={category.title} data={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
