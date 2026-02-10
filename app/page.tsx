import HeroSection from "@/components/ui/hero-section";
import BioSection from "@/components/ui/bio-section";
import Skills from "@/components/ui/skills-section";
import ProjectsSection from "@/components/ui/projects-section";
import EducationSection from "@/components/ui/education-section";
import ContactSection from "@/components/ui/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <HeroSection />

      {/* Bio Section */}
      <BioSection />

      {/* Education Section */}
      <EducationSection />

      {/* Skill section  */}
      <Skills />

      {/* Project section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
