import type { Metadata, Viewport } from "next";
import { Inter, Work_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/cms/api";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { CookieConsentBanner } from "@/components/analytics/CookieConsentBanner";
import { DraftModeBanner } from "@/components/layout/DraftModeBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Website Development & Digital Solutions | Oderinde Stephen",
  description:
    "High-performance headless WordPress and web development for scaling businesses. Bespoke engineering, clean architectures, and proven outcomes.",
  metadataBase: new URL("https://oderindestephen.com"),
};

export const viewport: Viewport = {
  themeColor: "#07090D",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${workSans.variable} ${spaceMono.variable} dark`}
    >
      <body className="bg-brand-bg text-foreground min-h-screen flex flex-col font-sans">
        <SkipLink />
        <AnalyticsProvider />
        <Header
          siteName={settings.siteName}
          bookingUrl={settings.bookingUrl}
          portalUrl={settings.portalUrl}
          navigation={settings.navigation}
        />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer
          copyright={settings.footer.copyright}
          legalLinks={settings.footer.legalLinks}
          bookingUrl={settings.bookingUrl}
          portalUrl={settings.portalUrl}
          socialLinks={settings.socialLinks}
          contactEmail={settings.contactEmail}
          contactPhone={settings.contactPhone}
          contactLocation={settings.contactLocation}
        />
        <DraftModeBanner />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
