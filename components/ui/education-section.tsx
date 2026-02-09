"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// আপনার এডুকেশন ডাটা এখানে দিন
const educationData = [
  {
    id: 1,
    degree: "B.Sc. in Computing & Information System",
    institution: "Daffodil International University",
    year: "2025 - Present",
    location: "Birulia , Savar, Dhaka, Bangladesh",
    description:
      "Focusing on Project Base Learning, Machine Learning, Big Data and AI. Active member of the AI Club.",
    tags: ["CGPA: ***(Running)", "Major in AI"],
  },
  {
    id: 2,
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Khan Bahadur Awlad Hossen Khan College",
    year: "2022 - 2024",
    location: "Manikganj,Dhaka",
    description: "Completed HSC from Science background.",
    tags: ["Science", "GPA: ***"],
  },
  {
    id: 3,
    degree: "Secondary School Certificate (SSC)",
    institution: "Ideal School & College",
    year: "2020 - 2022",
    location: "Bathuli, Dhamrai, Dhaka",
    description: "Built strong foundation in Mathematics and Physics.",
    tags: ["Science", "GPA: 3.29"],
  },
];

export default function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="education" className="container mx-auto px-6 md:px-12 py-16">
      <div className="flex flex-col items-center mb-16 space-y-4 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium animate-bounce">
          <GraduationCap className="w-4 h-4 mr-2 animate-pulse" />
          <span>Academic Journey</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Education
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          My academic qualifications and achievements.
        </p>
      </div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[19px] top-2 bottom-0 w-0.5 bg-border md:left-1/2 md:-ml-[1px]">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary to-primary/20"
          />
        </div>

        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-center md:justify-between ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 w-10 h-10 rounded-full border-4 border-background bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] z-10 flex items-center justify-center md:left-1/2 md:-translate-x-1/2">
                <GraduationCap className="w-5 h-5 text-primary-foreground animate-caret-blink [animate-duration:5s]" />
              </div>

              {/* Empty Space for Desktop layout */}
              <div className="hidden md:block w-5/12" />

              {/* Content Card */}
              <Card className="ml-16 md:ml-0 w-full md:w-5/12 hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2 animate-pulse">
                    <Badge
                      variant="outline"
                      className="mb-2 bg-primary/5 text-primary border-primary/20 animate-collapsible-down"
                    >
                      <Calendar className="w-3 h-3 mr-1 animate-pulse" />{" "}
                      {edu.year}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {edu.degree}
                  </CardTitle>
                  <p className="text-sm font-semibold text-primary">
                    {edu.institution}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1 animate-pulse" />{" "}
                    {edu.location}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {edu.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
