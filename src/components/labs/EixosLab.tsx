"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { GatinhaEndocrino } from "@/components/mascots/AnimatedMascots";
import { KawaiiCard } from "@/components/ui/KawaiiCard";
import { PastelBadge } from "@/components/ui/PastelBadge";

type AxisId = "hpt" | "hpa" | "hpg_m" | "hpg_f";
type AxisMode = "normal" | "hiper_primario" | "hipo_primario" | "hipo_secundario" | "ovulacao";

interface LevelStatus {
  hormone: string;
  arrow: string;
  tone: "mint" | "rose" | "sky" | "amber";
}

interface AxisDefinition {
  readonly id: AxisId;
  readonly label: string;
  readonly hypoLabel: string;
  readonly pitLabel: string;
  readonly glandLabel: string;
  readonly supportsOvulation?: boolean;
  readonly states: Record<
    Exclude<AxisMode, "ovulacao"> | "ovulacao",
    {
      hypo: LevelStatus;
      pit: LevelStatus;
      gland: LevelStatus;
      feedbackText: string;
      clinicalExample: string;
    } | null
  >;
}

const AXES: readonly AxisDefinition[] = [
  {
    id: "hpt",
    label: "Tireoide (HPT)",
    hypoLabel: "Hipotálamo",
    pitLabel: "Adeno-hipófise",
    glandLabel: "Glândula Tireoide",
    states: {
      normal: {
        hypo: { hormone: "TRH", arrow: "Normal", tone: "mint" },
        pit: { hormone: "TSH", arrow: "Normal", tone: "mint" },
        gland: { hormone: "T3 / T4 Livre", arrow: "Normal", tone: "mint" },
        feedbackText: "T3 livre mantém feedback negativo equilibrado na hipófise e hipotálamo.",
        clinicalExample: "Eutireoidismo fisiológico — metabolismo basal e FC normais.",
      },
      hiper_primario: {
        hypo: { hormone: "TRH", arrow: "↓ Suprimido", tone: "sky" },
        pit: { hormone: "TSH", arrow: "↓↓ Suprimido", tone: "sky" },
        gland: { hormone: "T3 / T4 Livre", arrow: "↑↑ Elevados", tone: "rose" },
        feedbackText: "Excesso autônomo de T3/T4 faz feedback negativo intenso, desligando TSH e TRH!",
        clinicalExample: "Ex.: Doença de Graves (TRAb estimula receptor de TSH) ou bócio tóxico.",
      },
      hipo_primario: {
        hypo: { hormone: "TRH", arrow: "↑ Elevado", tone: "amber" },
        pit: { hormone: "TSH", arrow: "↑↑ Muito Alto", tone: "rose" },
        gland: { hormone: "T3 / T4 Livre", arrow: "↓ Baixos", tone: "sky" },
        feedbackText: "Falta de T3/T4 retira o freio da hipófise → TSH dispara tentando estimular a tireoide.",
        clinicalExample: "Ex.: Tireoidite de Hashimoto ou deficiência grave de iodo.",
      },
      hipo_secundario: {
        hypo: { hormone: "TRH", arrow: "↑ ou Variável", tone: "amber" },
        pit: { hormone: "TSH", arrow: "↓ Inadequado", tone: "sky" },
        gland: { hormone: "T3 / T4 Livre", arrow: "↓ Baixos", tone: "sky" },
        feedbackText: "Falha hipofisária em secretar TSH deixa a tireoide sem estímulo.",
        clinicalExample: "Ex.: Hipopituitarismo / macroadenoma comprimindo tireotrofos.",
      },
      ovulacao: null,
    },
  },
  {
    id: "hpa",
    label: "Adrenal (HPA)",
    hypoLabel: "Hipotálamo",
    pitLabel: "Adeno-hipófise",
    glandLabel: "Córtex Adrenal (Fasciculada)",
    states: {
      normal: {
        hypo: { hormone: "CRH", arrow: "Normal", tone: "mint" },
        pit: { hormone: "ACTH", arrow: "Normal", tone: "mint" },
        gland: { hormone: "Cortisol", arrow: "Normal (pico 8h)", tone: "mint" },
        feedbackText: "Cortisol exerce feedback negativo em CRH e ACTH; aldosterona depende mais do SRAA!",
        clinicalExample: "Ritmo circadiano preservado com pico matinal e vale à meia-noite.",
      },
      hiper_primario: {
        hypo: { hormone: "CRH", arrow: "↓ Suprimido", tone: "sky" },
        pit: { hormone: "ACTH", arrow: "↓↓ Suprimido", tone: "sky" },
        gland: { hormone: "Cortisol", arrow: "↑↑ Elevado", tone: "rose" },
        feedbackText: "Adenoma adrenal autônomo produz cortisol sem precisar de ACTH → ACTH cai!",
        clinicalExample: "Ex.: Síndrome de Cushing ACTH-independente (tumor adrenal).",
      },
      hipo_primario: {
        hypo: { hormone: "CRH", arrow: "↑ Elevado", tone: "amber" },
        pit: { hormone: "ACTH", arrow: "↑↑ Muito Alto", tone: "rose" },
        gland: { hormone: "Cortisol (+ Aldosterona)", arrow: "↓ Baixos", tone: "sky" },
        feedbackText: "Sem cortisol, POMC/ACTH sobem muito (causando hiperpigmentação!). Faltam cortisol e aldosterona.",
        clinicalExample: "Ex.: Doença de Addison (insuficiência adrenal primária).",
      },
      hipo_secundario: {
        hypo: { hormone: "CRH", arrow: "↑ ou ↓", tone: "amber" },
        pit: { hormone: "ACTH", arrow: "↓ Baixo", tone: "sky" },
        gland: { hormone: "Cortisol (Aldo OK!)", arrow: "↓ Baixo", tone: "sky" },
        feedbackText: "Falta ACTH → cai cortisol, MAS a aldosterona permanece preservada via Angiotensina II/K+.",
        clinicalExample: "Ex.: Retirada abrupta de corticoide exógeno ou lesão hipofisária.",
      },
      ovulacao: null,
    },
  },
  {
    id: "hpg_m",
    label: "Masculino (HPG)",
    hypoLabel: "Hipotálamo",
    pitLabel: "Adeno-hipófise",
    glandLabel: "Testículo (Leydig & Sertoli)",
    states: {
      normal: {
        hypo: { hormone: "GnRH (pulsátil)", arrow: "Normal", tone: "mint" },
        pit: { hormone: "LH + FSH", arrow: "Normal", tone: "mint" },
        gland: { hormone: "Testosterona + Inibina B", arrow: "Normal", tone: "mint" },
        feedbackText: "Testosterona freia GnRH/LH; Inibina B (Sertoli) faz feedback negativo seletivo em FSH.",
        clinicalExample: "Espermatogênese sustentada por FSH + alta testosterona intratesticular.",
      },
      hiper_primario: {
        hypo: { hormone: "GnRH", arrow: "↓↓ Suprimido", tone: "sky" },
        pit: { hormone: "LH + FSH", arrow: "↓↓ Suprimidos", tone: "sky" },
        gland: { hormone: "Testosterona Sérica (Exógena)", arrow: "↑↑ Alta", tone: "rose" },
        feedbackText: "Uso de testosterona exógena desliga LH/FSH → cai testosterona INTRATESTICULAR e atrofia testículo!",
        clinicalExample: "Ex.: Uso de esteroides anabolizantes levando a azoospermia reversível.",
      },
      hipo_primario: {
        hypo: { hormone: "GnRH", arrow: "↑ Elevado", tone: "amber" },
        pit: { hormone: "LH + FSH", arrow: "↑↑ Muito Altos", tone: "rose" },
        gland: { hormone: "Testosterona", arrow: "↓ Baixa", tone: "sky" },
        feedbackText: "Hipogonadismo hipergonadotrófico: testículo falha e hipófise grita alto com LH/FSH.",
        clinicalExample: "Ex.: Síndrome de Klinefelter (47,XXY) ou falência testicular primária.",
      },
      hipo_secundario: {
        hypo: { hormone: "GnRH", arrow: "↓ ou Ausente", tone: "sky" },
        pit: { hormone: "LH + FSH", arrow: "↓ Baixos", tone: "sky" },
        gland: { hormone: "Testosterona", arrow: "↓ Baixa", tone: "sky" },
        feedbackText: "Hipogonadismo hipogonadotrófico: defeito no hipotálamo (Kallmann) ou na hipófise.",
        clinicalExample: "Ex.: Síndrome de Kallmann (anosmia + falha de migração de neurônios GnRH).",
      },
      ovulacao: null,
    },
  },
  {
    id: "hpg_f",
    label: "Feminino (HPG)",
    hypoLabel: "Hipotálamo",
    pitLabel: "Adeno-hipófise",
    glandLabel: "Ovário (Teca & Granulosa)",
    supportsOvulation: true,
    states: {
      normal: {
        hypo: { hormone: "GnRH (pulsátil)", arrow: "Normal", tone: "mint" },
        pit: { hormone: "FSH + LH", arrow: "Basal (Fase Folicular)", tone: "mint" },
        gland: { hormone: "Estradiol (Baixo/Mod)", arrow: "Normal", tone: "mint" },
        feedbackText: "No início do ciclo, estradiol moderado + inibina B mantêm feedback NEGATIVO em FSH/LH.",
        clinicalExample: "Seleção do folículo dominante nos primeiros dias do ciclo.",
      },
      ovulacao: {
        hypo: { hormone: "GnRH (frequência máxima)", arrow: "↑↑ Pico", tone: "rose" },
        pit: { hormone: "LH (Pico!) + FSH", arrow: "↑↑↑ PICO DE LH", tone: "rose" },
        gland: { hormone: "Estradiol Sustentado (>200 pg/mL)", arrow: "↑↑ Virada!", tone: "amber" },
        feedbackText: "VIRADA DO FEEDBACK POSITIVO!! Estradiol alto e constante por ~36–48h dispara o pico de LH → Ovulação!",
        clinicalExample: "Dia ~14 (ou 14 dias antes da próxima menstruação); ovulação 12–24h pós-pico de LH.",
      },
      hiper_primario: {
        hypo: { hormone: "GnRH", arrow: "↓ Suprimido", tone: "sky" },
        pit: { hormone: "FSH + LH", arrow: "↓ Suprimidos", tone: "sky" },
        gland: { hormone: "Progesterona / Estrogênio", arrow: "↑↑ Altos", tone: "rose" },
        feedbackText: "Progestagênio + estrogênio combinados mantêm feedback negativo contínuo e bloqueiam o pico de LH!",
        clinicalExample: "Base fisiológica dos anticoncepcionais hormonais combinados (anovulação).",
      },
      hipo_primario: {
        hypo: { hormone: "GnRH", arrow: "↑ Elevado", tone: "amber" },
        pit: { hormone: "FSH + LH", arrow: "↑↑ Muito Altos", tone: "rose" },
        gland: { hormone: "Estradiol", arrow: "↓ Muito Baixo", tone: "sky" },
        feedbackText: "Sem folículos ovarianos para fabricar estradiol/inibina → FSH e LH sobem muito.",
        clinicalExample: "Ex.: Menopausa fisiológica ou falência ovariana prematura.",
      },
      hipo_secundario: {
        hypo: { hormone: "GnRH", arrow: "↓ Baixo", tone: "sky" },
        pit: { hormone: "FSH + LH", arrow: "↓ Baixos", tone: "sky" },
        gland: { hormone: "Estradiol", arrow: "↓ Baixo", tone: "sky" },
        feedbackText: "Supressão hipotalâmica dos pulsos de GnRH reduz FSH/LH e causa amenorreia.",
        clinicalExample: "Ex.: Amenorreia hipotalâmica funcional (estresse intenso, baixo peso, atleta).",
      },
    },
  },
];

const MODES: readonly { id: AxisMode; label: string }[] = [
  { id: "normal", label: "Normal" },
  { id: "hiper_primario", label: "Hiper Primário" },
  { id: "hipo_primario", label: "Hipo Primário" },
  { id: "hipo_secundario", label: "Hipo Secundário" },
];

export function EixosLab() {
  const [axisId, setAxisId] = useState<AxisId>("hpt");
  const [mode, setMode] = useState<AxisMode>("normal");

  const axis = AXES.find((a) => a.id === axisId) ?? AXES[0];
  const effectiveMode: AxisMode =
    mode === "ovulacao" && !axis.supportsOvulation ? "normal" : mode;
  const state = axis.states[effectiveMode] ?? axis.states.normal;

  if (!state) return null;

  const nodes = [
    { role: axis.hypoLabel, ...state.hypo },
    { role: axis.pitLabel, ...state.pit },
    { role: axis.glandLabel, ...state.gland },
  ];

  return (
    <KawaiiCard tone="berry" className="p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <PastelBadge tone="berry">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Mini-Lab 3 · Simulador de Eixos Hormonais
          </PastelBadge>
          <h2 className="font-display text-xl font-extrabold text-ink">
            Feedback Negativo vs. Positivo (Hipotálamo → Hipófise → Alvo)
          </h2>
        </div>
      </div>

      {/* Axis Selector */}
      <div className="mt-4 flex flex-wrap gap-2">
        {AXES.map((item) => {
          const active = item.id === axisId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setAxisId(item.id);
                if (mode === "ovulacao" && !item.supportsOvulation) {
                  setMode("normal");
                }
              }}
              aria-pressed={active}
              className={`rounded-2xl border px-3.5 py-1.5 font-display text-xs font-bold transition-all sm:text-sm ${
                active
                  ? "border-berry bg-berry text-white shadow-sm"
                  : "border-border-warm bg-cream text-ink-secondary hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Mode Selector */}
      <div className="mt-3 flex flex-wrap gap-2">
        {MODES.map((m) => {
          const active = effectiveMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              aria-pressed={active}
              className={`rounded-xl border px-3 py-1 font-display text-xs font-bold transition-colors ${
                active
                  ? "border-rose-mimo bg-rose-mimo text-white"
                  : "border-[#DDD6FE] bg-berry-soft/45 text-berry-ink hover:bg-berry-soft"
              }`}
            >
              {m.label}
            </button>
          );
        })}
        {axis.supportsOvulation && (
          <button
            type="button"
            onClick={() => setMode("ovulacao")}
            aria-pressed={effectiveMode === "ovulacao"}
            className={`rounded-xl border px-3 py-1 font-display text-xs font-bold transition-colors ${
              effectiveMode === "ovulacao"
                ? "border-rose-mimo bg-rose-mimo text-white"
                : "border-[#FBCFE8] bg-rose-mimo-soft text-rose-mimo-ink hover:bg-[#FBCFE8]/60"
            }`}
          >
            Feedback Positivo (Ovulação ✨)
          </button>
        )}
      </div>

      {/* Cascade Visualization */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="flex flex-col items-center gap-2 lg:col-span-7">
          {nodes.map((node, index) => (
            <React.Fragment key={node.role}>
              <div className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#DDD6FE] bg-surface p-4 shadow-sm">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink-secondary">
                    {node.role}
                  </span>
                  <div className="font-display text-base font-extrabold text-ink sm:text-lg">
                    {node.hormone}
                  </div>
                </div>
                <PastelBadge tone={node.tone} className="text-xs sm:text-sm">
                  {node.arrow}
                </PastelBadge>
              </div>
              {index < nodes.length - 1 && (
                <ArrowDown
                  className="h-5 w-5 text-berry"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Clinical Explanation */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#DDD6FE] bg-gradient-to-br from-surface to-[#EDE9FE]/55 p-5 lg:col-span-5">
          <div className="space-y-3">
            <PastelBadge tone={effectiveMode === "ovulacao" ? "rose" : "berry"}>
              {effectiveMode === "ovulacao"
                ? "Exceção Clássica de Prova!"
                : "Dinâmica do Eixo"}
            </PastelBadge>
            <p className="text-sm font-semibold leading-relaxed text-ink">
              {state.feedbackText}
            </p>
            <div className="rounded-2xl border border-border-warm bg-surface p-3.5 text-xs font-medium leading-relaxed text-ink-secondary sm:text-sm">
              <span className="inline-flex items-center gap-1 font-display font-extrabold text-berry-ink">
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                Correlação clínica:{" "}
              </span>
              {state.clinicalExample}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#DDD6FE] bg-surface/95 p-3">
            <GatinhaEndocrino
              mood={effectiveMode === "ovulacao" ? "cheering" : "studying"}
              size="sm"
            />
            <p className="text-xs font-semibold text-ink">
              Dica da Gatinha: na prova, olhe SEMPRE primeiro para o hormônio da glândula-alvo e depois veja se o TSH/ACTH/LH acompanhou ou foi pro lado oposto!
            </p>
          </div>
        </div>
      </div>
    </KawaiiCard>
  );
}
