import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function AboutStephenSection() {
  const principles = [
    {
      number: "01",
      title: "Clarity Before Code",
      description: "If visitors do not understand what you do in the first 5 seconds, design cannot save the website. I start with positioning and message structure.",
    },
    {
      number: "02",
      title: "Conversion-Focused Architecture",
      description: "Every page needs a clear job to do. I eliminate dead-ends and design intuitive paths that guide interested visitors toward qualified enquiries.",
    },
    {
      number: "03",
      title: "Long-Term Scalability",
      description: "You should not have to hire an engineer for routine text edits. I build clean, structured CMS experiences that make content updates effortless.",
    },
  ];

  return (
    <section className="py-20 bg-brand-bg border-t border-brand-cardBorder">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 sm:w-80 aspect-square rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
              <Image
                src="/images/oderinde-stephen-cms-developer-portrait-picture.avif"
                alt="Oderinde Stephen - Website Developer & Digital Solutions Specialist"
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-white font-bold text-sm block">Oderinde Stephen</span>
                <span className="text-blue-400 font-mono text-xs block">Website & Digital Systems Developer</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <Badge variant="blue">London Base</Badge>
              <Badge variant="green">Worldwide Remote</Badge>
              <Badge variant="purple">Direct Collaboration</Badge>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
              GET TO KNOW ABOUT ME
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
              I am Stephen, a Website Developer Focused on Business Growth
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              I help business owners, service firms, and growing brands turn their websites into dependable client-generation engines. Instead of generic templates, I build custom web systems that combine clear value proposition, accessible responsive design, and dependable CMS engineering.
            </p>

            <div className="space-y-6 mb-10">
              {principles.map((pr, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                    {pr.number}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base mb-1">{pr.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{pr.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button asChild variant="primary" size="lg">
                <Link href="/business-website-solutions">
                  Explore Solutions <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/case-studies">
                  View Selected Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
