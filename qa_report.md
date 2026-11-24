# QA & Verification Report — `dpc-study-app`

**Date:** 2026-11-23  
**Course:** Faculdade de Medicina de Campos (FMC) — DPC 2026.2 (Aula 13 & Aula 14)  
**Stack:** Next.js 15.5.29 (App Router), React 19, TypeScript (`strict: true`), Tailwind CSS 3, Framer Motion, Lucide React  

---

## 1. Automated Build, Type & Lint Checks

| Check | Command | Result |
|---|---|---|
| TypeScript strict check | `npx tsc --noEmit` | **PASS** (0 errors) |
| ESLint check | `npm run lint` | **PASS** (`No ESLint warnings or errors`) |
| Production build | `npm run build` | **PASS** (Static pages generated 4/4, Route `/` 77.1 kB / 180 kB First Load JS) |
| Production SSR smoke test | `npx next start -p 3099` + HTTP GET | **PASS** (HTTP 200, `lang="pt-BR"`, title, 3 tabs, and comfort CTA rendered) |

---

## 2. Factual Content Audit (`src/data/dpc-content.ts`)

Audited line-by-line against `PDF1.pdf` (Aula 13) and `PDF2.pdf` (Aula 14):

### Aula 13 — Publicações Científicas (Prof. Inêz Barcellos de Andrade)
- **Conceito, 4 objetivos e 5 competências:** Verified exact match.
- **5 Tipos de Publicação:** Artigo Original, Revisões (Narrativas, Integrativas, Sistemáticas / Meta-análises), Relato de Caso, Estudos Clínicos e Epidemiológicos (Observacionais: Transversal, Caso-controle, Coorte; Experimentais: Ensaios clínicos), Literatura Cinzenta.
- **Pirâmide da Hierarquia das Evidências (8 níveis):**
  - 8 (Topo) Meta-análises → 7 Revisões Sistemáticas → 6 Ensaios Clínicos → 5 Estudos de Coorte → 4 Estudos Caso-Controle → 3 Estudos Transversais → 2 Relato de Caso → 1 (Base) Opiniões de Especialistas.
- **Bases Científicas & Operadores Booleanos:**
  - PubMed (Global · Saúde), BVS (Regional · Saúde), SciELO e BDTD (Regional · Multidisciplinar), Google Acadêmico, Scopus e Web of Science (Global · Multidisciplinar).
  - `AND`, `OR`, `NOT`, `Aspas ("" ou '')` + class example `('skin aging') AND ('aesthetic treatment') AND (adults)` vs `estética facial`.
- **Seleção de Periódicos, Métricas & Triagem:**
  - 5 Pilares (Objetivo, Escopo — desalinhamento de escopo = principal causa de rejeição, Qualidade, Integridade, Custos [APC] e Tempo).
  - Métricas: Indexação ("vitrine"), Fator de Impacto e CiteScore, Quartis Q1–Q4 (Q1 = top 25% mais citados), Índice H.
  - 4 Sinais Verdes, 4 Alertas Vermelhos, Regra de ouro: *"Pesquisadores da sua área leem este periódico? Se não leem, evite submeter."*
- **Estratégia Prática de Submissão:**
  - Engenharia Reversa (Método de 5 Minutos, 4 passos), Fluxo de 4 Filtros, Planos A (Ambicioso Q1), B (Equilibrado nacional indexada) e C (Segurança regional/anais), Checklist Anti-Retrabalho (4 itens) e Síntese final (*"A publicação não é o fim da pesquisa, é o início do impacto."*).

### Aula 14 — Estrutura do Projeto, Formatação e Declaração de Uso de IA (17.11.26, Prof. Inez Barcellos de Andrade)
- **Elementos Constitutivos (3 grupos):**
  - Pré-textuais: Capa, Folha de rosto, Folha de aprovação, Resumo, Sumário.
  - Textuais: `1 INTRODUÇÃO`, `2 REFERENCIAL TEÓRICO`, `3 MÉTODO`, `4 RESULTADOS ESPERADOS`, `5 PRODUÇÃO ESPERADA`, `6 CRONOGRAMA DE EXECUÇÃO EM MESES CORRIDOS`, `7 ORÇAMENTO`, `8 INFRAESTRUTURA`.
  - Pós-textuais: `DECLARAÇÃO DE USO DE IA (INTELIGÊNCIA ARTIFICIAL)`, `REFERÊNCIAS`, `APÊNDICES`, `ANEXOS`.
- **Padrões de Formatação:**
  - Espaçamento: `1,5` corpo do texto; `1,0` em citações diretas longas, resumo e `REFERÊNCIAS` (com dois espaços simples entre cada documento).
  - Tipo de letra: `Arial`, `Times New Roman` ou `Calibre` (uniformidade tipográfica).
  - Tamanho da letra: `12` geral; `18 (negrito)` título do projeto; `14` nomes dos autores; `10` citação direta longa e resumo.
  - Margens: `3 cm` (esquerda e superior) e `2 cm` (direita e inferior).
- **Hierarquia dos Títulos das Seções:**
  - Primária: Negrito, maiúsculas (`3 MÉTODO`)
  - Secundária: Negrito, minúsculas (`3.1 Desenho`, `3.2 População`)
  - Terciária: Minúsculas sem negrito (`3.2.1 Número de indivíduos abordados (amostra do estudo)`, `3.2.2 Variáveis do estudo`)
  - Quaternária: *Itálico* (*`3.2.2.1 Dependentes`*, *`3.2.2.2 Independentes`*, *`3.2.2.3 Controle`*)
- **Declaração de Uso de IA:**
  - Posicionada nos pós-textuais, **imediatamente antes das REFERÊNCIAS**.
  - Modelo completo com `ChatGPT`, `Semantic Scholar e SciSpace`, e `Claude`.

### Study Assets Count
- Flashcards: **16** (8 Aula 13 + 8 Aula 14)
- Quiz questions: **16** (8 Aula 13 + 8 Aula 14)
- Mimo messages: **8** (PT-BR)
- Kawaii Mascots (`src/components/mascots/KawaiiMascots.tsx`): **4** (`BunnyDoctor`, `BearNurse`, `CatResearcher`, `PuppyIntern`), each with `viewBox="0 0 120 120"` and reactive moods (`happy`, `cheering`, `thinking`, `love`).

---

## 3. WCAG AA Contrast & Accessibility Audit

All interactive and readable text/background pairs verified >= 4.5:1:
- `#2D2A32` on `#FFFDF9`: **13.88:1**
- `#5C5566` on `#FFFDF9`: **7.02:1**
- `#FFFFFF` on `#047857` (`mint-deep` solid buttons): **5.48:1**
- `#065F46` (`mint-ink`) on `#D1FAE5` (`mint-soft`): **6.78:1**
- `#FFFFFF` on `#DB2777` (`blush` solid buttons): **4.60:1**
- `#9D174D` (`blush-ink`) on `#FCE7F3` (`blush-soft`): **6.71:1**
- `#FFFFFF` on `#7C3AED` (`lavender` solid buttons): **5.70:1**
- `#5B21B6` (`lavender-ink`) on `#EDE9FE` (`lavender-soft`): **7.57:1**
- `#FFFFFF` on `#DC2626` (`danger` solid buttons): **4.83:1**
- `#B91C1C` (`danger-ink`) on `#FEE2E2` (`danger-soft`): **5.30:1**

Accessibility & motion compliance:
- `useSafeMotion()` wraps `useReducedMotion()` and disables 3D rotations/bounces/floating animations when `prefers-reduced-motion` is enabled.
- Native `<dialog>` (`showModal()`, `closedby="any"` + pointer-bounds light-dismiss fallback, CSS `overscroll-behavior: contain` on `dialog:modal` and `overflow: hidden; overscroll-behavior: contain` on `dialog::backdrop`).
- Single-row accessible `Tabs` (`role="tablist"`, `role="tab"`, `aria-selected`, arrow/Home/End navigation, `border-block-end` non-color indicator).
- Hydration-safe `localStorage` hook (`useStudyProgress.ts`) with SSR defaults populated inside `useEffect`.

---

## 4. Responsive & Defect Notes

- **Mobile (390px) & Tablet (768px) & Desktop (1440px):**
  - Body sets `overflow-x: clip`.
  - Pyramid buttons clamp to `min-w-[190px] max-w-full`.
  - Formatting reference table wraps in `overflow-x-auto`.
  - Main navigation tabs remain on a single horizontally scrollable row without wrapping.
- **Defects Resolved During QA:**
  1. Removed `@typescript-eslint/no-unused-vars` warning on `DialogHTMLAttributes<T>` in `src/types/html.d.ts`.
  2. Replaced block `<div>` descendants inside `<motion.button>` in `src/components/study/FlashcardsTab.tsx` with phrasing `<span>` elements for strict HTML5 validity.
  3. Moved `<Tabs>` out of `<nav>` into `<main>` in `src/app/page.tsx` so in-page tablist semantics follow `tabs` guidance.
