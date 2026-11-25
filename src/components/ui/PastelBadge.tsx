import React from "react";

export type BadgeTone = "mint" | "sky" | "berry" | "rose" | "amber" | "crimson" | "neutral";

interface PastelBadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const BADGE_STYLES: Record<BadgeTone, string> = {
  mint: "bg-mint-soft text-mint-ink border-[#A7F3D0]",
  sky: "bg-sky-med-soft text-sky-med-ink border-[#BAE6FD]",
  berry: "bg-berry-soft text-berry-ink border-[#DDD6FE]",
  rose: "bg-rose-mimo-soft text-rose-mimo-ink border-[#FBCFE8]",
  amber: "bg-amber-trap-soft text-amber-trap-ink border-amber-trap-border",
  crimson: "bg-crimson-soft text-crimson border-[#FECACA]",
  neutral: "bg-cream text-ink-secondary border-border-warm",
};

export function PastelBadge({
  children,
  tone = "neutral",
  className = "",
}: PastelBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold leading-5 ${BADGE_STYLES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
