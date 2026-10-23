import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowLeft, ArrowRight, Compass, Home, Layers, Mail, Calendar } from "lucide-react";
import { DEFAULT_SITE_SETTINGS } from "@/lib/cms/cache";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Oderinde Stephen",
  description: "The requested page could not be found or has moved during our headless migration.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const recoveryLinks = [
    {
      title: "Explore Case Studies",
      description: "Real-world engineering systems, B2B redesigns, and verified client outcomes.",
      path: "/case-studies",
      icon: Layers,
    },
    {
      title: "Business Solutions",
      description: "Diagnostic architectures and platform-flexible web strategies.",
      path: "/business-website-solutions",
      icon: Compass,
    },
    {
      title: "Direct Project Contact",
      description: "Send a scope outline or discuss your technical timeline directly.",
      path: "/contact",
      icon: Mail,
    },
  ];

  return (
    <div className="py-20 sm:py-28 flex-1 flex flex-col justify-center bg-brand-bg relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <Container size="default" className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <Badge variant="blue" className="mb-6">
            404 • PAGE NOT FOUND
          </Badge>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-heading">
            Lost in the Digital Architecture?
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10">
            The page you requested may have moved during our headless WordPress migration,
            or the URL might be mistyped. Let&apos;s get you back to working digital systems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Button href="/" variant="primary" size="lg">
              <Home className="w-4 h-4 mr-2" /> Return to Homepage
            </Button>
            <Button
              href={DEFAULT_SITE_SETTINGS.bookingUrl}
              isExternal
              variant="outline"
              size="lg"
            >
              <Calendar className="w-4 h-4 mr-2" /> Book Strategy Call
            </Button>
          </div>

          <div className="text-left">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 text-center">
              HELPFUL RECOVERY DESTINATIONS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recoveryLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} href={item.path} className="group block">
                    <Card className="h-full p-4 bg-brand-card/80 border-brand-border hover:border-brand-accent/50 transition-all duration-200">
                      <Icon className="w-5 h-5 text-brand-accent mb-2 group-hover:scale-110 transition-transform" />
                      <h2 className="text-sm font-semibold text-white group-hover:text-brand-accent transition-colors mb-1">
                        {item.title}
                      </h2>
                      <p className="text-xs text-slate-400 leading-snug">
                        {item.description}
                      </p>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
