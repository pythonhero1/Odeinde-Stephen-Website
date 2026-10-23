"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, ExternalLink } from "lucide-react";
import type { NavItem } from "./Navbar";

interface MobileNavProps {
  items: NavItem[];
  bookingUrl: string;
  portalUrl: string;
}

export function MobileNav({ items, bookingUrl, portalUrl }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle ESC key and focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }

      // Trap focus within drawer
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Focus first element in drawer
    const timer = setTimeout(() => {
      const first = drawerRef.current?.querySelector<HTMLElement>(
        'button, [href], input'
      );
      first?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open mobile navigation menu"
        aria-expanded={isOpen}
        className="p-2.5 rounded-lg text-white hover:bg-brand-surface border border-brand-border/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-brand-bg border-l border-brand-border p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-brand-border">
                <span className="text-base font-bold font-heading text-white">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-lg text-brand-muted hover:text-white hover:bg-brand-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                {items.map((item) => {
                  const isActive =
                    item.path === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.path);

                  if (item.isExternal) {
                    return (
                      <a
                        key={item.path}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium font-heading text-brand-muted hover:text-white hover:bg-brand-surface transition-colors min-h-[44px]"
                      >
                        <span>{item.label}</span>
                        <ExternalLink className="w-4 h-4 opacity-70" />
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium font-heading transition-colors min-h-[44px] ${
                        isActive
                          ? "bg-brand-surface text-white border border-brand-border/60"
                          : "text-brand-muted hover:text-white hover:bg-brand-surface"
                      }`}
                    >
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-brand-border flex flex-col gap-3">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-brand-accentHover hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-md min-h-[44px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Strategy Call</span>
              </a>

              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-brand-card hover:bg-brand-surface border border-brand-border text-foreground font-medium text-sm transition-colors min-h-[44px]"
              >
                <span>Client Portal</span>
                <ExternalLink className="w-4 h-4 text-brand-muted" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
