"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[Global Error Boundary caught root crash]:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#07090D] text-[#F3F4F6] font-sans min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#121820] border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 mb-6">
            <AlertTriangle className="w-8 h-8" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Application Exception</h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            A critical system error occurred in the root application layout. Please attempt to reset
            the application.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium text-sm transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Reset Application
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/10"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
