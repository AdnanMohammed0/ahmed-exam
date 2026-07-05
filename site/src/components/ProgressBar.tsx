import { ExamQuestion } from "../types";

interface ProgressBarProps {
  current: number;
  total: number;
  answers: Record<string, string>;
  revealed: string[];
  flagged: string[];
  questions: ExamQuestion[];
  onNavigate: (index: number) => void;
}

export function ProgressBar({ current, total, answers, revealed, flagged, questions, onNavigate }: ProgressBarProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const q = questions[i];
        if (!q) return null;
        const isAnswered = answers[q.id] !== undefined;
        const isRevealed = revealed.includes(q.id);
        const isFlagged = flagged.includes(q.id);
        const isCurrent = i === current;
        let cls = "w-8 h-8 rounded text-xs font-medium flex items-center justify-center transition-colors ";
        if (isCurrent) cls += "ring-2 ring-primary-500 ring-offset-1 ";
        if (isFlagged) cls += "bg-purple-500 text-white ";
        else if (isAnswered) cls += "bg-primary-600 text-white ";
        else if (isRevealed) cls += "bg-emerald-400 text-white ";
        else cls += "bg-gray-100 text-gray-500 hover:bg-gray-200 ";
        return (
          <button key={i} className={cls} onClick={() => onNavigate(i)}>
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
