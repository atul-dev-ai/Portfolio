export default function TermsPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 max-w-3xl pt-32 pb-12 space-y-12">
      {/* Header Section */}
      <div className="space-y-4 border-b border-primary/10 pb-8 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Terms & <span className="text-primary">Conditions</span>
        </h1>
        <p className="text-muted-foreground font-medium">
          Effective Date: February 10, 2026
        </p>
      </div>

      <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
        {/* 1. Agreement to Terms */}
        <section className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              01
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Agreement to Terms
            </h2>
          </div>
          <p>
            By accessing the website at{" "}
            <span className="text-primary">atulpaul.vercel.app</span>, you are
            agreeing to be bound by these terms of service, all applicable laws
            and regulations, and agree that you are responsible for compliance
            with any applicable local laws. If you do not agree with any of
            these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        {/* 2. User Eligibility & Accounts */}
        <section className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              02
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              User Accounts & Registration
            </h2>
          </div>
          <p>
            To access certain features (like project demos or dashboards), you
            may be required to register for an account via **Supabase
            Authentication**.
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-primary">
            <li>
              You must provide accurate and complete information during
              registration.
            </li>
            <li>
              You are solely responsible for the activity that occurs on your
              account.
            </li>
            <li>
              You must notify me immediately of any breach of security or
              unauthorized use of your account.
            </li>
            <li>
              I reserve the right to terminate accounts that violate these terms
              or remain inactive for extended periods.
            </li>
          </ul>
        </section>

        {/* 3. Intellectual Property License */}
        <section className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              03
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Intellectual Property Rights
            </h2>
          </div>
          <p>
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of **Atul Paul**. This
            includes but is not limited to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-6 rounded-xl border border-primary/5">
            <div>
              <h4 className="font-bold text-foreground">Software Projects:</h4>
              <p className="text-sm">
                LifeFlow, Mobile Detector, School Management System, and
                associated source code.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground">Design Assets:</h4>
              <p className="text-sm">
                Custom UI components, Tailwind configurations, and original
                graphic illustrations.
              </p>
            </div>
          </div>
          <p className="text-sm italic">
            Permission is granted to temporarily view the materials for
            personal, non-commercial transitory viewing only. This is the grant
            of a license, not a transfer of title.
          </p>
        </section>

        {/* 4. Use License & Restrictions */}
        <section className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              04
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Prohibited Activities
            </h2>
          </div>
          <p>Under this license, you may not:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-inside list-none">
            <li className="flex items-start gap-2">
              ❌ Modify or copy the materials.
            </li>
            <li className="flex items-start gap-2">
              ❌ Use materials for any commercial purpose.
            </li>
            <li className="flex items-start gap-2">
              ❌ Attempt to decompile any software.
            </li>
            <li className="flex items-start gap-2">
              ❌ Remove any copyright notations.
            </li>
            <li className="flex items-start gap-2">
              ❌ "Mirror" the materials on any other server.
            </li>
            <li className="flex items-start gap-2">
              ❌ Bypass any security measures of the site.
            </li>
          </ul>
        </section>

        {/* 5. Disclaimer of Warranties */}
        <section className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              05
            </span>
            <h2 className="text-2xl font-bold text-foreground">Disclaimer</h2>
          </div>
          <p>
            The materials on this website are provided on an 'as is' basis. I
            make no warranties, expressed or implied, and hereby disclaim and
            negate all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or
            other violation of rights.
          </p>
        </section>

        {/* 6. Limitation of Liability */}
        <section className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              06
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Limitation of Liability
            </h2>
          </div>
          <p>
            In no event shall **Atul Paul** or my suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use the materials on this website, even if I have been
            notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        {/* 7. Modifications and Errata */}
        <section className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              07
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Accuracy of Materials
            </h2>
          </div>
          <p>
            The materials appearing on the website could include technical,
            typographical, or photographic errors. I do not warrant that any of
            the materials on its website are accurate, complete, or current. I
            may make changes to the materials contained on its website at any
            time without notice.
          </p>
        </section>

        {/* 8. Governing Law */}
        <section className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              08
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              Governing Law
            </h2>
          </div>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of **Bangladesh**, and you irrevocably
            submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        {/* Footer Contact */}
        <section className="pt-10 border-t border-primary/20 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Questions about these Terms?
          </h3>
          <p className="mb-4">Feel free to reach out for any clarifications.</p>
          <a
            href="mailto:paulatul020@gmail.com"
            className="text-primary font-bold hover:underline transition-all"
          >
            paulatul020@gmail.com
          </a>
        </section>
      </div>
    </div>
  );
}
