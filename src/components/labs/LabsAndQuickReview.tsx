"use client";

import React, { useState } from "react";
import { Activity, Droplets, Sparkles, Zap } from "lucide-react";
import { GasometriaLab } from "@/components/labs/GasometriaLab";
import { NefronLab } from "@/components/labs/NefronLab";
import { EixosLab } from "@/components/labs/EixosLab";
import { QuickReviewCheatSheet } from "@/components/labs/QuickReviewCheatSheet";

type LabTabId = "all" | "gasometria" | "nefron" | "eixos" | "relampago";

const LAB_PILLS: readonly { id: LabTabId; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "Ver Tudo", icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> },
  { id: "gasometria", label: "Gasometria", icon: <Activity className="h-3.5 w-3.5" aria-hidden="true" /> },
  { id: "nefron", label: "Néfron SVG", icon: <Droplets className="h-3.5 w-3.5" aria-hidden="true" /> },
  { id: "eixos", label: "Eixos Hormonais", icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> },
  { id: "relampago", label: "Revisão 5 min", icon: <Zap className="h-3.5 w-3.5" aria-hidden="true" /> },
];

export function LabsAndQuickReview() {
  const [selected, setSelected] = useState<LabTabId>("all");

  return (
    <section aria-label="Mini-Labs interativos e Revisão Relâmpago" className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {LAB_PILLS.map((pill) => {
          const active = selected === pill.id;
          return (
            <button
              key={pill.id}
              type="button"
              onClick={() => setSelected(pill.id)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 rounded-2xl border px-3.5 py-2 font-display text-xs font-bold transition-colors sm:text-sm ${
                active
                  ? "border-sky-med bg-sky-med text-white shadow-sm"
                  : "border-border-warm bg-surface text-ink-secondary hover:text-ink"
              }`}
            >
              {pill.icon}
              {pill.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {(selected === "all" || selected === "gasometria") && <GasometriaLab />}
        {(selected === "all" || selected === "nefron") && <NefronLab />}
        {(selected === "all" || selected === "eixos") && <EixosLab />}
        {(selected === "all" || selected === "relampago") && <QuickReviewCheatSheet />}
      </div>
    </section>
  );
}
