"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSafeMotion } from "@/lib/motion";

interface HeartBurstProps {
  burstKey: number;
}

const PARTICLES = [
  { id: "p1", x: -72, y: -64, rotate: -18, color: "#EC4899", kind: "heart" },
  { id: "p2", x: -34, y: -92, rotate: 14, color: "#10B981", kind: "sparkle" },
  { id: "p3", x: 12, y: -98, rotate: -12, color: "#EC4899", kind: "heart" },
  { id: "p4", x: 56, y: -76, rotate: 22, color: "#8B5CF6", kind: "sparkle" },
  { id: "p5", x: 84, y: -38, rotate: 16, color: "#0EA5E9", kind: "heart" },
  { id: "p6", x: -86, y: -22, rotate: -26, color: "#F59E0B", kind: "sparkle" },
  { id: "p7", x: 34, y: -48, rotate: 8, color: "#EC4899", kind: "heart" },
  { id: "p8", x: -16, y: -54, rotate: -8, color: "#10B981", kind: "heart" },
] as const;

export function HeartBurst({ burstKey }: HeartBurstProps) {
  const { shouldReduceMotion } = useSafeMotion();

  if (burstKey <= 0 || shouldReduceMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center"
    >
      <AnimatePresence mode="popLayout">
        <div key={burstKey} className="relative h-4 w-4">
          {PARTICLES.map((particle, idx) => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 0, scale: 0.4, x: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.4, 1.15, 0.9, 0.6],
                x: particle.x,
                y: particle.y,
                rotate: particle.rotate,
              }}
              transition={{
                duration: 0.95,
                delay: idx * 0.025,
                ease: "easeOut",
              }}
              className="absolute left-0 top-0 will-change-transform"
              style={{ color: particle.color }}
            >
              {particle.kind === "heart" ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 2L14.6 9.4 22 12 14.6 14.6 12 22 9.4 14.6 2 12 9.4 9.4Z" />
                </svg>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
