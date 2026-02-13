import { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { LETTERS, DIFF_MAP } from '../utils/helpers';
import Timer from './Timer';

export default function QuizScreen() {
  const { state, saveAnswer, nextQuestion, finishQuiz } = useQuiz();
  const { questions, currentIdx, answers } = state;

  const [selected, setSelected] = useState(null);

  const q = questions[currentIdx];
  const answered = Object.keys(answers).length;
  const progress = (currentIdx / questions.length) * 100;

  if (!q) return null;

  const handleAnswer = (opt) => {
    if (selected !== null) return;

    setSelected(opt);
    saveAnswer(currentIdx, opt);

    setTimeout(() => {
      setSelected(null);
      if (currentIdx + 1 >= questions.length) {
        finishQuiz();
      } else {
        nextQuestion();
      }
    }, 700);
  };

  return (
    <div className="qa-wrap">

      {/* ── Header: nomor soal + timer ── */}
      <div className="qa-quiz-head">
        <div>
          <div className="qa-q-counter">
            <span className="qa-q-big">{currentIdx + 1}</span>
            <span className="qa-q-total">/ {questions.length}</span>
          </div>
          <div className="qa-answered-pill">
            ✅ Dijawab: {answered}&nbsp;&nbsp;·&nbsp;&nbsp;📋 Total: {questions.length}
          </div>
        </div>

        <Timer />
      </div>

      {/* ── Progress bar ── */}
      <div className="qa-prog-track">
        <div className="qa-prog-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* ── Card soal ── */}
      <div className="qa-card qa-slide" key={currentIdx} style={{ position: 'relative' }}>

        {/* Decorative sticker */}
        <span className="qa-sticker" style={{
          position: 'absolute',
          top: '-14px',
          right: '-8px',
          fontSize: '1.8rem',
          transform: 'rotate(12deg)',
          zIndex: 3,
        }}>🎯</span>

        {/* Tags */}
        <div className="qa-tags">
          <span className="qa-tag qa-tag-cat">{q.category}</span>
          <span className={`qa-tag qa-tag-${DIFF_MAP[q.difficulty] || 'med'}`}>
            {q.difficulty}
          </span>
        </div>

        {/* Pertanyaan */}
        <div className="qa-question">{q.question}</div>

        {/* Pilihan jawaban */}
        <div className="qa-options">
          {q.options.map((opt, i) => {
            let cls = 'qa-opt';
            if (selected !== null) {
              if (opt === q.correct) cls += ' correct';
              else if (opt === selected) cls += ' wrong';
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => handleAnswer(opt)}
                disabled={selected !== null}
              >
                <span className="qa-opt-letter">{LETTERS[i]}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
