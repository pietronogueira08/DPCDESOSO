"use client";

import React, { useEffect, useRef } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock,
  ExternalLink,
  PlayCircle,
  X,
} from "lucide-react";
import type { PhysiologyTopic } from "@/data/physiology-tracks";
import { TrackMascot } from "@/components/mascots/AnimatedMascots";
import { PastelBadge } from "@/components/ui/PastelBadge";
import { SpringButton } from "@/components/ui/SpringButton";
import { attachDialogLightDismissFallback } from "@/lib/motion";

interface TopicModalProps {
  topic: PhysiologyTopic | null;
  isReviewed: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  onClose: () => void;
  onToggleReviewed: (topic: PhysiologyTopic) => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export function TopicModal({
  topic,
  isReviewed,
  hasPrev,
  hasNext,
  onClose,
  onToggleReviewed,
  onNavigate,
}: TopicModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const cleanupFallback = attachDialogLightDismissFallback(dialog);
    const handleClose = () => {
      dialog.returnValue = "";
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    return () => {
      cleanupFallback();
      dialog.removeEventListener("close", handleClose);
    };
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (topic) {
      if (!dialog.open) {
        dialog.showModal();
      }
      contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
    } else if (dialog.open) {
      dialog.close();
    }
  }, [topic]);

  const badgeTone =
    topic?.trackId === "gi"
      ? "mint"
      : topic?.trackId === "renal"
      ? "sky"
      : "berry";

  const buttonVariant =
    topic?.trackId === "gi"
      ? "mint"
      : topic?.trackId === "renal"
      ? "sky"
      : "berry";

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="topic-modal-title"
      className="m-auto max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-3xl overflow-hidden rounded-3xl border border-border-warm bg-canvas p-0 text-ink shadow-2xl"
    >
      {topic && (
        <div className="flex max-h-[90dvh] flex-col">
          {/* Sticky Header */}
          <div className="flex items-start justify-between gap-3 border-b border-border-warm bg-surface px-5 py-4 sm:px-6">
            <div className="flex items-start gap-3">
              <TrackMascot
                trackId={topic.trackId}
                mood={isReviewed ? "cheering" : "studying"}
                size="sm"
                className="hidden sm:block"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <PastelBadge tone={badgeTone}>
                    Tópico #{String(topic.order).padStart(2, "0")}
                  </PastelBadge>
                  <PastelBadge tone="neutral">
                    Dia {topic.dayPlan} · <Clock className="h-3 w-3" aria-hidden="true" />{" "}
                    {topic.estimatedMinutes} min
                  </PastelBadge>
                  {isReviewed && (
                    <PastelBadge tone="mint">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      Revisado
                    </PastelBadge>
                  )}
                </div>
                <h1
                  id="topic-modal-title"
                  className="font-display text-lg font-extrabold leading-snug text-ink sm:text-xl"
                >
                  {topic.title}
                </h1>
              </div>
            </div>

            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Fechar resumo do tópico"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-warm bg-canvas text-ink-secondary transition-colors hover:bg-rose-mimo-soft hover:text-rose-mimo-ink"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Scrollable Medical Content */}
          <div ref={contentRef} className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
            <p className="rounded-2xl border border-border-warm bg-surface p-4 text-sm font-medium leading-relaxed text-ink-secondary">
              {topic.shortSummary}
            </p>

            {/* Key Concepts */}
            <div className="space-y-3">
              <h2 className="font-display text-base font-extrabold text-ink">
                Mecanismos &amp; Conceitos-Chave (Guyton / Silverthorn)
              </h2>
              <div className="grid grid-cols-1 gap-3.5">
                {topic.keyConcepts.map((concept) => (
                  <div
                    key={concept.title}
                    className="rounded-2xl border border-border-warm bg-surface p-4 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-sm font-extrabold text-ink sm:text-base">
                        {concept.title}
                      </h3>
                      {concept.referenceBadge && (
                        <PastelBadge tone={badgeTone}>
                          {concept.referenceBadge}
                        </PastelBadge>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs font-semibold text-ink-secondary sm:text-sm">
                      {concept.summary}
                    </p>
                    <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-ink sm:text-sm">
                      {concept.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-mimo-heart"
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Traps Box */}
            <div className="rounded-2xl border border-amber-trap-border bg-amber-trap-soft/75 p-4">
              <div className="flex items-center gap-2 font-display text-sm font-extrabold text-amber-trap-ink">
                <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                Pegadinhas Clássicas de Prova
              </div>
              <ul className="mt-2.5 space-y-2 text-xs font-medium leading-relaxed text-ink sm:text-sm">
                {topic.examTraps.map((trap) => (
                  <li key={trap} className="flex items-start gap-2">
                    <span className="font-extrabold text-amber-trap-ink" aria-hidden="true">
                      •
                    </span>
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Memory Anchor */}
            <div className="rounded-2xl border border-[#FBCFE8] bg-rose-mimo-soft/50 p-4">
              <div className="flex items-center gap-2 font-display text-sm font-extrabold text-rose-mimo-ink">
                <Brain className="h-4 w-4 shrink-0" aria-hidden="true" />
                Gancho de Memória da Dra. Sophia
              </div>
              <p className="mt-1.5 text-xs font-semibold leading-relaxed text-ink sm:text-sm">
                {topic.memoryAnchor}
              </p>
            </div>

            {/* Surgical YouTube Links */}
            <div className="rounded-2xl border border-border-warm bg-surface p-4">
              <p className="font-display text-xs font-extrabold uppercase tracking-wider text-ink-secondary">
                Aulas em Vídeo (Busca Direcionada)
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2.5">
                <a
                  href={topic.youtubePrimary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#B91C1C] px-4 py-2.5 font-display text-xs font-bold text-white shadow-sm transition-transform hover:scale-[1.02] sm:text-sm"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  {topic.youtubePrimary.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={topic.youtubeSecondary.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border-warm bg-cream px-4 py-2.5 font-display text-xs font-bold text-ink transition-colors hover:bg-rose-mimo-soft/50 sm:text-sm"
                >
                  {topic.youtubeSecondary.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Sticky Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-warm bg-surface px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <SpringButton
                variant="soft"
                size="sm"
                disabled={!hasPrev}
                onClick={() => onNavigate("prev")}
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Anterior
              </SpringButton>
              <SpringButton
                variant="soft"
                size="sm"
                disabled={!hasNext}
                onClick={() => onNavigate("next")}
              >
                Próximo
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </SpringButton>
            </div>

            <SpringButton
              variant={isReviewed ? "soft" : buttonVariant}
              size="md"
              autoFocus
              onClick={() => onToggleReviewed(topic)}
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {isReviewed ? "Revisado ✓ (Desmarcar)" : "Marcar como revisado ✓"}
            </SpringButton>
          </div>
        </div>
      )}
    </dialog>
  );
}
