import { useState, useCallback } from 'react';
import { useQuiz } from '../context/QuizContext';
import { formatTime } from '../utils/helpers';

/**
 * LoginScreen — Brutalism Playful
 * - Input nama pengguna dengan validasi
 * - Tampilkan banner resume jika ada data tersimpan
 */

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 30;

const validateName = (name) => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return { isValid: false, error: 'Nama tidak boleh kosong' };
  }

  if (trimmedName.length < MIN_NAME_LENGTH) {
    return { isValid: false, error: `Nama minimal ${MIN_NAME_LENGTH} karakter` };
  }

  if (trimmedName.length > MAX_NAME_LENGTH) {
    return { isValid: false, error: `Nama maksimal ${MAX_NAME_LENGTH} karakter` };
  }

  const validNameRegex = /^[a-zA-Z0-9\s'.\-]+$/;
  if (!validNameRegex.test(trimmedName)) {
    return { isValid: false, error: 'Nama hanya boleh huruf, angka, dan spasi' };
  }

  return { isValid: true, error: null };
};

export default function LoginScreen({ resumeData, onResume }) {
  const { state, setUser, fetchAndStart } = useQuiz();
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validation = validateName(state.user);
  const showError = touched && !validation.isValid;

  const handleNameChange = useCallback((e) => {
    const value = e.target.value;
    if (value.length <= MAX_NAME_LENGTH + 5) {
      setUser(value);
    }
  }, [setUser]);

  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const handleSubmit = useCallback(async () => {
    setTouched(true);

    if (!validation.isValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      await fetchAndStart();
    } finally {
      setIsSubmitting(false);
    }
  }, [validation.isValid, fetchAndStart]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div className="qa-wrap">
      <div className="qa-card" style={{ position: 'relative' }}>

        {/* Decorative stickers */}
        <span className="qa-sticker qa-sticker-1">🧠</span>
        <span className="qa-sticker qa-sticker-2">⚡</span>

        {/* ── Logo ── */}
        <div className="qa-logo">QUIZMASTER</div>
        <div className="qa-tagline">10 Pertanyaan · 5 Menit · Ayo Main!</div>

        {/* ── Resume Banner ── */}
        {resumeData && (
          <div className="qa-resume">
            <div>
              <div className="qa-resume-head">💾 Kuis Tersimpan!</div>
              <p>
                Soal {resumeData.currentIdx + 1} / {resumeData.questions.length}
                &nbsp;·&nbsp;
                Sisa waktu {formatTime(resumeData.timeLeft)}
              </p>
            </div>
            <button className="qa-resume-btn" onClick={onResume}>
              Lanjutkan →
            </button>
          </div>
        )}

        {/* ── Form ── */}
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <label className="qa-label" htmlFor="username-input">
            ✏️ Siapa Namamu?
          </label>
          <div className="qa-input-wrapper">
            <input
              id="username-input"
              className={`qa-input ${showError ? 'qa-input-error' : ''}`}
              type="text"
              placeholder="Ketik namamu di sini..."
              value={state.user}
              onChange={handleNameChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="name"
              aria-describedby={showError ? 'name-error' : undefined}
              aria-invalid={showError}
              disabled={isSubmitting}
            />
            {state.user && (
              <span className="qa-char-count">
                {state.user.trim().length}/{MAX_NAME_LENGTH}
              </span>
            )}
          </div>
          {showError && (
            <div id="name-error" className="qa-error-message" role="alert">
              ⚠️ {validation.error}
            </div>
          )}
          <button
            type="submit"
            className="qa-btn qa-btn-primary"
            disabled={!validation.isValid || isSubmitting}
          >
            {isSubmitting ? '⏳ Memuat...' : '🚀 Mulai Kuis!'}
          </button>
        </form>
      </div>

      <div className="qa-footer">⚡ Powered by OpenTDB API ⚡</div>
    </div>
  );
}
