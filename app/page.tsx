import HeroSection from "@/components/ui/hero-section";
import BioSection from "@/components/ui/bio-section";
import Skills from "@/components/ui/skills-section";
import ProjectsSection from "@/components/ui/projects-section";
import EducationSection from "@/components/ui/education-section";
import ContactSection from "@/components/ui/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* হিরো সেকশন */}
      <HeroSection />

      {/* বায়ো সেকশন */}
      <BioSection />

      {/* ২. এখানে কম্পোনেন্টটি কল করা হয়েছে (এটি মিস হলে দেখাবে না) */}
      <EducationSection />

      {/* স্কিল সেকশন */}
      <Skills />

      {/* প্রজেক্ট সেকশন */}
      <ProjectsSection />

      {/* কন্টাক্ট সেকশন */}
      <ContactSection />
    </main>
  );
}
