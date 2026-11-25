"use client";

import React, { useState } from "react";
import { Droplets } from "lucide-react";
import { DraUrsinha } from "@/components/mascots/AnimatedMascots";
import { KawaiiCard } from "@/components/ui/KawaiiCard";
import { PastelBadge } from "@/components/ui/PastelBadge";

type NephronSegmentId = "glomerulo" | "tcp" | "henle" | "tcd" | "coletor";

interface NephronSegment {
  readonly id: NephronSegmentId;
  readonly label: string;
  readonly shortLabel: string;
  readonly reabsorbedPct: string;
  readonly osmolarity: string;
  readonly transporters: string;
  readonly hormones: string;
  readonly pearl: string;
  readonly color: string;
}

const SEGMENTS: readonly NephronSegment[] = [
  {
    id: "glomerulo",
    label: "Glomérulo & Cápsula de Bowman",
    shortLabel: "Glomérulo",
    reabsorbedPct: "Filtração: ~180 L/dia (TFG ~125 mL/min)",
    osmolarity: "~300 mOsm/L (ultrafiltrado livre de proteínas)",
    transporters: "Barreira de 3 camadas: endotélio fenestrado + MBG negativa (heparan sulfato) + podócitos",
    hormones: "Angiotensina II (contrai eferente, mantém TFG); Adenosina (contrai aferente no feedback TG)",
    pearl:
      "Síndrome nefrótica perde carga negativa da MBG e deixa albumina escapar; IECA dilata arteríola eferente.",
    color: "#EC4899",
  },
  {
    id: "tcp",
    label: "Túbulo Contorcido Proximal (TCP)",
    shortLabel: "TCP",
    reabsorbedPct: "~65% de Na+/H2O · 100% Glicose & Aminoácidos · ~80–85% HCO3−",
    osmolarity: "Iso-osmótico do início ao fim (~300 mOsm/L)",
    transporters: "SGLT2/SGLT1 (glicose + Na+), NHE3 (Na+/H+), NaPi-IIa (fosfato), OAT/OCT (secreção de PAH/ácidos)",
    hormones: "PTH inibe NaPi-IIa (fosfatúria) e ativa 1-alfa-hidroxilase; Angiotensina II estimula NHE3",
    pearl:
      "Limiar renal da glicose ~180 mg/dL (Tm ≈ 375 mg/min); inibidores de SGLT2 bloqueiam ~90% da reabsorção de glicose aqui.",
    color: "#10B981",
  },
  {
    id: "henle",
    label: "Alça de Henle (Descendente & Ascendente)",
    shortLabel: "Alça de Henle",
    reabsorbedPct: "~25% de NaCl (ramo ascendente espesso) · ~15–20% de H2O (ramo descendente)",
    osmolarity: "300 → 1200 mOsm/L (curva) → ~100 mOsm/L (saída para o TCD)",
    transporters: "Ramo descendente: AQP1 (permeável à água). Ramo ascendente espesso: NKCC2 (impermeável à água)",
    hormones: "ADH aumenta expressão/atividade de NKCC2 na medula externa para reforçar o gradiente",
    pearl:
      "Segmento diluidor! Furosemida bloqueia NKCC2 e destrói o gradiente corticomedular (perde concentração e diluição).",
    color: "#0EA5E9",
  },
  {
    id: "tcd",
    label: "Túbulo Contorcido Distal (TCD)",
    shortLabel: "TCD",
    reabsorbedPct: "~5% de NaCl · Ajuste fino de Ca2+ e Mg2+",
    osmolarity: "Chega hipotônico (~100 mOsm/L) e sai ainda mais diluído (impermeável à água)",
    transporters: "Cotransportador NCC (Na+/Cl−) na porção inicial; canais TRPV5 (Ca2+) na porção distal",
    hormones: "PTH estimula reabsorção ativa de Ca2+ no TCD; Mácula Densa (TCD inicial) regula a TFG",
    pearl:
      "Tiazídicos (hidroclorotiazida) bloqueiam NCC → aumentam reabsorção de Ca2+ (protegem contra cálculos de cálcio!).",
    color: "#8B5CF6",
  },
  {
    id: "coletor",
    label: "Ducto Coletor (Cortical & Medular)",
    shortLabel: "Ducto Coletor",
    reabsorbedPct: "~2–5% final de Na+ · Água variável (0,5 a 18 L/dia de urina)",
    osmolarity: "50 mOsm/L (sem ADH) até 1200 mOsm/L (com ADH máximo)",
    transporters: "Células principais: ENaC (Na+), ROMK (K+), AQP2 (água) | Células intercaladas alfa: H+-ATPase",
    hormones: "ADH (V2 → AMPc → AQP2 + UT-A1 ureia); Aldosterona (ENaC + ROMK + Na+/K+-ATPase + secreção de H+)",
    pearl:
      "Espironolactona e amilorida agem aqui como poupadores de potássio; diabetes insípido falha na via do ADH/AQP2.",
    color: "#0369A1",
  },
];

export function NefronLab() {
  const [activeId, setActiveId] = useState<NephronSegmentId>("henle");
  const current = SEGMENTS.find((s) => s.id === activeId) ?? SEGMENTS[0];

  return (
    <KawaiiCard tone="sky" className="p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <PastelBadge tone="sky">
            <Droplets className="h-3.5 w-3.5" aria-hidden="true" />
            Mini-Lab 2 · Mapa Interativo do Néfron
          </PastelBadge>
          <h2 className="font-display text-xl font-extrabold text-ink">
            Clique em um segmento do néfron para revisar transporte &amp; hormônios
          </h2>
        </div>
      </div>

      {/* Synchronized Pill Selector (great for mobile & keyboard) */}
      <div className="mt-4 flex flex-wrap gap-2">
        {SEGMENTS.map((seg) => {
          const active = seg.id === activeId;
          return (
            <button
              key={seg.id}
              type="button"
              onClick={() => setActiveId(seg.id)}
              aria-pressed={active}
              className={`rounded-2xl border px-3 py-1.5 font-display text-xs font-bold transition-all sm:text-sm ${
                active
                  ? "border-sky-med bg-sky-med text-white shadow-sm"
                  : "border-border-warm bg-cream text-ink-secondary hover:text-ink"
              }`}
            >
              {seg.shortLabel}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Interactive Inline SVG Nephron */}
        <div className="flex items-center justify-center rounded-3xl border border-[#BAE6FD] bg-gradient-to-b from-[#FFFDF9] to-[#E0F2FE]/40 p-4 lg:col-span-6">
          <svg
            viewBox="0 0 640 340"
            role="img"
            aria-label="Diagrama interativo dos 5 segmentos do néfron"
            className="h-auto w-full max-w-[540px] select-none"
          >
            {/* Cortex / Medulla divider */}
            <line
              x1="20"
              y1="175"
              x2="620"
              y2="175"
              stroke="#CBD5E1"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <text x="24" y="166" fill="#575061" fontSize="12" fontWeight="700">
              CÓRTEX (~300 mOsm/L)
            </text>
            <text x="24" y="194" fill="#0369A1" fontSize="12" fontWeight="700">
              MEDULA (300 → 1200 mOsm/L)
            </text>

            {/* 1. Glomerulus + Bowman's Capsule */}
            <g
              onClick={() => setActiveId("glomerulo")}
              className="cursor-pointer"
            >
              <circle
                cx="92"
                cy="92"
                r="40"
                fill={activeId === "glomerulo" ? "#FCE7F3" : "#FFFFFF"}
                stroke={activeId === "glomerulo" ? "#BE185D" : "#F472B6"}
                strokeWidth={activeId === "glomerulo" ? 5 : 3}
              />
              <path
                d="M72 92 Q82 72 94 92 T112 92"
                fill="none"
                stroke="#EC4899"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <text x="92" y="42" textAnchor="middle" fill="#26232B" fontSize="13" fontWeight="800">
                1. Glomérulo
              </text>
            </g>

            {/* 2. Proximal Convoluted Tubule (TCP) */}
            <g onClick={() => setActiveId("tcp")} className="cursor-pointer">
              <path
                d="M132 92 C160 64, 185 118, 212 88 C236 62, 260 112, 276 112"
                fill="none"
                stroke={activeId === "tcp" ? "#047857" : "#6EE7B7"}
                strokeWidth={activeId === "tcp" ? 18 : 13}
                strokeLinecap="round"
              />
              <text x="206" y="54" textAnchor="middle" fill="#26232B" fontSize="13" fontWeight="800">
                2. TCP (65%)
              </text>
            </g>

            {/* 3. Loop of Henle */}
            <g onClick={() => setActiveId("henle")} className="cursor-pointer">
              <path
                d="M276 112 L276 286 C276 312, 336 312, 336 286 L336 112"
                fill="none"
                stroke={activeId === "henle" ? "#0369A1" : "#7DD3FC"}
                strokeWidth={activeId === "henle" ? 17 : 12}
                strokeLinecap="round"
              />
              <text x="306" y="328" textAnchor="middle" fill="#26232B" fontSize="13" fontWeight="800">
                3. Alça de Henle
              </text>
            </g>

            {/* 4. Distal Convoluted Tubule (TCD) */}
            <g onClick={() => setActiveId("tcd")} className="cursor-pointer">
              <path
                d="M336 112 C356 76, 386 122, 414 90 C440 62, 468 106, 492 92"
                fill="none"
                stroke={activeId === "tcd" ? "#6D28D9" : "#C4B5FD"}
                strokeWidth={activeId === "tcd" ? 18 : 13}
                strokeLinecap="round"
              />
              <text x="415" y="54" textAnchor="middle" fill="#26232B" fontSize="13" fontWeight="800">
                4. TCD (NCC)
              </text>
            </g>

            {/* 5. Collecting Duct */}
            <g onClick={() => setActiveId("coletor")} className="cursor-pointer">
              <path
                d="M492 92 L520 92 L520 302"
                fill="none"
                stroke={activeId === "coletor" ? "#075985" : "#38BDF8"}
                strokeWidth={activeId === "coletor" ? 20 : 14}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="540" y="138" fill="#26232B" fontSize="13" fontWeight="800">
                5. Ducto
              </text>
              <text x="540" y="154" fill="#26232B" fontSize="13" fontWeight="800">
                Coletor
              </text>
              <text x="520" y="325" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="800">
                Urina Final
              </text>
            </g>
          </svg>
        </div>

        {/* Segment Inspector Card */}
        <div className="flex flex-col justify-between gap-3 rounded-3xl border border-border-warm bg-surface p-5 lg:col-span-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-lg font-extrabold text-ink sm:text-xl">
                {current.label}
              </h3>
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full"
                style={{ backgroundColor: current.color }}
                aria-hidden="true"
              />
            </div>

            <div className="grid grid-cols-1 gap-2.5 text-xs sm:text-sm">
              <div className="rounded-2xl bg-sky-med-soft/55 p-3">
                <span className="font-display font-extrabold text-sky-med-ink">
                  Volume / Reabsorção:{" "}
                </span>
                <span className="font-medium text-ink">{current.reabsorbedPct}</span>
              </div>
              <div className="rounded-2xl bg-cream p-3">
                <span className="font-display font-extrabold text-ink">
                  Osmolaridade tubular:{" "}
                </span>
                <span className="font-medium text-ink-secondary">
                  {current.osmolarity}
                </span>
              </div>
              <div className="rounded-2xl bg-mint-soft/50 p-3">
                <span className="font-display font-extrabold text-mint-ink">
                  Transportadores:{" "}
                </span>
                <span className="font-medium text-ink">{current.transporters}</span>
              </div>
              <div className="rounded-2xl bg-berry-soft/55 p-3">
                <span className="font-display font-extrabold text-berry-ink">
                  Hormônios:{" "}
                </span>
                <span className="font-medium text-ink">{current.hormones}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-amber-trap-border bg-amber-trap-soft/70 p-3.5">
            <DraUrsinha mood="cheering" size="sm" />
            <p className="text-xs font-semibold leading-relaxed text-ink">
              <strong className="text-amber-trap-ink">Pérola de Prova: </strong>
              {current.pearl}
            </p>
          </div>
        </div>
      </div>
    </KawaiiCard>
  );
}
