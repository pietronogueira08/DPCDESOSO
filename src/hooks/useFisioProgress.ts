"use client";

import { useCallback, useEffect, useState } from "react";

export const STORAGE_NAMESPACE = "fisio_sophia_v1";

export interface FisioProgressState {
  reviewedTopics: string[];
  masteredFlashcards: string[];
  quizAnswers: Record<string, number>;
  bestStreak: number;
  totalStudyActions: number;
}

const DEFAULT_PROGRESS: FisioProgressState = {
  reviewedTopics: [],
  masteredFlashcards: [],
  quizAnswers: {},
  bestStreak: 0,
  totalStudyActions: 0,
};

function sanitizeProgress(raw: unknown): FisioProgressState {
  if (!raw || typeof raw !== "object") return DEFAULT_PROGRESS;
  const obj = raw as Partial<FisioProgressState>;

  const reviewedTopics = Array.isArray(obj.reviewedTopics)
    ? obj.reviewedTopics.filter((x): x is string => typeof x === "string")
    : [];

  const masteredFlashcards = Array.isArray(obj.masteredFlashcards)
    ? obj.masteredFlashcards.filter((x): x is string => typeof x === "string")
    : [];

  const quizAnswers: Record<string, number> = {};
  if (obj.quizAnswers && typeof obj.quizAnswers === "object") {
    for (const [k, v] of Object.entries(obj.quizAnswers)) {
      if (typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 3) {
        quizAnswers[k] = v;
      }
    }
  }

  const bestStreak =
    typeof obj.bestStreak === "number" && Number.isFinite(obj.bestStreak) && obj.bestStreak >= 0
      ? Math.floor(obj.bestStreak)
      : 0;

  const totalStudyActions =
    typeof obj.totalStudyActions === "number" &&
    Number.isFinite(obj.totalStudyActions) &&
    obj.totalStudyActions >= 0
      ? Math.floor(obj.totalStudyActions)
      : 0;

  return {
    reviewedTopics: Array.from(new Set(reviewedTopics)),
    masteredFlashcards: Array.from(new Set(masteredFlashcards)),
    quizAnswers,
    bestStreak,
    totalStudyActions,
  };
}

export function useFisioProgress() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<FisioProgressState>(DEFAULT_PROGRESS);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_NAMESPACE);
      if (saved) {
        setProgress(sanitizeProgress(JSON.parse(saved)));
      }
    } catch {
      // Ignore malformed localStorage entries gracefully
    } finally {
      setMounted(true);
    }
  }, []);

  const persist = useCallback((updater: (prev: FisioProgressState) => FisioProgressState) => {
    setProgress((prev) => {
      const next = updater(prev);
      try {
        window.localStorage.setItem(STORAGE_NAMESPACE, JSON.stringify(next));
      } catch {
        // Ignore quota errors
      }
      return next;
    });
  }, []);

  const toggleReviewedTopic = useCallback(
    (topicId: string): boolean => {
      let becameReviewed = false;
      persist((prev) => {
        const exists = prev.reviewedTopics.includes(topicId);
        becameReviewed = !exists;
        return {
          ...prev,
          reviewedTopics: exists
            ? prev.reviewedTopics.filter((id) => id !== topicId)
            : [...prev.reviewedTopics, topicId],
          totalStudyActions: prev.totalStudyActions + 1,
        };
      });
      return becameReviewed;
    },
    [persist]
  );

  const setFlashcardMastered = useCallback(
    (cardId: string, mastered: boolean) => {
      persist((prev) => {
        const exists = prev.masteredFlashcards.includes(cardId);
        const nextCards = mastered
          ? exists
            ? prev.masteredFlashcards
            : [...prev.masteredFlashcards, cardId]
          : prev.masteredFlashcards.filter((id) => id !== cardId);
        return {
          ...prev,
          masteredFlashcards: nextCards,
          totalStudyActions: prev.totalStudyActions + 1,
        };
      });
    },
    [persist]
  );

  const recordQuizAnswer = useCallback(
    (questionId: string, optionIndex: number, streakCandidate?: number) => {
      persist((prev) => ({
        ...prev,
        quizAnswers: {
          ...prev.quizAnswers,
          [questionId]: optionIndex,
        },
        bestStreak:
          typeof streakCandidate === "number"
            ? Math.max(prev.bestStreak, streakCandidate)
            : prev.bestStreak,
        totalStudyActions: prev.totalStudyActions + 1,
      }));
    },
    [persist]
  );

  const clearQuizAnswers = useCallback(
    (questionIds?: string[]) => {
      persist((prev) => {
        if (!questionIds) {
          return { ...prev, quizAnswers: {} };
        }
        const nextAnswers = { ...prev.quizAnswers };
        for (const id of questionIds) {
          delete nextAnswers[id];
        }
        return { ...prev, quizAnswers: nextAnswers };
      });
    },
    [persist]
  );

  const incrementStudyAction = useCallback(() => {
    persist((prev) => ({
      ...prev,
      totalStudyActions: prev.totalStudyActions + 1,
    }));
  }, [persist]);

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    try {
      window.localStorage.removeItem(STORAGE_NAMESPACE);
    } catch {
      // Ignore storage errors
    }
  }, []);

  return {
    mounted,
    progress,
    toggleReviewedTopic,
    setFlashcardMastered,
    recordQuizAnswer,
    clearQuizAnswers,
    incrementStudyAction,
    resetProgress,
  };
}
