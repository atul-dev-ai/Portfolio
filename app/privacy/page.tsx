export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 max-w-4xl pt-32 pb-12 space-y-12">
      {/* Header Section */}
      <div className="space-y-4 border-b border-primary/10 pb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Privacy <span className="text-primary">Policy</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Last Updated:{" "}
          <span className="font-semibold text-foreground">
            February 10, 2026
          </span>
        </p>
        <p className="max-w-2xl text-base leading-relaxed">
          Your privacy is of paramount importance to me. This document details
          the types of personal information received and collected by this
          portfolio and how it is used.
        </p>
      </div>

      <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
        {/* 1. Comprehensive Data Collection */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold">
              01
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Detailed Information Collection
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="p-5 border border-primary/10 rounded-2xl bg-muted/30">
              <h3 className="font-bold text-foreground mb-2">
                Direct Submissions
              </h3>
              <p className="text-sm">
                When you interact with the <strong>Contact Form</strong> or use
                the dashboard, I collect your name, email address,
                and any specific inquiry data you provide. This data is stored
                securely to facilitate communication.
              </p>
            </div>
            <div className="p-5 border border-primary/10 rounded-2xl bg-muted/30">
              <h3 className="font-bold text-foreground mb-2">
                Authentication Logs
              </h3>
              <p className="text-sm">
                Through **Supabase Auth**, I collect metadata including sign-up
                dates, last login timestamps, and unique user IDs (UUIDs). This
                is necessary to manage your account and protect against
                unauthorized access.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Automated Tracking & Cookies */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold">
              02
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Cookies & Tracking Technologies
            </h2>
          </div>
          <p>
            This website uses cookies and similar storage technologies (like
            LocalStorage) to improve your experience:
          </p>
          <ul className="list-disc pl-6 space-y-3 marker:text-primary">
            <li>
              <strong>Preference Cookies:</strong> To remember your theme
              preference (Dark Mode vs Light Mode).
            </li>
            <li>
              <strong>Session Cookies:</strong> To keep you logged in to the
              dashboard via Supabase.
            </li>
            <li>
              <strong>Analytics:</strong> I may use anonymized IP addresses to
              track site traffic and performance through Vercel Analytics.
            </li>
          </ul>
        </section>

        {/* 3. Legal Basis for Processing */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold">
              03
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Legal Basis for Processing Data
            </h2>
          </div>
          <p>
            I process your personal data under the following legal frameworks:
          </p>
          <div className="space-y-3 bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
            <p>
              <strong>Consent:</strong> When you voluntarily submit a form or
              register an account.
            </p>
            <p>
              <strong>Contractual Necessity:</strong> To provide the specific
              services you requested (e.g., account management).
            </p>
            <p>
              <strong>Legitimate Interests:</strong> To secure the website
              against cyber threats and optimize performance.
            </p>
          </div>
        </section>

        {/* 4. Third-Party Data Disclosures */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold">
              04
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Third-Party Service Providers
            </h2>
          </div>
          <p>
            I do not sell your data. However, certain third-party services are
            essential for the operation of this site:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="py-3 font-bold text-foreground">Service</th>
                  <th className="py-3 font-bold text-foreground">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                <tr>
                  <td className="py-3">Supabase</td>
                  <td className="py-3">
                    Database & Authentication management.
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Vercel</td>
                  <td className="py-3">
                    Hosting, SSL encryption, and Edge functions.
                  </td>
                </tr>
                <tr>
                  <td className="py-3">Resend</td>
                  <td className="py-3">
                    Secure email delivery of contact form submissions.
                  </td>
                </tr>
                <tr>
                  <td className="py-3">GitHub</td>
                  <td className="py-3">
                    Authentication (if using OAuth) and code hosting.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Data Retention Policy */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold">
              05
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Data Retention & Deletion
            </h2>
          </div>
          <p>I keep your information only as long as necessary:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-primary">
            <li>
              <strong>Contact messages:</strong> Retained for 12 months for
              record-keeping purposes.
            </li>
            <li>
              <strong>Account data:</strong> Retained as long as your account is
              active. You may request deletion at any time.
            </li>
            <li>
              <strong>Server logs:</strong> Automatically deleted after 30-90
              days by our hosting providers.
            </li>
          </ul>
        </section>

        {/* 6. International Data Transfers */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold">
              06
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              International Data Transfers
            </h2>
          </div>
          <p>
            Since I use global infrastructure providers like Vercel and
            Supabase, your data may be processed outside of your country of
            residence (e.g., in the United States). By using this site, you
            consent to this international transfer of information.
          </p>
        </section>

        {/* 7. Children's Privacy */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold">
              07
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Children's Privacy (COPPA)
            </h2>
          </div>
          <p>
            This website does not target or knowingly collect data from children
            under the age of 13. If I discover that a child under 13 has
            provided personal information, I will delete it from my servers
            immediately.
          </p>
        </section>

        {/* 8. Your Rights & Access */}
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold">
              08
            </span>
            <h2 className="text-2xl font-bold text-foreground">Your Rights</h2>
          </div>
          <p>Depending on your location, you have the following rights:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none list-inside">
            <li className="flex items-center gap-2">
              ✅ Right to Access your data.
            </li>
            <li className="flex items-center gap-2">
              ✅ Right to Rectify (Correct) data.
            </li>
            <li className="flex items-center gap-2">
              ✅ Right to Erasure (Forget me).
            </li>
            <li className="flex items-center gap-2">
              ✅ Right to Data Portability.
            </li>
          </ul>
        </section>

        {/* Final Contact */}
        <section className="pt-10 border-t border-primary/20">
          <div className="bg-muted p-8 rounded-2xl text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Contact for Privacy Concerns
            </h2>
            <p>
              For any privacy-related requests or data deletion queries, contact
              me directly:😇
            </p>
            <a
              href="mailto:paulatul020@gmail.com"
              className="inline-block text-primary font-bold text-xl hover:scale-105 transition-transform"
            >
              paulatul020@gmail.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
