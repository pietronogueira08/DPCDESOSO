import React from "react";

interface KawaiiCardProps {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "mint" | "sky" | "berry" | "rose" | "amber";
}

const TONE_CLASSES: Record<NonNullable<KawaiiCardProps["tone"]>, string> = {
  default: "bg-surface border-border-warm",
  mint: "bg-surface border-[#A7F3D0]",
  sky: "bg-surface border-[#BAE6FD]",
  berry: "bg-surface border-[#DDD6FE]",
  rose: "bg-surface border-[#FBCFE8]",
  amber: "bg-amber-trap-soft border-amber-trap-border",
};

export function KawaiiCard({
  children,
  className = "",
  tone = "default",
}: KawaiiCardProps) {
  return (
    <div
      className={`rounded-3xl border shadow-kawaii transition-shadow duration-200 ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
