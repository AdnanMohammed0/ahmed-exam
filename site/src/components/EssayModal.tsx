import { useState, useEffect } from "react";
import { ChapterEssays, EssayQuestion } from "../types";

interface EssayModalProps {
  chapterSlug: string;
  chapterTitle: string;
  onClose: () => void;
}

export function EssayModal({ chapterSlug, chapterTitle, onClose }: EssayModalProps) {
  const [essays, setEssays] = useState<ChapterEssays | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLoading(true);
    fetch("./data/essays.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch essay questions.");
        return res.json() as Promise<ChapterEssays[]>;
      })
      .then((data) => {
        const chapterData = data.find((c) => c.chapterSlug === chapterSlug);
        if (chapterData) {
          setEssays(chapterData);
          if (chapterData.questions.length > 0) {
            setActiveQuestionId(chapterData.questions[0].id);
          }
        } else {
          setError("No essay questions found for this chapter.");
        }
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.message || "Error loading essays.");
        setLoading(false);
      });
  }, [chapterSlug]);

  const toggleGuide = (qId: string) => {
    setShowGuide((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const getDifficultyBadge = (diff: EssayQuestion["difficulty"]) => {
    switch (diff) {
      case "FOUNDATION":
        return <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded shadow-sm">FOUNDATION</span>;
      case "BOARD":
        return <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded shadow-sm">BOARD LEVEL</span>;
      case "DISTINCTION":
        return <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded shadow-sm animate-pulse">DISTINCTION</span>;
      default:
        return null;
    }
  };

  const activeQuestion = essays?.questions.find((q) => q.id === activeQuestionId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-slate-100 transform scale-100 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 text-white">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Essay Question Bank</span>
            <h2 className="text-lg font-bold truncate">{chapterTitle}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full mb-4" />
            <p className="text-slate-500 font-medium">Loading essay bank...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Essay Questions Not Available</h3>
            <p className="text-slate-500 max-w-md">{error}</p>
          </div>
        ) : essays ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar with question list */}
            <div className="w-64 border-r border-slate-100 bg-slate-50 overflow-y-auto p-4 space-y-2 flex-shrink-0">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Questions</div>
              {essays.questions.map((q) => {
                const isActive = q.id === activeQuestionId;
                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestionId(q.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 border text-sm flex flex-col gap-1.5 ${
                      isActive
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10 font-semibold"
                        : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200/60 shadow-sm"
                    }`}
                  >
                    <span className="flex items-center justify-between w-full">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-indigo-700 text-indigo-100" : "bg-slate-100 text-slate-600"}`}>
                        {q.type}
                      </span>
                    </span>
                    <span className="line-clamp-2 leading-snug">{q.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Main question view */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
              {activeQuestion && (
                <div className="space-y-6">
                  {/* Title and Metadata */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">{activeQuestion.type} Question</span>
                        {getDifficultyBadge(activeQuestion.difficulty)}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{activeQuestion.title}</h3>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Question Stem & Instructions</h4>
                    <pre className="whitespace-pre-wrap font-sans text-slate-800 text-[15px] leading-relaxed select-text bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                      {activeQuestion.questionText}
                    </pre>
                  </div>

                  {/* Toggle Guide */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleGuide(activeQuestion.id)}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 ${
                        showGuide[activeQuestion.id]
                          ? "bg-slate-800 text-white hover:bg-slate-900 shadow-slate-800/20"
                          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20 hover:-translate-y-0.5"
                      }`}
                    >
                      <svg className={`w-5 h-5 transition-transform duration-300 ${showGuide[activeQuestion.id] ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {showGuide[activeQuestion.id] ? "Hide Examiner's Guide & Answer" : "Reveal Examiner's Guide & Answer"}
                    </button>
                  </div>

                  {/* Expanded Guide */}
                  {showGuide[activeQuestion.id] && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* Marking Guide */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 text-rose-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h4 className="text-sm font-bold uppercase tracking-wider">Examiner's Marking Guide & Model Answer</h4>
                        </div>
                        <pre className="whitespace-pre-wrap font-sans text-slate-800 text-[14px] leading-relaxed select-text bg-rose-50/10 p-5 rounded-xl border border-rose-100/50">
                          {activeQuestion.markingGuide}
                        </pre>
                      </div>

                      {/* Side by side: Common Errors & Distinguishing Features */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeQuestion.commonErrors && activeQuestion.commonErrors.length > 0 && (
                          <div className="bg-amber-50/40 p-5 rounded-2xl border border-amber-200/50 space-y-3">
                            <div className="flex items-center gap-2 text-amber-800">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <h5 className="text-sm font-bold uppercase tracking-wider">Common Examiner Traps / Errors</h5>
                            </div>
                            <ul className="list-disc pl-5 space-y-1.5 text-sm text-amber-900/80 leading-relaxed">
                              {activeQuestion.commonErrors.map((err, i) => (
                                <li key={i}>{err}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {activeQuestion.discriminators && activeQuestion.discriminators.length > 0 && (
                          <div className="bg-indigo-50/40 p-5 rounded-2xl border border-indigo-200/50 space-y-3">
                            <div className="flex items-center gap-2 text-indigo-800">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              <h5 className="text-sm font-bold uppercase tracking-wider">Distinguishing Features (Excellent)</h5>
                            </div>
                            <ul className="list-disc pl-5 space-y-1.5 text-sm text-indigo-900/80 leading-relaxed">
                              {activeQuestion.discriminators.map((disc, i) => (
                                <li key={i}>{disc}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
