"use client";

import React, { createContext, useContext, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const SPRING_BOUNCY = {
  type: "spring" as const,
  stiffness: 400,
  damping: 22,
  mass: 0.75,
};

export const SPRING_GENTLE = {
  type: "spring" as const,
  stiffness: 240,
  damping: 26,
  mass: 1,
};

export const SPRING_CARD_HOVER = {
  type: "spring" as const,
  stiffness: 320,
  damping: 24,
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.05,
    },
  },
};

export const CARD_REVEAL = {
  hidden: { y: 18, opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: SPRING_GENTLE,
  },
};

export const FLASHCARD_FLIP = {
  transition: {
    type: "spring" as const,
    stiffness: 280,
    damping: 24,
    mass: 0.85,
  },
};

interface MotionPreferenceContextValue {
  ambientPaused: boolean;
  setAmbientPaused: (paused: boolean) => void;
  toggleAmbientPaused: () => void;
}

const MotionPreferenceContext = createContext<MotionPreferenceContextValue>({
  ambientPaused: false,
  setAmbientPaused: () => undefined,
  toggleAmbientPaused: () => undefined,
});

export function MotionPreferenceProvider({ children }: { children: React.ReactNode }) {
  const [ambientPaused, setAmbientPaused] = useState(false);

  return React.createElement(
    MotionPreferenceContext.Provider,
    {
      value: {
        ambientPaused,
        setAmbientPaused,
        toggleAmbientPaused: () => setAmbientPaused((prev) => !prev),
      },
    },
    children
  );
}

/**
 * Combines OS prefers-reduced-motion with the explicit WCAG 2.2.2 ambient pause control.
 */
export function useSafeMotion() {
  const osReduced = useReducedMotion() ?? false;
  const { ambientPaused, setAmbientPaused, toggleAmbientPaused } =
    useContext(MotionPreferenceContext);

  const shouldReduceMotion = osReduced || ambientPaused;

  return {
    osReduced,
    ambientPaused,
    setAmbientPaused,
    toggleAmbientPaused,
    shouldReduceMotion,
  };
}

/**
 * Safari fallback for <dialog closedby="any"> per modern-web-guidance.
 * Checks pointerdown and pointerup outside the dialog bounding box so text selection drags don't accidentally close.
 */
export function attachDialogLightDismissFallback(dialog: HTMLDialogElement): () => void {
  if (typeof window === "undefined") return () => undefined;
  if ("closedBy" in HTMLDialogElement.prototype) {
    return () => undefined;
  }

  let pressedOutside = false;

  const isOutside = (e: PointerEvent) => {
    const r = dialog.getBoundingClientRect();
    return (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    );
  };

  const onPointerDown = (e: PointerEvent) => {
    pressedOutside = isOutside(e);
  };

  const onPointerUp = (e: PointerEvent) => {
    if (pressedOutside && isOutside(e)) {
      dialog.close();
    }
    pressedOutside = false;
  };

  dialog.addEventListener("pointerdown", onPointerDown);
  dialog.addEventListener("pointerup", onPointerUp);

  return () => {
    dialog.removeEventListener("pointerdown", onPointerDown);
    dialog.removeEventListener("pointerup", onPointerUp);
  };
}
