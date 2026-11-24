export type AulaId = "aula13" | "aula14";

export type MascotId = "bunny" | "bear" | "cat" | "puppy";

export type SectionId =
  | "a13-conceito"
  | "a13-tipos"
  | "a13-piramide"
  | "a13-bases-booleanos"
  | "a13-periodicos-metricas"
  | "a13-estrategia"
  | "a14-elementos"
  | "a14-formatacao"
  | "a14-hierarquia"
  | "a14-declaracao-ia";

export interface StudySectionMeta {
  id: SectionId;
  aula: AulaId;
  order: number;
  title: string;
  subtitle: string;
  badgeLabel: string;
}

export interface PublicationTypeItem {
  id: string;
  vehicle: string;
  summary: string;
  subtypes?: string[];
}

export interface PyramidLevel {
  level: number;
  tag: string;
  design: string;
  strength: string;
  category: "Síntese" | "Experimental" | "Observacional" | "Descritivo / Base";
  widthPercent: number;
}

export interface ScientificDatabaseItem {
  id: string;
  name: string;
  scope: string;
  accessLabel: string;
  description: string;
}

export interface BooleanOperatorItem {
  id: "AND" | "OR" | "NOT" | "QUOTES";
  symbol: string;
  label: string;
  effect: "restringe" | "amplia" | "exclui" | "exata";
  rule: string;
  exampleSnippet: string;
}

export interface JournalPillarItem {
  number: number;
  title: string;
  detail: string;
  examTip?: string;
}

export interface JournalMetricItem {
  id: string;
  name: string;
  metaphor?: string;
  description: string;
}

export interface PredatoryTriageCase {
  id: string;
  scenario: string;
  isReliable: boolean;
  reason: string;
}

export interface ReverseEngineeringStep {
  step: number;
  title: string;
  detail: string;
}

export interface SubmissionFilterStep {
  filterNumber: number;
  title: string;
  description: string;
}

export interface SubmissionPlanItem {
  plan: "A" | "B" | "C";
  title: string;
  characteristics: string;
  destinationExample: string;
}

export interface ProjectBlockGroup {
  id: "pre" | "text" | "post";
  title: string;
  subtitle: string;
  items: {
    label: string;
    highlight?: boolean;
    note?: string;
  }[];
}

export interface FormattingRuleItem {
  id: "espacamento" | "fonte" | "tamanho" | "margens";
  element: string;
  generalRule: string;
  exceptions: string[];
}

export interface SectionHierarchyLevel {
  level: number;
  name: string;
  requiredFormatting: string;
  examples: string[];
  styleVariant: "primary" | "secondary" | "tertiary" | "quaternary";
}

export interface AiDeclarationExampleItem {
  tool: string;
  usage: string;
}

export interface FlashcardItem {
  id: string;
  aula: AulaId;
  topic: string;
  front: string;
  back: string;
  dicaRapida: string;
}

export interface QuizQuestionItem {
  id: string;
  aula: AulaId;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface MimoMessageItem {
  id: string;
  text: string;
  mascot: MascotId;
  badge: string;
}

export const COURSE_META = {
  institution: "Faculdade de Medicina de Campos (FMC)",
  discipline: "Delineamento da Pesquisa Científica / Clínica (DPC)",
  term: "2026.2",
  aula13: {
    title: "Aula 13 — Publicações Científicas",
    professor: "Prof. Inêz Barcellos de Andrade",
    focus: "Tipos de publicação, busca estruturada e escolha de periódicos",
  },
  aula14: {
    title: "Aula 14 — Estrutura do Projeto, Formatação e Declaração de Uso de IA",
    professor: "Prof. Inez Barcellos de Andrade",
    date: "17.11.26",
  },
} as const;

export const STUDY_SECTIONS: StudySectionMeta[] = [
  {
    id: "a13-conceito",
    aula: "aula13",
    order: 1,
    title: "1. Conceito, Objetivos e Competências",
    subtitle: "O que define uma publicação científica, os 4 objetivos e as 5 competências da aula",
    badgeLabel: "Aula 13 • Fundamentos",
  },
  {
    id: "a13-tipos",
    aula: "aula13",
    order: 2,
    title: "2. Tipos de Publicação Científica",
    subtitle: "Artigo original, revisões, relato de caso, estudos clínicos/epidemiológicos e literatura cinzenta",
    badgeLabel: "Aula 13 • Veículos",
  },
  {
    id: "a13-piramide",
    aula: "aula13",
    order: 3,
    title: "3. Pirâmide da Hierarquia das Evidências",
    subtitle: "Os 8 níveis do maior ao menor rigor metodológico (laboratório clicável)",
    badgeLabel: "Aula 13 • Lab Pirâmide",
  },
  {
    id: "a13-bases-booleanos",
    aula: "aula13",
    order: 4,
    title: "4. Bases Científicas & Operadores Booleanos",
    subtitle: "PubMed, BVS, SciELO/BDTD, Google Acadêmico/Scopus/WoS e construtor de busca",
    badgeLabel: "Aula 13 • Lab Booleano",
  },
  {
    id: "a13-periodicos-metricas",
    aula: "aula13",
    order: 5,
    title: "5. Seleção de Periódicos, Métricas e Integridade",
    subtitle: "5 pilares, indexação, Fator de Impacto, Quartis Q1–Q4, Índice H e triagem predatória",
    badgeLabel: "Aula 13 • Lab Predatório",
  },
  {
    id: "a13-estrategia",
    aula: "aula13",
    order: 6,
    title: "6. Estratégia Prática de Submissão (Planos A, B e C)",
    subtitle: "Engenharia Reversa de 5 min, 4 filtros, planos ranqueados e checklist anti-retrabalho",
    badgeLabel: "Aula 13 • Estratégia",
  },
  {
    id: "a14-elementos",
    aula: "aula14",
    order: 7,
    title: "1. Elementos Constitutivos do Projeto",
    subtitle: "Os 3 blocos sequenciais: Pré-textuais, Textuais (1 a 8) e Pós-textuais",
    badgeLabel: "Aula 14 • Mapa Visual",
  },
  {
    id: "a14-formatacao",
    aula: "aula14",
    order: 8,
    title: "2. Padrões de Formatação do Projeto",
    subtitle: "Espaçamento 1,5 vs 1,0, fontes permitidas, tamanhos 18/14/12/10 e margens 3 cm / 2 cm",
    badgeLabel: "Aula 14 • Cola Visual",
  },
  {
    id: "a14-hierarquia",
    aula: "aula14",
    order: 9,
    title: "3. Hierarquia dos Títulos das Seções",
    subtitle: "Da seção primária (MAIÚSCULAS em negrito) até a quaternária (Itálico)",
    badgeLabel: "Aula 14 • Tipografia",
  },
  {
    id: "a14-declaracao-ia",
    aula: "aula14",
    order: 10,
    title: "4. Declaração de Uso de Inteligência Artificial (IA)",
    subtitle: "Posição obrigatória, elementos exigidos e modelo completo pronto para copiar",
    badgeLabel: "Aula 14 • Modelo & Cópia",
  },
];

// =============================================================================
// AULA 13 — PUBLICAÇÕES CIENTÍFICAS
// =============================================================================

export const AULA13_CONCEITO = {
  definition:
    "Publicações científicas são formas padronizadas de comunicar resultados de pesquisas, descobertas, revisões e conhecimentos produzidos pela comunidade acadêmica. São documentos elaborados com rigor metodológico e geralmente submetidos à revisão por pares (avaliação por especialistas da área).",
  objectives: [
    "Divulgar descobertas científicas",
    "Compartilhar evidências e metodologias",
    "Permitir a reprodução dos estudos",
    "Construir conhecimento acumulativo",
  ],
  competencies: [
    "Diferenciar tipos de publicação",
    "Identificar bases científicas",
    "Avaliar qualidade e métricas",
    "Construir busca estruturada",
    "Selecionar o destino final da pesquisa",
  ],
} as const;

export const AULA13_TIPOS_PUBLICACAO: PublicationTypeItem[] = [
  {
    id: "artigo-original",
    vehicle: "Artigo Original",
    summary:
      "Pesquisa inédita com coleta e análise próprias de dados e apresentação de resultados originais.",
  },
  {
    id: "revisoes",
    vehicle: "Revisões",
    summary: "Sintetizam o conhecimento existente em diferentes níveis de rigor:",
    subtypes: [
      "Narrativas: amplas",
      "Integrativas: misturam diferentes tipos de estudo",
      "Sistemáticas / Meta-análises: método rigoroso e reprodutível",
    ],
  },
  {
    id: "relato-de-caso",
    vehicle: "Relato de Caso",
    summary:
      "Descreve situações clínicas específicas, procedimentos incomuns ou efeitos raros (muito comum na área da saúde).",
  },
  {
    id: "clinicos-epidemiologicos",
    vehicle: "Estudos Clínicos e Epidemiológicos",
    summary: "Dividem-se em dois grandes grupos metodológicos:",
    subtypes: [
      "Observacionais: Transversal, Caso-controle e Coorte",
      "Experimentais: Ensaios clínicos",
    ],
  },
  {
    id: "literatura-cinzenta",
    vehicle: "Literatura Cinzenta",
    summary:
      "Teses, dissertações, relatórios técnicos, anais de congressos e livros acadêmicos — evidências produzidas fora dos periódicos científicos tradicionais.",
  },
];

export const EVIDENCE_PYRAMID: PyramidLevel[] = [
  {
    level: 8,
    tag: "Nível 8 (Topo)",
    design: "Meta-análises",
    strength: "Máximo rigor metodológico e síntese quantitativa de múltiplos estudos.",
    category: "Síntese",
    widthPercent: 34,
  },
  {
    level: 7,
    tag: "Nível 7",
    design: "Revisões Sistemáticas",
    strength: "Síntese rigorosa e padronizada de toda a evidência disponível sobre uma pergunta.",
    category: "Síntese",
    widthPercent: 44,
  },
  {
    level: 6,
    tag: "Nível 6",
    design: "Ensaios Clínicos",
    strength: "Estudos experimentais com intervenção controlada.",
    category: "Experimental",
    widthPercent: 54,
  },
  {
    level: 5,
    tag: "Nível 5",
    design: "Estudos de Coorte",
    strength: "Observacionais longitudinais que acompanham grupos expostos e não expostos.",
    category: "Observacional",
    widthPercent: 64,
  },
  {
    level: 4,
    tag: "Nível 4",
    design: "Estudos Caso-Controle",
    strength: "Observacionais retrospectivos comparando indivíduos com e sem o desfecho.",
    category: "Observacional",
    widthPercent: 73,
  },
  {
    level: 3,
    tag: "Nível 3",
    design: "Estudos Transversais",
    strength: "Observacionais que avaliam exposição e desfecho em um único momento.",
    category: "Observacional",
    widthPercent: 82,
  },
  {
    level: 2,
    tag: "Nível 2",
    design: "Relato de Caso",
    strength: "Descrição detalhada de casos individuais ou séries raras.",
    category: "Descritivo / Base",
    widthPercent: 91,
  },
  {
    level: 1,
    tag: "Nível 1 (Base)",
    design: "Opiniões de Especialistas",
    strength: "Menor nível de evidência empírica; baseado em experiência clínica ou consenso.",
    category: "Descritivo / Base",
    widthPercent: 100,
  },
];

export const SCIENTIFIC_DATABASES: ScientificDatabaseItem[] = [
  {
    id: "pubmed",
    name: "PubMed",
    scope: "Global · Saúde",
    accessLabel: "Gratuito",
    description: "Padrão ouro em ciências da saúde; acesso gratuito.",
  },
  {
    id: "bvs",
    name: "BVS (Biblioteca Virtual em Saúde)",
    scope: "Regional · Saúde",
    accessLabel: "Gratuito",
    description: "Foco em produção científica de saúde latino-americana.",
  },
  {
    id: "scielo-bdtd",
    name: "SciELO e BDTD",
    scope: "Regional · Multidisciplinar",
    accessLabel: "Acesso aberto",
    description:
      "SciELO: periódicos da América Latina em acesso aberto. BDTD: teses e dissertações brasileiras.",
  },
  {
    id: "global-multi",
    name: "Google Acadêmico, Scopus e Web of Science",
    scope: "Global · Multidisciplinar",
    accessLabel: "Gratuito / Pagos",
    description:
      "Google Acadêmico: gratuito e amplo. Scopus e Web of Science: geralmente pagos, reúnem periódicos de alto impacto.",
  },
];

export const BOOLEAN_OPERATORS: BooleanOperatorItem[] = [
  {
    id: "AND",
    symbol: "AND",
    label: "Interseção (Restringe)",
    effect: "restringe",
    rule: "Exige a presença de ambos os termos no mesmo artigo (restringe a busca).",
    exampleSnippet: "('skin aging') AND ('aesthetic treatment')",
  },
  {
    id: "OR",
    symbol: "OR",
    label: "União / Sinônimos (Amplia)",
    effect: "amplia",
    rule: "Aceita um termo ou outro, útil para sinônimos (amplia a busca).",
    exampleSnippet: "('aesthetic treatment' OR 'cosmetic procedure')",
  },
  {
    id: "NOT",
    symbol: "NOT",
    label: "Exclusão (Remove termo)",
    effect: "exclui",
    rule: "Exclui um termo indesejado dos resultados.",
    exampleSnippet: "('skin aging') NOT ('animal model')",
  },
  {
    id: "QUOTES",
    symbol: '"" ou \'\'',
    label: "Aspas (Expressão Exata)",
    effect: "exata",
    rule: "Recupera exatamente a expressão composta na ordem digitada.",
    exampleSnippet: "'skin aging' e 'aesthetic treatment'",
  },
];

export const BOOLEAN_CLASS_EXAMPLE = {
  amateurQuery: "estética facial",
  professionalQuery: "('skin aging') AND ('aesthetic treatment') AND (adults)",
  note: "Em vez de buscar termos isolados, combina-se logicamente descritores em inglês para refinar os resultados.",
} as const;

export const JOURNAL_FIVE_PILLARS: JournalPillarItem[] = [
  {
    number: 1,
    title: "Objetivo",
    detail: "Priorizar impacto acadêmico, divulgação rápida ou networking na área.",
  },
  {
    number: 2,
    title: "Escopo",
    detail: "Verificar se tema, palavras-chave e público da revista combinam com o manuscrito.",
    examTip: "O desalinhamento de escopo é a principal causa de rejeição!",
  },
  {
    number: 3,
    title: "Qualidade",
    detail: "Conferir indexação e métricas bibliométricas.",
  },
  {
    number: 4,
    title: "Integridade",
    detail: "Assegurar que o periódico é confiável e evitar revistas predatórias.",
  },
  {
    number: 5,
    title: "Custos e Tempo",
    detail:
      "Verificar se há verba para taxas de publicação (APC) e se o prazo de avaliação atende às exigências acadêmicas (como defesa de trabalho).",
  },
];

export const JOURNAL_METRICS: JournalMetricItem[] = [
  {
    id: "indexacao",
    name: "Indexação",
    metaphor: 'A "vitrine" do periódico',
    description:
      "Revistas indexadas no SciELO, PubMed, Scopus ou Web of Science possuem muito maior visibilidade e credibilidade.",
  },
  {
    id: "fi-citescore",
    name: "Fator de Impacto e CiteScore",
    description:
      "Medem a média de citações que os artigos da revista recebem; quanto maiores, mais influente é o periódico.",
  },
  {
    id: "quartis",
    name: "Quartis (Q1 a Q4)",
    description:
      "Dividem as revistas de uma área em quatro grupos de impacto; o Q1 representa os 25% mais citados (a elite da área).",
  },
  {
    id: "indice-h",
    name: "Índice H",
    description: "Métrica que cruza o volume de publicações com o volume de citações recebidas.",
  },
];

export const PREDATORY_SCREENING = {
  greenFlags: [
    "Periódico reconhecido pela comunidade da área.",
    "Processo claro e transparente de revisão por pares.",
    "Atribuição regular de identificador DOI.",
    "Autores identificados e referências adequadas.",
  ],
  redFlags: [
    "Promessa de aceitação e publicação em poucos dias.",
    'Escopo genérico que "aceita tudo" de qualquer área.',
    "E-mails agressivos e constantes cobrando submissões.",
    "Métricas de impacto estranhas ou inventadas.",
  ],
  goldenRule:
    "Pesquisadores da sua área leem este periódico? Se não leem, evite submeter.",
  triageCases: [
    {
      id: "case-1",
      scenario:
        "Revista envia e-mail em massa prometendo publicação garantida em 5 dias e aceita artigos de cardiologia, direito e engenharia na mesma edição.",
      isReliable: false,
      reason:
        "Alerta Vermelho: promessa de aceitação em poucos dias, e-mails agressivos e escopo genérico que 'aceita tudo' são marcas clássicas de revista predatória.",
    },
    {
      id: "case-2",
      scenario:
        "Periódico indexado no PubMed/SciELO, com revisão por pares descrita com clareza, atribuição regular de DOI e lido pelos docentes da sua área.",
      isReliable: true,
      reason:
        "Sinal Verde: indexação consolidada, revisão por pares transparente, DOI regular e reconhecimento pela comunidade científica da área.",
    },
    {
      id: "case-3",
      scenario:
        "Site exibe selo 'Global Universal Impact Factor 9.8' sem constar na Web of Science, Scopus, SciELO ou PubMed, e nenhum colega da área conhece o título.",
      isReliable: false,
      reason:
        "Alerta Vermelho: métricas de impacto estranhas/inventadas e falha na Regra de Ouro ('pesquisadores da sua área leem este periódico?').",
    },
    {
      id: "case-4",
      scenario:
        "Artigos publicados apresentam autores com afiliação identificada, referências adequadas e histórico transparente de avaliação por especialistas.",
      isReliable: true,
      reason:
        "Sinal Verde: autores identificados, referências adequadas e revisão por pares transparente indicam integridade editorial.",
    },
  ] satisfies PredatoryTriageCase[],
} as const;

export const REVERSE_ENGINEERING_STEPS: ReverseEngineeringStep[] = [
  {
    step: 1,
    title: "Resumo mental",
    detail: "Defina tema, população, método e objetivo da sua pesquisa.",
  },
  {
    step: 2,
    title: "Palavras-chave em inglês",
    detail: "Extraia os descritores principais e traduza para o inglês.",
  },
  {
    step: 3,
    title: "Buscar 20 a 30 semelhantes",
    detail: "Pesquise artigos parecidos no PubMed ou Google Acadêmico.",
  },
  {
    step: 4,
    title: "Rastrear os periódicos",
    detail: "Veja onde foram publicados: as revistas que se repetem são suas candidatas ideais.",
  },
];

export const FOUR_FILTERS_FLOW: SubmissionFilterStep[] = [
  {
    filterNumber: 1,
    title: "Engenharia Reversa",
    description: "Partindo da ideia e das palavras-chave, liste periódicos onde estudos semelhantes saíram.",
  },
  {
    filterNumber: 2,
    title: "Alinhamento de Escopo",
    description: "Elimine revistas cujo foco, público ou tipo de artigo não combinam com o manuscrito.",
  },
  {
    filterNumber: 3,
    title: "Qualidade e Integridade",
    description: "Confira indexação, métricas reais e descarte qualquer sinal predatório.",
  },
  {
    filterNumber: 4,
    title: "Viabilidade (custo, tempo, idioma)",
    description: "Avalie APC, prazo de avaliação e idioma para obter 3 opções ranqueadas (Planos A, B e C).",
  },
];

export const SUBMISSION_PLANS: SubmissionPlanItem[] = [
  {
    plan: "A",
    title: "Plano A (Ambicioso)",
    characteristics: "Maior impacto, alta concorrência e revisão rigorosa.",
    destinationExample: "Revista internacional de ponta (Q1).",
  },
  {
    plan: "B",
    title: "Plano B (Equilibrado)",
    characteristics: "Boa chance de aceitação, impacto intermediário e escopo aderente.",
    destinationExample: "Revista nacional indexada e reconhecida.",
  },
  {
    plan: "C",
    title: "Plano C (Segurança)",
    characteristics: "Menor impacto, porém publicação mais rápida e acessível.",
    destinationExample: "Periódico regional especializado ou anais de congresso.",
  },
];

export const ANTI_REWORK_CHECKLIST: string[] = [
  "Limite rigoroso de palavras",
  "Estilo de referências exigido (Vancouver, APA ou ABNT)",
  "Número máximo de autores permitido",
  "Limite de figuras e tabelas",
];

export const AULA13_FINAL_SYNTHESIS =
  "A publicação não é o fim da pesquisa, é o início do impacto.";

// =============================================================================
// AULA 14 — ESTRUTURA DO PROJETO, FORMATAÇÃO E DECLARAÇÃO DE USO DE IA
// =============================================================================

export const AULA14_PROJECT_BLOCKS: ProjectBlockGroup[] = [
  {
    id: "pre",
    title: "Itens Pré-textuais",
    subtitle: "Apresentação inicial e identificação",
    items: [
      { label: "Capa" },
      { label: "Folha de rosto" },
      { label: "Folha de aprovação" },
      { label: "Resumo" },
      { label: "Sumário" },
    ],
  },
  {
    id: "text",
    title: "Itens Textuais",
    subtitle: "Corpo numerado do projeto (1 a 8)",
    items: [
      { label: "1 INTRODUÇÃO" },
      { label: "2 REFERENCIAL TEÓRICO" },
      { label: "3 MÉTODO" },
      { label: "4 RESULTADOS ESPERADOS" },
      { label: "5 PRODUÇÃO ESPERADA" },
      { label: "6 CRONOGRAMA DE EXECUÇÃO EM MESES CORRIDOS" },
      { label: "7 ORÇAMENTO" },
      { label: "8 INFRAESTRUTURA" },
    ],
  },
  {
    id: "post",
    title: "Itens Pós-textuais",
    subtitle: "Ordem obrigatória após o corpo",
    items: [
      {
        label: "DECLARAÇÃO DE USO DE IA (INTELIGÊNCIA ARTIFICIAL)",
        highlight: true,
        note: "Posição de prova: imediatamente antes das REFERÊNCIAS",
      },
      { label: "REFERÊNCIAS" },
      { label: "APÊNDICES" },
      { label: "ANEXOS" },
    ],
  },
];

export const AULA14_FORMATTING_RULES: FormattingRuleItem[] = [
  {
    id: "espacamento",
    element: "Espaçamento",
    generalRule: "1,5 entre as linhas no corpo do texto.",
    exceptions: [
      "Espaço simples (1,0) nas citações diretas longas.",
      "Espaço simples (1,0) no resumo.",
      "Espaço simples (1,0) na lista de REFERÊNCIAS (com dois espaços simples entre cada documento).",
    ],
  },
  {
    id: "fonte",
    element: "Tipo de letra",
    generalRule: "Arial, Times New Roman ou Calibre.",
    exceptions: ["Manter uniformidade tipográfica em todo o documento."],
  },
  {
    id: "tamanho",
    element: "Tamanho da letra",
    generalRule: "12 em todo o texto.",
    exceptions: [
      "18 (em negrito): título do projeto",
      "14: nomes dos autores",
      "10: citação direta longa e resumo",
    ],
  },
  {
    id: "margens",
    element: "Margens",
    generalRule: "3 cm (esquerda e superior) e 2 cm (direita e inferior).",
    exceptions: ["Aplicadas em todas as páginas textuais do projeto."],
  },
];

export const AULA14_SECTION_HIERARCHY: SectionHierarchyLevel[] = [
  {
    level: 1,
    name: "Seção primária",
    requiredFormatting: "Negrito, maiúsculas",
    examples: ["3 MÉTODO"],
    styleVariant: "primary",
  },
  {
    level: 2,
    name: "Seção secundária",
    requiredFormatting: "Negrito, minúsculas",
    examples: ["3.1 Desenho", "3.2 População"],
    styleVariant: "secondary",
  },
  {
    level: 3,
    name: "Seção terciária",
    requiredFormatting: "Minúsculas (sem negrito)",
    examples: [
      "3.2.1 Número de indivíduos abordados (amostra do estudo)",
      "3.2.2 Variáveis do estudo",
    ],
    styleVariant: "tertiary",
  },
  {
    level: 4,
    name: "Seção quaternária",
    requiredFormatting: "Itálico",
    examples: [
      "3.2.2.1 Dependentes",
      "3.2.2.2 Independentes",
      "3.2.2.3 Controle",
    ],
    styleVariant: "quaternary",
  },
];

export const AULA14_AI_DECLARATION = {
  chapterTitle: "DECLARAÇÃO DE USO DE INTELIGÊNCIA ARTIFICIAL",
  positionRule:
    "Quando ferramentas de Inteligência Artificial forem utilizadas na elaboração do projeto de pesquisa, deve-se incluir o capítulo DECLARAÇÃO DE USO DE INTELIGÊNCIA ARTIFICIAL nos elementos pós-textuais, posicionado imediatamente antes das REFERÊNCIAS.",
  mandatoryContent:
    "O texto da declaração deve informar explicitamente o nome da(s) ferramenta(s) de IA utilizada(s) e a(s) etapa(s) ou finalidade(s) correspondente(s) no desenvolvimento do projeto.",
  modelIntro:
    "Declaro para os devidos fins a utilização da ferramenta de IA na(s) etapa(s) de elaboração do projeto de pesquisa:",
  examples: [
    {
      tool: "ChatGPT",
      usage:
        "Resumo — elaboração e revisão de língua portuguesa; Na Introdução — sugestões para pergunta de pesquisa e objetivos; Apêndices — estruturação do protocolo de coleta de dados.",
    },
    {
      tool: "Semantic Scholar e SciSpace",
      usage:
        "para Pesquisa bibliográfica — Introdução (Problematização e Justificativa); Referencial teórico; Método — busca de artigos para escrita a partir de citações, visando fundamentação para redação do texto.",
    },
    {
      tool: "Claude",
      usage:
        "Método — sugestões para definição das variáveis da pesquisa (dependente, independente e controle).",
    },
  ] satisfies AiDeclarationExampleItem[],
  copyableText: [
    "DECLARAÇÃO DE USO DE INTELIGÊNCIA ARTIFICIAL",
    "",
    "Declaro para os devidos fins a utilização da ferramenta de IA na(s) etapa(s) de elaboração do projeto de pesquisa:",
    "",
    "• ChatGPT: Resumo — elaboração e revisão de língua portuguesa; Na Introdução — sugestões para pergunta de pesquisa e objetivos; Apêndices — estruturação do protocolo de coleta de dados.",
    "• Semantic Scholar e SciSpace: para Pesquisa bibliográfica — Introdução (Problematização e Justificativa); Referencial teórico; Método — busca de artigos para escrita a partir de citações, visando fundamentação para redação do texto.",
    "• Claude: Método — sugestões para definição das variáveis da pesquisa (dependente, independente e controle).",
  ].join("\n"),
} as const;

// =============================================================================
// 16 FLASHCARDS (8 AULA 13 + 8 AULA 14)
// =============================================================================

export const FLASHCARDS: FlashcardItem[] = [
  // Aula 13 (8 cards)
  {
    id: "fc-a13-1",
    aula: "aula13",
    topic: "Objetivos e Conceito",
    front: "Quais são os 4 objetivos principais das publicações científicas e o que garante sua confiabilidade?",
    back: "Objetivos: (1) divulgar descobertas científicas; (2) compartilhar evidências e metodologias; (3) permitir a reprodução dos estudos; (4) construir conhecimento acumulativo. A confiabilidade vem do rigor metodológico e da revisão por pares (avaliação por especialistas da área).",
    dicaRapida: "Lembre da sigla mental D-C-R-C: Divulgar, Compartilhar, Reproduzir e Construir.",
  },
  {
    id: "fc-a13-2",
    aula: "aula13",
    topic: "Tipos de Revisão & Literatura Cinzenta",
    front: "Como diferenciar Revisões Narrativas, Integrativas, Sistemáticas e Literatura Cinzenta?",
    back: "Narrativas: amplas. Integrativas: misturam diferentes tipos de estudo. Sistemáticas / Meta-análises: método rigoroso e reprodutível. Literatura Cinzenta: teses, dissertações, relatórios técnicos, anais de congressos e livros acadêmicos produzidos fora dos periódicos tradicionais.",
    dicaRapida: "Na BDTD você encontra justamente literatura cinzenta brasileira (teses e dissertações)!",
  },
  {
    id: "fc-a13-3",
    aula: "aula13",
    topic: "Pirâmide das Evidências",
    front: "Liste os 8 níveis da Pirâmide da Hierarquia das Evidências, do topo (Nível 8) à base (Nível 1).",
    back: "8. Meta-análises (topo) → 7. Revisões Sistemáticas → 6. Ensaios Clínicos → 5. Estudos de Coorte → 4. Estudos Caso-Controle → 3. Estudos Transversais → 2. Relato de Caso → 1. Opiniões de Especialistas (base).",
    dicaRapida: "Subindo dos observacionais: Transversal (3) → Caso-Controle (4) → Coorte (5), antes dos Ensaios Clínicos (6).",
  },
  {
    id: "fc-a13-4",
    aula: "aula13",
    topic: "Bases Científicas",
    front: "Qual a diferença de recorte entre PubMed, BVS, SciELO/BDTD e Scopus/Web of Science?",
    back: "PubMed: Global · Saúde (padrão ouro, gratuito). BVS: Regional · Saúde (foco América Latina). SciELO e BDTD: Regional · Multidisciplinar (SciELO = periódicos AL acesso aberto; BDTD = teses/dissertações BR). Google Acadêmico (gratuito/amplo), Scopus e WoS (geralmente pagos, alto impacto): Global · Multidisciplinar.",
    dicaRapida: "Cruze 2 eixos: Global vs Regional × Saúde vs Multidisciplinar.",
  },
  {
    id: "fc-a13-5",
    aula: "aula13",
    topic: "Operadores Booleanos",
    front: "O que faz cada operador booleano: AND, OR, NOT e Aspas (\"\" ou '')? Qual o exemplo da aula?",
    back: "AND: exige ambos os termos (restringe). OR: aceita um ou outro, ideal para sinônimos (amplia). NOT: exclui termo indesejado. Aspas: expressão exata na ordem digitada. Exemplo da aula: ('skin aging') AND ('aesthetic treatment') AND (adults).",
    dicaRapida: "AND = Afina/restringe; OR = Abre/amplia sinônimos; NOT = Nega/exclui.",
  },
  {
    id: "fc-a13-6",
    aula: "aula13",
    topic: "5 Pilares & Causa de Rejeição",
    front: "Quais são os 5 pilares na escolha do periódico e qual é a PRINCIPAL causa de rejeição?",
    back: "5 Pilares: (1) Objetivo, (2) Escopo, (3) Qualidade, (4) Integridade, (5) Custos (APC) e Tempo. A principal causa de rejeição é o desalinhamento de escopo (tema, palavras-chave ou público não combinam com a revista).",
    dicaRapida: "Antes de pensar em Fator de Impacto, cheque o Escopo!",
  },
  {
    id: "fc-a13-7",
    aula: "aula13",
    topic: "Métricas & Revista Predatória",
    front: "O que significa Q1, Índice H e qual a Regra de Ouro contra revistas predatórias?",
    back: "Q1: quartil dos 25% periódicos mais citados (elite da área). Índice H: cruza volume de publicações com citações recebidas. Alertas predatórios: aceitação em poucos dias, escopo 'aceita tudo', e-mails agressivos e métricas inventadas. Regra de ouro: 'Pesquisadores da sua área leem este periódico? Se não leem, evite submeter.'",
    dicaRapida: "Indexação funciona como a 'vitrine' (SciELO, PubMed, Scopus, WoS).",
  },
  {
    id: "fc-a13-8",
    aula: "aula13",
    topic: "Engenharia Reversa, Planos A/B/C & Checklist",
    front: "Como funciona o Fluxo de 4 Filtros e o Checklist Anti-Retrabalho antes de escrever?",
    back: "4 Filtros: (1) Engenharia Reversa (buscar 20–30 artigos semelhantes em inglês e rastrear revistas) → (2) Alinhamento de Escopo → (3) Qualidade e Integridade → (4) Viabilidade (custo, tempo, idioma) → gera Plano A (Q1), Plano B (nacional indexada) e Plano C (regional/anais). Checklist prévio: limite de palavras, estilo de referências (Vancouver, APA ou ABNT), máx. de autores e limite de figuras/tabelas.",
    dicaRapida: "Síntese final: 'A publicação não é o fim da pesquisa, é o início do impacto.'",
  },
  // Aula 14 (8 cards)
  {
    id: "fc-a14-1",
    aula: "aula14",
    topic: "Blocos Constitutivos",
    front: "Quais são os 3 grupos sequenciais do projeto e os 8 capítulos dos Elementos Textuais?",
    back: "Pré-textuais: Capa, Folha de rosto, Folha de aprovação, Resumo, Sumário. Textuais: 1 INTRODUÇÃO, 2 REFERENCIAL TEÓRICO, 3 MÉTODO, 4 RESULTADOS ESPERADOS, 5 PRODUÇÃO ESPERADA, 6 CRONOGRAMA DE EXECUÇÃO EM MESES CORRIDOS, 7 ORÇAMENTO, 8 INFRAESTRUTURA. Pós-textuais: DECLARAÇÃO DE USO DE IA, REFERÊNCIAS, APÊNDICES, ANEXOS.",
    dicaRapida: "Atenção ao nome completo do item 6: 'CRONOGRAMA DE EXECUÇÃO EM MESES CORRIDOS'.",
  },
  {
    id: "fc-a14-2",
    aula: "aula14",
    topic: "Espaçamento Entrelinhas",
    front: "Qual o espaçamento padrão do projeto e quais são as 3 exceções de espaço simples (1,0)?",
    back: "Padrão: 1,5 entre as linhas no corpo do texto. Exceções com espaço simples (1,0): (1) citações diretas longas, (2) resumo e (3) lista de REFERÊNCIAS — sendo dois espaços simples entre cada documento nas referências.",
    dicaRapida: "Não esqueça o detalhe das REFERÊNCIAS: 1,0 dentro de cada referência e 2 espaços simples entre uma e outra!",
  },
  {
    id: "fc-a14-3",
    aula: "aula14",
    topic: "Fontes e Tamanhos",
    front: "Quais fontes são aceitas no projeto e quais os tamanhos de letra (regra geral + exceções)?",
    back: "Fontes: Arial, Times New Roman ou Calibre (manter uniformidade em todo o documento). Tamanhos: 12 em todo o texto. Exceções: 18 (em negrito) para o título do projeto; 14 para nomes dos autores; 10 para citação direta longa e resumo.",
    dicaRapida: "Escadinha fácil: 18 (título negrito) → 14 (autores) → 12 (texto geral) → 10 (citação longa e resumo).",
  },
  {
    id: "fc-a14-4",
    aula: "aula14",
    topic: "Margens da Página",
    front: "Quais são as margens exigidas nas páginas textuais do projeto de pesquisa?",
    back: "3 cm na esquerda e superior; 2 cm na direita e inferior.",
    dicaRapida: "Regra clássica 3–3–2–2: 3 cm em cima e na esquerda (encadernação), 2 cm embaixo e na direita.",
  },
  {
    id: "fc-a14-5",
    aula: "aula14",
    topic: "Hierarquia: Primária e Secundária",
    front: "Como formatar Seção Primária e Seção Secundária nos títulos do projeto?",
    back: "Seção primária: Negrito, MAIÚSCULAS (ex.: 3 MÉTODO). Seção secundária: Negrito, minúsculas (ex.: 3.1 Desenho, 3.2 População).",
    dicaRapida: "Ambas têm negrito! Só muda CAIXA ALTA (primária) para minúsculas (secundária).",
  },
  {
    id: "fc-a14-6",
    aula: "aula14",
    topic: "Hierarquia: Terciária e Quaternária",
    front: "Como formatar Seção Terciária e Seção Quaternária? Dê os exemplos da aula!",
    back: "Seção terciária: Minúsculas, sem negrito (ex.: 3.2.1 Número de indivíduos abordados (amostra do estudo); 3.2.2 Variáveis do estudo). Seção quaternária: Itálico (ex.: 3.2.2.1 Dependentes, 3.2.2.2 Independentes, 3.2.2.3 Controle).",
    dicaRapida: "Do nível 1 ao 4, o peso visual cai: NEGRITO MAIÚSCULO → Negrito minúsculo → minúsculo normal → Itálico.",
  },
  {
    id: "fc-a14-7",
    aula: "aula14",
    topic: "Declaração de IA: Posição e Conteúdo",
    front: "Onde fica a Declaração de Uso de IA no projeto e o que é obrigatório informar nela?",
    back: "Posição: nos elementos pós-textuais, posicionada IMEDIATAMENTE ANTES das REFERÊNCIAS. Conteúdo obrigatório: explicitar o nome da(s) ferramenta(s) de IA utilizada(s) e a(s) etapa(s) ou finalidade(s) correspondente(s).",
    dicaRapida: "Nunca coloque depois das referências nem nos apêndices! Vem logo após 8 INFRAESTRUTURA e antes de REFERÊNCIAS.",
  },
  {
    id: "fc-a14-8",
    aula: "aula14",
    topic: "Modelo de Declaração de IA",
    front: "No modelo da aula, para quais etapas foram citados ChatGPT, Semantic Scholar/SciSpace e Claude?",
    back: "ChatGPT: Resumo (português), Introdução (pergunta e objetivos) e Apêndices (protocolo de coleta). Semantic Scholar e SciSpace: Pesquisa bibliográfica (Introdução, Referencial teórico e Método — busca por citações). Claude: Método (definição das variáveis dependente, independente e controle).",
    dicaRapida: "Claude → variáveis do Método; Semantic Scholar/SciSpace → busca bibliográfica; ChatGPT → Resumo, Introdução e Apêndices.",
  },
];

// =============================================================================
// 16 EXAM-STYLE QUIZ QUESTIONS (8 AULA 13 + 8 AULA 14)
// =============================================================================

export const QUIZ_QUESTIONS: QuizQuestionItem[] = [
  // Aula 13 (8 questions)
  {
    id: "qz-a13-1",
    aula: "aula13",
    question:
      "Segundo a Pirâmide da Hierarquia das Evidências da Aula 13, qual sequência representa corretamente os níveis do Nível 8 (topo) até o Nível 5?",
    options: [
      "Revisões Sistemáticas → Meta-análises → Ensaios Clínicos → Coorte",
      "Meta-análises → Revisões Sistemáticas → Ensaios Clínicos → Estudos de Coorte",
      "Meta-análises → Ensaios Clínicos → Revisões Sistemáticas → Caso-Controle",
      "Ensaios Clínicos → Meta-análises → Estudos de Coorte → Estudos Transversais",
    ],
    correctIndex: 1,
    explanation:
      "Na pirâmide de 8 níveis da Aula 13: Nível 8 (Topo) = Meta-análises; Nível 7 = Revisões Sistemáticas; Nível 6 = Ensaios Clínicos; Nível 5 = Estudos de Coorte (seguidos por Caso-Controle no 4, Transversais no 3, Relato de Caso no 2 e Opiniões de Especialistas no 1).",
  },
  {
    id: "qz-a13-2",
    aula: "aula13",
    question:
      "Qual tipo de publicação reúne teses, dissertações, relatórios técnicos, anais de congressos e livros acadêmicos produzidos fora dos periódicos tradicionais?",
    options: [
      "Revisão Integrativa",
      "Relato de Caso",
      "Literatura Cinzenta",
      "Artigo Original",
    ],
    correctIndex: 2,
    explanation:
      "Literatura Cinzenta engloba teses, dissertações, relatórios técnicos, anais de congressos e livros acadêmicos — evidências produzidas fora dos periódicos científicos tradicionais.",
  },
  {
    id: "qz-a13-3",
    aula: "aula13",
    question:
      "Um pesquisador quer encontrar estudos latino-americanos da área da saúde e também teses/dissertações brasileiras. Quais bases da Aula 13 correspondem respectivamente a essas duas necessidades?",
    options: [
      "PubMed e Web of Science",
      "BVS e BDTD",
      "Scopus e PubMed",
      "Google Acadêmico e Scopus",
    ],
    correctIndex: 1,
    explanation:
      "A BVS (Biblioteca Virtual em Saúde) tem recorte Regional · Saúde com foco na produção latino-americana, enquanto a BDTD reúne teses e dissertações brasileiras (junto ao SciELO no recorte Regional · Multidisciplinar).",
  },
  {
    id: "qz-a13-4",
    aula: "aula13",
    question:
      "Na construção de uma busca estruturada como ('skin aging') AND ('aesthetic treatment') AND (adults), qual é a função das aspas e do operador OR?",
    options: [
      "Aspas ampliam sinônimos e OR exclui termos indesejados.",
      "Aspas exigem ambos os termos e OR restringe a busca.",
      "Aspas recuperam exatamente a expressão composta na ordem digitada e OR aceita um termo ou outro (amplia a busca para sinônimos).",
      "Aspas traduzem automaticamente para o inglês e OR exclui duplicatas.",
    ],
    correctIndex: 2,
    explanation:
      "Na Aula 13: AND restringe (exige ambos), OR amplia (aceita um termo ou outro, útil para sinônimos), NOT exclui um termo indesejado e Aspas (\"\" ou '') recuperam exatamente a expressão composta na ordem digitada.",
  },
  {
    id: "qz-a13-5",
    aula: "aula13",
    question:
      "Entre os 5 pilares para selecionar um periódico ('Onde vamos publicar?'), qual fator é apontado na aula como a PRINCIPAL causa de rejeição de manuscritos?",
    options: [
      "Desalinhamento de escopo",
      "Número insuficiente de citações no Índice H",
      "Uso de referências no estilo Vancouver",
      "Falta de gráficos coloridos no artigo",
    ],
    correctIndex: 0,
    explanation:
      "Nos 5 pilares (Objetivo, Escopo, Qualidade, Integridade, Custos e Tempo), a aula destaca explicitamente que verificar tema, palavras-chave e público é crucial porque o desalinhamento de escopo é a principal causa de rejeição.",
  },
  {
    id: "qz-a13-6",
    aula: "aula13",
    question:
      "Sobre as métricas bibliométricas e a 'vitrine' dos periódicos, assinale a afirmação correta:",
    options: [
      "O quartil Q4 representa os 25% periódicos mais citados da área.",
      "O Índice H mede exclusivamente o prazo de avaliação entre submissão e aceite.",
      "Indexação é a 'vitrine' do periódico, e o quartil Q1 representa os 25% mais citados (a elite da área).",
      "Fator de Impacto e CiteScore servem para excluir revistas indexadas no PubMed.",
    ],
    correctIndex: 2,
    explanation:
      "Indexação (SciELO, PubMed, Scopus, WoS) é a 'vitrine' do periódico; Fator de Impacto e CiteScore medem a média de citações; Q1 reúne os 25% mais citados (elite da área); e o Índice H cruza volume de publicações com citações recebidas.",
  },
  {
    id: "qz-a13-7",
    aula: "aula13",
    question:
      "Qual conjunto reúne EXCLUSIVAMENTE alertas vermelhos (revista predatória) e a regra de ouro ensinada em aula?",
    options: [
      "Revisão por pares transparente e DOI regular; regra: submeter sempre ao Q1.",
      "Aceitação em poucos dias, escopo que 'aceita tudo', e-mails agressivos e métricas inventadas; regra: 'Pesquisadores da sua área leem este periódico? Se não leem, evite submeter.'",
      "Cobrança de APC em periódico indexado no SciELO; regra: evitar periódicos em acesso aberto.",
      "Exigência de inglês e revisão rigorosa; regra: escolher o periódico de menor tempo.",
    ],
    correctIndex: 1,
    explanation:
      "Os 4 alertas vermelhos são: promessa de aceitação/publicação em poucos dias, escopo genérico que 'aceita tudo', e-mails agressivos cobrando submissões e métricas estranhas/inventadas. A regra de ouro é: 'Pesquisadores da sua área leem este periódico? Se não leem, evite submeter.'",
  },
  {
    id: "qz-a13-8",
    aula: "aula13",
    question:
      "Na Estratégia Prática de Submissão, qual a ordem correta do Fluxo de 4 Filtros e o que deve ser conferido ANTES de escrever no Checklist Anti-Retrabalho?",
    options: [
      "Engenharia Reversa → Alinhamento de Escopo → Qualidade e Integridade → Viabilidade; conferir limite de palavras, estilo de referências (Vancouver, APA ou ABNT), nº máximo de autores e limite de figuras/tabelas.",
      "Viabilidade → Qualidade → Escopo → Engenharia Reversa; conferir apenas o valor da taxa APC.",
      "Plano C → Plano B → Plano A; conferir somente se a revista usa Times New Roman 12.",
      "Alinhamento de Escopo → Busca de 5 artigos → Pagamento de APC → Tradução; conferir apenas o título.",
    ],
    correctIndex: 0,
    explanation:
      "O fluxo sequencial é: Filtro 1 (Engenharia Reversa) → Filtro 2 (Alinhamento de Escopo) → Filtro 3 (Qualidade e Integridade) → Filtro 4 (Viabilidade: custo, tempo, idioma), gerando Planos A, B e C. Antes de escrever, confere-se nas Instruções aos Autores: limite de palavras, estilo de referências (Vancouver, APA ou ABNT), nº máximo de autores e limite de figuras/tabelas.",
  },
  // Aula 14 (8 questions)
  {
    id: "qz-a14-1",
    aula: "aula14",
    question:
      "Nos Elementos Constitutivos do Projeto de Pesquisa (Aula 14), qual é a sequência correta dos itens Textuais numerados de 1 a 8?",
    options: [
      "1 Introdução, 2 Método, 3 Referencial Teórico, 4 Orçamento, 5 Cronograma, 6 Infraestrutura, 7 Resultados, 8 Produção",
      "1 INTRODUÇÃO, 2 REFERENCIAL TEÓRICO, 3 MÉTODO, 4 RESULTADOS ESPERADOS, 5 PRODUÇÃO ESPERADA, 6 CRONOGRAMA DE EXECUÇÃO EM MESES CORRIDOS, 7 ORÇAMENTO, 8 INFRAESTRUTURA",
      "1 INTRODUÇÃO, 2 OBJETIVOS, 3 REFERENCIAL TEÓRICO, 4 MÉTODO, 5 CRONOGRAMA, 6 ORÇAMENTO, 7 DECLARAÇÃO DE IA, 8 REFERÊNCIAS",
      "1 Capa, 2 Resumo, 3 Introdução, 4 Método, 5 Resultados Esperados, 6 Cronograma, 7 Orçamento, 8 Anexos",
    ],
    correctIndex: 1,
    explanation:
      "Os 8 elementos textuais exatos da Aula 14 são: 1 INTRODUÇÃO, 2 REFERENCIAL TEÓRICO, 3 MÉTODO, 4 RESULTADOS ESPERADOS, 5 PRODUÇÃO ESPERADA, 6 CRONOGRAMA DE EXECUÇÃO EM MESES CORRIDOS, 7 ORÇAMENTO e 8 INFRAESTRUTURA.",
  },
  {
    id: "qz-a14-2",
    aula: "aula14",
    question:
      "Quanto às margens e ao tipo de letra do projeto de pesquisa segundo a Aula 14, assinale a alternativa exata:",
    options: [
      "Margens de 2,5 cm nos quatro lados; fontes Arial, Verdana ou Georgia.",
      "Margens de 3 cm (direita e inferior) e 2 cm (esquerda e superior); apenas Times New Roman.",
      "Margens de 3 cm (esquerda e superior) e 2 cm (direita e inferior); fonte Arial, Times New Roman ou Calibre com uniformidade em todo o documento.",
      "Margens de 4 cm (esquerda) e 2 cm (demais lados); livre escolha de fontes por capítulo.",
    ],
    correctIndex: 2,
    explanation:
      "Na Aula 14, as margens são 3 cm (esquerda e superior) e 2 cm (direita e inferior) em todas as páginas textuais, e a fonte deve ser Arial, Times New Roman ou Calibre, mantendo uniformidade tipográfica.",
  },
  {
    id: "qz-a14-3",
    aula: "aula14",
    question:
      "Sobre os tamanhos de fonte na formatação do projeto (Aula 14), qual associação está totalmente correta?",
    options: [
      "12 texto geral; 18 (negrito) título do projeto; 14 nomes dos autores; 10 citação direta longa e resumo.",
      "12 texto geral; 16 título do projeto; 12 nomes dos autores; 11 resumo.",
      "14 texto geral; 18 título do projeto; 12 autores; 10 apenas para referências.",
      "12 texto geral; 20 título do projeto; 14 autores; 9 citação direta longa.",
    ],
    correctIndex: 0,
    explanation:
      "Regra geral: tamanho 12 em todo o texto. Exceções exatas da Aula 14: 18 (em negrito) para o título do projeto; 14 para nomes dos autores; 10 para citação direta longa e resumo.",
  },
  {
    id: "qz-a14-4",
    aula: "aula14",
    question:
      "Como deve ser configurado o espaçamento entrelinhas no corpo do texto e na lista de REFERÊNCIAS?",
    options: [
      "2,0 no corpo do texto e 1,5 nas REFERÊNCIAS.",
      "1,5 entre as linhas no corpo do texto; espaço simples (1,0) nas citações diretas longas, no resumo e na lista de REFERÊNCIAS (com dois espaços simples entre cada documento).",
      "1,0 em todo o documento, exceto 1,5 apenas no resumo.",
      "1,5 no corpo do texto e 1,5 entre cada documento das REFERÊNCIAS.",
    ],
    correctIndex: 1,
    explanation:
      "Regra da Aula 14: espaçamento 1,5 no corpo do texto; espaço simples (1,0) nas citações diretas longas, no resumo e na lista de REFERÊNCIAS (com dois espaços simples entre cada documento).",
  },
  {
    id: "qz-a14-5",
    aula: "aula14",
    question:
      "Na hierarquia dos títulos das seções, qual título está formatado CORRETAMENTE como Seção Terciária e qual como Seção Quaternária?",
    options: [
      "Terciária: Negrito maiúsculas (3.2.1 AMOSTRA); Quaternária: Negrito minúsculas (3.2.2.1 Dependentes).",
      "Terciária: Itálico (3.2.1 Amostra); Quaternária: Minúsculas sem negrito (3.2.2.1 Dependentes).",
      "Terciária: Minúsculas sem negrito (ex.: 3.2.2 Variáveis do estudo); Quaternária: Itálico (ex.: 3.2.2.1 Dependentes).",
      "Terciária: Sublinhado; Quaternária: MAIÚSCULAS sem negrito.",
    ],
    correctIndex: 2,
    explanation:
      "Hierarquia da Aula 14: Primária = Negrito, maiúsculas (3 MÉTODO); Secundária = Negrito, minúsculas (3.1 Desenho); Terciária = Minúsculas sem negrito (3.2.2 Variáveis do estudo); Quaternária = Itálico (3.2.2.1 Dependentes, 3.2.2.2 Independentes, 3.2.2.3 Controle).",
  },
  {
    id: "qz-a14-6",
    aula: "aula14",
    question:
      "Em qual posição exata do projeto de pesquisa deve constar o capítulo DECLARAÇÃO DE USO DE INTELIGÊNCIA ARTIFICIAL?",
    options: [
      "Nos elementos pré-textuais, logo após a Folha de aprovação.",
      "Dentro do capítulo 3 MÉTODO, como seção terciária.",
      "Nos elementos pós-textuais, posicionado imediatamente antes das REFERÊNCIAS.",
      "Nos elementos pós-textuais, obrigatoriamente após os ANEXOS.",
    ],
    correctIndex: 2,
    explanation:
      "A Aula 14 estabelece que, quando ferramentas de IA forem utilizadas, a DECLARAÇÃO DE USO DE INTELIGÊNCIA ARTIFICIAL vai nos elementos pós-textuais, posicionada imediatamente antes das REFERÊNCIAS.",
  },
  {
    id: "qz-a14-7",
    aula: "aula14",
    question:
      "Quais informações são obrigatórias no texto da Declaração de Uso de IA segundo a Aula 14?",
    options: [
      "Apenas uma frase genérica dizendo que IA foi usada, sem citar nomes de plataformas.",
      "Explicitar o nome da(s) ferramenta(s) de IA utilizada(s) e a(s) etapa(s) ou finalidade(s) correspondente(s) no desenvolvimento do projeto.",
      "Somente o comprovante de pagamento da assinatura e a versão do navegador.",
      "Apenas os prompts em inglês, sem precisar indicar a seção do projeto.",
    ],
    correctIndex: 1,
    explanation:
      "Conforme a Aula 14, o texto da declaração deve informar explicitamente o nome da(s) ferramenta(s) de IA utilizada(s) e a(s) etapa(s) ou finalidade(s) correspondente(s) no desenvolvimento do projeto.",
  },
  {
    id: "qz-a14-8",
    aula: "aula14",
    question:
      "No modelo de declaração apresentado em aula, qual ferramenta foi associada especificamente a 'Método — sugestões para definição das variáveis da pesquisa (dependente, independente e controle)'?",
    options: [
      "Semantic Scholar",
      "ChatGPT",
      "SciSpace",
      "Claude",
    ],
    correctIndex: 3,
    explanation:
      "No modelo da Aula 14: ChatGPT (Resumo, Introdução — pergunta/objetivos, Apêndices); Semantic Scholar e SciSpace (Pesquisa bibliográfica — Introdução, Referencial teórico e Método a partir de citações); Claude (Método — definição das variáveis dependente, independente e controle).",
  },
];

// =============================================================================
// 8 MIMO / EASTER-EGG MESSAGES (PT-BR)
// =============================================================================

export const MIMO_MESSAGES: MimoMessageItem[] = [
  {
    id: "mimo-1",
    text: "Você vai amassar essa prova de DPC! Respira fundo, toma uma aguinha e segue firme — eu tô morrendo de orgulho de você 💚",
    mascot: "bunny",
    badge: "Recadinho do Dr. Coelhinho",
  },
  {
    id: "mimo-2",
    text: "Se até uma Meta-análise precisa juntar vários estudos aos poucos, você também pode conquistar essa matéria um bloquinho por vez! ✨",
    mascot: "cat",
    badge: "Mimo do Gatinho Pesquisador",
  },
  {
    id: "mimo-3",
    text: "Alerta Verde na área: futura médica da FMC com nível Q1 de dedicação! Não esquece de alongar os ombros e beber água 💕",
    mascot: "bear",
    badge: "Carinho da Dra. Ursinha",
  },
  {
    id: "mimo-4",
    text: "Margens 3 cm na esquerda e superior, 2 cm na direita e inferior — e 100% de torcida por você aqui do lado de cá! 🩺",
    mascot: "puppy",
    badge: "Abraço do Cachorrinho Interno",
  },
  {
    id: "mimo-5",
    text: "Desalinhamento de escopo reprova artigo, mas você e essa vaga na prova tão com 100% de alinhamento! Bora revisar mais um card? 🌸",
    mascot: "bunny",
    badge: "Torcida Máxima",
  },
  {
    id: "mimo-6",
    text: "Pausa obrigatória do plantão de estudos: solta o maxilar, respira por 4 segundinhos e lembra que você é brilhante demais!",
    mascot: "bear",
    badge: "Respiro Aconchegante",
  },
  {
    id: "mimo-7",
    text: "Se bater dúvida entre AND e OR, lembra que você AND sua inteligência juntas restringem qualquer chance de erro nessa prova! 💚",
    mascot: "cat",
    badge: "Dica Carinhosa",
  },
  {
    id: "mimo-8",
    text: "Lembrete fofinho: a declaração de IA vem antes das REFERÊNCIAS, e o meu orgulho por você vem antes de tudo! Vai com tudo, doutora! 🏆",
    mascot: "puppy",
    badge: "Mimo Especial FMC",
  },
];
