import React from "react";
import { HeroSection } from "./HeroSection";
import { TrustBarSection } from "./TrustBarSection";
import { ServicesSlice } from "./ServicesSlice";
import { CaseStudiesSlice } from "./CaseStudiesSlice";
import { InteractivePortalSection } from "./InteractivePortalSection";
import { FaqSection } from "./FaqSection";
import { ClosingCtaSection } from "./ClosingCtaSection";
import { ConnectedSolutionsSection } from "./ConnectedSolutionsSection";
import { TechnologyStackSection } from "./TechnologyStackSection";
import { AboutStephenSection } from "./AboutStephenSection";
import { ProcessStepsSection } from "./ProcessStepsSection";
import { LeadMagnetSection } from "./LeadMagnetSection";
import { PricingTeaserSection } from "./PricingTeaserSection";
import { InsightsTeaserSection } from "./InsightsTeaserSection";
import { PricingPackagesGrid } from "./PricingPackagesGrid";
import { ClientFeedbackSection } from "./ClientFeedbackSection";
import { DiagnosticRouterSection } from "./DiagnosticRouterSection";
import { PlatformPhilosophySection } from "./PlatformPhilosophySection";
import type { CaseStudy, BlogPost } from "@/lib/cms/schema";

interface SectionRendererProps {
  sections?: Record<string, any>[];
  caseStudies?: CaseStudy[];
  posts?: BlogPost[];
  bookingUrl?: string;
}

export function SectionRenderer({
  sections = [],
  caseStudies = [],
  posts = [],
  bookingUrl = "https://cal.com/oderinde/free",
}: SectionRendererProps) {
  // If ACF sections are configured, dynamically map them
  if (Array.isArray(sections) && sections.length > 0) {
    return (
      <div className="flex flex-col w-full">
        {sections.map((section, index) => {
          const layout = section.acf_fc_layout;

          switch (layout) {
            case "hero":
              return (
                <HeroSection
                  key={`hero-${index}`}
                  badge={section.badge}
                  headline={section.headline}
                  headlineHighlight={section.headline_highlight}
                  subheadline={section.subheadline}
                  ctaPrimaryLabel={section.cta_primary_label}
                  ctaPrimaryUrl={section.cta_primary_url || bookingUrl}
                  ctaSecondaryLabel={section.cta_secondary_label}
                  ctaSecondaryUrl={section.cta_secondary_url}
                />
              );
            case "trust_bar":
              return <TrustBarSection key={`trust-${index}`} />;
            case "connected_solutions":
              return <ConnectedSolutionsSection key={`solutions-${index}`} />;
            case "system_pillars":
            case "services_grid":
              return <ServicesSlice key={`services-${index}`} />;
            case "technology_stack":
              return <TechnologyStackSection key={`tech-${index}`} />;
            case "about_stephen":
              return <AboutStephenSection key={`about-${index}`} />;
            case "process_steps":
              return <ProcessStepsSection key={`process-${index}`} />;
            case "case_studies_grid":
              return (
                <CaseStudiesSlice
                  key={`cs-${index}`}
                  caseStudies={caseStudies}
                  limit={section.limit || 6}
                />
              );
            case "interactive_portal":
              return <InteractivePortalSection key={`portal-${index}`} />;
            case "lead_magnet":
              return <LeadMagnetSection key={`lm-${index}`} bookingUrl={bookingUrl} />;
            case "pricing_teaser":
              return <PricingTeaserSection key={`pt-${index}`} />;
            case "pricing_packages":
              return <PricingPackagesGrid key={`pkg-${index}`} />;
            case "testimonials_grid":
              return <ClientFeedbackSection key={`tst-${index}`} />;
            case "problem_paths":
              return <DiagnosticRouterSection key={`paths-${index}`} />;
            case "platform_comparison":
              return <PlatformPhilosophySection key={`plat-${index}`} />;
            case "blog_insights_grid":
              return <InsightsTeaserSection key={`insights-${index}`} posts={posts} />;
            case "faq_section":
              return (
                <FaqSection
                  key={`faq-${index}`}
                  title={section.title}
                  items={section.items}
                />
              );
            case "closing_cta":
              return (
                <ClosingCtaSection
                  key={`ccta-${index}`}
                  title={section.title}
                  description={section.description}
                  bookingUrl={section.button_url || bookingUrl}
                />
              );
            default:
              console.warn(`[SectionRenderer] Unrecognized layout: ${layout}`);
              return null;
          }
        })}
      </div>
    );
  }

  // Resilient Canonical Fallback: Renders complete homepage sequence if acf.sections is not yet populated
  return (
    <div className="flex flex-col w-full">
      <HeroSection
        ctaPrimaryUrl={bookingUrl}
      />
      <TrustBarSection />
      <ConnectedSolutionsSection />
      <ServicesSlice />
      <TechnologyStackSection />
      <AboutStephenSection />
      <ProcessStepsSection />
      <CaseStudiesSlice caseStudies={caseStudies} limit={3} />
      <InteractivePortalSection />
      <LeadMagnetSection bookingUrl={bookingUrl} />
      <PricingTeaserSection />
      <InsightsTeaserSection posts={posts} />
      <FaqSection />
      <ClosingCtaSection bookingUrl={bookingUrl} />
    </div>
  );
}
