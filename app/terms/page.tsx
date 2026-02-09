export default function TermsPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 max-w-3xl pt-32 pb-12 space-y-8">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: February 2026</p>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">1. Intellectual Property</h2>
        <p>
          All content on this website, including text, code, projects (LifeFlow,
          Mobile Detector, etc.), and images, is the intellectual property of{" "}
          <strong>Atul Paul</strong>.
        </p>

        <h2 className="text-xl font-semibold">2. Usage</h2>
        <p>
          You may view my open-source projects on GitHub for educational
          purposes, but you may not claim my work as your own.
        </p>
      </div>
    </div>
  );
}
