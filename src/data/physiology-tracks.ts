export type TrackId = "gi" | "renal" | "endocrino";

export interface KeyConcept {
  readonly title: string;
  readonly summary: string;
  readonly details: readonly string[];
  readonly referenceBadge?: string;
}

export interface YoutubeLink {
  readonly label: string;
  readonly url: string;
}

export interface PhysiologyTopic {
  readonly id: string;
  readonly trackId: TrackId;
  readonly order: number;
  readonly dayPlan: 1 | 2;
  readonly title: string;
  readonly estimatedMinutes: number;
  readonly shortSummary: string;
  readonly keyConcepts: readonly KeyConcept[];
  readonly examTraps: readonly string[];
  readonly memoryAnchor: string;
  readonly youtubePrimary: YoutubeLink;
  readonly youtubeSecondary: YoutubeLink;
}

export interface PhysiologyTrackMeta {
  readonly id: TrackId;
  readonly name: string;
  readonly shortName: string;
  readonly subtitle: string;
  readonly dayLabel: string;
  readonly topicCount: number;
  readonly mascot: "coelhinho" | "ursinha" | "gatinha";
  readonly accentName: "mint" | "sky" | "berry";
}

const ytSearch = (query: string): string =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

export const PHYSIOLOGY_TRACKS: readonly PhysiologyTrackMeta[] = [
  {
    id: "gi",
    name: "Trilha 1 · Fisiologia Gastrointestinal",
    shortName: "Gastrointestinal",
    subtitle: "Secreções, motilidade, reflexos entéricos, absorção e vias biliares",
    dayLabel: "Dia 1 · Manhã/Tarde",
    topicCount: 5,
    mascot: "coelhinho",
    accentName: "mint",
  },
  {
    id: "renal",
    name: "Trilha 2 · Fisiologia Renal & Ácido-Base",
    shortName: "Renal & Ácido-Base",
    subtitle: "Filtração glomerular, contracorrente, micção, Winter e Ânion Gap",
    dayLabel: "Dia 1 · Noite",
    topicCount: 3,
    mascot: "ursinha",
    accentName: "sky",
  },
  {
    id: "endocrino",
    name: "Trilha 3 · Fisiologia Endócrina / Hormonal",
    shortName: "Endócrino",
    subtitle: "Hipotálamo-hipófise, tireoide, cálcio, pâncreas, adrenal, sexo e gestação",
    dayLabel: "Dia 2 · Sprint Final",
    topicCount: 6,
    mascot: "gatinha",
    accentName: "berry",
  },
];

export const PHYSIOLOGY_TOPICS: readonly PhysiologyTopic[] = [
  {
    id: "gi-01-secrecoes",
    trackId: "gi",
    order: 1,
    dayPlan: 1,
    title: "Secreção Salivar, Gástrica e Pancreática",
    estimatedMinutes: 20,
    shortSummary:
      "Modificação ductal da saliva, células da glândula oxíntica, fases da secreção gástrica e controle por secretina e CCK no pâncreas exócrino.",
    keyConcepts: [
      {
        title: "Saliva: Ácino Isotônico → Ducto Hipotônico",
        summary:
          "Os ácinos produzem secreção primária isotônica com ptialina (alfa-amilase salivar) e mucina; os ductos estriados modificam os íons.",
        details: [
          "Reabsorção ativa de Na+ e Cl− maior que a secreção de K+ e HCO3− (ductos relativamente impermeáveis à água).",
          "Em alto fluxo salivar há menos tempo para reabsorção ductal → saliva menos hipotônica e mais rica em Na+, Cl− e HCO3−.",
          "Parassimpático (NC VII e IX) gera saliva abundante e aquosa; Simpático gera menor volume, mais espessa e rica em muco.",
        ],
        referenceBadge: "pH salivar 6,0–7,4 | Aldosterona ↑ K+ e reabsorve Na+",
      },
      {
        title: "Células Gástricas e Secreção de HCl",
        summary:
          "Cada célula da mucosa gástrica cumpre papel específico na digestão proteica e na proteção da mucosa.",
        details: [
          "Células Parietais (oxínticas): secretam HCl (bomba H+/K+-ATPase apical) e Fator Intrínseco (única secreção gástrica indispensável à vida, para absorver B12).",
          "Células Principais (pépticas): secretam Pepsinogênio (ativado em pepsina quando pH < 3,0).",
          "Células G (antro): Gastrina; Células ECL: Histamina (via receptor H2, maior potencializador de HCl); Células D: Somatostatina (inibe G, ECL e parietais).",
        ],
        referenceBadge: "3 estímulos parietais: ACh (M3), Gastrina (CCK-B), Histamina (H2)",
      },
      {
        title: "Fases da Secreção Gástrica",
        summary:
          "Integração neuro-hormonal antes, durante e após a chegada do alimento ao estômago.",
        details: [
          "Fase Cefálica (~20–30%): visão, cheiro e paladar ativam o nervo vago (ACh + GRP nas células G).",
          "Fase Gástrica (~60–70%): distensão (reflexos vagovagais e locais) e peptídeos/aminoácidos estimulam gastrina e HCl.",
          "Fase Intestinal (~10%): inicialmente estimula (gastrina duodenal), depois predomina inibição via reflexo enterogástrico, secretina, CCK e GIP quando há ácido/gordura no duodeno.",
        ],
      },
      {
        title: "Pâncreas Exócrino: Ácinos vs. Ductos",
        summary:
          "Secreção enzimática acinar regulada por CCK e secreção alcalina ductal regulada por secretina.",
        details: [
          "Secretina (células S do duodeno, estímulo = pH < 4,5): estimula células ductais (via AMPc/CFTR + trocador Cl−/HCO3−) a secretar fluido rico em HCO3−.",
          "Colecistocinina — CCK (células I, estímulo = ácidos graxos e aminoácidos): estimula ácinos pancreáticos (via IP3/Ca2+) a liberar enzimas.",
          "Enteroquinase (enteropeptidase da borda em escova) cliva Tripsinogênio em Tripsina; a tripsina ativa quimiotripsinogênio, procarboxipeptidase e proelastase.",
        ],
        referenceBadge: "Inibidor da tripsina protege o pâncreas contra autodigestão",
      },
    ],
    examTraps: [
      "Na fibrose cística (mutação CFTR), o pâncreas não secreta Cl−/HCO3− ductal adequadamente → tampão alcalino falha e enzimas obstruem os ductos.",
      "Omeprazol bloqueia diretamente a bomba H+/K+-ATPase (via final comum); bloqueador H2 (famotidina) bloqueia apenas o estímulo da histamina.",
      "Em jejum ou baixo fluxo, a saliva fica MAIS hipotônica (não isotônica); em alto fluxo ela se aproxima da isotonicidade do plasma.",
    ],
    memoryAnchor:
      "Secretina = 'S' de Suco bicarbonatado (células S, ácido no duodeno); CCK = 'C' de Comida gordurosa/proteica → Contrái vesícula + Carrega enzimas acinares.",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia secrecao salivar gastrica pancreatica"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa secrecao gastrica pancreatica"),
    },
  },
  {
    id: "gi-02-degluticao-motilidade",
    trackId: "gi",
    order: 2,
    dayPlan: 1,
    title: "Deglutição e Motilidade Gastrointestinal",
    estimatedMinutes: 18,
    shortSummary:
      "Fases da deglutição, controle dos esfíncteres esofágicos, marca-passo de Cajal, complexo motor migratório e padrões motores do intestino.",
    keyConcepts: [
      {
        title: "Fases da Deglutição e Esfíncteres Esofágicos",
        summary:
          "Coordenação entre comando voluntário inicial e reflexo bulbar involuntário de proteção das vias aéreas.",
        details: [
          "Fase Oral (voluntária): língua empurra o bolo contra o palato mole rumo à orofaringe.",
          "Fase Faríngea (involuntária, centro da deglutição no bulbo/ponte): elevação do palato mole, fechamento da epiglote/glote, apneia reflexa e relaxamento do EES.",
          "Fase Esofágica: peristaltismo primário (continuado da faringe) e secundário (distensão local esofágica). Relaxamento do EEI mediado por NO e VIP (vago).",
        ],
        referenceBadge: "Acalasia = perda de neurônios inibitórios NO/VIP do EEI",
      },
      {
        title: "Células Intersticiais de Cajal e Ondas Lentas",
        summary:
          "O ritmo elétrico básico (REB) dita a frequência máxima das contrações musculares lisas.",
        details: [
          "Ondas lentas são oscilações espontâneas do potencial de repouso (−60 a −40 mV) geradas pelas células intersticiais de Cajal (marca-passo).",
          "Ondas lentas NÃO causam contração sozinhas (exceto no estômago em parte), mas aproximam a membrana do limiar para potenciais em espiga.",
          "Potenciais em espiga dependem de canais de Ca2+-Na+ lentos (influxo de Ca2+ desencadeia contração). ACh/distensão despolarizam; Noradrenalina hiperpolariza.",
        ],
        referenceBadge: "Estômago 3/min | Duodeno 12/min | Íleo 8–9/min",
      },
      {
        title: "Complexo Motor Migratório (MMC) e Jejum",
        summary:
          "Vassoura fisiológica que varre resíduos e bactérias entre as refeições.",
        details: [
          "Ocorre a cada ~90 minutos durante o jejum, propagando-se do estômago ao íleo terminal.",
          "Comandado pelo hormônio Motilina (liberado por células Mo duodenais) e pelo sistema nervoso entérico.",
          "A alimentação interrompe imediatamente o MMC e inicia o padrão pós-prandial (segmentação e peristalse propulsiva).",
        ],
      },
      {
        title: "Segmentação, Peristalse e Motilidade Colônica",
        summary:
          "Mistura otimizada para absorção no delgado e armazenamento/propulsão em massa no cólon.",
        details: [
          "Segmentação (delgado): contrações concêntricas alternadas que misturam o quimo às enzimas e à mucosa sem grande avanço líquido.",
          "Peristalse (Lei do Intestino): contração proximal (ACh/Substância P) + relaxamento receptivo distal (NO/VIP).",
          "Cólon: haustrações lentas para reabsorção de água/eletrólitos e Movimentos de Massa (1–3x/dia, intensificados após refeições pelo reflexo gastrocólico).",
        ],
      },
    ],
    examTraps: [
      "Ondas lentas isoladas NÃO dependem de estímulo nervoso — são geradas pelas células de Cajal; os nervos e hormônios modulam a amplitude e o disparo de potenciais em espiga.",
      "Na peristalse, o relaxamento à frente do bolo é ATIVO (neurônios entéricos liberam NO e VIP), e não simples ausência de contração.",
      "No intestino delgado em estado alimentado predomina a segmentação (mistura), e não peristalse rápida.",
    ],
    memoryAnchor:
      "Cajal marca o compasso (3 no estômago, 12 no duodeno); Motilina é a 'faxineira do jejum' (MMC); ACh aperta atrás, NO/VIP abre na frente.",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia degluticao motilidade gastrointestinal"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa motilidade gastrointestinal"),
    },
  },
  {
    id: "gi-03-reflexos-gi",
    trackId: "gi",
    order: 3,
    dayPlan: 1,
    title: "Reflexos Gastrintestinais",
    estimatedMinutes: 16,
    shortSummary:
      "Organização do Sistema Nervoso Entérico (Auerbach vs. Meissner), reflexos curtos e longos e os cinco grandes reflexos integrados do TGI.",
    keyConcepts: [
      {
        title: "Sistema Nervoso Entérico: O 'Cérebro do Intestino'",
        summary:
          "Dois plexos intramurais capazes de operar reflexos completos mesmo sem conexões extrínsecas.",
        details: [
          "Plexo Mioentérico (de Auerbach): localizado entre as camadas musculares longitudinal e circular; controla principalmente MOTILIDADE (tônus, velocidade e intensidade das contrações).",
          "Plexo Submucoso (de Meissner): localizado na submucosa; controla principalmente SECREÇÃO epitelial, absorção e fluxo sanguíneo local.",
          "Inervação extrínseca modula: Parassimpático (Vago até cólon transverso proximal; Pélvicos S2–S4 no restante) estimula; Simpático (T5–L2, noradrenalina) inibe motilidade/secreção e contrai esfíncteres.",
        ],
        referenceBadge: "Auerbach = Ação motora | Meissner = Muco/secreção",
      },
      {
        title: "Arcos Reflexos Curtos vs. Longos",
        summary:
          "Integração em três níveis anatômicos conforme a distância do estímulo à resposta.",
        details: [
          "Reflexos Curtos (intrínsecos): inteiramente dentro da parede intestinal (quimiorreceptores/mecanorreceptores → plexo entérico → efetor).",
          "Reflexos via gânglios pré-vertebrais (celíaco, mesentérico superior e inferior): transmitem sinais inibitórios simpáticos entre segmentos distantes.",
          "Reflexos Longos (vagovagais / medulares): aferência ao tronco encefálico ou medula sacral e retorno eferente (ex.: reflexo da defecação e fase cefálica/gástrica).",
        ],
      },
      {
        title: "Principais Reflexos GI Integrados",
        summary:
          "Comunicação entre estômago, delgado e cólon para sincronizar digestão e esvaziamento.",
        details: [
          "Reflexo Enterogástrico: distensão, acidez, hiperosmolaridade ou gordura no duodeno inibem esvaziamento gástrico e secreção de HCl.",
          "Reflexo Gastrocólico: distensão/alimento no estômago estimula movimentos de massa no cólon (vontade de evacuar após comer).",
          "Reflexo Gastroileal: aumenta peristaltismo ileal e relaxa a válvula ileocecal após refeição; Reflexo Intestino-Intestinal: distensão ou irritação severa de uma alça paralisa o restante do intestino.",
        ],
      },
      {
        title: "Reflexo da Defecação",
        summary:
          "Integração entre reflexo intrínseco mioentérico, parassimpático sacral e controle somático voluntário.",
        details: [
          "Distensão retal por fezes dispara ondas peristálticas no cólon descendente/sigmoide/reto e relaxa o esfíncter anal interno (reflexo intrínseco fraco).",
          "Sinais aferentes chegam à medula sacral (S2–S4) e retornam via nervos pélvicos (parassimpático), amplificando muito o peristaltismo e o relaxamento do esfíncter interno.",
          "O esfíncter anal externo (músculo estriado) é controlado pelo nervo pudendo (somático voluntário): decide o momento social da evacuação.",
        ],
      },
    ],
    examTraps: [
      "Doença de Hirschsprung (megacólon agangliônico) ocorre por falha na migração de células da crista neural para os plexos entéricos distais — o segmento sem plexo NÃO relaxa (ausência de NO/VIP) e causa dilatação proximal.",
      "O estímulo parassimpático relaxa os esfíncteres digestivos (incluindo esfíncter anal interno) enquanto contrai a musculatura da parede; o simpático faz o oposto.",
      "Não confundir reflexo enterogástrico (duodeno → freia estômago) com gastrocólico (estômago → acelera cólon).",
    ],
    memoryAnchor:
      "Auerbach = Andar/Movimento (entre músculos); Meissner = Molhar/Secreção (submucosa). Enterogástrico freia para o duodeno dar conta; Gastrocólico avisa o cólon que entrou carga nova.",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia sistema nervoso enterico reflexos gastrointestinais"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa sistema nervoso enterico reflexos"),
    },
  },
  {
    id: "gi-04-digestao-absorcao",
    trackId: "gi",
    order: 4,
    dayPlan: 1,
    title: "Digestão e Absorção",
    estimatedMinutes: 22,
    shortSummary:
      "Transportadores apicais e basolaterais de carboidratos e proteínas, emulsificação e via linfática dos lipídios, além de ferro, água e vitamina B12.",
    keyConcepts: [
      {
        title: "Carboidratos: Enzimas e Transportadores",
        summary:
          "Somente monossacarídeos (glicose, galactose e frutose) são absorvidos pelo enterócito.",
        details: [
          "Amilase salivar e pancreática quebram amido em maltose, maltotriose e alfa-dextrinas limite.",
          "Enzimas da borda em escova (maltase, sacarase, lactase, alfa-dextrinase) liberam monossacarídeos livres.",
          "Entrada apical: Glicose e Galactose via SGLT1 (cotransporte secundário com Na+, movido pela Na+/K+-ATPase basolateral); Frutose via GLUT5 (difusão facilitada). Saída basolateral de todos via GLUT2.",
        ],
        referenceBadge: "Deficiência de lactase → diarreia osmótica e fermentação bacteriana",
      },
      {
        title: "Proteínas: Pepsina, Proteases e PepT1",
        summary:
          "Absorção eficiente tanto como aminoácidos livres quanto como di e tripeptídeos.",
        details: [
          "Estômago: Pepsina inicia hidrólise (dispensável se pâncreas íntegro). Duodeno/Jejuno: Tripsina, quimiotripsina, elastase e carboxipeptidases.",
          "Borda em escova: aminopeptidases e dipeptidases.",
          "Transporte apical: aminoácidos livres por cotransportadores Na+-dependentes; di e tripeptídeos via PepT1 (cotransporte acoplado a H+, mantido pelo trocador Na+/H+ — NHE3). Dentro da célula, peptidases citosólicas liberam aminoácidos para o sangue portal.",
        ],
      },
      {
        title: "Lipídios: Emulsificação, Micelas e Quilomícrons",
        summary:
          "Etapa hidrofóbica que exige bile, colipase pancreática e drenagem linfática via vasos quilíferos.",
        details: [
          "Emulsificação mecânica + sais biliares/lecitina aumenta a área de superfície das gotículas lipídicas.",
          "Lipase pancreática + Colipase (desloca sais biliares da interface) geram 2-monoglicerídeos e ácidos graxos livres.",
          "Micelas mistas transportam produtos até a borda em escova → difusão para o enterócito → reesterificação no REL em triglicerídeos → empacotamento com ApoB-48 em Quilomícrons → exocitose para a linfa (ducto torácico).",
        ],
        referenceBadge: "Ácidos graxos de cadeia curta/média vão direto para a veia porta!",
      },
      {
        title: "Água, Eletrólitos, Ferro e Vitamina B12",
        summary:
          "Sítios anatômicos específicos que explicam síndromes disabsortivas clássicas.",
        details: [
          "Água (~9 L/dia entre ingesta e secreções) é absorvida passivamente seguindo gradiente osmótico criado principalmente pelo Na+ (absorção paracelular e aquaporinas).",
          "Ferro: absorvido no DUODENO/jejuno proximal como Fe2+ (via DMT1 após redução pelo citocromo b duodenal, ou como ferro heme). Exportado pela ferroportina (bloqueada pela hepcidina).",
          "Cálcio: duodeno (dependente de Vitamina D / calbindina). Vitamina B12 + Fator Intrínseco: absorvida exclusivamente no ÍLEO TERMINAL (receptor cubilina).",
        ],
      },
    ],
    examTraps: [
      "Na desidratação por diarreia (ex.: cólera), a solução de reidratação oral leva GLICOSE + Na+ justamente porque o cotransportador SGLT1 permanece intacto mesmo quando há secreção maciça de Cl− via CFTR.",
      "Ressecção do íleo terminal gera anemia megaloblástica (falta de B12) E esteatorreia (falta de reabsorção dos sais biliares).",
      "Frutose entra por difusão facilitada (GLUT5) e NÃO depende de Na+; glicose e galactose competem pelo SGLT1.",
    ],
    memoryAnchor:
      "Duodeno puxa Ferro e Cálcio; Íleo terminal fecha a conta levando B12 e Sais Biliares; Gordura grande pega carona no táxi linfático (Quilomícron).",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia digestao e absorcao carboidratos proteinas lipidios"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa digestao absorcao intestinal"),
    },
  },
  {
    id: "gi-05-figado-vias-biliares",
    trackId: "gi",
    order: 5,
    dayPlan: 1,
    title: "Fígado e Vias Biliares",
    estimatedMinutes: 18,
    shortSummary:
      "Lóbulo hepático e fluxo sanguíneo, circulação entero-hepática dos sais biliares, metabolismo da bilirrubina e esvaziamento biliar.",
    keyConcepts: [
      {
        title: "Microarquitetura Hepática e Dupla Irrigação",
        summary:
          "O fígado recebe sangue venoso rico em nutrientes (porta) e sangue arterial oxigenado (artéria hepática).",
        details: [
          "~75% do fluxo vem da Veia Porta e ~25% da Artéria Hepática; ambos se misturam nos sinusoides hepáticos fenestrados rumo à veia centrolobular.",
          "Tríade Portal na periferia do lóbulo: ramo da veia porta + ramo da artéria hepática + ducto biliar (fluxo biliar corre em sentido OPOSTO ao sanguíneo).",
          "Células de Kupffer (macrófagos residentes nos sinusoides) removem bactérias e detritos provenientes do intestino; células estreladas (Ito) armazenam vitamina A.",
        ],
      },
      {
        title: "Bile e Circulação Entero-Hepática",
        summary:
          "Reciclagem altamente conservadora dos sais biliares para sustentar a digestão lipídica.",
        details: [
          "Hepatocitos sintetizam ácidos biliares primários (cólico e quenodesoxicólico) a partir do colesterol e os conjugam com glicina ou taurina (aumenta hidrossolubilidade).",
          "Composição da bile: sais biliares (~50% dos solutos orgânicos), fosfolipídios (lecitina), colesterol, bilirrubina conjugada, água e eletrólitos.",
          "~95% dos sais biliares são reabsorvidos ativamente no ÍLEO TERMINAL (ASBT) e retornam ao fígado pela veia porta, sendo reciclados 2–3x por refeição.",
        ],
        referenceBadge: "Pool total ~2,5–4 g reciclado 6–10x/dia",
      },
      {
        title: "Metabolismo da Bilirrubina",
        summary:
          "Diferenciação fisiológica entre bilirrubina indireta (lipossolúvel) e direta (hidrossolúvel).",
        details: [
          "Heme das hemácias senescentes → biliverdina → Bilirrubina Indireta (não conjugada, insolúvel em água, circula ligada à albumina, NÃO filtra no rim).",
          "No hepatócito: conjugação pela enzima UDP-glicuronil transferase com ácido glicurônico → Bilirrubina Direta (conjugada, hidrossolúvel, excretada na bile).",
          "No intestino: bactérias convertem em urobilinogênio → parte sai nas fezes como estercobilina (cor marrom), parte retorna ao fígado e pequena fração sai na urina como urobilina.",
        ],
      },
      {
        title: "Vesícula Biliar e Esfíncter de Oddi",
        summary:
          "Armazenamento concentrado em jejum e ejeção coordenada pós-prandial.",
        details: [
          "Entre refeições o esfíncter de Oddi permanece contraído; a vesícula concentra a bile até 5–20x absorvendo Na+, Cl−, HCO3− e água.",
          "Gordura/aminoácidos no duodeno liberam CCK → contração vigorosa da vesícula biliar + relaxamento simultâneo do esfíncter de Oddi.",
          "Estímulo vagal auxilia discretamente; Secretina aumenta o componente aquoso/bicarbonato dos colangiócitos ductais.",
        ],
      },
    ],
    examTraps: [
      "Na colestase (obstrução biliar), há acolia fecal (fezes esbranquiçadas por falta de estercobilina) e colúria (bilirrubina DIRETA hidrossolúvel passa para o sangue e é filtrada na urina).",
      "Na hemólise maciça, sobe a bilirrubina INDIRETA (ligada à albumina) → icterícia SEM colúria (urina não escurece por bilirrubina).",
      "Os sais biliares NÃO possuem enzimas digestivas — eles atuam apenas como detergentes anfipáticos na emulsificação e formação de micelas.",
    ],
    memoryAnchor:
      "Indireta = Insolúvel (viaja de táxi Albumina, não passa no rim). Direta = Dissolve na água (sai na bile e, se obstruir, vaza na urina = colúria).",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia figado bile bilirrubina vesicula biliar"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa figado vias biliares bilirrubina"),
    },
  },
  {
    id: "renal-01-filtracao-tubulos",
    trackId: "renal",
    order: 6,
    dayPlan: 1,
    title: "Fisiologia Renal I: Formação da urina, filtração glomerular, reabsorção e secreção tubular",
    estimatedMinutes: 24,
    shortSummary:
      "Barreira de filtração e forças de Starling, autorregulação da TFG, papel da angiotensina II, trabalho do túbulo proximal e clearance renal.",
    keyConcepts: [
      {
        title: "Barreira de Filtração e Forças de Starling",
        summary:
          "Ultrafiltração seletiva por tamanho e carga elétrica negativa gera ~180 L/dia de filtrado livre de proteínas.",
        details: [
          "3 camadas: endotélio fenestrado, membrana basal glomerular (proteoglicanos de heparan sulfato = carga negativa) e fendas de filtração dos podócitos.",
          "Fórmula: TFG = Kf × (PGC − PCB − πGC), com πCB ≈ 0. Valores típicos: PGC ~60 mmHg, PCB ~18 mmHg, πGC ~32 mmHg → PUF líquida ~10 mmHg.",
          "Vasoconstrição moderada da arteríola AFERENTE reduz PGC e TFG; vasoconstrição moderada da EFERENTE aumenta PGC e preserva/eleva TFG (mas vasoconstrição severa reduz FPR e eleva muito πGC).",
        ],
        referenceBadge: "TFG ≈ 125 mL/min (180 L/dia) | Fração de filtração ≈ 20%",
      },
      {
        title: "Autorregulação Renal e Feedback Tubuloglomerular",
        summary:
          "Mantém FPR e TFG quase constantes entre PAM de 80 e 170 mmHg.",
        details: [
          "Mecanismo Miogênico: aumento da PA estira o músculo liso da arteríola aferente → abre canais de Ca2+ mecanossensíveis → vasoconstrição reflexa.",
          "Feedback Tubuloglomerular: aumento de TFG eleva a oferta de NaCl à mácula densa (TCD inicial) → entrada via NKCC2 → liberação de ATP/adenosina → constrição da arteríola aferente.",
          "Queda na oferta de NaCl na mácula densa reduz adenosina e estimula prostaglandinas + liberação de renina pelas células justaglomerulares (SRAA).",
        ],
      },
      {
        title: "Túbulo Contorcido Proximal (TCP) e Secreção Tubular",
        summary:
          "O grande motor de reabsorção iso-osmótica em massa e depuração de xenobióticos.",
        details: [
          "Reabsorve ~65% do Na+, Cl− e água (via aquaporina-1), ~80–85% do HCO3−, 100% da glicose (SGLT2 ~90% + SGLT1 ~10%) e 100% dos aminoácidos.",
          "Transporte máximo (Tm) da glicose ≈ 375 mg/min; glicosúria aparece quando glicemia excede o limiar renal (~180–200 mg/dL).",
          "Secreção ativa no TCP de H+ (trocador NHE3), ácidos orgânicos (urato, penicilina, furosemida, PAH via OAT) e bases orgânicas (creatinina, dopamina via OCT).",
        ],
      },
      {
        title: "Clearance Renal (Depuração)",
        summary:
          "Volume virtual de plasma completamente limpo de uma substância por minuto: Cx = (Ux × V) / Px.",
        details: [
          "Inulina (padrão-ouro) ou Creatinina endógena (superestima ~10% por pequena secreção tubular): filtram livremente e não são reabsorvidas → estimam TFG (~125 mL/min).",
          "PAH (ácido para-aminohipúrico em baixa dose): filtrado + totalmente secretado no TCP → mede Fluxo Plasmático Renal Efetivo (~625 mL/min).",
          "Substâncias com Clearance < TFG sofrem reabsorção líquida (ex.: ureia, glicose = 0); Clearance > TFG indica secreção tubular líquida (ex.: PAH, penicilina).",
        ],
      },
    ],
    examTraps: [
      "Na síndrome nefrótica, a perda de cargas negativas da membrana basal permite albuminúria maciça mesmo antes de grandes furos estruturais.",
      "IECA/BRA dilatam preferencialmente a arteríola EFERENTE (removem Ang II) → reduzem pressão intraglomerular (nefroproteção), mas podem baixar agudamente a TFG em estenose bilateral de artéria renal.",
      "Reabsorção no TCP é ISO-OSMÓTICA (~300 mOsm/L do início ao fim do TCP), porque a água acompanha livremente os solutos pela AQP1 e via paracelular.",
    ],
    memoryAnchor:
      "Aferente entra, Eferente sai: apertar a saída (Ang II moderada) enche a bexiga do glomérulo e segura a TFG; PAH limpa tudo (FPR) e Inulina mede só a peneira (TFG).",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia filtracao glomerular reabsorcao secrecao tubular"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa filtracao glomerular clearance renal"),
    },
  },
  {
    id: "renal-02-concentracao-miccao",
    trackId: "renal",
    order: 7,
    dayPlan: 1,
    title: "Fisiologia Renal II: Mecanismo de concentração da urina e reflexo de micção",
    estimatedMinutes: 22,
    shortSummary:
      "Gradiente corticomedular (300 → 1200 mOsm/L), multiplicador de contracorrente, vasa recta, ADH/aldosterona e inervação da bexiga.",
    keyConcepts: [
      {
        title: "Multiplicador de Contracorrente (Alça de Henle)",
        summary:
          "Separação espacial entre permeabilidade à água e transporte ativo de sais cria o gradiente medular.",
        details: [
          "Ramo descendente fino: altamente permeável à água (AQP1), quase impermeável a solutos → filtrado se concentra até ~1200 mOsm/L na papila.",
          "Ramo ascendente espesso (segmento diluidor): IMPERMEÁVEL à água; reabsorve ativamente Na+-K+-2Cl− via cotransportador NKCC2 → fluido chega ao TCD hipotônico (~100 mOsm/L).",
          "Furosemida (diurético de alça) inibe NKCC2, colapsa o gradiente medular e impede tanto a concentração máxima quanto a diluição máxima.",
        ],
        referenceBadge: "Córtex ~300 mOsm/L → Medula interna ~1200 mOsm/L",
      },
      {
        title: "Reciclagem de Ureia e Vasa Recta",
        summary:
          "Ureia compõe ~40–50% da hiperosmolaridade da medula interna e a vasa recta preserva o gradiente sem 'lavá-lo'.",
        details: [
          "ADH ativa transportadores de ureia (UT-A1/UT-A3) no ducto coletor medular interno → ureia difunde para o interstício e entra novamente na alça fina.",
          "Vasa recta funcionam como TROCADORES de contracorrente passivos: fluxo lento em alça em U perde água/ganha solutos na descida e devolve solutos/ganha água na subida.",
        ],
      },
      {
        title: "Regulação Final: TCD, Ducto Coletor, ADH e Aldosterona",
        summary:
          "Ajuste fino da osmolaridade e do volume urinário (50 a 1200 mOsm/L).",
        details: [
          "TCD inicial: impermeável à água, reabsorve NaCl via cotransportador NCC (alvo dos tiazídicos) e reabsorve Ca2+ (estimulado pelo PTH).",
          "ADH (Vasopressina): liga-se ao receptor V2 basolateral → AMPc/PKA → inserção de Aquaporina-2 (AQP2) na membrana apical das células principais → urina concentrada e reduzida.",
          "Aldosterona (células principais): induz canais ENaC (reabsorve Na+) e ROMK + Na+/K+-ATPase (secreta K+); células intercaladas alfa secretam H+ via H+-ATPase.",
        ],
      },
      {
        title: "Reflexo de Micção e Controle Autonômico Vesical",
        summary:
          "Equilíbrio entre armazenamento simpático e esvaziamento parassimpático + controle pudendo.",
        details: [
          "Fase de Enchimento (Simpático T11–L2, nervo hipogástrico): beta-3 relaxa o músculo detrusor; alfa-1 contrai o esfíncter uretral interno. Pudendo mantém esfíncter externo contraído.",
          "Reflexo de Micção (Parassimpático S2–S4, nervos esplâncnicos pélvicos): estiramento vesical ativa centro pontino da micção → ACh (M3) contrai o detrusor e inibe simpático/pudendo → relaxa esfíncteres interno e externo.",
        ],
      },
    ],
    examTraps: [
      "Mesmo sem ADH (diabetes insípido), o fluido já sai do ramo ascendente espesso da alça de Henle DILUÍDO (~100 mOsm/L), porque a alça espessa é impermeável à água.",
      "Aumento exagerado do fluxo sanguíneo medular 'lava' o gradiente osmótico corticomedular e reduz a capacidade máxima de concentração urinária.",
      "Não confundir controle vesical: Parassimpático (S2–S4) ESVAZIA a bexiga (contrai detrusor); Simpático (T11–L2) SEGURA a urina (relaxa detrusor, fecha esfíncter interno).",
    ],
    memoryAnchor:
      "Descendente = Dá água; Ascendente espesso = Sobe Sal sem água (NKCC2). ADH abre portas AQP2; Parassimpático faz 'Pee' (xixi).",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia concentracao urina contracorrente miccao"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa concentracao urina ADH reflexo miccao"),
    },
  },
  {
    id: "renal-03-acido-base",
    trackId: "renal",
    order: 8,
    dayPlan: 1,
    title: "Equilíbrio Ácido-Base",
    estimatedMinutes: 25,
    shortSummary:
      "Valores normais da gasometria, 3 linhas de defesa, interpretação dos 4 distúrbios primários, Fórmula de Winter e cálculo do Ânion Gap.",
    keyConcepts: [
      {
        title: "Valores Normais e Henderson-Hasselbalch",
        summary:
          "O pH arterial depende da razão entre o componente metabólico (HCO3−) e o componente respiratório (PaCO2).",
        details: [
          "pH arterial: 7,35–7,45 (média 7,40) | PaCO2: 35–45 mmHg | HCO3−: 22–26 mEq/L | Ânion Gap: 8–12 mEq/L.",
          "Equação: pH = 6,1 + log([HCO3−] / (0,03 × PaCO2)).",
          "O rim regula o numerador ([HCO3−]) lentamente; o pulmão regula o denominador (PaCO2) rapidamente.",
        ],
        referenceBadge: "pH 7,35–7,45 | PaCO2 35–45 | HCO3− 22–26",
      },
      {
        title: "As Três Linhas de Defesa contra Variações do pH",
        summary:
          "Escalonamento temporal entre tamponamento imediato, ventilação e excreção renal definitiva.",
        details: [
          "1ª Linha — Tampões químicos (frações de segundo): sistema HCO3−/H2CO3 (principal extracelular por ser sistema aberto), proteínas/hemoglobina e fosfato (importante no intracelular e túbulos renais).",
          "2ª Linha — Regulação respiratória (minutos): quimiorreceptores centrais (H+ do LCR vindo do CO2) e periféricos (corpos carotídeos) ajustam ventilação alveolar.",
          "3ª Linha — Regulação renal (horas a dias, mais potente/definitiva): reabsorve quase 100% do HCO3− filtrado e gera 'novo HCO3−' excretando H+ como acidez titulável (H2PO4−) e NH4+ (amoniogênese no TCP).",
        ],
      },
      {
        title: "Os 4 Distúrbios Primários e Compensação Esperada",
        summary:
          "A compensação fisiológica aproxima o pH de 7,40, mas raramente normaliza por completo (exceto alcalose respiratória crônica).",
        details: [
          "Acidose Metabólica (↓ HCO3−): compensa hiperventilando (↓ PaCO2). Fórmula de Winter: PaCO2 esperada = 1,5 × HCO3− + 8 (± 2).",
          "Alcalose Metabólica (↑ HCO3−): compensa hipoventilando (↑ PaCO2). PaCO2 esperada ≈ 40 + 0,7 × (HCO3− − 24) (± 2).",
          "Acidose Respiratória (↑ PaCO2): rim retém HCO3− (+1 mEq/L por Δ10 mmHg agudo; +3,5–4 mEq/L por Δ10 mmHg crônico).",
          "Alcalose Respiratória (↓ PaCO2): rim excreta HCO3− (−2 mEq/L por Δ10 mmHg agudo; −4–5 mEq/L por Δ10 mmHg crônico).",
        ],
      },
      {
        title: "Ânion Gap e Diagnóstico Diferencial",
        summary:
          "Distingue ganho de ácidos fixos não mensurados de perda pura de bicarbonato.",
        details: [
          "Fórmula: Ânion Gap = Na+ − (Cl− + HCO3−) | Valor normal: 8–12 mEq/L (sem K+).",
          "AG Aumentado (> 12): acúmulo de ânions não medidos — Cetoacidose (diabética/alcoólica/jejum), Acidose láctica, Uremia, Intoxicações (metanol, etilenoglicol, salicilatos).",
          "AG Normal (Hiperclorêmica): perda GI de HCO3− (diarreia, fístula pancreática) ou renal (acidoses tubulares renais), com elevação compensatória de Cl−.",
        ],
      },
    ],
    examTraps: [
      "Se na acidose metabólica a PaCO2 medida estiver ACIMA da faixa da Fórmula de Winter, existe uma acidose respiratória associada (distúrbio misto)! Se estiver ABAIXO, há alcalose respiratória associada.",
      "Cada 1 mEq/L de HCO3− excretado pelo rim exige que um H+ seja secretado; sem excreção de NH4+ e fosfato (acidez titulável), o rim não consegue gerar bicarbonato novo.",
      "Na alcalose metabólica por vômitos, há hipocloremia + hipocalemia + contração de volume — manter volume/Cl− corrigido é essencial para o rim parar de reabsorver HCO3−.",
    ],
    memoryAnchor:
      "Winter = 1,5 × HCO3− + 8 ± 2! ROME: Respiratório Oposto (pH e PaCO2 em direções opostas), Metabólico Equal (pH e HCO3− na mesma direção).",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia equilibrio acido base gasometria"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa equilibrio acido base formula winter"),
    },
  },
  {
    id: "endo-01-hipotalamo-hipofise",
    trackId: "endocrino",
    order: 9,
    dayPlan: 2,
    title: "Introdução à Fisiologia Hormonal I: Eixo hipotálamo-hipofisário",
    estimatedMinutes: 20,
    shortSummary:
      "Classes químicas hormonais e segundos mensageiros, sistema porta hipofisário, adeno-hipófise vs. neuro-hipófise e alças de feedback.",
    keyConcepts: [
      {
        title: "Classes Químicas e Mecanismos de Ação",
        summary:
          "A solubilidade do hormônio determina onde fica seu receptor e a velocidade da resposta.",
        details: [
          "Peptídicos/Proteicos e Catecolaminas (adrenalina/noradrenalina): hidrossolúveis, circulam livres, ligam-se a receptores de MEMBRANA (Gs/AMPc, Gq/IP3-DAG, ou tirosina quinase como insulina/GH) → resposta rápida.",
          "Esteroides (cortisol, aldosterona, sexuais, calcitriol) e Tireoidianos (T3/T4): lipossolúveis, circulam ligados a proteínas plasmáticas, atravessam a membrana e ligam-se a receptores INTRACELULARES/NUCLEARES → modulam transcrição gênica (resposta lenta e duradoura).",
        ],
        referenceBadge: "Exceção clássica: tireoidianos derivam de tirosina mas agem no núcleo!",
      },
      {
        title: "Adeno-hipófise e Sistema Porta Hipotálamo-Hipofisário",
        summary:
          "Controle vascular direto por neuro-hormônios hipotalâmicos sobre 5 tipos celulares da hipófise anterior.",
        details: [
          "TRH → estimula TSH (e também prolactina); CRH → estimula ACTH; GnRH (pulsátil!) → estimula FSH e LH.",
          "GHRH estimula GH; Somatostatina (GHIH) inibe GH e TSH.",
          "Dopamina (PIH, núcleo arqueado) mantém a PROLACTINA sob INIBIÇÃO tônica contínua (secção da haste hipofisária ↑ PRL e ↓ todos os outros hormônios adeno-hipofisários).",
        ],
      },
      {
        title: "Neuro-hipófise (Hipófise Posterior)",
        summary:
          "Extensão neural direta que armazena e libera peptídeos sintetizados no hipotálamo.",
        details: [
          "Núcleo Supraóptico (principalmente ADH/Vasopressina) e Núcleo Paraventricular (principalmente Ocitocina) sintetizam os hormônios como pré-pró-hormônios e os transportam via axônios (trato hipotálamo-hipofisário) com neurofisinas.",
          "ADH responde primariamente ao aumento da osmolaridade plasmática (osmorreceptores hipotalâmicos, limiar ~280–285 mOsm/kg) e secundariamente à queda de volume/PA (> 10%).",
          "Ocitocina promove contração miometrial no parto e contração das células mioepiteliais mamárias na ejeção do leite.",
        ],
      },
      {
        title: "Alças de Feedback Negativo e Positivo",
        summary:
          "Estabilização fina do meio interno e exceções fisiológicas autoamplificadoras.",
        details: [
          "Feedback Negativo Longo: hormônio da glândula-alvo (ex.: T3/T4, cortisol) inibe hipófise e hipotálamo.",
          "Feedback Negativo Curto: hormônio hipofisário (ex.: TSH, ACTH) inibe o hipotálamo; Ultracurto: hormônio hipotalâmico inibe sua própria secreção.",
          "Feedback Positivo (raros e autolimitados): pico sustentado de estradiol disparando pico de LH pré-ovulatório; Reflexo de Ferguson (ocitocina no parto).",
        ],
      },
    ],
    examTraps: [
      "A neuro-hipófise NÃO sintetiza ADH nem Ocitocina — ela apenas os armazena e secreta; a síntese ocorre nos corpos celulares dos núcleos supraóptico e paraventricular do hipotálamo.",
      "Infusão CONTÍNUA de agonista de GnRH dessensibiliza receptores hipofisários e SUPRIME LH/FSH; apenas a secreção PULSÁTIL estimula o eixo.",
      "Prolactina é o ÚNICO hormônio adeno-hipofisário sob controle predominantemente INIBITÓRIO do hipotálamo (via dopamina).",
    ],
    memoryAnchor:
      "Cortar a haste hipofisária derruba tudo, MENOS a Prolactina (que dispara livre da dopamina). GnRH gosta de batida pulsátil; contínuo ele desliga.",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia hipotalamo hipofise introducao hormonal"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa eixo hipotalamo hipofisario"),
    },
  },
  {
    id: "endo-02-tireoide-paratireoide",
    trackId: "endocrino",
    order: 10,
    dayPlan: 2,
    title: "Fisiologia Hormonal II/III: Tireoide e paratireoide",
    estimatedMinutes: 24,
    shortSummary:
      "Biossíntese de T3/T4 pela TPO, conversão periférica por desiodases, ações sistêmicas e regulação do Ca2+ e fosfato por PTH, vitamina D e calcitonina.",
    keyConcepts: [
      {
        title: "Biossíntese dos Hormônios Tireoidianos (Folículo)",
        summary:
          "Sete etapas sequenciais dentro do folículo tireoidiano e do coloide rico em tireoglobulina.",
        details: [
          "1) Captação ativa de iodeto (I−) na membrana basolateral pelo simportador Na+/I− (NIS, estimulado pelo TSH).",
          "2) Efluxo de I− para o coloide via Pendrina; 3) Oxidação do I− a I0 e 4) Organificação (iodação de resíduos de tirosina da tireoglobulina) catalisadas pela Tireoperoxidase (TPO) + H2O2.",
          "5) Acoplamento pela TPO: MIT + DIT → T3; DIT + DIT → T4. 6) Endocitose do coloide + proteólise lisossomal liberam T4 (~90%) e T3 (~10%) para o sangue (ligados sobretudo à TBG).",
        ],
        referenceBadge: "Propiltiouracil (PTU) inibe TPO + desiodase tipo 1 periférica",
      },
      {
        title: "Ativação Periférica, Ações e Eixo TRH–TSH–T3/T4",
        summary:
          "T4 funciona majoritariamente como pró-hormônio; T3 tem afinidade nuclear ~10x maior.",
        details: [
          "Desiodases (D1/D2) convertem T4 em T3 ativo nos tecidos periféricos e na hipófise; D3 inativa T4 em T3 reverso (rT3).",
          "Ações: ↑ metabolismo basal (Na+/K+-ATPase, consumo de O2, termogênese), mielinização e desenvolvimento sináptico fetal/infantil (déficit = cretinismo), e upregulation de receptores beta-1 adrenérgicos cardíacos (taquicardia no hipertireoidismo).",
          "T3 livre faz feedback negativo direto sobre os tireotrofos (↓ TSH) e sobre o hipotálamo (↓ TRH).",
        ],
      },
      {
        title: "PTH (Paratormônio): O Grande Guardião do Cálcio",
        summary:
          "Secretado pelas células principais das paratireoides quando Ca2+ livre cai (via receptor sensor de cálcio — CaSR).",
        details: [
          "Osso: liga-se a OSTEOBLASTOS, estimula expressão de RANKL → ativa osteoclastos → reabsorção óssea libera Ca2+ e PO4³⁻.",
          "Rim (3 ações): ↑ reabsorção de Ca2+ no Túbulo Contorcido Distal; ↓ reabsorção de fosfato no TCP (efeito fosfatúrico via retirada de NaPi-IIa); ↑ enzima 1-alfa-hidroxilase no TCP → converte 25(OH)D em 1,25(OH)2D (Calcitriol).",
          "Resultado plasmático líquido do PTH: ↑ Ca2+ sérico e ↓ Fosfato sérico!",
        ],
        referenceBadge: "Ca2+ baixo → ↑ PTH | Mg2+ muito baixo paralisa secreção de PTH",
      },
      {
        title: "Vitamina D (Calcitriol) e Calcitonina",
        summary:
          "Absorção intestinal sinérgica de Ca2+ e fosfato pelo calcitriol e papel modesto da calcitonina.",
        details: [
          "Vitamina D (colecalciferol da pele/dieta) → 25-hidroxilação no fígado → 1-alfa-hidroxilação no rim (ativada por PTH e hipofosfatemia) → Calcitriol.",
          "Calcitriol aumenta absorção intestinal de Ca2+ (canais TRPV6 e calbindina) e PO4³⁻, subindo AMBOS no plasma.",
          "Calcitonina (células C parafoliculares da tireoide): secretada na hipercalcemia; inibe diretamente osteoclastos e reduz Ca2+/PO4, com papel fisiológico discreto em humanos adultos.",
        ],
      },
    ],
    examTraps: [
      "PTH SOBE Cálcio e BAIXA Fosfato; Vitamina D ativa SOBE Cálcio E SOBE Fosfato! Nunca misture os dois no enunciado.",
      "Em excesso crônico (hiperparatireoidismo), PTH causa perda óssea, mas em pulsos intermitentes baixos (teriparatida) estimula formação óssea via osteoblastos.",
      "No hipertireoidismo primário (ex.: Graves): T3/T4 altos e TSH SUPRIMIDO; no hipotireoidismo primário (ex.: Hashimoto): T3/T4 baixos e TSH ELEVADO.",
    ],
    memoryAnchor:
      "PTH = 'P' de 'Puxa Cálcio e Perde Fosfato' (joga fosfato fora no xixi). T4 é a reserva; T3 é quem trabalha no núcleo.",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia tireoide paratireoide calcio PTH"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa tireoide paratireoide metabolismo calcio"),
    },
  },
  {
    id: "endo-03-pancreas-adrenal",
    trackId: "endocrino",
    order: 11,
    dayPlan: 2,
    title: "Fisiologia Hormonal IV: Pâncreas endócrino e adrenal",
    estimatedMinutes: 23,
    shortSummary:
      "Secreção e ações metabólicas da insulina vs. glucagon, três zonas do córtex adrenal (aldosterona, cortisol, andrógenos) e medula adrenal.",
    keyConcepts: [
      {
        title: "Célula Beta Pancreática e Ações da Insulina",
        summary:
          "Hormônio da abundância (anabólico): capta glicose, sintetiza glicogênio, proteínas e triglicerídeos.",
        details: [
          "Mecanismo de secreção: Glicose entra via GLUT2 → glicoquinase → ↑ ATP/ADP → fecha canal de K+ sensível a ATP → despolariza → abre canal de Ca2+ voltagem-dependente → exocitose de insulina + peptídeo C (1:1).",
          "Ação periférica (receptor tirosina quinase): translocação de vesículas de GLUT4 no músculo esquelético e tecido adiposo (fígado e cérebro NÃO dependem de insulina para captar glicose!).",
          "Metabolismo: ↑ glicogênese, ↑ síntese proteica e lipogênese; INIBE gliconeogênese, glicogenólise, lipólise (inibe lipase hormônio-sensível) e cetogênese.",
        ],
        referenceBadge: "Peptídeo C diferencia insulina endógena de exógena",
      },
      {
        title: "Glucagon e Somatostatina (Ilhotas)",
        summary:
          "Defesa contra hipoglicemia no jejum e modulação parácrina intrapancreática.",
        details: [
          "Células Alfa (Glucagon, via receptor Gs/AMPc): estimulado por hipoglicemia, aminoácidos (arginina/alanina) e catecolaminas; inibido por insulina e hiperglicemia.",
          "Ações do Glucagon (foco hepático!): ↑ glicogenólise, ↑ gliconeogênese, ↑ lipólise e ↑ cetogênese.",
          "Células Delta (Somatostatina): inibe localmente tanto insulina quanto glucagon; retarda absorção GI.",
        ],
      },
      {
        title: "Córtex Adrenal: As 3 Zonas ('GFR')",
        summary:
          "Síntese esteroide a partir do colesterol com regulação e funções distintas por camada.",
        details: [
          "Zona Glomerulosa (externa) → Aldosterona (mineralocorticoide): regulada principalmente por Angiotensina II (SRAA) e hipercalemia (↑ K+), pouco dependente de ACTH. Reabsorve Na+ e excreta K+/H+.",
          "Zona Fasciculada (média) → Cortisol (glicocorticoide): regulado pelo eixo CRH–ACTH (pico matinal circadiano). Promove gliconeogênese, proteólise, lipólise permissiva, estabiliza PA (efeito permissivo às catecolaminas) e efeito anti-inflamatório/imunossupressor.",
          "Zona Reticulada (interna) → Andrógenos adrenais (DHEA/androstenediona): regulada por ACTH.",
        ],
        referenceBadge: "GFR = Glomerulosa (Sal), Fasciculada (Açúcar), Reticulada (Sexo)",
      },
      {
        title: "Medula Adrenal e Resposta ao Estresse",
        summary:
          "Gânglio simpático modificado com enzima PNMT induzida pelo cortisol.",
        details: [
          "Células cromafins recebem inervação simpática pré-ganglionar colinérgica (ACh em receptores nicotínicos) e secretam ~80% adrenalina e ~20% noradrenalina.",
          "Cortisol que drena do córtex pelo sistema porta adrenal induz a enzima PNMT, convertendo noradrenalina em adrenalina.",
        ],
      },
    ],
    examTraps: [
      "Exercício físico contrai o músculo e transloca GLUT4 via AMPK de forma INDEPENDENTE de insulina — por isso o treino melhora a glicemia mesmo com resistência insulínica.",
      "Na insuficiência adrenal primária (Addison), faltam cortisol E aldosterona, com ACTH muito alto (causando hiperpigmentação por clivagem de POMC/MSH); na secundária (hipofisária), ACTH é baixo e a aldosterona está preservada (pois depende do SRAA).",
      "Aldosterona NÃO depende criticamente de ACTH no longo prazo — hipopituitarismo NÃO causa crise perdedora de sal por falta de aldosterona.",
    ],
    memoryAnchor:
      "GFR de fora para dentro: Sal (Glomerulosa/Aldosterona), Açúcar (Fasciculada/Cortisol), Sexo (Reticulada/DHEA). Glicose entra na célula beta por GLUT2 para soltar insulina, que põe GLUT4 na porta do músculo.",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia pancreas endocrino insulina glucagon adrenal"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa pancreas endocrino cortex adrenal"),
    },
  },
  {
    id: "endo-04-hormonal-masculina",
    trackId: "endocrino",
    order: 12,
    dayPlan: 2,
    title: "Fisiologia Hormonal V: Fisiologia hormonal masculina",
    estimatedMinutes: 17,
    shortSummary:
      "Eixo GnRH–LH/FSH no homem, células de Leydig vs. Sertoli, conversão em DHT e estradiol, inibina B e etapas da espermatogênese.",
    keyConcepts: [
      {
        title: "Células de Leydig (LH) e Andrógenos",
        summary:
          "Compartimento intersticial responsável pela esteroidogênese testicular.",
        details: [
          "LH hipofisário liga-se a receptores Gs nas células de Leydig (interstício) → aumenta StAR e conversão de colesterol em Testosterona.",
          "Testosterona circula ligada à SHBG e albumina; faz feedback negativo no hipotálamo (↓ frequência dos pulsos de GnRH) e na adeno-hipófise (↓ LH).",
          "Conversões periféricas cruciais: 5-alfa-redutase converte Testosterona em Di-hidrotestosterona (DHT — mais potente; genitália externa fetal, próstata, folículo piloso/calvície); Aromatase converte em Estradiol (fechamento das epífises ósseas e massa óssea).",
        ],
      },
      {
        title: "Células de Sertoli (FSH) e Barreira Hematotesticular",
        summary:
          "Compartimento tubular que nutre, protege e guia as células germinativas.",
        details: [
          "FSH + alta concentração intratesticular de testosterona estimulam as células de Sertoli nos túbulos seminíferos.",
          "Produzem ABP (proteína ligadora de andrógenos, mantendo testosterona concentrada localmente), fluido tubular, fator antimülleriano (AMH no feto) e INIBINA B.",
          "Junções de oclusão entre células de Sertoli formam a barreira hematotesticular, isolando espermatócitos pós-meióticos do sistema imune.",
        ],
        referenceBadge: "Inibina B faz feedback negativo SELETIVO sobre o FSH",
      },
      {
        title: "Espermatogênese e Maturação",
        summary:
          "Produção contínua (~64–74 dias) dependente de temperatura escrotal ~2°C abaixo da corporal.",
        details: [
          "Espermatogônias (2n) sofrem mitose → espermatócitos primários (2n) → meiose I e II → espermátides haploides (n) → espermiogênese (diferenciação em espermatozoide com acrossomo e flagelo).",
          "Capacidade de motilidade e fecundação completa só é adquirida no epidídimo e após capacitação no trato genital feminino.",
        ],
      },
      {
        title: "Regulação do Eixo HPG e Diferenciação Sexual Masculina",
        summary:
          "Controle pulsátil pelo GnRH e divisão entre testosterona (ductos de Wolff) e DHT (genitália externa).",
        details: [
          "GnRH pulsátil estimula LH e FSH; Testosterona/Estradiol reduzem pulsos de GnRH e LH, enquanto a Inibina B faz feedback negativo seletivo no FSH.",
          "Embriologia: SRY → testículos fetais → Células de Sertoli secretam AMH (regride ductos de Müller); Leydig secretam Testosterona (diferencia ductos de Wolff: epidídimo, deferente, vesícula seminal).",
          "DHT (via 5-alfa-redutase) diferencia a genitália externa masculina e próstata; Testosterona ainda estimula massa muscular, fechamento epifisário (via estradiol) e eritropoiese.",
        ],
        referenceBadge: "Wolff = Testosterona | Genitália externa/Próstata = DHT",
      },
    ],
    examTraps: [
      "Testosterona exógena (anabolizantes) faz feedback negativo no hipotálamo/hipófise → derruba LH e FSH → reduz testosterona intratesticular e causa ATROFIA testicular e infertilidade!",
      "DHT (5-alfa-redutase) diferencia a genitália externa masculina (pênis, escroto) e cresce a próstata; Testosterona diferencia os ductos de Wolff (epidídimo, deferente, vesícula seminal).",
      "Na deficiência de aromatase masculina, não há fechamento das epífises ósseas → estatura elevada e osteoporose.",
    ],
    memoryAnchor:
      "L de Leydig = L de LH → faz Testosterona; S de Sertoli = S de FSH ('eS-permatogênese' e Inibina B). Lembra: testosterona de fora murcha o testículo por dentro!",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia sistema reprodutor masculino testosterona"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa hormonal masculina espermatogenese"),
    },
  },
  {
    id: "endo-05-hormonal-feminina",
    trackId: "endocrino",
    order: 13,
    dayPlan: 2,
    title: "Fisiologia Hormonal V: Fisiologia hormonal feminina",
    estimatedMinutes: 24,
    shortSummary:
      "Teoria das duas células–duas gonadotrofinas, fases ovariana e endometrial, a virada para feedback positivo do estradiol (pico de LH) e corpo lúteo.",
    keyConcepts: [
      {
        title: "Teoria das Duas Células – Duas Gonadotrofinas",
        summary:
          "Cooperação obrigatória entre células da teca interna e da granulosa para fabricar estradiol.",
        details: [
          "Célula da Teca Interna: possui receptores de LH → converte colesterol em andrógenos (androstenediona e testosterona).",
          "Célula da Granulosa: possui receptores de FSH → induz a enzima AROMATASE, que converte os andrógenos difundidos da teca em Estradiol (17-beta-estradiol).",
          "No final da fase folicular, o folículo dominante ganha receptores de LH também na granulosa para responder ao pico ovulatório.",
        ],
        referenceBadge: "Teca = LH → Andrógeno | Granulosa = FSH + Aromatase → Estradiol",
      },
      {
        title: "Ciclo Ovariano e Virada do Feedback Positivo",
        summary:
          "Como o mesmo estradiol muda de freio para acelerador na metade do ciclo.",
        details: [
          "Fase Folicular (dias 1–14): FSH recruta folículos; estradiol em níveis baixos/moderados + inibina B fazem feedback NEGATIVO sobre FSH/LH (seleção do folículo dominante).",
          "Ovulação (~dia 14): estradiol elevado e sustentado (> ~200 pg/mL por ~36–48h) inverte o sinal hipofisário para FEEDBACK POSITIVO → pico maciço de LH (e menor de FSH) → ruptura folicular ~12–24h após o pico.",
          "Fase Lútea (fixa ~14 dias): corpo lúteo secreta muita PROGESTERONA + estradiol + inibina A → feedback negativo mantém FSH/LH suprimidos. Sem fecundação/hCG, ocorre luteólise após ~12–14 dias.",
        ],
      },
      {
        title: "Ciclo Endometrial Sincronizado",
        summary:
          "Preparo sequencial do útero para implantação embrionária.",
        details: [
          "Fase Menstrual (dias 1–4): queda abrupta de progesterona e estradiol gera vasoespasmo das artérias espiraladas, isquemia e descamação da camada funcional.",
          "Fase Proliferativa (dias 5–14, Estradiol): regeneração epitelial, alongamento de glândulas e muco cervical fino/filante.",
          "Fase Secretora (dias 15–28, Progesterona): glândulas tortuosas ricas em glicogênio, artérias espiraladas bem desenvolvidas, muco cervical espesso e aumento da temperatura basal (+0,3–0,5°C).",
        ],
      },
      {
        title: "Corpo Lúteo, Luteólise e Marcadores Fisiológicos do Ciclo",
        summary:
          "A janela fixa de ~14 dias após a ovulação e o sinal termogênico da progesterona.",
        details: [
          "Após a ovulação, células da granulosa e da teca luteinizam sob ação do LH e formam o corpo lúteo, produzindo Progesterona (dominante), Estradiol e Inibina A.",
          "Marcadores clínicos: muco cervical passa de abundante/filante (efeito estrogênico pré-ovulatório) a espesso/hostil (progesterona); temperatura corporal basal sobe +0,3–0,5°C na fase lútea (ação hipotalâmica da progesterona).",
          "Sem fecundação/hCG embrionário, o corpo lúteo sofre luteólise em ~12–14 dias e vira corpo albicans — por isso a fase lútea dura sempre ~14 dias.",
        ],
        referenceBadge: "Fase lútea fixa (~14 dias) | Progesterona ↑ temperatura basal",
      },
    ],
    examTraps: [
      "A fase LÚTEA é relativamente fixa (~14 dias) devido à vida útil programada do corpo lúteo; quem varia em ciclos irregulares é a fase FOLICULAR.",
      "A ovulação é disparada pelo pico de LH causado pelo FEEDBACK POSITIVO do estradiol sustentado — NÃO pela progesterona.",
      "A Progesterona prepara o endométrio (fase secretora) e eleva a temperatura basal no período pós-ovulatório.",
    ],
    memoryAnchor:
      "Teca + LH = Andrógeno; Granulosa + FSH = Estradiol. Estradiol alto e constante vira a chave do feedback positivo pro pico de LH. Fase lútea dura sempre ~14 dias!",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia ciclo menstrual ovariano feminino hormonios"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa ciclo menstrual eixo feminino"),
    },
  },
  {
    id: "endo-06-gravidez-lactacao",
    trackId: "endocrino",
    order: 14,
    dayPlan: 2,
    title: "Fisiologia Hormonal VI: Gravidez, parto e lactação",
    estimatedMinutes: 20,
    shortSummary:
      "Resgate do corpo lúteo pelo hCG, transição lúteo-placentária, estriol/hPL, Reflexo de Ferguson no parto e eixo Prolactina + Ocitocina na lactação.",
    keyConcepts: [
      {
        title: "Implantação, hCG e Transição Lúteo-Placentária",
        summary:
          "Como o embrião impede a menstruação e assume a produção hormonal.",
        details: [
          "Sinciciotrofoblasto secreta hCG logo após a implantação; hCG tem subunidade alfa idêntica ao LH/FSH/TSH e subunidade beta específica.",
          "hCG liga-se aos receptores de LH do corpo lúteo, impedindo a luteólise e mantendo Progesterona e Estradiol elevados nas primeiras ~8–10 semanas.",
          "Por volta da 8ª–12ª semana (transição lúteo-placentária), a placenta assume a produção maciça de progesterona e estrogênios (sobretudo Estriol, via unidade feto-placentária usando DHEA-S da adrenal fetal).",
        ],
        referenceBadge: "hCG pico ~8–10 semanas | Progesterona mantém útero quieto",
      },
      {
        title: "Adaptações Maternas e Lactogênio Placentário (hPL)",
        summary:
          "Redirecionamento metabólico de nutrientes maternos para o crescimento fetal.",
        details: [
          "Lactogênio Placentário Humano (hPL / somatomamotrofina coriônica): promove lipólise materna e resistência periférica à insulina, poupando glicose e aminoácidos para o feto (fator diabetogênico da gestação).",
          "Progesterona relaxa musculatura lisa (útero, TGI → constipação/refluxo) e reduz resistência vascular sistêmica; volume plasmático sobe ~40–50%.",
        ],
      },
      {
        title: "Fisiologia do Parto e Reflexo de Ferguson",
        summary:
          "Quebra da quiescência uterina e alça clássica de feedback positivo.",
        details: [
          "Próximo ao termo: aumenta a relação Estrogênio/Progesterona funcional, sobem os receptores miometriais de ocitocina, junções comunicantes (conexina-43) e produção local de prostaglandinas (PGE2/PGF2α — amolecem colo e contraem útero).",
          "Reflexo de Ferguson: cabeça fetal distende o colo uterino → aferência neural ao hipotálamo (núcleos paraventricular/supraóptico) → libera Ocitocina → contrai útero → empurra mais a cabeça → mais ocitocina até o nascimento.",
        ],
      },
      {
        title: "Lactação: Mamogênese, Lactogênese e Ejeção",
        summary:
          "Durante a gravidez a mama cresce, mas o leite só desce após a saída da placenta.",
        details: [
          "Na gestação: estrogênio (ductos), progesterona (alvéolos) e prolactina preparam a mama, mas níveis altíssimos de ESTROGÊNIO e PROGESTERONA bloqueiam os receptores de prolactina (impedem secreção copiosa).",
          "Pós-parto: expulsão da placenta derruba estrogênio e progesterona → libera a ação da PROLACTINA (síntese de leite nos alvéolos; hipófise anterior; sucção inibe dopamina).",
          "Sucção do mamilo também dispara reflexo neuroendócrino para a neuro-hipófise liberar OCITOCINA → contração das células mioepiteliais → ejeção ('descida') do leite.",
        ],
      },
    ],
    examTraps: [
      "Na gestação, a prolactina JÁ está muito alta, mas a mãe não produz leite abundante antes do parto porque Estrogênio e Progesterona placentários inibem sua ação secretora na mama.",
      "Prolactina FAZ o leite (síntese, adeno-hipófise); Ocitocina EJECTA o leite (contração mioepitelial, neuro-hipófise) — nunca inverta!",
      "A síntese placentária de Estriol depende dos precursores androgênicos (DHEA-S) produzidos pela glândula adrenal do FETO (unidade feto-placentária).",
    ],
    memoryAnchor:
      "hCG segura o corpo lúteo até a placenta assumir; Parto = Ferguson (ocitocina em loop positivo); Pós-parto cai placenta e libera Prolactina (fabrica) + Ocitocina (ejeta).",
    youtubePrimary: {
      label: "Aula no YouTube (MK Fisiologia)",
      url: ytSearch("MK Fisiologia gravidez parto lactacao hormonios"),
    },
    youtubeSecondary: {
      label: "Mais aulas completas",
      url: ytSearch("fisiologia medicina aula completa gestacao parto lactacao"),
    },
  },
];
