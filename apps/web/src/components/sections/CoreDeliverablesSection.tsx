import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { MessageSquare, Search, PhoneCall, Sliders } from "lucide-react";

export function CoreDeliverablesSection() {
  const pillars = [
    {
      icon: MessageSquare,
      number: "01",
      title: "Communicate Your Services Clearly",
      description: "Structure service offerings with transparent deliverables, target client criteria, and realistic outcomes so prospects immediately know if you are the right fit.",
    },
    {
      icon: Search,
      number: "02",
      title: "Organize Content for Search & Discovery",
      description: "Clean semantic markup, Schema.org structured data, fast loading speeds, and logical URL hierarchies that search engines can easily index and rank.",
    },
    {
      icon: PhoneCall,
      number: "03",
      title: "Guide Visitors Toward Enquiries",
      description: "Strategic contact points, integrated calendar booking, transparent price indications, and a lightweight enquiry form that respects buyer momentum.",
    },
    {
      icon: Sliders,
      number: "04",
      title: "Keep Your Website Easy to Manage",
      description: "Structured ACF fields and intuitive layouts. Add case studies, adjust service descriptions, and publish blog insights without fear of breaking page designs.",
    },
  ];

  return (
    <section className="py-20 bg-brand-dark/50 border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow="HIGH-PERFORMING FOUNDATIONS"
          title="What Goes Into a Professional Business Website That Works?"
          highlight="Website That Works"
          subtitle="Four essential engineering and design pillars required for a website to serve as a genuine business asset."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <Card key={idx} className="p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-mono font-extrabold text-slate-600">
                      {p.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
