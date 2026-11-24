"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BookOpen, Brain, Layers } from "lucide-react";
import { ComfortModal } from "@/components/mimo/ComfortModal";
import { MimoToast } from "@/components/mimo/MimoToast";
import { FlashcardsTab } from "@/components/study/FlashcardsTab";
import { QuizTab } from "@/components/study/QuizTab";
import { StudyHeader, type AulaFilter } from "@/components/study/StudyHeader";
import { SummaryTab } from "@/components/study/SummaryTab";
import { Tabs, type TabOption } from "@/components/ui/Tabs";
import {
  COURSE_META,
  FLASHCARDS,
  MIMO_MESSAGES,
  QUIZ_QUESTIONS,
  type AulaId,
  type MimoMessageItem,
  type SectionId,
} from "@/data/dpc-content";
import { useStudyProgress } from "@/hooks/useStudyProgress";

type MainTabId = "resumo" | "flashcards" | "quiz";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<MainTabId>("resumo");
  const [aulaFilter, setAulaFilter] = useState<AulaFilter>("all");
  const [activeMimo, setActiveMimo] = useState<{
    item: MimoMessageItem;
    subtitle?: string;
  } | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const {
    progress,
    stats,
    toggleSectionReviewed,
    markFlashcardMastered,
    markFlashcardConfused,
    recordQuizAnswer,
    recordQuizCompletion,
    resetProgress,
  } = useStudyProgress();

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showMimoToast = useCallback((subtitle?: string) => {
    const idx = Math.floor(Math.random() * MIMO_MESSAGES.length);
    const chosen = MIMO_MESSAGES[idx] ?? MIMO_MESSAGES[0];
    setActiveMimo({ item: chosen, subtitle });
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setActiveMimo(null);
    }, 6500);
  }, []);

  const handleToggleSection = (sectionId: SectionId) => {
    const { completedAula } = toggleSectionReviewed(sectionId);
    if (completedAula) {
      const label =
        completedAula === "aula13"
          ? "Aula 13 100% revisada! 🎉"
          : "Aula 14 100% revisada! 🎉";
      showMimoToast(label);
    }
  };

  const handleTriggerStreakMimo = (streak: number) => {
    showMimoToast(`Sequência de ${streak} acertos! 🔥`);
  };

  const handleAulaCompleteQuizCheck = (
    filter: AulaFilter,
    correctCount: number,
    totalCount: number
  ) => {
    if (totalCount > 0 && correctCount / totalCount >= 0.75) {
      const label =
        filter === "aula13"
          ? "Aula 13 dominada no Quiz! 💚"
          : filter === "aula14"
          ? "Aula 14 dominada no Quiz! 💜"
          : "Simulado completo mandou bem! 🏆";
      showMimoToast(label);
    }
  };

  const mainTabs: TabOption<MainTabId>[] = [
    {
      id: "resumo",
      label: "Resumo Interativo",
      badge: `${stats.sectionsDone}/${stats.totalSections}`,
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: "flashcards",
      label: "Flashcards 3D",
      badge: `${stats.flashcardsDone}/${FLASHCARDS.length}`,
      icon: <Layers className="h-4 w-4" />,
    },
    {
      id: "quiz",
      label: "Quiz de Prova",
      badge: `${stats.quizDone}/${QUIZ_QUESTIONS.length}`,
      icon: <Brain className="h-4 w-4" />,
    },
  ];

  const aulaLabel = (aula: AulaId) =>
    aula === "aula13" ? COURSE_META.aula13.title : COURSE_META.aula14.title;

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 pb-24 pt-5 sm:px-6 sm:pt-8">
      <StudyHeader
        overallMasteryPercent={stats.overallMasteryPercent}
        sectionsDone={stats.sectionsDone}
        totalSections={stats.totalSections}
        flashcardsDone={stats.flashcardsDone}
        totalFlashcards={stats.totalFlashcards}
        quizDone={stats.quizDone}
        totalQuestions={stats.totalQuestions}
        bestStreak={progress.bestStreak}
        aulaFilter={aulaFilter}
        onChangeFilter={setAulaFilter}
        onResetProgress={resetProgress}
      />

      <main id="conteudo-principal" tabIndex={-1} className="focus:outline-none">
        <div className="mb-6">
          <Tabs
            tabs={mainTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            ariaLabel="Modos de estudo: resumo, flashcards e quiz"
          />
        </div>

        <div
          role="tabpanel"
          aria-labelledby="tab-resumo"
          hidden={activeTab !== "resumo"}
        >
          {activeTab === "resumo" && (
            <SummaryTab
              aulaFilter={aulaFilter}
              reviewedSections={progress.reviewedSections}
              onToggleReviewed={handleToggleSection}
            />
          )}
        </div>

        <div
          role="tabpanel"
          aria-labelledby="tab-flashcards"
          hidden={activeTab !== "flashcards"}
        >
          {activeTab === "flashcards" && (
            <FlashcardsTab
              globalFilter={aulaFilter}
              masteredIds={progress.masteredFlashcards}
              needsReviewIds={progress.needsReviewFlashcards}
              onMarkMastered={markFlashcardMastered}
              onMarkConfused={markFlashcardConfused}
            />
          )}
        </div>

        <div
          role="tabpanel"
          aria-labelledby="tab-quiz"
          hidden={activeTab !== "quiz"}
        >
          {activeTab === "quiz" && (
            <QuizTab
              globalFilter={aulaFilter}
              bestStreak={progress.bestStreak}
              onRecordAnswer={recordQuizAnswer}
              onCompleteQuiz={(summary) => {
                recordQuizCompletion(summary);
                handleAulaCompleteQuizCheck(
                  summary.filter,
                  summary.correctCount,
                  summary.totalCount
                );
              }}
              onTriggerStreakMimo={handleTriggerStreakMimo}
            />
          )}
        </div>
      </main>

      <footer className="mt-12 rounded-3xl border border-border-warm bg-surface/85 px-5 py-4 text-center text-xs text-ink-muted">
        <p className="font-bold text-ink">
          {COURSE_META.institution} • {COURSE_META.discipline} ({COURSE_META.term})
        </p>
        <p className="mt-1">
          {aulaLabel("aula13")} ({COURSE_META.aula13.professor}) •{" "}
          {aulaLabel("aula14")} ({COURSE_META.aula14.professor})
        </p>
      </footer>

      <MimoToast
        mimo={activeMimo?.item ?? null}
        subtitle={activeMimo?.subtitle}
        onDismiss={() => setActiveMimo(null)}
      />

      <ComfortModal />
    </div>
  );
}
