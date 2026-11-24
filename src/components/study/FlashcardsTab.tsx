"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { CatResearcher } from "@/components/mascots/KawaiiMascots";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { FLASHCARDS, type FlashcardItem } from "@/data/dpc-content";
import type { AulaFilter } from "@/components/study/StudyHeader";
import { useSafeMotion } from "@/lib/motion";

type CardDeckFilter = "all" | "aula13" | "aula14" | "review";

interface FlashcardsTabProps {
  globalFilter: AulaFilter;
  masteredIds: string[];
  needsReviewIds: string[];
  onMarkMastered: (cardId: string) => void;
  onMarkConfused: (cardId: string) => void;
}

export function FlashcardsTab({
  globalFilter,
  masteredIds,
  needsReviewIds,
  onMarkMastered,
  onMarkConfused,
}: FlashcardsTabProps) {
  const [deckFilter, setDeckFilter] = useState<CardDeckFilter>(globalFilter);
  const [customOrder, setCustomOrder] = useState<string[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { prefersReduced, cardFlipVariants } = useSafeMotion();

  useEffect(() => {
    setDeckFilter(globalFilter);
    setCustomOrder(null);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [globalFilter]);

  const deck = useMemo<FlashcardItem[]>(() => {
    const filtered = FLASHCARDS.filter((card) => {
      if (deckFilter === "aula13") return card.aula === "aula13";
      if (deckFilter === "aula14") return card.aula === "aula14";
      if (deckFilter === "review") {
        return needsReviewIds.includes(card.id) || !masteredIds.includes(card.id);
      }
      return true;
    });

    if (!customOrder) return filtered;
    const rank = new Map(customOrder.map((id, idx) => [id, idx]));
    return [...filtered].sort(
      (a, b) => (rank.get(a.id) ?? 999) - (rank.get(b.id) ?? 999)
    );
  }, [customOrder, deckFilter, masteredIds, needsReviewIds]);

  const safeIndex = deck.length > 0 ? Math.min(currentIndex, deck.length - 1) : 0;
  const activeCard = deck[safeIndex] ?? null;

  const goToIndex = useCallback(
    (next: number) => {
      if (deck.length === 0) return;
      const wrapped = (next + deck.length) % deck.length;
      setIsFlipped(false);
      setCurrentIndex(wrapped);
    },
    [deck.length]
  );

  // Spacebar flips card when focus is not inside another interactive control or open modal
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space") return;
      if (document.querySelector("dialog[open]")) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        target.closest("button, a, input, select, textarea, [role='tab']") &&
        target.getAttribute("data-flashcard-surface") !== "true"
      ) {
        return;
      }
      if (activeCard) {
        event.preventDefault();
        setIsFlipped((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCard]);

  const handleShuffle = () => {
    const ids = deck.map((c) => c.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setCustomOrder(ids);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const masteredPercent = Math.round(
    (masteredIds.length / FLASHCARDS.length) * 100
  );

  return (
    <div className="space-y-5">
      {/* Controls & filters */}
      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: "all", label: `Todos (${FLASHCARDS.length})` },
                { id: "aula13", label: "Aula 13 (8)" },
                { id: "aula14", label: "Aula 14 (8)" },
                { id: "review", label: "Só os que preciso revisar" },
              ] as const
            ).map((opt) => {
              const active = deckFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setDeckFilter(opt.id);
                    setCustomOrder(null);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                  className={`min-h-[36px] rounded-full border px-3.5 py-1 text-xs font-bold transition-colors sm:text-sm ${
                    active
                      ? "border-lavender bg-lavender text-white"
                      : "border-border-warm bg-cream text-ink hover:bg-lavender-soft/40"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-44 sm:w-52">
              <ProgressBar
                value={masteredPercent}
                label={`Dominados: ${masteredIds.length}/${FLASHCARDS.length}`}
                tone="lavender"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShuffle}
              disabled={deck.length <= 1}
              aria-label="Embaralhar baralho de flashcards"
            >
              <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Embaralhar</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Card Stage */}
      {!activeCard ? (
        <Card tone="mint" className="text-center">
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-6">
            <CatResearcher mood="cheering" className="h-24 w-24" />
            <h2 className="font-display text-2xl font-extrabold text-mint-ink">
              Zero flashcards pendentes!
            </h2>
            <p className="text-sm text-ink-muted">
              Você já marcou todos os 16 cards como dominados! Pode voltar para Todos para fazer uma revisão rápida antes da prova.
            </p>
            <Button
              variant="mint"
              onClick={() => {
                setDeckFilter("all");
                setCurrentIndex(0);
              }}
            >
              Ver todos os flashcards
            </Button>
          </div>
        </Card>
      ) : (
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-ink-muted sm:text-sm">
            <span>
              Card {safeIndex + 1} de {deck.length}
            </span>
            <span>Dica: clique no card ou aperte Barra de Espaço para virar</span>
          </div>

          {/* 3D Flip Container */}
          <div className="perspective-1200">
            <motion.button
              type="button"
              data-flashcard-surface="true"
              onClick={() => setIsFlipped((f) => !f)}
              aria-label={
                isFlipped
                  ? `Verso do flashcard ${activeCard.topic}. Clique para voltar à frente.`
                  : `Frente do flashcard ${activeCard.topic}. Clique para revelar a resposta.`
              }
              animate={isFlipped ? "back" : "front"}
              variants={cardFlipVariants}
              className={`relative block min-h-[300px] w-full cursor-pointer rounded-3xl text-left focus-visible:outline-none sm:min-h-[320px] ${
                prefersReduced ? "" : "preserve-3d"
              }`}
            >
              {/* Front Face */}
              <span
                className={`${
                  prefersReduced
                    ? isFlipped
                      ? "hidden"
                      : "flex"
                    : "backface-hidden absolute inset-0 flex"
                } min-h-[300px] w-full flex-col justify-between rounded-3xl border-2 border-border-warm bg-surface p-6 shadow-cozy sm:min-h-[320px] sm:p-8`}
              >
                <span className="flex flex-wrap items-center justify-between gap-2">
                  <Badge tone={activeCard.aula === "aula13" ? "mint" : "lavender"}>
                    {activeCard.aula === "aula13" ? "Aula 13" : "Aula 14"} •{" "}
                    {activeCard.topic}
                  </Badge>
                  {masteredIds.includes(activeCard.id) ? (
                    <Badge tone="mint">Dominado ✓</Badge>
                  ) : needsReviewIds.includes(activeCard.id) ? (
                    <Badge tone="blush">Revisar 🐾</Badge>
                  ) : null}
                </span>

                <span className="my-auto block py-4">
                  <span className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-ink-muted">
                    Pergunta
                  </span>
                  <span className="block font-display text-lg font-extrabold leading-snug text-ink sm:text-2xl">
                    {activeCard.front}
                  </span>
                </span>

                <span className="flex items-center justify-between text-xs font-bold text-lavender-ink">
                  <span>Toque para virar e ver a resposta</span>
                  <RotateCw className="h-4 w-4" aria-hidden="true" />
                </span>
              </span>

              {/* Back Face */}
              <span
                className={`${
                  prefersReduced
                    ? isFlipped
                      ? "flex"
                      : "hidden"
                    : "backface-hidden rotate-y-180 absolute inset-0 flex"
                } min-h-[300px] w-full flex-col justify-between rounded-3xl border-2 border-mint/40 bg-mint-soft/25 p-6 shadow-cozy sm:min-h-[320px] sm:p-8`}
              >
                <span className="flex items-center justify-between gap-2">
                  <Badge tone="mint">Resposta Oficial da Aula</Badge>
                  <span className="text-xs font-bold text-mint-ink">
                    {activeCard.topic}
                  </span>
                </span>

                <span className="my-auto block space-y-3 py-3">
                  <span className="block text-sm font-medium leading-relaxed text-ink sm:text-base">
                    {activeCard.back}
                  </span>
                  <span className="block rounded-2xl border border-blush/25 bg-white/90 p-3 text-xs text-ink">
                    <strong className="font-extrabold text-blush-ink">
                      Dica rápida:
                    </strong>{" "}
                    {activeCard.dicaRapida}
                  </span>
                </span>

                <span className="flex items-center justify-between text-xs font-bold text-mint-ink">
                  <span>Clique novamente para ver a pergunta</span>
                  <RotateCw className="h-4 w-4" aria-hidden="true" />
                </span>
              </span>
            </motion.button>
          </div>

          {/* Mastery & Navigation Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  onMarkConfused(activeCard.id);
                  goToIndex(safeIndex + 1);
                }}
              >
                <span>Ainda tô confusa 🐾</span>
              </Button>
              <Button
                variant="mint"
                size="md"
                onClick={() => {
                  onMarkMastered(activeCard.id);
                  goToIndex(safeIndex + 1);
                }}
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Dominei! ✨</span>
              </Button>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToIndex(safeIndex - 1)}
                aria-label="Flashcard anterior"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Anterior</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToIndex(safeIndex + 1)}
                aria-label="Próximo flashcard"
              >
                <span>Próximo</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
