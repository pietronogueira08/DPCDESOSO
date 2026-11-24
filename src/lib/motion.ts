"use client";

import { useReducedMotion, type Transition, type Variants } from "framer-motion";

export const springBouncy = {
  type: "spring" as const,
  stiffness: 380,
  damping: 24,
  mass: 0.8,
};

export const springGentle = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
  mass: 1,
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: springGentle,
  },
};

export const cardFlipVariants: Variants = {
  front: {
    rotateY: 0,
    transition: springBouncy,
  },
  back: {
    rotateY: 180,
    transition: springBouncy,
  },
};

export const popInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springBouncy,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.16 },
  },
};

export const instantFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export const instantStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
};

export const instantStaggerItem: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.12 },
  },
};

export const instantFlipVariants: Variants = {
  front: { opacity: 1, transition: { duration: 0.12 } },
  back: { opacity: 1, transition: { duration: 0.12 } },
};

export function useSafeMotion() {
  const prefersReduced = useReducedMotion() ?? false;

  const transition = (normal: Transition): Transition =>
    prefersReduced ? { duration: 0.12 } : normal;

  return {
    prefersReduced,
    springBouncy: prefersReduced ? { duration: 0.12 } : springBouncy,
    springGentle: prefersReduced ? { duration: 0.12 } : springGentle,
    staggerContainer: prefersReduced ? instantStaggerContainer : staggerContainer,
    staggerItem: prefersReduced ? instantStaggerItem : staggerItem,
    cardFlipVariants: prefersReduced ? instantFlipVariants : cardFlipVariants,
    popInVariants: prefersReduced ? instantFadeVariants : popInVariants,
    transition,
  };
}
