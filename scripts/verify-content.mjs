import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const errors = [];

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

async function run() {
  const { PHYSIOLOGY_TOPICS, PHYSIOLOGY_TRACKS } = await import(
    "../src/data/physiology-tracks.ts"
  );
  const { FLASHCARDS } = await import("../src/data/flashcards.ts");
  const { QUIZ_QUESTIONS } = await import("../src/data/quiz-questions.ts");
  const { MIMO_MESSAGES } = await import("../src/data/mimo-messages.ts");

  // 1. Track & Topic checks
  assert(
    PHYSIOLOGY_TRACKS.length === 3,
    `Expected 3 tracks, got ${PHYSIOLOGY_TRACKS.length}`
  );
  assert(
    PHYSIOLOGY_TOPICS.length === 14,
    `Expected 14 topics, got ${PHYSIOLOGY_TOPICS.length}`
  );

  const countByTrack = { gi: 0, renal: 0, endocrino: 0 };
  const topicIds = new Set();

  for (let i = 0; i < PHYSIOLOGY_TOPICS.length; i++) {
    const t = PHYSIOLOGY_TOPICS[i];
    topicIds.add(t.id);
    countByTrack[t.trackId] = (countByTrack[t.trackId] ?? 0) + 1;

    assert(t.order === i + 1, `Topic ${t.id} order is ${t.order}, expected ${i + 1}`);
    assert(
      t.dayPlan === (t.order <= 8 ? 1 : 2),
      `Topic ${t.id} has unexpected dayPlan ${t.dayPlan}`
    );
    assert(
      t.estimatedMinutes >= 15 && t.estimatedMinutes <= 25,
      `Topic ${t.id} estimatedMinutes (${t.estimatedMinutes}) outside 15-25`
    );
    assert(
      t.keyConcepts.length >= 4 && t.keyConcepts.length <= 6,
      `Topic ${t.id} keyConcepts count (${t.keyConcepts.length}) invalid`
    );
    assert(
      t.examTraps.length >= 2 && t.examTraps.length <= 3,
      `Topic ${t.id} examTraps count (${t.examTraps.length}) invalid`
    );
    assert(Boolean(t.memoryAnchor?.trim()), `Topic ${t.id} missing memoryAnchor`);
    assert(
      t.youtubePrimary?.url.startsWith("https://www.youtube.com/results?search_query="),
      `Topic ${t.id} youtubePrimary invalid: ${t.youtubePrimary?.url}`
    );
    assert(
      t.youtubeSecondary?.url.startsWith("https://www.youtube.com/results?search_query="),
      `Topic ${t.id} youtubeSecondary invalid: ${t.youtubeSecondary?.url}`
    );
  }

  assert(countByTrack.gi === 5, `Expected 5 GI topics, got ${countByTrack.gi}`);
  assert(countByTrack.renal === 3, `Expected 3 Renal topics, got ${countByTrack.renal}`);
  assert(
    countByTrack.endocrino === 6,
    `Expected 6 Endocrine topics, got ${countByTrack.endocrino}`
  );

  // 2. Flashcards checks
  assert(FLASHCARDS.length === 42, `Expected 42 flashcards, got ${FLASHCARDS.length}`);
  const cardsPerTopic = {};
  for (const card of FLASHCARDS) {
    assert(topicIds.has(card.topicId), `Flashcard ${card.id} references unknown topic ${card.topicId}`);
    cardsPerTopic[card.topicId] = (cardsPerTopic[card.topicId] ?? 0) + 1;
  }
  for (const id of topicIds) {
    assert(
      cardsPerTopic[id] === 3,
      `Topic ${id} has ${cardsPerTopic[id] ?? 0} flashcards, expected 3`
    );
  }

  // 3. Quiz checks
  assert(
    QUIZ_QUESTIONS.length === 28,
    `Expected 28 quiz questions, got ${QUIZ_QUESTIONS.length}`
  );
  const quizPerTopic = {};
  for (const q of QUIZ_QUESTIONS) {
    assert(topicIds.has(q.topicId), `Question ${q.id} references unknown topic ${q.topicId}`);
    assert(q.options.length === 4, `Question ${q.id} does not have 4 options`);
    assert(
      q.correctIndex >= 0 && q.correctIndex <= 3,
      `Question ${q.id} has invalid correctIndex ${q.correctIndex}`
    );
    assert(Boolean(q.explanation?.trim()), `Question ${q.id} missing explanation`);
    quizPerTopic[q.topicId] = (quizPerTopic[q.topicId] ?? 0) + 1;
  }
  for (const id of topicIds) {
    assert(
      quizPerTopic[id] === 2,
      `Topic ${id} has ${quizPerTopic[id] ?? 0} quiz questions, expected 2`
    );
  }

  // 4. Mimo checks
  assert(MIMO_MESSAGES.onTopicOpen.length >= 6, "onTopicOpen < 6");
  assert(MIMO_MESSAGES.onTopicMastered.length >= 6, "onTopicMastered < 6");
  assert(MIMO_MESSAGES.onFlashcardStreak.length >= 6, "onFlashcardStreak < 6");
  assert(MIMO_MESSAGES.onQuizCorrect.length >= 8, "onQuizCorrect < 8");
  assert(MIMO_MESSAGES.onQuizWrong.length >= 6, "onQuizWrong < 6");
  assert(
    Boolean(MIMO_MESSAGES.onTrackComplete.gi && MIMO_MESSAGES.onTrackComplete.renal && MIMO_MESSAGES.onTrackComplete.endocrino),
    "onTrackComplete missing a track"
  );
  assert(MIMO_MESSAGES.comfortModalNotes.length >= 10, "comfortModalNotes < 10");
  for (const note of MIMO_MESSAGES.comfortModalNotes) {
    assert(note.includes("Pietro"), `Comfort note missing Pietro signature: ${note}`);
  }

  // 5. Recursive hygiene scan across source and config
  const forbiddenPatterns = [
    { name: "watch?v=", regex: /watch\?v=/i },
    { name: "youtu.be/", regex: /youtu\.be\//i },
    { name: "dpc-content", regex: /dpc-content/i },
    { name: "Aula 13", regex: /Aula 13/i },
    { name: "Aula 14", regex: /Aula 14/i },
    { name: "dpc-study-app", regex: /dpc-study-app/i },
    { name: "gsap", regex: /\bgsap\b/i },
    { name: "misspelled Sofia", regex: /\bSofia\b/ },
  ];

  const scanTargets = [
    path.join(rootDir, "src"),
    path.join(rootDir, "package.json"),
    path.join(rootDir, "tailwind.config.ts"),
    path.join(rootDir, "next.config.ts"),
    path.join(rootDir, "plan.md"),
  ];

  const filesToScan = [];
  const collectFiles = (target) => {
    if (!fs.existsSync(target)) return;
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      for (const entry of fs.readdirSync(target)) {
        collectFiles(path.join(target, entry));
      }
    } else {
      filesToScan.push(target);
    }
  };
  scanTargets.forEach(collectFiles);

  let foundSophia = false;
  let foundPietro = false;

  for (const file of filesToScan) {
    const content = fs.readFileSync(file, "utf8");
    const rel = path.relative(rootDir, file);
    if (content.includes("Sophia")) foundSophia = true;
    if (content.includes("Pietro")) foundPietro = true;

    for (const pat of forbiddenPatterns) {
      if (pat.regex.test(content)) {
        errors.push(`Forbidden pattern "${pat.name}" found in ${rel}`);
      }
    }
  }

  assert(foundSophia, "Name 'Sophia' (with PH) not found in source");
  assert(foundPietro, "Creator 'Pietro' not found in source");

  // 6. Mascot SVG viewBox and reduced-motion check
  const mascotsPath = path.join(rootDir, "src/components/mascots/AnimatedMascots.tsx");
  const mascotsCode = fs.readFileSync(mascotsPath, "utf8");
  for (const mascotName of [
    "DrCoelhinho",
    "DraUrsinha",
    "GatinhaEndocrino",
    "CachorrinhoMimo",
  ]) {
    assert(mascotsCode.includes(mascotName), `Missing mascot ${mascotName}`);
  }
  const viewBoxCount = (mascotsCode.match(/viewBox="0 0 120 120"/g) || []).length;
  assert(viewBoxCount === 4, `Expected 4 viewBox="0 0 120 120" in AnimatedMascots.tsx, got ${viewBoxCount}`);

  const motionLib = fs.readFileSync(path.join(rootDir, "src/lib/motion.ts"), "utf8");
  assert(motionLib.includes("useReducedMotion"), "useReducedMotion missing in src/lib/motion.ts");

  if (errors.length > 0) {
    console.error("VERIFY-CONTENT FAILED:");
    for (const err of errors) {
      console.error(` - ${err}`);
    }
    process.exit(1);
  }

  console.log("=== VERIFY-CONTENT PASSED ===");
  console.table({
    tracks: PHYSIOLOGY_TRACKS.length,
    topics: PHYSIOLOGY_TOPICS.length,
    giTopics: countByTrack.gi,
    renalTopics: countByTrack.renal,
    endocrineTopics: countByTrack.endocrino,
    flashcards: FLASHCARDS.length,
    quizQuestions: QUIZ_QUESTIONS.length,
    mascotViewBoxes: viewBoxCount,
    comfortNotes: MIMO_MESSAGES.comfortModalNotes.length,
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
