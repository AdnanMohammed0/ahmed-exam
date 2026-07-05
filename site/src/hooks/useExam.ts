import { useCallback, useEffect, useReducer } from "react";
import { ExamConfig, ExamSession, ExamQuestion } from "../types";
import { filterUnifiedQuestions } from "../data";
import { saveToStorage, loadFromStorage, removeFromStorage } from "../utils/storage";

type Action =
  | { type: "LOAD_SESSION"; session: ExamSession }
  | { type: "START_EXAM"; config: ExamConfig; questions: ExamQuestion[] }
  | { type: "ANSWER"; questionId: string; optionId: string }
  | { type: "REVEAL"; questionId: string }
  | { type: "FLAG"; questionId: string }
  | { type: "UNFLAG"; questionId: string }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "GO_TO"; index: number }
  | { type: "FINISH" }
  | { type: "CLEAR" };

interface State {
  session: ExamSession | null;
  currentIndex: number;
  loading: boolean;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_SESSION":
      return { session: action.session, currentIndex: 0, loading: false };
    case "START_EXAM": {
      const session: ExamSession = {
        config: action.config,
        questions: action.questions,
        answers: {},
        revealed: [],
        flagged: [],
        startTime: Date.now(),
        endTime: null,
        completed: false,
      };
      return { session, currentIndex: 0, loading: false };
    }
    case "ANSWER": {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          answers: { ...state.session.answers, [action.questionId]: action.optionId },
        },
      };
    }
    case "REVEAL": {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          revealed: [...state.session.revealed, action.questionId],
        },
      };
    }
    case "FLAG": {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          flagged: [...state.session.flagged, action.questionId],
        },
      };
    }
    case "UNFLAG": {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          flagged: state.session.flagged.filter((id) => id !== action.questionId),
        },
      };
    }
    case "NEXT":
      if (!state.session) return state;
      return { ...state, currentIndex: Math.min(state.currentIndex + 1, state.session.questions.length - 1) };
    case "PREV":
      return { ...state, currentIndex: Math.max(state.currentIndex - 1, 0) };
    case "GO_TO":
      if (!state.session) return state;
      return { ...state, currentIndex: Math.max(0, Math.min(action.index, state.session.questions.length - 1)) };
    case "FINISH": {
      if (!state.session) return state;
      return {
        ...state,
        session: { ...state.session, endTime: Date.now(), completed: true },
      };
    }
    case "CLEAR":
      return { session: null, currentIndex: 0, loading: false };
    default:
      return state;
  }
}

export function useExam(allQuestions: ExamQuestion[]) {
  const [state, dispatch] = useReducer(reducer, {
    session: null,
    currentIndex: 0,
    loading: true,
  });

  useEffect(() => {
    const saved = loadFromStorage<ExamSession>("currentSession");
    if (saved) {
      dispatch({ type: "LOAD_SESSION", session: saved });
    } else {
      dispatch({ type: "LOAD_SESSION", session: null as any });
    }
  }, []);

  useEffect(() => {
    if (state.session && !state.session.completed) {
      saveToStorage("currentSession", state.session);
    }
    if (state.session?.completed) {
      removeFromStorage("currentSession");
    }
  }, [state.session]);

  const startExam = useCallback(
    (config: ExamConfig) => {
      const selected = filterUnifiedQuestions(allQuestions, config.chapterFilter, config.questionCount, config.essayCount);
      dispatch({ type: "START_EXAM", config, questions: selected });
    },
    [allQuestions]
  );

  const answer = useCallback((questionId: string, optionId: string) => {
    dispatch({ type: "ANSWER", questionId, optionId });
  }, []);

  const reveal = useCallback((questionId: string) => {
    dispatch({ type: "REVEAL", questionId });
  }, []);

  const toggleFlag = useCallback(
    (questionId: string) => {
      if (state.session?.flagged.includes(questionId)) {
        dispatch({ type: "UNFLAG", questionId });
      } else {
        dispatch({ type: "FLAG", questionId });
      }
    },
    [state.session]
  );

  const finishExam = useCallback(() => {
    dispatch({ type: "FINISH" });
  }, []);

  const clearExam = useCallback(() => {
    removeFromStorage("currentSession");
    dispatch({ type: "CLEAR" });
  }, []);

  return {
    session: state.session,
    currentIndex: state.currentIndex,
    loading: state.loading,
    currentQuestion: state.session?.questions[state.currentIndex] ?? null,
    startExam,
    answer,
    reveal,
    toggleFlag,
    goTo: (i: number) => dispatch({ type: "GO_TO", index: i }),
    next: () => dispatch({ type: "NEXT" }),
    prev: () => dispatch({ type: "PREV" }),
    finishExam,
    clearExam,
  };
}
