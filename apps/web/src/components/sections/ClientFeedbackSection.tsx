import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  platform: string;
  projectType: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Perfekte Lieferung! Vielen Dank! The finished portfolio was clean, fast, and structured so I could easily keep adding voice-over samples myself.",
    author: "Agentur Ostwest",
    role: "Voice-over Agency Owner",
    company: "Agentur Ostwest",
    platform: "Fiverr Verified 5.0/5.0",
    projectType: "WordPress Portfolio & Redesign",
  },
  {
    quote: "The final result was stable and solid after a complex bilingual launch. Stephen navigated changing requirements without delaying our investor deadlines.",
    author: "BORN Accelerators",
    role: "Managing Director",
    company: "BORN Accelerator Network",
    platform: "Fiverr Verified 5.0/5.0",
    projectType: "Bilingual Accelerator Platform",
  },
  {
    quote: "I hired you for a second, larger 11-page website after seeing that your work on Bau-Helden matched what I needed. Responsive design and on-page SEO were handled seamlessly.",
    author: "Baumgärtner Security",
    role: "Business Owner",
    company: "Einbruchschutz Baumgärtner",
    platform: "Repeat Client Verification",
    projectType: "11-Page Security Service Rebuild",
  },
];

export function ClientFeedbackSection() {
  return (
    <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="VERIFIED CLIENT FEEDBACK"
          title="Trusted by Businesses Building Their Next Digital Step"
          highlight="Their Next Digital Step"
          subtitle="Genuine client feedback verified across Fiverr Pro, Repeat Client engagements, and independent business reviews."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="p-8 flex flex-col justify-between border-slate-800 bg-slate-900/60 hover:border-blue-500/30 transition-all">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-mono text-slate-400 ml-2">5.0</span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-bold text-sm">{t.author}</span>
                  <Badge variant="blue" className="text-[10px]">
                    {t.platform}
                  </Badge>
                </div>
                <span className="text-slate-400 text-xs block">{t.role}</span>
                <span className="text-blue-400/90 font-mono text-[11px] block mt-1">
                  Project: {t.projectType}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Platform Verification Bar */}
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-wrap items-center justify-around gap-6 text-center">
          <div className="flex items-center gap-3">
            <Image src="/images/clutch-review-platform-icon.png" alt="" aria-hidden="true" width={32} height={32} className="object-contain" />
            <div className="text-left">
              <span className="text-white font-bold text-xs block">Clutch</span>
              <span className="text-slate-500 text-[11px]">Verified Reviews</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Image src="/images/trustpilot-review-platform-icon.png" alt="" aria-hidden="true" width={32} height={32} className="object-contain" />
            <div className="text-left">
              <span className="text-white font-bold text-xs block">Trustpilot</span>
              <span className="text-slate-500 text-[11px]">5-Star Customer Rating</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Image src="/images/google-reviews-icon.png" alt="" aria-hidden="true" width={32} height={32} className="object-contain" />
            <div className="text-left">
              <span className="text-white font-bold text-xs block">Google Business</span>
              <span className="text-slate-500 text-[11px]">London Profile</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Image src="/images/g2-review-platform-icon.png" alt="" aria-hidden="true" width={32} height={32} className="object-contain" />
            <div className="text-left">
              <span className="text-white font-bold text-xs block">G2</span>
              <span className="text-slate-500 text-[11px]">High Performer Rating</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
