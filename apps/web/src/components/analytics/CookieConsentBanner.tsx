"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Accessible, lightweight cookie preferences banner for optional GA4 tracking.
 * Strictly complies with UK GDPR and PECR regulations.
 */
export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only show banner if GA4 is active and user hasn't made a choice yet
    if (GA_ID) {
      const stored = localStorage.getItem("os_cookie_consent");
      if (!stored) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("os_cookie_consent", "granted");
    if (typeof window !== "undefined" && (window as unknown as { gtag?: Function }).gtag) {
      (window as unknown as { gtag: Function }).gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("os_cookie_consent", "denied");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-brand-card/95 backdrop-blur-md border border-brand-border rounded-xl p-5 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3 mb-3">
        <ShieldCheck className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-white mb-1">
            Cookie &amp; Privacy Preferences
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            I use lightweight, aggregated analytics to understand how visitors interact with
            engineering guides and project services. You can accept or decline optional cookies.{" "}
            <Link
              href="/privacy-policy"
              className="text-brand-accent hover:underline focus:outline-none focus:ring-1 focus:ring-brand-accent rounded"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <button
          onClick={handleDecline}
          aria-label="Close cookie banner and decline optional cookies"
          className="text-slate-400 hover:text-white p-1 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
        <button
          onClick={handleDecline}
          className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400"
        >
          Decline Optional
        </button>
        <button
          onClick={handleAccept}
          className="text-xs font-mono font-medium text-white bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Accept Analytics
        </button>
      </div>
    </aside>
  );
}
