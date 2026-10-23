import React from "react";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  eyebrow?: string;
  badgeVariant?: "blue" | "purple" | "green" | "muted";
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  badgeVariant = "blue",
  title,
  highlight,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start";

  // If highlight is provided, replace or split title cleanly
  const renderTitle = () => {
    if (!highlight || !title.includes(highlight)) {
      return (
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-tight text-white leading-tight">
          {title}
        </h2>
      );
    }

    const parts = title.split(highlight);
    return (
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-tight text-white leading-tight">
        {parts[0]}
        <span className="text-brand-accent">{highlight}</span>
        {parts.slice(1).join(highlight)}
      </h2>
    );
  };

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 ${alignClasses} ${className}`}>
      {eyebrow && (
        <div className="mb-4">
          <Badge variant={badgeVariant}>{eyebrow}</Badge>
        </div>
      )}
      {renderTitle()}
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-brand-muted max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
