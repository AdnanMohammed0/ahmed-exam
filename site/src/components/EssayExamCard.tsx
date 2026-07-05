import { useState } from "react";
import { EssayExamQuestion } from "../types";

interface EssayExamCardProps {
  question: EssayExamQuestion;
  isRevealed: boolean;
  isFlagged: boolean;
  onReveal: () => void;
  onToggleFlag: () => void;
  questionNumber: number;
}

export function EssayExamCard({
  question,
  isRevealed,
  isFlagged,
  onReveal,
  onToggleFlag,
  questionNumber,
}: EssayExamCardProps) {
  const getBadge = () => {
    const base = "text-xs font-bold px-2 py-0.5 rounded";
    switch (question.difficulty) {
      case "FOUNDATION": return `${base} bg-emerald-100 text-emerald-800`;
      case "DISTINCTION": return `${base} bg-purple-100 text-purple-800`;
      default: return `${base} bg-blue-100 text-blue-800`;
    }
  };

  return (
    <div className="card p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
            {question.format}
          </span>
          <span className={getBadge()}>{question.difficulty}</span>
          <span className="text-xs text-gray-400">Q{questionNumber}</span>
        </div>
        <button
          onClick={onToggleFlag}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors touch-manipulation shrink-0 ${
            isFlagged
              ? "bg-purple-100 text-purple-700 border-purple-300"
              : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
          }`}
        >
          {isFlagged ? "Flagged" : "Flag"}
        </button>
      </div>

      {/* Title & chapter */}
      <div className="text-xs text-indigo-600 font-medium mb-1">{question.chapter}</div>
      <h3 className="text-base sm:text-lg font-bold mb-3">{question.title}</h3>

      {/* Question text */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-4">
        <pre className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed text-gray-800 select-text">
          {question.questionText}
        </pre>
      </div>

      {/* Show answer button / Marking guide */}
      {!isRevealed ? (
        <button
          onClick={onReveal}
          className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] touch-manipulation shadow-md shadow-indigo-600/20"
        >
          Reveal Examiner's Guide & Model Answer
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <h4 className="text-sm font-bold text-rose-700 uppercase tracking-wider mb-2">
              Examiner's Marking Guide & Model Answer
            </h4>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-800 select-text">
              {question.markingGuide}
            </pre>
          </div>

          {(question.discriminators && question.discriminators.length > 0) ||
           (question.commonErrors && question.commonErrors.length > 0) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {question.commonErrors && question.commonErrors.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h5 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-2">
                    Common Examiner Traps
                  </h5>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-amber-900">
                    {question.commonErrors.slice(0, 3).map((e, i) => (
                      <li key={i}>{e.replace(/^[a-z]\)\s*/, "")}</li>
                    ))}
                  </ul>
                </div>
              )}
              {question.discriminators && question.discriminators.length > 0 && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                  <h5 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">
                    Distinguishing Features
                  </h5>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-indigo-900">
                    {question.discriminators.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
