import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  output: string;
}

interface ProcessStepsSectionProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  steps?: ProcessStep[];
}

const defaultSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover & Clarify",
    subtitle: "Understand Your Business Goals",
    description: "We examine what your business solves, who buys from you, why they hesitate, and what actions matter most.",
    output: "Scope, audience map, core requirements",
  },
  {
    number: "02",
    title: "Plan & Structure",
    subtitle: "Plan the Website Strategy",
    description: "Before designing layouts, we define information architecture, user journeys, content outlines, and technical foundations.",
    output: "Sitemap, wireframes, platform selection",
  },
  {
    number: "03",
    title: "Design & Build",
    subtitle: "Design and Develop Your Website",
    description: "We build modern, accessible responsive layouts in code with fast load times, accessible tokens, and clean CMS integration.",
    output: "Full responsive site, CMS schemas, forms",
  },
  {
    number: "04",
    title: "Launch & Support",
    subtitle: "Launch, Review and Handover",
    description: "Rigorous testing across browsers, forms, emails, and mobile viewports followed by client video training and launch handover.",
    output: "Live website, CMS walkthrough, documentation",
  },
];

export function ProcessStepsSection({
  eyebrow = "HOW I WORK",
  title = "A Clear Website Development Process, From Strategy to Launch",
  highlight = "Strategy to Launch",
  subtitle = "Every project follows a transparent, phased approach so you always know what is being built, what is required from you, and when milestones will be delivered.",
  steps = defaultSteps,
}: ProcessStepsSectionProps) {
  return (
    <section className="py-20 bg-brand-dark/40 border-t border-brand-cardBorder">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          subtitle={subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {steps.map((st, idx) => (
            <Card key={idx} className="p-6 flex flex-col justify-between border-slate-800 hover:border-blue-500/30 transition-all">
              <div>
                <span className="text-3xl font-mono font-extrabold text-blue-500/80 mb-4 block">
                  {st.number}
                </span>
                <h3 className="text-lg font-bold text-white mb-1">{st.title}</h3>
                <span className="text-xs font-mono text-blue-400/90 block mb-3">{st.subtitle}</span>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {st.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">Key Deliverable</span>
                <span className="text-xs font-medium text-slate-200 block">{st.output}</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
