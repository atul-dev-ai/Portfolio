"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// আপনার দেওয়া ডাটা
const projectsData = [
  {
    id: 1,
    title: "LifeFlow",
    description:
      "A comprehensive lifestyle management platform helping users track habits and productivity.",
    image: "/lifeflow.png",
    tags: ["Next.js", "Tailwind", "Supabase"],
    liveLink: "https://atul-dev-ai.github.io/WDE-Lab-Resource/LifeFlow/",
    repoLink:
      "https://github.com/atul-dev-ai/WDE-Lab-Resource/tree/main/LifeFlow",
  },
  {
    id: 2,
    title: "Mobile Phone Detector",
    description:
      "An AI-based system to detect mobile phone usage in restricted areas using computer vision.",
    image: "/aidetection.png",
    tags: ["Python", "OpenCV", "YOLO", "HTML", "CSS", "JS"],
    liveLink: "https://atul-dev-ai.github.io/Mobile-Detection-Two/",
    repoLink: "https://github.com/atul-dev-ai/Mobile-Detection-Two",
  },
  {
    id: 3,
    title: "Second Portfolio Website",
    description: "A Font-end website for my personal project showcase.",
    image: "/portfolio-1.png",
    tags: ["Bootstrap", "CSS", "JavaScript"],
    liveLink: "https://atul-dev-ai.github.io/grand-portfolio/",
    repoLink: "https://github.com/atul-dev-ai/grand-portfolio",
  },
  {
    id: 4,
    title: "Bootslander Clone Website",
    description: "Bootslander Clone Project For my Assignment",
    image: "/bootstlander.png",
    tags: ["Bootstrap", "CSS", "JavaScript"],
    liveLink: "https://atul-dev-ai.github.io/bootslander-assignment",
    repoLink: "https://github.com/atul-dev-ai/bootslander-assignment",
  },
  {
    id: 5,
    title: "First Portfolio Website",
    description: "A Font-end website for my personal project showcase.",
    image: "/1st-portfo.png",
    tags: ["Bootstrap", "CSS", "JavaScript"],
    liveLink: "https://atul-dev-ai.github.io/my-portfolio-website",
    repoLink: "https://github.com/atul-dev-ai/my-portfolio-website",
  },
  {
    id: 6,
    title: "QR Code Generator ",
    description: "A QR Code Generator website for large link to QR Image.",
    image: "/qr-code.png",
    tags: ["HTML", "CSS", "JavaScript"],
    repoLink: "https://atul-dev-ai.github.io/QR-code-generator",
    liveLink: "https://github.com/atul-dev-ai/QR-code-generator",
  },
  {
    id: 7,
    title: "First Portfolio Website",
    description: "A Font-end website for my personal project showcase.",
    image: "/login-page.png",
    tags: ["Bootstrap", "CSS", "JavaScript"],
    liveLink: "https://atul-dev-ai.github.io/Login-Page-two",
    repoLink: "https://github.com/atul-dev-ai/Login-Page-two",
  },
  {
    id: 8,
    title: "First Portfolio Website",
    description: "A Font-end website for my personal project showcase.",
    image: "/second.png",
    tags: ["Bootstrap", "CSS", "JavaScript"],
    liveLink: "https://atul-dev-ai.github.io/Portfolio-project-1",
    repoLink: "https://github.com/atul-dev-ai/Portfolio-project-1",
  },
];

// --- 3D Card Component ---
const ProjectCard = ({ project }: { project: (typeof projectsData)[0] }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion Values for Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Spring Physics
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
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
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative h-full rounded-3xl bg-gray-900/40 border border-white/10 p-4 hover:border-primary/50 transition-colors duration-500"
    >
      {/* 3D Depth Content Container */}
      <div
        style={{ transform: "translateZ(20px)" }}
        className="flex flex-col h-full bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 shadow-xl"
      >
        {/* Image Section with Zoom Effect */}
        <div className="relative aspect-video w-full overflow-hidden">
          <div className="absolute top-3 left-3 z-10 flex gap-1.5 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm" />
          </div>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-6 space-y-4">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors animate-pulse [animation-duration:7s]">
                {project.title}
              </h3>
              <Layers className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors animate-pulse [animation-duration:4s]" />
            </div>
            <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-secondary/50 hover:bg-primary/20 text-xs font-medium transition-colors animate-pulse"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Buttons (Glowing Effect) */}
          <div
            className="grid grid-cols-2 gap-3 pt-4 mt-2"
            style={{ transform: "translateZ(30px)" }}
          >
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-primary/20 hover:bg-primary/10 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all duration-300"
            >
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4 animate-bounce [animation-duration:2s]" />{" "}
                Code
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              className="w-full bg-primary/90 hover:bg-primary hover:shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-all duration-300"
            >
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4  animate-pulse" /> Demo
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div
        className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"
        style={{ transform: "translateZ(-20px)" }}
      />
    </motion.div>
  );
};

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 3);

  return (
    <section
      id="projects"
      className="container mx-auto px-6 md:px-12 py-8 space-y-16 perspective-1000"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-4 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-2 animate-bounce [animation-duration:1.4s]">
          <span><span className="animate-pulse">🚀</span>  My Work</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-lg">
          A collection of projects where I&apos;ve turned complex problems into
          elegant solutions.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        <AnimatePresence>
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Less Button */}
      {projectsData.length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex justify-center pt-2"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll(!showAll)}
            className="group gap-2 border-primary/20 hover:bg-primary/10 rounded-full px-8 cursor-pointer hover:-translate-y-0.5 transition duration-300"
          >
            {showAll ? (
              <>
                Show Less{" "}
                <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
              </>
            ) : (
              <>
                Show More Projects{" "}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </>
            )}
          </Button>
        </motion.div>
      )}
    </section>
  );
}
