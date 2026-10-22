import Link from "next/link";
import { ArrowRight, CheckCircle2, Calendar, Shield } from "lucide-react";
import { DEFAULT_SITE_SETTINGS } from "@/lib/cms/cache";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center px-4 py-16 text-center max-w-5xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-surface border border-brand-border text-xs text-brand-muted mb-8">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Headless Architecture &bull; Next.js &bull; Cloudflare Pages</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-bold font-heading tracking-tight text-white mb-6">
        Website Development &amp;{" "}
        <span className="text-brand-accent">Digital Solutions</span>
      </h1>

      <p className="text-lg sm:text-xl text-brand-muted max-w-2xl mb-10 leading-relaxed">
        High-performance bespoke engineering for businesses that demand speed,
        security, and scalable architecture.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <a
          href={DEFAULT_SITE_SETTINGS.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-brand-accent hover:bg-brand-accentHover text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Strategy Call</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        <Link
          href="/case-studies"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-brand-surface hover:bg-brand-card border border-brand-border text-white font-medium text-sm transition-colors"
        >
          <span>Explore Case Studies</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
        <div className="p-6 rounded-xl bg-brand-surface/60 border border-brand-border backdrop-blur">
          <div className="w-10 h-10 rounded-lg bg-brand-card flex items-center justify-center mb-4 text-brand-accent">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-white mb-2">Verified Outcomes</h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            Data-driven case studies with real client performance outcomes and measurable business metrics.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-brand-surface/60 border border-brand-border backdrop-blur">
          <div className="w-10 h-10 rounded-lg bg-brand-card flex items-center justify-center mb-4 text-brand-accent">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-white mb-2">Enterprise Security</h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            Decoupled headless WordPress CMS on Spantrix with edge delivery via Cloudflare Pages.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-brand-surface/60 border border-brand-border backdrop-blur">
          <div className="w-10 h-10 rounded-lg bg-brand-card flex items-center justify-center mb-4 text-brand-accent">
            <Calendar className="w-5 h-5" />
          </div>
          <h2 className="text-base font-semibold text-white mb-2">Direct Booking</h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            Integrated consultation scheduling configured with zero friction and instant calendar confirmation.
          </p>
        </div>
      </div>
    </main>
  );
}
