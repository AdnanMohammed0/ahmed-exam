import { ExamResult, ExamQuestion } from "../types";

export function computeResult(
  questions: ExamQuestion[],
  answers: Record<string, string>,
  revealed: string[],
  flagged: string[],
  startTime: number,
  endTime: number
): ExamResult {
  let correct = 0;
  const breakdown: Record<string, { total: number; correct: number }> = {};
  for (const q of questions) {
    if (!breakdown[q.chapterSlug]) breakdown[q.chapterSlug] = { total: 0, correct: 0 };
    breakdown[q.chapterSlug].total++;
    if (q.kind === "mcq" && answers[q.id] === q.correctOptionId) {
      correct++;
      breakdown[q.chapterSlug].correct++;
    }
  }
  const answered = Object.keys(answers).length;
  return {
    total: questions.length,
    answered,
    correct,
    incorrect: answered - correct,
    skipped: questions.length - answered - revealed.length,
    flagged: flagged.length,
    percentage: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    timeTaken: endTime - startTime,
    chapterBreakdown: breakdown,
    answers,
    questions,
  };
}
