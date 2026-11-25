"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { TrackId } from "@/data/physiology-tracks";
import {
  CachorrinhoMimo,
  TrackMascot,
  type MascotMood,
} from "@/components/mascots/AnimatedMascots";
import { SPRING_BOUNCY, useSafeMotion } from "@/lib/motion";

export interface MimoToastData {
  id: number;
  message: string;
  trackId?: TrackId | "mimo";
  mood?: MascotMood;
}

interface MimoToastProps {
  toast: MimoToastData | null;
  onDismiss: () => void;
}

export function MimoToast({ toast, onDismiss }: MimoToastProps) {
  const { shouldReduceMotion } = useSafeMotion();

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => {
      onDismiss();
    }, 4200);
    return () => window.clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed left-4 right-4 top-16 z-40 flex justify-end sm:left-auto sm:w-[24rem]"
    >
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -16, scale: 0.94 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -12, scale: 0.95 }
            }
            transition={SPRING_BOUNCY}
            className="pointer-events-auto flex w-full items-center gap-3 rounded-3xl border border-[#FBCFE8] bg-surface/95 p-3 pr-2.5 shadow-kawaii-hover backdrop-blur-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-mimo-soft/70">
              {toast.trackId && toast.trackId !== "mimo" ? (
                <TrackMascot
                  trackId={toast.trackId}
                  mood={toast.mood ?? "cheering"}
                  size="sm"
                />
              ) : (
                <CachorrinhoMimo mood={toast.mood ?? "love"} size="sm" />
              )}
            </div>
            <p className="flex-1 text-xs font-semibold leading-snug text-ink sm:text-[13px]">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Fechar recadinho"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-secondary transition-colors hover:bg-rose-mimo-soft hover:text-rose-mimo-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
