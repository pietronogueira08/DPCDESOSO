"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSafeMotion } from "@/lib/motion";

export function ParallaxBackdrop() {
  const { shouldReduceMotion } = useSafeMotion();
  const { scrollY } = useScroll();

  const yLayer1 = useTransform(scrollY, [0, 1600], [-18, 18]);
  const yLayer2 = useTransform(scrollY, [0, 1600], [-32, 32]);
  const yLayer3 = useTransform(scrollY, [0, 1600], [-12, 12]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none"
    >
      {/* Soft radial pastel ambient blobs */}
      <div className="absolute -left-28 -top-24 h-80 w-80 rounded-full bg-[#D1FAE5]/45 blur-3xl" />
      <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-[#FCE7F3]/50 blur-3xl" />
      <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-[#E0F2FE]/45 blur-3xl" />
      <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-[#EDE9FE]/55 blur-3xl" />

      {/* Layer 1: Soft pastel clouds ([-18px, 18px]) */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : yLayer1 }}
        className="absolute inset-0 will-change-transform"
      >
        <svg
          viewBox="0 0 180 90"
          className="absolute left-[4%] top-[12%] h-14 w-28 text-[#E0F2FE] opacity-80"
          fill="currentColor"
        >
          <path d="M40 72h96a22 22 0 0 0 4-43.6A32 32 0 0 0 78 20a26 26 0 0 0-46 15.5A19 19 0 0 0 40 72Z" />
        </svg>
        <svg
          viewBox="0 0 180 90"
          className="absolute right-[7%] top-[34%] hidden h-16 w-32 text-[#FCE7F3] opacity-75 md:block"
          fill="currentColor"
        >
          <path d="M40 72h96a22 22 0 0 0 4-43.6A32 32 0 0 0 78 20a26 26 0 0 0-46 15.5A19 19 0 0 0 40 72Z" />
        </svg>
      </motion.div>

      {/* Layer 2: Medical sparkles & DNA doodles ([-32px, 32px]) */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : yLayer2 }}
        className="absolute inset-0 will-change-transform"
      >
        <svg
          viewBox="0 0 48 48"
          className="absolute right-[15%] top-[14%] h-10 w-10 text-[#10B981]/35"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M14 8c0 10 20 10 20 20s-20 10-20 12" />
          <path d="M34 8c0 10-20 10-20 20s20 10 20 12" />
          <line x1="17" y1="14" x2="31" y2="14" />
          <line x1="17" y1="24" x2="31" y2="24" />
          <line x1="17" y1="34" x2="31" y2="34" />
        </svg>

        <svg
          viewBox="0 0 32 32"
          className="absolute left-[12%] top-[52%] h-7 w-7 text-[#8B5CF6]/35"
          fill="currentColor"
        >
          <path d="M16 2 19.5 12.5 30 16 19.5 19.5 16 30 12.5 19.5 2 16 12.5 12.5Z" />
        </svg>

        <svg
          viewBox="0 0 32 32"
          className="absolute right-[10%] bottom-[22%] hidden h-8 w-8 text-[#0EA5E9]/35 sm:block"
          fill="currentColor"
        >
          <path d="M16 2 19.5 12.5 30 16 19.5 19.5 16 30 12.5 19.5 2 16 12.5 12.5Z" />
        </svg>
      </motion.div>

      {/* Layer 3: Mini hearts & gentle dots ([-12px, 12px]) */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : yLayer3 }}
        className="absolute inset-0 will-change-transform"
      >
        <svg
          viewBox="0 0 32 32"
          className="absolute left-[22%] top-[22%] h-5 w-5 text-[#EC4899]/30"
          fill="currentColor"
        >
          <path d="M16 27.2S4.5 19.8 4.5 11.6A6.4 6.4 0 0 1 16 7.8a6.4 6.4 0 0 1 11.5 3.8C27.5 19.8 16 27.2 16 27.2Z" />
        </svg>
        <svg
          viewBox="0 0 32 32"
          className="absolute right-[24%] bottom-[14%] h-6 w-6 text-[#EC4899]/30"
          fill="currentColor"
        >
          <path d="M16 27.2S4.5 19.8 4.5 11.6A6.4 6.4 0 0 1 16 7.8a6.4 6.4 0 0 1 11.5 3.8C27.5 19.8 16 27.2 16 27.2Z" />
        </svg>
        <div className="absolute left-[7%] bottom-[18%] h-3.5 w-3.5 rounded-full bg-[#10B981]/25" />
        <div className="absolute right-[6%] top-[62%] h-4 w-4 rounded-full bg-[#8B5CF6]/25" />
      </motion.div>
    </div>
  );
}
