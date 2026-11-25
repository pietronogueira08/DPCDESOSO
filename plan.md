# fisio-sophia-app — Plano de Execução e Arquitetura

Plataforma interativa de revisão intensiva (48 horas) em Fisiologia Médica (nível Guyton & Hall / Silverthorn) feita para **Sophia**, em Português Brasileiro (PT-BR).

## Arquitetura & Propriedade Exclusiva (A0–A5)
| Agente | Papel | Arquivos sob posse exclusiva |
|---|---|---|
| A0 | Lead Orchestrator | `plan.md`, `state.json`, limpeza raiz, `package.json`, `tsconfig.json`, `next.config.*` |
| A1 | Medical Physiology Architect | `src/data/physiology-tracks.ts`, `src/data/flashcards.ts`, `src/data/quiz-questions.ts`, `src/data/mimo-messages.ts` |
| A2 | Design System & Animated SVG Artist | `tailwind.config.ts`, `src/app/globals.css`, `src/components/ui/*`, `src/components/mascots/*` |
| A3 | Motion & Parallax Specialist | `src/lib/motion.ts`, `src/components/motion/*` |
| A4 | App Layout, Study Views, Mini-Labs & State | `src/app/**`, `src/components/study/*`, `src/components/labs/*`, `src/components/mimo/*`, `src/hooks/useFisioProgress.ts` |
| A5 | QA, Content & Performance Auditor | `qa_report.md`, `scripts/verify-content.mjs` |

## Currículo Obrigatório (14 Tópicos em 3 Trilhas)
- **Trilha 1 — Fisiologia Gastrointestinal (5 tópicos, Dia 1):**
  1. Secreção Salivar, Gástrica e Pancreática
  2. Deglutição e Motilidade Gastrointestinal
  3. Reflexos Gastrintestinais
  4. Digestão e Absorção
  5. Fígado e Vias Biliares
- **Trilha 2 — Fisiologia Renal e Equilíbrio Ácido-Base (3 tópicos, Dia 1):**
  6. Fisiologia Renal I: Formação da urina, filtração glomerular, reabsorção e secreção tubular
  7. Fisiologia Renal II: Mecanismo de concentração da urina e reflexo de micção
  8. Equilíbrio Ácido-Base
- **Trilha 3 — Fisiologia Endócrina / Hormonal (6 tópicos, Dia 2):**
  9. Introdução à Fisiologia Hormonal I: Eixo hipotálamo-hipofisário
  10. Fisiologia Hormonal II/III: Tireoide e paratireoide
  11. Fisiologia Hormonal IV: Pâncreas endócrino e adrenal
  12. Fisiologia Hormonal V: Fisiologia hormonal masculina
  13. Fisiologia Hormonal V: Fisiologia hormonal feminina
  14. Fisiologia Hormonal VI: Gravidez, parto e lactação

## Bancos, Mini-Labs e Mimos
- **42 Flashcards 3D** (3 por tópico × 14)
- **28 Questões de Simulado** (2 por tópico × 14)
- **3 Mini-Labs Interativos + Revisão Relâmpago (5 min)**: Decodificador de Gasometria Arterial, Mapa Interativo do Néfron SVG, Simulador de Eixos Hormonais
- **4 Mascotes SVG Animados**: `DrCoelhinho`, `DraUrsinha`, `GatinhaEndocrino`, `CachorrinhoMimo`
- **Persistência**: `localStorage` sob namespace `fisio_sophia_v1`

## Gates de Qualidade
- **Gate 0**: Zero vestígios de módulos legados anteriores; dependências verificadas.
- **Gate 1**: `npx tsc --noEmit`; 14 tópicos, 42 flashcards, 28 questões, 100% links YouTube em `results?search_query=`.
- **Gate 2**: `npx tsc --noEmit`; 4 mascotes com `viewBox`; `useReducedMotion` ativo.
- **Gate 3**: `npx tsc --noEmit`, `npm run lint`, `npm run build` com exit 0.
- **Gate 4**: `node scripts/verify-content.mjs`, servidor SSR validado e `qa_report.md` aprovado.
