import { ExamResult, ExamSession } from "../types";
import { computeResult } from "../utils/score";
import { useMemo } from "react";

interface ResultsPageProps {
  session: ExamSession;
  onReview: () => void;
  onHome: () => void;
}

export function ResultsPage({ session, onReview, onHome }: ResultsPageProps) {
  const result = useMemo<ExamResult>(
    () => computeResult(session.questions, session.answers, session.revealed, session.flagged, session.startTime, session.endTime!),
    [session]
  );

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}m ${secs}s`;
  };

  const mcqCount = session.questions.filter(q => q.kind === "mcq").length;
  const essayCount = session.questions.filter(q => q.kind === "essay").length;
  const answeredCount = Object.keys(session.answers).length;
  const revealedCount = session.revealed.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Exam Complete</h1>
          <p className="text-sm sm:text-base text-gray-500">
            {session.config.mode === "timed" ? "Timed" : "Untimed"} &middot; {mcqCount} MCQs + {essayCount} essays
          </p>
        </div>

        <div className="card p-6 sm:p-8 mb-4 sm:mb-6 text-center">
          <div className={`text-5xl sm:text-6xl font-bold mb-2 ${result.percentage >= 80 ? "text-green-600" : result.percentage >= 60 ? "text-amber-600" : "text-red-600"}`}>
            {result.percentage}%
          </div>
          <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
            MCQ: {result.correct} correct &middot; {result.incorrect} incorrect &middot; {result.skipped} skipped
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            <div className="p-2 sm:p-3 bg-green-50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-green-600">{result.correct}</div>
              <div className="text-xs text-gray-500">Correct</div>
            </div>
            <div className="p-2 sm:p-3 bg-red-50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-red-600">{result.incorrect}</div>
              <div className="text-xs text-gray-500">Wrong</div>
            </div>
            <div className="p-2 sm:p-3 bg-emerald-50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-emerald-600">{revealedCount}</div>
              <div className="text-xs text-gray-500">Essays</div>
            </div>
            <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-gray-600">{result.skipped}</div>
              <div className="text-xs text-gray-500">Skipped</div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-4">Time: {formatTime(result.timeTaken)}</p>
        </div>

        <div className="card p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold mb-4">By Chapter</h2>
          <div className="space-y-2.5">
            {Object.entries(result.chapterBreakdown).sort().map(([slug, data]) => (
              <div key={slug} className="flex items-center gap-2 sm:gap-3">
                <div className="flex-1 text-xs sm:text-sm text-gray-700 truncate">{slug.replace(/_/g, " ")}</div>
                <div className="text-xs sm:text-sm font-medium shrink-0">{data.correct}/{data.total}</div>
                <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      data.total > 0 && data.correct / data.total >= 0.8 ? "bg-green-500" : data.total > 0 && data.correct / data.total >= 0.6 ? "bg-amber-500" : "bg-red-500"
                    }`}
                    style={{ width: `${data.total > 0 ? (data.correct / data.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 sm:gap-4 justify-center">
          <button className="btn-primary flex-1 sm:flex-none text-center" onClick={onReview}>
            Review Answers
          </button>
          <button className="btn-outline flex-1 sm:flex-none text-center" onClick={onHome}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
