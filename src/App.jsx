import { useState, useEffect }           from 'react';
import { QuizProvider, useQuiz }         from './context/QuizContext';
import { loadQuizState }                 from './utils/storage';
import LoginScreen                       from './components/LoginScreen';
import LoadingScreen                     from './components/LoadingScreen';
import QuizScreen                        from './components/QuizScreen';
import ResultScreen                      from './components/ResultScreen';


function Inner() {
  const { state, resumeQuiz } = useQuiz();
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const saved = loadQuizState();
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


export default function App() {
  return (
    <QuizProvider>
      <Inner />
    </QuizProvider>
  );
}
