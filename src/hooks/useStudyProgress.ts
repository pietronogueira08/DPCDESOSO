"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FLASHCARDS,
  QUIZ_QUESTIONS,
  STUDY_SECTIONS,
  type AulaId,
  type SectionId,
} from "@/data/dpc-content";

const STORAGE_KEY = "dpc-study-progress-v1";

export interface QuizAttemptSummary {
  dateIso: string;
  filter: "all" | AulaId;
  correctCount: number;
  totalCount: number;
}

export interface StudyProgressState {
  reviewedSections: SectionId[];
  masteredFlashcards: string[];
  needsReviewFlashcards: string[];
  masteredQuizIds: string[];
  quizHistory: QuizAttemptSummary[];
  bestStreak: number;
}

const DEFAULT_PROGRESS: StudyProgressState = {
  reviewedSections: [],
  masteredFlashcards: [],
  needsReviewFlashcards: [],
  masteredQuizIds: [],
  quizHistory: [],
  bestStreak: 0,
};

function sanitizeArray<T extends string>(input: unknown, validSet: Set<string>): T[] {
  if (!Array.isArray(input)) return [];
  return Array.from(
    new Set(input.filter((item): item is T => typeof item === "string" && validSet.has(item)))
  );
}

export function useStudyProgress() {
  const [progress, setProgress] = useState<StudyProgressState>(DEFAULT_PROGRESS);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate safely on the client after mount to avoid SSR hydration mismatches
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StudyProgressState>;
        const validSections = new Set<string>(STUDY_SECTIONS.map((s) => s.id));
        const validFlashcards = new Set<string>(FLASHCARDS.map((f) => f.id));
        const validQuestions = new Set<string>(QUIZ_QUESTIONS.map((q) => q.id));

        const history: QuizAttemptSummary[] = Array.isArray(parsed.quizHistory)
          ? parsed.quizHistory
              .filter(
                (entry): entry is QuizAttemptSummary =>
                  Boolean(entry) &&
                  typeof entry.dateIso === "string" &&
                  typeof entry.correctCount === "number" &&
                  typeof entry.totalCount === "number" &&
                  (entry.filter === "all" ||
                    entry.filter === "aula13" ||
                    entry.filter === "aula14")
              )
              .slice(-15)
          : [];

        setProgress({
          reviewedSections: sanitizeArray<SectionId>(parsed.reviewedSections, validSections),
          masteredFlashcards: sanitizeArray<string>(parsed.masteredFlashcards, validFlashcards),
          needsReviewFlashcards: sanitizeArray<string>(
            parsed.needsReviewFlashcards,
            validFlashcards
          ),
          masteredQuizIds: sanitizeArray<string>(parsed.masteredQuizIds, validQuestions),
          quizHistory: history,
          bestStreak:
            typeof parsed.bestStreak === "number" && parsed.bestStreak >= 0
              ? parsed.bestStreak
              : 0,
        });
      }
    } catch {
      // Ignore corrupted localStorage payloads and fall back to defaults
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const persist = useCallback((updater: (prev: StudyProgressState) => StudyProgressState) => {
    setProgress((prev) => {
      const next = updater(prev);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota or private-mode errors gracefully
      }
      return next;
    });
  }, []);

  const toggleSectionReviewed = useCallback(
    (sectionId: SectionId): { nowReviewed: boolean; completedAula: AulaId | null } => {
      const isCurrentlyReviewed = progress.reviewedSections.includes(sectionId);
      const nextReviewed = isCurrentlyReviewed
        ? progress.reviewedSections.filter((id) => id !== sectionId)
        : [...progress.reviewedSections, sectionId];

      let completedAula: AulaId | null = null;
      if (!isCurrentlyReviewed) {
        const meta = STUDY_SECTIONS.find((s) => s.id === sectionId);
        if (meta) {
          const aulaSections = STUDY_SECTIONS.filter((s) => s.aula === meta.aula);
          const allDone = aulaSections.every((s) => nextReviewed.includes(s.id));
          if (allDone) {
            completedAula = meta.aula;
          }
        }
      }

      persist((prev) => {
        const exists = prev.reviewedSections.includes(sectionId);
        return {
          ...prev,
          reviewedSections: exists
            ? prev.reviewedSections.filter((id) => id !== sectionId)
            : [...prev.reviewedSections, sectionId],
        };
      });

      return { nowReviewed: !isCurrentlyReviewed, completedAula };
    },
    [persist, progress.reviewedSections]
  );

  const markFlashcardMastered = useCallback(
    (cardId: string) => {
      persist((prev) => ({
        ...prev,
        masteredFlashcards: Array.from(new Set([...prev.masteredFlashcards, cardId])),
        needsReviewFlashcards: prev.needsReviewFlashcards.filter((id) => id !== cardId),
      }));
    },
    [persist]
  );

  const markFlashcardConfused = useCallback(
    (cardId: string) => {
      persist((prev) => ({
        ...prev,
        masteredFlashcards: prev.masteredFlashcards.filter((id) => id !== cardId),
        needsReviewFlashcards: Array.from(new Set([...prev.needsReviewFlashcards, cardId])),
      }));
    },
    [persist]
  );

  const recordQuizAnswer = useCallback(
    (questionId: string, isCorrect: boolean, currentStreak: number) => {
      persist((prev) => ({
        ...prev,
        masteredQuizIds: isCorrect
          ? Array.from(new Set([...prev.masteredQuizIds, questionId]))
          : prev.masteredQuizIds.filter((id) => id !== questionId),
        bestStreak: Math.max(prev.bestStreak, currentStreak),
      }));
    },
    [persist]
  );

  const recordQuizCompletion = useCallback(
    (attempt: QuizAttemptSummary) => {
      persist((prev) => ({
        ...prev,
        quizHistory: [...prev.quizHistory, attempt].slice(-15),
      }));
    },
    [persist]
  );

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage error
    }
  }, []);

  const stats = useMemo(() => {
    const totalSections = STUDY_SECTIONS.length;
    const totalFlashcards = FLASHCARDS.length;
    const totalQuestions = QUIZ_QUESTIONS.length;

    const sectionsDone = progress.reviewedSections.length;
    const flashcardsDone = progress.masteredFlashcards.length;
    const quizDone = progress.masteredQuizIds.length;

    const totalUnits = totalSections + totalFlashcards + totalQuestions;
    const completedUnits = sectionsDone + flashcardsDone + quizDone;
    const overallMasteryPercent =
      totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

    const aula13Sections = STUDY_SECTIONS.filter((s) => s.aula === "aula13");
    const aula14Sections = STUDY_SECTIONS.filter((s) => s.aula === "aula14");

    const aula13DoneCount = aula13Sections.filter((s) =>
      progress.reviewedSections.includes(s.id)
    ).length;
    const aula14DoneCount = aula14Sections.filter((s) =>
      progress.reviewedSections.includes(s.id)
    ).length;

    const lastQuiz = progress.quizHistory[progress.quizHistory.length - 1] ?? null;

    return {
      sectionsDone,
      totalSections,
      flashcardsDone,
      totalFlashcards,
      quizDone,
      totalQuestions,
      overallMasteryPercent,
      aula13DoneCount,
      aula13TotalCount: aula13Sections.length,
      aula14DoneCount,
      aula14TotalCount: aula14Sections.length,
      lastQuiz,
    };
  }, [progress]);

  return {
    progress,
    isHydrated,
    stats,
    toggleSectionReviewed,
    markFlashcardMastered,
    markFlashcardConfused,
    recordQuizAnswer,
    recordQuizCompletion,
    resetProgress,
  };
}
