/**
 * Decode URL-encoded string dari OpenTDB API
 */
export const decodeText = (str) => {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};

/**
 * Acak urutan array (Fisher-Yates shuffle)
 */
export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Proses satu soal dari API menjadi format yang digunakan app
 */
export const processQuestion = (q) => ({
  question   : decodeText(q.question),
  options    : shuffle([
    decodeText(q.correct_answer),
    ...q.incorrect_answers.map(decodeText),
  ]),
  correct    : decodeText(q.correct_answer),
  category   : decodeText(q.category),
  difficulty : q.difficulty,
});

/**
 * Format detik menjadi mm:ss
 * @param {number} seconds
 * @returns {string} contoh "04:23"
 */
export const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
};

/**
 * Tentukan kelas CSS timer berdasarkan sisa waktu
 */
export const timerClass = (timeLeft) => {
  if (timeLeft <= 30) return 'danger';
  if (timeLeft <= 90) return 'warning';
  return 'safe';
};

/**
 * Tentukan tier hasil berdasarkan persentase skor
 * @returns {[string, string, string]} [emoji, pesan, warna]
 */
export const getResultTier = (pct) => {
  if (pct >= 90) return ['🏆', 'Sempurna!',        '#ffe600'];
  if (pct >= 70) return ['🎉', 'Luar Biasa!',       '#00ff8c'];
  if (pct >= 50) return ['💪', 'Bagus!',             '#00dcff'];
  if (pct >= 30) return ['📚', 'Terus Berlatih!',   '#ff6b35'];
  return             ['🔁', 'Jangan Menyerah!',  '#ff3366'];
};

export const LETTERS = ['A', 'B', 'C', 'D'];
export const DIFF_MAP = { easy: 'easy', medium: 'med', hard: 'hard' };
