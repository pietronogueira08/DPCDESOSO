"use client";

import React from "react";
import { motion } from "framer-motion";
import { SPRING_GENTLE, useSafeMotion } from "@/lib/motion";

interface ProgressRingProps {
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({
  completed,
  total,
  size = 112,
  strokeWidth = 10,
}: ProgressRingProps) {
  const { shouldReduceMotion } = useSafeMotion();
  const safeTotal = total > 0 ? total : 1;
  const ratio = Math.max(0, Math.min(1, completed / safeTotal));
  const pct = Math.round(ratio * 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - ratio);

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="fisio-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="52%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F1E8DF"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#fisio-ring-grad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={
            shouldReduceMotion
              ? { strokeDashoffset: dashOffset }
              : { strokeDashoffset: circumference }
          }
          animate={{ strokeDashoffset: dashOffset }}
          transition={shouldReduceMotion ? { duration: 0 } : SPRING_GENTLE}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-xl font-extrabold leading-none text-ink">
          {pct}%
        </span>
        <span className="mt-1 text-[11px] font-semibold text-ink-secondary">
          {completed}/{total}
        </span>
      </div>
    </div>
  );
}
