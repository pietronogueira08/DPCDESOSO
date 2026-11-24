"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Circle } from "lucide-react";
import {
  EvidencePyramidLab,
  BooleanBuilderLab,
  PredatoryDetectorLab,
  SubmissionStrategyLab,
} from "@/components/study/Aula13Labs";
import {
  ProjectBlocksMap,
  FormattingCheatLab,
  SectionHierarchyVisualizer,
  AiDeclarationLab,
} from "@/components/study/Aula14Labs";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  AULA13_CONCEITO,
  AULA13_TIPOS_PUBLICACAO,
  STUDY_SECTIONS,
  type SectionId,
  type StudySectionMeta,
} from "@/data/dpc-content";
import type { AulaFilter } from "@/components/study/StudyHeader";
import { useSafeMotion } from "@/lib/motion";

interface SummaryTabProps {
  aulaFilter: AulaFilter;
  reviewedSections: SectionId[];
  onToggleReviewed: (sectionId: SectionId) => void;
}

function renderSectionBody(sectionId: SectionId): ReactNode {
  switch (sectionId) {
    case "a13-conceito":
      return (
        <div className="space-y-4">
          <div className="rounded-2xl border border-mint/25 bg-mint-soft/30 p-4 text-sm leading-relaxed text-ink">
            {AULA13_CONCEITO.definition}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border-warm bg-cream/65 p-4">
              <h4 className="font-display text-sm font-extrabold uppercase tracking-wide text-mint-ink">
                4 Objetivos Principais
              </h4>
              <ul className="mt-2.5 list-disc space-y-1.5 pl-4 text-xs text-ink sm:text-sm">
                {AULA13_CONCEITO.objectives.map((obj) => (
                  <li key={obj}>{obj}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border-warm bg-cream/65 p-4">
              <h4 className="font-display text-sm font-extrabold uppercase tracking-wide text-mint-ink">
                5 Competências da Aula
              </h4>
              <ol className="mt-2.5 list-decimal space-y-1.5 pl-4 text-xs text-ink sm:text-sm">
                {AULA13_CONCEITO.competencies.map((comp) => (
                  <li key={comp}>{comp}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      );
    case "a13-tipos":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {AULA13_TIPOS_PUBLICACAO.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border-warm bg-cream/60 p-4"
            >
              <h4 className="font-display text-base font-extrabold text-ink">
                {item.vehicle}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted sm:text-sm">
                {item.summary}
              </p>
              {item.subtypes && (
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-ink">
                  {item.subtypes.map((sub) => (
                    <li key={sub}>{sub}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      );
    case "a13-piramide":
      return <EvidencePyramidLab />;
    case "a13-bases-booleanos":
      return <BooleanBuilderLab />;
    case "a13-periodicos-metricas":
      return <PredatoryDetectorLab />;
    case "a13-estrategia":
      return <SubmissionStrategyLab />;
    case "a14-elementos":
      return <ProjectBlocksMap />;
    case "a14-formatacao":
      return <FormattingCheatLab />;
    case "a14-hierarquia":
      return <SectionHierarchyVisualizer />;
    case "a14-declaracao-ia":
      return <AiDeclarationLab />;
  }
}

export function SummaryTab({
  aulaFilter,
  reviewedSections,
  onToggleReviewed,
}: SummaryTabProps) {
  const [expandedIds, setExpandedIds] = useState<SectionId[]>([
    "a13-piramide",
    "a14-elementos",
  ]);
  const { springGentle, staggerContainer, staggerItem } = useSafeMotion();

  const visibleSections: StudySectionMeta[] = STUDY_SECTIONS.filter(
    (s) => aulaFilter === "all" || s.aula === aulaFilter
  );

  const toggleExpand = (id: SectionId) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border-warm bg-surface px-4 py-3 text-xs text-ink-muted sm:text-sm">
        <span>
          Toque nos módulos abaixo para abrir os resumos e laboratórios interativos, e marque os que você já revisou.
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setExpandedIds(visibleSections.map((s) => s.id))}
            className="font-bold text-mint-ink underline-offset-4 hover:underline"
          >
            Abrir todos
          </button>
          <span aria-hidden="true">•</span>
          <button
            type="button"
            onClick={() => setExpandedIds([])}
            className="font-bold text-ink-muted underline-offset-4 hover:underline"
          >
            Recolher todos
          </button>
        </div>
      </div>

      {visibleSections.map((section) => {
        const isExpanded = expandedIds.includes(section.id);
        const isReviewed = reviewedSections.includes(section.id);
        const panelId = `section-panel-${section.id}`;

        return (
          <motion.div key={section.id} variants={staggerItem}>
            <Card
              tone={isReviewed ? "mint" : "default"}
              padded={false}
              className="overflow-hidden transition-shadow hover:shadow-cozy-hover"
            >
              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => toggleExpand(section.id)}
                  className="flex min-w-0 flex-1 items-start gap-3 text-left"
                >
                  <span
                    className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl transition-transform ${
                      isExpanded ? "rotate-180 bg-cream" : "bg-cream"
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="h-4 w-4 text-ink" />
                  </span>
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <Badge tone={section.aula === "aula13" ? "mint" : "lavender"}>
                        {section.badgeLabel}
                      </Badge>
                      {isReviewed && <Badge tone="mint">Revisado ✓</Badge>}
                    </div>
                    <h2 className="font-display text-lg font-extrabold text-ink sm:text-xl">
                      {section.title}
                    </h2>
                    <p className="mt-0.5 text-xs text-ink-muted sm:text-sm">
                      {section.subtitle}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  aria-pressed={isReviewed}
                  onClick={() => onToggleReviewed(section.id)}
                  className={`inline-flex min-h-[38px] shrink-0 items-center justify-center gap-2 self-start rounded-2xl border px-3.5 py-1.5 text-xs font-bold transition-colors sm:self-center ${
                    isReviewed
                      ? "border-mint-deep bg-mint-deep text-white hover:bg-mint-ink"
                      : "border-border-warm bg-cream text-ink hover:bg-mint-soft/50"
                  }`}
                >
                  {isReviewed ? (
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Circle className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>
                    {isReviewed ? "Revisado ✓" : "Marcar como revisado"}
                  </span>
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={panelId}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={springGentle}
                    className="overflow-hidden border-t border-border-warm bg-surface/90"
                  >
                    <div className="p-4 sm:p-6">{renderSectionBody(section.id)}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
