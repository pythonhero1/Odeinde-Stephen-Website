import React from "react";
import Link from "next/link";
import { ExternalLink, Calendar, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { Container } from "../ui/Container";
import { BackToTop } from "./BackToTop";

interface LegalLink {
  label: string;
  path: string;
}

interface SocialLinks {
  linkedin?: string;
  clutch?: string;
  trustpilot?: string;
  googleBusiness?: string;
}

interface FooterProps {
  copyright: string;
  legalLinks: LegalLink[];
  bookingUrl: string;
  portalUrl: string;
  socialLinks?: SocialLinks;
  contactEmail?: string;
  contactPhone?: string;
  contactLocation?: string;
}

export function Footer({
  copyright,
  legalLinks,
  bookingUrl,
  portalUrl,
  socialLinks,
  contactEmail = "Contact@oderindestephen.com",
  contactPhone = "+44 7848 149224",
  contactLocation = "London, United Kingdom & Worldwide Remote",
}: FooterProps) {
  return (
    <footer className="w-full bg-[#07090D] border-t border-brand-border/80 pt-16 sm:pt-20 pb-12 mt-auto">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-16 border-b border-brand-border/60">
          {/* Column 1: Brand & Profile (5 of 12 columns) */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
            <Link
              href="/"
              className="flex items-center gap-3 mb-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent py-1"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-accent flex items-center justify-center text-white font-bold font-mono text-base shadow-md">
                OS
              </div>
              <div>
                <span className="font-bold font-heading text-white text-lg tracking-tight block">
                  ODERINDE STEPHEN
                </span>
                <span className="text-[10px] font-mono text-brand-accent tracking-widest uppercase block">
                  CMS DEVELOPER &bull; WEBSITE SYSTEMS
                </span>
              </div>
            </Link>

            <p className="text-sm text-brand-footerMuted max-w-sm mb-4 leading-relaxed">
              High-performance headless WordPress, Next.js, and bespoke digital systems built around clear business goals, stronger customer journeys, and scalable architectures.
            </p>

            <div className="text-xs text-brand-footerMuted space-y-1 mb-6">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <span>{contactLocation}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <a href={`tel:${contactPhone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                  {contactPhone}
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
                  {contactEmail}
                </a>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-accentHover hover:bg-blue-700 text-white font-medium text-xs font-heading transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Call</span>
              </a>

              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-surface hover:bg-brand-card border border-brand-border text-foreground font-medium text-xs font-heading transition-colors"
              >
                <span>Client Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-brand-muted" />
              </a>
            </div>
          </div>

          {/* Column 2: Website Services (2 of 12 columns) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Website Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/business-website-solutions"
                  className="text-brand-muted hover:text-white transition-colors"
                >
                  Website Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/business-website-development"
                  className="text-brand-muted hover:text-white transition-colors"
                >
                  Custom Development
                </Link>
              </li>
              <li>
                <Link
                  href="/e-commerce-development"
                  className="text-brand-muted hover:text-white transition-colors"
                >
                  E-Commerce Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-brand-muted hover:text-white transition-colors"
                >
                  Transparent Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Work & Insights (2 of 12 columns) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Work &amp; Insights
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/case-studies"
                  className="text-brand-muted hover:text-white transition-colors"
                >
                  Case Studies (6)
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-brand-muted hover:text-white transition-colors"
                >
                  Live Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/case-study/pipe-patch-pro-amazon-listing-website"
                  className="text-brand-muted hover:text-white transition-colors"
                >
                  Pipe Patch Pro
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-brand-muted hover:text-white transition-colors"
                >
                  Engineering Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Verification (3 of 12 columns) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Enquiry &amp; Verification
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-brand-accent hover:text-blue-400 font-medium transition-colors"
                >
                  Direct Project Enquiry &rarr;
                </Link>
              </li>
              {socialLinks?.googleBusiness && (
                <li>
                  <a
                    href={socialLinks.googleBusiness}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-muted hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Google Business Profile <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              )}
              {socialLinks?.trustpilot && (
                <li>
                  <a
                    href={socialLinks.trustpilot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-muted hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Trustpilot Reviews <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              )}
              <li className="pt-2">
                <span className="text-xs font-mono text-brand-muted block">
                  Stack: WordPress REST &bull; Next.js 15 &bull; Tailwind &bull; Cloudflare
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <div>
            <p>{copyright}</p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {socialLinks?.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </Container>

      {/* Floating Back to Top Button */}
      <BackToTop />
    </footer>
  );
}
