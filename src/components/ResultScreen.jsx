import { useQuiz } from '../context/QuizContext';
import { getResultTier } from '../utils/helpers';

/**
 * ResultScreen — Brutalism Playful
 * - Jumlah benar, salah, dijawab, dilewati
 * - Progress skor visual striped
 * - Tombol main lagi
 */
export default function ResultScreen() {
  const { state, restartQuiz } = useQuiz();
  const { questions, answers, user } = state;

  // Kalkulasi skor
  const answered = Object.keys(answers).length;
  const correct = Object.entries(answers).filter(
    ([i, ans]) => ans === questions[+i]?.correct
  ).length;
  const wrong = answered - correct;
  const skipped = questions.length - answered;
  const pct = questions.length > 0
    ? Math.round((correct / questions.length) * 100)
    : 0;

  const [emoji, msg] = getResultTier(pct);

  return (
    <div className="qa-wrap">
      <div className="qa-card" style={{ animation: 'popIn .5s cubic-bezier(.34,1.56,.64,1) both', position: 'relative' }}>

        {/* Decorative stickers */}
        <span className="qa-sticker qa-sticker-1">🏅</span>
        <span className="qa-sticker qa-sticker-2">🎉</span>

        {/* ── Emoji & judul ── */}
        <div className="qa-result-emoji">{emoji}</div>
        <div className="qa-result-title">{msg}</div>
        <div className="qa-result-user">Hasil Kuis — {user}</div>

        {/* ── Statistik ── */}
        <div className="qa-stats">

          <div className="qa-stat">
            <div className="qa-stat-val" style={{ color: '#00D26A' }}>{correct}</div>
            <div className="qa-stat-lbl">✅ Benar</div>
          </div>

          <div className="qa-stat">
            <div className="qa-stat-val" style={{ color: '#FF3B30' }}>{wrong}</div>
            <div className="qa-stat-lbl">❌ Salah</div>
          </div>

          <div className="qa-stat">
            <div className="qa-stat-val" style={{ color: '#3D7BFF' }}>{answered}</div>
            <div className="qa-stat-lbl">📝 Dijawab</div>
          </div>

          <div className="qa-stat">
            <div className="qa-stat-val" style={{ color: '#C4A7FF' }}>
              {skipped}
            </div>
            <div className="qa-stat-lbl">⏭ Dilewati</div>
          </div>

          {/* Skor akhir full-width */}
          <div className="qa-stat full">
            <div className="qa-stat-val" style={{ color: '#FF9F1C' }}>{pct}%</div>
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
          🔄 Main Lagi!
        </button>
      </div>

      <div className="qa-footer">⚡ Powered by OpenTDB API ⚡</div>
    </div>
  );
}
