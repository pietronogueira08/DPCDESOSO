"use client";

import React from "react";
import { motion } from "framer-motion";
import { SPRING_GENTLE, useSafeMotion } from "@/lib/motion";

interface AnimatedProgressBarProps {
  value: number;
  max: number;
  tone?: "mint" | "sky" | "berry" | "rose";
  label?: string;
  heightClass?: string;
}

const FILL_CLASSES: Record<NonNullable<AnimatedProgressBarProps["tone"]>, string> = {
  mint: "bg-mint-progress",
  sky: "bg-sky-med-progress",
  berry: "bg-berry-progress",
  rose: "bg-rose-mimo-heart",
};

const TRACK_CLASSES: Record<NonNullable<AnimatedProgressBarProps["tone"]>, string> = {
  mint: "bg-mint-soft",
  sky: "bg-sky-med-soft",
  berry: "bg-berry-soft",
  rose: "bg-rose-mimo-soft",
};

export function AnimatedProgressBar({
  value,
  max,
  tone = "mint",
  label = "Progresso",
  heightClass = "h-2.5",
}: AnimatedProgressBarProps) {
  const { shouldReduceMotion } = useSafeMotion();
  const safeMax = max > 0 ? max : 1;
  const pct = Math.max(0, Math.min(100, Math.round((value / safeMax) * 100)));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={Math.min(value, safeMax)}
      className={`w-full overflow-hidden rounded-full ${TRACK_CLASSES[tone]} ${heightClass}`}
    >
      <motion.div
        initial={shouldReduceMotion ? { width: `${pct}%` } : { width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={shouldReduceMotion ? { duration: 0 } : SPRING_GENTLE}
        className={`h-full rounded-full ${FILL_CLASSES[tone]}`}
      />
    </div>
  );
}
