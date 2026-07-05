import { useState, useEffect, useCallback } from "react";
import { ExamConfig, PageView, ExamQuestion } from "./types";
import { HomePage } from "./pages/HomePage";
import { ExamPage } from "./pages/ExamPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ReviewPage } from "./pages/ReviewPage";
import { useExam } from "./hooks/useExam";
import { loadUnifiedQuestions } from "./data";

export default function App() {
  const [page, setPage] = useState<PageView>("home");
  const [allQuestions, setAllQuestions] = useState<ExamQuestion[]>([]);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    loadUnifiedQuestions()
      .then((q) => setAllQuestions(q))
      .catch((e) => setDataError(e.message));
  }, []);

  const {
    session,
    currentIndex,
    currentQuestion,
    loading,
    startExam,
    answer,
    reveal,
    toggleFlag,
    goTo,
    next,
    prev,
    finishExam,
    clearExam,
  } = useExam(allQuestions);

  useEffect(() => {
    if (session?.completed && page === "exam") {
      setPage("results");
    }
  }, [session?.completed, page]);

  const handleStart = useCallback(
    (config: ExamConfig) => {
      startExam(config);
      setPage("exam");
    },
    [startExam]
  );

  const handleHome = useCallback(() => {
    clearExam();
    setPage("home");
  }, [clearExam]);

  if (dataError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card p-8 text-center max-w-md">
          <h1 className="text-xl font-bold text-red-600 mb-2">Data Load Error</h1>
          <p className="text-sm text-gray-600 mb-4">{dataError}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (page === "results" && session) {
    return (
      <ResultsPage
        session={session}
        onReview={() => setPage("review")}
        onHome={handleHome}
      />
    );
  }

  if (page === "review" && session) {
    return <ReviewPage session={session} onHome={handleHome} />;
  }

  if (page === "exam" && session && !session.completed) {
    return (
      <ExamPage
        session={session}
        currentIndex={currentIndex}
        currentQuestion={currentQuestion}
        onAnswer={answer}
        onReveal={reveal}
        onToggleFlag={toggleFlag}
        onGoTo={goTo}
        onNext={next}
        onPrev={prev}
        onFinish={finishExam}
      />
    );
  }

  return <HomePage onStart={handleStart} />;
}
