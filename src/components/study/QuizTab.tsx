"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";
import {
  BearNurse,
  BunnyDoctor,
  PuppyIntern,
} from "@/components/mascots/KawaiiMascots";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { QUIZ_QUESTIONS, type QuizQuestionItem } from "@/data/dpc-content";
import type { AulaFilter } from "@/components/study/StudyHeader";
import type { QuizAttemptSummary } from "@/hooks/useStudyProgress";
import { useSafeMotion } from "@/lib/motion";

interface QuizTabProps {
  globalFilter: AulaFilter;
  bestStreak: number;
  onRecordAnswer: (
    questionId: string,
    isCorrect: boolean,
    currentStreak: number
  ) => void;
  onCompleteQuiz: (summary: QuizAttemptSummary) => void;
  onTriggerStreakMimo: (streak: number) => void;
}

export function QuizTab({
  globalFilter,
  bestStreak,
  onRecordAnswer,
  onCompleteQuiz,
  onTriggerStreakMimo,
}: QuizTabProps) {
  const [quizFilter, setQuizFilter] = useState<AulaFilter>(globalFilter);
  const [retryMissedIds, setRetryMissedIds] = useState<string[] | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [missedIds, setMissedIds] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const { popInVariants } = useSafeMotion();

  const restartQuiz = (
    nextFilter: AulaFilter,
    missedOnly: string[] | null = null
  ) => {
    setQuizFilter(nextFilter);
    setRetryMissedIds(missedOnly);
    setQuestionIndex(0);
    setSelectedOption(null);
    setCorrectCount(0);
    setMissedIds([]);
    setStreak(0);
    setIsFinished(false);
  };

  useEffect(() => {
    restartQuiz(globalFilter, null);
  }, [globalFilter]);

  const activeQuestions = useMemo<QuizQuestionItem[]>(() => {
    if (retryMissedIds && retryMissedIds.length > 0) {
      const missedSet = new Set(retryMissedIds);
      return QUIZ_QUESTIONS.filter((q) => missedSet.has(q.id));
    }
    return QUIZ_QUESTIONS.filter(
      (q) => quizFilter === "all" || q.aula === quizFilter
    );
  }, [quizFilter, retryMissedIds]);

  const currentQuestion = activeQuestions[questionIndex] ?? null;

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion || selectedOption !== null) return;
    setSelectedOption(optionIndex);

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    const nextStreak = isCorrect ? streak + 1 : 0;
    setStreak(nextStreak);

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      if (nextStreak >= 3 && nextStreak % 3 === 0) {
        onTriggerStreakMimo(nextStreak);
      }
    } else {
      setMissedIds((prev) => [...prev, currentQuestion.id]);
    }

    onRecordAnswer(currentQuestion.id, isCorrect, nextStreak);
  };

  const handleNext = () => {
    if (questionIndex + 1 >= activeQuestions.length) {
      setIsFinished(true);
      onCompleteQuiz({
        dateIso: new Date().toISOString(),
        filter: quizFilter,
        correctCount,
        totalCount: activeQuestions.length,
      });
      return;
    }
    setQuestionIndex((i) => i + 1);
    setSelectedOption(null);
  };

  const scorePercent =
    activeQuestions.length > 0
      ? Math.round((correctCount / activeQuestions.length) * 100)
      : 0;

  return (
    <div className="space-y-5">
      {/* Filter Bar */}
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: "all", label: "Simulado Completo (16)" },
                { id: "aula13", label: "Aula 13 (8)" },
                { id: "aula14", label: "Aula 14 (8)" },
              ] as const
            ).map((opt) => {
              const active = quizFilter === opt.id && !retryMissedIds;
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => restartQuiz(opt.id, null)}
                  className={`min-h-[36px] rounded-full border px-3.5 py-1 text-xs font-bold transition-colors sm:text-sm ${
                    active
                      ? "border-mint-deep bg-mint-deep text-white"
                      : "border-border-warm bg-cream text-ink hover:bg-mint-soft/40"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <Badge tone={streak >= 3 ? "blush" : "neutral"}>
              <Flame className="h-3.5 w-3.5" aria-hidden="true" />
              Sequência atual: {streak}
            </Badge>
            <Badge tone="mint">Melhor: {bestStreak}</Badge>
          </div>
        </div>
      </Card>

      {/* Results Screen or Active Question */}
      {isFinished ? (
        <motion.div
          variants={popInVariants}
          initial="hidden"
          animate="visible"
        >
          <Card tone={scorePercent >= 70 ? "mint" : "blush"} className="text-center">
            <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-4">
              <PuppyIntern
                mood={scorePercent >= 70 ? "cheering" : "love"}
                className="h-28 w-28"
              />
              <Badge tone={scorePercent >= 70 ? "mint" : "blush"}>
                Simulado Concluído!
              </Badge>
              <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
                Você acertou {correctCount} de {activeQuestions.length} ({scorePercent}%)
              </h2>
              <p className="text-sm leading-relaxed text-ink-muted">
                {scorePercent >= 85
                  ? "Desempenho nível Q1! Você já domina os detalhes das Aulas 13 e 14."
                  : scorePercent >= 65
                  ? "Muito bom! Vale dar uma olhadinha só nas questões que escaparam para gabaritar."
                  : "Cada erro agora é um acerto garantido na prova! Que tal revisar exatamente as que você errou?"}
              </p>

              <div className="mt-2 flex flex-wrap justify-center gap-3">
                {missedIds.length > 0 && (
                  <Button
                    variant="blush"
                    onClick={() => restartQuiz(quizFilter, missedIds)}
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    <span>Refazer só as que errei ({missedIds.length})</span>
                  </Button>
                )}
                <Button
                  variant="mint"
                  onClick={() => restartQuiz(quizFilter, null)}
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <span>Fazer novamente ✨</span>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ) : currentQuestion ? (
        <Card className="mx-auto max-w-3xl">
          <div className="mb-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge tone={currentQuestion.aula === "aula13" ? "mint" : "lavender"}>
                {currentQuestion.aula === "aula13" ? "Aula 13" : "Aula 14"} • Questão{" "}
                {questionIndex + 1} de {activeQuestions.length}
              </Badge>
              {retryMissedIds && (
                <Badge tone="blush">Modo Revisão de Erros</Badge>
              )}
            </div>
            <ProgressBar
              value={((questionIndex + (selectedOption !== null ? 1 : 0)) / activeQuestions.length) * 100}
              label="Progresso neste simulado"
              tone={currentQuestion.aula === "aula13" ? "mint" : "lavender"}
            />
          </div>

          <h2 className="font-display text-lg font-extrabold leading-snug text-ink sm:text-xl">
            {currentQuestion.question}
          </h2>

          <div className="mt-5 space-y-2.5">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;
              const hasAnswered = selectedOption !== null;

              let optionClass =
                "border-border-warm bg-cream/65 text-ink hover:bg-mint-soft/35";
              if (hasAnswered) {
                if (isCorrectOption) {
                  optionClass =
                    "border-mint-deep bg-mint-soft/75 text-mint-ink font-bold";
                } else if (isSelected && !isCorrectOption) {
                  optionClass =
                    "border-danger bg-danger-soft/70 text-danger-ink font-semibold";
                } else {
                  optionClass =
                    "border-border-warm bg-surface text-ink-muted opacity-75";
                }
              }

              const letter = String.fromCharCode(65 + idx);

              return (
                <button
                  key={option}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`flex min-h-[48px] w-full items-start gap-3 rounded-2xl border p-3.5 text-left text-sm transition-colors disabled:cursor-default sm:p-4 ${optionClass}`}
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current/25 bg-white text-xs font-extrabold">
                    {letter}
                  </span>
                  <span className="flex-1 leading-relaxed">{option}</span>
                  {hasAnswered && isCorrectOption && (
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-mint-ink"
                      aria-hidden="true"
                    />
                  )}
                  {hasAnswered && isSelected && !isCorrectOption && (
                    <XCircle
                      className="mt-0.5 h-5 w-5 shrink-0 text-danger-ink"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Feedback Banner */}
          {selectedOption !== null && (
            <motion.div
              variants={popInVariants}
              initial="hidden"
              animate="visible"
              className={`mt-5 flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center ${
                selectedOption === currentQuestion.correctIndex
                  ? "border-mint/35 bg-mint-soft/45"
                  : "border-blush/35 bg-blush-soft/45"
              }`}
            >
              <div className="shrink-0 self-center sm:self-start">
                {selectedOption === currentQuestion.correctIndex ? (
                  <BunnyDoctor mood="cheering" className="h-16 w-16" decorative />
                ) : (
                  <BearNurse mood="thinking" className="h-16 w-16" decorative />
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div
                  className={`font-display text-base font-extrabold ${
                    selectedOption === currentQuestion.correctIndex
                      ? "text-mint-ink"
                      : "text-blush-ink"
                  }`}
                >
                  {selectedOption === currentQuestion.correctIndex
                    ? streak >= 3
                      ? `Mandou muito bem! Sequência de ${streak} acertos! 🔥`
                      : "Acertou em cheio! 💚"
                    : "Calma, faz parte do treino! Olha a regra exata:"}
                </div>
                <p className="text-xs leading-relaxed text-ink sm:text-sm">
                  {currentQuestion.explanation}
                </p>
              </div>
              <Button
                variant="mint"
                size="md"
                onClick={handleNext}
                className="shrink-0 self-end sm:self-center"
              >
                <span>
                  {questionIndex + 1 >= activeQuestions.length
                    ? "Ver resultado"
                    : "Próxima"}
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </motion.div>
          )}
        </Card>
      ) : null}
    </div>
  );
}
