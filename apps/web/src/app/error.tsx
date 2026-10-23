"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, Mail, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DEFAULT_SITE_SETTINGS } from "@/lib/cms/cache";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected errors for operational diagnostics
    console.error("[Application Error Boundary caught error]:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-6 shadow-inner">
          <AlertTriangle className="w-8 h-8" aria-hidden="true" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-heading">
          Temporary System Glitch
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
          We encountered an unexpected error while rendering this page. Our headless architecture
          has captured this state. You can try refreshing the component or return to the main site.
        </p>

        {error?.digest && (
          <p className="text-xs font-mono text-slate-500 mb-6 bg-brand-surface/50 py-1.5 px-3 rounded border border-white/5 inline-block">
            Digest: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button onClick={() => reset()} variant="primary" size="lg">
            <RefreshCw className="w-4 h-4 mr-2" /> Try Again
          </Button>
          <Button href="/" variant="outline" size="lg">
            <Home className="w-4 h-4 mr-2" /> Return to Homepage
          </Button>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <span>Need immediate assistance?</span>
          <Link
            href="/contact"
            className="text-brand-accent hover:underline inline-flex items-center"
          >
            <Mail className="w-4 h-4 mr-1.5" /> Contact Support
          </Link>
          <a
            href={DEFAULT_SITE_SETTINGS.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-accent hover:underline inline-flex items-center"
          >
            <Calendar className="w-4 h-4 mr-1.5" /> Book a Call
          </a>
        </div>
      </Container>
    </div>
  );
}
