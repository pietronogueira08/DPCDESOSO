"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock, CheckCircle2, Sparkles } from "lucide-react";
import {
  PHYSIOLOGY_TOPICS,
  PHYSIOLOGY_TRACKS,
  type TrackId,
} from "@/data/physiology-tracks";
import { MIMO_MESSAGES, pickMessage } from "@/data/mimo-messages";
import {
  DrCoelhinho,
  GatinhaEndocrino,
  TrackMascot,
} from "@/components/mascots/AnimatedMascots";
import { HoverTiltCard } from "@/components/motion/HoverTiltCard";
import { AnimatedProgressBar } from "@/components/ui/AnimatedProgressBar";
import { PastelBadge } from "@/components/ui/PastelBadge";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { CARD_REVEAL, STAGGER_CONTAINER, useSafeMotion } from "@/lib/motion";

export type SprintFilter = "all" | "day1" | "day2" | "pending";

interface HeroDashboardProps {
  reviewedTopics: readonly string[];
  masteredFlashcardsCount: number;
  quizCorrectCount: number;
  sprintFilter: SprintFilter;
  onSelectSprintFilter: (filter: SprintFilter) => void;
  onSelectTrack: (trackId: TrackId) => void;
}

const SPRINT_FILTERS: readonly { id: SprintFilter; label: string }[] = [
  { id: "all", label: "Todos (14)" },
  { id: "day1", label: "Dia 1: GI + Renal (8)" },
  { id: "day2", label: "Dia 2: Endócrino (6)" },
  { id: "pending", label: "Só Pendentes" },
];

export function HeroDashboard({
  reviewedTopics,
  masteredFlashcardsCount,
  quizCorrectCount,
  sprintFilter,
  onSelectSprintFilter,
  onSelectTrack,
}: HeroDashboardProps) {
  const { shouldReduceMotion } = useSafeMotion();
  const [subtitleIdx, setSubtitleIdx] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setInterval(() => {
      setSubtitleIdx((prev) => (prev + 1) % MIMO_MESSAGES.heroSubtitles.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  const subtitle = pickMessage(MIMO_MESSAGES.heroSubtitles, subtitleIdx);

  return (
    <motion.section
      variants={shouldReduceMotion ? undefined : STAGGER_CONTAINER}
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      aria-label="Painel inicial da Sophia"
      className="space-y-5"
    >
      {/* Hero Banner Card */}
      <motion.div
        variants={shouldReduceMotion ? undefined : CARD_REVEAL}
        className="relative overflow-hidden rounded-3xl border border-border-warm bg-gradient-to-br from-surface via-[#FFFBF5] to-[#FCE7F3]/45 p-5 shadow-kawaii sm:p-7"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Greeting & Sprint Controls */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <PastelBadge tone="rose">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Sprint 48h · Prova de Sexta
              </PastelBadge>
              <PastelBadge tone="mint">Guyton &amp; Hall · Silverthorn</PastelBadge>
            </div>

            <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl lg:text-[2.15rem]">
              Oi, Sophia! Pronta pra amassar Fisiologia sexta-feira?
            </h1>

            <p className="min-h-[2.5rem] text-sm font-medium leading-relaxed text-ink-secondary sm:text-base">
              {subtitle}
            </p>

            {/* Rota de Ataque 48h */}
            <div className="pt-1">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-secondary">
                <CalendarClock className="h-3.5 w-3.5 text-rose-mimo" aria-hidden="true" />
                Rota de Ataque 48h
              </div>
              <div className="flex flex-wrap gap-2">
                {SPRINT_FILTERS.map((f) => {
                  const active = sprintFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => onSelectSprintFilter(f.id)}
                      aria-pressed={active}
                      className={`rounded-2xl border px-3 py-1.5 text-xs font-display font-bold transition-all sm:text-[13px] ${
                        active
                          ? "border-rose-mimo bg-rose-mimo text-white shadow-sm"
                          : "border-border-warm bg-surface text-ink-secondary hover:bg-cream hover:text-ink"
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Mascots + Mastery Ring */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border-warm bg-surface/90 p-4 shadow-sm sm:justify-center sm:gap-5 lg:shrink-0">
            <div className="flex items-center -space-x-3">
              <DrCoelhinho mood="cheering" size="md" />
              <GatinhaEndocrino mood="love" size="md" />
            </div>

            <div className="flex items-center gap-4">
              <ProgressRing
                completed={reviewedTopics.length}
                total={PHYSIOLOGY_TOPICS.length}
                size={104}
              />
              <div className="space-y-1.5 text-xs">
                <div className="font-display text-sm font-extrabold text-ink">
                  Domínio Geral
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-mint-ink">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{reviewedTopics.length}/14 tópicos</span>
                </div>
                <div className="font-semibold text-berry-ink">
                  ✨ {masteredFlashcardsCount}/42 flashcards
                </div>
                <div className="font-semibold text-sky-med-ink">
                  🎯 {quizCorrectCount}/28 questões
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3 Clickable Track Progress Cards */}
      <motion.div
        variants={shouldReduceMotion ? undefined : CARD_REVEAL}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {PHYSIOLOGY_TRACKS.map((track) => {
          const trackTopics = PHYSIOLOGY_TOPICS.filter(
            (t) => t.trackId === track.id
          );
          const doneCount = trackTopics.filter((t) =>
            reviewedTopics.includes(t.id)
          ).length;

          const toneStyle =
            track.id === "gi"
              ? {
                  badge: "mint" as const,
                  bar: "mint" as const,
                  glow: "mint" as const,
                  border: "border-[#A7F3D0]",
                  bg: "bg-gradient-to-br from-surface to-[#D1FAE5]/30",
                  text: "text-mint-ink",
                }
              : track.id === "renal"
              ? {
                  badge: "sky" as const,
                  bar: "sky" as const,
                  glow: "sky" as const,
                  border: "border-[#BAE6FD]",
                  bg: "bg-gradient-to-br from-surface to-[#E0F2FE]/35",
                  text: "text-sky-med-ink",
                }
              : {
                  badge: "berry" as const,
                  bar: "berry" as const,
                  glow: "berry" as const,
                  border: "border-[#DDD6FE]",
                  bg: "bg-gradient-to-br from-surface to-[#EDE9FE]/35",
                  text: "text-berry-ink",
                };

          return (
            <HoverTiltCard
              key={track.id}
              glowTone={toneStyle.glow}
              className={`rounded-3xl border ${toneStyle.border} ${toneStyle.bg} shadow-kawaii`}
            >
              <button
                type="button"
                onClick={() => onSelectTrack(track.id)}
                className="flex h-full w-full flex-col justify-between p-4 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <PastelBadge tone={toneStyle.badge}>{track.dayLabel}</PastelBadge>
                    <h2 className="font-display text-base font-extrabold text-ink sm:text-lg">
                      {track.shortName}
                    </h2>
                    <p className="line-clamp-2 text-xs font-medium text-ink-secondary">
                      {track.subtitle}
                    </p>
                  </div>
                  <TrackMascot
                    trackId={track.id}
                    mood={doneCount === track.topicCount ? "cheering" : "idle"}
                    size="sm"
                  />
                </div>

                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className={toneStyle.text}>
                      {doneCount === track.topicCount
                        ? "Trilha zerada! 🏆"
                        : "Ver tópicos →"}
                    </span>
                    <span className="text-ink">
                      {doneCount}/{track.topicCount}
                    </span>
                  </div>
                  <AnimatedProgressBar
                    value={doneCount}
                    max={track.topicCount}
                    tone={toneStyle.bar}
                    label={`Progresso em ${track.shortName}`}
                  />
                </div>
              </button>
            </HoverTiltCard>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
