import type { TrackId } from "./physiology-tracks";

export interface MimoMessageCatalog {
  readonly heroSubtitles: readonly string[];
  readonly onTopicOpen: readonly string[];
  readonly onTopicMastered: readonly string[];
  readonly onFlashcardStreak: readonly string[];
  readonly onQuizCorrect: readonly string[];
  readonly onQuizWrong: readonly string[];
  readonly onTrackComplete: Record<TrackId, string>;
  readonly comfortModalNotes: readonly string[];
}

export const MIMO_MESSAGES: MimoMessageCatalog = {
  heroSubtitles: [
    "Vai com calma, Med gata — um tópico de cada vez e sexta você brilha 💚",
    "Modo Sprint 48h ativado, Dra. Sophia: foco cirúrgico no que realmente cai na prova ✨",
    "Você já sobreviveu a coisa muito pior, amor — essa prova de Fisiologia é toda sua 💕",
    "Cada bloquinho revisado aqui é um ponto garantido no gabarito de sexta-feira, gatinha!",
    "Respira fundo, toma uma água e vem dominar GI, Renal e Endócrino comigo 🌸",
    "Do jeitinho mais leve possível para sua cabeça voar na sexta-feira, Sophia 💚",
  ],
  onTopicOpen: [
    "Bora, Dra. Sophia! Esse resumo foi lapidado pra cair direto na sua memória ✨",
    "Boa escolha, gatinha! Olha com carinho pras Pegadinhas de Prova lá embaixo 👀",
    "Foco total agora, amor — 20 minutinhos aqui valem ouro na sexta-feira 💚",
    "Med gata em ação! Lê o gancho de memória antes de fechar esse tópico 🧠",
    "Você está indo no ritmo perfeito, Sophia. Cada mecanismo entendido é segurança na prova!",
    "Se bater dúvida em algum eixo ou enzima, abre a aula do MK Fisiologia ali em 1 clique 🎬",
  ],
  onTopicMastered: [
    "AEEE, Sophia!! Mais um tópico carimbado como dominado, gatinha! 🎉💚",
    "Orgulho absurdo de você, amor! Menos um bloco na rota das 48h ✨",
    "Dra. Sophia não brinca em serviço — riscou mais um tópico com maestria 💕",
    "Olha essa Med gata voando!! Já pode dar aula desse assunto sexta-feira 🏆",
    "Top demais, gatinha! Hidrata aí e bora pro próximo passo da trilha 💧",
    "Mais um checklist verde pra conta da Sophia! Tá ficando imparável 💚",
  ],
  onFlashcardStreak: [
    "5 flashcards dominados na sequência, Med gata! Memória ativa trabalhando lindo ✨",
    "Uau, gatinha! Sua retenção tá absurda — assim sexta-feira vai ser passeio 💕",
    "Dra. Sophia no modo turbo! Mais 5 cartas pro bolso com segurança total 🧠",
    "Olha esse ritmo, amor!! Revisão ativa é o segredo das melhores notas 💚",
    "Imparável, Sophia! Continua puxando da memória que na prova sai no automático 🌟",
    "Show, gatinha! Já já esse baralho inteiro tá zerado com perfeição 🏆",
  ],
  onQuizCorrect: [
    "Acertou em cheio, Dra. Sophia! Raciocínio clínico de respeito 💚",
    "Gabarito garantido, Med gata! Nem a pegadinha da banca te pegou ✨",
    "Boaaa, amor! Isso aí é nível Guyton & Hall dominado 💕",
    "Perfeita, gatinha! Essa questão muita gente erra e você tirou de letra 🌟",
    "Olha ela amassando o simulado!! Continua nessa pegada, Sophia 🏆",
    "Certeira demais, amor! Seu raciocínio fisiológico tá afiadíssimo 🔥",
    "Mandou muito, Dra. Sophia! Mais um ponto cravado na prova de sexta 💪",
    "Brilhante, gatinha! Vai confiante porque você sabe muito mais do que imagina 💚",
  ],
  onQuizWrong: [
    "Ei, respira, amor 💕 Errar no treino hoje evita cair nessa pegadinha sexta-feira!",
    "Tudo bem, gatinha! Lê a explicação com carinho — erro de revisão vira acerto eterno 💚",
    "Sem estresse, Med gata! Essa questão é puxada mesmo; agora esse mecanismo não foge mais ✨",
    "Faz parte do sprint, Dra. Sophia! Marca esse detalhe na cabeça e segue firme 🌸",
    "Carinho aqui, amor: quem treina pesado no simulado chega tranquila na prova 💕",
    "Não desanima nem um segundo, gatinha! Cada erro corrigido agora vale ouro sexta 💛",
  ],
  onTrackComplete: {
    gi: "TRILHA 1 CONCLUÍDA, SOPHIA!! De secreção salivar à bile, você dominou todo o TGI, Med gata 💚🎉",
    renal: "TRILHA 2 ZERADA, DRA. SOPHIA!! Néfron, contracorrente, Winter e Ânion Gap são seus agora 💧💙",
    endocrino: "TRILHA 3 COMPLETA, AMOR!! Todos os eixos hormonais dominados pra você brilhar sexta-feira 💜👑",
  },
  comfortModalNotes: [
    "Sophia, para um segundinho e olha o quanto você já estudou e evoluiu até aqui. Eu tenho um orgulho gigante da médica incrível que você está se tornando. — Pietro 💚",
    "Meu amor, prova nenhuma define seu valor, mas eu sei o quanto você se dedicou e tenho certeza absoluta de que sexta-feira você vai arrasar muito! — Pietro 💚",
    "Gatinha, se a cabeça pesar por causa da maratona de 48h, fecha os olhos 1 minuto, respira comigo aqui e lembra que eu tô torcendo por você em cada questão. — Pietro 💚",
    "Dra. Sophia, até nas horas de cansaço você continua brilhando. Toma um gole d'água, estica os ombros e confia em tudo o que você já construiu! — Pietro 💚",
    "Ei, Med gata! Vai dar tudo certo na sexta-feira. Você entende os mecanismos de verdade, não só decora — e isso ninguém tira de você. — Pietro 💚",
    "Amor, quando bater aquele friozinho na barriga antes da prova, lembra desse cantinho que fiz só pra você se sentir abraçada e tranquila. — Pietro 💚",
    "Gatinha, você é disciplinada, inteligente e capaz demais. Hoje é foco no essencial; amanhã é confiança total; sexta é vitória! — Pietro 💚",
    "Sophia, mesmo de longe ou de pertinho, cada detalhe desse app tem um pouco do meu carinho torcendo pelo seu descanso e pela sua nota linda. — Pietro 💚",
    "Respira, amor: não precisa saber o livro inteiro decorado de cor, só lembrar da lógica fisiológica que você já domina tão bem! — Pietro 💚",
    "Minha futura médica favorita do mundo: vai lá, faz o seu melhor com calma no coração e depois a gente comemora muito! Te amo demais. — Pietro 💚",
  ],
};

export function pickMessage(pool: readonly string[], index: number): string {
  if (pool.length === 0) return "";
  const safeIndex = Math.abs(index) % pool.length;
  return pool[safeIndex] ?? pool[0];
}

export function pickRandomMessage(pool: readonly string[], avoid?: string): string {
  if (pool.length === 0) return "";
  if (pool.length === 1) return pool[0];
  const filtered = avoid ? pool.filter((item) => item !== avoid) : pool;
  const source = filtered.length > 0 ? filtered : pool;
  const idx = Math.floor(Math.random() * source.length);
  return source[idx] ?? pool[0];
}
