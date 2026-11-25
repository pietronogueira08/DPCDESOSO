# QA Report — `fisio-sophia-app`

**Data de Auditoria:** 2026-11-25  
**Escopo:** Plataforma interativa 48h de Fisiologia Médica para **Sophia** (PT-BR, nível Guyton & Hall / Silverthorn).  
**Status Final:** ✅ **APROVADO EM TODOS OS GATES (Stages 0–4)**

---

## 1. Resultados da Suíte de Verificação (pós-última edição)

| Verificação | Comando | Resultado | Observações |
|---|---|---|---|
| Conteúdo, Links & Higiene | `node scripts/verify-content.mjs` | ✅ **PASSOU (exit 0)** | 3 trilhas, 14 tópicos (5 GI, 3 Renal, 6 Endócrino), 4–6 `keyConcepts`/tópico, 42 flashcards, 28 questões, 4 SVGs (`viewBox="0 0 120 120"`), 10 notas do Pietro, 0 URLs `watch?v=`/`youtu.be/`, 0 vestígios legados |
| Tipagem Estrita (`strict: true`) | `npx tsc --noEmit` | ✅ **PASSOU (exit 0)** | Zero erros TypeScript |
| Linter & Core Web Vitals | `npm run lint` | ✅ **PASSOU (exit 0)** | `✔ No ESLint warnings or errors` |
| Build de Produção (Next.js 15) | `npm run build` | ✅ **PASSOU (exit 0)** | Rota `/` estática (`117 kB` / `220 kB` First Load JS), compilação em `6.6s` |
| Smoke Test SSR Produção | `next start -p 3099` → HTTP GET | ✅ **PASSOU (HTTP 200)** | HTML `125359` bytes contendo `Sophia`, `Fisiologia` e `Feito com todo amor pelo Pietro` |

---

## 2. Inventário Médico & Funcional Auditado

- **Trilha 1 — Fisiologia Gastrointestinal (5 tópicos, Dia 1):**
  1. `gi-01-secrecoes`: Secreção Salivar, Gástrica e Pancreática
  2. `gi-02-degluticao-motilidade`: Deglutição e Motilidade Gastrointestinal
  3. `gi-03-reflexos-gi`: Reflexos Gastrintestinais
  4. `gi-04-digestao-absorcao`: Digestão e Absorção
  5. `gi-05-figado-vias-biliares`: Fígado e Vias Biliares
- **Trilha 2 — Fisiologia Renal e Equilíbrio Ácido-Base (3 tópicos, Dia 1):**
  6. `renal-01-filtracao-tubulos`: Fisiologia Renal I (filtração glomerular, Starling, TFG, autorregulação, SRAA, TCP, clearance)
  7. `renal-02-concentracao-miccao`: Fisiologia Renal II (contracorrente, NKCC2, vasa recta, ADH/AQP2, aldosterona, reflexo de micção)
  8. `renal-03-acido-base`: Equilíbrio Ácido-Base (Henderson-Hasselbalch, 3 linhas de defesa, Fórmula de Winter, Ânion Gap)
- **Trilha 3 — Fisiologia Endócrina / Hormonal (6 tópicos, Dia 2):**
  9. `endo-01-hipotalamo-hipofise`: Eixo hipotálamo-hipofisário
  10. `endo-02-tireoide-paratireoide`: Tireoide e paratireoide
  11. `endo-03-pancreas-adrenal`: Pâncreas endócrino e adrenal
  12. `endo-04-hormonal-masculina`: Fisiologia hormonal masculina
  13. `endo-05-hormonal-feminina`: Fisiologia hormonal feminina
  14. `endo-06-gravidez-lactacao`: Gravidez, parto e lactação
- **Bancos de Estudo:** 42 Flashcards 3D (3/tópico) + 28 Questões clínicas/mecanísticas (2/tópico) com modos *Treino Comentado* e *Prova Real*.
- **3 Mini-Labs Interativos + Revisão Relâmpago (5 min):**
  - `GasometriaLab`: sliders `pH`, `PaCO2`, `HCO3−`, `Na+`, `Cl−`, presets clínicos, Fórmula de Winter e Ânion Gap sem `NaN`.
  - `NefronLab`: SVG interativo (`viewBox="0 0 640 340"`) com 5 segmentos clicáveis + botões sincronizados.
  - `EixosLab`: 4 eixos (HPT, HPA, HPG masculino, HPG feminino com *Virada do Feedback Positivo / Ovulação*).
  - `QuickReviewCheatSheet`: 3 painéis sanfonados para revisão rápida pré-prova.
- **4 Mascotes SVG Animados (`AnimatedMascots.tsx`):** `DrCoelhinho`, `DraUrsinha`, `GatinhaEndocrino`, `CachorrinhoMimo`.
- **Persistência:** `localStorage` sob namespace `fisio_sophia_v1` com guarda `mounted` para evitar mismatch de hidratação SSR.

---

## 3. Responsividade, Acessibilidade & Motion

- **Viewports (`390px`, `768px`, `1440px`):** `overflow-x-clip` no `<body>`, grids responsivos (`grid-cols-1 md:grid-cols-2 / lg:grid-cols-12`), SVGs com `viewBox` escaláveis e tabs em grade 2×2 no mobile sem estouro horizontal.
- **Contraste WCAG AA (>= 4.5:1):** pares validados em `tailwind.config.ts` (`#047857` / `#065F46` sobre `#D1FAE5`, `#0369A1` / `#075985` sobre `#E0F2FE`, `#6D28D9` / `#5B21B6` sobre `#EDE9FE`, `#BE185D` / `#9D174D` sobre `#FCE7F3`, `#92400E` sobre `#FEF3C7`, `#26232B` / `#575061` sobre `#FFFDF9`/`#FFFFFF`).
- **Motion & WCAG 2.2.2:** `useReducedMotion()` integrado em `src/lib/motion.ts` (`useSafeMotion`) + botão explícito de pausar/ativar animações no cabeçalho sem `aria-pressed` quando o rótulo alterna.
- **Native `<dialog>`:** modais (`TopicModal`, `ComfortButtonAndModal`, modal de reset) usam `showModal()`, `closedby="any"` com fallback `pointerdown`/`pointerup` para Safari, `overscroll-behavior: contain` e `overflow: hidden` em `dialog::backdrop`.

---

## 4. Defeitos Encontrados e Corrigidos Durante o QA

1. **JSX em arquivo `.ts` (`src/lib/motion.ts`):** uso de `<MotionPreferenceContext.Provider>` em arquivo `.ts` causou erro `TS1005` na Gate 2. **Correção:** substituído por `React.createElement(MotionPreferenceContext.Provider, ...)`.
2. **Contagem estrita de `keyConcepts` (4–6 por tópico):** tópicos #12 (`endo-04-hormonal-masculina`) e #13 (`endo-05-hormonal-feminina`) possuíam 3 blocos cada. **Correção:** adicionado o 4º bloco médico estruturado em ambos (`src/data/physiology-tracks.ts`) e endurecida a asserção em `scripts/verify-content.mjs` (`>= 4 && <= 6`).
3. **Fluxo "Refazer só as que errei" (`src/components/study/QuizView.tsx`):** limpar `quizAnswers` e retornar para `scope="all"` fazia o usuário refazer todas as questões ao invés de filtrar apenas as erradas. **Correção:** adicionado estado `retryIds` preservando exatamente o subconjunto errado enquanto `quizAnswers` é limpo para re-tentativa.
4. **Acessibilidade mobile no cabeçalho (`src/components/study/FisioStudioApp.tsx`):** botões compactos de pausar animações e resetar progresso ocultavam texto em `390px` (`hidden sm:inline`). **Correção:** adicionados atributos `aria-label` explícitos em ambos os botões.
