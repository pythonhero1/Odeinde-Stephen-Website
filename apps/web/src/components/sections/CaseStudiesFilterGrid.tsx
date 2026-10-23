"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { CaseStudy } from "@/lib/cms/schema";

interface CaseStudiesFilterGridProps {
  caseStudies: CaseStudy[];
}

export function CaseStudiesFilterGrid({ caseStudies }: CaseStudiesFilterGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "WordPress", "Elementor", "Responsive UX", "Bilingual UX", "On-page SEO", "WooCommerce"];

  const filtered = selectedCategory === "All"
    ? caseStudies
    : caseStudies.filter((cs) => {
        const t1 = cs.acf?.technology_1?.toLowerCase() || "";
        const t2 = cs.acf?.technology_2?.toLowerCase() || "";
        const t3 = cs.acf?.technology_3?.toLowerCase() || "";
        const cat = selectedCategory.toLowerCase();
        return t1.includes(cat) || t2.includes(cat) || t3.includes(cat);
      });

  return (
    <div id="case-study-grid" className="w-full">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((cs) => (
          <Card
            key={cs.id}
            className="flex flex-col justify-between overflow-hidden group hover:border-blue-500/40 transition-all p-0"
          >
            {/* Visual Header / Mockup Banner */}
            <div className="relative h-48 w-full bg-slate-900 border-b border-slate-800 flex items-center justify-center p-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
              
              {cs.acf?.hero_screenshot ? (
                <div className="relative w-full h-full rounded-t-lg overflow-hidden border border-slate-700/60 shadow-xl group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={cs.acf.hero_screenshot}
                    alt={cs.title.rendered}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div className="w-full h-full rounded-t-lg bg-slate-950/80 border border-slate-800/80 p-4 flex flex-col justify-between text-left group-hover:border-blue-500/30 transition-all">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold truncate">
                    {cs.acf?.client_name || cs.title.rendered}
                  </span>
                </div>
              )}
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  {cs.acf?.technology_1 && (
                    <Badge variant="blue" className="text-[10px]">
                      {cs.acf.technology_1}
                    </Badge>
                  )}
                  {cs.acf?.technology_2 && (
                    <Badge variant="default" className="text-[10px]">
                      {cs.acf.technology_2}
                    </Badge>
                  )}
                  {cs.acf?.technology_3 && (
                    <Badge variant="purple" className="text-[10px]">
                      {cs.acf.technology_3}
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2 mb-2">
                  <Link href={`/case-study/${cs.slug}`}>
                    {cs.title.rendered}
                  </Link>
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-6">
                  {cs.excerpt.rendered.replace(/<[^>]*>/g, "")}
                </p>
              </div>

              {/* Verified Outcome Quote */}
              <div className="pt-4 border-t border-slate-800/80">
                {cs.acf?.verified_outcome && (
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 mb-4">
                    <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block mb-1">
                      Verified Outcome
                    </span>
                    <p className="text-slate-300 text-xs italic line-clamp-2">
                      &ldquo;{cs.acf.verified_outcome}&rdquo;
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Link
                    href={`/case-study/${cs.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-all"
                  >
                    Read Deep Dive <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>

                  {cs.acf?.live_url && (
                    <a
                      href={cs.acf.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-slate-300 inline-flex items-center gap-1 font-mono"
                    >
                      Live Site <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
