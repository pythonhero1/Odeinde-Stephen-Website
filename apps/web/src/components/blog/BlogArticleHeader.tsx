import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Clock, Calendar, ArrowLeft, User } from "lucide-react";
import type { BlogPost } from "@/lib/cms/schema";

interface BlogArticleHeaderProps {
  post: BlogPost;
}

export function BlogArticleHeader({ post }: BlogArticleHeaderProps) {
  return (
    <div className="mb-12">
      <Link
        href="/insights"
        className="inline-flex items-center text-xs font-mono text-slate-400 hover:text-blue-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to All Insights
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Badge variant="blue">{post.acf?.article_type || "Practical Guide"}</Badge>
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          {post.acf?.reading_time || "10 min read"}
        </span>
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          {post.acf?.last_reviewed ? `Reviewed ${post.acf.last_reviewed}` : "August 2026"}
        </span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
        {post.title.rendered}
      </h1>

      <div className="flex items-center gap-3 pt-6 border-t border-slate-800">
        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
          OS
        </div>
        <div>
          <span className="text-sm font-bold text-white block">Oderinde Stephen</span>
          <span className="text-xs text-slate-400 font-mono">Website Developer & Digital Solutions Specialist</span>
        </div>
      </div>
    </div>
  );
}
