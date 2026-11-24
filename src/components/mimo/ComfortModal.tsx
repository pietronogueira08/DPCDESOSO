"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Wind, X } from "lucide-react";
import { MascotAvatar } from "@/components/mascots/KawaiiMascots";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MIMO_MESSAGES } from "@/data/dpc-content";
import { useSafeMotion } from "@/lib/motion";

const BREATH_PHASES = [
  "Inspira bem devagar...",
  "Segura o ar com calma...",
  "Solta todo o cansaço...",
] as const;

export function ComfortModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [heartBurstCount, setHeartBurstCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [breathStep, setBreathStep] = useState(0);
  const { prefersReduced } = useSafeMotion();

  // Light-dismiss fallback for browsers without native dialog closedby support
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || "closedBy" in HTMLDialogElement.prototype) return;

    const outside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };

    let pressedOutside = false;
    const onPointerDown = (e: PointerEvent) => {
      pressedOutside = outside(e);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (pressedOutside && outside(e)) {
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
  }, []);

  // Cycle breathing prompt text while modal is open
  useEffect(() => {
    if (!isOpen) return;
    setBreathStep(0);
    const id = window.setInterval(() => {
      setBreathStep((s) => (s + 1) % BREATH_PHASES.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, [isOpen]);

  const openModal = () => {
    const randomIdx = Math.floor(Math.random() * MIMO_MESSAGES.length);
    setMessageIndex(randomIdx);
    setHeartBurstCount((c) => c + 1);
    setIsOpen(true);
    dialogRef.current?.showModal();
  };

  const nextNote = () => {
    setMessageIndex((prev) => (prev + 1) % MIMO_MESSAGES.length);
    setHeartBurstCount((c) => c + 1);
  };

  const currentMimo = MIMO_MESSAGES[messageIndex] ?? MIMO_MESSAGES[0];

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="fixed bottom-4 right-4 z-30 inline-flex min-h-[46px] items-center gap-2 rounded-full border border-blush-deep/20 bg-blush px-4 py-2.5 text-xs font-extrabold text-white shadow-lg transition-transform hover:scale-[1.03] hover:bg-blush-deep active:scale-[0.98] sm:bottom-6 sm:right-6 sm:text-sm"
      >
        <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
        <span>Preciso de um respiro 💕</span>
      </button>

      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby="comfort-modal-title"
        onClose={() => setIsOpen(false)}
        className="m-auto w-[min(92vw,460px)] rounded-3xl border border-blush/30 bg-surface p-6 text-ink shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge tone="blush">{currentMimo.badge}</Badge>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Fechar janela de respiro"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cream text-ink-muted transition-colors hover:bg-blush-soft hover:text-blush-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <h1
          id="comfort-modal-title"
          className="mt-3 font-display text-xl font-extrabold text-ink sm:text-2xl"
        >
          Pausa fofinha de estudos 🌸
        </h1>

        <div className="relative mt-4 flex flex-col items-center gap-3 rounded-2xl border border-border-warm bg-cream/70 p-4 text-center">
          {/* Heart burst animation on click */}
          {!prefersReduced && heartBurstCount > 0 && (
            <div
              key={heartBurstCount}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-2 flex justify-center gap-6"
            >
              <motion.span
                initial={{ opacity: 0, y: 6, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], y: -22, scale: 1.25 }}
                transition={{ duration: 1.1 }}
                className="text-blush"
              >
                <Heart className="h-4 w-4 fill-current" />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 8, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], y: -26, scale: 1.15 }}
                transition={{ duration: 1.25, delay: 0.12 }}
                className="text-mint"
              >
                <Sparkles className="h-4 w-4" />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 6, scale: 0.6 }}
                animate={{ opacity: [0, 1, 0], y: -20, scale: 1.2 }}
                transition={{ duration: 1.15, delay: 0.2 }}
                className="text-lavender"
              >
                <Heart className="h-4 w-4 fill-current" />
              </motion.span>
            </div>
          )}

          <MascotAvatar
            mascot={currentMimo.mascot}
            mood="love"
            className="h-24 w-24"
          />

          <p className="text-sm font-semibold leading-relaxed text-ink">
            {currentMimo.text}
          </p>
        </div>

        {/* 4-second breathing circle */}
        <div className="mt-4 flex items-center gap-4 rounded-2xl border border-mint/25 bg-mint-soft/35 p-4">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
            {prefersReduced ? (
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-mint bg-white text-mint-ink">
                <Wind className="h-5 w-5" aria-hidden="true" />
              </div>
            ) : (
              <motion.div
                animate={{
                  scale: [0.85, 1.18, 0.85],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-mint bg-white text-mint-ink shadow-sm"
              >
                <Wind className="h-5 w-5" aria-hidden="true" />
              </motion.div>
            )}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-extrabold uppercase tracking-wider text-mint-ink">
              Ciclo de respiração (4s)
            </div>
            <p className="mt-0.5 text-sm font-bold text-ink">
              {BREATH_PHASES[breathStep]}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-between gap-2.5">
          <Button variant="blush" size="md" onClick={nextNote}>
            <span>Outro carinho 💌</span>
          </Button>
          <Button
            variant="mint"
            size="md"
            autoFocus
            onClick={() => dialogRef.current?.close()}
          >
            <span>Voltar aos estudos ✨</span>
          </Button>
        </div>
      </dialog>
    </>
  );
}
