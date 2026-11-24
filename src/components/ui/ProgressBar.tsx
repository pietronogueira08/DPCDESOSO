"use client";

import { motion } from "framer-motion";
import { useSafeMotion } from "@/lib/motion";

interface ProgressBarProps {
  value: number;
  label: string;
  tone?: "mint" | "blush" | "lavender";
  showPercent?: boolean;
  className?: string;
}

const FILL_CLASSES = {
  mint: "bg-mint",
  blush: "bg-blush",
  lavender: "bg-lavender",
};

export function ProgressBar({
  value,
  label,
  tone = "mint",
  showPercent = true,
  className = "",
}: ProgressBarProps) {
  const { springGentle } = useSafeMotion();
  const clamped = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-1.5 flex items-center justify-between gap-2 text-xs font-semibold text-ink-muted">
        <span>{label}</span>
        {showPercent && <span className="tabular-nums text-ink">{clamped}%</span>}
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        className="h-3 w-full overflow-hidden rounded-full border border-border-warm bg-cream"
      >
        <motion.div
          className={`h-full rounded-full ${FILL_CLASSES[tone]}`}
          initial={false}
          animate={{ width: `${clamped}%` }}
          transition={springGentle}
        />
      </div>
    </div>
  );
}
