"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  label: string;
  path: string;
  isExternal?: boolean;
  isCta?: boolean;
}

interface NavbarProps {
  items: NavItem[];
}

export function Navbar({ items }: NavbarProps) {
  const pathname = usePathname();

  // Filter out standalone CTAs (like Book Call) from the pill navigation, which are placed in the header action group
  const navLinks = items.filter((item) => !item.isCta);

  return (
    <nav
      aria-label="Main Navigation"
      className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-brand-surface/75 border border-brand-border/60 backdrop-blur-md shadow-sm"
    >
      {navLinks.map((item) => {
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
              className="px-3.5 py-1.5 rounded-full text-sm font-medium font-heading transition-colors text-brand-muted hover:text-white hover:bg-brand-card/50"
            >
              {item.label}
            </a>
          );
        }

        return (
          <Link
            key={item.path}
            href={item.path}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium font-heading transition-colors ${
              isActive
                ? "text-white bg-brand-card shadow-sm border border-brand-border/40"
                : "text-brand-muted hover:text-white hover:bg-brand-card/50"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
