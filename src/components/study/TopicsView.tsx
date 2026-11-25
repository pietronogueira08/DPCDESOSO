"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock,
  PlayCircle,
} from "lucide-react";
import {
  PHYSIOLOGY_TOPICS,
  PHYSIOLOGY_TRACKS,
  type PhysiologyTopic,
  type TrackId,
} from "@/data/physiology-tracks";
import { TrackMascot } from "@/components/mascots/AnimatedMascots";
import { HoverTiltCard } from "@/components/motion/HoverTiltCard";
import { PastelBadge } from "@/components/ui/PastelBadge";
import { SpringButton } from "@/components/ui/SpringButton";
import type { SprintFilter } from "@/components/study/HeroDashboard";
import { CARD_REVEAL, STAGGER_CONTAINER, useSafeMotion } from "@/lib/motion";

interface TopicsViewProps {
  reviewedTopics: readonly string[];
  sprintFilter: SprintFilter;
  selectedTrackFilter: TrackId | "all";
  onChangeTrackFilter: (track: TrackId | "all") => void;
  onOpenTopic: (topic: PhysiologyTopic) => void;
  onToggleReviewed: (topic: PhysiologyTopic) => void;
}

export function TopicsView({
  reviewedTopics,
  sprintFilter,
  selectedTrackFilter,
  onChangeTrackFilter,
  onOpenTopic,
  onToggleReviewed,
}: TopicsViewProps) {
  const { shouldReduceMotion } = useSafeMotion();

  const matchesSprint = (topic: PhysiologyTopic): boolean => {
    if (sprintFilter === "day1") return topic.dayPlan === 1;
    if (sprintFilter === "day2") return topic.dayPlan === 2;
    if (sprintFilter === "pending") return !reviewedTopics.includes(topic.id);
    return true;
  };

  const visibleTracks = PHYSIOLOGY_TRACKS.filter(
    (track) => selectedTrackFilter === "all" || track.id === selectedTrackFilter
  );

  const visibleTopicsCount = PHYSIOLOGY_TOPICS.filter(
    (t) =>
      matchesSprint(t) &&
      (selectedTrackFilter === "all" || t.trackId === selectedTrackFilter)
  ).length;

  return (
    <section aria-label="Trilhas e resumos de Fisiologia" className="space-y-6">
      {/* Track filter pills */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onChangeTrackFilter("all")}
            className={`rounded-2xl border px-3.5 py-1.5 font-display text-xs font-bold transition-colors sm:text-sm ${
              selectedTrackFilter === "all"
                ? "border-ink bg-ink text-white"
                : "border-border-warm bg-surface text-ink-secondary hover:text-ink"
            }`}
          >
            Todas as trilhas (14)
          </button>
          {PHYSIOLOGY_TRACKS.map((track) => {
            const active = selectedTrackFilter === track.id;
            const activeCls =
              track.id === "gi"
                ? "border-mint bg-mint text-white"
                : track.id === "renal"
                ? "border-sky-med bg-sky-med text-white"
                : "border-berry bg-berry text-white";
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => onChangeTrackFilter(track.id)}
                className={`rounded-2xl border px-3.5 py-1.5 font-display text-xs font-bold transition-colors sm:text-sm ${
                  active
                    ? activeCls
                    : "border-border-warm bg-surface text-ink-secondary hover:text-ink"
                }`}
              >
                {track.shortName} ({track.topicCount})
              </button>
            );
          })}
        </div>

        <span className="text-xs font-semibold text-ink-secondary">
          Mostrando {visibleTopicsCount} tópico(s)
        </span>
      </div>

      {visibleTopicsCount === 0 && (
        <div className="rounded-3xl border border-[#A7F3D0] bg-mint-soft/40 p-8 text-center">
          <p className="font-display text-lg font-extrabold text-mint-ink">
            Uhuul!! Zero tópicos pendentes nesse filtro, Dra. Sophia! 🎉💚
          </p>
          <p className="mt-1 text-sm font-medium text-ink-secondary">
            Você já revisou todos os tópicos filtrados — que tal testar o Simulado ou os Flashcards 3D?
          </p>
        </div>
      )}

      {/* Track Sections */}
      <div className="space-y-8">
        {visibleTracks.map((track) => {
          const topics = PHYSIOLOGY_TOPICS.filter(
            (t) => t.trackId === track.id && matchesSprint(t)
          );
          if (topics.length === 0) return null;

          const tone =
            track.id === "gi"
              ? {
                  badge: "mint" as const,
                  glow: "mint" as const,
                  btn: "mint" as const,
                  accentBorder: "border-[#A7F3D0]",
                }
              : track.id === "renal"
              ? {
                  badge: "sky" as const,
                  glow: "sky" as const,
                  btn: "sky" as const,
                  accentBorder: "border-[#BAE6FD]",
                }
              : {
                  badge: "berry" as const,
                  glow: "berry" as const,
                  btn: "berry" as const,
                  accentBorder: "border-[#DDD6FE]",
                };

          const reviewedInTrack = PHYSIOLOGY_TOPICS.filter(
            (t) => t.trackId === track.id && reviewedTopics.includes(t.id)
          ).length;

          return (
            <div key={track.id} className="space-y-4">
              {/* Track Header */}
              <div
                className={`flex flex-wrap items-center justify-between gap-3 rounded-3xl border ${tone.accentBorder} bg-surface/95 p-4 shadow-kawaii`}
              >
                <div className="flex items-center gap-3">
                  <TrackMascot
                    trackId={track.id}
                    mood={reviewedInTrack === track.topicCount ? "cheering" : "idle"}
                    size="sm"
                  />
                  <div>
                    <h2 className="font-display text-lg font-extrabold text-ink sm:text-xl">
                      {track.name}
                    </h2>
                    <p className="text-xs font-medium text-ink-secondary sm:text-sm">
                      {track.subtitle}
                    </p>
                  </div>
                </div>
                <PastelBadge tone={tone.badge}>
                  {reviewedInTrack}/{track.topicCount} revisados
                </PastelBadge>
              </div>

              {/* Topic Grid */}
              <motion.div
                variants={shouldReduceMotion ? undefined : STAGGER_CONTAINER}
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                {topics.map((topic) => {
                  const isReviewed = reviewedTopics.includes(topic.id);
                  return (
                    <motion.div
                      key={topic.id}
                      variants={shouldReduceMotion ? undefined : CARD_REVEAL}
                    >
                      <HoverTiltCard
                        glowTone={tone.glow}
                        className={`flex h-full flex-col justify-between rounded-3xl border bg-surface p-5 shadow-kawaii ${
                          isReviewed ? tone.accentBorder : "border-border-warm"
                        }`}
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <PastelBadge tone={tone.badge}>
                                #{String(topic.order).padStart(2, "0")}
                              </PastelBadge>
                              <PastelBadge tone="neutral">
                                Dia {topic.dayPlan} ·{" "}
                                <Clock className="h-3 w-3" aria-hidden="true" />
                                {topic.estimatedMinutes} min
                              </PastelBadge>
                            </div>
                            {isReviewed && (
                              <PastelBadge tone="mint">
                                <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                                Revisado
                              </PastelBadge>
                            )}
                          </div>

                          <h3 className="mt-3 font-display text-base font-extrabold leading-snug text-ink sm:text-lg">
                            {topic.title}
                          </h3>

                          <p className="mt-2 text-xs font-medium leading-relaxed text-ink-secondary sm:text-sm">
                            {topic.shortSummary}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-ink-secondary">
                            <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1">
                              <BookOpen className="h-3 w-3" aria-hidden="true" />
                              {topic.keyConcepts.length} blocos de estudo
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-trap-soft px-2.5 py-1 text-amber-trap-ink">
                              <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                              {topic.examTraps.length} pegadinhas
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border-warm pt-3.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <SpringButton
                              variant={tone.btn}
                              size="sm"
                              onClick={() => onOpenTopic(topic)}
                            >
                              Estudar tópico
                            </SpringButton>
                            <a
                              href={topic.youtubePrimary.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-[34px] items-center gap-1.5 rounded-xl border border-border-warm bg-cream px-3 py-1.5 font-display text-xs font-bold text-ink transition-colors hover:bg-rose-mimo-soft/60"
                            >
                              <PlayCircle
                                className="h-3.5 w-3.5 text-[#B91C1C]"
                                aria-hidden="true"
                              />
                              MK Fisiologia
                            </a>
                          </div>

                          <button
                            type="button"
                            onClick={() => onToggleReviewed(topic)}
                            aria-label={
                              isReviewed
                                ? `Desmarcar ${topic.title} como revisado`
                                : `Marcar ${topic.title} como revisado`
                            }
                            className={`inline-flex min-h-[34px] items-center gap-1 rounded-xl border px-2.5 py-1.5 font-display text-xs font-bold transition-colors ${
                              isReviewed
                                ? "border-[#A7F3D0] bg-mint-soft text-mint-ink"
                                : "border-border-warm bg-surface text-ink-secondary hover:bg-cream hover:text-ink"
                            }`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            {isReviewed ? "Feito ✓" : "Marcar ✓"}
                          </button>
                        </div>
                      </HoverTiltCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
