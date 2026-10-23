import React from "react";
import { ArrowRight, Calendar, CheckCircle2, Shield, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

interface HeroSectionProps {
  badge?: string;
  headline?: string;
  headlineHighlight?: string;
  subheadline?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryUrl?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryUrl?: string;
}

export function HeroSection({
  badge = "HEADLESS ARCHITECTURE • NEXT.JS • CLOUDFLARE",
  headline = "Website Development & Digital Solutions",
  headlineHighlight = "Digital Solutions",
  subheadline = "High-performance bespoke engineering for businesses that demand speed, security, and scalable architecture.",
  ctaPrimaryLabel = "Book Strategy Call",
  ctaPrimaryUrl = "https://cal.com/oderinde/free",
  ctaSecondaryLabel = "Explore Case Studies",
  ctaSecondaryUrl = "/case-studies",
}: HeroSectionProps) {
  const renderHeadline = () => {
    if (!headlineHighlight || !headline.includes(headlineHighlight)) {
      return (
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-heading tracking-tight text-white mb-6 leading-[1.1]">
          {headline}
        </h1>
      );
    }

    const parts = headline.split(headlineHighlight);
    return (
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-heading tracking-tight text-white mb-6 leading-[1.1]">
        {parts[0]}
        <span className="text-brand-accent">{headlineHighlight}</span>
        {parts.slice(1).join(headlineHighlight)}
      </h1>
    );
  };

  return (
    <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden">
      {/* Subtle ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"
      />

      <Container size="default">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="mb-6 animate-fade-in">
            <Badge variant="blue" className="gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{badge}</span>
            </Badge>
          </div>

          {/* Main H1 */}
          {renderHeadline()}

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-brand-muted max-w-2xl mb-10 leading-relaxed font-sans">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
            <Button
              href={ctaPrimaryUrl}
              isExternal={ctaPrimaryUrl.startsWith("http")}
              variant="primary"
              size="lg"
            >
              <Calendar className="w-4 h-4" />
              <span>{ctaPrimaryLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button href={ctaSecondaryUrl} variant="secondary" size="lg">
              <span>{ctaSecondaryLabel}</span>
            </Button>
          </div>

          {/* Value Proof Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full text-left pt-6 border-t border-brand-border/60">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-surface/40 border border-brand-border/40">
              <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white font-heading">Verified Outcomes</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Real client case studies with 5/5 rated quality and proven delivery.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-surface/40 border border-brand-border/40">
              <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white font-heading">Decoupled Security</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Headless Next.js edge delivery isolating WordPress admin and database.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-surface/40 border border-brand-border/40">
              <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-brand-accent flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white font-heading">Direct Collaboration</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Clear milestone tracking, no agency bloat, and fast execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
