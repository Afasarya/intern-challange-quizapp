import { useState, useEffect }           from 'react';
import { QuizProvider, useQuiz }         from './context/QuizContext';
import { loadQuizState }                 from './utils/storage';
import LoginScreen                       from './components/LoginScreen';
import LoadingScreen                     from './components/LoadingScreen';
import QuizScreen                        from './components/QuizScreen';
import ResultScreen                      from './components/ResultScreen';

/* ─────────────────────────────────────────────
   Inner App (di dalam QuizProvider)
───────────────────────────────────────────── */
function Inner() {
  const { state, resumeQuiz } = useQuiz();
  const [resumeData, setResumeData] = useState(null);

  // Saat pertama mount: cek apakah ada data kuis tersimpan di localStorage
  useEffect(() => {
    const saved = loadQuizState();
    // Hanya tampilkan resume jika masih ada waktu tersisa
    if (saved?.screen === 'quiz' && saved?.questions?.length > 0 && saved?.timeLeft > 0) {
      setResumeData(saved);
    }
  }, []);

  const handleResume = () => {
    resumeQuiz(resumeData);
    setResumeData(null);
  };

  const { screen } = state;

  return (
    <div className="qa-root">
      {screen === 'login'   && (
        <LoginScreen
          resumeData={resumeData}
          onResume={handleResume}
        />
      )}
      {screen === 'loading' && <LoadingScreen />}
      {screen === 'quiz'    && <QuizScreen />}
      {screen === 'result'  && <ResultScreen />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   App Root — Wrap dengan QuizProvider
───────────────────────────────────────────── */
export default function App() {
  return (
    <QuizProvider>
      <Inner />
    </QuizProvider>
  );
}
