import { useEffect, useCallback, useState } from "react";
import { ExamSession, ExamQuestion } from "../types";
import { QuestionCard } from "../components/QuestionCard";
import { EssayExamCard } from "../components/EssayExamCard";
import { ProgressBar } from "../components/ProgressBar";
import { Timer } from "../components/Timer";

interface ExamPageProps {
  session: ExamSession;
  currentIndex: number;
  currentQuestion: ExamQuestion | null;
  onAnswer: (questionId: string, optionId: string) => void;
  onReveal: (questionId: string) => void;
  onToggleFlag: (questionId: string) => void;
  onGoTo: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
}

export function ExamPage({
  session,
  currentIndex,
  currentQuestion,
  onAnswer,
  onReveal,
  onToggleFlag,
  onGoTo,
  onNext,
  onPrev,
  onFinish,
}: ExamPageProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleTimeUp = useCallback(() => {
    setTimeExpired(true);
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    if (timeExpired) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft" || e.key === "a") onPrev();
      else if (e.key === "ArrowRight" || e.key === "d") onNext();
      else if (e.key === "1" && currentQuestion?.kind === "mcq") onAnswer(currentQuestion.id, "a");
      else if (e.key === "2" && currentQuestion?.kind === "mcq") onAnswer(currentQuestion.id, "b");
      else if (e.key === "3" && currentQuestion?.kind === "mcq") onAnswer(currentQuestion.id, "c");
      else if (e.key === "4" && currentQuestion?.kind === "mcq") onAnswer(currentQuestion.id, "d");
      else if (e.key === "f") currentQuestion && onToggleFlag(currentQuestion.id);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentQuestion, onAnswer, onToggleFlag, onNext, onPrev, timeExpired]);

  const answeredCount = Object.keys(session.answers).length;
  const revealedCount = session.revealed.length;
  const totalQuestions = session.questions.length;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 sm:pb-6">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-700 min-w-[80px]">
            {session.config.timeLimitMinutes > 0 ? (
              <Timer startTime={session.startTime} timeLimitMinutes={session.config.timeLimitMinutes} onTimeUp={handleTimeUp} />
            ) : (
              <span className="text-gray-400">Untimed</span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              <span className="text-gray-900">{answeredCount + revealedCount}</span>/{totalQuestions}
            </span>
            <button
              onClick={() => setShowNav(true)}
              className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors touch-manipulation"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              className="btn-outline text-xs sm:text-sm py-1.5 px-3 sm:px-4"
              onClick={() => setShowConfirm(true)}
            >
              Finish
            </button>
          </div>
        </div>
      </header>

      {/* Question area */}
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {currentQuestion?.kind === "mcq" && (
          <QuestionCard
            question={currentQuestion}
            selectedOptionId={session.answers[currentQuestion.id]}
            isFlagged={session.flagged.includes(currentQuestion.id)}
            showAnswer={false}
            onAnswer={(optId) => onAnswer(currentQuestion.id, optId)}
            onToggleFlag={() => onToggleFlag(currentQuestion.id)}
            questionNumber={currentIndex + 1}
          />
        )}
        {currentQuestion?.kind === "essay" && (
          <EssayExamCard
            question={currentQuestion}
            isRevealed={session.revealed.includes(currentQuestion.id)}
            isFlagged={session.flagged.includes(currentQuestion.id)}
            onReveal={() => onReveal(currentQuestion.id)}
            onToggleFlag={() => onToggleFlag(currentQuestion.id)}
            questionNumber={currentIndex + 1}
          />
        )}
      </div>

      {/* Mobile bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 sm:hidden shadow-lg">
        <div className="flex items-center justify-between px-3 py-2.5">
          <button
            className="flex-1 flex items-center justify-center gap-1.5 text-gray-600 font-medium py-2 px-3 rounded-lg disabled:opacity-30 touch-manipulation active:bg-gray-100"
            onClick={onPrev}
            disabled={currentIndex === 0}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Prev</span>
          </button>

          <span className="text-xs text-gray-400 font-medium">
            {currentIndex + 1}/{totalQuestions}
          </span>

          <button
            className="flex-1 flex items-center justify-center gap-1.5 text-gray-600 font-medium py-2 px-3 rounded-lg disabled:opacity-30 touch-manipulation active:bg-gray-100"
            onClick={onNext}
            disabled={currentIndex === totalQuestions - 1}
          >
            <span className="text-sm">Next</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop navigation */}
      <div className="hidden sm:flex justify-between max-w-3xl mx-auto px-4 mt-4">
        <button className="btn-ghost" onClick={onPrev} disabled={currentIndex === 0}>
          &larr; Previous
        </button>
        <button
          className="btn-ghost"
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
        >
          Next &rarr;
        </button>
      </div>

      {/* Question navigator slide-up panel */}
      {showNav && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowNav(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[70vh] overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800">Questions</h3>
              <button onClick={() => setShowNav(false)} className="p-1.5 touch-manipulation">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ProgressBar
              current={currentIndex}
              total={totalQuestions}
              answers={session.answers}
              revealed={session.revealed}
              flagged={session.flagged}
              questions={session.questions}
              onNavigate={(i) => { onGoTo(i); setShowNav(false); }}
            />
            <div className="mt-3 flex gap-4 text-xs text-gray-400 flex-wrap">
              <span><span className="inline-block w-3 h-3 bg-primary-600 rounded mr-1 align-middle"></span> Answered</span>
              <span><span className="inline-block w-3 h-3 bg-purple-500 rounded mr-1 align-middle"></span> Flagged</span>
              <span><span className="inline-block w-3 h-3 bg-emerald-400 rounded mr-1 align-middle"></span> Revealed</span>
              <span><span className="inline-block w-3 h-3 bg-gray-100 border rounded mr-1 align-middle"></span> Unanswered</span>
            </div>
          </div>
        </div>
      )}

      {/* Finish confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Finish Exam?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Answered: {answeredCount} MCQ{answeredCount !== 1 ? "s" : ""}
              {revealedCount > 0 && `, ${revealedCount} essay${revealedCount !== 1 ? "s" : ""} revealed`}.
              {totalQuestions - answeredCount - revealedCount > 0 && (
                <span className="text-amber-600"> {totalQuestions - answeredCount - revealedCount} remaining.</span>
              )}
            </p>
            <div className="flex gap-3 justify-end">
              <button className="btn-ghost flex-1 sm:flex-none" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn-primary flex-1 sm:flex-none" onClick={() => { setShowConfirm(false); onFinish(); }}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
