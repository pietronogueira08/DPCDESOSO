"use client";

import React, { useState } from "react";
import { ChevronDown, Zap } from "lucide-react";
import { KawaiiCard } from "@/components/ui/KawaiiCard";
import { PastelBadge } from "@/components/ui/PastelBadge";

interface CheatCard {
  readonly id: string;
  readonly title: string;
  readonly badge: string;
  readonly tone: "mint" | "sky" | "berry";
  readonly items: readonly { label: string; value: string }[];
}

const CHEAT_CARDS: readonly CheatCard[] = [
  {
    id: "gi-sheet",
    title: "Resumo Relâmpago · Secreções, Absorção & Bile (GI)",
    badge: "Trilha 1",
    tone: "mint",
    items: [
      { label: "Célula Parietal", value: "HCl (H+/K+-ATPase) + Fator Intrínseco (único vital -> B12)." },
      { label: "Estímulos HCl", value: "ACh (M3), Gastrina (CCK-B), Histamina (H2 = mais potente). Inibe: Somatostatina (D)." },
      { label: "Secretina vs CCK", value: "Secretina (pH <4,5) -> HCO3− ductal (CFTR). CCK (gordura/aa) -> enzimas + contrai vesícula + abre Oddi." },
      { label: "Carboidratos", value: "SGLT1 (Glicose/Galactose + Na+); GLUT5 (Frutose); GLUT2 (saída portal)." },
      { label: "Sítios Ouro", value: "Ferro/Ca2+ = Duodeno; Di/tripeptídeos = PepT1; B12 e 95% Sais Biliares = Íleo terminal." },
      { label: "Bilirrubina", value: "Indireta (albumina, não filtra) -> UDP-glicuronil transferase -> Direta (bile / colúria se obstruir)." },
    ],
  },
  {
    id: "renal-sheet",
    title: "Fórmulas & Valores de Ouro (Renal & Ácido-Base)",
    badge: "Trilha 2",
    tone: "sky",
    items: [
      { label: "TFG & Starling", value: "TFG ≈ 125 mL/min (180 L/dia). Ang II contrai preferencialmente arteríola eferente." },
      { label: "TCP (~65%)", value: "Reabsorção iso-osmótica: 65% Na+/H2O, 100% glicose (SGLT2/1, limiar ~180 mg/dL), 80–85% HCO3−." },
      { label: "Alça & Coletor", value: "Descendente = AQP1 (H2O). Ascendente espesso = NKCC2 (sem H2O). ADH = AQP2 (V2). Aldosterona = ENaC/ROMK." },
      { label: "Micção", value: "Enchimento = Simpático (T11–L2). Esvaziamento = Parassimpático (S2–S4, M3). Esfíncter externo = Pudendo." },
      { label: "Gasometria Normal", value: "pH 7,35–7,45 | PaCO2 35–45 mmHg | HCO3− 22–26 mEq/L | Ânion Gap 8–12 mEq/L." },
      { label: "Fórmulas-Chave", value: "Winter: PaCO2 = 1,5 × HCO3− + 8 ± 2 | AG = Na+ − (Cl− + HCO3−)." },
    ],
  },
  {
    id: "endo-sheet",
    title: "Tabela-Mestra de Hormônios (Endócrino)",
    badge: "Trilha 3",
    tone: "berry",
    items: [
      { label: "Hipófise", value: "Dopamina inibe PRL; Neuro-hipófise só armazena/libera ADH (supraóptico) e Ocitocina (paraventricular)." },
      { label: "Tireoide & Ca2+", value: "TPO faz oxidação/organificação/acoplamento. PTH ↑Ca2+ e ↓PO4; Vitamina D ↑Ca2+ e ↑PO4." },
      { label: "Pâncreas & Adrenal", value: "Insulina (GLUT2 -> K+ATP -> Ca2+; GLUT4 músculo/adiposo). GFR: Aldosterona, Cortisol, DHEA." },
      { label: "Reprodutor M", value: "Leydig (LH -> Testosterona -> DHT 5α-redutase / E2 aromatase); Sertoli (FSH -> espermatogênese + Inibina B)." },
      { label: "Reprodutor F", value: "Teca (LH -> andrógeno) -> Granulosa (FSH/aromatase -> E2). E2 sustentado = Feedback + -> Pico de LH!" },
      { label: "Gestação & Leite", value: "hCG salva corpo lúteo; Parto = Reflexo Ferguson (ocitocina); Prolactina sintetiza leite, Ocitocina ejeta." },
    ],
  },
];

export function QuickReviewCheatSheet() {
  const [openIds, setOpenIds] = useState<string[]>(["renal-sheet"]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <KawaiiCard className="p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1">
          <PastelBadge tone="rose">
            <Zap className="h-3.5 w-3.5" aria-hidden="true" />
            Revisão Relâmpago (5 min)
          </PastelBadge>
          <h2 className="font-display text-xl font-extrabold text-ink">
            Folha de Cola Inteligente para a Última Hora antes da Prova
          </h2>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {CHEAT_CARDS.map((card) => {
          const isOpen = openIds.includes(card.id);
          return (
            <div
              key={card.id}
              className="overflow-hidden rounded-2xl border border-border-warm bg-cream/55"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(card.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-cream"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <PastelBadge tone={card.tone}>{card.badge}</PastelBadge>
                  <span className="font-display text-sm font-extrabold text-ink sm:text-base">
                    {card.title}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-ink-secondary transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div className="grid grid-cols-1 gap-2.5 border-t border-border-warm bg-surface p-4 md:grid-cols-2">
                  {card.items.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-border-warm bg-canvas p-3 text-xs leading-relaxed sm:text-sm"
                    >
                      <div className="font-display font-extrabold text-ink">
                        {item.label}
                      </div>
                      <div className="mt-0.5 font-medium text-ink-secondary">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </KawaiiCard>
  );
}
