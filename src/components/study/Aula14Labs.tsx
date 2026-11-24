"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, FileText, Ruler, Sparkles, Type } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  AULA14_AI_DECLARATION,
  AULA14_FORMATTING_RULES,
  AULA14_PROJECT_BLOCKS,
  AULA14_SECTION_HIERARCHY,
} from "@/data/dpc-content";

export function ProjectBlocksMap() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {AULA14_PROJECT_BLOCKS.map((block) => (
        <div
          key={block.id}
          className={`rounded-2xl border p-4 ${
            block.id === "post"
              ? "border-lavender/35 bg-lavender-soft/35"
              : "border-border-warm bg-cream/65"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-display text-base font-extrabold text-ink">
              {block.title}
            </h4>
            <Badge tone={block.id === "post" ? "lavender" : "neutral"}>
              {block.items.length} itens
            </Badge>
          </div>
          <p className="mt-0.5 text-xs text-ink-muted">{block.subtitle}</p>
          <ul className="mt-3 space-y-1.5 text-xs sm:text-sm">
            {block.items.map((item) => (
              <li
                key={item.label}
                className={`rounded-xl border px-3 py-2 ${
                  item.highlight
                    ? "border-lavender bg-white font-bold text-lavender-ink shadow-sm"
                    : "border-border-warm bg-white/85 text-ink"
                }`}
              >
                <div>{item.label}</div>
                {item.note && (
                  <div className="mt-1 text-[11px] font-semibold text-blush-ink">
                    {item.note}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

type FontChoice = "Arial" | "Times New Roman" | "Calibre";
type SizeChoice = 18 | 14 | 12 | 10;

const FONT_STYLE_MAP: Record<FontChoice, string> = {
  Arial: "Arial, Helvetica, sans-serif",
  "Times New Roman": '"Times New Roman", Times, serif',
  Calibre: "Calibri, Arial, sans-serif",
};

const SIZE_DESCRIPTIONS: Record<SizeChoice, string> = {
  18: "Tamanho 18 (em negrito): título do projeto",
  14: "Tamanho 14: nomes dos autores",
  12: "Tamanho 12: regra geral em todo o texto",
  10: "Tamanho 10: citação direta longa e resumo",
};

export function FormattingCheatLab() {
  const [selectedFont, setSelectedFont] = useState<FontChoice>("Arial");
  const [selectedSize, setSelectedSize] = useState<SizeChoice>(12);
  const [spacingMode, setSpacingMode] = useState<"1.5" | "1.0">("1.5");

  return (
    <div className="space-y-5">
      {/* Structured summary table */}
      <div className="overflow-x-auto rounded-2xl border border-border-warm bg-white">
        <table className="w-full min-w-[540px] border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border-warm bg-lavender-soft/45 text-lavender-ink">
              <th scope="col" className="px-4 py-3 font-extrabold">
                Elemento
              </th>
              <th scope="col" className="px-4 py-3 font-extrabold">
                Regra Geral
              </th>
              <th scope="col" className="px-4 py-3 font-extrabold">
                Exceções e Especificações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-warm">
            {AULA14_FORMATTING_RULES.map((rule) => (
              <tr key={rule.id} className="align-top">
                <th scope="row" className="px-4 py-3 font-bold text-ink">
                  {rule.element}
                </th>
                <td className="px-4 py-3 text-ink">{rule.generalRule}</td>
                <td className="px-4 py-3 text-ink-muted">
                  <ul className="list-disc space-y-1 pl-4">
                    {rule.exceptions.map((ex) => (
                      <li key={ex}>{ex}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visual A4 Margin Ruler + Live Typography Preview */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Interactive Margin Ruler */}
        <div className="rounded-2xl border border-lavender/30 bg-lavender-soft/25 p-4">
          <div className="flex items-center justify-between gap-2">
            <h4 className="flex items-center gap-2 font-display text-sm font-extrabold text-ink sm:text-base">
              <Ruler className="h-4 w-4 text-lavender-ink" aria-hidden="true" />
              Régua Visual das Margens (páginas textuais)
            </h4>
            <Badge tone="lavender">3 cm / 2 cm</Badge>
          </div>
          <div className="mt-3 flex justify-center">
            <div className="relative w-full max-w-[280px] rounded-xl border-2 border-lavender/40 bg-white pt-9 pb-6 pl-9 pr-6 shadow-sm">
              <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded bg-lavender-soft px-2 py-0.5 text-[11px] font-extrabold text-lavender-ink">
                Superior: 3 cm
              </span>
              <span className="absolute left-1.5 top-1/2 -translate-y-1/2 -rotate-90 rounded bg-lavender-soft px-2 py-0.5 text-[11px] font-extrabold text-lavender-ink">
                Esq: 3 cm
              </span>
              <span className="absolute right-0.5 top-1/2 -translate-y-1/2 rotate-90 rounded bg-cream px-1.5 py-0.5 text-[10px] font-bold text-ink-muted">
                Dir: 2 cm
              </span>
              <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded bg-cream px-2 py-0.5 text-[10px] font-bold text-ink-muted">
                Inferior: 2 cm
              </span>
              <div className="rounded-lg border border-dashed border-mint/45 bg-mint-soft/20 p-3 text-center text-xs text-ink-muted">
                Área útil de texto do projeto de pesquisa
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Font / Size / Spacing simulator */}
        <div className="rounded-2xl border border-border-warm bg-cream/65 p-4">
          <h4 className="flex items-center gap-2 font-display text-sm font-extrabold text-ink sm:text-base">
            <Type className="h-4 w-4 text-lavender-ink" aria-hidden="true" />
            Simulador de Fonte, Tamanho e Espaçamento
          </h4>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {(["Arial", "Times New Roman", "Calibre"] as FontChoice[]).map((font) => (
              <button
                key={font}
                type="button"
                aria-pressed={selectedFont === font}
                onClick={() => setSelectedFont(font)}
                className={`min-h-[34px] rounded-xl border px-3 py-1 text-xs font-bold transition-colors ${
                  selectedFont === font
                    ? "border-lavender bg-lavender text-white"
                    : "border-border-warm bg-white text-ink hover:bg-lavender-soft/40"
                }`}
              >
                {font}
              </button>
            ))}
          </div>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {([18, 14, 12, 10] as SizeChoice[]).map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={selectedSize === size}
                onClick={() => setSelectedSize(size)}
                className={`min-h-[34px] rounded-xl border px-3 py-1 text-xs font-bold transition-colors ${
                  selectedSize === size
                    ? "border-mint-deep bg-mint-deep text-white"
                    : "border-border-warm bg-white text-ink hover:bg-mint-soft/40"
                }`}
              >
                Tam. {size}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={spacingMode === "1.5"}
              onClick={() => setSpacingMode((m) => (m === "1.5" ? "1.0" : "1.5"))}
              className="min-h-[34px] rounded-xl border border-blush/35 bg-blush-soft px-3 py-1 text-xs font-bold text-blush-ink"
            >
              Espaçamento: {spacingMode === "1.5" ? "1,5 (Corpo)" : "1,0 (Simples)"}
            </button>
          </div>

          <div className="mt-3 rounded-xl border border-border-warm bg-white p-3.5">
            <div className="text-[11px] font-bold text-lavender-ink">
              {SIZE_DESCRIPTIONS[selectedSize]} • {selectedFont} •{" "}
              {spacingMode === "1.5"
                ? "Espaçamento 1,5"
                : "Espaço simples 1,0 (citação longa / resumo / REFERÊNCIAS)"}
            </div>
            <p
              className="mt-2 text-ink transition-all"
              style={{
                fontFamily: FONT_STYLE_MAP[selectedFont],
                fontSize: `${selectedSize}px`,
                fontWeight: selectedSize === 18 ? 700 : 400,
                lineHeight: spacingMode === "1.5" ? 1.55 : 1.15,
              }}
            >
              {selectedSize === 18
                ? "TÍTULO DO PROJETO DE PESQUISA CLÍNICA"
                : selectedSize === 14
                ? "Nome da Autora / Pesquisadora FMC"
                : selectedSize === 10
                ? "Exemplo em tamanho 10: resumo estruturado ou citação direta longa com espaço simples (1,0)."
                : "Texto geral do projeto mantendo uniformidade tipográfica em todo o documento com espaçamento 1,5."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SectionHierarchyVisualizer() {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const active =
    AULA14_SECTION_HIERARCHY.find((h) => h.level === selectedLevel) ??
    AULA14_SECTION_HIERARCHY[0];

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-2 rounded-2xl border border-border-warm bg-white p-4">
        {AULA14_SECTION_HIERARCHY.map((item) => {
          const isSelected = item.level === selectedLevel;
          const typographyClass =
            item.styleVariant === "primary"
              ? "font-bold uppercase text-ink"
              : item.styleVariant === "secondary"
              ? "font-bold text-ink"
              : item.styleVariant === "tertiary"
              ? "font-normal text-ink"
              : "italic text-ink";
          const indentClass =
            item.level === 1
              ? "pl-3"
              : item.level === 2
              ? "pl-6"
              : item.level === 3
              ? "pl-9"
              : "pl-12";

          return (
            <button
              key={item.level}
              type="button"
              onClick={() => setSelectedLevel(item.level)}
              aria-pressed={isSelected}
              className={`block w-full rounded-xl border py-2.5 pr-3 text-left text-sm transition-colors ${indentClass} ${
                isSelected
                  ? "border-lavender bg-lavender-soft/45"
                  : "border-border-warm bg-cream/40 hover:bg-lavender-soft/20"
              }`}
            >
              <div className="mb-0.5 text-[11px] font-bold text-lavender-ink">
                {item.name} — {item.requiredFormatting}
              </div>
              <div className={`space-y-0.5 ${typographyClass}`}>
                {item.examples.map((ex) => (
                  <div key={ex}>{ex}</div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-lavender/30 bg-lavender-soft/25 p-4">
        <Badge tone="lavender">Nível {active.level} de 4</Badge>
        <h4 className="mt-2 font-display text-lg font-extrabold text-ink">
          {active.name}
        </h4>
        <p className="mt-1 text-sm font-semibold text-lavender-ink">
          Formatação exigida: {active.requiredFormatting}
        </p>
        <div className="mt-3 rounded-xl border border-border-warm bg-white p-3 text-xs text-ink-muted">
          <strong className="text-ink">Exemplos aplicados da aula:</strong>
          <ul className="mt-1.5 space-y-1">
            {active.examples.map((ex) => (
              <li
                key={ex}
                className={
                  active.styleVariant === "primary"
                    ? "font-bold uppercase text-ink"
                    : active.styleVariant === "secondary"
                    ? "font-bold text-ink"
                    : active.styleVariant === "quaternary"
                    ? "italic text-ink"
                    : "text-ink"
                }
              >
                {ex}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function legacyCopy(text: string): boolean {
  const previousFocus = document.activeElement as HTMLElement | null;
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.cssText = "position:fixed;inset-block-start:0;opacity:0";
  document.body.append(field);
  field.select();
  try {
    return document.execCommand("copy");
  } finally {
    field.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

export function AiDeclarationLab() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const timerRef = useRef<number | null>(null);
  const lastAnnouncementRef = useRef("");

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleCopyModel = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(AULA14_AI_DECLARATION.copyableText);
      ok = true;
    } catch {
      ok = legacyCopy(AULA14_AI_DECLARATION.copyableText);
    }

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    let message = ok ? "Modelo copiado!" : "Falha ao copiar";
    if (message === lastAnnouncementRef.current) {
      message += "\u00A0";
    }
    lastAnnouncementRef.current = message;

    setCopyStatus(ok ? "copied" : "failed");
    setStatusMessage(message);

    timerRef.current = window.setTimeout(() => {
      setCopyStatus("idle");
      setStatusMessage("");
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-lavender/35 bg-lavender-soft/40 p-4 text-xs leading-relaxed text-ink sm:text-sm">
          <strong className="block font-extrabold text-lavender-ink">
            Posição Obrigatória:
          </strong>
          {AULA14_AI_DECLARATION.positionRule}
        </div>
        <div className="rounded-2xl border border-mint/30 bg-mint-soft/40 p-4 text-xs leading-relaxed text-ink sm:text-sm">
          <strong className="block font-extrabold text-mint-ink">
            Conteúdo Obrigatório:
          </strong>
          {AULA14_AI_DECLARATION.mandatoryContent}
        </div>
      </div>

      {/* Model Card with 1-click Copy */}
      <div className="rounded-2xl border border-border-warm bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-warm pb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-lavender-ink" aria-hidden="true" />
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wide text-ink sm:text-base">
              Modelo de Declaração Apresentado em Aula
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyModel}
              aria-label="Copiar modelo completo da declaração de uso de IA"
              className="inline-flex min-h-[38px] items-center gap-2 rounded-xl border border-lavender bg-lavender px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-lavender-deep sm:text-sm"
            >
              {copyStatus === "copied" ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
              <span>
                {copyStatus === "copied" ? "Copiado!" : "Copiar modelo"}
              </span>
            </button>
            <span
              role="status"
              aria-live="polite"
              className={`text-xs font-bold transition-opacity ${
                statusMessage
                  ? copyStatus === "failed"
                    ? "text-danger-ink opacity-100"
                    : "text-mint-ink opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              {statusMessage}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-3 text-xs leading-relaxed text-ink sm:text-sm">
          <p className="font-semibold italic text-ink-muted">
            {AULA14_AI_DECLARATION.modelIntro}
          </p>
          <ul className="space-y-2.5">
            {AULA14_AI_DECLARATION.examples.map((item) => (
              <li
                key={item.tool}
                className="flex items-start gap-2.5 rounded-xl border border-border-warm bg-cream/60 p-3"
              >
                <Sparkles
                  className="mt-0.5 h-4 w-4 shrink-0 text-lavender-ink"
                  aria-hidden="true"
                />
                <div>
                  <strong className="font-extrabold text-ink">{item.tool}:</strong>{" "}
                  <span className="text-ink-muted">{item.usage}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
