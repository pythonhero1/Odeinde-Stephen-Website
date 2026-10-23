import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { Navbar, type NavItem } from "./Navbar";
import { MobileNav } from "./MobileNav";
import { Container } from "../ui/Container";

interface HeaderProps {
  siteName?: string;
  bookingUrl: string;
  portalUrl: string;
  navigation: NavItem[];
}

export function Header({
  siteName = "Oderinde Stephen",
  bookingUrl,
  portalUrl,
  navigation,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-brand-bg/85 backdrop-blur-md border-b border-brand-border/60 transition-all">
      <Container size="wide">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg py-1 px-1.5"
            aria-label={`${siteName} Homepage`}
          >
            <div className="w-9 h-9 rounded-lg bg-brand-accent flex items-center justify-center text-white font-bold font-mono text-base shadow-md shadow-blue-600/30">
              OS
            </div>
            <div className="flex flex-col">
              <span className="font-bold font-heading text-white text-base tracking-tight leading-tight">
                {siteName}
              </span>
              <span className="text-[11px] font-mono text-brand-muted tracking-wide uppercase leading-tight">
                Digital Systems
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Pill */}
          <Navbar items={navigation} />

          {/* Right: Actions & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop Client Portal Button */}
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-card hover:bg-brand-surface border border-brand-border text-foreground font-medium text-xs font-heading transition-colors"
            >
              <span>Client Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-muted" />
            </a>

            {/* Desktop Primary CTA: Book a Call */}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-accentHover hover:bg-blue-700 text-white font-medium text-xs font-heading transition-colors shadow-md shadow-blue-600/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Navigation Drawer Trigger */}
            <MobileNav
              items={navigation}
              bookingUrl={bookingUrl}
              portalUrl={portalUrl}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
