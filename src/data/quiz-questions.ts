import type { TrackId } from "./physiology-tracks";

export interface QuizQuestion {
  readonly id: string;
  readonly topicId: string;
  readonly trackId: TrackId;
  readonly difficulty: "media" | "dificil";
  readonly prompt: string;
  readonly options: readonly [string, string, string, string];
  readonly correctIndex: 0 | 1 | 2 | 3;
  readonly explanation: string;
}

export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  // Tópico 1
  {
    id: "q-01",
    topicId: "gi-01-secrecoes",
    trackId: "gi",
    difficulty: "media",
    prompt:
      "Durante um teste de secreção salivar sob estímulo parassimpático intenso (alto fluxo), comparada à saliva basal de repouso, a saliva final colhida na boca apresenta:",
    options: [
      "Menor osmolaridade e menor concentração de Na+ e Cl−",
      "Maior concentração de Na+, Cl− e HCO3−, aproximando-se da isotonicidade do plasma",
      "Aumento acentuado da concentração de K+ acima da concentração basal",
      "Inversão do transporte acinar com secreção primária hipertônica",
    ],
    correctIndex: 1,
    explanation:
      "O ácino secreta saliva primária isotônica. Em alto fluxo há menos tempo de contato com os ductos estriados para reabsorver Na+ e Cl−; logo, mais Na+, Cl− e HCO3− permanecem na saliva final, tornando-a menos hipotônica (mais próxima do plasma).",
  },
  {
    id: "q-02",
    topicId: "gi-01-secrecoes",
    trackId: "gi",
    difficulty: "dificil",
    prompt:
      "Um paciente apresenta esteatorreia e deficiência de secreção alcalina pancreática em resposta à chegada de quimo ácido ao duodeno, apesar de células acinares preservadas. A falha está ligada diretamente ao eixo:",
    options: [
      "Gastrina → células principais gástricas",
      "CCK → contração da vesícula biliar",
      "Secretina → células ductais pancreáticas (CFTR / HCO3−)",
      "Motilina → complexo motor migratório",
    ],
    correctIndex: 2,
    explanation:
      "O ácido duodenal (pH < 4,5) estimula as células S a secretar Secretina, que induz as células ductais pancreáticas a secretar fluido rico em HCO3− dependente do canal CFTR (clássico na fibrose cística).",
  },

  // Tópico 2
  {
    id: "q-03",
    topicId: "gi-02-degluticao-motilidade",
    trackId: "gi",
    difficulty: "media",
    prompt:
      "Na acalasia esofágica, há disfagia progressiva por falha de relaxamento do esfíncter esofágico inferior (EEI) durante a deglutição. Esse relaxamento fisiológico depende fundamentalmente da liberação de:",
    options: [
      "Acetilcolina e Substância P pelo plexo submucoso",
      "Óxido Nítrico (NO) e VIP por neurônios inibitórios mioentéricos",
      "Gastrina e Histamina pelas células antrais",
      "Noradrenalina simpática sobre receptores alfa-1",
    ],
    correctIndex: 1,
    explanation:
      "O relaxamento do EEI na deglutição (assim como o relaxamento receptivo à frente do bolo na peristalse) é um fenômeno ativo mediado por neurônios entéricos inibitórios que liberam NO e VIP.",
  },
  {
    id: "q-04",
    topicId: "gi-02-degluticao-motilidade",
    trackId: "gi",
    difficulty: "dificil",
    prompt:
      "Sobre a eletrofisiologia do músculo liso gastrointestinal, é CORRETO afirmar que:",
    options: [
      "As ondas lentas são geradas por motoneurônios vagais e causam contração máxima a cada ciclo",
      "Os potenciais em espiga dependem principalmente de canais de K+ rápidos",
      "As células intersticiais de Cajal geram ondas lentas que definem a frequência máxima, enquanto os potenciais em espiga dependem de Ca2+ e produzem a contração",
      "O complexo motor migratório (MMC) é estimulado pela insulina logo após a refeição",
    ],
    correctIndex: 2,
    explanation:
      "As células de Cajal funcionam como marca-passo gerando ondas lentas (3/min no estômago, 12/min no duodeno). Quando atingem o limiar, disparam potenciais em espiga (influxo de Ca2+), produzindo contração muscular.",
  },

  // Tópico 3
  {
    id: "q-05",
    topicId: "gi-03-reflexos-gi",
    trackId: "gi",
    difficulty: "media",
    prompt:
      "Logo após tomar café da manhã, um paciente sente urgência para evacuar. A resposta colônica deflagrada pela distensão gástrica corresponde ao reflexo:",
    options: [
      "Enterogástrico, mediado exclusivamente por fibras simpáticas lombares",
      "Gastrocólico, que estimula movimentos de massa no cólon",
      "Intestino-intestinal, que paralisa o íleo terminal",
      "Gastroileal, que fecha o esfíncter anal interno",
    ],
    correctIndex: 1,
    explanation:
      "A distensão e os nutrientes no estômago ativam o reflexo gastrocólico (componentes neurais e hormonais como CCK/gastrina), aumentando os movimentos de massa no cólon.",
  },
  {
    id: "q-06",
    topicId: "gi-03-reflexos-gi",
    trackId: "gi",
    difficulty: "media",
    prompt:
      "Um lactente com constipação grave tem diagnóstico de doença de Hirschsprung (ausência congênita dos plexos de Auerbach e Meissner no retossigmoide). No segmento agangliônico observa-se:",
    options: [
      "Hiper-relaxamento contínuo por excesso de VIP",
      "Contração tônica e falha de relaxamento, causando dilatação a montante",
      "Aumento maciço da secreção de muco pelo plexo de Meissner",
      "Substituição das ondas lentas por peristaltismo secundário acelerado",
    ],
    correctIndex: 1,
    explanation:
      "Sem neurônios inibitórios mioentéricos (NO/VIP) no segmento agangliônico, a região permanece contraída e não relaxa diante do bolo fecal, gerando obstrução funcional e megacólon proximal.",
  },

  // Tópico 4
  {
    id: "q-07",
    topicId: "gi-04-digestao-absorcao",
    trackId: "gi",
    difficulty: "media",
    prompt:
      "Por que a solução de reidratação oral (SRO) usada em diarreias secretórias agudas combina água, cloreto de sódio e glicose?",
    options: [
      "A glicose inibe diretamente a adenilato ciclase da toxina colérica",
      "A glicose entra passivamente pelo GLUT5 e bloqueia os canais CFTR",
      "O cotransportador apical SGLT1 permanece intacto e promove absorção acoplada de Na+ e glicose, puxando água por osmose",
      "A glicose estimula o transporte via PepT1 no íleo terminal",
    ],
    correctIndex: 2,
    explanation:
      "Mesmo quando canais CFTR estão hiperativados secretando Cl−, o cotransportador Na+/glicose (SGLT1) nos enterócitos continua funcionante, permitindo absorção de Na+ e reabsorção osmótica de água.",
  },
  {
    id: "q-08",
    topicId: "gi-04-digestao-absorcao",
    trackId: "gi",
    difficulty: "dificil",
    prompt:
      "Após uma ressecção cirúrgica extensa do íleo terminal por doença de Crohn, quais duas deficiências ou alterações absortivas têm MAIOR probabilidade de surgir em médio/longo prazo?",
    options: [
      "Deficiência de ferro e intolerância à frutose",
      "Deficiência de vitamina B12 e esteatorreia por redução do pool de sais biliares",
      "Deficiência de absorção de peptídeos via PepT1 e anemia ferropriva",
      "Perda da absorção de ácidos graxos de cadeia curta no cólon",
    ],
    correctIndex: 1,
    explanation:
      "O íleo terminal é o sítio exclusivo da absorção do complexo vitamina B12 + fator intrínseco E o principal sítio da reabsorção ativa de ~95% dos sais biliares (circulação entero-hepática).",
  },

  // Tópico 5
  {
    id: "q-09",
    topicId: "gi-05-figado-vias-biliares",
    trackId: "gi",
    difficulty: "media",
    prompt:
      "Paciente com cálculo impactado no colédoco distal evolui com icterícia intensa, urina cor de coca-cola (colúria) e fezes esbranquiçadas (acolia fecal). Isso se explica porque:",
    options: [
      "A bilirrubina indireta tornou-se hidrossolúvel e passou a ser filtrada pelos glomérulos",
      "A bilirrubina direta (conjugada) refluiu para o sangue, filtrou na urina (colúria) e deixou de formar estercobilina no intestino (acolia)",
      "Houve bloqueio da enzima UDP-glicuronil transferase no sangue periférico",
      "A vesícula biliar passou a absorver toda a albumina plasmática",
    ],
    correctIndex: 1,
    explanation:
      "Na colestase, o hepatócito já conjugou a bilirrubina em bilirrubina direta (hidrossolúvel). Impedida de sair pela bile, ela reflui ao plasma e é filtrada pelo rim (colúria), enquanto a ausência intestinal zera a estercobilina (acolia).",
  },
  {
    id: "q-10",
    topicId: "gi-05-figado-vias-biliares",
    trackId: "gi",
    difficulty: "media",
    prompt:
      "Em relação ao fluxo sanguíneo e biliar no lóbulo hepático clássico, assinale a alternativa CORRETA:",
    options: [
      "O sangue arterial e o venoso portal caminham da veia centrolobular para a tríade portal",
      "A bile produzida pelos hepatócitos flui da veia centrolobular em direção aos ductos biliares da tríade portal",
      "A veia porta fornece apenas 20% do fluxo sanguíneo hepático total",
      "As células de Kupffer concentram a bile dentro da vesícula biliar",
    ],
    correctIndex: 1,
    explanation:
      "Nos sinusoides hepáticos, o sangue (75% veia porta + 25% artéria hepática) flui da tríade portal para a veia centrolobular, enquanto a bile segue sentido oposto pelos canalículos até os ductos da tríade portal.",
  },

  // Tópico 6
  {
    id: "q-11",
    topicId: "renal-01-filtracao-tubulos",
    trackId: "renal",
    difficulty: "dificil",
    prompt:
      "Um paciente com estenose crítica bilateral das artérias renais inicia um inibidor da ECA (enalapril) e evolui com queda abrupta da TFG e elevação da creatinina. Qual o mecanismo fisiológico envolvido?",
    options: [
      "O bloqueio da Angiotensina II dilata a arteríola eferente, derrubando a pressão hidrostática capilar glomerular (PGC)",
      "O enalapril contrai intensamente a arteríola aferente via mácula densa",
      "A queda de aldosterona fecha as aquaporinas-1 do túbulo proximal",
      "O bloqueio da bradicinina aumenta a pressão na cápsula de Bowman",
    ],
    correctIndex: 0,
    explanation:
      "Quando a perfusão renal cai, a Angiotensina II contrai preferencialmente a arteríola eferente para sustentar a PGC e a TFG. Ao bloquear sua formação com IECA, a arteríola eferente dilata e a PGC cai bruscamente.",
  },
  {
    id: "q-12",
    topicId: "renal-01-filtracao-tubulos",
    trackId: "renal",
    difficulty: "media",
    prompt:
      "Uma substância X é livremente filtrada pelo glomérulo e apresenta clearance renal de 40 mL/min, enquanto o clearance simultâneo de inulina é 120 mL/min. Conclui-se que a substância X sofre:",
    options: [
      "Secreção tubular líquida superior à filtração",
      "Nem reabsorção nem secreção nos túbulos",
      "Reabsorção tubular líquida ao longo do néfron",
      "Ligação de 100% à albumina plasmática impedindo sua filtração",
    ],
    correctIndex: 2,
    explanation:
      "Se o clearance da substância X (40 mL/min) é menor que a TFG medida pela inulina (120 mL/min) e ela é livremente filtrada, parte do que filtrou foi reabsorvida pelos túbulos.",
  },

  // Tópico 7
  {
    id: "q-13",
    topicId: "renal-02-concentracao-miccao",
    trackId: "renal",
    difficulty: "dificil",
    prompt:
      "Qual será o impacto direto da administração de furosemida (inibidor do NKCC2 no ramo ascendente espesso da alça de Henle) sobre o mecanismo de concentração urinária?",
    options: [
      "Aumenta a hiperosmolaridade da medula interna para 1500 mOsm/L",
      "Impede o bombeamento de NaCl sem água na alça espessa, dissipando o gradiente osmótico corticomedular",
      "Bloqueia a inserção de aquaporina-2 no túbulo proximal",
      "Estimula a reciclagem de ureia aumentando o ADH endógeno",
    ],
    correctIndex: 1,
    explanation:
      "O 'efeito único' que gera o gradiente medular de 300 a 1200 mOsm/L é o transporte ativo de Na+-K+-2Cl− (NKCC2) no ramo ascendente espesso impermeável à água. Inibi-lo colapsa o gradiente.",
  },
  {
    id: "q-14",
    topicId: "renal-02-concentracao-miccao",
    trackId: "renal",
    difficulty: "media",
    prompt:
      "Após lesão medular traumática na altura de T6 (acima do centro sacral S2–S4), um paciente desenvolve bexiga neurogênica espástica (reflexo de micção preservado, mas sem controle consciente). Isso ocorre porque:",
    options: [
      "O nervo pudendo assume a contração do detrusor de forma autônoma",
      "O arco reflexo parassimpático sacral (S2–S4) permanece íntegro na medula, porém desconectado das vias inibitórias corticais e pontinas",
      "O simpático T11–L2 passa a contrair o músculo detrusor via receptores beta-3",
      "A aldosterona passa a controlar diretamente o esfíncter uretral externo",
    ],
    correctIndex: 1,
    explanation:
      "Lesões suprassacrais interrompem a modulação consciente e do centro pontino, mas deixam intacto o arco reflexo sacral (S2–S4) que dispara contração do detrusor ao estiramento vesical.",
  },

  // Tópico 8
  {
    id: "q-15",
    topicId: "renal-03-acido-base",
    trackId: "renal",
    difficulty: "dificil",
    prompt:
      "Gasometria de paciente com diarreia aquosa grave: pH = 7,26 | PaCO2 = 28 mmHg | HCO3− = 12 mEq/L | Na+ = 138 | Cl− = 116. Aplicando a Fórmula de Winter e o Ânion Gap, qual é o diagnóstico?",
    options: [
      "Acidose metabólica com Ânion Gap normal (hiperclorêmica), adequadamente compensada",
      "Acidose metabólica com Ânion Gap elevado e acidose respiratória associada",
      "Acidose respiratória aguda com compensação renal completa",
      "Alcalose metabólica mista com Ânion Gap normal",
    ],
    correctIndex: 0,
    explanation:
      "Winter: PaCO2 esperada = 1,5 × 12 + 8 ± 2 = 24 a 28 mmHg (medida = 28, compensação adequada!). AG = 138 − (116 + 12) = 10 mEq/L (normal: 8–12), compatível com perda de HCO3− na diarreia.",
  },
  {
    id: "q-16",
    topicId: "renal-03-acido-base",
    trackId: "renal",
    difficulty: "media",
    prompt:
      "Em uma acidose metabólica crônica, qual é o principal mecanismo renal para gerar NOVO bicarbonato e restaurar as reservas alcalinas do organismo?",
    options: [
      "Excreção de bicarbonato livre junto com sódio no túbulo proximal",
      "Amoniogênese proximal a partir da glutamina com excreção urinária de NH4+ e acidez titulável",
      "Redução da atividade da H+-ATPase nas células intercaladas alfa",
      "Inibição da anidrase carbônica no ducto coletor",
    ],
    correctIndex: 1,
    explanation:
      "A reabsorção de HCO3− apenas evita perdas; para gerar HCO3− novo e repor o tamponado, o rim precisa excretar H+ na forma de acidez titulável (fosfato) e sobretudo NH4+.",
  },

  // Tópico 9
  {
    id: "q-17",
    topicId: "endo-01-hipotalamo-hipofise",
    trackId: "endocrino",
    difficulty: "media",
    prompt:
      "Um macroadenoma comprime a haste hipofisária, bloqueando o fluxo do sistema porta hipotálamo-hipofisário. Qual alteração hormonal é tipicamente esperada?",
    options: [
      "Elevação de TSH e ACTH com queda de Prolactina",
      "Queda de LH, FSH, TSH, ACTH e GH, acompanhada de ELEVAÇÃO da Prolactina",
      "Elevação isolada de ADH na adeno-hipófise",
      "Queda simultânea de todos os hormônios, inclusive da Prolactina",
    ],
    correctIndex: 1,
    explanation:
      "Sem dopamina chegando pelo sistema porta, os lactotrofos ficam desinibidos e a prolactina sobe. Já os demais hormônios adeno-hipofisários caem por falta dos fatores liberadores hipotalâmicos.",
  },
  {
    id: "q-18",
    topicId: "endo-01-hipotalamo-hipofise",
    trackId: "endocrino",
    difficulty: "media",
    prompt:
      "Sobre receptores e sinalização hormonal, qual par reúne um hormônio derivado de aminoácido que atua predominantemente em receptor NUCLEAR?",
    options: [
      "Adrenalina (catecolamina)",
      "Insulina (peptídico)",
      "Tri-iodotironina — T3 (tireoidiano)",
      "Hormônio do crescimento — GH (proteico)",
    ],
    correctIndex: 2,
    explanation:
      "Embora T3/T4 derivem da tirosina, eles são lipossolúveis e atravessam a membrana para ligar-se a receptores nucleares (TR), regulando a transcrição gênica assim como os hormônios esteroides.",
  },

  // Tópico 10
  {
    id: "q-19",
    topicId: "endo-02-tireoide-paratireoide",
    trackId: "endocrino",
    difficulty: "media",
    prompt:
      "Na investigação de um paciente assintomático com hipercalcemia persistente, encontra-se PTH elevado e fosfato sérico baixo. O fosfato está baixo porque o PTH:",
    options: [
      "Bloqueia a absorção intestinal de fosfato pela vitamina D",
      "Inibe os transportadores Na+/fosfato (NaPi-IIa) no túbulo proximal renal, promovendo fosfatúria",
      "Impede a saída de fosfato do osso durante a ação osteoclástica",
      "Estimula a secreção de calcitonina para quelar fosfato no plasma",
    ],
    correctIndex: 1,
    explanation:
      "Embora o PTH mobilize cálcio e fosfato do osso, no rim ele promove intensa excreção urinária de fosfato (no TCP) e reabsorção de cálcio (no TCD), resultando em cálcio alto e fosfato baixo.",
  },
  {
    id: "q-20",
    topicId: "endo-02-tireoide-paratireoide",
    trackId: "endocrino",
    difficulty: "dificil",
    prompt:
      "Na doença de Graves (autoanticorpos ativadores contra o receptor de TSH), qual perfil laboratorial é clássico e qual mecanismo explica a taquicardia em repouso?",
    options: [
      "TSH alto, T4 livre alto; estímulo direto do TSH sobre o nó sinoatrial",
      "TSH suprimido, T3/T4 elevados; upregulation de receptores beta-1 adrenérgicos cardíacos pelo T3",
      "TSH suprimido, T4 livre baixo; bloqueio da TPO pela tireoglobulina",
      "TSH normal, rT3 alto; queda da Na+/K+-ATPase miocárdica",
    ],
    correctIndex: 1,
    explanation:
      "Os anticorpos mimetizam o TSH, elevando T3/T4 que fazem forte feedback negativo nos tireotrofos (TSH suprimido). No coração, T3 aumenta receptores beta-1 e cadeia pesada alfa da miosina.",
  },

  // Tópico 11
  {
    id: "q-21",
    topicId: "endo-03-pancreas-adrenal",
    trackId: "endocrino",
    difficulty: "media",
    prompt:
      "Qual evento desencadeia diretamente o influxo de Ca2+ e a exocitose dos grânulos de insulina na célula beta pancreática após uma refeição?",
    options: [
      "Ativação de canais GLUT4 pelo glucagon parácrino",
      "Fechamento de canais de K+ sensíveis a ATP (K+ATP) pelo aumento intracelular de ATP, despolarizando a membrana",
      "Abertura de canais de Cl− por ação direta do cortisol",
      "Hiperpolarização da membrana causada pela saída de peptídeo C",
    ],
    correctIndex: 1,
    explanation:
      "O metabolismo da glicose (via GLUT2 e glicoquinase) eleva a razão ATP/ADP, fechando canais K+ATP; a despolarização abre canais de Ca2+ voltagem-dependentes, disparando a exocitose de insulina.",
  },
  {
    id: "q-22",
    topicId: "endo-03-pancreas-adrenal",
    trackId: "endocrino",
    difficulty: "dificil",
    prompt:
      "Comparando insuficiência adrenal primária (destruição autoimune do córtex) com insuficiência adrenal secundária (déficit hipofisário de ACTH), espera-se na secundária:",
    options: [
      "Hiperpigmentação cutânea grave e hipercalemia refratária",
      "Cortisol baixo e ACTH baixo, com secreção de aldosterona relativamente preservada pelo SRAA",
      "ACTH muito elevado tentando estimular a zona glomerulosa",
      "Elevação compensatória de DHEA na zona reticulada",
    ],
    correctIndex: 1,
    explanation:
      "A zona glomerulosa (aldosterona) é regulada principalmente pela Angiotensina II e pelo K+, e não pelo ACTH. Por isso, na deficiência central de ACTH há déficit de cortisol sem perda grave de aldosterona.",
  },

  // Tópico 12
  {
    id: "q-23",
    topicId: "endo-04-hormonal-masculina",
    trackId: "endocrino",
    difficulty: "media",
    prompt:
      "Um homem jovem usa testosterona exógena em altas doses para hipertrofia e desenvolve azoospermia e redução do volume testicular. Qual eixo explica esse achado?",
    options: [
      "Aumento reflexo de FSH e Inibina B destruindo as células de Leydig",
      "Feedback negativo suprimindo GnRH, LH e FSH, com queda drástica da testosterona intratesticular",
      "Bloqueio da 5-alfa-redutase no epidídimo",
      "Conversão total da testosterona exógena em progesterona nas células de Sertoli",
    ],
    correctIndex: 1,
    explanation:
      "A testosterona exógena inibe GnRH/LH/FSH. Sem estímulo de LH sobre Leydig e sem FSH sobre Sertoli, cai a concentração intratesticular de testosterona necessária à espermatogênese.",
  },
  {
    id: "q-24",
    topicId: "endo-04-hormonal-masculina",
    trackId: "endocrino",
    difficulty: "media",
    prompt:
      "Em indivíduos XY com deficiência genética da enzima 5-alfa-redutase tipo 2, observa-se desenvolvimento normal de epidídimo e ductos deferentes, porém genitália externa pouco virilizada ao nascimento. Por quê?",
    options: [
      "Os ductos de Wolff respondem diretamente à testosterona, enquanto a genitália externa e a próstata exigem conversão em DHT",
      "Falta FSH na vida embrionária para estimular as células de Leydig",
      "O estradiol fetal bloqueia os receptores de LH",
      "A proteína ABP impede a ação da testosterona nos tecidos periféricos",
    ],
    correctIndex: 0,
    explanation:
      "Testosterona sustenta a diferenciação dos ductos de Wolff (epidídimo, deferente, vesícula seminal), mas a virilização da genitália externa e o desenvolvimento prostático dependem da potência maior do DHT.",
  },

  // Tópico 13
  {
    id: "q-25",
    topicId: "endo-05-hormonal-feminina",
    trackId: "endocrino",
    difficulty: "dificil",
    prompt:
      "Durante a transição da fase folicular tardia para a ovulação, qual evento endócrino desencadeia diretamente o pico ovulatório de LH?",
    options: [
      "Queda súbita da progesterona secretada pelo corpo lúteo",
      "Elevação sustentada do estradiol (> ~200 pg/mL por ~36–48h) invertendo o controle para feedback positivo na hipófise/hipotálamo",
      "Secreção de Inibina B pelas células da teca interna",
      "Estímulo contínuo de hCG sobre a granulosa",
    ],
    correctIndex: 1,
    explanation:
      "Na fase folicular inicial o estradiol exerce feedback negativo; porém, quando atinge concentrações altas e sustentadas no pico pré-ovulatório, muda para feedback positivo e dispara o pico de LH.",
  },
  {
    id: "q-26",
    topicId: "endo-05-hormonal-feminina",
    trackId: "endocrino",
    difficulty: "media",
    prompt:
      "Uma paciente apresenta ciclos menstruais regulares de 34 dias. Assumindo fisiologia lútea típica, em que dia aproximado do ciclo ocorre a ovulação?",
    options: [
      "Dia 14, pois a fase folicular é sempre fixa em 14 dias",
      "Dia 20, pois a fase lútea é relativamente fixa em ~14 dias",
      "Dia 28, logo antes da queda da progesterona",
      "Dia 7, quando a aromatase inicia na teca interna",
    ],
    correctIndex: 1,
    explanation:
      "A fase lútea dura de forma bastante constante cerca de 14 dias (vida programada do corpo lúteo sem hCG). Logo, em um ciclo de 34 dias, a ovulação ocorre por volta do dia 34 − 14 = dia 20.",
  },

  // Tópico 14
  {
    id: "q-27",
    topicId: "endo-06-gravidez-lactacao",
    trackId: "endocrino",
    difficulty: "media",
    prompt:
      "Por que uma gestante no 8º mês apresenta prolactina sérica 10 vezes acima do valor basal, mas ainda não produz secreção copiosa de leite antes do nascimento?",
    options: [
      "A dopamina placentária destrói o leite produzido nos ductos",
      "Altos níveis placentários de estrogênio e progesterona bloqueiam o efeito secretor da prolactina nos alvéolos mamários até a dequitação da placenta",
      "A ocitocina impede a síntese de caseína até o trabalho de parto",
      "O hPL bloqueia a neuro-hipófise durante toda a gestação",
    ],
    correctIndex: 1,
    explanation:
      "Estrogênio e progesterona preparam a mama (ductos e alvéolos), mas inibem a lactogênese plena. Quando a placenta é expulsa no parto, seus níveis caem abruptamente e a prolactina finalmente inicia a produção abundante de leite.",
  },
  {
    id: "q-28",
    topicId: "endo-06-gravidez-lactacao",
    trackId: "endocrino",
    difficulty: "media",
    prompt:
      "Sobre o controle hormonal da gestação e do parto, qual associação está CORRETA?",
    options: [
      "O hCG é produzido pela neuro-hipófise fetal para fechar o colo uterino",
      "O Reflexo de Ferguson representa um feedback positivo em que a distensão cervical estimula mais liberação de ocitocina",
      "O hPL aumenta a sensibilidade materna à insulina para causar hipoglicemia no feto",
      "A progesterona promove contrações rítmicas uterinas desde o 1º trimestre",
    ],
    correctIndex: 1,
    explanation:
      "O Reflexo de Ferguson é um exemplo clássico de feedback positivo: a distensão do colo pelo feto envia estímulos aferentes ao hipotálamo, liberando mais ocitocina e intensificando as contrações até o parto.",
  },
];
