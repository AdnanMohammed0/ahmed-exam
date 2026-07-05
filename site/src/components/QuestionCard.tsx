import { McqQuestion } from "../types";

interface QuestionCardProps {
  question: McqQuestion;
  selectedOptionId: string | undefined;
  isFlagged: boolean;
  showAnswer: boolean;
  onAnswer: (optionId: string) => void;
  onToggleFlag: () => void;
  questionNumber: number;
}

export function QuestionCard({
  question,
  selectedOptionId,
  isFlagged,
  showAnswer,
  onAnswer,
  onToggleFlag,
  questionNumber,
}: QuestionCardProps) {
  const hasAnswered = selectedOptionId !== undefined;
  const isCorrect = hasAnswered && selectedOptionId === question.correctOptionId;
  const showFeedback = hasAnswered || showAnswer;

  const getOptionClass = (optId: string) => {
    if (!showFeedback) {
      if (selectedOptionId === optId) return "option-label selected";
      return "option-label";
    }
    if (optId === question.correctOptionId) return "option-label correct";
    if (selectedOptionId === optId && optId !== question.correctOptionId) return "option-label incorrect";
    if (selectedOptionId && optId !== question.correctOptionId && optId !== selectedOptionId) return "option-label disabled";
    return "option-label disabled";
  };

  return (
    <div className="card p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="text-xs sm:text-sm text-gray-500">
          Q{questionNumber} &middot; {question.chapter}
        </div>
        <button
          onClick={onToggleFlag}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors touch-manipulation ${
            isFlagged
              ? "bg-purple-100 text-purple-700 border-purple-300"
              : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
          }`}
        >
          {isFlagged ? "Flagged" : "Flag"}
        </button>
      </div>

      {/* Topic */}
      <div className="text-xs text-primary-600 font-medium mb-2">{question.topic}</div>

      {/* Stem */}
      <h3 className="text-base sm:text-lg font-semibold mb-4 leading-relaxed">{question.stem}</h3>

      {/* Options */}
      <div className="space-y-2.5">
        {question.options.map((opt) => {
          const isSel = selectedOptionId === opt.id;
          return (
            <label
              key={opt.id}
              className={`${getOptionClass(opt.id)} flex items-center gap-3 rounded-xl border-2 p-3.5 sm:p-4 cursor-pointer transition-all active:scale-[0.98] touch-manipulation ${
                !showFeedback ? "hover:bg-gray-50 hover:border-gray-300" : ""
              }`}
              onClick={() => {
                if (!showFeedback) onAnswer(opt.id);
              }}
            >
              <span className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                showFeedback && opt.id === question.correctOptionId
                  ? "border-green-600 bg-green-100 text-green-800"
                  : showFeedback && isSel && !isCorrect
                  ? "border-red-600 bg-red-100 text-red-800"
                  : isSel
                  ? "border-primary-600 bg-primary-100 text-primary-800"
                  : "border-gray-300 text-gray-600"
              }`}>
                {showFeedback && opt.id === question.correctOptionId ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                ) : showFeedback && isSel && !isCorrect ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  opt.id.toUpperCase()
                )}
              </span>
              <span className="text-sm sm:text-base leading-snug flex-1">{opt.text}</span>
            </label>
          );
        })}
      </div>

      {/* Feedback banner */}
      {hasAnswered && (
        <div className={`mt-4 p-3 sm:p-4 rounded-xl border text-sm font-medium ${
          isCorrect
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          <span className="font-bold">{isCorrect ? "Correct!" : "Incorrect"}</span>
          {!isCorrect && (
            <span className="font-normal ml-1">
              — Correct answer: <span className="font-bold">{question.correctOptionId.toUpperCase()}</span>
            </span>
          )}
        </div>
      )}

      {/* Explanation */}
      {showFeedback && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm font-semibold text-blue-800 mb-1.5">Explanation</p>
          <p className="text-sm text-blue-700 leading-relaxed whitespace-pre-line">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
