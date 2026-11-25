"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Flame,
  Pause,
  Play,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { QUIZ_QUESTIONS, type QuizQuestion } from "@/data/quiz-questions";
import { PHYSIOLOGY_TOPICS, PHYSIOLOGY_TRACKS, type TrackId } from "@/data/physiology-tracks";
import { TrackMascot } from "@/components/mascots/AnimatedMascots";
import { AnimatedProgressBar } from "@/components/ui/AnimatedProgressBar";
import { KawaiiCard } from "@/components/ui/KawaiiCard";
import { PastelBadge } from "@/components/ui/PastelBadge";
import { SpringButton } from "@/components/ui/SpringButton";

type QuizScope = "all" | TrackId | "missed";
type QuizMode = "treino" | "prova";

interface QuizViewProps {
  quizAnswers: Record<string, number>;
  bestStreak: number;
  onRecordAnswer: (
    questionId: string,
    optionIndex: number,
    isCorrect: boolean,
    nextStreak: number,
    trackId: TrackId
  ) => void;
  onClearQuizAnswers: (questionIds?: string[]) => void;
}

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

export function QuizView({
  quizAnswers,
  bestStreak,
  onRecordAnswer,
  onClearQuizAnswers,
}: QuizViewProps) {
  const [scope, setScope] = useState<QuizScope>("all");
  const [mode, setMode] = useState<QuizMode>("treino");
  const [activeIndex, setActiveIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [retryIds, setRetryIds] = useState<string[] | null>(null);

  // Exam mode local draft answers + timer
  const [examDrafts, setExamDrafts] = useState<Record<string, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(35 * 60);

  const missedIds = useMemo(
    () =>
      QUIZ_QUESTIONS.filter(
        (q) =>
          quizAnswers[q.id] !== undefined && quizAnswers[q.id] !== q.correctIndex
      ).map((q) => q.id),
    [quizAnswers]
  );

  const questions = useMemo(() => {
    if (scope === "missed") {
      const targetIds = retryIds ?? missedIds;
      return QUIZ_QUESTIONS.filter((q) => targetIds.includes(q.id));
    }
    if (scope === "all") return QUIZ_QUESTIONS;
    return QUIZ_QUESTIONS.filter((q) => q.trackId === scope);
  }, [scope, missedIds, retryIds]);

  const safeIdx =
    questions.length > 0 ? Math.min(activeIndex, questions.length - 1) : 0;
  const currentQuestion: QuizQuestion | undefined = questions[safeIdx];
  const currentTopic = currentQuestion
    ? PHYSIOLOGY_TOPICS.find((t) => t.id === currentQuestion.topicId)
    : undefined;

  useEffect(() => {
    if (mode !== "prova" || !timerEnabled || examSubmitted) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [mode, timerEnabled, examSubmitted]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleTreinoSelect = (q: QuizQuestion, optIdx: number) => {
    const alreadyAnswered = quizAnswers[q.id] !== undefined;
    if (alreadyAnswered) return;

    const isCorrect = optIdx === q.correctIndex;
    const nextStreak = isCorrect ? streak + 1 : 0;
    setStreak(nextStreak);
    onRecordAnswer(q.id, optIdx, isCorrect, nextStreak, q.trackId);
  };

  const handleSubmitExam = () => {
    let runningStreak = 0;
    for (const q of questions) {
      const picked = examDrafts[q.id];
      if (picked !== undefined) {
        const isCorrect = picked === q.correctIndex;
        runningStreak = isCorrect ? runningStreak + 1 : 0;
        onRecordAnswer(q.id, picked, isCorrect, runningStreak, q.trackId);
      }
    }
    setExamSubmitted(true);
    setTimerEnabled(false);
  };

  const startMissedRetry = () => {
    const idsToRetry = [...missedIds];
    setRetryIds(idsToRetry);
    onClearQuizAnswers(idsToRetry);
    setScope("missed");
    setMode("treino");
    setActiveIndex(0);
    setExamSubmitted(false);
    setExamDrafts({});
  };

  const examScoreSummary = useMemo(() => {
    const total = questions.length;
    const correct = questions.filter(
      (q) => examDrafts[q.id] === q.correctIndex
    ).length;

    const byTrack = PHYSIOLOGY_TRACKS.map((track) => {
      const list = questions.filter((q) => q.trackId === track.id);
      const hits = list.filter((q) => examDrafts[q.id] === q.correctIndex).length;
      return { track, total: list.length, hits };
    }).filter((item) => item.total > 0);

    return { total, correct, byTrack };
  }, [questions, examDrafts]);

  const treinoAnsweredCount = questions.filter(
    (q) => quizAnswers[q.id] !== undefined
  ).length;

  const selectedAnswer = currentQuestion
    ? mode === "treino"
      ? quizAnswers[currentQuestion.id]
      : examDrafts[currentQuestion.id]
    : undefined;

  const showTreinoFeedback =
    mode === "treino" &&
    currentQuestion !== undefined &&
    selectedAnswer !== undefined;

  return (
    <section aria-label="Simulado de Fisiologia Médica" className="space-y-5">
      {/* Top Controls Card */}
      <KawaiiCard className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <PastelBadge tone="mint">
              <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Simulado Guyton / Silverthorn
            </PastelBadge>
            <PastelBadge tone="rose">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" />
              Sequência: {streak} (Recorde: {bestStreak})
            </PastelBadge>
          </div>

          {/* Mode Toggle */}
          <div className="inline-flex rounded-2xl border border-border-warm bg-cream p-1">
            <button
              type="button"
              onClick={() => {
                setMode("treino");
                setExamSubmitted(false);
              }}
              className={`rounded-xl px-3 py-1.5 font-display text-xs font-bold transition-colors ${
                mode === "treino"
                  ? "bg-surface text-ink shadow-sm"
                  : "text-ink-secondary hover:text-ink"
              }`}
            >
              Treino Comentado
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("prova");
                setExamSubmitted(false);
                setExamDrafts({});
                setActiveIndex(0);
                setSecondsLeft(Math.max(10, questions.length) * 90);
              }}
              className={`rounded-xl px-3 py-1.5 font-display text-xs font-bold transition-colors ${
                mode === "prova"
                  ? "bg-surface text-ink shadow-sm"
                  : "text-ink-secondary hover:text-ink"
              }`}
            >
              Modo Prova Real
            </button>
          </div>
        </div>

        {/* Scope Filters */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => {
                setRetryIds(null);
                setScope("all");
                setActiveIndex(0);
                setExamSubmitted(false);
              }}
              className={`rounded-xl border px-3 py-1.5 font-display text-xs font-bold ${
                scope === "all"
                  ? "border-ink bg-ink text-white"
                  : "border-border-warm bg-surface text-ink-secondary hover:text-ink"
              }`}
            >
              Simulado Geral (28)
            </button>
            {PHYSIOLOGY_TRACKS.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => {
                  setRetryIds(null);
                  setScope(track.id);
                  setActiveIndex(0);
                  setExamSubmitted(false);
                }}
                className={`rounded-xl border px-3 py-1.5 font-display text-xs font-bold ${
                  scope === track.id
                    ? "border-sky-med bg-sky-med text-white"
                    : "border-border-warm bg-surface text-ink-secondary hover:text-ink"
                }`}
              >
                {track.shortName} ({track.topicCount * 2})
              </button>
            ))}
            {missedIds.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setRetryIds(null);
                  setScope("missed");
                  setMode("treino");
                  setActiveIndex(0);
                }}
                className={`rounded-xl border px-3 py-1.5 font-display text-xs font-bold ${
                  scope === "missed"
                    ? "border-crimson bg-crimson text-white"
                    : "border-[#FECACA] bg-crimson-soft text-crimson"
                }`}
              >
                Só as que errei ({missedIds.length})
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {mode === "prova" && !examSubmitted && (
              <button
                type="button"
                onClick={() => setTimerEnabled((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#BAE6FD] bg-sky-med-soft/60 px-3 py-1.5 font-display text-xs font-bold text-sky-med-ink"
              >
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {formatTimer(secondsLeft)}
                {timerEnabled ? (
                  <Pause className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <Play className="h-3 w-3" aria-hidden="true" />
                )}
              </button>
            )}
            {mode === "treino" && treinoAnsweredCount > 0 && (
              <SpringButton
                variant="soft"
                size="sm"
                onClick={() => {
                  onClearQuizAnswers(questions.map((q) => q.id));
                  setStreak(0);
                  setActiveIndex(0);
                }}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Refazer filtro
              </SpringButton>
            )}
          </div>
        </div>

        <div className="mt-3">
          <AnimatedProgressBar
            value={
              mode === "treino"
                ? treinoAnsweredCount
                : Object.keys(examDrafts).filter((id) =>
                    questions.some((q) => q.id === id)
                  ).length
            }
            max={Math.max(1, questions.length)}
            tone="mint"
            label="Progresso no simulado"
          />
        </div>
      </KawaiiCard>

      {/* Exam Results View */}
      {mode === "prova" && examSubmitted ? (
        <KawaiiCard tone="mint" className="space-y-5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <PastelBadge tone="rose">Resultado da Prova Real</PastelBadge>
              <h2 className="font-display text-2xl font-extrabold text-ink">
                Você acertou {examScoreSummary.correct} de {examScoreSummary.total}{" "}
                questões, Sophia! 🎉
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {missedIds.length > 0 && (
                <SpringButton variant="rose" size="sm" onClick={startMissedRetry}>
                  Refazer só as que errei ({missedIds.length})
                </SpringButton>
              )}
              <SpringButton
                variant="soft"
                size="sm"
                onClick={() => {
                  setExamSubmitted(false);
                  setExamDrafts({});
                  setActiveIndex(0);
                }}
              >
                Nova Prova
              </SpringButton>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {examScoreSummary.byTrack.map(({ track, hits, total }) => (
              <div
                key={track.id}
                className="rounded-2xl border border-border-warm bg-surface p-4"
              >
                <div className="font-display text-sm font-extrabold text-ink">
                  {track.shortName}
                </div>
                <div className="mt-1 font-display text-xl font-extrabold text-mint-ink">
                  {hits}/{total} ({Math.round((hits / total) * 100)}%)
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {questions.map((q, idx) => {
              const picked = examDrafts[q.id];
              const isHit = picked === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border p-4 text-xs sm:text-sm ${
                    isHit
                      ? "border-[#A7F3D0] bg-mint-soft/30"
                      : "border-[#FECACA] bg-crimson-soft/35"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 font-display font-extrabold">
                    <span>
                      Questão {idx + 1} · {isHit ? "Acertou ✓" : "Errou ✗"}
                    </span>
                    <span className="text-ink-secondary">
                      Gabarito: {OPTION_LETTERS[q.correctIndex]}
                    </span>
                  </div>
                  <p className="mt-1.5 font-semibold text-ink">{q.prompt}</p>
                  <p className="mt-2 leading-relaxed text-ink-secondary">
                    <strong className="text-ink">Explicação: </strong>
                    {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </KawaiiCard>
      ) : !currentQuestion ? (
        <KawaiiCard className="p-8 text-center">
          <p className="font-display text-lg font-extrabold text-mint-ink">
            Nenhuma questão errada pendente aqui, amor! 💚
          </p>
          <SpringButton
            variant="mint"
            size="sm"
            className="mt-3"
            onClick={() => setScope("all")}
          >
            Voltar ao Simulado Geral
          </SpringButton>
        </KawaiiCard>
      ) : (
        /* Active Question Card */
        <KawaiiCard className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <PastelBadge
                tone={
                  currentQuestion.trackId === "gi"
                    ? "mint"
                    : currentQuestion.trackId === "renal"
                    ? "sky"
                    : "berry"
                }
              >
                Questão {safeIdx + 1}/{questions.length}
              </PastelBadge>
              <PastelBadge
                tone={currentQuestion.difficulty === "dificil" ? "amber" : "neutral"}
              >
                {currentQuestion.difficulty === "dificil"
                  ? "Nível Difícil"
                  : "Nível Médio"}
              </PastelBadge>
              {currentTopic && (
                <span className="text-xs font-semibold text-ink-secondary">
                  #{String(currentTopic.order).padStart(2, "0")} · {currentTopic.title}
                </span>
              )}
            </div>
          </div>

          <h2 className="mt-4 font-display text-base font-extrabold leading-relaxed text-ink sm:text-lg">
            {currentQuestion.prompt}
          </h2>

          <div className="mt-4 space-y-2.5">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;

              let optionCls =
                "border-border-warm bg-surface hover:bg-cream text-ink";

              if (showTreinoFeedback) {
                if (isCorrectOption) {
                  optionCls = "border-[#10B981] bg-mint-soft/75 text-mint-ink";
                } else if (isSelected && !isCorrectOption) {
                  optionCls = "border-crimson bg-crimson-soft/75 text-crimson";
                } else {
                  optionCls = "border-border-warm bg-surface/70 text-ink-secondary";
                }
              } else if (isSelected) {
                optionCls = "border-sky-med bg-sky-med-soft/70 text-sky-med-ink";
              }

              return (
                <button
                  key={opt}
                  type="button"
                  disabled={showTreinoFeedback}
                  onClick={() => {
                    if (mode === "treino") {
                      handleTreinoSelect(currentQuestion, idx);
                    } else {
                      setExamDrafts((prev) => ({
                        ...prev,
                        [currentQuestion.id]: idx,
                      }));
                    }
                  }}
                  className={`flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left text-xs font-semibold leading-relaxed transition-colors sm:text-sm ${optionCls}`}
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current font-display text-xs font-extrabold">
                    {OPTION_LETTERS[idx]}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {showTreinoFeedback && isCorrectOption && (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-mint" aria-hidden="true" />
                  )}
                  {showTreinoFeedback && isSelected && !isCorrectOption && (
                    <XCircle className="h-5 w-5 shrink-0 text-crimson" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Treino Explanation */}
          {showTreinoFeedback && (
            <div className="mt-5 flex flex-col gap-3 rounded-3xl border border-border-warm bg-cream/85 p-4 sm:flex-row sm:items-center">
              <TrackMascot
                trackId={currentQuestion.trackId}
                mood={
                  selectedAnswer === currentQuestion.correctIndex
                    ? "cheering"
                    : "comforting"
                }
                size="sm"
              />
              <div className="space-y-1 text-xs leading-relaxed sm:text-sm">
                <div className="font-display font-extrabold text-ink">
                  {selectedAnswer === currentQuestion.correctIndex
                    ? "Mandou bem demais, Dra. Sophia! 💚"
                    : `Atenção nessa pegadinha, amor — gabarito ${OPTION_LETTERS[currentQuestion.correctIndex]}:`}
                </div>
                <p className="font-medium text-ink-secondary">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Question Navigation */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border-warm pt-4">
            <div className="flex items-center gap-2">
              <SpringButton
                variant="soft"
                size="sm"
                disabled={safeIdx === 0}
                onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Anterior
              </SpringButton>
              <SpringButton
                variant="soft"
                size="sm"
                disabled={safeIdx >= questions.length - 1}
                onClick={() =>
                  setActiveIndex((prev) => Math.min(questions.length - 1, prev + 1))
                }
              >
                Próxima
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </SpringButton>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {mode === "treino" && missedIds.length > 0 && (
                <SpringButton variant="soft" size="sm" onClick={startMissedRetry}>
                  Refazer só as que errei ({missedIds.length})
                </SpringButton>
              )}
              {mode === "prova" && (
                <SpringButton variant="mint" size="md" onClick={handleSubmitExam}>
                  Finalizar &amp; Corrigir Prova
                </SpringButton>
              )}
            </div>
          </div>

          {/* Compact Question Number Dots */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {questions.map((q, idx) => {
              const ans = mode === "treino" ? quizAnswers[q.id] : examDrafts[q.id];
              const isCurrent = idx === safeIdx;
              let dotCls = "border-border-warm bg-cream text-ink-secondary";
              if (mode === "treino" && ans !== undefined) {
                dotCls =
                  ans === q.correctIndex
                    ? "border-[#10B981] bg-mint-soft text-mint-ink"
                    : "border-crimson bg-crimson-soft text-crimson";
              } else if (mode === "prova" && ans !== undefined) {
                dotCls = "border-sky-med bg-sky-med-soft text-sky-med-ink";
              }
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Ir para questão ${idx + 1}`}
                  className={`h-8 w-8 rounded-xl border font-display text-xs font-extrabold transition-transform ${dotCls} ${
                    isCurrent ? "ring-2 ring-rose-mimo-heart ring-offset-1" : ""
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </KawaiiCard>
      )}
    </section>
  );
}
