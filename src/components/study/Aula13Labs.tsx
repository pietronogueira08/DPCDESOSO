"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  SquareCheckBig,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  ANTI_REWORK_CHECKLIST,
  AULA13_FINAL_SYNTHESIS,
  BOOLEAN_CLASS_EXAMPLE,
  BOOLEAN_OPERATORS,
  EVIDENCE_PYRAMID,
  FOUR_FILTERS_FLOW,
  JOURNAL_FIVE_PILLARS,
  JOURNAL_METRICS,
  PREDATORY_SCREENING,
  REVERSE_ENGINEERING_STEPS,
  SCIENTIFIC_DATABASES,
  SUBMISSION_PLANS,
} from "@/data/dpc-content";
import { useSafeMotion } from "@/lib/motion";

const CATEGORY_TONES = {
  Síntese: "bg-lavender text-white border-lavender-deep",
  Experimental: "bg-mint-deep text-white border-mint-ink",
  Observacional: "bg-mint-soft text-mint-ink border-mint/40",
  "Descritivo / Base": "bg-cream text-ink border-border-warm",
} as const;

export function EvidencePyramidLab() {
  const [selectedLevel, setSelectedLevel] = useState<number>(8);
  const { springBouncy } = useSafeMotion();
  const activeTier =
    EVIDENCE_PYRAMID.find((t) => t.level === selectedLevel) ?? EVIDENCE_PYRAMID[0];

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-muted">
        Clique em qualquer degrau da pirâmide (do maior ao menor rigor metodológico) para inspecionar os detalhes:
      </p>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-border-warm bg-cream/70 p-4"
          role="group"
          aria-label="Degraus da pirâmide de evidências"
        >
          {EVIDENCE_PYRAMID.map((tier) => {
            const isActive = tier.level === selectedLevel;
            return (
              <motion.button
                key={tier.level}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedLevel(tier.level)}
                whileTap={{ scale: 0.98 }}
                transition={springBouncy}
                style={{ width: `${tier.widthPercent}%` }}
                className={`flex min-h-[38px] min-w-[190px] max-w-full items-center justify-between gap-2 rounded-xl border px-3 py-1.5 text-left text-xs font-bold transition-all sm:text-sm ${
                  CATEGORY_TONES[tier.category]
                } ${isActive ? "ring-2 ring-blush ring-offset-2" : "opacity-90 hover:opacity-100"}`}
              >
                <span className="truncate">
                  {tier.level}. {tier.design}
                </span>
                <span className="shrink-0 text-[11px] opacity-85">N{tier.level}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-mint/30 bg-surface p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge tone={activeTier.level >= 7 ? "lavender" : activeTier.level >= 3 ? "mint" : "neutral"}>
              {activeTier.tag}
            </Badge>
            <span className="text-xs font-bold text-ink-muted">
              Categoria: {activeTier.category}
            </span>
          </div>
          <h4 className="mt-3 font-display text-lg font-extrabold text-ink">
            {activeTier.design}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            {activeTier.strength}
          </p>
          <div className="mt-4 rounded-xl bg-cream p-3 text-xs text-ink">
            <strong className="font-bold text-mint-ink">Resumo de prova:</strong>{" "}
            {activeTier.level === 8
              ? "Topo absoluto — síntese quantitativa de múltiplos estudos."
              : activeTier.level === 1
              ? "Base da pirâmide — menor evidência empírica, baseada em experiência clínica ou consenso."
              : activeTier.category === "Observacional"
              ? "Estudos observacionais: Transversal (3) < Caso-Controle (4) < Coorte (5)."
              : activeTier.level === 6
              ? "Estudo experimental com intervenção controlada (acima dos observacionais)."
              : "Logo abaixo das meta-análises e acima dos ensaios clínicos."}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BooleanBuilderLab() {
  const [useQuotes, setUseQuotes] = useState(true);
  const [useAndAdults, setUseAndAdults] = useState(true);
  const [useOrSynonym, setUseOrSynonym] = useState(false);
  const [useNotAnimal, setUseNotAnimal] = useState(false);

  const term1 = useQuotes ? "'skin aging'" : "skin aging";
  const term2 = useQuotes
    ? useOrSynonym
      ? "('aesthetic treatment' OR 'cosmetic procedure')"
      : "'aesthetic treatment'"
    : useOrSynonym
    ? "(aesthetic treatment OR cosmetic procedure)"
    : "aesthetic treatment";

  const parts: string[] = [`(${term1})`, `AND (${term2})`];
  if (useAndAdults) parts.push("AND (adults)");
  if (useNotAnimal) parts.push("NOT (animal)");

  const builtQuery = parts.join(" ");

  const precisionLevel =
    (useQuotes ? 30 : 10) +
    (useAndAdults ? 30 : 0) +
    (useNotAnimal ? 25 : 0) +
    (useOrSynonym ? -15 : 15);
  const clampedPrecision = Math.max(15, Math.min(95, precisionLevel));

  return (
    <div className="space-y-6">
      {/* Scientific Databases Matrix */}
      <div>
        <h4 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-ink">
          <Database className="h-4 w-4 text-mint-ink" aria-hidden="true" />
          Bases Científicas (Escopo Geográfico × Área Temática)
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {SCIENTIFIC_DATABASES.map((db) => (
            <div
              key={db.id}
              className="rounded-2xl border border-border-warm bg-cream/60 p-3.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-sm font-bold text-ink">{db.name}</strong>
                <Badge tone={db.scope.includes("Saúde") ? "mint" : "lavender"}>
                  {db.scope}
                </Badge>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                {db.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Boolean Builder */}
      <div className="rounded-2xl border border-mint/25 bg-mint-soft/25 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="flex items-center gap-2 font-display text-base font-bold text-ink">
            <Search className="h-4 w-4 text-mint-ink" aria-hidden="true" />
            Construtor Visual de Busca Booleana
          </h4>
          <Badge tone="mint">Busca Profissional vs. Amadora</Badge>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-danger/25 bg-danger-soft/50 p-3 text-xs">
            <span className="font-bold text-danger-ink">Busca Amadora (evite):</span>{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-ink">
              {BOOLEAN_CLASS_EXAMPLE.amateurQuery}
            </code>
          </div>
          <div className="rounded-xl border border-mint/30 bg-white p-3 text-xs">
            <span className="font-bold text-mint-ink">Exemplo exato da aula:</span>{" "}
            <code className="break-all rounded bg-mint-soft/60 px-1.5 py-0.5 font-mono text-ink">
              {BOOLEAN_CLASS_EXAMPLE.professionalQuery}
            </code>
          </div>
        </div>

        {/* Toggle pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={useQuotes}
            onClick={() => setUseQuotes((v) => !v)}
            className={`min-h-[36px] rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
              useQuotes
                ? "border-lavender bg-lavender text-white"
                : "border-border-warm bg-white text-ink hover:bg-cream"
            }`}
          >
            Aspas &quot;&quot; / &apos;&apos; {useQuotes ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            aria-pressed={useAndAdults}
            onClick={() => setUseAndAdults((v) => !v)}
            className={`min-h-[36px] rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
              useAndAdults
                ? "border-mint-deep bg-mint-deep text-white"
                : "border-border-warm bg-white text-ink hover:bg-cream"
            }`}
          >
            AND (adults) {useAndAdults ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            aria-pressed={useOrSynonym}
            onClick={() => setUseOrSynonym((v) => !v)}
            className={`min-h-[36px] rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
              useOrSynonym
                ? "border-blush bg-blush text-white"
                : "border-border-warm bg-white text-ink hover:bg-cream"
            }`}
          >
            OR sinônimo {useOrSynonym ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            aria-pressed={useNotAnimal}
            onClick={() => setUseNotAnimal((v) => !v)}
            className={`min-h-[36px] rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
              useNotAnimal
                ? "border-danger bg-danger text-white"
                : "border-border-warm bg-white text-ink hover:bg-cream"
            }`}
          >
            NOT (animal) {useNotAnimal ? "ON" : "OFF"}
          </button>
        </div>

        {/* Live built query */}
        <div className="mt-3 rounded-2xl border border-border-warm bg-white p-3.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
            Expressão gerada em tempo real:
          </div>
          <code className="mt-1 block break-words font-mono text-sm font-semibold text-mint-ink">
            {builtQuery}
          </code>
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-xs font-semibold text-ink-muted">
              <span>Amplitude vs. Precisão do filtro</span>
              <span className="text-ink">{clampedPrecision}% precisão</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-cream">
              <div
                className="h-full rounded-full bg-mint transition-all duration-300"
                style={{ width: `${clampedPrecision}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              {useOrSynonym
                ? "OR ampliou a busca com sinônimos; "
                : "Sem OR, mantém apenas os descritores principais; "}
              {useAndAdults ? "AND (adults) restringe para estudos com adultos; " : ""}
              {useNotAnimal ? "NOT (animal) exclui modelos animais; " : ""}
              {useQuotes
                ? "Aspas garantem a ordem exata da expressão composta."
                : "Sem aspas, os termos podem aparecer separados no texto."}
            </p>
          </div>
        </div>

        {/* Reference list of all 4 operators */}
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {BOOLEAN_OPERATORS.map((op) => (
            <div key={op.id} className="rounded-xl border border-border-warm bg-white p-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-extrabold text-mint-ink">{op.symbol}</span>
                <span className="font-semibold text-ink-muted">{op.label}</span>
              </div>
              <p className="mt-1 text-ink-muted">{op.rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PredatoryDetectorLab() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-5">
      {/* 5 Pilares */}
      <div>
        <h4 className="mb-2.5 font-display text-base font-bold text-ink">
          5 Pilares para responder &ldquo;Onde vamos publicar?&rdquo;
        </h4>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {JOURNAL_FIVE_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="rounded-2xl border border-border-warm bg-cream/65 p-3"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-mint-deep text-xs font-bold text-white">
                {pillar.number}
              </span>
              <h5 className="mt-2 text-sm font-bold text-ink">{pillar.title}</h5>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">{pillar.detail}</p>
              {pillar.examTip && (
                <p className="mt-2 rounded-lg bg-blush-soft px-2 py-1 text-[11px] font-bold text-blush-ink">
                  {pillar.examTip}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Métricas */}
      <div>
        <h4 className="mb-2.5 font-display text-base font-bold text-ink">
          Decodificando as Métricas
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {JOURNAL_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="rounded-2xl border border-border-warm bg-surface p-3.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong className="text-sm font-bold text-ink">{metric.name}</strong>
                {metric.metaphor && <Badge tone="lavender">{metric.metaphor}</Badge>}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Triagem Verde vs Vermelho */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-mint/30 bg-mint-soft/45 p-4">
          <h4 className="flex items-center gap-2 text-sm font-extrabold text-mint-ink">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Sinal Verde (Periódico Confiável)
          </h4>
          <ul className="mt-2.5 space-y-1.5 text-xs text-ink">
            {PREDATORY_SCREENING.greenFlags.map((flag) => (
              <li key={flag} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-ink" aria-hidden="true" />
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-danger/30 bg-danger-soft/55 p-4">
          <h4 className="flex items-center gap-2 text-sm font-extrabold text-danger-ink">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            Alerta Vermelho (Revista Predatória)
          </h4>
          <ul className="mt-2.5 space-y-1.5 text-xs text-ink">
            {PREDATORY_SCREENING.redFlags.map((flag) => (
              <li key={flag} className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger-ink" aria-hidden="true" />
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Regra de ouro */}
      <div className="rounded-2xl border border-blush/30 bg-blush-soft/50 p-3.5 text-xs font-semibold text-blush-ink sm:text-sm">
        <strong>Regra de ouro:</strong> {PREDATORY_SCREENING.goldenRule}
      </div>

      {/* Interactive Detector */}
      <div className="rounded-2xl border border-border-warm bg-cream/70 p-4">
        <h4 className="font-display text-sm font-extrabold text-ink sm:text-base">
          Detector Rápido de Revista Predatória (teste seu olhar!)
        </h4>
        <div className="mt-3 space-y-3">
          {PREDATORY_SCREENING.triageCases.map((item) => {
            const chosen = answers[item.id];
            const hasAnswered = chosen !== undefined;
            const isCorrect = hasAnswered && chosen === item.isReliable;
            return (
              <div
                key={item.id}
                className="rounded-xl border border-border-warm bg-white p-3"
              >
                <p className="text-xs font-medium leading-relaxed text-ink sm:text-sm">
                  {item.scenario}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [item.id]: true }))}
                    aria-pressed={chosen === true}
                    className={`min-h-[34px] rounded-xl border px-3 py-1 text-xs font-bold transition-colors ${
                      chosen === true
                        ? "border-mint-deep bg-mint-deep text-white"
                        : "border-border-warm bg-cream text-ink hover:bg-mint-soft/50"
                    }`}
                  >
                    Periódico Confiável
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnswers((prev) => ({ ...prev, [item.id]: false }))}
                    aria-pressed={chosen === false}
                    className={`min-h-[34px] rounded-xl border px-3 py-1 text-xs font-bold transition-colors ${
                      chosen === false
                        ? "border-danger bg-danger text-white"
                        : "border-border-warm bg-cream text-ink hover:bg-danger-soft/50"
                    }`}
                  >
                    Alerta Predatório
                  </button>
                </div>
                {hasAnswered && (
                  <p
                    className={`mt-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                      isCorrect
                        ? "bg-mint-soft text-mint-ink"
                        : "bg-danger-soft text-danger-ink"
                    }`}
                  >
                    {isCorrect ? "Acertou! " : "Quase! "}
                    {item.reason}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SubmissionStrategyLab() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="space-y-5">
      {/* Engenharia Reversa */}
      <div>
        <h4 className="mb-2.5 font-display text-base font-bold text-ink">
          Engenharia Reversa (Método de 5 Minutos)
        </h4>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {REVERSE_ENGINEERING_STEPS.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-border-warm bg-cream/70 p-3.5"
            >
              <Badge tone="mint">Passo {step.step}</Badge>
              <h5 className="mt-2 text-sm font-bold text-ink">{step.title}</h5>
              <p className="mt-1 text-xs text-ink-muted">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fluxo de 4 Filtros */}
      <div>
        <h4 className="mb-2.5 flex items-center gap-2 font-display text-base font-bold text-ink">
          <Filter className="h-4 w-4 text-mint-ink" aria-hidden="true" />
          Fluxo de 4 Filtros (ordem sequencial)
        </h4>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {FOUR_FILTERS_FLOW.map((f) => (
            <div
              key={f.filterNumber}
              className="rounded-2xl border border-mint/25 bg-mint-soft/25 p-3.5"
            >
              <div className="text-xs font-extrabold text-mint-ink">
                Filtro {f.filterNumber}
              </div>
              <div className="mt-1 text-sm font-bold text-ink">{f.title}</div>
              <p className="mt-1 text-xs text-ink-muted">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Planos A, B e C */}
      <div className="grid gap-3 md:grid-cols-3">
        {SUBMISSION_PLANS.map((plan) => (
          <div
            key={plan.plan}
            className="rounded-2xl border border-border-warm bg-surface p-4"
          >
            <Badge
              tone={
                plan.plan === "A"
                  ? "lavender"
                  : plan.plan === "B"
                  ? "mint"
                  : "neutral"
              }
            >
              {plan.title}
            </Badge>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              {plan.characteristics}
            </p>
            <p className="mt-2 rounded-xl bg-cream px-2.5 py-1.5 text-xs font-bold text-ink">
              Destino: {plan.destinationExample}
            </p>
          </div>
        ))}
      </div>

      {/* Checklist Anti-Retrabalho */}
      <div className="rounded-2xl border border-mint/30 bg-mint-soft/35 p-4">
        <h4 className="flex items-center gap-2 font-display text-base font-bold text-mint-ink">
          <SquareCheckBig className="h-4 w-4" aria-hidden="true" />
          Checklist Anti-Retrabalho (Instruções aos Autores — leia ANTES de escrever)
        </h4>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {ANTI_REWORK_CHECKLIST.map((item) => {
            const checked = checkedItems.includes(item);
            return (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border-warm bg-white px-3 py-2 text-xs font-semibold text-ink sm:text-sm"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCheck(item)}
                  className="h-4 w-4 rounded accent-mint-deep"
                />
                <span className={checked ? "line-through opacity-75" : ""}>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Síntese final */}
      <div className="flex items-center gap-3 rounded-2xl border border-blush/30 bg-blush-soft/45 p-4 text-sm font-bold text-blush-ink">
        <Sparkles className="h-5 w-5 shrink-0" aria-hidden="true" />
        <p>Síntese final: &ldquo;{AULA13_FINAL_SYNTHESIS}&rdquo;</p>
      </div>
    </div>
  );
}
