// --- Firebase config --- //
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAunDjIXjlrpifu31EaFHTrVMAdWETA20",
  authDomain: "tinhngaytot-visit-count.firebaseapp.com",
  databaseURL: "https://tinhngaytot-visit-count-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tinhngaytot-visit-count",
  storageBucket: "tinhngaytot-visit-count.firebasestorage.app",
  messagingSenderId: "759681130080",
  appId: "1:759681130080:web:b10a02259c2131f0992d05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// --- Lấy ngày hiện tại --- //
const now = new Date();
const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, '0');
const dd = String(now.getDate()).padStart(2, '0');

const dayKey = `${yyyy}-${mm}-${dd}`;
const monthKey = `${yyyy}-${mm}`;
const yearKey = `${yyyy}`;

// --- Hàm tăng lượt --- //
function increaseCounter(path) {
    const ref = db.ref(path);
    ref.transaction(value => (value || 0) + 1);
}

// --- Hàm đọc dữ liệu --- //
function loadCounter(path, elementId) {
    db.ref(path).on("value", snapshot => {
        document.getElementById(elementId).textContent = snapshot.val() || 0;
    });
}

// --- Tăng lượt khi user vào trang --- //
increaseCounter("visits/today/" + dayKey);
increaseCounter("visits/month/" + monthKey);
increaseCounter("visits/year/" + yearKey);

// --- Hiển thị lên trang --- //
loadCounter("visits/today/" + dayKey, "todayCount");
loadCounter("visits/month/" + monthKey, "monthCount");
loadCounter("visits/year/" + yearKey, "yearCount");
