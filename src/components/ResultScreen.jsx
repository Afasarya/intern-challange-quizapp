import { useQuiz }         from '../context/QuizContext';
import { getResultTier }  from '../utils/helpers';

/**
 * ResultScreen
 * - Tampilkan jumlah benar, salah, dijawab, dilewati
 * - Progress skor visual
 * - Tombol main lagi
 */
export default function ResultScreen() {
  const { state, restartQuiz } = useQuiz();
  const { questions, answers, user } = state;

  // Kalkulasi skor
  const answered = Object.keys(answers).length;
  const correct  = Object.entries(answers).filter(
    ([i, ans]) => ans === questions[+i]?.correct
  ).length;
  const wrong    = answered - correct;
  const skipped  = questions.length - answered;
  const pct      = questions.length > 0
    ? Math.round((correct / questions.length) * 100)
    : 0;

  const [emoji, msg, color] = getResultTier(pct);

  const titleStyle = {
    background            : `linear-gradient(135deg, ${color}, #ff6b35)`,
    WebkitBackgroundClip  : 'text',
    backgroundClip        : 'text',
    WebkitTextFillColor   : 'transparent',
  };

  return (
    <div className="qa-wrap">
      <div className="qa-card" style={{ animation: 'fadeUp .5s ease both' }}>

        {/* ── Emoji & judul ── */}
        <div className="qa-result-emoji">{emoji}</div>
        <div className="qa-result-title" style={titleStyle}>{msg}</div>
        <div className="qa-result-user">Hasil Kuis — {user}</div>

        {/* ── Statistik ── */}
        <div className="qa-stats">

          <div className="qa-stat">
            <div className="qa-stat-val" style={{ color: '#00ff8c' }}>{correct}</div>
            <div className="qa-stat-lbl">✅ Benar</div>
          </div>

          <div className="qa-stat">
            <div className="qa-stat-val" style={{ color: '#ff3366' }}>{wrong}</div>
            <div className="qa-stat-lbl">❌ Salah</div>
          </div>

          <div className="qa-stat">
            <div className="qa-stat-val" style={{ color: '#00dcff' }}>{answered}</div>
            <div className="qa-stat-lbl">📝 Dijawab</div>
          </div>

          <div className="qa-stat">
            <div className="qa-stat-val" style={{ color: 'rgba(255,255,255,.3)' }}>
              {skipped}
            </div>
            <div className="qa-stat-lbl">⏭ Dilewati</div>
          </div>

          {/* Skor akhir full-width */}
          <div className="qa-stat full">
            <div className="qa-stat-val" style={{ color: '#ffe600' }}>{pct}%</div>
            <div className="qa-stat-lbl">🎯 Skor Akhir</div>
            <div className="qa-score-track">
              <div className="qa-score-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="qa-score-acc">
              {correct} dari {questions.length} soal dijawab benar
            </div>
          </div>
        </div>

        <div className="qa-divider" />

        {/* ── Tombol main lagi ── */}
        <button className="qa-btn qa-btn-primary" onClick={restartQuiz}>
          🔄 Main Lagi
        </button>
      </div>

      <div className="qa-footer">Powered by OpenTDB API</div>
    </div>
  );
}
