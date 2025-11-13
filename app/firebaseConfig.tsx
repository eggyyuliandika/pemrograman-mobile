// Import fungsi yang dibutuhkan dari Firebase SDK
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Konfigurasi Firebase (kode dari dosen, tidak diubah)
const firebaseConfig = {
  apiKey: "AIzaSyCX7VnaqgzU4CNDkB9BeZ7XdbPbIbTmtIw",
  authDomain: "projectjumat-58756.firebaseapp.com",
  projectId: "projectjumat-58756",
  storageBucket: "projectjumat-58756.firebasestorage.app",
  messagingSenderId: "705109659165",
  appId: "1:705109659165:web:2dc6dbf198883ea62840f4",
  measurementId: "G-88M83PZPH1",
};

// 🧠 Pastikan tidak initialize dua kali (mencegah error "already exists")
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 🔐 Inisialisasi Auth Firebase
const auth = getAuth(app);

// 📊 Inisialisasi Analytics (cek dulu apakah environment mendukung)
isSupported().then((supported) => {
  if (supported) getAnalytics(app);
});

// ✅ Export agar bisa digunakan di file lain
export { app, auth, firebaseConfig };
