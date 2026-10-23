import React from "react";
import { ArrowRight, Calendar, Mail, ShieldCheck } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

interface ClosingCtaSectionProps {
  title?: string;
  description?: string;
  bookingUrl?: string;
}

export function ClosingCtaSection({
  title = "Ready to Build Something That Works?",
  description = "Let’s turn your business objectives into a high-performance digital system with transparent milestones and verified execution.",
  bookingUrl = "https://cal.com/oderinde/free",
}: ClosingCtaSectionProps) {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-brand-surface/40 border-t border-brand-border">
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none"
      />

      <Container size="default">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-xs font-mono text-brand-accent mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TRANSPARENT SCOPE &bull; GUARANTEED DELIVERY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-heading tracking-tight text-white mb-6 leading-tight">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              href={bookingUrl}
              isExternal
              variant="primary"
              size="lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button href="/contact" variant="secondary" size="lg">
              <Mail className="w-4 h-4" />
              <span>Send Project Enquiry</span>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-brand-muted border-t border-brand-border/40 pt-8">
            <span>&bull; Direct communication</span>
            <span>&bull; Transparent GBP (£) milestone billing</span>
            <span>&bull; Private client portal workspace</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
