"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-brand-surface/90 hover:bg-brand-card border border-brand-border text-brand-muted hover:text-white shadow-xl backdrop-blur transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent min-h-[44px] min-w-[44px] flex items-center justify-center"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
