import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({
  children,
  className = "",
  hoverEffect = true,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl bg-brand-card/90 border border-brand-border p-6 sm:p-8 backdrop-blur transition-all duration-200 ${
        hoverEffect
          ? "hover:border-brand-accent/40 hover:bg-brand-card hover:shadow-lg hover:shadow-blue-950/20"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
