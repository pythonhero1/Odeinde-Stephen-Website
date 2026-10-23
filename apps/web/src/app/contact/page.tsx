import type { Metadata } from "next";
import { Mail, Calendar, Clock, ShieldCheck, MapPin, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/cms/api";
import { constructPageMetadata } from "@/lib/seo/metadata";
import { getRankMathSeo } from "@/lib/seo/rankmath";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactChannelsGrid } from "@/components/contact/ContactChannelsGrid";
import { PostEnquiryTimeline } from "@/components/contact/PostEnquiryTimeline";
import { GlobalDeliverySection } from "@/components/contact/GlobalDeliverySection";

export async function generateMetadata(): Promise<Metadata> {
  return constructPageMetadata("/contact");
}

export default async function ContactPage() {
  const [settings, seo] = await Promise.all([
    getSiteSettings(),
    getRankMathSeo("/contact"),
  ]);

  return (
    <div className="py-12 sm:py-20 flex-1">
      <JsonLd nodes={seo.jsonLd} />
      <Container size="default">
        <SectionHeading
          eyebrow="DIRECT COMMUNICATION"
          badgeVariant="blue"
          title="Start Your Website Project"
          highlight="Your Website Project"
          subtitle="Let’s review your business objectives, technical scope, and project timeline. Fill in the form below, book a call, or contact me through any channel."
        />

        {/* Multi-channel contact cards */}
        <ContactChannelsGrid
          bookingUrl={settings.bookingUrl}
          email={settings.contactEmail}
          phone={settings.contactPhone}
          location={settings.contactLocation}
        />

        {/* Main form and direct context section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start my-12">
          {/* Left Column: Direct Context & Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-brand-surface/60 border border-brand-border space-y-6">
              <h2 className="text-xl font-bold font-heading text-white">
                Direct Contact &amp; Details
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950/80 text-brand-accent flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-brand-muted block">Direct Email</span>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-sm font-semibold text-white hover:text-brand-accent transition-colors"
                    >
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                {settings.contactPhone && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/80 text-brand-accent flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-brand-muted block">Phone & WhatsApp</span>
                      <a
                        href={`tel:${settings.contactPhone.replace(/\s+/g, "")}`}
                        className="text-sm font-semibold text-white hover:text-brand-accent transition-colors"
                      >
                        {settings.contactPhone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950/80 text-brand-accent flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-brand-muted block">Instant Booking</span>
                    <a
                      href={settings.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brand-accent hover:underline inline-flex items-center gap-1"
                    >
                      <span>Book on Cal.com &rarr;</span>
                    </a>
                  </div>
                </div>

                {settings.contactLocation && (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/80 text-brand-accent flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-brand-muted block">Location</span>
                      <span className="text-sm text-foreground/90 font-medium">
                        {settings.contactLocation}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950/80 text-brand-accent flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-brand-muted block">Response Window</span>
                    <span className="text-sm text-foreground/90 font-medium">
                      Within 24 business hours
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-border/60">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-muted">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No spam. Zero sales calls from juniors. Direct engineering communication.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 7-Field Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm bookingUrl={settings.bookingUrl} />
          </div>
        </div>

        {/* Post-enquiry process steps */}
        <PostEnquiryTimeline />

        {/* Global delivery and timezone notice */}
        <GlobalDeliverySection />
      </Container>
    </div>
  );
}
