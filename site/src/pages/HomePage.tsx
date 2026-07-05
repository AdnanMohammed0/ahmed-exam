import { useState, useEffect } from "react";
import { ExamConfig, ChapterManifest } from "../types";
import { getChapters } from "../data";
import { EssayModal } from "../components/EssayModal";

interface HomePageProps {
  onStart: (config: ExamConfig) => void;
}

export function HomePage({ onStart }: HomePageProps) {
  const chapters = getChapters();
  const [selectedEssayChapter, setSelectedEssayChapter] = useState<{ slug: string; title: string } | null>(null);
  const [mcqCount, setMcqCount] = useState(25);
  const [essayCount, setEssayCount] = useState(5);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleStart = () => {
    if (!isLoaded) return;
    onStart({
      mode: "untimed",
      chapterFilter: selectedChapters,
      questionCount: mcqCount,
      essayCount,
      timeLimitMinutes: 0,
    });
  };

  const toggleChapter = (slug: string) => {
    setSelectedChapters((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const selectAll = () => setSelectedChapters(chapters.map((c) => c.slug));
  const selectNone = () => setSelectedChapters([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Pediatric Urology
          </h1>
          <p className="text-lg text-gray-600">Board Exam Simulator</p>
          <p className="text-xs text-gray-400 mt-1">
            <em>Essentials of Pediatric Urology</em>, 3rd Ed
          </p>
        </div>

        {/* Question counts */}
        <div className="card p-4 mb-4">
          <h2 className="text-base font-semibold mb-4">Questions</h2>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">MCQs</label>
                <span className="text-sm font-bold text-indigo-600">{mcqCount}</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={mcqCount}
                onChange={(e) => setMcqCount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Essays</label>
                <span className="text-sm font-bold text-indigo-600">{essayCount}</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={essayCount}
                onChange={(e) => setEssayCount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Chapter selection */}
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold">Chapters</h2>
            <div className="flex gap-3">
              <button className="text-sm text-indigo-600 font-medium active:text-indigo-800" onClick={selectAll}>
                All
              </button>
              <button className="text-sm text-indigo-600 font-medium active:text-indigo-800" onClick={selectNone}>
                None
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            Select at least one chapter to start.
          </p>
          <div className="grid grid-cols-1 gap-1 max-h-64 overflow-y-auto">
            {chapters.map((ch: ChapterManifest) => (
              <label
                key={ch.slug}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all active:scale-[0.99] touch-manipulation ${
                  selectedChapters.includes(ch.slug)
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 text-indigo-600 rounded shrink-0 accent-indigo-600"
                  checked={selectedChapters.includes(ch.slug)}
                  onChange={() => toggleChapter(ch.slug)}
                />
                <span className="text-sm leading-snug">
                  <span className="font-semibold text-slate-800">Ch{ch.number}</span>{" "}
                  <span className="text-slate-600">{ch.title}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Start button */}
        <button
          className="w-full py-4 bg-indigo-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.97] touch-manipulation disabled:opacity-40 disabled:shadow-none"
          onClick={handleStart}
          disabled={selectedChapters.length === 0}
        >
          Start
        </button>

        {/* Essay bank link */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 mb-2">Browse essay bank:</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {chapters.slice(0, 8).map((ch) => (
              <button
                key={ch.slug}
                onClick={() => setSelectedEssayChapter({ slug: ch.slug, title: ch.title })}
                className="text-xs bg-white text-indigo-600 border border-indigo-200 px-2.5 py-1.5 rounded-lg active:bg-indigo-50 touch-manipulation"
              >
                Ch{ch.number}
              </button>
            ))}
            <span className="text-xs text-gray-400 self-center">+17</span>
          </div>
        </div>
      </div>

      {selectedEssayChapter && (
        <EssayModal
          chapterSlug={selectedEssayChapter.slug}
          chapterTitle={selectedEssayChapter.title}
          onClose={() => setSelectedEssayChapter(null)}
        />
      )}
    </div>
  );
}
