"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Code2,
  Gamepad2,
  Camera,
  Palette,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BioSection() {
  return (
    <section id="bio" className="container py-24 md:py-32 space-y-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
          About Me
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A glimpse into my world—education, passion, and creativity.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Main Bio Text (Large Card) */}
        <motion.div
          className="col-span-1 md:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full border-none bg-accent/10 dark:bg-accent/5 backdrop-blur-sm">
            <CardContent className="p-8 flex flex-col justify-center h-full space-y-4">
              <h3 className="text-2xl font-semibold">Hello, I'm Atul Paul.</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I am currently pursuing my{" "}
                <strong>BSc in Computing and Information Systems</strong> at{" "}
                <span className="text-primary font-medium">
                  Daffodil International University
                </span>
                .
                <br />
                <br />
                My journey started with curiosity about how software shapes our
                lives. From solving complex logic in <strong>
                  C & Python
                </strong>{" "}
                to crafting modern web experiences, I love bridging the gap
                between code and creativity. Currently, I am focused on
                mastering <strong>Full Stack Web Development</strong> and
                exploring the potential of <strong>Generative AI</strong>.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* 2. Location & Education (Stacked Cards) */}
        <div className="space-y-6">
          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-none bg-primary/5">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    Based in
                  </p>
                  <p className="font-semibold text-lg">Manikganj, Dhaka</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* University Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-none bg-primary/5">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    Education
                  </p>
                  <p className="font-semibold">BSc in Computing & IS</p>
                  <p className="text-sm text-muted-foreground">
                    Daffodil International University
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 3. Tech Focus */}
        <motion.div
          className="col-span-1 md:col-span-1"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="h-full border-none bg-gradient-to-br from-primary/5 to-accent/10">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Tech Focus</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "C Programming",
                  "Python",
                  "Web Development",
                  "Generative AI",
                ].map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-background/50 hover:bg-background/80"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 4. Hobbies & Interests */}
        <motion.div
          className="col-span-1 md:col-span-2"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="h-full border-none bg-accent/5">
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-lg mb-1">
                  When I'm not coding...
                </h4>
                <p className="text-muted-foreground">
                  I explore creativity through other lenses.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shadow-sm">
                    <Camera className="h-5 w-5 text-foreground" />
                  </div>
                  <span className="text-xs font-medium">Photography</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shadow-sm">
                    <Palette className="h-5 w-5 text-foreground" />
                  </div>
                  <span className="text-xs font-medium">Editing</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shadow-sm">
                    <Gamepad2 className="h-5 w-5 text-foreground" />
                  </div>
                  <span className="text-xs font-medium">Gaming</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
