export interface McqOption {
  id: string;
  text: string;
}

export interface McqQuestion {
  kind: "mcq";
  id: string;
  chapter: string;
  chapterSlug: string;
  chapterNumber: number;
  questionNumber: number;
  stem: string;
  options: McqOption[];
  correctOptionId: string;
  explanation: string;
  topic: string;
}

export interface EssayExamQuestion {
  kind: "essay";
  id: string;
  chapter: string;
  chapterSlug: string;
  chapterNumber: number;
  questionNumber: number;
  format: "SEQ" | "SAQ" | "LCV" | "EMQ";
  difficulty: "FOUNDATION" | "BOARD" | "DISTINCTION";
  title: string;
  stem: string;
  questionText: string;
  markingGuide: string;
  discriminators?: string[];
  commonErrors?: string[];
  topic: string;
}

export type ExamQuestion = McqQuestion | EssayExamQuestion;

export interface ChapterManifest {
  number: number;
  title: string;
  slug: string;
  pageRange: string;
  questionCount: number;
  essayCount: number;
}

export interface ExamConfig {
  mode: "tutorial" | "timed" | "untimed";
  chapterFilter: string[];
  questionCount: number;
  essayCount: number;
  timeLimitMinutes: number;
}

export interface ExamSession {
  config: ExamConfig;
  questions: ExamQuestion[];
  answers: Record<string, string>;
  revealed: string[];
  flagged: string[];
  startTime: number;
  endTime: number | null;
  completed: boolean;
}

export interface ExamResult {
  total: number;
  answered: number;
  correct: number;
  incorrect: number;
  skipped: number;
  flagged: number;
  percentage: number;
  timeTaken: number;
  chapterBreakdown: Record<string, { total: number; correct: number }>;
  answers: Record<string, string>;
  questions: ExamQuestion[];
}

export type PageView = "home" | "exam" | "results" | "review";

export interface EssayQuestion {
  id: string;
  type: "SEQ" | "SAQ" | "LCV" | "EMQ";
  difficulty: "FOUNDATION" | "BOARD" | "DISTINCTION";
  title: string;
  questionText: string;
  markingGuide: string;
  discriminators?: string[];
  commonErrors?: string[];
}

export interface ChapterEssays {
  chapterNumber: number;
  chapterSlug: string;
  chapterTitle: string;
  questions: EssayQuestion[];
}
