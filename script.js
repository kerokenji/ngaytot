// --- Thuật toán tính ô ---
document.getElementById("calcBtn").addEventListener("click", () => {
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const resultDiv = document.getElementById("result");

  if (isNaN(day) || isNaN(month) || day < 1 || month < 1 || day > 31 || month > 12) {
    resultDiv.textContent = "Vui lòng nhập ngày tháng hợp lệ.";
    return;
  }

  // Kiểm tra hợp lệ cơ bản (ví dụ tháng 2 không quá 29)
  const maxDays = [0,31,29,31,30,31,30,31,31,30,31,30,31];
  if (day > maxDays[month]) {
    resultDiv.textContent = "Ngày không hợp lệ trong tháng này.";
    return;
  }

  const steps = [1, 2, 1, 2, 1, 2, 1, 2];
  let pos = 0;

  // Đếm tháng
  for (let i = 1; i <= month; i++) {
    pos = (pos + steps[(i - 1) % 8]) % 8;
  }
  // Đếm ngày
  for (let i = 1; i <= day; i++) {
    pos = (pos + 1) % 8;
  }
  const box = pos === 0 ? 8 : pos;

  const meanings = {
    1: "(Sinh - tốt)",
    2: "(Chấn - xấu)",
    3: "(Tốn - xấu)",
    4: "(Ly - tốt)",
    5: "(Khôn - xấu)",
    6: "(Đoài - xấu)",
    7: "(Càn - tốt)",
    8: "(Hưu - xấu)",
  };

  resultDiv.innerHTML = `Kết quả: Ô số ${box} ${meanings[box]}`;
  document.getElementById("installBtn").style.display = "none";

  // Hiện khung hình sau khi có kết quả
  const img = document.createElement("img");
  img.src = "vi_tri.png"; // bạn thay bằng hình minh họa sau này
  img.alt = "Vị trí minh họa";
  img.style.marginTop = "15px";
  img.style.maxWidth = "100%";
  resultDiv.appendChild(img);
});

// --- PWA cài đặt ---
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBtn').style.display = 'inline-block';
});

document.getElementById('installBtn').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') console.log('User accepted install');
    deferredPrompt = null;
  }
});

// --- Đăng ký service worker ---
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
