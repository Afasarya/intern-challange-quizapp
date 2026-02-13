import { useEffect } from 'react';
import { useQuiz }   from '../context/QuizContext';
import { formatTime, timerClass } from '../utils/helpers';


export default function Timer() {
  const { state, tick, finishQuiz, answersRef } = useQuiz();
  const { timeLeft, screen } = state;

  useEffect(() => {
    if (screen !== 'quiz') return;

    const id = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(id);
  }, [screen]);   

  // Pantau timeLeft: jika 0 → finish
  useEffect(() => {
    if (screen === 'quiz' && timeLeft === 0) {
      finishQuiz();
    }
  }, [timeLeft, screen]);

  return (
    <div className="qa-timer-wrap">
      <div className="qa-timer-lbl">⏱ Waktu Tersisa</div>
      <div className={`qa-timer ${timerClass(timeLeft)}`}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}
