import { ExamQuestion, McqQuestion, EssayExamQuestion, ChapterEssays } from "../types";
import { chapters } from "./chapters";

const MCQ_URL = "./data/questions.json";
const ESSAY_URL = "./data/essays.json";

let mcqCache: McqQuestion[] | null = null;
let essayCache: EssayExamQuestion[] | null = null;
let unifiedCache: ExamQuestion[] | null = null;

export async function loadAllMcqs(): Promise<McqQuestion[]> {
  if (mcqCache) return mcqCache;
  const resp = await fetch(MCQ_URL);
  if (!resp.ok) throw new Error(`Failed to load MCQs: ${resp.statusText}`);
  const data: McqQuestion[] = await resp.json();
  mcqCache = data.map(q => ({ ...q, kind: "mcq" as const }));
  return mcqCache;
}

export async function loadAllEssays(): Promise<EssayExamQuestion[]> {
  if (essayCache) return essayCache;
  const resp = await fetch(ESSAY_URL);
  if (!resp.ok) throw new Error(`Failed to load essays: ${resp.statusText}`);
  const chapters: ChapterEssays[] = await resp.json();
  const all: EssayExamQuestion[] = [];
  let seq = 1;
  for (const ch of chapters) {
    for (const q of ch.questions) {
      all.push({
        kind: "essay",
        id: q.id,
        chapter: ch.chapterTitle,
        chapterSlug: ch.chapterSlug,
        chapterNumber: ch.chapterNumber,
        questionNumber: seq++,
        format: q.type,
        difficulty: q.difficulty,
        title: q.title,
        stem: q.questionText,
        questionText: q.questionText,
        markingGuide: q.markingGuide,
        discriminators: q.discriminators,
        commonErrors: q.commonErrors,
        topic: q.type,
      });
    }
  }
  essayCache = all;
  return essayCache;
}

export async function loadUnifiedQuestions(): Promise<ExamQuestion[]> {
  if (unifiedCache) return unifiedCache;
  const [mcqs, essays] = await Promise.all([loadAllMcqs(), loadAllEssays()]);
  // Interleave: for every 5 MCQs, insert 1 essay, cycling through by chapter
  const byChapter: Record<string, { mcqs: McqQuestion[]; essays: EssayExamQuestion[] }> = {};
  for (const q of mcqs) {
    if (!byChapter[q.chapterSlug]) byChapter[q.chapterSlug] = { mcqs: [], essays: [] };
    byChapter[q.chapterSlug].mcqs.push(q);
  }
  for (const q of essays) {
    if (!byChapter[q.chapterSlug]) byChapter[q.chapterSlug] = { mcqs: [], essays: [] };
    byChapter[q.chapterSlug].essays.push(q);
  }
  const result: ExamQuestion[] = [];
  for (const slug of Object.keys(byChapter).sort()) {
    const { mcqs, essays } = byChapter[slug];
    const mArr = [...mcqs];
    const eArr = [...essays];
    let mi = 0, ei = 0;
    while (mi < mArr.length || ei < eArr.length) {
      for (let i = 0; i < 5 && mi < mArr.length; i++, mi++) result.push(mArr[mi]);
      if (ei < eArr.length) result.push(eArr[ei++]);
    }
  }
  unifiedCache = result;
  return result;
}

export function getCachedMcqs(): McqQuestion[] {
  return mcqCache ?? [];
}

export function getCachedEssays(): EssayExamQuestion[] {
  return essayCache ?? [];
}

export function getChapters() {
  return chapters;
}

export function filterUnifiedQuestions(
  questions: ExamQuestion[],
  chapterSlugs: string[],
  mcqLimit: number,
  essayLimit: number
): ExamQuestion[] {
  let pool = chapterSlugs.length > 0
    ? questions.filter((q) => chapterSlugs.includes(q.chapterSlug))
    : [...questions];
  const mcqs = pool.filter(q => q.kind === "mcq");
  const essays = pool.filter(q => q.kind === "essay");
  mcqs.sort(() => Math.random() - 0.5);
  essays.sort(() => Math.random() - 0.5);
  const selected: ExamQuestion[] = [];
  const mSel = mcqs.slice(0, Math.min(mcqLimit, mcqs.length));
  const eSel = essays.slice(0, Math.min(essayLimit, essays.length));
  for (let i = 0; i < Math.max(mSel.length, eSel.length); i++) {
    for (let j = 0; j < 4 && i * 4 + j < mSel.length; j++) selected.push(mSel[i * 4 + j]);
    if (i < eSel.length) selected.push(eSel[i]);
  }
  return selected;
}
