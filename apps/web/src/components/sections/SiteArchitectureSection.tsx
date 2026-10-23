import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export function SiteArchitectureSection() {
  const pages = [
    {
      number: "01",
      title: "Homepage",
      role: "Positioning & Routing Hub",
      description: "Communicates the core value proposition, provides proof points, and directs visitors to relevant services and case studies.",
    },
    {
      number: "02",
      title: "Service Pages",
      role: "Offer Detail & Solutions",
      description: "Dedicated deep-dives explaining deliverables, processes, deliverables lists, and who the service is designed for.",
    },
    {
      number: "03",
      title: "About & Trust",
      role: "Credibility & Philosophy",
      description: "Builds human trust by highlighting development standards, principles, platform specialisms, and background experience.",
    },
    {
      number: "04",
      title: "Case Studies & Portfolio",
      role: "Proof & Real Outcomes",
      description: "Demonstrates real client results with before/after stories, technical architectures, and verified testimonial quotes.",
    },
    {
      number: "05",
      title: "Insights & Resources",
      role: "Search Authority & Value",
      description: "Practical guides and self-assessment checklists that capture organic search traffic and educate prospective buyers.",
    },
    {
      number: "06",
      title: "Contact & Booking",
      role: "Conversion & Discovery",
      description: "Provides structured enquiry forms, direct email/phone channels, and real-time strategy call scheduling.",
    },
  ];

  return (
    <section className="py-20 bg-brand-dark/40 border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="ESSENTIAL WEBSITE PAGES"
          title="Essential Business Website Pages and What Each One Should Achieve"
          highlight="What Each One Should Achieve"
          subtitle="A successful website is not a collection of arbitrary pages; each URL serves a specific role in moving prospects from curiosity to conversion."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {pages.map((p, idx) => (
            <Card key={idx} className="p-6 flex flex-col justify-between hover:border-blue-500/30 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono font-extrabold text-blue-500">
                    {p.number}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                    {p.role}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {p.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
