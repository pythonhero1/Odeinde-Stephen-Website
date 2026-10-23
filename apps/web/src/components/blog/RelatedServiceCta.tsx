import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

interface RelatedServiceCtaProps {
  title?: string;
  description?: string;
  url?: string;
  bookingUrl?: string;
}

export function RelatedServiceCta({
  title = "Business Website Development",
  description = "Build a custom WordPress or Next.js website structured around clear messaging, fast mobile loading, and long-term business growth.",
  url = "/business-website-development",
  bookingUrl = "https://cal.com/oderinde/free",
}: RelatedServiceCtaProps) {
  return (
    <Card className="my-12 p-8 border-blue-500/30 bg-gradient-to-br from-blue-950/20 via-slate-900 to-slate-900">
      <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase font-bold tracking-wider mb-2">
        <Sparkles className="w-4 h-4" /> Related Service Solution
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-300 text-sm leading-relaxed mb-6">
        {description}
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <Button asChild variant="primary" size="md">
          <Link href={url}>
            Explore Service Scope <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="md">
          <Link href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Book a Strategy Call
          </Link>
        </Button>
      </div>
    </Card>
  );
}
