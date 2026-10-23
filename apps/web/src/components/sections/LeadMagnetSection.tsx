import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FileText, CheckCircle2, ArrowRight } from "lucide-react";

interface LeadMagnetSectionProps {
  bookingUrl?: string;
}

export function LeadMagnetSection({
  bookingUrl = "https://cal.com/oderinde/free",
}: LeadMagnetSectionProps) {
  const checklistItems = [
    "01. Value Proposition clarity check (the 5-second test)",
    "02. Navigation hierarchy & friction audit",
    "03. Call-to-action prominence & multi-device consistency",
    "04. Core service page content structure",
    "05. Social proof & verified testimonial placement",
    "06. Contact form simplicity & conversion barriers",
    "07. Mobile responsiveness & touch target sizing",
    "08. Core Web Vitals & page speed indicators",
    "09. SEO metadata & title tag architecture",
    "10. Content ownership & CMS update ergonomics",
    "11. Analytics & lead intake tracking verification",
    "12. SSL, backups & operational security baselines",
  ];

  return (
    <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <Card className="p-8 sm:p-12 border-blue-500/20 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-blue-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <Badge variant="blue" className="mb-4">
                FREE GROWTH GUIDE
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                The Business Website Growth Checklist
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                12 essential areas to evaluate before building, redesigning, or improving your business website. Discover practical friction points that cost you enquiries.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button asChild variant="primary" size="lg">
                  <Link href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    Discuss Your Website Review <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact?interest=checklist">
                    Request Checklist by Email
                  </Link>
                </Button>
              </div>

              <span className="text-slate-500 text-xs block mt-4">
                No marketing spam. Actionable framework used on live client projects.
              </span>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">12 Essential Areas</span>
                    <span className="text-slate-400 text-xs">Self-Assessment Framework</span>
                  </div>
                </div>

                <ul className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                  {checklistItems.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
