"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  RotateCw,
  Sparkles,
} from "lucide-react";
import { FLASHCARDS, type Flashcard } from "@/data/flashcards";
import {
  PHYSIOLOGY_TOPICS,
  PHYSIOLOGY_TRACKS,
  type TrackId,
} from "@/data/physiology-tracks";
import { TrackMascot } from "@/components/mascots/AnimatedMascots";
import { AnimatedProgressBar } from "@/components/ui/AnimatedProgressBar";
import { KawaiiCard } from "@/components/ui/KawaiiCard";
import { PastelBadge } from "@/components/ui/PastelBadge";
import { SpringButton } from "@/components/ui/SpringButton";
import { FLASHCARD_FLIP, useSafeMotion } from "@/lib/motion";

interface FlashcardsViewProps {
  masteredFlashcards: readonly string[];
  onSetMastered: (cardId: string, mastered: boolean) => void;
  onMilestoneReached: (newCount: number) => void;
}

export function FlashcardsView({
  masteredFlashcards,
  onSetMastered,
  onMilestoneReached,
}: FlashcardsViewProps) {
  const { shouldReduceMotion } = useSafeMotion();
  const [trackFilter, setTrackFilter] = useState<TrackId | "all">("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [onlyNeedsReview, setOnlyNeedsReview] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const availableTopics = useMemo(
    () =>
      PHYSIOLOGY_TOPICS.filter(
        (t) => trackFilter === "all" || t.trackId === trackFilter
      ),
    [trackFilter]
  );

  const filteredCards = useMemo(() => {
    return FLASHCARDS.filter((card) => {
      if (trackFilter !== "all" && card.trackId !== trackFilter) return false;
      if (topicFilter !== "all" && card.topicId !== topicFilter) return false;
      if (onlyNeedsReview && masteredFlashcards.includes(card.id)) return false;
      return true;
    });
  }, [trackFilter, topicFilter, onlyNeedsReview, masteredFlashcards]);

  const safeIndex =
    filteredCards.length > 0 ? Math.min(currentIndex, filteredCards.length - 1) : 0;
  const activeCard: Flashcard | undefined = filteredCards[safeIndex];
  const activeTopic = activeCard
    ? PHYSIOLOGY_TOPICS.find((t) => t.id === activeCard.topicId)
    : undefined;

  const goNext = () => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const goPrev = () => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex(
      (prev) => (prev - 1 + filteredCards.length) % filteredCards.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (
        tag === "input" ||
        tag === "select" ||
        tag === "textarea" ||
        tag === "button" ||
        tag === "a" ||
        target?.isContentEditable
      ) {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (filteredCards.length > 0) {
          setIsFlipped(false);
          setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (filteredCards.length > 0) {
          setIsFlipped(false);
          setCurrentIndex(
            (prev) => (prev - 1 + filteredCards.length) % filteredCards.length
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredCards.length]);

  const handleMarkCard = (mastered: boolean) => {
    if (!activeCard) return;
    const wasMastered = masteredFlashcards.includes(activeCard.id);
    onSetMastered(activeCard.id, mastered);

    if (mastered && !wasMastered) {
      const nextCount = masteredFlashcards.length + 1;
      if (nextCount % 5 === 0) {
        onMilestoneReached(nextCount);
      }
    }

    if (filteredCards.length > 1) {
      setIsFlipped(false);
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }
  };

  return (
    <section aria-label="Flashcards 3D de Revisão Ativa" className="space-y-5">
      {/* Filter Bar */}
      <KawaiiCard className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PastelBadge tone="berry">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              42 Flashcards 3D
            </PastelBadge>
            <span className="text-xs font-bold text-ink-secondary">
              {masteredFlashcards.length}/42 dominados
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setOnlyNeedsReview((prev) => !prev);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            aria-pressed={onlyNeedsReview}
            className={`rounded-2xl border px-3 py-1.5 font-display text-xs font-bold transition-colors ${
              onlyNeedsReview
                ? "border-rose-mimo bg-rose-mimo text-white"
                : "border-border-warm bg-cream text-ink-secondary hover:text-ink"
            }`}
          >
            Só os que preciso revisar
          </button>
        </div>

        <div className="mt-3">
          <AnimatedProgressBar
            value={masteredFlashcards.length}
            max={FLASHCARDS.length}
            tone="berry"
            label="Progresso de flashcards dominados"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => {
                setTrackFilter("all");
                setTopicFilter("all");
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`rounded-xl border px-3 py-1.5 font-display text-xs font-bold transition-colors ${
                trackFilter === "all"
                  ? "border-ink bg-ink text-white"
                  : "border-border-warm bg-surface text-ink-secondary hover:text-ink"
              }`}
            >
              Todas (42)
            </button>
            {PHYSIOLOGY_TRACKS.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  setTrackFilter(track.id);
                  setTopicFilter("all");
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`rounded-xl border px-3 py-1.5 font-display text-xs font-bold transition-colors ${
                  trackFilter === track.id
                    ? "border-berry bg-berry text-white"
                    : "border-border-warm bg-surface text-ink-secondary hover:text-ink"
                }`}
              >
                {track.shortName}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-72">
            <label htmlFor="flashcard-topic-select" className="sr-only">
              Filtrar por tópico
            </label>
            <select
              id="flashcard-topic-select"
              value={topicFilter}
              onChange={(e) => {
                setTopicFilter(e.target.value);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="w-full rounded-2xl border border-border-warm bg-cream px-3 py-2 text-xs font-semibold text-ink"
            >
              <option value="all">Todos os tópicos do filtro</option>
              {availableTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  #{String(t.order).padStart(2, "0")} · {t.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </KawaiiCard>

      {/* Active Flashcard Stage */}
      {!activeCard ? (
        <KawaiiCard tone="mint" className="p-8 text-center">
          <p className="font-display text-lg font-extrabold text-mint-ink">
            Você já dominou todas as cartas desse filtro, gatinha! 🎉✨
          </p>
          <p className="mt-1 text-sm font-medium text-ink-secondary">
            Desmarque &ldquo;Só os que preciso revisar&rdquo; para fazer uma revisão geral antes da prova.
          </p>
        </KawaiiCard>
      ) : (
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-ink-secondary">
            <span>
              Carta {safeIndex + 1} de {filteredCards.length}
            </span>
            <span className="hidden sm:inline">
              Atalhos: Espaço (virar) · ← / → (navegar)
            </span>
          </div>

          {/* 3D Flip Card */}
          <div className="perspective-1200">
            <div
              role="button"
              tabIndex={0}
              aria-pressed={isFlipped}
              aria-label="Virar flashcard entre pergunta e resposta"
              onClick={() => setIsFlipped((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.code === "Space") {
                  e.preventDefault();
                  setIsFlipped((prev) => !prev);
                }
              }}
              className="cursor-pointer rounded-3xl focus-visible:outline-none"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : FLASHCARD_FLIP.transition}
                className="preserve-3d relative min-h-[300px] w-full sm:min-h-[330px]"
              >
                {/* FRONT */}
                <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-3xl border border-border-warm bg-surface p-6 shadow-kawaii sm:p-7">
                  <div className="flex items-center justify-between gap-2">
                    <PastelBadge
                      tone={
                        activeCard.trackId === "gi"
                          ? "mint"
                          : activeCard.trackId === "renal"
                          ? "sky"
                          : "berry"
                      }
                    >
                      {activeTopic ? `#${String(activeTopic.order).padStart(2, "0")} · ${activeTopic.title}` : activeCard.trackId}
                    </PastelBadge>
                    <PastelBadge
                      tone={
                        masteredFlashcards.includes(activeCard.id)
                          ? "mint"
                          : "neutral"
                      }
                    >
                      {masteredFlashcards.includes(activeCard.id)
                        ? "Dominado ✓"
                        : "Frente"}
                    </PastelBadge>
                  </div>

                  <div className="my-auto py-4 text-center">
                    <p className="font-display text-lg font-extrabold leading-relaxed text-ink sm:text-xl">
                      {activeCard.front}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-ink-secondary">
                    <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                    Toque para revelar a resposta
                  </div>
                </div>

                {/* BACK */}
                <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-3xl border border-[#DDD6FE] bg-gradient-to-br from-surface to-[#EDE9FE]/45 p-6 shadow-kawaii sm:p-7">
                  <div className="flex items-center justify-between gap-2">
                    <PastelBadge tone="rose">Resposta Fisiológica</PastelBadge>
                    <TrackMascot trackId={activeCard.trackId} mood="cheering" size="sm" />
                  </div>

                  <div className="my-auto space-y-3 py-2">
                    <p className="text-sm font-semibold leading-relaxed text-ink sm:text-base">
                      {activeCard.back}
                    </p>
                    <div className="rounded-2xl border border-amber-trap-border bg-amber-trap-soft/70 p-3 text-xs font-medium leading-relaxed text-ink">
                      <span className="font-display font-extrabold text-amber-trap-ink">
                        Dica clínica:{" "}
                      </span>
                      {activeCard.clinicalTip}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-ink-secondary">
                    <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                    Toque para voltar à pergunta
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Card Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SpringButton variant="soft" size="sm" onClick={goPrev}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Anterior
              </SpringButton>
              <SpringButton variant="soft" size="sm" onClick={goNext}>
                Próxima
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </SpringButton>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <SpringButton
                variant="soft"
                size="md"
                onClick={() => handleMarkCard(false)}
              >
                Revisar de novo 🐾
              </SpringButton>
              <SpringButton
                variant="mint"
                size="md"
                onClick={() => handleMarkCard(true)}
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Dominei, gatinha! ✨
              </SpringButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
