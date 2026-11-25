"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  ClipboardCheck,
  FlaskConical,
  Heart,
  Layers,
  PauseCircle,
  PlayCircle,
  RotateCcw,
} from "lucide-react";
import {
  PHYSIOLOGY_TOPICS,
  type PhysiologyTopic,
  type TrackId,
} from "@/data/physiology-tracks";
import { QUIZ_QUESTIONS } from "@/data/quiz-questions";
import { MIMO_MESSAGES, pickRandomMessage } from "@/data/mimo-messages";
import { useFisioProgress } from "@/hooks/useFisioProgress";
import {
  MotionPreferenceProvider,
  attachDialogLightDismissFallback,
  useSafeMotion,
} from "@/lib/motion";
import { ParallaxBackdrop } from "@/components/motion/ParallaxBackdrop";
import { HeartBurst } from "@/components/motion/HeartBurst";
import { HeroDashboard, type SprintFilter } from "@/components/study/HeroDashboard";
import { TopicsView } from "@/components/study/TopicsView";
import { TopicModal } from "@/components/study/TopicModal";
import { LabsAndQuickReview } from "@/components/labs/LabsAndQuickReview";
import { FlashcardsView } from "@/components/study/FlashcardsView";
import { QuizView } from "@/components/study/QuizView";
import { MimoToast, type MimoToastData } from "@/components/mimo/MimoToast";
import { ComfortButtonAndModal } from "@/components/mimo/ComfortButtonAndModal";
import { SectionPillTabs, type PillTabItem } from "@/components/ui/SectionPillTabs";
import { SpringButton } from "@/components/ui/SpringButton";
import type { MascotMood } from "@/components/mascots/AnimatedMascots";

type MainTab = "trilhas" | "labs" | "flashcards" | "simulado";

function FisioStudioInner() {
  const { ambientPaused, toggleAmbientPaused } = useSafeMotion();
  const {
    progress,
    toggleReviewedTopic,
    setFlashcardMastered,
    recordQuizAnswer,
    clearQuizAnswers,
    incrementStudyAction,
    resetProgress,
  } = useFisioProgress();

  const [activeTab, setActiveTab] = useState<MainTab>("trilhas");
  const [sprintFilter, setSprintFilter] = useState<SprintFilter>("all");
  const [trackFilter, setTrackFilter] = useState<TrackId | "all">("all");
  const [openTopic, setOpenTopic] = useState<PhysiologyTopic | null>(null);

  const [toast, setToast] = useState<MimoToastData | null>(null);
  const [burstKey, setBurstKey] = useState(0);
  const toastCounter = useRef(1);
  const resetDialogRef = useRef<HTMLDialogElement>(null);

  const showMimo = useCallback(
    (
      message: string,
      trackId: TrackId | "mimo" = "mimo",
      mood: MascotMood = "cheering",
      withBurst = false
    ) => {
      toastCounter.current += 1;
      setToast({ id: toastCounter.current, message, trackId, mood });
      if (withBurst) {
        setBurstKey((prev) => prev + 1);
      }
    },
    []
  );

  useEffect(() => {
    const dialog = resetDialogRef.current;
    if (!dialog) return;
    const cleanup = attachDialogLightDismissFallback(dialog);
    const onClose = () => {
      dialog.returnValue = "";
    };
    dialog.addEventListener("close", onClose);
    return () => {
      cleanup();
      dialog.removeEventListener("close", onClose);
    };
  }, []);

  const quizCorrectCount = useMemo(
    () =>
      QUIZ_QUESTIONS.filter(
        (q) => progress.quizAnswers[q.id] === q.correctIndex
      ).length,
    [progress.quizAnswers]
  );

  const tabs: readonly PillTabItem<MainTab>[] = useMemo(
    () => [
      {
        id: "trilhas",
        label: "Trilhas & Aulas",
        shortLabel: "Trilhas (14)",
        badge: `${progress.reviewedTopics.length}/14`,
        icon: <BookOpen className="h-4 w-4 shrink-0 text-mint" aria-hidden="true" />,
      },
      {
        id: "labs",
        label: "Mini-Labs & 5 min",
        shortLabel: "Mini-Labs",
        badge: "3 Labs",
        icon: <FlaskConical className="h-4 w-4 shrink-0 text-sky-med" aria-hidden="true" />,
      },
      {
        id: "flashcards",
        label: "Flashcards 3D",
        shortLabel: "Flashcards",
        badge: `${progress.masteredFlashcards.length}/42`,
        icon: <Layers className="h-4 w-4 shrink-0 text-berry" aria-hidden="true" />,
      },
      {
        id: "simulado",
        label: "Simulado de Prova",
        shortLabel: "Simulado",
        badge: `${quizCorrectCount}/28`,
        icon: <ClipboardCheck className="h-4 w-4 shrink-0 text-rose-mimo" aria-hidden="true" />,
      },
    ],
    [progress.reviewedTopics.length, progress.masteredFlashcards.length, quizCorrectCount]
  );

  const handleOpenTopic = (topic: PhysiologyTopic) => {
    setOpenTopic(topic);
    incrementStudyAction();
    showMimo(pickRandomMessage(MIMO_MESSAGES.onTopicOpen), topic.trackId, "studying", false);
  };

  const handleToggleReviewed = (topic: PhysiologyTopic) => {
    const becameReviewed = toggleReviewedTopic(topic.id);
    if (becameReviewed) {
      const trackTopics = PHYSIOLOGY_TOPICS.filter((t) => t.trackId === topic.trackId);
      const nextReviewedSet = new Set([...progress.reviewedTopics, topic.id]);
      const completedTrack = trackTopics.every((t) => nextReviewedSet.has(t.id));

      if (completedTrack) {
        showMimo(
          MIMO_MESSAGES.onTrackComplete[topic.trackId],
          topic.trackId,
          "cheering",
          true
        );
      } else {
        showMimo(
          pickRandomMessage(MIMO_MESSAGES.onTopicMastered),
          topic.trackId,
          "cheering",
          true
        );
      }
    }
  };

  const handleSelectTrackFromHero = (trackId: TrackId) => {
    setTrackFilter(trackId);
    setActiveTab("trilhas");
  };

  const openTopicIndex = openTopic
    ? PHYSIOLOGY_TOPICS.findIndex((t) => t.id === openTopic.id)
    : -1;

  return (
    <div className="relative min-h-dvh pb-24">
      <ParallaxBackdrop />
      <HeartBurst burstKey={burstKey} />
      <MimoToast toast={toast} onDismiss={() => setToast(null)} />

      {/* Sticky Top Micro-Header */}
      <header className="sticky top-0 z-30 border-b border-border-warm bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-rose-mimo-soft text-rose-mimo">
              <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
            </span>
            <div>
              <span className="font-display text-sm font-extrabold text-ink sm:text-base">
                Fisio da Sophia
              </span>
              <span className="ml-2 hidden rounded-full bg-mint-soft px-2 py-0.5 text-[11px] font-bold text-mint-ink sm:inline-block">
                {progress.reviewedTopics.length}/14 revisados
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* WCAG 2.2.2 Ambient Animation Pause Control (label swaps without aria-pressed) */}
            <button
              type="button"
              onClick={toggleAmbientPaused}
              aria-label={ambientPaused ? "Ativar animações" : "Pausar animações"}
              className="inline-flex min-h-[34px] items-center gap-1.5 rounded-xl border border-border-warm bg-surface px-2.5 py-1 font-display text-xs font-bold text-ink-secondary transition-colors hover:bg-cream hover:text-ink"
            >
              {ambientPaused ? (
                <>
                  <PlayCircle className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
                  <span className="hidden sm:inline">Ativar animações</span>
                </>
              ) : (
                <>
                  <PauseCircle className="h-3.5 w-3.5 text-rose-mimo" aria-hidden="true" />
                  <span className="hidden sm:inline">Pausar animações</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => resetDialogRef.current?.showModal()}
              aria-label="Resetar progresso"
              className="inline-flex min-h-[34px] items-center gap-1 rounded-xl border border-border-warm bg-surface px-2.5 py-1 font-display text-xs font-bold text-ink-secondary transition-colors hover:bg-crimson-soft hover:text-crimson"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Resetar progresso</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="mx-auto max-w-6xl space-y-6 px-4 pt-6 sm:px-6">
        <HeroDashboard
          reviewedTopics={progress.reviewedTopics}
          masteredFlashcardsCount={progress.masteredFlashcards.length}
          quizCorrectCount={quizCorrectCount}
          sprintFilter={sprintFilter}
          onSelectSprintFilter={(f) => {
            setSprintFilter(f);
            setActiveTab("trilhas");
          }}
          onSelectTrack={handleSelectTrackFromHero}
        />

        <SectionPillTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab)}
        />

        {activeTab === "trilhas" && (
          <TopicsView
            reviewedTopics={progress.reviewedTopics}
            sprintFilter={sprintFilter}
            selectedTrackFilter={trackFilter}
            onChangeTrackFilter={setTrackFilter}
            onOpenTopic={handleOpenTopic}
            onToggleReviewed={handleToggleReviewed}
          />
        )}

        {activeTab === "labs" && <LabsAndQuickReview />}

        {activeTab === "flashcards" && (
          <FlashcardsView
            masteredFlashcards={progress.masteredFlashcards}
            onSetMastered={setFlashcardMastered}
            onMilestoneReached={() =>
              showMimo(
                pickRandomMessage(MIMO_MESSAGES.onFlashcardStreak),
                "mimo",
                "cheering",
                true
              )
            }
          />
        )}

        {activeTab === "simulado" && (
          <QuizView
            quizAnswers={progress.quizAnswers}
            bestStreak={progress.bestStreak}
            onRecordAnswer={(qId, optIdx, isCorrect, nextStreak, trackId) => {
              recordQuizAnswer(qId, optIdx, nextStreak);
              if (isCorrect) {
                const msg = pickRandomMessage(MIMO_MESSAGES.onQuizCorrect);
                showMimo(msg, trackId, "cheering", nextStreak >= 3);
              } else {
                showMimo(
                  pickRandomMessage(MIMO_MESSAGES.onQuizWrong),
                  "mimo",
                  "comforting",
                  false
                );
              }
            }}
            onClearQuizAnswers={clearQuizAnswers}
          />
        )}
      </main>

      {/* Warm Footer */}
      <footer className="mx-auto mt-12 max-w-6xl border-t border-border-warm px-4 py-6 text-center sm:px-6">
        <p className="font-display text-sm font-extrabold text-ink">
          Feito com todo amor pelo Pietro 💚
        </p>
        <p className="mt-1 text-xs font-medium text-ink-secondary">
          Fisiologia Médica · Revisão intensiva 48h exclusiva da Sophia (progresso salvo automaticamente no navegador).
        </p>
      </footer>

      {/* Topic Study Modal */}
      <TopicModal
        topic={openTopic}
        isReviewed={
          openTopic ? progress.reviewedTopics.includes(openTopic.id) : false
        }
        hasPrev={openTopicIndex > 0}
        hasNext={
          openTopicIndex >= 0 && openTopicIndex < PHYSIOLOGY_TOPICS.length - 1
        }
        onClose={() => setOpenTopic(null)}
        onToggleReviewed={handleToggleReviewed}
        onNavigate={(dir) => {
          if (openTopicIndex < 0) return;
          const nextIdx = dir === "prev" ? openTopicIndex - 1 : openTopicIndex + 1;
          const nextTopic = PHYSIOLOGY_TOPICS[nextIdx];
          if (nextTopic) setOpenTopic(nextTopic);
        }}
      />

      {/* Reset Progress Confirmation Modal */}
      <dialog
        ref={resetDialogRef}
        closedby="any"
        aria-labelledby="reset-dialog-title"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border border-border-warm bg-surface p-6 text-ink shadow-2xl"
      >
        <h1
          id="reset-dialog-title"
          className="font-display text-lg font-extrabold text-ink"
        >
          Resetar todo o progresso?
        </h1>
        <p className="mt-2 text-sm font-medium leading-relaxed text-ink-secondary">
          Isso apaga os tópicos marcados como revisados, os flashcards dominados e as respostas do simulado salvos neste navegador.
        </p>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <SpringButton
            variant="soft"
            size="sm"
            autoFocus
            onClick={() => resetDialogRef.current?.close()}
          >
            Cancelar
          </SpringButton>
          <SpringButton
            variant="rose"
            size="sm"
            onClick={() => {
              resetProgress();
              resetDialogRef.current?.close();
              showMimo("Progresso zerado com sucesso, Sophia! Vamos de novo 💚", "mimo", "love", false);
            }}
          >
            Sim, zerar tudo
          </SpringButton>
        </div>
      </dialog>

      {/* Persistent Comfort Button & Modal */}
      <ComfortButtonAndModal />
    </div>
  );
}

export function FisioStudioApp() {
  return (
    <MotionPreferenceProvider>
      <FisioStudioInner />
    </MotionPreferenceProvider>
  );
}
