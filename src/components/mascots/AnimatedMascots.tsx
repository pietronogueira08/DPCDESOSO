"use client";

import React from "react";
import { motion } from "framer-motion";
import type { TrackId } from "@/data/physiology-tracks";
import { useSafeMotion } from "@/lib/motion";

export type MascotMood = "idle" | "cheering" | "comforting" | "love" | "studying";
export type MascotSize = "sm" | "md" | "lg";

export interface MascotProps {
  mood?: MascotMood;
  size?: MascotSize;
  className?: string;
}

const SIZE_PX: Record<MascotSize, number> = {
  sm: 52,
  md: 84,
  lg: 116,
};

function useMascotBodyAnim(mood: MascotMood, shouldReduceMotion: boolean) {
  if (shouldReduceMotion) return {};
  if (mood === "cheering") {
    return {
      animate: { y: [0, -7, 0], scale: [1, 1.04, 1] },
      transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" as const },
    };
  }
  if (mood === "love") {
    return {
      animate: { y: [0, -4, 0], rotate: [-1.5, 1.5, -1.5] },
      transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" as const },
    };
  }
  if (mood === "comforting") {
    return {
      animate: { rotate: [-2, 2, -2] },
      transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const },
    };
  }
  return {
    animate: { y: [0, -3.5, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  };
}

/**
 * 1. DrCoelhinho — GI Trail mascot (white bunny in lab coat with mint stethoscope).
 */
export function DrCoelhinho({
  mood = "idle",
  size = "md",
  className = "",
}: MascotProps) {
  const { shouldReduceMotion } = useSafeMotion();
  const px = SIZE_PX[size];
  const bodyAnim = useMascotBodyAnim(mood, shouldReduceMotion);

  return (
    <motion.svg
      width={px}
      height={px}
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={`shrink-0 overflow-visible select-none ${className}`}
      {...bodyAnim}
    >
      {/* Left & Right ears with gentle wiggle */}
      <motion.g
        style={{ transformOrigin: "44px 42px" }}
        animate={
          shouldReduceMotion
            ? undefined
            : { rotate: mood === "cheering" ? [-6, 8, -6] : [-3, 3, -3] }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="42" cy="24" rx="9" ry="21" fill="#FFFFFF" stroke="#E5DDD5" strokeWidth="2" />
        <ellipse cx="42" cy="25" rx="4.5" ry="14" fill="#FBCFE8" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "76px 42px" }}
        animate={
          shouldReduceMotion
            ? undefined
            : { rotate: mood === "cheering" ? [6, -8, 6] : [3, -3, 3] }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="78" cy="24" rx="9" ry="21" fill="#FFFFFF" stroke="#E5DDD5" strokeWidth="2" />
        <ellipse cx="78" cy="25" rx="4.5" ry="14" fill="#FBCFE8" />
      </motion.g>

      {/* Lab coat body */}
      <path
        d="M32 106 C32 84, 42 76, 60 76 C78 76, 88 84, 88 106 Z"
        fill="#FFFFFF"
        stroke="#D1FAE5"
        strokeWidth="2.5"
      />
      <path d="M51 77 L60 95 L69 77 Z" fill="#D1FAE5" />

      {/* Mint stethoscope */}
      <path
        d="M44 80 C44 96, 76 96, 76 80"
        fill="none"
        stroke="#047857"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="60" cy="96" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* Bunny Head */}
      <ellipse cx="60" cy="57" rx="28" ry="24" fill="#FFFFFF" stroke="#E5DDD5" strokeWidth="2" />

      {/* Cheeks */}
      <ellipse cx="41" cy="62" rx="5" ry="3" fill="#FBCFE8" opacity="0.85" />
      <ellipse cx="79" cy="62" rx="5" ry="3" fill="#FBCFE8" opacity="0.85" />

      {/* Eyes (animated blink) */}
      <motion.g
        style={{ transformOrigin: "60px 54px" }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scaleY: [1, 1, 0.1, 1, 1] }
        }
        transition={{
          duration: 3.8,
          times: [0, 0.9, 0.94, 0.98, 1],
          repeat: Infinity,
        }}
      >
        <circle cx="49" cy="54" r="3.4" fill="#26232B" />
        <circle cx="71" cy="54" r="3.4" fill="#26232B" />
        <circle cx="50.2" cy="52.8" r="1.1" fill="#FFFFFF" />
        <circle cx="72.2" cy="52.8" r="1.1" fill="#FFFFFF" />
      </motion.g>

      {/* Nose & Smile */}
      <ellipse cx="60" cy="59.5" rx="2.8" ry="2" fill="#EC4899" />
      <path
        d={
          mood === "cheering" || mood === "love"
            ? "M54 63 Q60 69 66 63"
            : "M55 63.5 Q60 67 65 63.5"
        }
        fill="none"
        stroke="#26232B"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Mint doctor headband badge */}
      <rect x="52" y="34" width="16" height="8" rx="4" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" />
      <path d="M60 35.5 V40.5 M57.5 38 H62.5" stroke="#047857" strokeWidth="1.8" strokeLinecap="round" />
    </motion.svg>
  );
}

/**
 * 2. DraUrsinha — Renal & Acid-Base mascot (cozy bear with water-drop badge & glasses).
 */
export function DraUrsinha({
  mood = "idle",
  size = "md",
  className = "",
}: MascotProps) {
  const { shouldReduceMotion } = useSafeMotion();
  const px = SIZE_PX[size];
  const bodyAnim = useMascotBodyAnim(mood, shouldReduceMotion);

  return (
    <motion.svg
      width={px}
      height={px}
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={`shrink-0 overflow-visible select-none ${className}`}
      {...bodyAnim}
    >
      {/* Bear Ears */}
      <circle cx="36" cy="36" r="11" fill="#F4D3B3" stroke="#DFB48E" strokeWidth="2" />
      <circle cx="36" cy="36" r="5.5" fill="#FDE6D2" />
      <circle cx="84" cy="36" r="11" fill="#F4D3B3" stroke="#DFB48E" strokeWidth="2" />
      <circle cx="84" cy="36" r="5.5" fill="#FDE6D2" />

      {/* Lab Coat */}
      <path
        d="M31 107 C31 85, 41 77, 60 77 C79 77, 89 85, 89 107 Z"
        fill="#FFFFFF"
        stroke="#BAE6FD"
        strokeWidth="2.5"
      />
      <path d="M51 78 L60 95 L69 78 Z" fill="#E0F2FE" />

      {/* Cheering paw */}
      <motion.g
        style={{ transformOrigin: "87px 88px" }}
        animate={
          shouldReduceMotion
            ? undefined
            : mood === "cheering"
            ? { rotate: [-12, 16, -12], y: [-3, -7, -3] }
            : { rotate: [0, 5, 0] }
        }
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="92" cy="87" rx="8" ry="6.5" fill="#F4D3B3" stroke="#DFB48E" strokeWidth="1.8" />
      </motion.g>

      {/* Water drop renal badge */}
      <path
        d="M60 87 C60 87, 65.5 93, 65.5 97 A5.5 5.5 0 0 1 54.5 97 C54.5 93, 60 87, 60 87 Z"
        fill="#0EA5E9"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />

      {/* Bear Head with gentle tilt */}
      <motion.g
        style={{ transformOrigin: "60px 58px" }}
        animate={
          shouldReduceMotion
            ? undefined
            : { rotate: mood === "studying" ? [-2, 2, -2] : [-1, 1, -1] }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="60" cy="56" rx="28" ry="25" fill="#F4D3B3" stroke="#DFB48E" strokeWidth="2" />
        <ellipse cx="60" cy="63" rx="11" ry="8.5" fill="#FFF4E8" />

        {/* Cheeks */}
        <ellipse cx="40" cy="61" rx="5" ry="3" fill="#FBCFE8" opacity="0.85" />
        <ellipse cx="80" cy="61" rx="5" ry="3" fill="#FBCFE8" opacity="0.85" />

        {/* Eyes & Glasses */}
        <motion.g
          style={{ transformOrigin: "60px 52px" }}
          animate={shouldReduceMotion ? undefined : { scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ duration: 4.2, times: [0, 0.9, 0.94, 0.98, 1], repeat: Infinity }}
        >
          <circle cx="48" cy="52" r="3" fill="#26232B" />
          <circle cx="72" cy="52" r="3" fill="#26232B" />
        </motion.g>
        <circle cx="48" cy="52" r="7.5" fill="none" stroke="#0369A1" strokeWidth="2" />
        <circle cx="72" cy="52" r="7.5" fill="none" stroke="#0369A1" strokeWidth="2" />
        <line x1="55.5" y1="52" x2="64.5" y2="52" stroke="#0369A1" strokeWidth="2" />

        {/* Nose & Smile */}
        <ellipse cx="60" cy="60.5" rx="3.5" ry="2.4" fill="#4B3832" />
        <path
          d="M55 65 Q60 68.5 65 65"
          fill="none"
          stroke="#4B3832"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.g>
    </motion.svg>
  );
}

/**
 * 3. GatinhaEndocrino — Endocrine mascot (pastel kitty with doctor headband & lavender heart badge).
 */
export function GatinhaEndocrino({
  mood = "idle",
  size = "md",
  className = "",
}: MascotProps) {
  const { shouldReduceMotion } = useSafeMotion();
  const px = SIZE_PX[size];
  const bodyAnim = useMascotBodyAnim(mood, shouldReduceMotion);

  return (
    <motion.svg
      width={px}
      height={px}
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={`shrink-0 overflow-visible select-none ${className}`}
      {...bodyAnim}
    >
      {/* Tail swish */}
      <motion.path
        d="M84 96 C98 95, 105 80, 97 72"
        fill="none"
        stroke="#E9D5FF"
        strokeWidth="7"
        strokeLinecap="round"
        style={{ transformOrigin: "84px 96px" }}
        animate={
          shouldReduceMotion
            ? undefined
            : { rotate: mood === "cheering" ? [-12, 14, -12] : [-6, 6, -6] }
        }
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cat Ears */}
      <polygon points="33,46 39,21 53,36" fill="#FAF5FF" stroke="#DDD6FE" strokeWidth="2" />
      <polygon points="37,42 40.5,27 49,36" fill="#FBCFE8" />
      <polygon points="87,46 81,21 67,36" fill="#FAF5FF" stroke="#DDD6FE" strokeWidth="2" />
      <polygon points="83,42 79.5,27 71,36" fill="#FBCFE8" />

      {/* Coat */}
      <path
        d="M32 107 C32 85, 42 77, 60 77 C78 77, 88 85, 88 107 Z"
        fill="#FFFFFF"
        stroke="#DDD6FE"
        strokeWidth="2.5"
      />
      {/* Lavender heart badge */}
      <path
        d="M60 98 S53 93 53 88.5 A3.5 3.5 0 0 1 60 86.5 A3.5 3.5 0 0 1 67 88.5 C67 93 60 98 60 98 Z"
        fill="#8B5CF6"
      />

      {/* Head */}
      <ellipse cx="60" cy="57" rx="28" ry="23" fill="#FAF5FF" stroke="#DDD6FE" strokeWidth="2" />

      {/* Headband */}
      <path d="M40 38 Q60 32 80 38" fill="none" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="60" cy="34" r="5" fill="#EDE9FE" stroke="#6D28D9" strokeWidth="1.5" />

      {/* Whiskers */}
      <g stroke="#B8A9C9" strokeWidth="1.6" strokeLinecap="round">
        <line x1="25" y1="56" x2="36" y2="58" />
        <line x1="24" y1="62" x2="36" y2="62" />
        <line x1="84" y1="58" x2="95" y2="56" />
        <line x1="84" y1="62" x2="96" y2="62" />
      </g>

      {/* Cheeks */}
      <ellipse cx="41" cy="62" rx="4.8" ry="2.8" fill="#FBCFE8" opacity="0.9" />
      <ellipse cx="79" cy="62" rx="4.8" ry="2.8" fill="#FBCFE8" opacity="0.9" />

      {/* Sparkling Eyes */}
      <motion.g
        style={{ transformOrigin: "60px 54px" }}
        animate={shouldReduceMotion ? undefined : { scaleY: [1, 1, 0.1, 1, 1] }}
        transition={{ duration: 3.5, times: [0, 0.9, 0.94, 0.98, 1], repeat: Infinity }}
      >
        <circle cx="49" cy="54" r="3.4" fill="#26232B" />
        <circle cx="71" cy="54" r="3.4" fill="#26232B" />
        <circle cx="50.3" cy="52.6" r="1.2" fill="#FFFFFF" />
        <circle cx="72.3" cy="52.6" r="1.2" fill="#FFFFFF" />
      </motion.g>

      {/* Nose & Kitty Mouth */}
      <polygon points="58,59 62,59 60,61.5" fill="#EC4899" />
      <path
        d="M55 63.5 Q57.5 66 60 63 Q62.5 66 65 63.5"
        fill="none"
        stroke="#26232B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

/**
 * 4. CachorrinhoMimo — Floating comfort & celebration mascot (fluffy puppy holding floating pink heart).
 */
export function CachorrinhoMimo({
  mood = "love",
  size = "md",
  className = "",
}: MascotProps) {
  const { shouldReduceMotion } = useSafeMotion();
  const px = SIZE_PX[size];
  const bodyAnim = useMascotBodyAnim(mood, shouldReduceMotion);

  return (
    <motion.svg
      width={px}
      height={px}
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={`shrink-0 overflow-visible select-none ${className}`}
      {...bodyAnim}
    >
      {/* Tail wag */}
      <motion.path
        d="M84 95 Q100 88 96 76"
        fill="none"
        stroke="#FCD9B6"
        strokeWidth="7"
        strokeLinecap="round"
        style={{ transformOrigin: "84px 95px" }}
        animate={
          shouldReduceMotion
            ? undefined
            : { rotate: mood === "cheering" || mood === "love" ? [-16, 18, -16] : [-8, 8, -8] }
        }
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floppy Puppy Ears */}
      <ellipse cx="32" cy="55" rx="9" ry="18" transform="rotate(14 32 55)" fill="#E7B98A" stroke="#D19D6A" strokeWidth="1.8" />
      <ellipse cx="88" cy="55" rx="9" ry="18" transform="rotate(-14 88 55)" fill="#E7B98A" stroke="#D19D6A" strokeWidth="1.8" />

      {/* Body */}
      <path
        d="M34 107 C34 86, 44 77, 60 77 C76 77, 86 86, 86 107 Z"
        fill="#FFF5EA"
        stroke="#F1D5B8"
        strokeWidth="2"
      />

      {/* Head */}
      <ellipse cx="60" cy="55" rx="26" ry="23" fill="#FFF5EA" stroke="#F1D5B8" strokeWidth="2" />
      <ellipse cx="48" cy="52" rx="8" ry="9" fill="#F7E1C8" opacity="0.65" />

      {/* Cheeks */}
      <ellipse cx="41" cy="60" rx="4.8" ry="2.8" fill="#FBCFE8" opacity="0.9" />
      <ellipse cx="79" cy="60" rx="4.8" ry="2.8" fill="#FBCFE8" opacity="0.9" />

      {/* Eyes */}
      <motion.g
        style={{ transformOrigin: "60px 53px" }}
        animate={shouldReduceMotion ? undefined : { scaleY: [1, 1, 0.1, 1, 1] }}
        transition={{ duration: 3.4, times: [0, 0.9, 0.94, 0.98, 1], repeat: Infinity }}
      >
        <circle cx="49" cy="53" r="3.4" fill="#26232B" />
        <circle cx="71" cy="53" r="3.4" fill="#26232B" />
        <circle cx="50.2" cy="51.8" r="1.1" fill="#FFFFFF" />
        <circle cx="72.2" cy="51.8" r="1.1" fill="#FFFFFF" />
      </motion.g>

      {/* Nose & Smile */}
      <ellipse cx="60" cy="58" rx="3.4" ry="2.4" fill="#4B3832" />
      <path
        d="M54.5 62.5 Q60 67.5 65.5 62.5"
        fill="none"
        stroke="#4B3832"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Floating pulsing pink heart */}
      <motion.g
        style={{ transformOrigin: "60px 92px" }}
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1, 1.15, 1], y: [0, -3, 0] }
        }
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M60 102 S48 94.5 48 87 A6.5 6.5 0 0 1 60 83.5 A6.5 6.5 0 0 1 72 87 C72 94.5 60 102 60 102 Z"
          fill="#EC4899"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
      </motion.g>
    </motion.svg>
  );
}

export function TrackMascot({
  trackId,
  mood = "idle",
  size = "md",
  className = "",
}: {
  trackId: TrackId;
  mood?: MascotMood;
  size?: MascotSize;
  className?: string;
}) {
  if (trackId === "gi") {
    return <DrCoelhinho mood={mood} size={size} className={className} />;
  }
  if (trackId === "renal") {
    return <DraUrsinha mood={mood} size={size} className={className} />;
  }
  return <GatinhaEndocrino mood={mood} size={size} className={className} />;
}
