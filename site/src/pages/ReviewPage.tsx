import { useMemo, useState } from "react";
import { ExamSession, ExamResult } from "../types";
import { computeResult } from "../utils/score";
import { QuestionCard } from "../components/QuestionCard";
import { EssayExamCard } from "../components/EssayExamCard";

interface ReviewPageProps {
  session: ExamSession;
  onHome: () => void;
}

export function ReviewPage({ session, onHome }: ReviewPageProps) {
  const result = useMemo<ExamResult>(
    () => computeResult(session.questions, session.answers, session.revealed, session.flagged, session.startTime, session.endTime!),
    [session]
  );

  const [filter, setFilter] = useState<"all" | "mcq" | "essay" | "correct" | "incorrect">("all");
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const filtered = useMemo(() => {
    return result.questions.filter((q) => {
      if (filter === "mcq") return q.kind === "mcq";
      if (filter === "essay") return q.kind === "essay";
      if (filter === "correct") return q.kind === "mcq" && result.answers[q.id] === q.correctOptionId;
      if (filter === "incorrect") return q.kind === "mcq" && result.answers[q.id] && result.answers[q.id] !== q.correctOptionId;
      return true;
    });
  }, [result, filter]);

  const q = filtered[currentReviewIndex];
  const mcqTotal = result.questions.filter(q => q.kind === "mcq").length;
  const essayTotal = result.questions.filter(q => q.kind === "essay").length;

  const counts = {
    all: result.questions.length,
    mcq: mcqTotal,
    essay: essayTotal,
    correct: result.correct,
    incorrect: result.incorrect,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-4 pb-24 sm:pb-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">Review</h1>
          <button className="btn-outline text-sm" onClick={onHome}>
            Home
          </button>
        </div>

        <div className="flex gap-1.5 mb-4 overflow-x-auto pb-2">
          {(["all", "mcq", "essay", "correct", "incorrect"] as const).map((f) => (
            <button
              key={f}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors whitespace-nowrap touch-manipulation ${
                filter === f
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => { setFilter(f); setCurrentReviewIndex(0); }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
            </button>
          ))}
        </div>

        {q?.kind === "mcq" && (
          <>
            <QuestionCard
              question={q}
              selectedOptionId={result.answers[q.id]}
              isFlagged={false}
              showAnswer={true}
              onAnswer={() => {}}
              onToggleFlag={() => {}}
              questionNumber={currentReviewIndex + 1}
            />
          </>
        )}
        {q?.kind === "essay" && (
          <EssayExamCard
            question={q}
            isRevealed={true}
            isFlagged={false}
            onReveal={() => {}}
            onToggleFlag={() => {}}
            questionNumber={currentReviewIndex + 1}
          />
        )}

        {q && (
          <div className="flex justify-between items-center mt-4">
            <button
              className="btn-ghost text-sm"
              onClick={() => setCurrentReviewIndex((i) => Math.max(0, i - 1))}
              disabled={currentReviewIndex === 0}
            >
              &larr; Prev
            </button>
            <span className="text-xs sm:text-sm text-gray-400">
              {currentReviewIndex + 1} of {filtered.length}
            </span>
            <button
              className="btn-ghost text-sm"
              onClick={() => setCurrentReviewIndex((i) => Math.min(filtered.length - 1, i + 1))}
              disabled={currentReviewIndex === filtered.length - 1}
            >
              Next &rarr;
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="card p-8 text-center text-gray-400">
            No questions match this filter.
          </div>
        )}
      </div>
    </div>
  );
}
