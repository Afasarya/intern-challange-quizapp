# 🧠 QuizMaster — React Quiz App

Aplikasi kuis berbasis React menggunakan soal dari [OpenTDB API](https://opentdb.com/).

---

## ✨ Fitur

| Fitur | Keterangan |
|-------|-----------|
| 🔐 Login | Input nama pengguna sebelum memulai kuis |
| 📡 OpenTDB API | 10 soal pilihan ganda acak dari API |
| 📊 Progress | Nomor soal + jumlah yang sudah dijawab real-time |
| ⏱️ Timer | Countdown 5 menit dengan perubahan warna |
| 1️⃣ Satu soal/halaman | Auto pindah setelah jawab |
| 🏁 Hasil | Benar, salah, dijawab, dilewati + skor % |
| 💾 Resume Kuis | State disimpan ke localStorage, bisa dilanjutkan setelah browser ditutup |
| 🎨 UI Modern | Dark cyberpunk theme + animasi |

---

## 🚀 Cara Menjalankan

### 1. Clone / Download project ini

```bash
git clone https://github.com/username/quiz-app.git
cd quiz-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan development server

```bash
npm run dev
```

### 4. Buka browser

```
http://localhost:5173
```

---

## 📁 Struktur File

```
quiz-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              ← Entry point React
    ├── App.jsx               ← Root component + routing screen
    ├── index.css             ← Global styles
    ├── context/
    │   └── QuizContext.jsx   ← Global state (useReducer + Context API)
    ├── utils/
    │   ├── helpers.js        ← decode, shuffle, formatTime, dll
    │   └── storage.js        ← localStorage wrapper (save/load/clear)
    └── components/
        ├── LoginScreen.jsx   ← Halaman login + resume banner
        ├── LoadingScreen.jsx ← Loading spinner saat fetch API
        ├── Timer.jsx         ← Countdown timer
        ├── QuizScreen.jsx    ← Tampilan soal + pilihan jawaban
        └── ResultScreen.jsx  ← Halaman hasil kuis
```

---

## 🛠️ Tech Stack

- **React 18** + Vite
- **Context API** + useReducer (state management)
- **localStorage** (resume kuis)
- **OpenTDB API** (sumber soal)
- **CSS Pure** (tanpa library UI)

---

## 📤 Deploy ke Vercel

```bash
npm run build
# Upload folder dist/ ke Vercel atau Netlify
```

---

## 📝 Catatan

- API OpenTDB kadang membatasi request. Jika gagal, coba beberapa saat kemudian.
- Soal bersifat acak setiap kuis dimulai.
- Timer mulai saat soal pertama muncul.
