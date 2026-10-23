import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "blue" | "purple" | "green" | "muted";
  className?: string;
}

export function Badge({
  children,
  variant = "blue",
  className = "",
  ...props
}: BadgeProps) {
  const variantClasses = {
    blue: "bg-blue-950/60 text-brand-accent border-blue-800/50",
    purple: "bg-purple-950/60 text-brand-badgePurple border-purple-800/50",
    green: "bg-emerald-950/60 text-brand-green border-emerald-800/50",
    muted: "bg-brand-surface text-brand-muted border-brand-border",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border uppercase tracking-wider ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
