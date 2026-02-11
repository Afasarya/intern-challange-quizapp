/**
 * LoadingScreen — Brutalism Playful
 * Ditampilkan saat soal sedang di-fetch dari OpenTDB API
 */
export default function LoadingScreen() {
  return (
    <div className="qa-wrap">
      <div className="qa-card qa-loading" style={{ position: 'relative' }}>
        {/* Decorative sticker */}
        <span className="qa-sticker qa-sticker-1">⏳</span>

        <div className="qa-spinner" />
        <div className="qa-loading-title">Memuat Soal...</div>
        <div className="qa-loading-sub">
          Mengambil data dari OpenTDB &nbsp;·&nbsp; Tunggu sebentar ya!
        </div>
      </div>
    </div>
  );
}
