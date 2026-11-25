import type { TrackId } from "./physiology-tracks";

export interface Flashcard {
  readonly id: string;
  readonly topicId: string;
  readonly trackId: TrackId;
  readonly front: string;
  readonly back: string;
  readonly clinicalTip: string;
}

export const FLASHCARDS: readonly Flashcard[] = [
  // Tópico 1: Secreção Salivar, Gástrica e Pancreática
  {
    id: "fc-01",
    topicId: "gi-01-secrecoes",
    trackId: "gi",
    front: "Como os ductos salivares modificam a saliva primária e o que ocorre em fluxo alto?",
    back: "Os ductos reabsorvem Na+ e Cl− e secretam K+ e HCO3− com baixa permeabilidade à água, tornando a saliva hipotônica. Em fluxo alto há menos tempo de contato, então ela fica mais próxima da isotonicidade (mais Na+/Cl−/HCO3−).",
    clinicalTip: "A aldosterona aumenta a reabsorção de Na+ e a secreção de K+ nos ductos salivares, igualzinho ao túbulo coletor renal.",
  },
  {
    id: "fc-02",
    topicId: "gi-01-secrecoes",
    trackId: "gi",
    front: "Quais são os 3 principais estímulos da célula parietal e qual é o único produto gástrico indispensável à vida?",
    back: "Estímulos: Acetilcolina (M3), Gastrina (CCK-B) e Histamina (H2 — maior potencializador via AMPc). Produto indispensável: Fator Intrínseco (absorção de vitamina B12 no íleo terminal).",
    clinicalTip: "Inibidores da bomba de prótons (IBP) bloqueiam a H+/K+-ATPase apical, silenciando todos os três estímulos juntos.",
  },
  {
    id: "fc-03",
    topicId: "gi-01-secrecoes",
    trackId: "gi",
    front: "Diferencie os efeitos e estímulos de Secretina vs. CCK no pâncreas exócrino.",
    back: "Secretina (células S, estimulada por H+ duodenal) → células ductais secretam água e HCO3− via CFTR. CCK (células I, estimulada por gorduras/aminoácidos) → ácinos secretam enzimas digestivas.",
    clinicalTip: "A enteroquinase da borda em escova ativa o tripsinogênio em tripsina, que então ativa todas as outras pró-enzimas.",
  },

  // Tópico 2: Deglutição e Motilidade GI
  {
    id: "fc-04",
    topicId: "gi-02-degluticao-motilidade",
    trackId: "gi",
    front: "Quais neurotransmissores mediam o relaxamento do EEI e o relaxamento receptivo à frente do bolo na peristalse?",
    back: "Óxido Nítrico (NO) e Peptídeo Intestinal Vasoativo (VIP), liberados por neurônios inibitórios do plexo mioentérico estimulados pelo vago.",
    clinicalTip: "Na acalasia, há degeneração desses neurônios inibitórios NO/VIP, impedindo o relaxamento do EEI na deglutição.",
  },
  {
    id: "fc-05",
    topicId: "gi-02-degluticao-motilidade",
    trackId: "gi",
    front: "Qual é a diferença elétrica e funcional entre Ondas Lentas (Cajal) e Potenciais em Espiga?",
    back: "Ondas lentas são oscilações basais marca-passo das células intersticiais de Cajal que ditam a frequência máxima (3/min estômago; 12/min duodeno). Potenciais em espiga são potenciais de ação Ca2+-dependentes que efetivamente geram contração muscular.",
    clinicalTip: "ACh e estiramento despolarizam as ondas lentas acima do limiar, disparando espigas; noradrenalina hiperpolariza.",
  },
  {
    id: "fc-06",
    topicId: "gi-02-degluticao-motilidade",
    trackId: "gi",
    front: "O que é o Complexo Motor Migratório (MMC), quando ocorre e qual hormônio o dispara?",
    back: "Ondas peristálticas de limpeza do estômago ao íleo a cada ~90 min durante o jejum, comandadas pelo hormônio Motilina (células Mo). A alimentação interrompe imediatamente o MMC.",
    clinicalTip: "Eritromicina é agonista do receptor de motilina e por isso acelera o esvaziamento gástrico.",
  },

  // Tópico 3: Reflexos Gastrintestinais
  {
    id: "fc-07",
    topicId: "gi-03-reflexos-gi",
    trackId: "gi",
    front: "Compare as funções principais do Plexo de Auerbach e do Plexo de Meissner.",
    back: "Plexo Mioentérico (Auerbach, entre camadas musculares) controla principalmente MOTILIDADE (tônus e peristalse). Plexo Submucoso (Meissner) controla SECREÇÃO epitelial, absorção e fluxo sanguíneo local.",
    clinicalTip: "Na doença de Hirschsprung, a ausência dos plexos entéricos no cólon distal impede o relaxamento e gera megacólon proximal.",
  },
  {
    id: "fc-08",
    topicId: "gi-03-reflexos-gi",
    trackId: "gi",
    front: "Diferencie o Reflexo Enterogástrico do Reflexo Gastrocólico.",
    back: "Enterogástrico: ácido, gordura, hiperosmolaridade ou distensão no duodeno INIBEM o esvaziamento e a secreção gástrica. Gastrocólico: alimento/distensão gástrica ESTIMULA movimentos de massa no cólon.",
    clinicalTip: "É pelo reflexo gastrocólico que bebês e pacientes com síndrome do intestino irritável sentem vontade de evacuar logo após comer.",
  },
  {
    id: "fc-09",
    topicId: "gi-03-reflexos-gi",
    trackId: "gi",
    front: "Como se divide a inervação do reflexo da defecação entre intrínseco, parassimpático e somático?",
    back: "Distensão retal ativa reflexo mioentérico local (fraco), amplificado pelo parassimpático sacral (S2–S4, nervos pélvicos) que contrai reto/cólon e relaxa o esfíncter interno. O esfíncter anal externo é somático voluntário via nervo pudendo.",
    clinicalTip: "Lesão acima da medula sacral preserva o arco reflexo sacral automático, mas perde o controle voluntário cortical sobre o pudendo.",
  },

  // Tópico 4: Digestão e Absorção
  {
    id: "fc-10",
    topicId: "gi-04-digestao-absorcao",
    trackId: "gi",
    front: "Quais transportadores levam glicose, galactose e frutose da luz intestinal até o sangue?",
    back: "Apical: Glicose e Galactose entram via SGLT1 (cotransporte com Na+); Frutose entra via GLUT5 (difusão facilitada). Basolateral: todos os três saem para o sangue portal via GLUT2.",
    clinicalTip: "O SGLT1 permanece funcional na diarreia secretória da cólera — base fisiológica do soro de reidratação oral (Na+ + glicose).",
  },
  {
    id: "fc-11",
    topicId: "gi-04-digestao-absorcao",
    trackId: "gi",
    front: "Por que lipídios de cadeia longa precisam de colipase, micelas e quilomícrons para chegar à circulação?",
    back: "Colipase ancora a lipase pancreática apesar dos sais biliares; micelas cruzam a camada aquosa até o enterócito; após reesterificação no REL, triglicerídeos são empacotados com ApoB-48 em quilomícrons e drenados pela linfa (vasos quilíferos).",
    clinicalTip: "Ácidos graxos de cadeia média (< 10–12 carbonos) são hidrossolúveis o bastante para ir direto ao sangue portal sem quilomícrons.",
  },
  {
    id: "fc-12",
    topicId: "gi-04-digestao-absorcao",
    trackId: "gi",
    front: "Onde são absorvidos preferencialmente: (1) Ferro, (2) Cálcio, (3) Vitamina B12 e (4) Di/tripeptídeos?",
    back: "Ferro e Cálcio: duodeno (Fe2+ via DMT1; Ca2+ dependente de calcitriol). Vitamina B12 + Fator Intrínseco: íleo terminal. Di/tripeptídeos: duodeno/jejuno via PepT1 acoplado a H+.",
    clinicalTip: "Doença celíaca afeta duodeno/jejuno proximal → deficiência precoce de ferro e cálcio; Doença de Crohn ileal → falta de B12 e sais biliares.",
  },

  // Tópico 5: Fígado e Vias Biliares
  {
    id: "fc-13",
    topicId: "gi-05-figado-vias-biliares",
    trackId: "gi",
    front: "Qual porcentagem dos sais biliares é reciclada na circulação entero-hepática e onde ela ocorre?",
    back: "Cerca de 95% dos sais biliares são reabsorvidos ativamente no ÍLEO TERMINAL (transportador ASBT) e retornam pela veia porta ao fígado, reciclando 2–3 vezes por refeição.",
    clinicalTip: "Os 5% perdidos nas fezes representam a principal via de eliminação de colesterol do organismo.",
  },
  {
    id: "fc-14",
    topicId: "gi-05-figado-vias-biliares",
    trackId: "gi",
    front: "Por que a obstrução biliar causa colúria e acolia fecal, enquanto a hemólise não causa colúria?",
    back: "Na obstrução biliar reflui bilirrubina DIRETA (conjugada, hidrossolúvel), que filtra no rim (colúria) e não chega ao intestino (sem estercobilina = acolia). Na hemólise sobe bilirrubina INDIRETA ligada à albumina, que não filtra no glomérulo.",
    clinicalTip: "A enzima limitante da conjugação hepática é a UDP-glicuronil transferase (reduzida na síndrome de Gilbert e em recém-nascidos).",
  },
  {
    id: "fc-15",
    topicId: "gi-05-figado-vias-biliares",
    trackId: "gi",
    front: "O que acontece na vesícula biliar e no esfíncter de Oddi após uma refeição gordurosa?",
    back: "Ácidos graxos no duodeno estimulam células I a secretar CCK, que provoca contração vigorosa da vesícula biliar E relaxamento simultâneo do esfíncter de Oddi, jorrando bile no duodeno.",
    clinicalTip: "No jejum, o esfíncter de Oddi fica fechado e a vesícula concentra a bile até 5–20x absorvendo NaCl e água.",
  },

  // Tópico 6: Fisiologia Renal I
  {
    id: "fc-16",
    topicId: "renal-01-filtracao-tubulos",
    trackId: "renal",
    front: "Qual o efeito da constrição isolada e moderada da arteríola aferente vs. eferente sobre a TFG?",
    back: "Constrição AFERENTE reduz pressão capilar glomerular (PGC) e cai TFG. Constrição EFERENTE moderada aumenta PGC e eleva/sustenta a TFG (embora constrição severa reduza FPR e eleve demais πGC).",
    clinicalTip: "A Angiotensina II contrai preferencialmente a arteríola eferente para proteger a TFG em quedas leves de PA.",
  },
  {
    id: "fc-17",
    topicId: "renal-01-filtracao-tubulos",
    trackId: "renal",
    front: "Explique como a Mácula Densa executa o feedback tubuloglomerular quando a TFG sobe demais.",
    back: "Mais NaCl chega ao TCD inicial → entra na mácula densa via NKCC2 → libera ATP/adenosina → contrai a arteríola aferente → reduz PGC e normaliza a TFG.",
    clinicalTip: "Inibidores de SGLT2 aumentam a entrega de Na+ à mácula densa no diabetes, restaurando o feedback e reduzindo a hiperfiltração glomerular.",
  },
  {
    id: "fc-18",
    topicId: "renal-01-filtracao-tubulos",
    trackId: "renal",
    front: "Por que a Inulina mede TFG e o PAH mede Fluxo Plasmático Renal Efetivo?",
    back: "Inulina é livremente filtrada e NÃO é reabsorvida nem secretada (Cx = TFG ≈ 125 mL/min). PAH em baixa concentração é filtrado e 100% secretado no TCP pelos transportadores OAT (Cx = FPR ≈ 625 mL/min).",
    clinicalTip: "Se Clearance(X) < TFG, há reabsorção líquida; se Clearance(X) > TFG, há secreção tubular líquida.",
  },

  // Tópico 7: Fisiologia Renal II
  {
    id: "fc-19",
    topicId: "renal-02-concentracao-miccao",
    trackId: "renal",
    front: "Qual a permeabilidade à água e ao sal nos dois ramos da Alça de Henle?",
    back: "Ramo descendente fino: muito permeável à água (AQP1), impermeável a solutos (urina concentra até 1200 mOsm/L). Ramo ascendente espesso: IMPERMEÁVEL à água e bombeia ativamente Na+-K+-2Cl− via NKCC2 (fluido chega ao TCD a ~100 mOsm/L).",
    clinicalTip: "A furosemida inibe o NKCC2 no ramo ascendente espesso, destruindo o gradiente medular.",
  },
  {
    id: "fc-20",
    topicId: "renal-02-concentracao-miccao",
    trackId: "renal",
    front: "Como ADH e Aldosterona atuam no ducto coletor e em quais células?",
    back: "Ambos atuam nas células principais: ADH liga-se ao receptor V2 (AMPc) e insere Aquaporina-2 apical para reabsorver água; Aldosterona aumenta canais ENaC (reabsorve Na+) e ROMK + Na+/K+-ATPase (secreta K+).",
    clinicalTip: "Espironolactona bloqueia o receptor de aldosterona → poupa K+ e reduz excreção de Na+ e H+.",
  },
  {
    id: "fc-21",
    topicId: "renal-02-concentracao-miccao",
    trackId: "renal",
    front: "Resuma o comando autonômico da bexiga durante enchimento vs. micção.",
    back: "Enchimento: Simpático (T11–L2) relaxa detrusor (beta-3) e fecha esfíncter interno (alfa-1). Micção: Parassimpático (S2–S4) contrai detrusor (M3) e relaxa esfíncter interno; nervo pudendo relaxa voluntariamente o esfíncter externo.",
    clinicalTip: "Antimuscarínicos (oxibutinina) relaxam o detrusor na bexiga hiperativa bloqueando M3.",
  },

  // Tópico 8: Equilíbrio Ácido-Base
  {
    id: "fc-22",
    topicId: "renal-03-acido-base",
    trackId: "renal",
    front: "Qual é a Fórmula de Winter e para que ela serve na gasometria?",
    back: "PaCO2 esperada = 1,5 × HCO3− + 8 (± 2 mmHg). Serve para checar se a compensação respiratória numa acidose metabólica está adequada ou se há distúrbio respiratório misto associado.",
    clinicalTip: "Exemplo rápido: se HCO3− = 12 mEq/L, PaCO2 esperada = 1,5(12)+8 = 26 ± 2 (24–28 mmHg).",
  },
  {
    id: "fc-23",
    topicId: "renal-03-acido-base",
    trackId: "renal",
    front: "Como calcular o Ânion Gap e o que diferencia AG elevado de AG normal?",
    back: "AG = Na+ − (Cl− + HCO3−) | Normal: 8–12 mEq/L. AG elevado = ganho de ácidos orgânicos/fixos (cetoacidose, lactato, uremia, intoxicações). AG normal (hiperclorêmica) = perda direta de HCO3− (diarreia, ATR).",
    clinicalTip: "Na diarreia perde-se HCO3− e o rim retém Cl− para manter eletroneutralidade → AG normal.",
  },
  {
    id: "fc-24",
    topicId: "renal-03-acido-base",
    trackId: "renal",
    front: "Como o rim gera 'bicarbonato novo' para compensar uma acidose?",
    back: "Reabsorvendo quase 100% do HCO3− filtrado (via NHE3/anidrase carbônica) e excretando H+ ligado a tampões urinários que não sejam HCO3−: fosfato (acidez titulável) e principalmente amônia (NH4+ produzido da glutamina no TCP).",
    clinicalTip: "Cada H+ excretado como NH4+ ou H2PO4− devolve 1 molécula de HCO3− novo para o sangue.",
  },

  // Tópico 9: Eixo Hipotálamo-Hipofisário
  {
    id: "fc-25",
    topicId: "endo-01-hipotalamo-hipofise",
    trackId: "endocrino",
    front: "Por que a secção da haste hipofisária reduz TSH, ACTH, GH, LH e FSH, mas ELEVA a Prolactina?",
    back: "Porque os 5 primeiros dependem de hormônios hipotalâmicos estimuladores (TRH, CRH, GHRH, GnRH) via sistema porta, enquanto a Prolactina sofre INIBIÇÃO tônica contínua pela Dopamina hipotalâmica.",
    clinicalTip: "Antipsicóticos antagonistas de receptores D2 bloqueiam a dopamina na hipófise e causam hiperprolactinemia + galactorreia.",
  },
  {
    id: "fc-26",
    topicId: "endo-01-hipotalamo-hipofise",
    trackId: "endocrino",
    front: "Onde são sintetizados e onde são liberados o ADH e a Ocitocina?",
    back: "Sintetizados nos corpos neuronais do hipotálamo (núcleo supraóptico → mais ADH; núcleo paraventricular → mais ocitocina) e transportados pelos axônios até a neuro-hipófise, que apenas os armazena e secreta.",
    clinicalTip: "Os hormônios peptídicos usam receptores de membrana (segundos mensageiros); esteroides e T3/T4 agem em receptores nucleares.",
  },
  {
    id: "fc-27",
    topicId: "endo-01-hipotalamo-hipofise",
    trackId: "endocrino",
    front: "Qual a diferença entre administração pulsátil vs. contínua de GnRH?",
    back: "GnRH pulsátil (fisiológico) estimula síntese e liberação de LH e FSH. GnRH contínuo (ex.: análogo de depósito) causa dessensibilização/downregulation dos receptores nos gonadotrofos e bloqueia o eixo.",
    clinicalTip: "Análogos contínuos de GnRH são usados clinicamente para bloquear puberdade precoce ou câncer de próstata hormônio-dependente.",
  },

  // Tópico 10: Tireoide e Paratireoide
  {
    id: "fc-28",
    topicId: "endo-02-tireoide-paratireoide",
    trackId: "endocrino",
    front: "Quais etapas da síntese de T3/T4 são catalisadas pela Tireoperoxidase (TPO)?",
    back: "Oxidação do iodeto (I− → I0), organificação (ligação do iodo às tirosinas da tireoglobulina formando MIT e DIT) e acoplamento (MIT+DIT = T3; DIT+DIT = T4).",
    clinicalTip: "O TSH estimula captação de iodeto (NIS), TPO e endocitose do coloide.",
  },
  {
    id: "fc-29",
    topicId: "endo-02-tireoide-paratireoide",
    trackId: "endocrino",
    front: "Compare os efeitos plasmáticos líquidos do PTH vs. Calcitriol (Vitamina D ativa) sobre Ca2+ e Fosfato.",
    back: "PTH: SOBE Ca2+ (osso, TCD, ativa calcitriol) e BAIXA Fosfato (inibe reabsorção de PO4 no TCP). Calcitriol: SOBE Ca2+ E SOBE Fosfato (aumenta absorção intestinal de ambos).",
    clinicalTip: "Hiperparatireoidismo primário clássico = Hipercalcemia + Hipofosfatemia + PTH elevado.",
  },
  {
    id: "fc-30",
    topicId: "endo-02-tireoide-paratireoide",
    trackId: "endocrino",
    front: "Por que o hipertireoidismo causa taquicardia, tremores e intolerância ao calor?",
    back: "T3 aumenta expressão de Na+/K+-ATPase (termogênese e consumo de O2) e promove upregulation de receptores beta-1 adrenérgicos no miocárdio, amplificando a sensibilidade às catecolaminas.",
    clinicalTip: "Beta-bloqueadores (propranolol) aliviam rápido os sintomas adrenérgicos da crise tireotóxica e ainda reduzem conversão T4 → T3.",
  },

  // Tópico 11: Pâncreas Endócrino e Adrenal
  {
    id: "fc-31",
    topicId: "endo-03-pancreas-adrenal",
    trackId: "endocrino",
    front: "Descreva a cascata elétrica da célula beta pancreática desde a entrada de glicose até a exocitose de insulina.",
    back: "Glicose entra pelo GLUT2 → fosforilada pela glicoquinase → ↑ ATP → fecha canais K+ATP → despolarização → abre canais de Ca2+ voltagem-dependentes → influxo de Ca2+ dispara exocitose de insulina + peptídeo C.",
    clinicalTip: "Sulfonilureias (glibenclamida) fecham diretamente o canal K+ATP, estimulando liberação de insulina mesmo sem glicose alta.",
  },
  {
    id: "fc-32",
    topicId: "endo-03-pancreas-adrenal",
    trackId: "endocrino",
    front: "Quais são as 3 zonas do córtex adrenal (de fora para dentro) e seus principais hormônios?",
    back: "1) Glomerulosa → Aldosterona (via Ang II / K+); 2) Fasciculada → Cortisol (via ACTH); 3) Reticulada → Andrógenos adrenais / DHEA (via ACTH).",
    clinicalTip: "A medula adrenal produz adrenalina (~80%) porque o cortisol cortical induz a enzima PNMT ao atravessar o sistema porta adrenal.",
  },
  {
    id: "fc-33",
    topicId: "endo-03-pancreas-adrenal",
    trackId: "endocrino",
    front: "Por que na cetoacidose diabética há hiperglicemia, lipólise intensa e cetonemia?",
    back: "Falta de insulina impede captação de glicose via GLUT4 (músculo/adiposo) e libera a lipase hormônio-sensível → fluxo maciço de ácidos graxos ao fígado; com glucagon elevado, o fígado oxida esses ácidos em corpos cetônicos.",
    clinicalTip: "A acidose metabólica resultante tem Ânion Gap elevado e estimula hiperventilação compensatória (respiração de Kussmaul).",
  },

  // Tópico 12: Fisiologia Hormonal Masculina
  {
    id: "fc-34",
    topicId: "endo-04-hormonal-masculina",
    trackId: "endocrino",
    front: "Qual é a divisão de trabalho entre células de Leydig e células de Sertoli no testículo?",
    back: "Leydig (interstício, respondem ao LH): produzem Testosterona. Sertoli (túbulos seminíferos, respondem ao FSH + testosterona local): sustentam espermatogênese, formam barreira hematotesticular e secretam ABP e Inibina B.",
    clinicalTip: "A Inibina B faz feedback negativo seletivo no FSH sem bloquear o LH.",
  },
  {
    id: "fc-35",
    topicId: "endo-04-hormonal-masculina",
    trackId: "endocrino",
    front: "Compare as ações da Testosterona, do DHT (5-alfa-redutase) e do Estradiol (aromatase) no homem.",
    back: "Testosterona: ductos de Wolff, massa muscular, feedback negativo, espermatogênese. DHT: virilização da genitália externa fetal, crescimento prostático, pelos faciais/calvície. Estradiol: fechamento epifisário e densidade óssea.",
    clinicalTip: "Finasterida inibe a 5-alfa-redutase, reduzindo DHT na próstata e no couro cabeludo sem derrubar testosterona.",
  },
  {
    id: "fc-36",
    topicId: "endo-04-hormonal-masculina",
    trackId: "endocrino",
    front: "Por que o uso exógeno de testosterona causa redução da contagem de espermatozoides e atrofia testicular?",
    back: "Testosterona exógena suprime GnRH, LH e FSH por feedback negativo. Sem FSH nas células de Sertoli e sem alta testosterona intratesticular (100x maior que no plasma) vinda das células de Leydig, a espermatogênese para.",
    clinicalTip: "A testosterona sérica fica alta, mas a concentração intratesticular despenca!",
  },

  // Tópico 13: Fisiologia Hormonal Feminina
  {
    id: "fc-37",
    topicId: "endo-05-hormonal-feminina",
    trackId: "endocrino",
    front: "Explique a teoria das duas células–duas gonadotrofinas na síntese ovariana de estradiol.",
    back: "Sob estímulo do LH, a célula da TECA produz andrógenos (androstenediona/testosterona). Eles se difundem para a GRANULOSA, onde o FSH induz a aromatase para convertê-los em Estradiol.",
    clinicalTip: "Na síndrome dos ovários policísticos (SOP), excesso de LH eleva andrógenos tecais mais rápido do que a granulosa consegue aromatizar.",
  },
  {
    id: "fc-38",
    topicId: "endo-05-hormonal-feminina",
    trackId: "endocrino",
    front: "O que dispara o pico de LH responsável pela ovulação por volta do 14º dia?",
    back: "Quando o folículo dominante produz níveis altos e sustentados de Estradiol (> ~200 pg/mL por ~36–48h), o feedback na hipófise/hipotálamo inverte de negativo para FEEDBACK POSITIVO, gerando o pico de LH.",
    clinicalTip: "A ovulação acontece ~12–24h após o pico de LH (e ~24–36h após o pico de estradiol).",
  },
  {
    id: "fc-39",
    topicId: "endo-05-hormonal-feminina",
    trackId: "endocrino",
    front: "Qual hormônio domina a fase proliferativa vs. a fase secretora do endométrio, e o que causa a menstruação?",
    back: "Fase proliferativa: Estradiol (regeneração e glândulas retas). Fase secretora: Progesterona do corpo lúteo (glândulas tortuosas com glicogênio e artérias espiraladas). Menstruação ocorre pela queda abrupta de progesterona/estradiol após luteólise.",
    clinicalTip: "A fase lútea dura quase sempre ~14 dias; ciclos de 35 dias têm fase folicular de ~21 dias.",
  },

  // Tópico 14: Gravidez, Parto e Lactação
  {
    id: "fc-40",
    topicId: "endo-06-gravidez-lactacao",
    trackId: "endocrino",
    front: "Qual o papel do hCG nas primeiras 8–10 semanas de gestação e qual unidade feto-placentária produz estriol?",
    back: "O hCG (sinciciotrofoblasto) liga-se ao receptor de LH no corpo lúteo para impedir a luteólise e manter progesterona até a transição lúteo-placentária. O estriol placentário é sintetizado a partir de DHEA-S produzido pela adrenal fetal.",
    clinicalTip: "Progesterona alta mantém a quiescência uterina reduzindo excitabilidade miometrial e formação de junções comunicantes.",
  },
  {
    id: "fc-41",
    topicId: "endo-06-gravidez-lactacao",
    trackId: "endocrino",
    front: "Descreva o Reflexo de Ferguson durante o trabalho de parto.",
    back: "A descida/pressão da cabeça fetal distende o colo uterino → vias aferentes ativam o hipotálamo → liberação de Ocitocina pela neuro-hipófise → contrações uterinas mais fortes → maior distensão cervical (feedback positivo) até o nascimento.",
    clinicalTip: "Prostaglandinas (PGE2/PGF2α) e o aumento da relação estrogênio/progesterona sensibilizam o miométrio aumentando receptores de ocitocina.",
  },
  {
    id: "fc-42",
    topicId: "endo-06-gravidez-lactacao",
    trackId: "endocrino",
    front: "Por que a lactação abundante só inicia após o parto, e qual a diferença entre Prolactina e Ocitocina na amamentação?",
    back: "Na gravidez, níveis altos de estrogênio e progesterona placentários bloqueiam a ação secretora da prolactina na mama; após o parto esses esteroides despencam. Prolactina (adeno-hipófise) SINTETIZA o leite; Ocitocina (neuro-hipófise) EJETA o leite.",
    clinicalTip: "A sucção do mamilo inibe dopamina hipotalâmica (sobe prolactina) e dispara o reflexo de ejeção de ocitocina.",
  },
];
