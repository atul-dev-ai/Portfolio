"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
// EmailJS বাদ দিয়ে Server Action ইমপোর্ট করুন
import { sendEmail } from "@/actions/sendEmail";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/atul-dev-ai",
      color: "hover:text-gray-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/paul-atul",
      color: "hover:text-blue-500",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/atulkumar.paul.71",
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/atulpaul020",
      color: "hover:text-sky-400",
    },
  ];

  return (
    <section id="contact" className="relative pt-24 pb-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 opacity-50" />

      <div className="container px-6 md:px-12 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium animate-bounce [animation-duration:2s]">
            <span>
              <span className="animate-pulse [animation-duration: 3s]">📬</span> Get in Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Let&apos;s Connect Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind or just want to say hi? Feel free to reach
            out.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Info (Left Side) - SAME AS BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <p className="text-muted-foreground">
                I am available for freelance work and full-time opportunities.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-5 w-5 animate-pulse" />
                  </div>
                  <div className="animate-pulse">
                    <p className="text-sm font-medium text-muted-foreground">
                      Email
                    </p>
                    <a
                      href="mailto:contact@atulpaul.com"
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      contact@atulpaul.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="h-5 w-5 animate-pulse" />
                  </div>
                  <div className="animate-pulse">
                    <p className="text-sm font-medium text-muted-foreground">
                      Location
                    </p>
                    <p className="text-lg font-semibold">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Follow Me</h4>
              <div className="flex gap-4 animate-pulse">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-secondary/80 border border-border/50 transition-all hover:scale-110 ${social.color}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Right Side) - UPDATED FOR RESEND */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-muted/50 shadow-lg bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8 space-y-6">
                <form
                  ref={formRef}
                  action={async (formData) => {
                    setLoading(true);
                    const result = await sendEmail(formData);
                    setLoading(false);

                    if (result.error) {
                      toast.error("Failed to send message.", {
                        description: result.error,
                      });
                    } else {
                      toast.success("Message sent successfully!", {
                        description: "I'll get back to you soon.",
                      });
                      formRef.current?.reset();
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label htmlFor="user_name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="user_name"
                      name="user_name"
                      placeholder="Your Name"
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="user_email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="user_email"
                      name="user_email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project Inquiry"
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Write your message here..."
                      className="min-h-[150px] bg-background/50 resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-medium mt-1 cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full " />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Send Message <Send className="h-4 w-4 animate-pulse [animation-duration:2.5s]" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
