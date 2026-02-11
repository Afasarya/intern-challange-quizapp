/**
 * LoadingScreen
 * Ditampilkan saat soal sedang di-fetch dari OpenTDB API
 */
export default function LoadingScreen() {
  return (
    <div className="qa-wrap">
      <div className="qa-card qa-loading">
        <div className="qa-spinner" />
        <div className="qa-loading-title">Memuat Soal...</div>
        <div className="qa-loading-sub">
          Mengambil data dari OpenTDB &nbsp;·&nbsp; Harap tunggu
        </div>
      </div>
    </div>
  );
}
