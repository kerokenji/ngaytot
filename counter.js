// --- Firebase config --- //
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXX",
  authDomain: "visit-counter.firebaseapp.com",
  databaseURL: "https://visit-counter-default-rtdb.firebaseio.com",
  projectId: "visit-counter",
  storageBucket: "visit-counter.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

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
