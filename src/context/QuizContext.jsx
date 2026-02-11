import { createContext, useContext, useReducer, useRef, useEffect } from 'react';
import { processQuestion }            from '../utils/helpers';
import { saveQuizState, clearQuizState } from '../utils/storage';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
export const QUIZ_DURATION = 300;   // 5 menit (detik)
export const TOTAL_Q       = 10;    // jumlah soal

// API URL from environment variable
const BASE_API_URL = import.meta.env.VITE_OPENTDB_API_URL || 'https://opentdb.com/api.php';
const API_URL = `${BASE_API_URL}?amount=${TOTAL_Q}&type=multiple&encode=url3986`;

/* ─────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────── */
const initialState = {
  screen     : 'login',   // 'login' | 'loading' | 'quiz' | 'result'
  user       : '',
  questions  : [],
  currentIdx : 0,
  answers    : {},        // { 0: 'jawaban', 1: 'jawaban', ... }
  timeLeft   : QUIZ_DURATION,
};

/* ─────────────────────────────────────────────
   REDUCER
───────────────────────────────────────────── */
function reducer(state, action) {
  switch (action.type) {

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'SET_SCREEN':
      return { ...state, screen: action.payload };

    case 'START_QUIZ':
      return {
        ...state,
        screen     : 'quiz',
        questions  : action.payload.questions,
        currentIdx : 0,
        answers    : {},
        timeLeft   : QUIZ_DURATION,
      };

    case 'RESUME_QUIZ':
      return {
        ...state,
        screen     : 'quiz',
        user       : action.payload.user,
        questions  : action.payload.questions,
        currentIdx : action.payload.currentIdx,
        answers    : action.payload.answers,
        timeLeft   : action.payload.timeLeft,
      };

    case 'SAVE_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.payload.idx]: action.payload.answer },
      };

    case 'NEXT_QUESTION':
      return { ...state, currentIdx: state.currentIdx + 1 };

    case 'TICK':
      return { ...state, timeLeft: Math.max(0, state.timeLeft - 1) };

    case 'FINISH':
      return { ...state, screen: 'result' };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

/* ─────────────────────────────────────────────
   CONTEXT
───────────────────────────────────────────── */
const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Ref agar timer bisa baca jawaban terbaru tanpa re-render
  const answersRef = useRef(state.answers);
  useEffect(() => { answersRef.current = state.answers; }, [state.answers]);

  /* ── Persist ke localStorage setiap kali soal / jawaban / waktu berubah ── */
  useEffect(() => {
    if (state.screen !== 'quiz') return;
    saveQuizState({
      screen     : state.screen,
      user       : state.user,
      questions  : state.questions,
      currentIdx : state.currentIdx,
      answers    : state.answers,
      timeLeft   : state.timeLeft,
    });
  }, [state.currentIdx, state.answers, state.screen, state.timeLeft]);

  /* ── ACTIONS ─────────────────────────────────────────────────── */

  const setUser = (name)  => dispatch({ type: 'SET_USER', payload: name });

  const fetchAndStart = async () => {
    dispatch({ type: 'SET_SCREEN', payload: 'loading' });
    try {
      const res  = await fetch(API_URL);
      const data = await res.json();
      const qs   = data.results.map(processQuestion);
      dispatch({ type: 'START_QUIZ', payload: { questions: qs } });
    } catch {
      alert('Gagal memuat soal. Periksa koneksi internet dan coba lagi.');
      dispatch({ type: 'SET_SCREEN', payload: 'login' });
    }
  };

  const resumeQuiz = (saved) => dispatch({ type: 'RESUME_QUIZ', payload: saved });

  const saveAnswer = (idx, answer) =>
    dispatch({ type: 'SAVE_ANSWER', payload: { idx, answer } });

  const nextQuestion = () => dispatch({ type: 'NEXT_QUESTION' });

  const tick = () => dispatch({ type: 'TICK' });

  const finishQuiz = async () => {
    await clearQuizState();
    dispatch({ type: 'FINISH' });
  };

  const restartQuiz = () => dispatch({ type: 'RESET' });

  return (
    <QuizContext.Provider value={{
      state,
      answersRef,
      setUser,
      fetchAndStart,
      resumeQuiz,
      saveAnswer,
      nextQuestion,
      tick,
      finishQuiz,
      restartQuiz,
    }}>
      {children}
    </QuizContext.Provider>
  );
}

/* ─────────────────────────────────────────────
   CUSTOM HOOK
───────────────────────────────────────────── */
export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz harus digunakan di dalam <QuizProvider>');
  return ctx;
};
