/**
 * Wrapper localStorage untuk menyimpan dan mengambil state kuis.
 * Digunakan untuk fitur Resume Kuis ketika browser ditutup & dibuka kembali.
 * Menyimpan timestamp untuk menghitung waktu yang berlalu saat browser ditutup.
 */

const STORAGE_KEY = 'quizmaster_v1';

/**
 * Simpan state kuis ke localStorage dengan timestamp
 * @param {Object} state - State kuis yang ingin disimpan
 */
export const saveQuizState = (state) => {
  try {
    const stateWithTimestamp = {
      ...state,
      savedAt: Date.now(), // Simpan waktu terakhir disimpan
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateWithTimestamp));
  } catch (err) {
    console.warn('Gagal menyimpan ke localStorage:', err);
  }
};

/**
 * Ambil state kuis dari localStorage dengan perhitungan waktu yang berlalu
 * @returns {Object|null} State yang tersimpan dengan timeLeft yang sudah dikurangi, atau null jika tidak ada
 */
export const loadQuizState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    
    const saved = JSON.parse(raw);
    
    // Hitung waktu yang berlalu sejak terakhir disimpan
    if (saved.savedAt && saved.timeLeft !== undefined) {
      const elapsedSeconds = Math.floor((Date.now() - saved.savedAt) / 1000);
      const adjustedTimeLeft = Math.max(0, saved.timeLeft - elapsedSeconds);
      
      return {
        ...saved,
        timeLeft: adjustedTimeLeft,
        // Hapus savedAt dari state yang dikembalikan
        savedAt: undefined,
      };
    }
    
    return saved;
  } catch (err) {
    console.warn('Gagal membaca localStorage:', err);
    return null;
  }
};

/**
 * Hapus state kuis dari localStorage (saat kuis selesai / mulai baru)
 */
export const clearQuizState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Gagal menghapus localStorage:', err);
  }
};
