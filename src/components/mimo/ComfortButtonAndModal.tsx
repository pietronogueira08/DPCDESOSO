"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Pause, Play, RefreshCw, Wind, X } from "lucide-react";
import { MIMO_MESSAGES, pickRandomMessage } from "@/data/mimo-messages";
import { CachorrinhoMimo } from "@/components/mascots/AnimatedMascots";
import { SpringButton } from "@/components/ui/SpringButton";
import { PastelBadge } from "@/components/ui/PastelBadge";
import {
  SPRING_BOUNCY,
  attachDialogLightDismissFallback,
  useSafeMotion,
} from "@/lib/motion";

const BREATH_PHASES = [
  { label: "Inspira devagar...", seconds: 4, scale: 1.24, tone: "bg-[#D1FAE5] text-mint-ink border-[#10B981]" },
  { label: "Segura com carinho...", seconds: 4, scale: 1.24, tone: "bg-[#E0F2FE] text-sky-med-ink border-[#0EA5E9]" },
  { label: "Solta o ar devagar...", seconds: 4, scale: 0.92, tone: "bg-[#FCE7F3] text-rose-mimo-ink border-[#EC4899]" },
] as const;

export function ComfortButtonAndModal() {
  const { shouldReduceMotion } = useSafeMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState<string>(MIMO_MESSAGES.comfortModalNotes[0]);
  const [breathingActive, setBreathingActive] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(4);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const cleanupFallback = attachDialogLightDismissFallback(dialog);
    const onClose = () => {
      dialog.returnValue = "";
      setIsOpen(false);
      setBreathingActive(false);
    };

    dialog.addEventListener("close", onClose);
    return () => {
      cleanupFallback();
      dialog.removeEventListener("close", onClose);
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !breathingActive) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;
        setPhaseIdx((curr) => (curr + 1) % BREATH_PHASES.length);
        return 4;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isOpen, breathingActive]);

  const openComfortModal = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    setNote((prev) => pickRandomMessage(MIMO_MESSAGES.comfortModalNotes, prev));
    setPhaseIdx(0);
    setSecondsLeft(4);
    setBreathingActive(false);
    setIsOpen(true);
    if (!dialog.open) {
      dialog.showModal();
    }
  };

  const closeComfortModal = () => {
    dialogRef.current?.close();
  };

  const currentPhase = BREATH_PHASES[phaseIdx] ?? BREATH_PHASES[0];

  return (
    <>
      {/* Persistent floating bottom-right button */}
      <motion.button
        type="button"
        onClick={openComfortModal}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
        transition={SPRING_BOUNCY}
        aria-label="Abrir modal de carinho e respiração guiada"
        className="fixed bottom-4 right-4 z-30 flex items-center gap-2 rounded-full border border-[#FBCFE8] bg-surface/95 py-1.5 pl-2 pr-4 shadow-kawaii-hover backdrop-blur-md transition-colors hover:bg-rose-mimo-soft/60"
      >
        <CachorrinhoMimo mood="love" size="sm" className="-my-2" />
        <span className="font-display text-xs font-extrabold text-rose-mimo-ink sm:text-sm">
          Carinho / Respiro 💕
        </span>
      </motion.button>

      {/* Native top-layer modal dialog */}
      <dialog
        ref={dialogRef}
        closedby="any"
        aria-labelledby="comfort-modal-title"
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl border border-[#FBCFE8] bg-canvas p-0 text-ink shadow-2xl"
      >
        <div className="relative p-5 sm:p-7">
          <button
            type="button"
            onClick={closeComfortModal}
            aria-label="Fechar cantinho de carinho"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border-warm bg-surface text-ink-secondary transition-colors hover:bg-rose-mimo-soft hover:text-rose-mimo-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="flex flex-col items-center text-center">
            <PastelBadge tone="rose" className="mb-2">
              <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              Cantinho da Sophia
            </PastelBadge>

            <CachorrinhoMimo mood="love" size="lg" />

            <h1
              id="comfort-modal-title"
              className="mt-2 font-display text-2xl font-extrabold text-ink"
            >
              Respira fundo, amor 💕
            </h1>

            <div className="mt-4 w-full rounded-2xl border border-[#FBCFE8] bg-rose-mimo-soft/45 p-4 text-left">
              <p className="text-sm font-medium leading-relaxed text-ink">
                {note}
              </p>
              <div className="mt-3 flex justify-end">
                <SpringButton
                  variant="soft"
                  size="sm"
                  onClick={() =>
                    setNote((prev) =>
                      pickRandomMessage(MIMO_MESSAGES.comfortModalNotes, prev)
                    )
                  }
                >
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                  Quero outro recadinho 💌
                </SpringButton>
              </div>
            </div>

            {/* Interactive 4-4-4 Breathing Circle */}
            <div className="mt-5 w-full rounded-2xl border border-border-warm bg-surface p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-display text-sm font-extrabold text-ink">
                  <Wind className="h-4 w-4 text-sky-med" aria-hidden="true" />
                  Respiração 4-4-4 anti-ansiedade
                </span>
                <SpringButton
                  variant={breathingActive ? "soft" : "mint"}
                  size="sm"
                  autoFocus
                  onClick={() => {
                    if (!breathingActive) {
                      setPhaseIdx(0);
                      setSecondsLeft(4);
                    }
                    setBreathingActive((prev) => !prev);
                  }}
                >
                  {breathingActive ? (
                    <>
                      <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                      Começar 4-4-4
                    </>
                  )}
                </SpringButton>
              </div>

              <div className="mt-5 flex flex-col items-center justify-center py-3">
                <motion.div
                  animate={
                    shouldReduceMotion || !breathingActive
                      ? { scale: 1 }
                      : { scale: currentPhase.scale }
                  }
                  transition={{ duration: 3.6, ease: "easeInOut" }}
                  className={`flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 shadow-sm transition-colors ${
                    breathingActive
                      ? currentPhase.tone
                      : "border-border-warm bg-cream text-ink-secondary"
                  }`}
                >
                  <span className="font-display text-2xl font-extrabold">
                    {breathingActive ? `${secondsLeft}s` : "4·4·4"}
                  </span>
                </motion.div>
                <p className="mt-4 font-display text-sm font-bold text-ink">
                  {breathingActive
                    ? currentPhase.label
                    : "Inspira 4s · Segura 4s · Solta 4s"}
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs font-semibold text-ink-secondary">
              Feito com todo amor pelo Pietro 💚
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
