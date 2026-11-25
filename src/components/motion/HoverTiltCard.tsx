"use client";

import React from "react";
import { motion } from "framer-motion";
import { SPRING_CARD_HOVER, useSafeMotion } from "@/lib/motion";

interface HoverTiltCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  glowTone?: "mint" | "sky" | "berry" | "rose";
}

const GLOW_RING: Record<NonNullable<HoverTiltCardProps["glowTone"]>, string> = {
  mint: "hover:border-[#10B981]/50 hover:shadow-[0_14px_34px_-10px_rgba(16,185,129,0.22)]",
  sky: "hover:border-[#0EA5E9]/50 hover:shadow-[0_14px_34px_-10px_rgba(14,165,233,0.22)]",
  berry: "hover:border-[#8B5CF6]/50 hover:shadow-[0_14px_34px_-10px_rgba(139,92,246,0.22)]",
  rose: "hover:border-[#EC4899]/50 hover:shadow-[0_14px_34px_-10px_rgba(236,72,153,0.22)]",
};

export function HoverTiltCard({
  children,
  className = "",
  interactive = true,
  onClick,
  glowTone = "mint",
}: HoverTiltCardProps) {
  const { shouldReduceMotion } = useSafeMotion();

  if (shouldReduceMotion || !interactive) {
    return (
      <div
        onClick={onClick}
        className={`relative overflow-hidden transition-colors duration-200 ${GLOW_RING[glowTone]} ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.012 }}
      whileTap={{ scale: 0.985 }}
      transition={SPRING_CARD_HOVER}
      className={`group relative overflow-hidden transition-colors duration-200 will-change-transform ${GLOW_RING[glowTone]} ${className}`}
    >
      {/* Subtle glossy pastel highlight sheen on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 58%)",
        }}
      />
      {children}
    </motion.div>
  );
}
