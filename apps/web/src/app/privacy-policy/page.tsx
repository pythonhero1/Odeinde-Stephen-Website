import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | Oderinde Stephen",
  description:
    "UK GDPR compliant Privacy Policy for Oderinde Stephen website development and digital solutions consulting.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-20 flex-1">
      <Container size="default">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-mono text-slate-400 hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Home
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">
              LEGAL &amp; COMPLIANCE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-slate-400 mb-10 pb-6 border-b border-slate-800">
            Last Updated: 23 October 2026 | Effective Date: 23 October 2026
          </p>

          <div className="prose prose-invert prose-blue max-w-none text-sm text-slate-300 space-y-8 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Data Controller Information</h2>
              <p>
                This website (<strong>oderindestephen.com</strong>) is operated by <strong>Stephen Oderinde</strong>, an independent website developer and digital solutions consultant based in London, United Kingdom (&ldquo;I&rdquo;, &ldquo;me&rdquo;, or &ldquo;my&rdquo;).
              </p>
              <p className="mt-2">
                For the purposes of the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018, I act as the data controller for any personal information you provide directly through this website.
              </p>
              <p className="mt-2">
                <strong>Contact Email:</strong> <a href="mailto:Contact@oderindestephen.com" className="text-blue-400 underline">Contact@oderindestephen.com</a><br />
                <strong>Direct Phone:</strong> +44 7848 149224<br />
                <strong>Location:</strong> London, United Kingdom
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Information Collected</h2>
              <p>
                I collect only the minimum personal data necessary to evaluate, scope, and communicate regarding potential web engineering and consulting engagements:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li><strong>Enquiry &amp; Contact Details:</strong> Full name, business email address, phone number (optional), company name, current website URL, project budget band, and project requirements submitted via the project enquiry form.</li>
                <li><strong>Meeting Bookings:</strong> Name, email address, and meeting notes submitted via Cal.com scheduling.</li>
                <li><strong>Technical Telemetry:</strong> Standard server logs, IP addresses, browser types, and access timestamps collected automatically by infrastructure providers to prevent abuse and ensure security.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Lawful Basis for Processing</h2>
              <p>
                I process personal information under the following lawful bases under UK GDPR Article 6:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li><strong>Contract / Pre-contractual steps (Article 6(1)(b)):</strong> To review your project enquiry, produce technical proposals, communicate timelines, and deliver agreed web engineering services.</li>
                <li><strong>Legitimate Interests (Article 6(1)(f)):</strong> To safeguard infrastructure integrity, prevent spam or fraudulent submissions, and maintain business records.</li>
                <li><strong>Consent (Article 6(1)(a)):</strong> Where explicitly requested, for direct newsletter updates or lead magnet downloads (you may withdraw consent at any time).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Subprocessors &amp; Service Providers</h2>
              <p>
                Your personal data is never sold, leased, or traded to third parties. Limited technical data may be processed by trusted infrastructure subprocessors under strict data protection terms:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li><strong>Cloudflare Inc.:</strong> Edge DNS, SSL termination, DDoS protection, and global caching.</li>
                <li><strong>Cal.com:</strong> Self-hosted/managed calendar scheduling for video discovery consultations.</li>
                <li><strong>Spantrix / Hosting Provider:</strong> Secure server hosting and transactional email transport.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Data Retention</h2>
              <p>
                Enquiry submissions that do not result in a commercial engagement are retained for a maximum of 12 months for administrative reference and then permanently deleted. Data relating to active clients and contracts is retained for 6 years in accordance with UK statutory accounting and tax obligations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Your Rights Under UK GDPR</h2>
              <p>
                You have statutory rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>The right to request access to your personal data.</li>
                <li>The right to request rectification of inaccurate data.</li>
                <li>The right to request erasure (&ldquo;right to be forgotten&rdquo;).</li>
                <li>The right to restrict or object to processing.</li>
                <li>The right to lodge a complaint with the UK Information Commissioner&rsquo;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">ico.org.uk</a>.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, email <a href="mailto:Contact@oderindestephen.com" className="text-blue-400 underline">Contact@oderindestephen.com</a> with your request.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Cookies &amp; Tracking</h2>
              <p>
                This website uses essential session and security cookies necessary for secure navigation and form submission. We do not use third-party behavioral advertising or invasive tracking pixels.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
