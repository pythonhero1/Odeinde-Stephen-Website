import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/cms/schema";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="p-6 flex flex-col justify-between group hover:border-blue-500/40 transition-all">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge variant="blue" className="text-[10px]">
            {post.acf?.article_type || "Practical Guide"}
          </Badge>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.acf?.reading_time || "5 min read"}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2 mb-3">
          <Link href={`/insights/${post.slug}`}>
            {post.title.rendered}
          </Link>
        </h3>

        <div
          className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-6"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-500">
          {post.acf?.review_status || "Current & Reviewed"}
        </span>
        <Link
          href={`/insights/${post.slug}`}
          className="text-xs font-semibold text-blue-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          Read Article <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </Card>
  );
}
