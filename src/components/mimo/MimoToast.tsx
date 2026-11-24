"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { MascotAvatar } from "@/components/mascots/KawaiiMascots";
import { Badge } from "@/components/ui/Badge";
import type { MimoMessageItem } from "@/data/dpc-content";
import { useSafeMotion } from "@/lib/motion";

interface MimoToastProps {
  mimo: MimoMessageItem | null;
  subtitle?: string;
  onDismiss: () => void;
}

export function MimoToast({ mimo, subtitle, onDismiss }: MimoToastProps) {
  const { prefersReduced, popInVariants } = useSafeMotion();

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-3 bottom-20 z-40 flex justify-end sm:inset-x-auto sm:bottom-24 sm:right-6"
    >
      <AnimatePresence>
        {mimo && (
          <motion.div
            key={mimo.id + (subtitle ?? "")}
            variants={popInVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pointer-events-auto relative w-full max-w-sm rounded-3xl border-2 border-blush/35 bg-surface p-4 shadow-xl"
          >
            {/* Floating pastel hearts */}
            {!prefersReduced && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 right-10 flex gap-2 text-blush"
              >
                <motion.span
                  initial={{ opacity: 0, y: 8, scale: 0.7 }}
                  animate={{ opacity: [0, 1, 0], y: -14, scale: 1.1 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 10, scale: 0.6 }}
                  animate={{ opacity: [0, 1, 0], y: -18, scale: 1 }}
                  transition={{ duration: 1.6, delay: 0.15, ease: "easeOut" }}
                >
                  <Heart className="h-3.5 w-3.5 fill-current text-mint" />
                </motion.span>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="shrink-0 rounded-2xl bg-blush-soft/50 p-1">
                <MascotAvatar
                  mascot={mimo.mascot}
                  mood="cheering"
                  className="h-14 w-14"
                  decorative
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <Badge tone="blush">{subtitle ?? mimo.badge}</Badge>
                  <button
                    type="button"
                    onClick={onDismiss}
                    aria-label="Fechar recadinho de incentivo"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-cream hover:text-ink"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <p className="mt-2 text-xs font-medium leading-relaxed text-ink sm:text-sm">
                  {mimo.text}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
