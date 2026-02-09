export default function PrivacyPage() {
  return (

    <div className="container mx-auto px-6 md:px-12 max-w-3xl pt-32 pb-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: February 2026</p>
      </div>

      <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">
            1. Introduction
          </h2>
          <p>
            Welcome to the portfolio of{" "}
            <strong className="text-primary">Atul Paul</strong>. I respect your
            privacy and am committed to protecting your personal data. This
            policy explains how I handle your information when you visit my
            website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">
            2. Information I Collect
          </h2>
          <p>
            This website is a static portfolio. I do not use cookies to track
            your personal behavior.
            <br />
            However, if you use the <strong>Contact Form</strong>, I collect:
          </p>
          <ul className="list-disc pl-6 space-y-1 marker:text-primary">
            <li>Your Name</li>
            <li>Your Email Address</li>
            <li>The content of your message</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">
            3. How I Use Your Information
          </h2>
          <p>
            The information you provide via the contact form is used{" "}
            <strong>solely to reply to your inquiry</strong>. I do not share,
            sell, or rent your personal information to third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">
            4. Third-Party Services
          </h2>
          <p>
            I use <strong>Web3Forms</strong> to process contact form
            submissions. By sending a message, you acknowledge that your data
            will be processed by their service strictly for email delivery
            purposes.
          </p>
        </section>
      </div>
    </div>
  );
}
