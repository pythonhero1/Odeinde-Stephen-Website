"use client";

import React, { useEffect } from "react";
import Script from "next/script";

const CF_TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Privacy-respecting client analytics integration supporting:
 * 1. Cookieless Cloudflare Web Analytics beacon (zero CWV impact, no consent banner required).
 * 2. Optional Google Analytics 4 with Google Consent Mode v2 default 'denied'.
 */
export function AnalyticsProvider() {
  useEffect(() => {
    // If GA4 is enabled, check existing stored consent in localStorage
    if (GA_ID && typeof window !== "undefined") {
      const storedConsent = localStorage.getItem("os_cookie_consent");
      if (storedConsent === "granted" && (window as unknown as { gtag?: Function }).gtag) {
        (window as unknown as { gtag: Function }).gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "denied",
        });
      }
    }
  }, []);

  return (
    <>
      {/* 1. Cloudflare Web Analytics (Cookieless, GDPR/PECR compliant by design) */}
      {CF_TOKEN && (
        <Script
          strategy="afterInteractive"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${CF_TOKEN}"}`}
        />
      )}

      {/* 2. Google Analytics 4 with Consent Mode v2 (if GA_ID provided) */}
      {GA_ID && (
        <>
          <Script id="google-consent-mode" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'wait_for_update': 500
              });
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
        </>
      )}
    </>
  );
}
