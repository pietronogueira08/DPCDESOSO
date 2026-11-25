"use client";

import React, { useMemo, useState } from "react";
import { Activity, RotateCcw } from "lucide-react";
import { DraUrsinha, type MascotMood } from "@/components/mascots/AnimatedMascots";
import { KawaiiCard } from "@/components/ui/KawaiiCard";
import { PastelBadge } from "@/components/ui/PastelBadge";
import { SpringButton } from "@/components/ui/SpringButton";

interface AbgPreset {
  readonly id: string;
  readonly label: string;
  readonly ph: number;
  readonly paco2: number;
  readonly hco3: number;
  readonly na: number;
  readonly cl: number;
}

const PRESETS: readonly AbgPreset[] = [
  {
    id: "dka",
    label: "Cetoacidose Diabética",
    ph: 7.21,
    paco2: 24,
    hco3: 10,
    na: 138,
    cl: 102,
  },
  {
    id: "dpoc",
    label: "DPOC Retentor Crônico",
    ph: 7.34,
    paco2: 60,
    hco3: 32,
    na: 140,
    cl: 98,
  },
  {
    id: "vomitos",
    label: "Vômitos Prolongados",
    ph: 7.52,
    paco2: 47,
    hco3: 36,
    na: 137,
    cl: 90,
  },
  {
    id: "ansiedade",
    label: "Hiperventilação (Ansiedade)",
    ph: 7.53,
    paco2: 26,
    hco3: 22,
    na: 140,
    cl: 106,
  },
];

interface GasometriaAnalysis {
  primaryTitle: string;
  statusTone: "mint" | "sky" | "amber" | "crimson";
  mascotMood: MascotMood;
  compensationLine: string;
  anionGap: number;
  anionGapLabel: string;
  ursinhaTip: string;
}

function analyzeBloodGas(
  ph: number,
  paco2: number,
  hco3: number,
  na: number,
  cl: number
): GasometriaAnalysis {
  const anionGap = Math.round((na - (cl + hco3)) * 10) / 10;
  const anionGapLabel =
    anionGap > 12
      ? `Elevado (${anionGap} mEq/L — ganho de ácido fixo: cetoácidos, lactato, uremia, intoxicações)`
      : anionGap < 8
      ? `Baixo (${anionGap} mEq/L — checar hipoalbuminemia)`
      : `Normal (${anionGap} mEq/L — se acidose metabólica, pensar em perda GI de HCO3− ou ATR)`;

  // Normal check
  if (ph >= 7.35 && ph <= 7.45 && paco2 >= 35 && paco2 <= 45 && hco3 >= 22 && hco3 <= 26) {
    return {
      primaryTitle: "Gasometria Arterial Normal",
      statusTone: "mint",
      mascotMood: "cheering",
      compensationLine:
        "Todos os parâmetros dentro da faixa fisiológica (pH 7,35–7,45 | PaCO2 35–45 | HCO3− 22–26).",
      anionGap,
      anionGapLabel,
      ursinhaTip:
        "Show, Sophia! Equilíbrio perfeito — testa agora os presets clínicos ali em cima pra treinar o olho na hora da prova 💙",
    };
  }

  // Acidemia
  if (ph < 7.35) {
    const metabolic = hco3 < 22;
    const respiratory = paco2 > 45;

    if (metabolic && !respiratory) {
      const winterCenter = 1.5 * hco3 + 8;
      const winterLow = Math.round((winterCenter - 2) * 10) / 10;
      const winterHigh = Math.round((winterCenter + 2) * 10) / 10;
      let comp = `Fórmula de Winter: PaCO2 esperada = ${winterLow} a ${winterHigh} mmHg.`;
      if (paco2 < winterLow) {
        comp += " PaCO2 atual está ABAIXO do esperado → Alcalose Respiratória associada (distúrbio misto).";
      } else if (paco2 > winterHigh) {
        comp += " PaCO2 atual está ACIMA do esperado → Acidose Respiratória associada (falha ventilatória!).";
      } else {
        comp += " Compensação respiratória ADEQUADA!";
      }

      return {
        primaryTitle: "Acidose Metabólica",
        statusTone: "crimson",
        mascotMood: "studying",
        compensationLine: comp,
        anionGap,
        anionGapLabel,
        ursinhaTip:
          anionGap > 12
            ? "Olho no Ânion Gap alto, gatinha! Pensa em CAD, lactato, uremia ou intoxicações (MUDPILES)."
            : "Ânion Gap normal! Clássico de diarreia (perda de HCO3−) ou Acidose Tubular Renal.",
      };
    }

    if (respiratory && !metabolic) {
      const deltaPaco2 = Math.max(0, paco2 - 40);
      const expectedAcute = Math.round((24 + (deltaPaco2 / 10) * 1) * 10) / 10;
      const expectedChronic = Math.round((24 + (deltaPaco2 / 10) * 3.5) * 10) / 10;
      const comp =
        hco3 >= expectedChronic - 1.5
          ? `Compensação renal crônica ativa (HCO3− esperado crônico ≈ ${expectedChronic} mEq/L; agudo ≈ ${expectedAcute} mEq/L).`
          : `Padrão agudo ou subagudo (HCO3− esperado agudo ≈ ${expectedAcute} mEq/L; crônico ≈ ${expectedChronic} mEq/L).`;

      return {
        primaryTitle: "Acidose Respiratória",
        statusTone: "sky",
        mascotMood: "studying",
        compensationLine: comp,
        anionGap,
        anionGapLabel,
        ursinhaTip:
          "Na acidose respiratória o rim reage devagar (horas/dias) retendo HCO3− e excretando NH4+. Lembra do ROME: pH ↓ e PaCO2 ↑ (opostos)!",
      };
    }

    return {
      primaryTitle: "Acidose Mista (Metabólica + Respiratória)",
      statusTone: "crimson",
      mascotMood: "comforting",
      compensationLine:
        "HCO3− baixo e PaCO2 elevada simultaneamente — o pulmão e o metabolismo estão empurrando o pH para baixo juntos.",
      anionGap,
      anionGapLabel,
      ursinhaTip:
        "Cuidado em prova, Dra. Sophia! Se o pH caiu muito e tanto PaCO2 subiu quanto HCO3− caiu, é distúrbio misto grave.",
    };
  }

  // Alkalemia (pH > 7.45)
  if (ph > 7.45) {
    const metabolic = hco3 > 26;
    const respiratory = paco2 < 35;

    if (metabolic && !respiratory) {
      const expectedPaco2 = 40 + 0.7 * (hco3 - 24);
      const low = Math.round((expectedPaco2 - 2) * 10) / 10;
      const high = Math.round((expectedPaco2 + 2) * 10) / 10;
      let comp = `Compensação esperada: PaCO2 ≈ ${low} a ${high} mmHg.`;
      if (paco2 < low) {
        comp += " PaCO2 abaixo do esperado → Alcalose Respiratória associada.";
      } else if (paco2 > high) {
        comp += " PaCO2 acima do esperado → Acidose Respiratória associada.";
      } else {
        comp += " Hipoventilação compensatória adequada!";
      }

      return {
        primaryTitle: "Alcalose Metabólica",
        statusTone: "amber",
        mascotMood: "studying",
        compensationLine: comp,
        anionGap,
        anionGapLabel,
        ursinhaTip:
          "Vômitos ou diuréticos de alça/tiazídicos causam alcalose metabólica com depleção de Cl− e K+. Sem repor Cl−/volume, o rim continua segurando HCO3−!",
      };
    }

    if (respiratory && !metabolic) {
      const deltaPaco2 = Math.max(0, 40 - paco2);
      const expectedAcute = Math.round((24 - (deltaPaco2 / 10) * 2) * 10) / 10;
      const expectedChronic = Math.round((24 - (deltaPaco2 / 10) * 4.5) * 10) / 10;
      return {
        primaryTitle: "Alcalose Respiratória",
        statusTone: "sky",
        mascotMood: "idle",
        compensationLine: `HCO3− esperado: agudo ≈ ${expectedAcute} mEq/L | crônico ≈ ${expectedChronic} mEq/L.`,
        anionGap,
        anionGapLabel,
        ursinhaTip:
          "Hiperventilação varre CO2 rápido! Ca2+ ionizado se liga mais à albumina na alcalemia → pode dar parestesias e tetania.",
      };
    }

    return {
      primaryTitle: "Alcalose Mista (Metabólica + Respiratória)",
      statusTone: "amber",
      mascotMood: "studying",
      compensationLine:
        "PaCO2 baixa e HCO3− elevado simultaneamente — dois processos alcalinizantes agindo juntos.",
      anionGap,
      anionGapLabel,
      ursinhaTip:
        "Lembra que na compensação pura PaCO2 e HCO3− sempre caminham no MESMO sentido; quando vão em direções opostas e pH sai do normal, é distúrbio misto!",
    };
  }

  // pH inside 7.35-7.45 but abnormal PaCO2/HCO3
  return {
    primaryTitle: "Distúrbio Compensado ou Misto Equilibrado",
    statusTone: "sky",
    mascotMood: "studying",
    compensationLine:
      "pH na faixa normal (7,35–7,45) apesar de PaCO2 ou HCO3− alterados — sugere compensação completa (ou distúrbio misto balanceado). Olhe para qual lado de 7,40 o pH pende!",
    anionGap,
    anionGapLabel,
    ursinhaTip:
      "Dica de ouro da Dra. Ursinha: o organismo raramente supercompensa! O lado de 7,40 (7,36 vs 7,44) entrega quem foi o distúrbio primário.",
  };
}

export function GasometriaLab() {
  const [ph, setPh] = useState(7.21);
  const [paco2, setPaco2] = useState(24);
  const [hco3, setHco3] = useState(10);
  const [na, setNa] = useState(138);
  const [cl, setCl] = useState(102);

  const result = useMemo(
    () => analyzeBloodGas(ph, paco2, hco3, na, cl),
    [ph, paco2, hco3, na, cl]
  );

  const applyPreset = (p: AbgPreset) => {
    setPh(p.ph);
    setPaco2(p.paco2);
    setHco3(p.hco3);
    setNa(p.na);
    setCl(p.cl);
  };

  const resetNormal = () => {
    setPh(7.4);
    setPaco2(40);
    setHco3(24);
    setNa(140);
    setCl(104);
  };

  return (
    <KawaiiCard tone="sky" className="p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <PastelBadge tone="sky">
            <Activity className="h-3.5 w-3.5" aria-hidden="true" />
            Mini-Lab 1 · Gasometria Arterial
          </PastelBadge>
          <h2 className="font-display text-xl font-extrabold text-ink">
            Decodificador de Gasometria, Winter &amp; Ânion Gap
          </h2>
        </div>
        <SpringButton variant="soft" size="sm" onClick={resetNormal}>
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Valores Normais
        </SpringButton>
      </div>

      {/* Clinical Presets */}
      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => applyPreset(preset)}
            className="rounded-2xl border border-[#BAE6FD] bg-sky-med-soft/50 px-3 py-1.5 font-display text-xs font-bold text-sky-med-ink transition-colors hover:bg-sky-med-soft"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sliders */}
        <div className="space-y-4 lg:col-span-6">
          <div className="rounded-2xl border border-border-warm bg-cream/60 p-4">
            <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
              <label htmlFor="abg-ph" className="text-ink">
                pH Arterial (Ref: 7,35–7,45)
              </label>
              <span className="rounded-full bg-surface px-2.5 py-0.5 font-display text-sm font-extrabold text-sky-med-ink border border-[#BAE6FD]">
                {ph.toFixed(2)}
              </span>
            </div>
            <input
              id="abg-ph"
              type="range"
              min={7.0}
              max={7.7}
              step={0.01}
              value={ph}
              onChange={(e) => setPh(Number(e.target.value))}
              className="fisio-range"
            />
          </div>

          <div className="rounded-2xl border border-border-warm bg-cream/60 p-4">
            <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
              <label htmlFor="abg-paco2" className="text-ink">
                PaCO2 (Ref: 35–45 mmHg)
              </label>
              <span className="rounded-full bg-surface px-2.5 py-0.5 font-display text-sm font-extrabold text-sky-med-ink border border-[#BAE6FD]">
                {paco2} mmHg
              </span>
            </div>
            <input
              id="abg-paco2"
              type="range"
              min={15}
              max={80}
              step={1}
              value={paco2}
              onChange={(e) => setPaco2(Number(e.target.value))}
              className="fisio-range"
            />
          </div>

          <div className="rounded-2xl border border-border-warm bg-cream/60 p-4">
            <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
              <label htmlFor="abg-hco3" className="text-ink">
                HCO3− (Ref: 22–26 mEq/L)
              </label>
              <span className="rounded-full bg-surface px-2.5 py-0.5 font-display text-sm font-extrabold text-sky-med-ink border border-[#BAE6FD]">
                {hco3} mEq/L
              </span>
            </div>
            <input
              id="abg-hco3"
              type="range"
              min={6}
              max={44}
              step={1}
              value={hco3}
              onChange={(e) => setHco3(Number(e.target.value))}
              className="fisio-range"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border-warm bg-cream/60 p-3.5">
              <div className="mb-1 flex items-center justify-between text-xs font-bold">
                <label htmlFor="abg-na" className="text-ink">
                  Na+ (mEq/L)
                </label>
                <span className="font-display font-extrabold text-sky-med-ink">{na}</span>
              </div>
              <input
                id="abg-na"
                type="range"
                min={120}
                max={160}
                step={1}
                value={na}
                onChange={(e) => setNa(Number(e.target.value))}
                className="fisio-range"
              />
            </div>

            <div className="rounded-2xl border border-border-warm bg-cream/60 p-3.5">
              <div className="mb-1 flex items-center justify-between text-xs font-bold">
                <label htmlFor="abg-cl" className="text-ink">
                  Cl− (mEq/L)
                </label>
                <span className="font-display font-extrabold text-sky-med-ink">{cl}</span>
              </div>
              <input
                id="abg-cl"
                type="range"
                min={80}
                max={125}
                step={1}
                value={cl}
                onChange={(e) => setCl(Number(e.target.value))}
                className="fisio-range"
              />
            </div>
          </div>
        </div>

        {/* Live Diagnosis Panel */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#BAE6FD] bg-gradient-to-br from-surface to-[#E0F2FE]/45 p-5 lg:col-span-6">
          <div className="space-y-3">
            <PastelBadge tone={result.statusTone}>Diagnóstico Instantâneo</PastelBadge>
            <h3 className="font-display text-2xl font-extrabold text-ink">
              {result.primaryTitle}
            </h3>

            <div className="rounded-2xl border border-border-warm bg-surface p-3.5 text-xs leading-relaxed text-ink sm:text-sm">
              <span className="font-display font-extrabold text-sky-med-ink">
                Compensação:{" "}
              </span>
              {result.compensationLine}
            </div>

            <div className="rounded-2xl border border-border-warm bg-surface p-3.5 text-xs leading-relaxed text-ink sm:text-sm">
              <span className="font-display font-extrabold text-sky-med-ink">
                Ânion Gap [Na − (Cl + HCO3)]:{" "}
              </span>
              {result.anionGapLabel}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#BAE6FD] bg-surface/95 p-3.5">
            <DraUrsinha mood={result.mascotMood} size="sm" />
            <p className="text-xs font-semibold leading-relaxed text-ink">
              {result.ursinhaTip}
            </p>
          </div>
        </div>
      </div>
    </KawaiiCard>
  );
}
