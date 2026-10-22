import type { Metadata, Viewport } from "next";
import { Inter, Work_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${workSans.variable} ${spaceMono.variable} dark`}
    >
      <body className="bg-brand-bg text-foreground min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
