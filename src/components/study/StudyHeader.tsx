"use client";

import { useEffect, useRef } from "react";
import { RotateCcw, Sparkles, Trophy, BookOpenCheck, Layers } from "lucide-react";
import { BunnyDoctor, type MascotMood } from "@/components/mascots/KawaiiMascots";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { COURSE_META, type AulaId } from "@/data/dpc-content";

export type AulaFilter = "all" | AulaId;

interface StudyHeaderProps {
  overallMasteryPercent: number;
  sectionsDone: number;
  totalSections: number;
  flashcardsDone: number;
  totalFlashcards: number;
  quizDone: number;
  totalQuestions: number;
  bestStreak: number;
  aulaFilter: AulaFilter;
  onChangeFilter: (filter: AulaFilter) => void;
  onResetProgress: () => void;
}

const FILTER_OPTIONS: { id: AulaFilter; label: string; shortLabel: string }[] = [
  { id: "all", label: "Tudo (13 + 14)", shortLabel: "Tudo" },
  { id: "aula13", label: "Aula 13 (Publicações)", shortLabel: "Aula 13" },
  { id: "aula14", label: "Aula 14 (Projeto & IA)", shortLabel: "Aula 14" },
];

export function StudyHeader({
  overallMasteryPercent,
  sectionsDone,
  totalSections,
  flashcardsDone,
  totalFlashcards,
  quizDone,
  totalQuestions,
  bestStreak,
  aulaFilter,
  onChangeFilter,
  onResetProgress,
}: StudyHeaderProps) {
  const resetDialogRef = useRef<HTMLDialogElement>(null);

  // Light-dismiss fallback for browsers without native dialog closedby support
  useEffect(() => {
    const dialog = resetDialogRef.current;
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

  const mascotMood: MascotMood =
    overallMasteryPercent >= 80
      ? "cheering"
      : overallMasteryPercent >= 35
      ? "love"
      : "happy";

  return (
    <header className="mb-6 rounded-3xl border border-border-warm bg-surface p-5 shadow-cozy sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="shrink-0 rounded-3xl border border-mint/25 bg-mint-soft/45 p-1.5">
            <BunnyDoctor mood={mascotMood} className="h-16 w-16 sm:h-20 sm:w-20" />
          </div>
          <div className="min-w-0">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <Badge tone="mint">FMC • DPC {COURSE_META.term}</Badge>
              <Badge tone="blush">Prova no papo 💕</Badge>
            </div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Cantinho de Estudos • DPC
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              Aula 13 (Publicações Científicas) &amp; Aula 14 (Projeto, Formatação e Declaração de IA)
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:min-w-[300px] lg:max-w-sm lg:flex-1">
          <ProgressBar
            value={overallMasteryPercent}
            label="Domínio geral da matéria"
            tone="mint"
          />
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-ink-muted">
            <span className="inline-flex items-center gap-1 rounded-xl bg-cream px-2.5 py-1 text-ink">
              <BookOpenCheck className="h-3.5 w-3.5 text-mint-ink" aria-hidden="true" />
              {sectionsDone}/{totalSections} tópicos
            </span>
            <span className="inline-flex items-center gap-1 rounded-xl bg-cream px-2.5 py-1 text-ink">
              <Layers className="h-3.5 w-3.5 text-lavender-ink" aria-hidden="true" />
              {flashcardsDone}/{totalFlashcards} cards
            </span>
            <span className="inline-flex items-center gap-1 rounded-xl bg-cream px-2.5 py-1 text-ink">
              <Sparkles className="h-3.5 w-3.5 text-blush-ink" aria-hidden="true" />
              {quizDone}/{totalQuestions} quiz
            </span>
            {bestStreak > 0 && (
              <span className="inline-flex items-center gap-1 rounded-xl bg-blush-soft px-2.5 py-1 text-blush-ink">
                <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
                Recorde: {bestStreak}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Global Aula filter + Reset action */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border-warm pt-4">
        <div
          role="group"
          aria-label="Filtrar conteúdo por aula"
          className="flex flex-wrap items-center gap-2"
        >
          <span className="mr-1 text-xs font-bold uppercase tracking-wider text-ink-muted">
            Foco:
          </span>
          {FILTER_OPTIONS.map((option) => {
            const active = aulaFilter === option.id;
            const activeStyle =
              option.id === "aula14"
                ? "bg-lavender text-white border-lavender"
                : option.id === "aula13"
                ? "bg-mint-deep text-white border-mint-deep"
                : "bg-ink text-white border-ink";
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => onChangeFilter(option.id)}
                className={`min-h-[36px] rounded-full border px-3.5 py-1 text-xs font-bold transition-colors sm:text-sm ${
                  active
                    ? activeStyle
                    : "border-border-warm bg-cream text-ink hover:bg-mint-soft/40"
                }`}
              >
                <span className="sm:hidden">{option.shortLabel}</span>
                <span className="hidden sm:inline">{option.label}</span>
              </button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => resetDialogRef.current?.showModal()}
          aria-label="Resetar progresso salvo"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Resetar progresso</span>
        </Button>
      </div>

      {/* Native <dialog> for reset confirmation */}
      <dialog
        ref={resetDialogRef}
        closedby="any"
        aria-labelledby="reset-dialog-title"
        className="m-auto w-[min(92vw,420px)] rounded-3xl border border-border-warm bg-surface p-6 text-ink shadow-2xl"
      >
        <h1
          id="reset-dialog-title"
          className="font-display text-xl font-extrabold text-ink"
        >
          Zerar progresso salvo?
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Isso apaga os tópicos marcados como revisados, flashcards dominados e histórico do quiz deste navegador.
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-2.5">
          <Button
            variant="outline"
            size="md"
            autoFocus
            onClick={() => resetDialogRef.current?.close()}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={() => {
              onResetProgress();
              resetDialogRef.current?.close();
            }}
          >
            Sim, resetar tudo
          </Button>
        </div>
      </dialog>
    </header>
  );
}
