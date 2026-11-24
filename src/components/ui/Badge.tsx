import type { ReactNode } from "react";

export type BadgeTone = "mint" | "blush" | "lavender" | "danger" | "neutral";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

// All text/background pairs verified >= 4.5:1 WCAG AA contrast
const BADGE_TONES: Record<BadgeTone, string> = {
  mint: "bg-mint-soft text-mint-ink border-mint/25",
  blush: "bg-blush-soft text-blush-ink border-blush/25",
  lavender: "bg-lavender-soft text-lavender-ink border-lavender/25",
  danger: "bg-danger-soft text-danger-ink border-danger/25",
  neutral: "bg-cream text-ink border-border-warm",
};

export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold leading-none ${BADGE_TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
