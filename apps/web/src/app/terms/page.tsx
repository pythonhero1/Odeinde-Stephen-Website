import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service | Oderinde Stephen",
  description:
    "Terms of service, proposal policies, intellectual property ownership, and engagement conditions for Oderinde Stephen web engineering services.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-slate-400 mb-10 pb-6 border-b border-slate-800">
            Last Updated: 23 October 2026 | Effective Date: 23 October 2026
          </p>

          <div className="prose prose-invert prose-blue max-w-none text-sm text-slate-300 space-y-8 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Scope of Terms</h2>
              <p>
                These terms govern the use of <strong>oderindestephen.com</strong> (the &ldquo;Website&rdquo;) and set out the general operational principles under which <strong>Stephen Oderinde</strong> provides web engineering, consulting, and development services (&ldquo;Services&rdquo;).
              </p>
              <p className="mt-2">
                By browsing this site, submitting an enquiry form, or booking a consultation call, you acknowledge and agree to these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Enquiries &amp; Non-Binding Estimates</h2>
              <p>
                All rates, package tiers, and timeline estimates published on this website (such as Starter Foundation from £1,500, Custom Growth from £3,200, or E-commerce Scale from £5,500) are indicative starting figures intended to help clients gauge budget alignment.
              </p>
              <p className="mt-2">
                Submission of a contact enquiry or attendance at a discovery meeting does not constitute a binding contract. A binding client agreement is created solely upon the mutual signature of a formal written statement of work (SOW) or proposal detailing specific deliverables, payment schedules, and project milestones.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Intellectual Property Ownership</h2>
              <p>
                Upon receipt of full payment under a formal client engagement:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li><strong>Client Deliverables:</strong> All custom code, design layouts, written copy, and specific website configurations created specifically for the client transfer entirely to the client.</li>
                <li><strong>Pre-existing Assets &amp; Open Source:</strong> Open source software (such as WordPress, Next.js, React, Tailwind CSS) remains licensed under its respective open source licenses (GPL, MIT). Developer tools, boilerplate libraries, and pre-existing reusable utilities remain the intellectual property of Stephen Oderinde, with the client granted a perpetual, non-exclusive license to use them within the delivered website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Client Responsibilities</h2>
              <p>
                Successful project delivery relies on collaborative communication. Clients agree to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5">
                <li>Provide necessary brand assets, copywriting, credentials, and third-party API keys within agreed project milestone windows.</li>
                <li>Review deliverables and provide consolidated feedback within 5 business days of milestone completion.</li>
                <li>Ensure all materials and content provided do not infringe third-party intellectual property rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Warranties &amp; Limitation of Liability</h2>
              <p>
                All development work is provided with a 30-day post-launch warranty during which any bugs or defects in delivered code are corrected at no additional charge.
              </p>
              <p className="mt-2">
                While every effort is made to adhere to modern performance, accessibility, and SEO best practices, no guarantee is made regarding specific search engine rankings, third-party algorithm updates, or revenue outcomes. In no event shall Stephen Oderinde be liable for indirect, consequential, or lost profit damages arising out of website downtime, third-party provider outages, or client configuration errors. Total aggregate liability is limited to the fees actually paid for the specific service milestone.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Governing Law &amp; Jurisdiction</h2>
              <p>
                These terms and any non-contractual disputes arising out of them are governed by and construed in accordance with the laws of <strong>England and Wales</strong>. The courts of England and Wales have exclusive jurisdiction to settle any disputes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Questions &amp; Notices</h2>
              <p>
                For any questions regarding these terms or formal project proposals, please contact:
              </p>
              <p className="mt-2">
                <strong>Stephen Oderinde</strong><br />
                Email: <a href="mailto:Contact@oderindestephen.com" className="text-blue-400 underline">Contact@oderindestephen.com</a><br />
                Phone: +44 7848 149224<br />
                London, United Kingdom
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
